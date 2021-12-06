import Link from "next/link";
import Image from "next/image";
import Countdown from "react-countdown";
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
import WonBidsCard from "../../../components/bids/wonbidcard";
import BidsCard from "../../../components/bids/bidcard";

function Bids({ wonBids, ethPrice, bidPlaced, receivedBids }) {
  const today = new Date();

  const Completionist = () => <span>Auction Ended</span>;

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
    <div className="mb-5">
      <h1 className="text-center mb-5">Bids</h1>

      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 detail-col-tabs mt-4">
            <div
              className="detail-col-tabs-content nav-tabs-col"
              style={{ boxShadow: "unset", padding: "0px" }}
            >
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
                      Bids Placed
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
                      Bids Received
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
                      Won Bids
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
                      {bidPlaced && !!bidPlaced.length ? (
                        bidPlaced.map((item) => (
                          <>
                            <BidsCard
                              Name={item.name}
                              Price={item.LatestBid}
                              BidId={item._id}
                              endAuction={item.EndAuction}
                              ethPrice={ethPrice}
                              imgUrl={item.Url}
                              message="Congratulatons you have succesfully bid on this NFT"
                            />
                          </>
                        ))
                      ) : (
                        <>
                          <p>no bids won yet</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* bid received code here */}

                  <div
                    className="tab-pane fade"
                    id="nav-profile1"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab1"
                  >
                    <div className="row">
                      {receivedBids && !!receivedBids.length ? (
                        receivedBids.map((item) => (
                          <>
                            <BidsCard
                              Name={item.name}
                              Price={item.LatestBid}
                              BidId={item._id}
                              endAuction={item.EndAuction}
                              ethPrice={ethPrice}
                              imgUrl={item.Url}
                              message="Congratulatons you have succesfully received bid on this NFT"
                            />
                          </>
                        ))
                      ) : (
                        <>
                          <p>no bids won yet</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* won bids code here */}
                  <div
                    className="tab-pane fade"
                    id="nav-contact4"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab4"
                  >
                    <div className="row  mb-4 p-4">
                      {wonBids && !!wonBids.length ? (
                        wonBids.map((item) => (
                          <>
                            <WonBidsCard
                              Name={item.name}
                              Price={item.LatestBid}
                              BidId={item._id}
                              location={item.Location}
                              imgUrl={item.Url}
                              ethPrice={ethPrice}
                            />
                          </>
                        ))
                      ) : (
                        <>
                          <p>no bids won yet</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  // const url = `${process.env.Baseurl}/api/art`;
  // const res = await fetch(url);
  // const posts = await res.json();

  const url = `${process.env.Baseurl}/api/art/bidPlaced/${id}`;
  const res = await fetch(url);
  const bidPlaced = await res.json();

  const url3 = `${process.env.Baseurl}/api/art/wonBids/${id}`;
  const res3 = await fetch(url3);
  const wonBids = await res3.json();

  const Ownerurl = `${process.env.Baseurl}/api/user/publicAddress/${id}`;
  const Ownerres = await fetch(Ownerurl);
  const Ownerdata = await Ownerres.json();
  const { _id: OwnerID } = Ownerdata;

  const url4 = `${process.env.Baseurl}/api/art/ongoingBids/${OwnerID}`;
  const res4 = await fetch(url4);
  const receivedBids = await res4.json();

  const url2 = "https://openapi.bitxmi.com/sapi/v1/ticker?symbol=ethusdt";
  const res2 = await fetch(url2);
  const rate = await res2.json();

  return { props: { wonBids, ethPrice: rate.sell, bidPlaced, receivedBids } };
}

export default Bids;
