import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faDotCircle, faEllipsisV, faEnvelope, faEye, faPen, faPlay, faSearch, faShare, faTag } from '@fortawesome/free-solid-svg-icons'
import { faFolder, faHeart } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'


export default function Notification(props) {
    return (
        <>
            <section className="notification-section mb-5">
                <div className="container">


                    <div className="row">
                        <div className="col-12 ">
                            <h1 className="text-center mb-5 ">Notifications</h1>

                        </div>

                        <div className="col-12 detail-col-tabs mt-4 mb-5">
                            <div className="detail-col-tabs-content nav-tabs-col">
                                <div className=" ">
                                    {/* <nav>
                                        <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                                            <button className="nav-link active" id="nav-profile-tab1" data-bs-toggle="tab" data-bs-target="#nav-tabContent1" type="button" role="tab" aria-controls="nav-tabContent1" aria-selected="true">All Notification</button>
                                            <button className="nav-link" id="nav-profile-tab1" data-bs-toggle="tab" data-bs-target="#nav-profile1" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Offers</button>
                                        </div>
                                    </nav> */}
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="nav-tabContent1" role="tabpanel" aria-labelledby="nav-profile-tab1">
                                            <div className="row pt-4">
                                                <div className="col-12">

                                                    <div className="global-history-details mb-4">
                                                        <h3 className="mb-4">Recent</h3>
                                                        <ul>
                                                            <li className="d-flex align-items-center justify-content-between mb-3" style={{ color: "#767676" }}>
                                                                <span className=" d-flex align-items-center mb-3"> <Image width="60px" height="60px" className="" src={"/image/curator.png"} /> <span className="ms-3"><b>Sam Fischer</b> <small>Just Now</small>
                                                                    <p className="mb-0 mt-2">@fischersam followed you</p>
                                                                </span>
                                                                </span>
                                                                <span className="d-flex align-items-center ">
                                                                    <Link href="">
                                                                        <a className="mb-0 me-3">View</a>
                                                                    </Link>

                                                                    <Link href=""><a>Remove</a></Link>
                                                                </span>
                                                            </li>

                                                            <li className="d-flex align-items-center justify-content-between" style={{ color: "#767676" }}>
                                                                <span className=" d-flex align-items-center mb-3"> <Image width="60px" height="60px" className="" src={"/image/curator.png"} /> <span className="ms-3"><b>Sam Fischer</b> <small>Just Now</small>
                                                                    <p className="mb-0 mt-2">@fischersam followed you</p>
                                                                </span>
                                                                </span>
                                                                <span className="d-flex align-items-center ">
                                                                    <Link href="">
                                                                        <a className="mb-0 me-3">View</a>
                                                                    </Link>

                                                                    <Link href=""><a>Remove</a></Link>
                                                                </span>
                                                            </li>


                                                        </ul>
                                                    </div>

                                                    <div className="global-history-details pt-4">
                                                        <h3 className="mb-4">All Notifications</h3>
                                                        <ul>
                                                        <li className="d-flex align-items-center justify-content-between mb-3" style={{ color: "#767676" }}>
                                                                <span className=" d-flex align-items-center mb-3"> <Image width="60px" height="60px" className="" src={"/image/curator.png"} /> <span className="ms-3"><b>Sam Fischer</b> <small>Just Now</small>
                                                                    <p className="mb-0 mt-2">@fischersam followed you</p>
                                                                </span>
                                                                </span>
                                                                <span className="d-flex align-items-center ">
                                                                    <Link href="">
                                                                        <a className="mb-0 me-3">View</a>
                                                                    </Link>

                                                                    <Link href=""><a>Remove</a></Link>
                                                                </span>
                                                            </li>

                                                            <li className="d-flex align-items-center justify-content-between mb-3" style={{ color: "#767676" }}>
                                                                <span className=" d-flex align-items-center mb-3"> <Image width="60px" height="60px" className="" src={"/image/curator.png"} /> <span className="ms-3"><b>Sam Fischer</b> <small>Just Now</small>
                                                                    <p className="mb-0 mt-2">@fischersam followed you</p>
                                                                </span>
                                                                </span>
                                                                <span className="d-flex align-items-center ">
                                                                    <Link href="">
                                                                        <a className="mb-0 me-3">View</a>
                                                                    </Link>

                                                                    <Link href=""><a>Remove</a></Link>
                                                                </span>
                                                            </li>

                                                            <li className="d-flex align-items-center justify-content-between mb-3" style={{ color: "#767676" }}>
                                                                <span className=" d-flex align-items-center mb-3"> <Image width="60px" height="60px" className="" src={"/image/curator.png"} /> <span className="ms-3"><b>Sam Fischer</b> <small>Just Now</small>
                                                                    <p className="mb-0 mt-2">@fischersam followed you</p>
                                                                </span>
                                                                </span>
                                                                <span className="d-flex align-items-center ">
                                                                    <Link href="">
                                                                        <a className="mb-0 me-3">View</a>
                                                                    </Link>

                                                                    <Link href=""><a>Remove</a></Link>
                                                                </span>
                                                            </li>

                                                            <li className="d-flex align-items-center justify-content-between " style={{ color: "#767676" }}>
                                                                <span className=" d-flex align-items-center mb-3"> <Image width="60px" height="60px" className="" src={"/image/curator.png"} /> <span className="ms-3"><b>Sam Fischer</b> <small>Just Now</small>
                                                                    <p className="mb-0 mt-2">@fischersam followed you</p>
                                                                </span>
                                                                </span>
                                                                <span className="d-flex align-items-center ">
                                                                    <Link href="">
                                                                        <a className="mb-0 me-3">View</a>
                                                                    </Link>

                                                                    <Link href=""><a>Remove</a></Link>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="nav-profile1" role="tabpanel" aria-labelledby="nav-profile-tab1">
                                            <div className="global-history-details pt-4">
                                                <h5 className="mb-4">Recent Notifications</h5>
                                                <ul>
                                                    <li className="d-flex align-items-center justify-content-between" style={{ color: "#767676" }}>
                                                        <p className=" d-flex align-items-center"> <FontAwesomeIcon icon={faTag} className="me-3" style={{ color: "#767676" }} />  <span className="d-flex align-items-center"><Image src="/image/user-pic.png" height="40px" width="40px" /> <span className=" ms-2 me-2"><b className="d-inline-flex me-2" style={{ color: "#000" }}>@Black Keys</b> bought Afro-Ionic from</span> </span>  <span className="d-flex align-items-center"><Image src="/image/user-pic.png" height="40px" width="40px" /> <span className=" ms-2 me-2" style={{ color: "#000" }}><b>@Black Keys</b></span> for  1.6ETH</span>	</p>
                                                        <span className="d-flex align-items-center ">
                                                            <p className="mb-0 me-3"> 3 min ago</p>

                                                            <p className="mb-0 me-3  ps-3"> <Link href=""><a>Accept</a></Link></p>
                                                            <p className="mb-0 me-3 border-end border-start ps-3 pe-3"> <Link href=""><a>Decline</a></Link></p>
                                                            <Link href=""><a>View All</a></Link>
                                                        </span>
                                                    </li>
                                                    <li className="d-flex align-items-center justify-content-between" style={{ color: "#767676" }}>
                                                        <p className=" d-flex align-items-center"> <FontAwesomeIcon icon={faTag} className="me-3" style={{ color: "#767676" }} />  <span className="d-flex align-items-center"><Image src="/image/user-pic.png" height="40px" width="40px" /> <span className=" ms-2 me-2"><b className="d-inline-flex me-2" style={{ color: "#000" }}>@Black Keys</b> bought Afro-Ionic from</span> </span>  <span className="d-flex align-items-center"><Image src="/image/user-pic.png" height="40px" width="40px" /> <span className=" ms-2 me-2" style={{ color: "#000" }}><b>@Black Keys</b></span> for  1.6ETH</span>	</p>
                                                        <span className="d-flex align-items-center ">
                                                            <p className="mb-0 me-3"> 3 min ago</p>

                                                            <p className="mb-0 me-3  ps-3"> <Link href=""><a>Accept</a></Link></p>
                                                            <p className="mb-0 me-3 border-end border-start ps-3 pe-3"> <Link href=""><a>Decline</a></Link></p>
                                                            <Link href=""><a>View All</a></Link>
                                                        </span>
                                                    </li>

                                                    <li className="d-flex align-items-center justify-content-between" style={{ color: "#767676" }}>
                                                        <p className=" d-flex align-items-center"> <FontAwesomeIcon icon={faTag} className="me-3" style={{ color: "#767676" }} />  <span className="d-flex align-items-center"><Image src="/image/user-pic.png" height="40px" width="40px" /> <span className=" ms-2 me-2"><b className="d-inline-flex me-2" style={{ color: "#000" }}>@Black Keys</b> bought Afro-Ionic from</span> </span>  <span className="d-flex align-items-center"><Image src="/image/user-pic.png" height="40px" width="40px" /> <span className=" ms-2 me-2" style={{ color: "#000" }}><b>@Black Keys</b></span> for  1.6ETH</span>	</p>
                                                        <span className="d-flex align-items-center ">
                                                            <p className="mb-0 me-3"> 3 min ago</p>

                                                            <p className="mb-0 me-3  ps-3"> <Link href=""><a>Accept</a></Link></p>
                                                            <p className="mb-0 me-3 border-end border-start ps-3 pe-3"> <Link href=""><a>Decline</a></Link></p>
                                                            <Link href=""><a>View All</a></Link>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}
