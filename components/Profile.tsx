import { useRouter } from "next/router";

import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import Blockies from "react-blockies";
import { Auth } from "../types";

import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faDotCircle, faEllipsisV, faGlobe, faMapMarkedAlt, faMapMarker, faMusic, faPlay, faSearch, faShare } from '@fortawesome/free-solid-svg-icons'
import { faFolder, faHeart } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import { faFacebook, faFacebookF, faInstagram, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
interface Props {
  auth: Auth;
  onLoggedOut: () => void;
}

interface State {
  loading: boolean;
  artist?: {
    _id: number;
    ArtistName: string;
  };
  ArtistName: string;
}

interface JwtDecoded {
  payload: {
    id: string;
    PublicAddress: string;
  };
}

const Profile = ({ auth, onLoggedOut }: Props): JSX.Element => {
  const router = useRouter();
  const [state, setState] = useState<State>({
    loading: false,
    artist: undefined,
    ArtistName: "",
  });
  var Id = null;
  useEffect(() => {
    const { accessToken } = auth;
    const {
      payload: { id },
    } = jwtDecode<JwtDecoded>(accessToken);
    Id = "${id}";
    fetch(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((artist) => setState({ ...state, artist }))
      .catch(window.alert);
  }, []);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, ArtistName: value });
  };
  function shortenHex(hex: string, length = 4) {
    return `${hex.substring(0, length + 2)}…${hex.substring(
      hex.length - length
    )}`;
  }

  const handleSubmit = () => {
    const { accessToken } = auth;
    const { artist, ArtistName } = state;

    setState({ ...state, loading: true });

    if (!artist) {
      window.alert(
        "The artist id has not been fetched yet. Please try again in 5 seconds."
      );
      return;
    }

    fetch(`/api/user/${artist._id}`, {
      body: JSON.stringify({ ArtistName }),
      headers: {
        //Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    })
      .then((response) => response.json())
      .then((artist) => setState({ ...state, loading: false, artist }))
      .catch((err) => {
        window.alert(err);
        setState({ ...state, loading: false });
      });
  };

  const { accessToken } = auth;

  const {
    payload: { PublicAddress },
  } = jwtDecode<JwtDecoded>(accessToken);

  const { loading, artist } = state;

  const ArtistName = artist && artist.ArtistName;

  return (
    <>

      <section className="discover-section">
        <div className="container">
          <div className="row">
            <div className="col-12 profile-banner">
              <div className="profile-banner-desc" style={{ backgroundImage: `url("/image/profileBanner.png")` }}>
                
              </div>

            </div>

            <div className="col-12 col-md-3 profile-sidebar">
              <div className="profile-card">
                <div className="text-center profile-pic mb-3">
                  <img className="rounded" src="/image/profileImg.png" alt="" width={165} height={165} />
                </div>
                <div className=" mx-auto">
                  <h2 className="text-4xl mb-0 text-center">
                    <pre style={{ marginBottom: "0px" }}>Reves</pre>
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
                <p className="mb-3 text-center">     Born in Warsaw, 1986. Graduated in 2011, (Animated Film Studio) at the Faculty of Graphic in the Academy of Fine Arts in Warsaw.
                 Since 2011 makes murals with Adam Walas as Xolor (ex Ad manum). </p>

                
              </div>

              <div className="profile-follower-col">
                <h5 className="mb-3">Followers</h5>
                <ul>
                  <li>
                    <Image src={"/image/f1.png"} height={"40px"} width={"40px"} />
                  </li>
                  <li>
                    <Image src={"/image/f2.png"} height={"40px"} width={"40px"} />
                  </li>
                  <li>
                    <Image src={"/image/f3.png"} height={"40px"} width={"40px"} />
                  </li>
                  <li>
                    <Image src={"/image/f4.png"} height={"40px"} width={"40px"} />
                  </li>
                  <li>
                    <Image src={"/image/f5.png"} height={"40px"} width={"40px"} />
                  </li>
                  <li>
                    <Image src={"/image/f6.png"} height={"40px"} width={"40px"} />
                  </li>
                  <li>
                    <Image src={"/image/f7.png"} height={"40px"} width={"40px"} />
                  </li>
                  <li>
                    <Image src={"/image/f8.png"} height={"40px"} width={"40px"} />
                  </li>
                  <li>
                    <Image src={"/image/f9.png"} height={"40px"} width={"40px"} />
                  </li>

                </ul>
              </div>

              <div className="profile-follower-col">
                <h5 className="mb-3">Social Links</h5>
                <ul>

                <li>
                    <Link href="">
                      <a>
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="">
                      <a>
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>
                        <FontAwesomeIcon icon={faYoutube} />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>
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
                          <div className="col-12 col-md-4 product-card">
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
                                  <h5>1.6 BNB</h5>
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
                                <img className="img-fluid w-100" src="/image/a2.png" />
                              </div>
                             
                            </div>
                            <div className="product-card-details">
                              <ul>
                                <li>
                                  <h5>Higher Power</h5>
                                  <h5>1.6 BNB</h5>
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
                                  <h5>1.6 BNB</h5>
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
                                  <h5>1.6 BNB</h5>
                                </li>
                                <li>
                                  <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                  <span>Highest Bid</span>
                                </li>
                              </ul>
                            </div>
                          </div>
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

    </>
  );
};
export default Profile;
