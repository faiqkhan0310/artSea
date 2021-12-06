import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Web3 from "web3";

import jwtDecode from "jwt-decode";
import ConfettiGif from "../../components/layout/confettigif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faDotCircle,
  faEllipsisV,
  faMapMarkedAlt,
  faMapMarker,
  faPlay,
  faSearch,
  faShare,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faFolder, faHeart } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Countdown from "react-countdown";
import Artists from "../artists";

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
export default function Art({
  art,
  owner,
  creator,
  artLog,
  bids,
  bxmiPrice,
  ethPrice,
}) {
  const bidPublicAddress = bids.PublicAddress;
  console.log(bids, "bids");

  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setCompletedAuction(true);
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className="countdown-span">
          {" "}
          <span>
            {days} <p>Days</p>
          </span>
          <span>
            {hours} <p>Hrs</p>
          </span>
          <span>
            {minutes} <p>Mins</p>
          </span>
          <span>
            {seconds} <p>Secs</p>
          </span>
        </span>
      );
    }
  };

  var ls = null;
  var publicAddress = null;

  var _onSale: boolean = true;
  var THash = "";
  const today = new Date();
  const [completedAuction, setCompletedAuction] = useState(false);
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
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipBidOpen, setTooltipBidOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const toggleBid = () => setTooltipBidOpen(!tooltipBidOpen);

  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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

  let Abijson = require("../../erc721_abi.json");
  let Tokenjson = require("../../token.json");
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
        Auctioned: false,
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
      console.log("price", art.PriceBNB);
      const _price = web3.utils.toWei(art.PriceBNB, "ether");
      //{Approve Tokens from erc20 Smart Contracr}
      // var Erc20Contracts = await new web3!.eth.Contract(
      //   Tokenjson,
      //   process.env.ERC2OAddress
      // );

      setLoading(true);
      // setState({ ...state, loading: true });
      publicAddress = pa;
      // if (art.Minted == false) {
      //   const Transfer = await Erc20Contracts.methods
      //     .transfer(owner.PublicAddress, _price)
      //     .send({
      //       from: publicAddress,
      //     })
      //     .on("transactionHash", function (hash) {
      //       console.log("receipt", hash);
      //       setAnimationGif("active");
      //       updateNft(art._id, UserId, hash);
      //       setLoading(false);
      //       artlog(art._id, UserId);
      //       router.reload();
      //       return;
      //       // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      //     });
      //   console.log("ApproveHash", Transfer);

      //   //
      //   return;
      // }

      // const Approve = await Erc20Contracts.methods
      //   .approve(process.env.ERC721Address, _price)
      //   .send({
      //     from: publicAddress,
      //     gasPrice: "10000000000",
      //     gas: 400000,
      //   });
      // console.log("ApproveHash", Approve);

      // {Purchase With Token}
      var contract = await new web3!.eth.Contract(
        Abijson,
        process.env.ERC721Address
      );

      // const Purchase = await contract.methods.buywithToken(_id, _price).send({
      //   from: publicAddress,
      //   gasPrice: "10000000000",
      //   gas: 1500000,
      // });

      console.log("publicaddres", publicAddress);

      const Purchase = await contract.methods.buy(_id).send({
        from: publicAddress,
        gasPrice: "10000000000",
        gas: 1500000,
        value: _price,
      });

      THash = Purchase.transactionHash;
      console.log(THash);
      setAnimationGif("active");
      updateNft(art._id, UserId, THash);
      setLoading(false);
      artlog(art._id, UserId);
    } catch (err) {
      setLoading(false);
      // router.reload();
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

  const completefullAuction = async () => {
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
      const _price = web3.utils.toWei(art.PriceBNB, "ether");
      //{Approve Tokens from erc20 Smart Contracr}
      // var Erc20Contracts = await new web3!.eth.Contract(
      //   Tokenjson,
      //   process.env.ERC2OAddress
      // );
      setLoading(true);
      // setState({ ...state, loading: true });
      publicAddress = pa;
      if (art.Minted == false) {
        // const Transfer = await Erc20Contracts.methods
        //   .transfer(owner.PublicAddress, _price)
        //   .send({
        //     from: publicAddress,
        //   }).on('transactionHash', function (hash) {
        //     console.log("receipt", hash)
        //     setAnimationGif("active");
        //     updateNft(art._id, UserId, hash);
        //     setLoading(false);
        //     artlog(art._id, UserId);
        //     router.reload();
        //     return;
        //     // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        //   });
        // console.log("ApproveHash", Transfer);
        // return;
      }
      // const Approve = await Erc20Contracts.methods
      //   .approve(process.env.ERC721Address, _price)
      //   .send({
      //     from: publicAddress,
      //     gasPrice: "10000000000",
      //     gas: 400000,
      //   });
      // console.log("ApproveHash", Approve);
      // {Purchase With ETH}

      // const winnerId = bids.ArtistId

      const res = await fetch(`/api/bids/bids/${art._id}`, {
        body: JSON.stringify({
          Win: true,
          WinDate: new Date(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      const res2 = await res.json();
      // console.log("Bid", res2);
      const { data } = res2;
      const winnerID = data.ArtistId;
      setAnimationGif("active");
      console.log(winnerID, "winnerID");

      var contract = await new web3!.eth.Contract(
        Abijson,
        process.env.ERC721Address
      );
      const auctionCompleted = await contract.methods
        .completeAuction(_id)
        .send({
          from: publicAddress,
          gasPrice: "10000000000",
          gas: 1500000,
        });
      console.log("PurchaseHash", auctionCompleted);
      THash = auctionCompleted.transactionHash;
      console.log(THash);
      setAnimationGif("active");
      updateNft(art._id, winnerID, THash);
      setLoading(false);
      artlog(art._id, winnerID);
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

  const PlaceBid = async () => {
    if (Number(latestBid) <= Number(art.LatestBid)) {
      alert("Please enter higher bid amount");

      return;
    }

    console.log(publicAddress, "publicAddress");
    const res = await fetch("/api/bids/", {
      body: JSON.stringify({
        PublicAddress: pa,
        Bid: latestBid,
        ArtId: art._id,
        ArtistId: UserId,
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
        PublicAddressBidWinner: pa,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    const updateNftres = await updateNft.json();
    console.log("UpdateNFT", updateNftres);

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

      const _tokenId = art.NFTId;
      publicAddress = pa;
      const _price = web3.utils.toWei(latestBid, "ether");
      setLoading(true);

      const bidAuction = await contract.methods.bidInBNB(_tokenId).send({
        from: publicAddress,
        gasPrice: "10000000000",
        gas: 1500000,
        value: _price,
      });

      // console.log("PurchaseHash", Purchase);
      THash = bidAuction.transactionHash;
      console.log(THash);
      setAnimationGif("active");

      // setState({ ...state, loading: true });

      // const priceUpdate = await contract.methods
      //   .updatePrice(_id, _price)
      //   .send({ from: publicAddress });

      //return { signature };
    } catch (err) {
      throw new Error(
        err
        // 'You need to sign the message to be able to log in.'
      );
    }

    // artlog(res2._id);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec

    router.reload();
    setAnimationGif("");
  };

  return (
    <>
      <section className="details-section">
        <div className="container">
          <div className="row details-row mb-4">
            <div className="col-12 col-md-6 details-col  ps-0">
              <div className="product-card-img ">
                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img className="w-full" src={art.Url} />
                </div>
                <span className="timer">3:49</span>
              </div>
            </div>

            <div className="col-12 col-md-6 details-col-desc ">
              <div className="details-desc">
                <div className="details-desc-title">
                  <div>
                    <h1 className="text-uppercase">{art.name}</h1>
                    <p className="mt-3">
                      <FontAwesomeIcon icon={faMapMarker} /> {art.Location}
                    </p>
                  </div>

                  <div className="details-col-icons">
                    <FontAwesomeIcon icon={faShare} />
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </div>
                </div>

                <div className="details-desc-artists mt-3">
                  <h5>artists</h5>
                  <ul>
                    <li className="d-flex align-items-center justify-content-between">
                      <Image
                        src={"/image/curator.png"}
                        height={30}
                        width={30}
                      />{" "}
                      <span className="ms-2">{creator.ArtistName}</span>
                    </li>
                    {/* <li><Image src={"/image/artist-2.png"} height={30} width={30} /></li>
                                        <li><Image src={"/image/artist-3.png"} height={30} width={30} /></li>
                                        <li><Image src={"/image/artist-4.png"} height={30} width={30} /></li> */}
                  </ul>
                </div>

                <div className="details-desc-artists d-flex align-items-center d-none justify-content-between mt-3">
                  <div className="w-50">
                    <h5>artist</h5>
                    <ul>
                      <li className="d-flex align-items-center justify-content-between">
                        <Image
                          src={"/image/artist-1.png"}
                          height={30}
                          width={30}
                        />{" "}
                        <span className="ms-2">@Banner</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-50 auction-bidders-col">
                    <h5>Bidders</h5>
                    <ul>
                      <li className="">
                        <Image
                          src={"/image/artist-1.png"}
                          height={30}
                          width={30}
                        />
                      </li>
                      <li>
                        <Image
                          src={"/image/artist-2.png"}
                          height={30}
                          width={30}
                        />
                      </li>
                      <li>
                        <Image
                          src={"/image/artist-3.png"}
                          height={30}
                          width={30}
                        />
                      </li>
                      <li>
                        <Image
                          src={"/image/artist-4.png"}
                          height={30}
                          width={30}
                        />
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="details-about-track mb-5">
                  <h5>About Art</h5>
                  <p>{art.Description}</p>
                </div>

                {!art.Auctioned ? (
                  <div className="details-price d-inline-block">
                    <span className="mb-2">Price</span>
                    <h2 className="mb-3">{art.PriceBNB} BNB</h2>
                    <p>{parseFloat(art.PriceBNB) * ethPrice} $</p>
                  </div>
                ) : (
                  <div className="details-price d-inline-block w-50">
                    
                    
                      {art.LatestBid ? (
                        <>
                        <span className="mb-3 d-block">Latest Bid</span>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className=" d-flex align-items-center ">
                            <span className="ms-0">
                              <p className="mb-2">
                                <b>bid placed by</b>{" "}
                                <span style={{ color: "rgba(0, 0, 0, 0.25)" }}>
                                  {Artists}@punk4636
                                </span>
                              </p>
                              <p className="mb-0">{bids[0].createdAt}</p>
                            </span>
                          </div>

                          <div className=" d-flex align-items-center">
                            <span className="ms-0">
                              <p className="mb-2">
                                <b>{bids[0].Bid} BNB</b>
                              </p>
                              <p className="mb-0">
                                {parseFloat(bids[0].Bid) * ethPrice} $
                              </p>
                            </span>
                          </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="details-price d-inline-block">
                            <span className="mb-2">Price</span>
                            <h2 className="mb-3">{art.PriceBNB} BNB</h2>
                            <p>{parseFloat(art.PriceBNB) * ethPrice} $</p>
                          </div>
                        </>
                      )}
                    </div>
                  
                )}

                {/* <div className="details-price  d-none auction-details-price d-flex align-items-center justify-content-between">
                  <div className=" w-50">
                    <span className="mb-2">Highest Bid</span>
                    <h2 className="mb-3">{art.Price} ETH</h2>
                    <p className="mb-0">$53,364.46 </p>
                  </div>

                  <div className="w-50 ps-4 pe-2">
                    <span className="mb-2">Ending In</span>
                    <Countdown
                      date={Date.now() + 5000000}
                      renderer={renderer}
                    />
                  </div>
                </div> */}

                {isLogin ? (
                  <>
                    {!art.Auctioned ? (
                      <>
                        <div className="text-center">
                          <div className="form-check form-switch d-inline-block">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                            />
                            <label
                              className="form-check-label mb-4"
                              htmlFor="flexSwitchCheckDefault"
                            >
                              Available For Sale
                            </label>
                          </div>
                        </div>

                        <div className="text-center d-flex mx-auto">
                          <div className="form-group d-flex mx-auto">
                            <input
                              className="form-control p-2 me-3"
                              type="number"
                              style={{
                                width: "100px",
                                border: "1px solid #18A1FF",
                              }}
                            />
                            <a className="btn offer-btn animate__animated text-capitalize">
                              Update Price
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {!completedAuction ? (
                          <>
                            <div className="w-50 ps-4 pe-2 auction-bid-timer">
                              <span className="mb-2">Ending In</span>
                              <Countdown
                                date={
                                  Date.now() +
                                  Math.round(
                                    Date.parse(art.EndAuction) -
                                      Date.parse(today.toString())
                                  )
                                }
                                renderer={renderer}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <a
                              className="btn offer-btn animate__animated"
                              // className="buy-btn text-md text-white text-center font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded-2xl"
                              onClick={completefullAuction}
                            >
                              Complete Auction
                            </a>
                          </>
                        )}
                      </>
                    )}

                    <div className="details-col-btn justify-content-center ">
                      <a
                        className="btn offer-btn animate__animated text-capitalize"
                        aria-disabled
                      >
                        It's Mine
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    {!art.Auctioned ? (
                      <div className="details-col-btn">
                        <button
                          className="btn offer-btn animate__animated"
                          disabled={!art.OnSale}
                        >
                          make offer
                        </button>
                        <button
                          onClick={() => purchaseArt()}
                          className="btn offer-btn animate__animated"
                          disabled={!art.OnSale}
                        >
                          buy now
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-50 ps-4 pe-2 auction-bid-timer">
                          <span className="mb-1 d-block">Ending In</span>
                          <Countdown
                            date={
                              Date.now() +
                              Math.round(
                                Date.parse(art.EndAuction) -
                                  Date.parse(today.toString())
                              )
                            }
                            renderer={renderer}
                          />
                        </div>

                        <div className="details-col-btn mt-5">
                          {!completedAuction ? (
                            <>
                              <div className="form-group w-50">
                                <input
                                  type="text"
                                  // min="0"
                                  // step="0.000000000000000001"
                                  className="form-control "
                                  placeholder="Please enter amount here"
                                  style={{
                                    border: "1px solid #18A1FF",
                                    backgroundColor: "transparent",
                                  }}
                                  onChange={(e) => {
                                    setlatestBid(e.target.value);
                                  }}
                                />
                              </div>

                              <button
                                onClick={() => PlaceBid()}
                                type={"button"}
                                disabled={
                                  bids.PublicAddress && bids.Bid < art.LatestBid
                                    ? true
                                    : false
                                }
                                className="btn offer-btn animate__animated"
                              >
                                bid now
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type={"button"}
                                disabled={true}
                                className="btn offer-btn animate__animated"
                              >
                                Auction Ended
                              </button>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-7 detail-col-tabs mt-4">
              <div className="detail-col-tabs-content nav-tabs-col">
                <div className=" ">
                  <nav>
                    <div
                      className="nav nav-tabs mb-5"
                      id="nav-tab"
                      role="tablist"
                    >
                      <button
                        className="nav-link animate__animated active"
                        id="nav-profile-tab1"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-tabContent1"
                        type="button"
                        role="tab"
                        aria-controls="nav-tabContent1"
                        aria-selected="true"
                      >
                        Details
                      </button>

                      <button
                        className="nav-link animate__animated"
                        id="nav-profile-tab1"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile1"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        Owners
                      </button>

                      <button
                        className="nav-link animate__animated"
                        id="nav-contact-tab2"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact2"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        History
                      </button>

                      <button
                        className="nav-link animate__animated"
                        id="nav-contact-tab3"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact3"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        Offers
                      </button>

                      <button
                        className="nav-link animate__animated"
                        id="nav-contact-tab4"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact4"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        Artist
                      </button>
                    </div>
                  </nav>

                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-tabContent1"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab1"
                    >
                      <div className="tabs-content-details">
                        <ul>
                          <li>
                            <span>
                              <b>Created By</b>
                            </span>{" "}
                            <span>
                              <Link href="">
                                <a style={{ color: "#18A1FF !important" }}>
                                  {" "}
                                  {creator.ArtistName}
                                </a>
                              </Link>{" "}
                            </span>
                          </li>
                          <li>
                            <span>
                              <b>Contract Address</b>
                            </span>{" "}
                            <span>{art.ContractAddress}</span>
                          </li>
                          <li>
                            <span>
                              <b>Token ID</b>
                            </span>{" "}
                            <span>1234</span>
                          </li>
                          <li>
                            <span>
                              <b>Blockchain</b>
                            </span>{" "}
                            <span>BNB</span>
                          </li>
                          <li>
                            <span>
                              <b>Copyrights</b>
                            </span>{" "}
                            <span>No</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-profile1"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab1"
                    >
                      ...
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-contact2"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab2"
                    >
                      ...s
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-contact3"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab3"
                    >
                      ...ss
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-contact4"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab4"
                    >
                      ...sss
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-5 bids-col mt-4">
              <div className="bid-col-desc">
                <h4 className="mb-4">Provenance</h4>
                <ul>
                  {bids.map((b) => (
                    <li className="d-flex align-items-center justify-content-between">
                      <div className=" d-flex align-items-center">
                        <img src="/image/curator.png" />
                        <span className="ms-2">
                          <p className="mb-0">
                            <b>bid placed by</b>{" "}
                            <span style={{ color: "rgba(0, 0, 0, 0.25)" }}>
                              @punk4636
                            </span>
                          </p>
                          <p className="mb-0">{b.createdAt}</p>
                        </span>
                      </div>

                      <div className=" d-flex align-items-center">
                        <span className="ms-2">
                          <p className="mb-0">
                            <b>{b.Bid} BNB</b>
                          </p>
                          <p className="mb-0">
                            {parseFloat(b.Bid) * ethPrice} $
                          </p>
                        </span>
                        <Link href="">
                          <a className="ms-3">
                            <FontAwesomeIcon
                              className=""
                              icon={faShare}
                            ></FontAwesomeIcon>
                          </a>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="sub-title-col">
              <h5>You might also like</h5>
            </div>

            <div className="col-12 col-md-3 product-card">
              <div className="product-card-img mb-4">
                <div className="like-play-col">
                  <span>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>342</p>
                  </span>

                  <span>
                    <FontAwesomeIcon icon={faHeart} />
                    <p>20</p>
                  </span>
                </div>
                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img
                    className="img-fluid w-100"
                    src="/image/productImg1.png"
                  />
                </div>
                <span className="timer">3:49</span>
              </div>
              <div className="product-card-details">
                <ul>
                  <li>
                    <h5>Higher Power</h5>
                    <h5>1.6 BNB</h5>
                  </li>
                  <li>
                    <span>
                      <Image
                        src="/image/curator.png"
                        height="30px"
                        width="30px"
                      />{" "}
                      <small>@ Coldplay</small>
                    </span>
                    <span>Highest Bid</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-12 col-md-3 product-card">
              <div className="product-card-img mb-4">
                <div className="like-play-col">
                  <span>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>342</p>
                  </span>

                  <span>
                    <FontAwesomeIcon icon={faHeart} />
                    <p>20</p>
                  </span>
                </div>
                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img
                    className="img-fluid w-100"
                    src="/image/productImg2.png"
                  />
                </div>
                <span className="timer">3:49</span>
              </div>
              <div className="product-card-details">
                <ul>
                  <li>
                    <h5>Higher Power</h5>
                    <h5>1.6 BNB</h5>
                  </li>
                  <li>
                    <span>
                      <Image
                        src="/image/curator.png"
                        height="30px"
                        width="30px"
                      />{" "}
                      <small>@ Coldplay</small>
                    </span>
                    <span>Highest Bid</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-12 col-md-3 product-card">
              <div className="product-card-img mb-4">
                <div className="like-play-col">
                  <span>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>342</p>
                  </span>

                  <span>
                    <FontAwesomeIcon icon={faHeart} />
                    <p>20</p>
                  </span>
                </div>
                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img
                    className="img-fluid w-100"
                    src="/image/productImg16.png"
                  />
                </div>
                <span className="timer">3:49</span>
              </div>
              <div className="product-card-details">
                <ul>
                  <li>
                    <h5>Higher Power</h5>
                    <h5>1.6 BNB</h5>
                  </li>
                  <li>
                    <span>
                      <Image
                        src="/image/curator.png"
                        height="30px"
                        width="30px"
                      />{" "}
                      <small>@ Coldplay</small>
                    </span>
                    <span>Highest Bid</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-12 col-md-3 product-card">
              <div className="product-card-img mb-4">
                <div className="like-play-col">
                  <span>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>342</p>
                  </span>

                  <span>
                    <FontAwesomeIcon icon={faHeart} />
                    <p>20</p>
                  </span>
                </div>
                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img
                    className="img-fluid w-100"
                    src="/image/productImg6.png"
                  />
                </div>
                <span className="timer">3:49</span>
              </div>
              <div className="product-card-details">
                <ul>
                  <li>
                    <h5>Higher Power</h5>
                    <h5>1.6 BNB</h5>
                  </li>
                  <li>
                    <span>
                      <Image
                        src="/image/curator.png"
                        height="30px"
                        width="30px"
                      />{" "}
                      <small>@ Coldplay</small>
                    </span>
                    <span>Highest Bid</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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
  const url2 = "https://openapi.bitxmi.com/sapi/v1/ticker?symbol=ethusdt";

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

      ethPrice: rate.sell,
    },
  };
}
