import Link from "next/link";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTumblr,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { uploadFileToPinata } from "../../../utils/pinata";
import { artistContext } from "../../_app";

export default function Profile({ artist }) {
  const context = useContext(artistContext);

  const router = useRouter();
  const [publicAddress, setPA] = useState("");
  const [ArtistName, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [Description, setDescription] = useState(undefined);
  const [facebook, setFb] = useState(undefined);
  const [twitter, setTw] = useState(undefined);
  const [instagram, setInstagram] = useState(undefined);
  const [pmedia, setpMedia] = useState(undefined);
  const [bmedia, setbMedia] = useState(undefined);
  const [model, setModel] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [emailloading, setEmailLoading] = useState(false);
  const [emailCodeC, setEmailCode] = useState(undefined);

  function shortenHex(hex: string, length = 4) {
    return `${hex.substring(0, length + 2)}…${hex.substring(
      hex.length - length
    )}`;
  }
  // const update = async (event) => {
  //   event.preventDefault(); // don't redirect the page
  //   const avatar = await uploadFileToPinata(pmedia);
  //   const backPic = await uploadFileToPinata(bmedia);
  //   //
  //   const res = await fetch(`/api/artist/update/${artist._id}`, {
  //     body: JSON.stringify({
  //       ArtistName,
  //       email,
  //       Description,
  //       avatar,
  //       backPic,
  //       facebook,
  //       twitter,
  //       instagram,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "PUT",
  //   });

  //   const result = await res.json();
  //   if (result.success) router.push(`/profile/${artist.PublicAddress}`);
  //   else console.log("Profile Update Response : ", result);
  // };

  const update = async (event) => {
    setLoading(true);

    event.preventDefault(); // don't redirect the page

    const avatar = await uploadFileToPinata(pmedia);

    const backPic = await uploadFileToPinata(bmedia);

    const checkemail = () => {
      if (email) {
        if (artist.email === email) {
          console.log("match");

          return artist.isEmailVerfied;
        } else {
          console.log("new email");

          return false;
        }
      }
    };

    checkemail();

    //

    try {
      const res = await fetch(`/api/artist/update/${artist._id}`, {
        body: JSON.stringify({
          ArtistName,
          email,
          Description,
          avatar,
          backPic,
          facebook,
          twitter,
          instagram,
          isEmailVerified: checkemail(),
        }),

        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
      console.log();
      const result = await res.json();
      console.log(result);

      if (result.success) {
        context.setGlobal({ artist: result.data });

        setLoading(false);

        router.push(`/profile/${artist.PublicAddress}`);
      } else {
        setLoading(false);

        alert("error");
      }
    } catch (e) {
      setLoading(false);

      console.log(e);

      alert("error");
    }
  };

  const sendEmail = async (event) => {
    event.stopPropagation();

    setEmailLoading(true);

    const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    try {
      const res = await fetch("/api/mail", {
        body: JSON.stringify({
          email,

          subject: "Email Verification",

          html: `
 
       <h2 style={{display: 'flex' , justifyContent: 'center' , color: 'green'}}>Verification code: ${code}</h2>
 
       `,
        }),

        headers: {
          "Content-Type": "application/json",
        },

        method: "POST",
      });

      const data = await res.json();

      console.log(data);

      if (data.status) {
        try {
          const res = await fetch(`/api/artist/update/${artist._id}`, {
            body: JSON.stringify({
              emailCode: code,
            }),

            headers: {
              "Content-Type": "application/json",
            },

            method: "PUT",
          });
          const result = await res.json();
          console.log(result);
          if (result.success) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setModel(true);
          } else {
            alert("error in saving code to db");
          }
        } catch (e) {
          console.log(e);
          alert("error");
        }
      }
      setEmailLoading(false);
    } catch (error) {
      setEmailLoading(false);
      console.log(error);
    }
  };

  const verifyCode = async () => {
    try {
      const res = await fetch(`/api/artist/${artist.PublicAddress}`, {
        headers: {
          "Content-Type": "application/json",
        },

        method: "GET",
      });

      const result = await res.json();

      console.log(result);

      const { emailCode } = result[0];

      console.log(emailCode, emailCodeC);

      if (Number(emailCode) === Number(emailCodeC)) {
        try {
          const res = await fetch(`/api/artist/update/${artist._id}`, {
            body: JSON.stringify({
              isEmailVerified: true,
            }),

            headers: {
              "Content-Type": "application/json",
            },

            method: "PUT",
          });

          const result = await res.json();

          console.log(result);

          setModel(false);

          if (result.success) {
            context.setGlobal({ artist: result.data });
          } else {
            alert("error in saving code to db");
          }
        } catch (e) {
          console.log(e);

          alert("error");
        }
      } else {
        alert("invlaid code");
      }
    } catch (e) {
      console.log(e);

      alert("error");
    }
  };

  return (
    <div>
      {model && (
        <div className="modal-div">
          <div className="model-code">
            <h4>Pleasee enter your code here</h4>

            <input
              type="text"
              className="form-control mt-4"
              onChange={(e) => {
                setEmailCode(e.target.value);
              }}
            ></input>

            <button className="btn mt-4" type="button" onClick={verifyCode}>
              Verify
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto mb-5">
        <form onSubmit={update}>
          <div className="-mb-20 relative edit-banner">
            <img
              className="rounded-t-3xl"
              src={bmedia ? URL.createObjectURL(bmedia) : "/image/banner1.png"}
              alt=""
            ></img>

            <div className="edit-banner-button">
              <label className="flex rounded md:w-100 mr-3">
                <input
                  className="hidden"
                  type="file"
                  placeholder="Choose file.."
                  onChange={(e) => setbMedia(e.target.files[0])}
                  name="Choose file"
                />

                <div className="">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </label>
            </div>
          </div>

          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
              <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0"></div>
              <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                <div className="relative text-center d-flex align-items-center justify-content-center edit-profile-pic">
                  <span className="relative d-inline-block profile-pic-inner">
                    <img
                      className="rounded"
                      src={pmedia ? URL.createObjectURL(pmedia) : artist.avatar}
                      alt=""
                      width="230"
                      height="230"
                    ></img>
                    <div className=" edit-banner-button">
                      <label className="flex rounded md:w-100 mr-3">
                        <input
                          className="hidden"
                          type="file"
                          placeholder="Choose file.."
                          onChange={(e) => setpMedia(e.target.files[0])}
                          name="Choose file"
                        />

                        <div className="">
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      </label>
                    </div>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-20 container">
              <div className="md:w-1/2 pr-5 row edit-profile-form-row">
                <div className="col-12 col-md-6 nft-form social-icon-form">
                  <div className="mb-6">
                    <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                      Name
                    </label>
                    <input
                      className=" form-control appearance-none w-full text-xs font-semibold leading-none bg-blueGray-50 rounded outline-none rounded-3xl"
                      type="text"
                      placeholder={artist.ArtistName}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="mb-6">
                    <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input
                      className=" form-control appearance-none w-full text-xs font-semibold leading-none bg-blueGray-50 rounded outline-none rounded-3xl"
                      type="email"
                      placeholder={artist.email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></input>

                    <div className="d-flex mt-3 justify-content-between align-content-center">
                      {context.global.artist.isEmailVerified === false ? (
                        <span className="text-danger">Not verified</span>
                      ) : (
                        <span className="text-success">verified</span>
                      )}

                      {context.global.artist.isEmailVerified === false ? (
                        <button
                          className="btn"
                          type="button"
                          onClick={sendEmail}
                        >
                          Verify Email
                          {emailloading ? (
                            <span
                              className=" ms-2 spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : null}
                        </button>
                      ) : null}
                    </div>


                  </div>

                  <div className="mb-6">
                    <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                      Bio
                    </label>
                    <input
                      className="text-area form-control w-full h-24 text-xs font-semibold leading-none resize-none bg-blueGray-50 rounded-3xl outline-none"
                      placeholder={artist.Description}
                      type="text"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>

                <div className="col-12 col-md-6 nft-form social-icon-form mb-5">
                  <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                    Location
                  </label>
                  <div className="social-form  align-items-center d-flex justify-content-between item-center">
                    <input
                      className="form-control w-100"
                      type="text"
                      placeholder={artist.facebook}
                      onChange={(e) => {
                        setFb(e.target.value);
                      }}
                    ></input>
                  </div>

                  <label className="block text-blueGray-800 text-sm font-semibold mb-2">
                    Social Media Presence
                  </label>
                  <div className="social-form  align-items-center d-flex justify-content-between item-center">
                    <label className="d-flex justify-content-center item-center pro-social-icon icon-label">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </label>
                    <input
                      className="form-control appearance-none w-full  text-xs font-semibold leading-none bg-blueGray-50 rounded outline-none rounded-3xl"
                      type="text"
                      placeholder={artist.facebook}
                      onChange={(e) => {
                        setFb(e.target.value);
                      }}
                    ></input>
                  </div>

                  <div className="social-form  align-items-center d-flex justify-content-between item-center">
                    <label className="d-flex justify-content-center item-center text-blueGray-800 text-sm font-semibold mr-4 pro-social-icon icon-label">
                      <FontAwesomeIcon icon={faInstagram} />
                    </label>
                    <input
                      className="form-control appearance-none w-full  text-xs font-semibold leading-none bg-blueGray-50 rounded outline-none rounded-3xl"
                      type="text"
                      placeholder={artist.instagram}
                      onChange={(e) => {
                        setInstagram(e.target.value);
                      }}
                    ></input>
                  </div>

                  <div className="social-form d-flex  align-items-center justify-content-between item-center">
                    <label className="d-flex justify-content-center item-center text-blueGray-800 text-sm font-semibold mr-4 pro-social-icon icon-label">
                      <FontAwesomeIcon icon={faTwitter} />
                    </label>
                    <input
                      className="appearance-none form-control w-full  text-xs font-semibold leading-none bg-blueGray-50 rounded outline-none rounded-3xl"
                      type="text"
                      placeholder={artist.twitter}
                      onChange={(e) => {
                        setTw(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end items-center update-profile-btn ">
              <button
                style={{
                  background: "transparent",
                  border: "1px solid #18A1FF",
                }}
                className="btn me-3"
                onClick={() => {
                  router.push(`/profile/${artist.PublicAddress}`);
                }}
              >
                Cancel
              </button>
              <button className="btn" type="submit">
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params: { PublicAddress } }) {
  const url = `${process.env.Baseurl}/api/profile/${PublicAddress}`;
  const res = await fetch(url);
  const artistData = await res.json();
  return {
    props: {
      artist: artistData,
    },
  };
}
