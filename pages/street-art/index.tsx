import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faDotCircle, faEllipsisV, faPlay, faSearch, faShare } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

export default function StreetArt({ posts }) {
  const options = {
    items: 1,
    // loop={true}
    nav: false,
    dots: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
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

        }
    },
}

  return (
    <>
    
    <section className="musician-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 musician-banner" >
                            <OwlCarousel {...options} className="banner-carousel">
                                <div className="single-slides-item" style={{ backgroundImage: `url("/image/banner1.png")` }}>
                                    <div className="container">
                                        <div className="row banner-row">
                                            <div className="col-12 col-md-5 banner-desc">
                                                <div>
                                                    <h1 className="text-uppercase mb-4">Bohdan Lachert</h1>
                                                    <p className="">Found on the walls at the entrance to Nowolipki 17A,
                                                     this piece was created in 2012 by Anna Koźbiel and Adam Walas (thanks to the society 'Station Muranów' (Stacja Muranów))
                                                     to honour Bohdan Lachert, a modernist architect who created part of Muranów as we see it today.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-0 d-flex align-center">Created By  <span className="mb-0 d-flex align-center"><Image src="/image/curator.png" height="30px" width="30px" className=""/> <b>@Black Keys</b></span> </p>

                                </div>

                                <div className="single-slides-item" style={{ backgroundImage: `url("/image/banner1.png")` }}>
                                    <div className="container">
                                        <div className="row banner-row">
                                            <div className="col-12 col-md-5 banner-desc">
                                                <div>
                                                    <h1 className="text-uppercase mb-4">THIS CITY</h1>
                                                    <p className="">Found on the walls at the entrance to Nowolipki 17A,
                                                     this piece was created in 2012 by Anna Koźbiel and Adam Walas (thanks to the society 'Station Muranów' (Stacja Muranów))
                                                     to honour Bohdan Lachert, a modernist architect who created part of Muranów as we see it today.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-0 d-flex align-center">Created By  <span className="mb-0 d-flex align-center"><Image src="/image/curator.png" height="30px" width="30px" className=""/> <b>@Black Keys</b></span> </p>

                                </div>

                                <div className="single-slides-item" style={{ backgroundImage: `url("/image/banner1.png")` }}>
                                    <div className="container">
                                        <div className="row banner-row">
                                            <div className="col-12 col-md-5 banner-desc">
                                                <div>
                                                    <h1 className="text-uppercase mb-4">THIS CITY</h1>
                                                    <p className="">Found on the walls at the entrance to Nowolipki 17A,
                                                     this piece was created in 2012 by Anna Koźbiel and Adam Walas (thanks to the society 'Station Muranów' (Stacja Muranów))
                                                     to honour Bohdan Lachert, a modernist architect who created part of Muranów as we see it today.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-0 d-flex align-center">Created By  <span className="mb-0 d-flex align-center"><Image src="/image/curator.png" height="30px" width="30px" className=""/> <b>@Black Keys</b></span> </p>

                                </div>

                                <div className="single-slides-item" style={{ backgroundImage: `url("/image/banner1.png")` }}>
                                    <div className="container">
                                        <div className="row banner-row">
                                            <div className="col-12 col-md-5 banner-desc">
                                                <div>
                                                    <h1 className="text-uppercase mb-4">THIS CITY</h1>
                                                    <p className="">Found on the walls at the entrance to Nowolipki 17A,
                                                     this piece was created in 2012 by Anna Koźbiel and Adam Walas (thanks to the society 'Station Muranów' (Stacja Muranów))
                                                     to honour Bohdan Lachert, a modernist architect who created part of Muranów as we see it today.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-0 d-flex align-center">Created By  <span className="mb-0 d-flex align-center"><Image src="/image/curator.png" height="30px" width="30px" className=""/> <b>@Black Keys</b></span> </p>

                                </div>
                            </OwlCarousel>


                        </div>

                        <div className="col-12 main-title-col">
                            <h1><span>Street Art</span> </h1>

                            <div className="explore-filter-col">
                                <select className="form-select me-3" aria-label="Default select example">
                                    <option selected>Sort By</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>

                                <span>
                                    <div className="search-input">
                                        <input type="text" className="form-control" placeholder="Search items, collections, and..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <FontAwesomeIcon icon={faSearch} />
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="col-12 nav-tabs-col">
                            <nav>
                                <div className="nav nav-tabs mb-5" id="nav-tab" role="tablist">
                                    <button className="nav-link animate__animated active" id="nav-profile-tab1" data-bs-toggle="tab" data-bs-target="#nav-tabContent1" type="button" role="tab" aria-controls="nav-tabContent1" aria-selected="true">All</button>
                                    <button className="nav-link animate__animated" id="nav-profile-tab1" data-bs-toggle="tab" data-bs-target="#nav-profile1" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Mural</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab2" data-bs-toggle="tab" data-bs-target="#nav-contact2" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Jazz</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab3" data-bs-toggle="tab" data-bs-target="#nav-contact3" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">3D Art</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab4" data-bs-toggle="tab" data-bs-target="#nav-contact4" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Spray Paint</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab5" data-bs-toggle="tab" data-bs-target="#nav-contact5" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Chalk Art</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab6" data-bs-toggle="tab" data-bs-target="#nav-contact6" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Graffiti</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab7" data-bs-toggle="tab" data-bs-target="#nav-contact7" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Sculpture</button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-tabContent1" role="tabpanel" aria-labelledby="nav-profile-tab1">
                                    <div className="row">
                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg1.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg2.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg3.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg4.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>



                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg5.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg6.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg7.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg8.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>


                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg9.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg10.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg11.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">


                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg12.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>



                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg13.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                            
                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg14.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                            
                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg15.png" />
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
                                                        <span><Image src="/image/curator.png" height="40px" width="40px" /> <small>@ Coldplay</small></span>
                                                        <span>Highest Bid</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 product-card">
                                            <div className="product-card-img mb-4">

                                                <div className="transparent-bg-img">
                                                    <div className="transparent-bg"></div>
                                                    <img className="img-fluid w-100 animate__animated" src="/image/productImg16.png" />
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
                                <div className="tab-pane fade" id="nav-contact4" role="tabpanel" aria-labelledby="nav-contact-tab4">...sss</div>
                                <div className="tab-pane fade" id="nav-contact5" role="tabpanel" aria-labelledby="nav-contact-tab5">...ssss</div>
                                <div className="tab-pane fade" id="nav-contact6" role="tabpanel" aria-labelledby="nav-contact-tab6">...sssss</div>
                                <div className="tab-pane fade" id="nav-contact7" role="tabpanel" aria-labelledby="nav-contact-tab7">...ssssss</div>

                            </div>


                        </div>

                        <div className="col-12 pagination-col text-center d-flex align-item-center justify-content-center">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">«</span>
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link active" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">»</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>



            </section>
    </>
  );
}
export async function getServerSideProps() {
  const url = `${process.env.Baseurl}/api/artist`;

  const res = await fetch(url);
  const posts = await res.json();
  return { props: { posts } };
}
