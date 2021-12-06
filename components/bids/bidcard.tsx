import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import Countdown from "react-countdown";

export default function BidsCard(props) {
  const Completionist = () => <span className="d-block">Auction Ended</span>;
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
    
      <div className="col-12 col-md-6">
        <div className="row details-row mb-4 p-2">
          <div className="col-12 col-md-3 details-col">
            <div className="product-card-img ">
              <div className="transparent-bg-img">
                <div className="transparent-bg"></div>
                <img className="w-full" src={props.imgUrl} />
              </div>
              <span className="timer">3:49</span>
            </div>
          </div>

          <div className="col-12 col-md-5 details-col-desc ">
            <div className="details-desc p-0">
              <div className="details-desc-title">
                <div>
                  <h4 className="text-uppercase">{props.Name}</h4>
                </div>
              </div>

              <div className="details-desc-artists mt-2 mb-3">
                <h5>artists</h5>
                <ul>
                  <li className="d-flex align-items-center justify-content-between">
                    <Image src={"/image/curator.png"} height={30} width={30} />{" "}
                    <span className="ms-2">john</span>
                  </li>
                  {/* <li><Image src={"/image/artist-2.png"} height={30} width={30} /></li>
                                        <li><Image src={"/image/artist-3.png"} height={30} width={30} /></li>
                                        <li><Image src={"/image/artist-4.png"} height={30} width={30} /></li> */}
                </ul>
              </div>

              <div className="details-desc-artists d-flex align-items-center justify-content-between mt-1 mb-0">
                <div className="details-price pe-2">
                  <span className="mb-2">Latest Bid</span>
                  <h4 className="mb-2">{props.Price} ETH</h4>
                  <p className="mb-0">{parseFloat(props.Price) * props.ethPrice} $</p>
                </div>

                <span
                  className="d-block"
                  style={{
                    border: "1px solid rgb(221 221 221)",
                    height: "100px",
                  }}
                ></span>

                <div className="w-50 ps-2 pe-2 auction-bid-timer bids-countdown">
                  <span className="mb-2">Ending In</span>
                  <Countdown date={props.endAuction} renderer={renderer} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 details-col-desc">
            <div
              className="details-desc-artists ps-3 mb-0"
              style={{
                borderLeft: "1px solid rgb(221 221 221)",
                height: "90%",
              }}
            >

              <h5 className="">{new Date() > new Date(props.endAuction) ? "Auction is ended":"Auction Is Live!"}</h5>

              <p>
                {props.message}
                
              </p>

              <div className="details-col-btn justify-content-center mt-2 w-100">
                <Link href={"/art/" + props.BidId}>
                <a
                  className="btn offer-btn w-100 animate__animated text-capitalize pt-4 pb-4"
                  aria-disabled
                >
                  View NFT
                </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
