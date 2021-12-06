import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { faPlus, faMinus, faChevronDown, faInfo, faTag, faPen, faMapMarker, faHeart, faEye, faEnvelopeOpen, faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTumblr,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";
import Countdown from 'react-countdown';



const LS_KEY = "login-with-metamask:auth";
interface JwtDecoded {
  payload: {
    id: string;
    PublicAddress: string;
  };
}

export default function Profile({ artist, arts, pa }) {
  console.log(arts , "artData")

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const [isLogin, setIsLogin] = useState(false);
  var ls = null;
  var publicAddress = null;
  useEffect(() => {

    
    try {
      // Access token is stored in localstorage
      ls = (window as any).localStorage.getItem(LS_KEY);
      const {
        payload: { id, PublicAddress },
      } = jwtDecode<JwtDecoded>(ls);
      publicAddress = PublicAddress;
      
      if (publicAddress == pa) {
        setIsLogin(true);
      }
    }
    catch (err) {
      // alert("install & login Metamask")
      console.log(err)
    }
  }, []);

  function shortenHex(hex: string, length = 4) {
    return `${hex.substring(0, length + 2)}…${hex.substring(
      hex.length - length
    )}`;
  }

  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span className="countdown-span"> <span>{days} <p>Days</p></span><span>{hours} <p>Hrs</p></span><span>{minutes} <p>Mins</p></span><span>{seconds} <p>Secs</p></span></span>;
    }
  };

  return (
    <div>

      <section className="discover-section">
        <div className="container">
          <div className="row">
            <div className="col-12 profile-banner">
              <div className="profile-banner-desc" style={{ backgroundImage: `url( ${artist?.backPic ? artist?.backPic : "/image/profileBanner.png"})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                {isLogin ? (
                  <Link
                    href={"/profile/editProfile/[PublicAddress]"}
                    as={`/profile/editProfile/${artist.PublicAddress}`}
                  >
                    <a className="btn animate__animated ">Edit Profile</a>
                  </Link>
                ) : (
                  <></>
                )}
              </div>

            </div>

            <div className="col-12 col-md-3 profile-sidebar">
              <div className="profile-card">
                <div className="text-center profile-pic mb-3">

                  <img className="rounded" src={artist?.avatar ? artist?.avatar : "/image/profileImg.png"} alt="" width={165} height={165} />
                </div>
                <div className=" mx-auto">
                  <h2 className="text-4xl mb-0 text-center">
                    <pre style={{ marginBottom: "0px" }}>{artist?.ArtistName}</pre>
                  </h2>
                  <div className="mb-2 text-center">
                    <span className=" " style={{ color: "#616161" }}>0xe1ac…b57c</span>
                    <span className="text-gray-300 ms-2 text-xl" style={{ color: "#616161" }}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" className="svg-inline--fa fa-copy fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z" />
                      </svg>
                    </span>
                  </div>

                  <div className="mb-2 text-center">
                    <span className="text-gray-300 me-2 ">
                      <FontAwesomeIcon icon={faMapMarker} style={{ color: "#616161" }} />
                    </span>
                    <span className="leading-tight font-bold font-heading ">Toronto, Ontario</span>
                  </div>

                </div>
                <div className="profile-pic-col">
                  <ul>
                    <li><span className="text-1xl font-semiblod">14 K</span><span>Followers</span></li>
                    <li><span>3 K</span><span>Following</span></li>
                    <li><span>30</span><span>Art Work</span></li>
                    <li><span>35M</span><span>Likes</span></li>
                  </ul>
                </div>
                <p >     </p>
                <p className="mb-3 text-center">
                  {artist?.Description
                    ? artist.Description
                    : `Born in Warsaw, 1986. Graduated in 2011, (Animated Film Studio) at the Faculty of Graphic in the Academy of Fine Arts in Warsaw.
                      Since 2011 makes murals with Adam Walas as Xolor (ex Ad manum). `}
                </p>

              </div>



              <div className="profile-follower-col">
                <h5 className="mb-3">Social Links</h5>
                <ul>

                  <li>
                    <Link href={artist?.twitter || ""} >
                      <a className="" target="_blank">
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </Link>
                  </li>

                  <li className="ms-3">
                    <Link href={artist?.instagram || ""}>
                      <a className="" target="_blank">
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    </Link>
                  </li>

                  <li className="ms-3">
                    <Link href={artist?.facebook || ""}>
                      <a className="" target="_blank">
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                    </Link>
                  </li>

                  <li className="ms-3">
                    <Link href={artist?.youtube || ""}>
                      <a className="" target="_blank">
                        <FontAwesomeIcon icon={faYoutube} />
                      </a>
                    </Link>
                  </li>

                  <li className="ms-3">
                    <Link href={artist?.website || ""}>
                      <a className="" target="_blank">
                        <FontAwesomeIcon icon={faGlobe} />
                      </a>
                    </Link>
                  </li>

                </ul>
              </div>


            </div>

            <div className="col-12 col-md-9 profile-details">

              <div className="profile-details-tabs">
                <div className="row">
                  <div className="col-12 nav-tabs-col">
                    <nav>
                      <div className="nav nav-tabs mb-5" id="nav-tab" role="tablist">
                        <button className="nav-link animate__animated active" id="nav-profile-tab1" data-bs-toggle="tab" data-bs-target="#nav-tabContent1" type="button" role="tab" aria-controls="nav-tabContent1" aria-selected="true">All</button>
                        <button className="nav-link animate__animated" id="nav-profile-tab1" data-bs-toggle="tab" data-bs-target="#nav-profile1" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Auction</button>
                        <button className="nav-link animate__animated" id="nav-contact-tab2" data-bs-toggle="tab" data-bs-target="#nav-contact2" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Sale</button>
                        <button className="nav-link animate__animated" id="nav-contact-tab3" data-bs-toggle="tab" data-bs-target="#nav-contact3" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Sold</button>

                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div className="tab-pane fade show active" id="nav-tabContent1" role="tabpanel" aria-labelledby="nav-profile-tab1">
                        <div className="row">


                          {/* <div className="col-12 col-md-4 product-card">
                            <div className="product-card-img mb-4">

                              <div className="transparent-bg-img">
                                <div className="transparent-bg"></div>
                                <img className="img-fluid w-100" src="/image/a1.png" />
                              </div>

                            </div>

                            <div className="product-card-details">
                              <ul>
                                <li>
                                  <h5>Higher Power</h5>
                                  <h5>1.6 ETH</h5>
                                </li>
                                <li>
                                  <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                  <span>Highest Bid</span>
                                </li>
                              </ul>
                            </div>
                          </div> */}

                          {arts &&
                      arts.map((o) => (
                        <>
                          {
                            <>
                              <div className="col-12 col-md-4 product-card">
                                <div className="product-card-img mb-4">
                                  <Link href={"/art/[id]"} as={`/art/${o._id}`}>
                                    <a>
                                      <div className="transparent-bg-img">
                                        <div className="transparent-bg"></div>
                                        <img
                                          className="img-fluid animate__animated"
                                          src={
                                            o.Url
                                              ? o.Url
                                              : "/image/productImg16.png"
                                          }
                                        />
                                      </div>
                                    </a>
                                  </Link>

                                  {!o.Auctioned ? (
                                    <>
                                      <div className="product-card-details">
                                        <ul>
                                          <li>
                                            <h5>{o.name}</h5>
                                            <h5>{o.PriceBNB} ETH</h5>
                                          </li>
                                          <li>
                                            <span>
                                              <Image
                                                src="/image/curator.png"
                                                height="40px"
                                                width="40px"
                                              />{" "}
                                              <small>@ Coldplay</small>
                                            </span>
                                            <span>Highest Bid</span>
                                          </li>
                                        </ul>
                                      </div>

                                     
                                    </>
                                  ) : (
                                    <>
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          }
                        </>
                      ))}

                          {/* <div className="col-12 col-md-4 product-card">
                            <div className="product-card-img mb-4">

                              <div className="transparent-bg-img">
                                <div className="transparent-bg"></div>
                                <img className="img-fluid w-100" src="/image/a2.png" />
                              </div>

                            </div>
                            <div className="product-card-details">
                              <ul>
                                <li>
                                  <h5>Higher Power</h5>
                                  <h5>1.6 ETH</h5>
                                </li>
                                <li>
                                  <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                  <span>Highest Bid</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="col-12 col-md-4 product-card">
                            <div className="product-card-img mb-4">

                              <div className="transparent-bg-img">
                                <div className="transparent-bg"></div>
                                <img className="img-fluid w-100" src="/image/a3.png" />
                              </div>

                            </div>
                            <div className="product-card-details">
                              <ul>
                                <li>
                                  <h5>Higher Power</h5>
                                  <h5>1.6 ETH</h5>
                                </li>
                                <li>
                                  <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                  <span>Highest Bid</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="col-12 col-md-4 product-card">
                            <div className="product-card-img mb-4">

                              <div className="transparent-bg-img">
                                <div className="transparent-bg"></div>
                                <img className="img-fluid w-100" src="/image/a4.png" />
                              </div>

                            </div>
                            <div className="product-card-details">
                              <ul>
                                <li>
                                  <h5>Higher Power</h5>
                                  <h5>1.6 ETH</h5>
                                </li>
                                <li>
                                  <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                  <span>Highest Bid</span>
                                </li>
                              </ul>
                            </div>
                          </div> */}

                        </div>
                      </div>
                      <div className="tab-pane fade" id="nav-profile1" role="tabpanel" aria-labelledby="nav-profile-tab1">...</div>
                      <div className="tab-pane fade" id="nav-contact2" role="tabpanel" aria-labelledby="nav-contact-tab2">...s</div>
                      <div className="tab-pane fade" id="nav-contact3" role="tabpanel" aria-labelledby="nav-contact-tab3">...ss</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



    </div>
  );
}
export async function getServerSideProps({ params: { PublicAddress } }) {
  const url = `${process.env.Baseurl}/api/profile/${PublicAddress}`;
  const res = await fetch(url);
  const artistData = await res.json();

  const url2 = `${process.env.Baseurl}/api/art/byOwner/${artistData._id}`;
  const res2 = await fetch(url2);
  const artData = await res2.json();

  

  return {
    
    props: {
      artist: artistData,
      arts: artData,
      pa: PublicAddress,
    },
  };
}
