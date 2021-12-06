import React from "react";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Banner from "../components/layout/banner";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import dynamic from "next/dynamic";
import { artistContext } from "./_app";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });


export default function Home({ artsHot, artsFeatured, bxmiPrice }) {
  const context = useContext(artistContext);
  console.log("context" ,context)

  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
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

  return (
    <>
      

      <Banner />

      {context.isLogin === true &&
      context?.global?.artist?.isEmailVerified === false ? (
        <div className="col-12 emial-alert justify-content-center d-flex">
          <div className="alert alert-danger" role="alert">
            Your email is not verified.
            <Link
              href={`/profile/editProfile/${context.global.artist.PublicAddress}`}
            >
              <a className="ms-2">Verify Email</a>
            </Link>
          </div>
        </div>
      ) : null}

      
      <section className="featured-section">
        <div className="container">
          <div className="row">
            <div className="col-12 main-title-col">
              <h1>
                <span> featured</span>{" "}
              </h1>

              <div className="all-link">
                <Link href="">
                  <a>View All</a>
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-9 recent-drop-col">
              <div className="row">
                <div className="col-12 col-md-8 recent-drop-sub-col pe-4">
                  <div className="transparent-bg-img">
                    <div className="transparent-bg"></div>
                    <img
                      className="img-fluid w-100 animate__animated"
                      src="/image/dropImg1.png"
                    />
                    <div className="recent-drop-info">
                      <h4> Henryk Nowak from the book ‘Zły’</h4>
                      <p className="d-flex align-items-center mb-0">
                        <span className="d-flex align-items-center">
                          <Image
                            className=""
                            height="40px"
                            width="40px"
                            src="/image/curator.png"
                          />{" "}
                          <span className="ms-2">Adam Walas</span>{" "}
                        </span>{" "}
                        <span className="d-flex align-items-center justify-content-center ms-3">
                          <Image
                            className=""
                            height="40px"
                            width="40px"
                            src="/image/curator.png"
                          />{" "}
                          <span className="ms-2"> Adam Walas </span>{" "}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 recent-drop-sub-col pe-4">
                  <div className="transparent-bg-img">
                    <div className="transparent-bg"></div>
                    <img
                      className="img-fluid w-100 animate__animated"
                      src="/image/dropImg2.png"
                    />
                    <div className="recent-drop-info">
                      <h4> Chopin Mural</h4>
                      <p className="d-flex align-items-center mb-0">
                        <span className="d-flex align-items-center">
                          <Image
                            className=""
                            height="40px"
                            width="40px"
                            src="/image/curator.png"
                          />{" "}
                          <span className="ms-2">Chopin Mural</span>{" "}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4 recent-drop-sub-col mb-0 pe-4">
                  <div className="transparent-bg-img">
                    <div className="transparent-bg"></div>
                    <img
                      className="img-fluid w-100 animate__animated"
                      src="/image/dropImg3.png"
                    />
                    <div className="recent-drop-info">
                      <h4> Dziura</h4>
                      <p className="d-flex align-items-center mb-0">
                        <span className="d-flex align-items-center">
                          <Image
                            className=""
                            height="40px"
                            width="40px"
                            src="/image/curator.png"
                          />{" "}
                          <span className="ms-2">Chopin Mural</span>{" "}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-8 recent-drop-sub-col mb-0 pe-4">
                  <div className="transparent-bg-img">
                    <div className="transparent-bg"></div>
                    <img
                      className="img-fluid w-100 animate__animated"
                      src="/image/dropImg4.png"
                    />
                    <div className="recent-drop-info">
                      <h4> Eastern Warsaw</h4>
                      <p className="d-flex align-items-center mb-0">
                        <span className="d-flex align-items-center">
                          <Image
                            className=""
                            height="40px"
                            width="40px"
                            src="/image/curator.png"
                          />{" "}
                          <span className="ms-2">Eastern Warsaw</span>{" "}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 recent-drop-col">
              <div className="transparent-bg-img">
                <div className="transparent-bg"></div>
                <img
                  className="img-fluid w-100 animate__animated"
                  src="/image/dropImg5.png"
                />
                <div className="recent-drop-info">
                  <h4> David Bowie</h4>
                  <p className="d-flex align-items-center mb-0">
                    <span className="d-flex align-items-center">
                      <Image
                        className=""
                        height="40px"
                        width="40px"
                        src="/image/curator.png"
                      />{" "}
                      <span className="ms-2">David Bowie</span>{" "}
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="best-seller-section">
        <div className="container">
          <div className="row">
            <div className="col-12 main-title-col">
              <h1>
                <span>Live auctions</span>{" "}
              </h1>
            </div>

            <div className="col-12 col-md-3 product-card">
              <div className="product-card-img mb-4">
                <div className="product-label">an hour left</div>

                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img
                    className="img-fluid animate__animated w-100 h-100"
                    src="/image/auctionImg1.png"
                  />
                </div>
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
                        height="40px"
                        width="40px"
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
                <div className="product-label">an hour left</div>

                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img
                    className="img-fluid animate__animated w-100 h-100"
                    src="/image/auctionImg2.png"
                  />
                </div>
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
                        height="40px"
                        width="40px"
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
                <div className="product-label">an hour left</div>

                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>

                  <img
                    className="img-fluid animate__animated w-100 h-100"
                    src="/image/auctionImg3.png"
                  />
                </div>
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
                        height="40px"
                        width="40px"
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
                <div className="product-label">an hour left</div>

                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img
                    className="img-fluid animate__animated w-100 h-100"
                    src="/image/auctionImg4.png"
                  />
                </div>
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
                        height="40px"
                        width="40px"
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

      <section className="live-auction-section">
        <div className="container">
          <div className="row">
            <div className="col-12 main-title-col">
              <h1>
                {" "}
                <span>Top sellers</span>{" "}
              </h1>
            </div>

            <div className="col-12 col-md-3 profile-card">
              <div className="profile-card-inner">
                <Image
                  className="coverImg animate__animated"
                  src="/image/cover1.png"
                  height="185px"
                  width="400"
                />
                <div className="profile-pic-col">
                  <Image
                    className="profile-pic animate__animated"
                    src="/image/dp1.png"
                    height="145px"
                    width="145px"
                  />
                  <h5>Mike</h5>
                  <p>23.07 BNB</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 profile-card">
              <div className="profile-card-inner">
                <Image
                  className="coverImg animate__animated"
                  src="/image/cover2.png"
                  height="185px"
                  width="400"
                />
                <div className="profile-pic-col">
                  <Image
                    className="profile-pic animate__animated"
                    src="/image/dp2.png"
                    height="145px"
                    width="145px"
                  />
                  <h5>Alex</h5>
                  <p>23.07 BNB</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 profile-card">
              <div className="profile-card-inner">
                <Image
                  className="coverImg animate__animated"
                  src="/image/cover3.png"
                  height="185px"
                  width="400"
                />
                <div className="profile-pic-col">
                  <Image
                    className="profile-pic animate__animated"
                    src="/image/dp3.png"
                    height="145px"
                    width="145px"
                  />
                  <h5>Gunther</h5>
                  <p>23.07 BNB</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 profile-card">
              <div className="profile-card-inner">
                <Image
                  className="coverImg animate__animated"
                  src="/image/cover4.png"
                  height="185px"
                  width="400"
                />
                <div className="profile-pic-col">
                  <Image
                    className="profile-pic animate__animated"
                    src="/image/dp4.png"
                    height="145px"
                    width="145px"
                  />
                  <h5>Scorpion</h5>
                  <p>23.07 BNB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="best-seller-section">
        <div className="container">
          <div className="row">
            <div className="col-12 main-title-col">
              <h1>
                <span>Trending</span>{" "}
              </h1>

              <div className="all-link">
                <Link href="">
                  <a>View All</a>
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-3 product-card">
              <div className="product-card-img mb-4">
                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img
                    className="img-fluid animate__animated w-100 h-100"
                    src="/image/trendingImg1.png"
                  />
                </div>
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
                        height="40px"
                        width="40px"
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
                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img
                    className="img-fluid animate__animated w-100 h-100"
                    src="/image/trendingImg2.png"
                  />
                </div>
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
                        height="40px"
                        width="40px"
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
                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>

                  <img
                    className="img-fluid animate__animated w-100 h-100"
                    src="/image/trendingImg3.png"
                  />
                </div>
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
                        height="40px"
                        width="40px"
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
                <div className="transparent-bg-img">
                  <div className="transparent-bg"></div>
                  <img
                    className="img-fluid animate__animated w-100 h-100"
                    src="/image/trendingImg4.png"
                  />
                </div>
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
                        height="40px"
                        width="40px"
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

      <section className="hot-collections-section">
        <div className="container">
          <div className="row">
            <div className="col-12 main-title-col">
              <h1>
                {" "}
                <span>explore</span>{" "}
              </h1>

              <div className="explore-filter-col">
                <select
                  className="form-select me-3"
                  aria-label="Default select example"
                >
                  <option selected>Sort By</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>

                <span>
                  <div className="search-input">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search items, collections, and..."
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </span>
              </div>
            </div>

            <div className="col-12 home-nav nav-tabs-col">
              <nav>
                <div className="nav nav-tabs mb-5" id="nav-tab" role="tablist">
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
                    All
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
                    Mural
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
                    Jazz
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
                    3D Art
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
                    Spray Paint
                  </button>
                  <button
                    className="nav-link animate__animated"
                    id="nav-contact-tab5"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-contact5"
                    type="button"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Chalk Art
                  </button>
                  <button
                    className="nav-link animate__animated"
                    id="nav-contact-tab6"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-contact6"
                    type="button"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Graffiti
                  </button>
                  <button
                    className="nav-link animate__animated"
                    id="nav-contact-tab7"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-contact7"
                    type="button"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Sculpture
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
                  <div className="row">
                    <div className="col-12 col-md-3 product-card">
                      <div className="product-card-img mb-4">
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg3.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg4.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg5.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg7.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg8.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg9.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg10.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg11.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg12.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg13.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg14.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
                            src="/image/productImg15.png"
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
                                height="40px"
                                width="40px"
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
                        <div className="transparent-bg-img">
                          <div className="transparent-bg"></div>
                          <img
                            className="img-fluid w-100 animate__animated"
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
                                height="40px"
                                width="40px"
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
                <div
                  className="tab-pane fade"
                  id="nav-contact5"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab5"
                >
                  ...ssss
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-contact6"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab6"
                >
                  ...sssss
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-contact7"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab7"
                >
                  ...ssssss
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-contact8"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab8"
                >
                  ...ssssss
                </div>
              </div>

              {/* <div className="col-12 text-center see-more-btn-col mt-2 mb-5 pt-5 pb-3">
                                <Link href="">
                                    <a>See More {">>"}</a>
                                </Link>
                            </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps() {
  const url = `${process.env.Baseurl}/api/art/hot`;
  const res = await fetch(url);
  const artsHot = await res.json();

  const url3 = `${process.env.Baseurl}/api/art/featured`;
  const res3 = await fetch(url3);
  const artsFeatured = await res3.json();

  const url2 = "https://openapi.bitxmi.com/sapi/v1/ticker?symbol=bxmiusdt";
  const res2 = await fetch(url2);
  const rate = await res2.json();
  return { props: { artsHot, artsFeatured, bxmiPrice: rate.sell } };
}
