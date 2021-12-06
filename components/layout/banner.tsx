import React from "react"
// import bannerImg from "../public/images/bannerImg.jpg"
import Image from "next/image"
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

export default function Banner() {

  const options = {
    items: 1,
    // loop={true}
    nav: false,
    dots: true,
    margin: 0,
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
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <OwlCarousel {...options} className="banner-carousel">
            <div className="single-slides-item" style={{ backgroundImage: `url("/image/banner1.png")` }}>
            <div className="transparent-bg"></div>
              <div className="container">
                <div className="row banner-row">
                  <div className="col-12 col-md-6  banner-desc">

                    <h1 className="text-capitalize mb-4">Limited edition NFTs <br></br>of real-life street art </h1>
                    <p>Discover the hottest NFT collections, marketplace <br></br> rankings, and top real-time sales.  </p>
                    <div className="banner-btn">
                      <a className="btn me-4 animate__animated">Start Exploring</a>
                      <a className="btn Listen-Now-btn animate__animated">Start Creating</a>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-0 d-flex align-center">Created By  <span className="mb-0 d-flex align-center"><Image src="/image/curator.png" height="40px" width="40px" className=""/> <b>@Black Keys</b></span> </p>
            </div>

            <div className="single-slides-item" style={{ backgroundImage: `url("/image/banner1.png")` }}>
            <div className="transparent-bg"></div>
              <div className="container">
                <div className="row banner-row">
                  <div className="col-12 col-md-6  banner-desc">

                  <h1 className="text-capitalize mb-4">Limited edition NFTs <br></br>of real-life street art </h1>
                    <p>Discover the hottest NFT collections, marketplace <br></br>rankings, and top real-time sales. </p>
                    <div className="banner-btn">
                      <a className="btn me-4 animate__animated">Start Exploring</a>
                      <a className="btn Listen-Now-btn animate__animated">Start Creating</a>

                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-0 d-flex align-center">Created By  <span className="mb-0 d-flex align-center"><Image src="/image/curator.png" height="40px" width="40px" className=""/> <b>@Black Keys</b></span> </p>
            </div>

            <div className="single-slides-item" style={{ backgroundImage: `url("/image/banner1.png")` }}>
            <div className="transparent-bg"></div>
              <div className="container">
                <div className="row banner-row">
                  <div className="col-12 col-md-6  banner-desc">

                  <h1 className="text-capitalize mb-4">Limited edition NFTs <br></br>of real-life street art </h1>
                    <p>Discover the hottest NFT collections, marketplace <br></br>rankings, and top real-time sales. </p>
                    <div className="banner-btn">
                      <a className="btn me-4 animate__animated">Start Exploring</a>
                      <a className="btn Listen-Now-btn animate__animated">Start Creating</a>

                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-0 d-flex align-center">Created By  <span className="mb-0 d-flex align-center"><Image src="/image/curator.png" height="40px" width="40px" className=""/> <b>@Black Keys</b></span> </p>
            </div>

            <div className="single-slides-item" style={{ backgroundImage: `url("/image/banner1.png")` }}>
            <div className="transparent-bg"></div>
              <div className="container">
                <div className="row banner-row">
                  <div className="col-12 col-md-6  banner-desc">

                  <h1 className="text-capitalize mb-4">Limited edition NFTs<br></br> of real-life street art </h1>
                    <p>Discover the hottest NFT collections, marketplace <br></br>rankings, and top real-time sales. </p>
                    <div className="banner-btn">
                      <a className="btn me-4 animate__animated">Start Exploring</a>
                      <a className="btn Listen-Now-btn animate__animated">Start Creating</a>

                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-0 d-flex align-center">Created By  <span className="mb-0 d-flex align-center"><Image src="/image/curator.png" height="40px" width="40px" className=""/> <b>@Black Keys</b></span> </p>

            </div>
          </OwlCarousel>
        </div>
      </div>


    </>
  )
}