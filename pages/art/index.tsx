import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Countdown from "react-countdown";
import Pagination from "../../components/Pagination";
import cookie from "cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

function Arts({ posts, totalRecords, bxmiPrice }) {
  console.log(posts , "posts")
  const options = {
    items: 1,
    // loop={true}
    nav: false,
    dots: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    smartSpeed: 450,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  const [paginatedPost, setPaginatedPosts] = useState(posts);
  const [total, setTotal] = useState(totalRecords);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [activeTab, setActiveTab] = useState("1");

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
            {days}:
            {/* <p>Days</p> */}
          </span>
          <span>
            {hours}: 
            {/* <p>Hrs</p> */}
          </span>
          <span>
            {minutes}: 
             {/* <p>Mins</p> */}
          </span>
         <span>
             {seconds} 
            {/* <p>Secs</p> */}
          </span>
        </span>
      );
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  // const indexOflastPost = currentPage * postsPerPage;
  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  // const previous = () => {
  //   if (currentPage > 1) {
  //     let number = currentPage - 1;
  //     setCurrentPage(number);
  //   }
  // };
  // const next = () => {
  //   let totalpage = total / postsPerPage;
  //   if (currentPage < Math.ceil(totalpage)) {
  //     let number = currentPage + 1;
  //     setCurrentPage(number);
  //   }
  // };

  // useEffect(() => {
  //   // `${process.env.Baseurl}/api/art?limit=${limit}&skip=${skip}`
  //   // alert(process.env.Baseurl)
  //   const url = `http://localhost:3000/api/art?limit=${postsPerPage}&skip=${currentPage}`;
  //   fetch(url).then(async (res) => {
  //     let artsRes = await res.json()
  //     let arts = [];
  //     let totalRecords = 0;
  //     if (!artsRes.message) {
  //       arts = artsRes.arts;
  //       totalRecords = artsRes.totalRecords;
  //     }
  //     setPaginatedPosts(arts);
  //     setTotal(totalRecords);
  //     console.log("RESPONSE*********", paginatedPost);
  //   });

  // }, [currentPage])
  const onChangePage = (currentPage) => {
    const url = `${process.env.Baseurl}/api/art?limit=${postsPerPage}&skip=${currentPage}`;
    fetch(url).then(async (res) => {
      let artsRes = await res.json();
      let arts = [];
      let totalRecords = 0;
      if (!artsRes.message) {
        arts = artsRes.arts;
        totalRecords = artsRes.totalRecords;
      }
      setPaginatedPosts(arts);
      setTotal(totalRecords);
    });
  };
  const today = new Date();
  return (
    <div>
      <section className="musician-section">
        <div className="container">
          <div className="row">
            <div className="col-12 musician-banner">
              <OwlCarousel {...options} className="banner-carousel">
                <div
                  className="single-slides-item"
                  style={{ backgroundImage: `url("/image/banner1.png")` }}
                >
                  <div className="container">
                    <div className="row banner-row">
                      <div className="col-12 col-md-5 banner-desc">
                        <div>
                          <h1 className="text-uppercase mb-4">
                            Bohdan Lachert
                          </h1>
                          <p className="">
                            Found on the walls at the entrance to Nowolipki 17A,
                            this piece was created in 2012 by Anna Koźbiel and
                            Adam Walas (thanks to the society 'Station Muranów'
                            (Stacja Muranów)) to honour Bohdan Lachert, a
                            modernist architect who created part of Muranów as
                            we see it today.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mb-0 d-flex align-center">
                    Created By{" "}
                    <span className="mb-0 d-flex align-center">
                      <Image
                        src="/image/curator.png"
                        height="30px"
                        width="30px"
                        className=""
                      />{" "}
                      <b>@Black Keys</b>
                    </span>{" "}
                  </p>
                </div>

                <div
                  className="single-slides-item"
                  style={{ backgroundImage: `url("/image/banner1.png")` }}
                >
                  <div className="container">
                    <div className="row banner-row">
                      <div className="col-12 col-md-5 banner-desc">
                        <div>
                          <h1 className="text-uppercase mb-4">THIS CITY</h1>
                          <p className="">
                            Found on the walls at the entrance to Nowolipki 17A,
                            this piece was created in 2012 by Anna Koźbiel and
                            Adam Walas (thanks to the society 'Station Muranów'
                            (Stacja Muranów)) to honour Bohdan Lachert, a
                            modernist architect who created part of Muranów as
                            we see it today.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mb-0 d-flex align-center">
                    Created By{" "}
                    <span className="mb-0 d-flex align-center">
                      <Image
                        src="/image/curator.png"
                        height="30px"
                        width="30px"
                        className=""
                      />{" "}
                      <b>@Black Keys</b>
                    </span>{" "}
                  </p>
                </div>

                <div
                  className="single-slides-item"
                  style={{ backgroundImage: `url("/image/banner1.png")` }}
                >
                  <div className="container">
                    <div className="row banner-row">
                      <div className="col-12 col-md-5 banner-desc">
                        <div>
                          <h1 className="text-uppercase mb-4">THIS CITY</h1>
                          <p className="">
                            Found on the walls at the entrance to Nowolipki 17A,
                            this piece was created in 2012 by Anna Koźbiel and
                            Adam Walas (thanks to the society 'Station Muranów'
                            (Stacja Muranów)) to honour Bohdan Lachert, a
                            modernist architect who created part of Muranów as
                            we see it today.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mb-0 d-flex align-center">
                    Created By{" "}
                    <span className="mb-0 d-flex align-center">
                      <Image
                        src="/image/curator.png"
                        height="30px"
                        width="30px"
                        className=""
                      />{" "}
                      <b>@Black Keys</b>
                    </span>{" "}
                  </p>
                </div>

                <div
                  className="single-slides-item"
                  style={{ backgroundImage: `url("/image/banner1.png")` }}
                >
                  <div className="container">
                    <div className="row banner-row">
                      <div className="col-12 col-md-5 banner-desc">
                        <div>
                          <h1 className="text-uppercase mb-4">THIS CITY</h1>
                          <p className="">
                            Found on the walls at the entrance to Nowolipki 17A,
                            this piece was created in 2012 by Anna Koźbiel and
                            Adam Walas (thanks to the society 'Station Muranów'
                            (Stacja Muranów)) to honour Bohdan Lachert, a
                            modernist architect who created part of Muranów as
                            we see it today.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mb-0 d-flex align-center">
                    Created By{" "}
                    <span className="mb-0 d-flex align-center">
                      <Image
                        src="/image/curator.png"
                        height="30px"
                        width="30px"
                        className=""
                      />{" "}
                      <b>@Black Keys</b>
                    </span>{" "}
                  </p>
                </div>
              </OwlCarousel>
            </div>

            <div className="col-12 main-title-col">
              <h1>
                <span>Street Art</span>{" "}
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

            <div className="col-12 nav-tabs-col">
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
                    {paginatedPost &&
                      !!paginatedPost.length &&
                      paginatedPost.map((o) => (
                        <>
                          {
                            <>
                              <div className="col-12 col-md-3 product-card">
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
                                      <ul>
                                        <li className="d-flex align-items-center justify-content-between">
                                          <h5>{o.name}</h5>
                                          <h5>{o.PriceBNB} ETH</h5>
                                        </li>
                                        <li className="d-flex align-items-center justify-content-between">
                                          <span className="d-flex align-items-center">
                                            <Image
                                              src="/image/curator.png"
                                              height="40px"
                                              width="40px"
                                            />{" "}
                                            <small className="ms-2">@ Coldplay</small>
                                          </span>
                                          <span>
                                            <Countdown
                                              date={
                                                Date.now() +
                                                Math.round(
                                                  Date.parse(o.EndAuction) -
                                                    Date.parse(today.toString())
                                                )
                                              }
                                              renderer={renderer}
                                            />
                                          </span>
                                        </li>
                                      </ul>
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          }
                        </>
                      ))}
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
              </div>
            </div>

             
          </div>
        </div>
      </section>

      {/* <section className="marketplace-section">
        <div className="container">
          <div className="row">
            <div className="col-12  text-center text-capitalize marketplace-title">
              <h1>marketplace</h1>
            </div>

            <div className="col-12 marketplace-col">
              <div className="row"></div>
            </div>
          </div>
        </div>

        <div className="col-12 text-center  mb-5 pt-5 ">
                    <Link href="">
                        <a>View All</a>
                    </Link>
                </div>
      </section> */}

      {/* 
      {paginatedPost &&
        !!paginatedPost.length &&
        paginatedPost.map((o) => (
          <>
            {
              <>
                <Link href={"/art/[id]"} as={`/art/${o._id}`}>
                  <a>

                    <Image
                      className="mb-2 w-full h-50 object-cover img-fluid rounded-t-2xl"
                      src={
                        o.Url
                          ? o.Url
                          : "/images/22-anime-drawings-Underground.jpeg"
                      }
                      alt={o.name}
                      width={400}
                      height={350}
                    ></images>
                  </a>
                </Link>

                <div className="bid-btn-col">
                  <span>
                    <h4 className="mb-1 text-1xl font-bold font-heading">
                      {o.name}
                    </h4>
                    <span>
                      <Image
                        src="/imagess/tokenImg.png"
                        alt={o.name}
                        width={45}
                        height={45}
                      ></images>
                      {o.PriceBNB + "= $ "}{" "}
                      {Math.round(
                        Number(o.PriceBNB) * bxmiPrice
                      )}
                    </span>
                  </span>


                  {!o.Auctioned ? (
                    <a className="btn bid-btn">Buy</a>
                  ) : (
                    <>
                      { }

                      <h4>
                        <Countdown
                          date={
                            Date.now() +
                            Math.round(
                              Date.parse(o.EndAuction) -
                              Date.parse(today.toString())
                            )
                          }
                        />
                      </h4>
                    </>
                  )}
                </div>

              </>
              //)
            }
          </>
        ))} */}
      <div className="pagination-col">
        <Pagination
          totalRecords={totalRecords}
          onChangePage={onChangePage}
        ></Pagination>
        {/* <Pagination
              postsPerPage={postsPerPage}
              totalPosts={total}
              paginate={paginate}
              previous={previous}
              next={next} /> */}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  let limit = 20;
  let skip = 1;
  const url = `${process.env.Baseurl}/api/art?limit=${limit}&skip=${skip}`;
  //  const cok=cookie.parse(req ? req.headers.cookie || '':document.cookie)
  //   const opts = {
  //     headers: {
  //         cookie: cok.auth
  //     }
  // };

  const res = await fetch(url);
  let artsRes = await res.json();
  let arts = [];
  let totalRecords = 0;
  if (!artsRes.message) {
    arts = artsRes.arts;
    totalRecords = artsRes.totalRecords;
  }
  const url2 = "https://openapi.bitxmi.com/sapi/v1/ticker?symbol=bxmiusdt";

  const res2 = await fetch(url2);
  const rate = await res2.json();
  return { props: { posts: arts, totalRecords, bxmiPrice: rate.sell } };
}

export default Arts;
