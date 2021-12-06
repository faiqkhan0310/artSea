import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Login from "../Login";
import Profilepic from "../Profilepic";
import Link from "next/link";
import { Auth } from "../../types";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { artistContext } from "../../pages/_app";
const LS_KEY = "login-with-metamask:auth";
interface State {
  auth?: Auth;
}
export function Navbar() {
  const context = useContext(artistContext)
  const [navShowHandler, setNavShowHandler] = useState("");
  const [navActive, setNavActive] = useState("");
  const router = useRouter();

  const [state, setState] = useState<State>({});
  const [scroll, setScroll] = useState(false);
  const [navbarFix, setNavbarFix] = useState("");

  useEffect(() => {
    // Access token is stored in localstorage

    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
      if (window.scrollY > 50) {
        setNavbarFix("navbar-fix");
      } else if (window.scrollY < 50) {
        setNavbarFix("");
      }
    });

    const ls = window.localStorage.getItem(LS_KEY);
    const auth = ls && JSON.parse(ls);
    setState({ auth });
  }, []);
  // mainnet:0x38

  const handleLoggedIn = (auth: Auth) => {
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
    context.setIsLogin(true)
    setState({ auth });
    // router.reload();
  };

  const handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem('artist');
    setState({ auth: undefined });
    context.setGlobal({artist: ""})
    context.setIsLogin(false)
    //router.reload();
    router.push("/");
  };

  const { auth } = state;

  const navhideHandler = () => {
    setNavShowHandler("");
  };

  const navBtn = () => {
    if (navShowHandler == "show") {
      setNavShowHandler("");
    } else {
      setNavShowHandler("show");
    }
  };

  return (
    <>
      <section className="header-section">
        <nav className="navbar navbar-expand-lg sticky-top navba custome-nav">
          <div className="container">
            <a className="navbar-brand d-block d-md-none" href="/">
              <img
                src="/image/logo.png"
                className="img-fluid animate__animated"
              />
            </a>
            <button
              className="navbar-toggler"
              onClick={navBtn}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="toggle-icon" />
              <span className="toggle-icon" />
              <span className="toggle-icon" />
            </button>
            <div
              className={`collapse navbar-collapse justify-content-between ${navShowHandler}`}
              id="navbarTogglerDemo01"
            >
              <a className="navbar-brand d-none d-md-flex " href="/">
                <img
                  src="/image/logo.png "
                  className=" animate__animated img-fluid"
                />
              </a>

              <div className="d-flex">
                <form className="d-flex d-none d-md-flex me-5">
                  <input
                    className="form-control me-2"
                    id="search"
                    type="text"
                    placeholder="Search items, collections, and..."
                    aria-label="Search"
                  />
                  <FontAwesomeIcon icon={faSearch} />
                </form>

                <ul className="navbar-nav  mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link href="/">
                      <a
                        onClick={navhideHandler}
                        className="nav-link active animate__animated"
                        aria-current="page"
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/art">
                      <a
                        onClick={navhideHandler}
                        className="nav-link animate__animated"
                      >
                        Drop
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/artists">
                      <a
                        onClick={navhideHandler}
                        className="nav-link animate__animated "
                      >
                        Artists
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/street-art">
                      <a
                        onClick={navhideHandler}
                        className="nav-link animate__animated "
                      >
                        Street Art
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/art/mint">
                      <a
                        onClick={navhideHandler}
                        className="nav-link btn create-btn"
                      >
                        Create
                      </a>
                    </Link>
                  </li>

               

                  <li>
                    <div className="connect-wallet-col">
                      {auth ? (
                      
                          <Profilepic
                            auth={auth}
                            onLoggedOut={handleLoggedOut}
                          />
                        
                      ) : (
                        <Login onLoggedIn={handleLoggedIn} />
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}
