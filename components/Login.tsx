import React, { useContext, useState } from "react";
import Web3 from "web3";

import { Auth } from "../types";
import { formatUnits } from "@ethersproject/units";
import { artistContext } from "../pages/_app";
interface Props {
  onLoggedIn: (auth: Auth) => void;
}

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

const Login = ({ onLoggedIn }: Props) => {
  const context = useContext(artistContext)
  const [loading, setLoading] = useState(false); // Loading button state

  const handleAuthenticate = ({
    PublicAddress,
    signature,
  }: {
    PublicAddress: string;
    signature: string;
  }) =>
    fetch(`/api/auth/ali`, {
      body: JSON.stringify({ PublicAddress, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());
  const handleSignMessage = async ({
    PublicAddress,
    nonce,
  }: {
    PublicAddress: string;
    nonce: string;
  }) => {
    try {
      const signature = await web3!.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        PublicAddress,
        "" // MetaMask will ignore the password argument here
      );
     
      return { PublicAddress, signature };
    } catch (err) {
      throw new Error(
        err
        // 'You need to sign the message to be able to log in.'
      );
    }
  };
  const ArtistName = "BitXmi User";
  

  const handleSignup = (PublicAddress: string) =>
    fetch(`/api/artist`, {
      body: JSON.stringify({ PublicAddress, ArtistName }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const handleClick = async () => {

    if (!(window as any).ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }

    if (!web3) {
      try {
        await (window as any).ethereum.enable();
        web3 = new Web3((window as any).ethereum);
      } catch (error) {
        window.alert("You need to allow MetaMask.");
        return;
      }
    }

    const coinbase = await web3.eth.getCoinbase();
    const parseBalance = (balance, decimals = 18, decimalsToDisplay = 3) =>
      Number(formatUnits(balance, decimals)).toFixed(decimalsToDisplay);

    const balance = await web3.eth.getBalance(coinbase);
    const ss = parseBalance(balance);
   
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    const PublicAddress = coinbase.toLowerCase();
    setLoading(true);
    var url = "/api/artist/" + PublicAddress;
    // `http://localhost:3000/api/artist?PublicAddress=${PublicAddress}`
    // Look if user with current PublicAddress is already present on backend
    fetch(url)
      .then((response) => response.json())
      // If yes, retrieve it. If no, create it.
      .then((artists) =>{
        context.setGlobal({...context.global, artist: artists[0]})
        return(
        artists.length ? artists[0] : handleSignup(PublicAddress)

        )
      }
      )
      // Popup MetaMask confirmation modal to sign message
      .then(handleSignMessage)
      // Send signature to backend on the /auth route
      .then(handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(onLoggedIn)
      .catch((err) => {
        window.alert(err);
        setLoading(false);
      });
  };

  return (
    <>
      <button
        className="btn "
        onClick={handleClick}
      >
        {loading ? "Loading..." : "Connect"}
      </button>

  {/* <button onClick={selectNetwork}>
			add
		</button>  */}
 </>
  );
};
export default Login;
