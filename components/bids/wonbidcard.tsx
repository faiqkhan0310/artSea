import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function WonBidsCard(props) {
  return (
    <>
      <div className="col-12 col-md-4 mb-4">
        <div className="row details-row">
          <div className="col-12 col-md-7 details-col  p-3">
            <div className="product-card-img ">
              <Link href={"/art/" + props.BidId}>
                <a>
                  <div className="transparent-bg-img">
                    <div className="transparent-bg"></div>

                    <img className="w-full" src={props.imgUrl} />
                  </div>
                </a>
              </Link>
              <span className="timer">3:49</span>
            </div>
          </div>

          <div className="col-12 col-md-5 details-col-desc ">
            <div className="details-desc pe-0 ps-0">
              <div className="details-desc-title">
                <div>
                  <Link href={"/art/" + props.BidId}>
                    <a>
                      <h4 className="text-uppercase">{props.Name}</h4>
                    </a>
                  </Link>
                  <p className="mt-3">
                    <FontAwesomeIcon icon={faMapMarker} /> {props.location}
                  </p>
                </div>
              </div>

              <div className="details-desc-artists mt-3">
                <h5>Status</h5>
                <ul>
                  <li className="d-flex align-items-center justify-content-between">
                    <span className="" style={{ color: "green" }}>
                      You Won
                    </span>
                  </li>
                  {/* <li><Image src={"/image/artist-2.png"} height={30} width={30} /></li>
                                        <li><Image src={"/image/artist-3.png"} height={30} width={30} /></li>
                                        <li><Image src={"/image/artist-4.png"} height={30} width={30} /></li> */}
                </ul>
              </div>

              <div className="details-desc-artists d-flex align-items-center mb-0  mt-3">
                <div className="details-price pe-5">
                  <span className="mb-2">Price</span>
                  <h4 className="mb-3">{props.Price} ETH </h4>
                  <p className="mb-0">{parseFloat(props.Price) * props.ethPrice} $ </p>
                </div>

                <span className="d-block"></span>
              </div>



              




            </div>
          </div>
        </div>
      </div>
    </>
  );
}
