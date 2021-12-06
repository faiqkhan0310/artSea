import Artist from "../../../models/Artist";
import "../../../utils/dbConnect";
import jwtDecode from 'jwt-decode';

export default async (req, res) => {
	const {
		query: { id },
		method,
		headers,
	} = req;

	switch (method) {
		case "GET":
			try {
			
				
			
				const artist = await Artist.findById(id);
				

				return res.status(200).json(
					artist
				);
			
			} catch (error) {
				return res.status(404).json({
					success: false,
				});
			}
		case "PUT":
			try {
				const artist = await Artist.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});

				return res.status(200).json({
					success: true,
					data: artist,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		case "DELETE":
			try {
				await Artist.deleteOne({ _id: id });

				return res.status(200).json({
					success: true,
					data: { id },
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		default:
			res.setHeaders("Allow", ["GET", "PUT", "DELETE"]);
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};
