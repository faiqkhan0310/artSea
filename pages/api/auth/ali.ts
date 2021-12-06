
//   export default function ali(req, res) {
//     if (req.method === 'POST') {
//       // Process a POST request
//     } else {
//       // Handle any other HTTP method
//       res.status(200).json({ name: 'Ali' })
//     }
//   }

import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import jwt from 'jsonwebtoken';

import { config } from '../../../jwt-config';
import  Artist  from '../../../models/Artist';

export default function create  (req, res, next) {
	var _artist= new Artist();
	const { signature, PublicAddress } = req.body;

	if (!signature || !PublicAddress)
		return res
			.status(400)
			.send({ error: 'Request should have signature and PublicAddress' });

	return (
		Artist.findOne({PublicAddress :PublicAddress})
			////////////////////////////////////////////////////
			// Step 1: Get the artist with the given PublicAddress
			////////////////////////////////////////////////////
			.then((artist: any | null) => {
			
				if (!artist) {
					res.status(401).send({
						error: `Artist with PublicAddress ${PublicAddress} is not found in database`,
					});

					return null;
				}

				return artist;
			})
			////////////////////////////////////////////////////
			// Step 2: Verify digital signature
			////////////////////////////////////////////////////
			.then((artist) => {
			
				if (!(artist)) {
					// Should not happen, we should have already sent the response
					throw new Error(
						'Artist is not defined in "Verify digital signature".'
					);
				}

				const msg = `I am signing my one-time nonce: ${artist.nonce}`;

				// We now are in possession of msg, PublicAddress and signature. We
				// will use a helper from eth-sig-util to extract the address from the signature
				const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
				const address = recoverPersonalSignature({
					data: msgBufferHex,
					sig: signature,
				});

				// The signature verification is successful if the address found with
				// sigUtil.recoverPersonalSignature matches the initial PublicAddress
				
				if (address.toLowerCase() === PublicAddress.toLowerCase()) {
					return artist;
				} else {
					res.status(401).send({
						error: 'Signature verification failed',
					});

					return null;
				}
			})
			////////////////////////////////////////////////////
			// Step 3: Generate a new nonce for the artist
			////////////////////////////////////////////////////
			.then((artist: any| null) => {
				if (!(artist)) {
					// Should not happen, we should have already sent the response

					throw new Error(
						'Artist is not defined in "Generate a new nonce for the artist".'
					);
				}

				artist.nonce = Math.floor(Math.random() * 10000);
		
				return artist.save();
			})
			////////////////////////////////////////////////////
			// Step 4: Create JWT
			////////////////////////////////////////////////////
			.then((artist) => {
				return new Promise<string>((resolve, reject) =>
					// https://github.com/auth0/node-jsonwebtoken
					jwt.sign(
						{
							payload: {
								id: artist.id,
								PublicAddress,
							},
						},
						config.secret,
						{
							algorithm: config.algorithms[0],
						},
						(err, token) => {
							if (err) {
								return reject(err);
							}
							if (!token) {
								return new Error('Empty token');
							}
							return resolve(token);
						}
					)
				);
			})
			.then((accessToken) => res.json({ accessToken }))
			.catch(next)
	);
};
