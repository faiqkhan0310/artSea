import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faDotCircle, faEllipsisV, faPlay, faSearch, faShare } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

export default function Artists({ posts }) {
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
                                <div className="single-slides-item" style={{ backgroundImage: `url("/image/artist-banner.png")` }}>
                                    <div className="container">
                                        <div className="row banner-row">
                                            <div className="col-12 col-md-5 banner-desc">
                                                <div>
                                                    <h1 className="text-uppercase mb-4">The Amazing Duo</h1>
                                                    <p className="">The buildings of Muranów take on colors by Anna Koźbiel and Adam Walas.
                                                     Another mural is painted in the gate of the house at 3 Nowolipie Street. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="transparent-bg"></div>
                                    <p className="mb-0 d-flex align-center">Photo By  <span className="mb-0 d-flex align-center"> <b>@Black Keys</b></span> </p>

                                </div>

                                <div className="single-slides-item" style={{ backgroundImage: `url("/image/artist-banner.png")` }}>
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
                                    <p className="mb-0 d-flex align-center">Photo By  <span className="mb-0 d-flex align-center"><b>@Black Keys</b></span> </p>
                                    <div className="transparent-bg"></div>
                                </div>

                                <div className="single-slides-item" style={{ backgroundImage: `url("/image/artist-banner.png")` }}>
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
                                    <p className="mb-0 d-flex align-center">Photo By  <span className="mb-0 d-flex align-center"><b>@Black Keys</b></span> </p>
                                    <div className="transparent-bg"></div>
                                </div>

                                <div className="single-slides-item" style={{ backgroundImage: `url("/image/artist-banner.png")` }}>
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
                                    <div className="transparent-bg"></div>
                                    <p className="mb-0 d-flex align-center">Photo By  <span className="mb-0 d-flex align-center"><b>@Black Keys</b></span> </p>
                                </div>
                            </OwlCarousel>


                        </div>


                        <div className="col-12 main-title-col">
                            <h1><span>Artists</span> </h1>

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
                                    <button className="nav-link animate__animated" id="nav-profile-tab1" data-bs-toggle="tab" data-bs-target="#nav-profile1" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Rock</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab2" data-bs-toggle="tab" data-bs-target="#nav-contact2" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Jazz</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab3" data-bs-toggle="tab" data-bs-target="#nav-contact3" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Country</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab4" data-bs-toggle="tab" data-bs-target="#nav-contact4" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Blues</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab5" data-bs-toggle="tab" data-bs-target="#nav-contact5" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Punk</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab6" data-bs-toggle="tab" data-bs-target="#nav-contact6" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Disco</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab7" data-bs-toggle="tab" data-bs-target="#nav-contact7" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Heavy</button>
                                    <button className="nav-link animate__animated" id="nav-contact-tab8" data-bs-toggle="tab" data-bs-target="#nav-contact8" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Electronic</button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-tabContent1" role="tabpanel" aria-labelledby="nav-profile-tab1">
                                    <div className="row">
                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover1.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp1.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover2.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp2.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover3.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp3.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover4.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp4.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover5.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp5.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover6.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp6.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover7.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp7.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover8.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp8.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover9.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp9.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover10.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp10.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover11.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp11.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover12.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp12.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover1.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp1.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover2.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp2.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover3.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp3.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover4.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp4.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover5.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp5.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover6.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp6.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover7.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp7.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover8.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp8.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover9.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp9.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover10.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp10.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover11.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp11.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3 profile-card">
                                            <div className="profile-card-inner">
                                                <Image className="coverImg animate__animated" src="/image/artistCover12.png" height="185px" width="400" />
                                                <div className="profile-pic-col">
                                                    <Image className="profile-pic animate__animated" src="/image/artistdp12.png" height="145px" width="145px" />
                                                    <h5>Mike</h5>
                                                    <p>23.07 BNB</p>
                                                </div>
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
                                <div className="tab-pane fade" id="nav-contact8" role="tabpanel" aria-labelledby="nav-contact-tab8">...ssssss</div>

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
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
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
