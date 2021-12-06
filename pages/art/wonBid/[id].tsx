import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import jwtDecode from "jwt-decode";
import ConfettiGif from "../../../components/layout/confettigif";
import Countdown from "react-countdown";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LS_KEY = "login-with-metamask:auth";
interface State {
  loading: boolean;
}

let web3: Web3 | undefined = undefined; // Will hold the web3 instance
interface JwtDecoded {
  payload: {
    id: string;
    PublicAddress: string;
  };
}
export default function Art({ art, owner, creator, artLog, bids, bxmiPrice }) {
  var ls = null;
  var publicAddress = null;

  var _onSale: boolean = true;
  var THash = "";
  const today = new Date();
  const [UserId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [pa, setPublicAddress] = useState("");
  const [shippingColShow, setShippingColShow] = useState("");
  const [newPrice, setnewPrice] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [state, setState] = useState<State>();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [animationGif, setAnimationGif] = useState("");
  const [collapsePlusIcon, setCollapsePlusIcon] = useState("flex");
  const [collapseMinusIcon, setCollapseMinusIcon] = useState("none");
  const [addressSuccessAlert, setAddressSuccessAlert] = useState("");
  const [addressWarningAlert, setAddressWarningAlert] = useState("");
  const [latestBid, setlatestBid] = useState("0");
  const [bidable, setBidable] = useState(true);

  const shippingAddressCollapse = () => {
    if (collapsePlusIcon == "flex") {
      setCollapsePlusIcon("none"), setCollapseMinusIcon("flex");
      setShippingColShow("active");
    } else {
      setCollapsePlusIcon("flex");
      setCollapseMinusIcon("none");
      setShippingColShow("");
    }
  };

  const alertCloseHandler = () => {
    setAddressSuccessAlert("");
    setAddressWarningAlert("");
  };

  useEffect(() => {
    if (art.Physical) {
      setShippingColShow("active");
    } else {
      setShippingColShow("");
    }

    try {
      // Access token is stored in localstorage
      ls = (window as any).localStorage.getItem(LS_KEY);
      const {
        payload: { id, PublicAddress },
      } = jwtDecode<JwtDecoded>(ls);
      publicAddress = PublicAddress;
      
      setUserId(id);
      setPublicAddress(PublicAddress);
      try {
        if (publicAddress == owner.PublicAddress) {
          setIsLogin(true);
        }
      } catch (Err) {
        console.log(Err);
      }
    } catch (err) {
      console.log(err);
      alert("install & login Metamask");
      //router.push("/art");
    }
  }, []);

  function shortenHex(hex: string, length = 4) {
    return `${hex.substring(0, length + 2)}…${hex.substring(
      hex.length - length
    )}`;
  }

  let Abijson = require("../../../erc721_abi.json");
  let Tokenjson = require("../../../token.json");
  const artlog = async (_id, UId) => {
    const res = await fetch("/api/artlogs/", {
      body: JSON.stringify({
        ArtId: _id,
        ArtistId: UId,
        Description: "NFT Purchased.",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const res2 = await res.json();
    console.log("Log", res2);
    router.reload();
  };
  const updateNft = async (_id, UId, THash) => {
    const res = await fetch(`/api/art/${_id}`, {
      body: JSON.stringify({
        OwnerId: UId,
        MintTransaction: THash,
        OnSale: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    const res2 = await res.json();
    console.log("UpdateNFT", res2);
    // artlog(res2._id);
    // router.push(`/art/${_id}`);
  };
  const purchaseArt = async () => {
    console.log("pa", pa);
    console.log("PublicAddress", publicAddress);

    try {
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

      setLoading(true);
      const _id = art.NFTId;
      const _price = web3.utils.toWei(art.LatestBid, "ether");
      //{Approve Tokens from erc20 Smart Contracr}
      var Erc20Contracts = await new web3!.eth.Contract(
        Tokenjson,
        process.env.ERC2OAddress
      );
      setLoading(true);
      // setState({ ...state, loading: true });
      publicAddress = pa;
      if (art.Minted == false) {
        const Transfer = await Erc20Contracts.methods
          .transfer(owner.PublicAddress, _price)
          .send({
            from: publicAddress,
          }).on('transactionHash', function(hash){
           
            console.log("receipt",hash)
            setAnimationGif("active");
            updateNft(art._id, UserId, hash);
            setLoading(false);
            artlog(art._id, UserId);
            router.reload();
            return;
            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        });
        console.log("ApproveHash", Transfer);

      
       //
        return;
      }

      const Approve = await Erc20Contracts.methods
        .approve(process.env.ERC721Address, _price)
        .send({
          from: publicAddress,
          gasPrice: "10000000000",
          gas: 400000,
        });
      console.log("ApproveHash", Approve);

      // {Purchase With Token}
      var contract = await new web3!.eth.Contract(
        Abijson,
        process.env.ERC721Address
      );

      const Purchase = await contract.methods.buywithToken(_id, _price).send({
        from: publicAddress,
        gasPrice: "10000000000",
        gas: 1500000,
      });
      console.log("PurchaseHash", Purchase);
      THash = Purchase.transactionHash;
      console.log(THash);
      setAnimationGif("active");
      updateNft(art._id, UserId, THash);
      setLoading(false);
      artlog(art._id, UserId);
    } catch (err) {
      setLoading(false);
      router.reload();
      console.log(err);
      // throw new Error(
      //   err
      //   // 'You need to sign the message to be able to log in.'
      // );
    }
  };
  const UpdateListing = async () => {
    // Access token is stored in localstorage
    ls = (window as any).localStorage.getItem(LS_KEY);
    const {
      payload: { id, PublicAddress },
    } = jwtDecode<JwtDecoded>(ls);
    publicAddress = PublicAddress;

    try {
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

      var contract = await new web3!.eth.Contract(
        Abijson,
        process.env.ERC721Address
      );

      const _id = art.NFTId;
      setLoading(true);
      //setState({ ...state, loading: true });

      const mint = await contract.methods
        .updateListingStatus(_id, _onSale)
        .send({ from: publicAddress });

      //return { signature };
    } catch (err) {
      throw new Error(
        err
        // 'You need to sign the message to be able to log in.'
      );
    }
  };
  const UpdatePrice = async () => {
    // Access token is stored in localstorage
    ls = (window as any).localStorage.getItem(LS_KEY);
    const {
      payload: { id, PublicAddress },
    } = jwtDecode<JwtDecoded>(ls);
    publicAddress = PublicAddress;

    try {
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

      var contract = await new web3!.eth.Contract(
        Abijson,
        process.env.ERC721Address
      );

      const _id = art.NFTId;
      const _price = web3.utils.toWei(newPrice, "ether");
      setLoading(true);
      // setState({ ...state, loading: true });

      const priceUpdate = await contract.methods
        .updatePrice(_id, _price)
        .send({ from: publicAddress });

      //return { signature };
    } catch (err) {
      throw new Error(
        err
        // 'You need to sign the message to be able to log in.'
      );
    }
  };
  const SaveAddress = async () => {
    const res = await fetch("/api/address/", {
      body: JSON.stringify({
        PublicAddress: pa,
        name: name,
        email: email,
        address: address,
        city: city,
        country: country,
        phone: phone,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    console.log("Address Saved", publicAddress);
    const res2 = await res.json();
    console.log("Address Saved", res2);

    if (res2.success == true) {
      setShippingColShow(""),
        setAddressSuccessAlert("active"),
        setCollapsePlusIcon("flex"),
        setCollapseMinusIcon("none");
    } else {
      setAddressWarningAlert("active");
    }
  };
  const PlaceBid = async () => {
    if (Number(latestBid) + 10 < Number(art.LatestBidlatestBid)) {
      return;
    }

    const res = await fetch("/api/bids/", {
      body: JSON.stringify({
        PublicAddress: pa,
        Bid: latestBid,
        ArtId: art._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const res2 = await res.json();
    console.log("Bid", res2);
    setAnimationGif("active");
    const updateNft = await fetch(`/api/art/${art._id}`, {
      body: JSON.stringify({
        LatestBid: latestBid,
        PublicAddressBidWinner:pa
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    const updateNftres = await updateNft.json();
    console.log("UpdateNFT", updateNftres);
    // artlog(res2._id);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec

    router.reload();
    setAnimationGif("");
  };
  return (
    <>
      <div>
        <br></br>

        <div>
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0 row">
              <div className="px-4 w-full flex justify-center">
                {/* <div className="bg-green-50 px-8 text-center rounded-2xl p-3 mb-8 text-green-500 text-md capitalize font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div> */}
              </div>
              {/* <hr />
            <hr /> */}

              {art.Physical ? (
                <div className="w-full md:w-1/2 px-4 mb-0 col-12 physical-certificate-img certificate-col-img">
                  <a
                    className="text-blue-500 font-medium"
                    target="_blank"
                    href={art.UrlCertificate}
                    rel="noopener noreferrer"
                  >
                    <h4 className="mb-0">Certificate</h4>
                    <Image
                      className="rounded"
                      src={art.UrlCertificate}
                      alt={art.name}
                      width={60}
                      height={60}
                    ></Image>{" "}
                  </a>
                </div>
              ) : (
                <></>
              )}

              <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0 col-12 col-md-6 details-col-img">
                <a
                  style={{ color: "#0d6efd" }}
                  className="text-blue-500 font-medium"
                  target="_blank"
                  href={art.Url}
                  rel="noopener noreferrer"
                >
                  {" "}
                  <Image
                    className="rounded product-details-img"
                    src={art.Url}
                    alt={art.name}
                    width={500}
                    height={500}
                  ></Image>
                </a>
              </div>

              <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0 col-12 col-md-6 details-col-desc">
                <div className="details-col">
                  <div className="">
                    <div
                      className=""
                      style={{ display: "flex", alignItems: "flex-start" }}
                    >
                      <div className="" style={{ width: "70px" }}>
                        <img
                          className="rounded"
                          src={
                            owner.avatar ? owner.avatar : "/images/artistdp.png"
                          }
                          alt=""
                          width="70"
                          height="70"
                        ></img>
                      </div>

                      <div className="ms-2">
                        <h6 className="mb-2 mt-2">{owner.ArtistName}</h6>
                        <p>{owner.Description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {art.OnSale ? (
                      <a className="bg-green-600" href="#">
                        For Sale
                      </a>
                    ) : (
                      <a
                        className="bg-red-600"
                        href="#"
                        style={{ backgroundColor: "red" }}
                      >
                        Not For Sale
                      </a>
                    )}
                  </div>
                </div>
                {!loading ? (
                  <>
                    <div>
                      <p>
                        <br />
                      </p>
                      <h2 className="text-3xl mb-1 leading-tight font-medium  text-capitalize font-heading text-gray-500">
                        {art.name}
                      </h2>
                    </div>

                    <div>
                      <p className="text-xl text-gray-500  mb-1">
                        {art.Auctioned != true ? (
                          <span className="font-medium">
                            (Price) BXMI {art.PriceBNB + "= $ "}
                            {Math.round(Number(art.PriceBNB) * bxmiPrice)}
                          </span>
                        ) : (
                          <>
                            {art.LatestBid ? (
                              <>
                                <span className="font-medium">
                                  (latest Offer) BXMI {art.LatestBid + "= $ "}
                                  {Math.round(
                                    Number(art.LatestBid) * bxmiPrice
                                  )}
                                </span>
                              </>
                            ) : (
                              <>
                                (latest Offer) BXMI {art.PriceBNB + "= $ "}
                                {Math.round(Number(art.PriceBNB) * bxmiPrice)}
                              </>
                            )}
                          </>
                        )}
                      </p>
                    </div>

                    <p className="mb-2 text-xl leading-relaxed text-gray-500">
                      {art.Description}
                    </p>
                    {art.Auctioned == true ? (
                      <div>
                        {!isLogin ? (
                          <button
                            className="buy-btn text-md text-white text-center font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded-2xl"
                            onClick={purchaseArt}
                            disabled={isLogin}
                          >
                            Buy
                          </button>
                        ) : (
                          <>
                            <h1>It’s mine!</h1>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="auction-time-col">
                          <h4>Auctioned Ends </h4>
                          <h2>
                            {" "}
                            <Countdown
                              date={
                                Date.now() +
                                Math.round(
                                  Math.abs(
                                    Date.parse(art.EndAuction.toString()) -
                                      Date.parse(today.toString())
                                  )
                                )
                              }
                            />
                          </h2>
                          <input
                            type="number"
                            className="form-control"
                            placeholder={
                              "Minimum Bid " +
                              (parseInt(art.LatestBid)+ 10).toString() +
                              " BXMI Token" + (art.LatestBid*bxmiPrice) +" USD"
                            }
                            onChange={(e) => {
                              setlatestBid(e.target.value);
                              if (Number(e.target.value) > Number(art.LatestBid)) {
                                setBidable(false);
                              } else {
                                {
                                  setBidable(true);
                                }
                              }
                            }}
                          ></input>
                                             {!isLogin ? (
                         <button
                         className="buy-btn text-md text-white text-center font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded-2xl"
                         onClick={PlaceBid}
                         disabled={bidable}
                       >
                         Bid Now!
                       </button>
                        ) : (
                          <>
                            <h1>It’s mine!</h1>
                          </>
                        )}
                    
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="flex item-bottom justify-between my-4 col-12 details-col-form">
                      <div
                        className="flex  text-center item-center "
                        style={{ margin: "0px auto" }}
                      >
                        <Image
                          src="/loader.gif"
                          alt="Picture of the author"
                          width={250}
                          height={250}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  {isLogin ? (
                    <>
                      {/* <div className="flex item-bottom justify-between my-4 details-col-form">
                      <div className="flex  item-center ">
                        <h5 className="mr-5 font-medium">Update Price</h5>
                        <input
                          type="text"
                          onChange={(e) => {
                            setnewPrice(e.target.value);
                            console.log("newPrice", newPrice);
                          }}
                          name="updatePrice"
                          placeholder="5000 BITXMI"
                          className="appearance-none  p-3 text-xs font-semibold leading-none bg-blueGray-50 rounded outline-none rounded-3xl"
                        ></input>
                      </div>
                      <button onClick={UpdatePrice} className="inline-block ">
                        Update
                      </button>
                    </div>

                    <div className="flex justify-between mb-3 item-bottom details-col-form"> 
                      <div className="flex  item-center">
                        <h5 className="mr-3 font-medium">Update Listing</h5>
                        <input
                          onChange={(e) => {
                            _onSale = Boolean(!!e.target.value);
                            console.log(_onSale);
                          }}
                          type="text"
                          name="updatePrice"
                          placeholder="true or false"
                          className="appearance-none p-3 text-xs font-semibold leading-none bg-blueGray-50 rounded outline-none rounded-3xl"
                        ></input>
                      </div>

                      <button className="inline-block" onClick={UpdateListing}>
                        Update
                      </button>
                    </div>*/}
                    </>
                  ) : (
                    <>
                      {/* <div className="flex item-bottom justify-between my-4 col-12 details-col-form">
                      <div className="flex  text-center item-center " style={{margin: "0px auto"}}>
                      <Image
                        src="/loader.gif"
                        alt="Picture of the author"
                        width={250}
                        height={250}
                      />
                       </div>
                    </div>
                   */}
                    </>
                  )}
                </div>

                <div className="mt-8 custom-tabs">
                  <div className="inline-flex flex-wrap py-1 bg-white rounded text-sm mb-8 w-full">
                    <Tabs>
                      <TabList>
                        {art.Auctioned != true ? (
                          <Tab>
                            <button className="py-2 rounded-3xl text-gray-500  text-xl">
                              Owner
                            </button>
                          </Tab>
                        ) : (
                          <Tab>
                            <button className="py-2 rounded-3xl text-gray-500  text-xl">
                              Offers
                            </button>
                          </Tab>
                        )}

                        <Tab>
                          <button className="py-2 rounded-3xl text-xl">
                            History
                          </button>
                        </Tab>
                        <Tab>
                          <button className="py-2   rounded-3xl text-xl">
                            Info
                          </button>
                        </Tab>
                      </TabList>

                      {art.Auctioned != true ? (
                        <TabPanel>
                          <div>
                            <br />
                            <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0 tab-panel-col">
                              <img
                                className="rounded"
                                src={
                                  owner.avatar
                                    ? owner.avatar
                                    : "/images/artistdp.png"
                                }
                                alt=""
                                width="70"
                                height="70"
                              ></img>

                              <div className="w-full md:w-2/3 px-4 md:mb-0">
                                <h6 className="mb-2 leading-tight font-bold font-heading text-gray-500">
                                  Owned by
                                </h6>
                                <p className="text-gray-500 mb-0">
                                  {owner.ArtistName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                      ) : (
                        <TabPanel>
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Date</th>
                                <th scope="col">From</th>
                                <th scope="col">BXMI Token</th>
                                <th scope="col">USDT </th>
                                <th scope="col"> </th>
                              </tr>
                            </thead>
                            <tbody>
                              {bids &&
                                !!bids.length &&
                                bids.map((o, i) => (
                                  <tr key={i}>
                                    <td>
                                      {new Date(o.createdAt).toDateString()}
                                    </td>
                                    <td>{shortenHex(o.PublicAddress, 4)}</td>
                                    <td>{o.Bid}</td>
                                    <td>
                                      {Math.round(Number(o.Bid) * bxmiPrice)}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </TabPanel>
                      )}

                      <TabPanel>
                        <div>
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {artLog &&
                                !!artLog.length &&
                                artLog.map((o, i) => (
                                  <tr key={i}>
                                    <td>
                                      {new Date(o.createdAt).toDateString()}
                                    </td>
                                    <td>{o.Description}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div>
                          <div className="mb-4">
                            <h5 className="font-medium text-xl text-gray-500">
                              NFT ID
                            </h5>

                            <p className="font-medium text-blue-500">
                              <a
                                style={{ color: "#0d6efd" }}
                                className="text-blue-500 font-medium"
                                target="_blank"
                                href={
                                  "https://etherscan.com/token/" +
                                  art.ContractAddress +
                                  "?a=" +
                                  art.NFTId
                                }
                                rel="noopener noreferrer"
                              >
                                {art.NFTId}
                              </a>
                            </p>
                          </div>

                          <div className="mb-4">
                            <h5 className="font-medium text-xl text-gray-500">
                              MINT TRANSACTION
                            </h5>
                            <p>
                              <a
                                style={{ color: "#0d6efd" }}
                                className="text-blue-500 font-medium"
                                target="_blank"
                                href={
                                  "https://etherscan.com/tx/" +
                                  art.MintTransaction
                                }
                                rel="noopener noreferrer"
                              >
                                {art.MintTransaction
                                  ? shortenHex(art.MintTransaction, 4)
                                  : ""}
                              </a>
                            </p>
                          </div>
                          <div className="mb-4">
                            <h5 className="font-medium text-xl text-gray-500">
                              CONTRACT ADDRESS
                            </h5>
                            <p>
                              <a
                                style={{ color: "#0d6efd" }}
                                className="text-blue-500 font-medium"
                                target="_blank"
                                href={
                                  "https://etherscan.com/address/" +
                                  art.ContractAddress
                                }
                                rel="noopener noreferrer"
                              >
                                {art.ContractAddress
                                  ? shortenHex(art.ContractAddress, 4)
                                  : ""}
                              </a>
                            </p>
                          </div>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>

                <div className="col-12 shipping-collapse-icon text-end">
                  <h3 className="mb-4 mt-4">Shipping Information</h3>
                  <a
                    onClick={shippingAddressCollapse}
                    className="d-flex"
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ display: `${collapsePlusIcon}` }}
                    />
                    <FontAwesomeIcon
                      icon={faMinus}
                      style={{ display: `${collapseMinusIcon}` }}
                    />
                  </a>
                </div>

                <div className={`Shiping-col nft-form ${shippingColShow}`}>
                  <div className="row">
                    <div className="Col-12 mb4">
                      <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                        Full Name
                      </label>

                      <input
                        className="form-control"
                        name="name"
                        id="Name"
                        type="text"
                        placeholder="John Doe"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div className="Col-12 mb4">
                      <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                        Email
                      </label>

                      <input
                        className="form-control"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      ></input>
                    </div>

                    <div className="Col-12  col-md-6 mb4">
                      <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                        Address
                      </label>

                      <input
                        className="form-control "
                        name="address"
                        id="address"
                        type="text"
                        placeholder="Full Address"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      ></input>
                    </div>

                    <div className="Col-12  col-md-6 mb4">
                      <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                        Town / City
                      </label>

                      <input
                        className="form-control "
                        name="city"
                        id="city"
                        type="text"
                        placeholder="Town / City"
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      ></input>
                    </div>

                    <div className="Col-12  col-md-6 mb4">
                      <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                        Country
                      </label>

                      <input
                        className="form-control "
                        name="country"
                        id="country"
                        type="text"
                        placeholder="Country"
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      ></input>
                    </div>

                    <div className="Col-12  col-md-6 mb4">
                      <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                        Mobile/Phone
                      </label>

                      <input
                        className="form-control "
                        name="phone"
                        id="phone"
                        type="phone"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      ></input>
                    </div>
                    <button
                      className="buy-btn text-md text-white text-center font-semibold leading-none bg-green-600 hover:bg-blue-700 rounded-2xl"
                      onClick={SaveAddress}
                      // disabled={isLogin}
                    >
                      Save Address
                    </button>
                  </div>
                </div>

                {addressSuccessAlert == "active" ? (
                  <div
                    className="alert alert-success  alert-dismissible fade show mt-4"
                    role="alert"
                  >
                    <strong className="text-center">
                      Address Saved Successfully
                    </strong>
                    <a onClick={() => alertCloseHandler()}>
                      <FontAwesomeIcon icon={faPlus} />
                    </a>
                  </div>
                ) : (
                  <></>
                )}

                {addressWarningAlert == "active" ? (
                  <div
                    className="alert alert-danger  alert-dismissible fade show mt-4"
                    role="alert"
                  >
                    <strong className="text-center">
                      All fields are required
                    </strong>
                    <a onClick={() => alertCloseHandler()}>
                      <FontAwesomeIcon icon={faPlus} />
                    </a>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {/* <div className="col-12 auction-details-col custom-tabs">
              <div className="auction-details-desc-col">
                <h3>Details</h3>

                <Tabs>
                  <TabList>
                    <Tab>
                      <button className="py-2 rounded-3xl text-gray-500  text-xl">
                        Token
                      </button>
                    </Tab>
                    <Tab>
                      <button className="py-2 rounded-3xl text-xl">
                        Diamond
                      </button>
                    </Tab>
                    <Tab>
                      <button className="py-2   rounded-3xl text-xl">
                        Certificate
                      </button>
                    </Tab>
                    <Tab>
                      <button className="py-2   rounded-3xl text-xl">
                        Owener
                      </button>
                    </Tab>
                  </TabList>

                  <TabPanel>
                    <div>
                      <br />
                      <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0 tab-panel-col">

                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div>
                      <br />

                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div>

                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div>
                      <br />

                    </div>
                  </TabPanel>
                </Tabs>

              </div>
            </div> */}
          </div>
        </div>
      </div>
      {animationGif == "active" ? (
        <ConfettiGif animationTittle="Congratulations!!" />
      ) : (
        <></>
      )}
    </>
  );
}
export async function getServerSideProps({ params: { id } }) {
  const Arturl = `${process.env.Baseurl}/api/art/${id}`;
  const Artres = await fetch(Arturl);
  const Artdata = await Artres.json();

  const Ownerurl = `${process.env.Baseurl}/api/user/${Artdata.OwnerId}`;
  const Ownerres = await fetch(Ownerurl);
  const Ownerdata = await Ownerres.json();

  const Creatorurl = `${process.env.Baseurl}/api/user/${Artdata.CreatorId}`;
  const Creatorres = await fetch(Creatorurl);
  const Creatordata = await Creatorres.json();

  const ArtLogurl = `${process.env.Baseurl}/api/artlogs/${Artdata._id}`;
  const ArtLogres = await fetch(ArtLogurl);
  const ArtLogdata = await ArtLogres.json();
  console.log("ArtLogdata_id", Artdata._id);
  console.log("ArtLogdata", ArtLogdata);

  //
  const BidsUrl = `${process.env.Baseurl}/api/bids/bids/${id}`;
  const Bidres = await fetch(BidsUrl);
  const BidData = await Bidres.json();
  //
  const url2 = "https://openapi.bitxmi.com/sapi/v1/ticker?symbol=bxmiusdt";

  const res2 = await fetch(url2);
  const rate = await res2.json();
  console.log("rate", rate.sell);
  return {
    props: {
      art: Artdata,
      owner: Ownerdata,
      creator: Creatordata,
      artLog: ArtLogdata,
      bids: BidData,
      bxmiPrice: rate.sell,
    },
  };
}
