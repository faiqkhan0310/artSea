import jwtDecode from "jwt-decode";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Blockies from "react-blockies";
import Link from "next/link";

import { Auth } from "../types";
interface Props {
  auth: Auth;
  onLoggedOut: () => void;
}
interface State {
  loading: boolean;
  artist?: {
    _id: number;
    ArtistName: string;
  };
  ArtistName: string;
}
interface JwtDecoded {
  payload: {
    id: string;
    PublicAddress: string;
  };
}

const Profilepic = ({ auth, onLoggedOut }: Props): JSX.Element => {
  const [state, setState] = useState<State>({
    loading: false,
    artist: undefined,
    ArtistName: "",
  });
  useEffect(() => {
    const { accessToken } = auth;
    const {
      payload: { id },
    } = jwtDecode<JwtDecoded>(accessToken);

    fetch(`/api/user/${id}`, {
      // headers: {
      // 	Authorization: `Bearer ${accessToken}`,
      // },
    })
      .then((response) => response.json())
      .then((artist) => setState({ ...state, artist }))
      .catch(window.alert);
  }, []);

  const { accessToken } = auth;
  function shortenHex(hex: string, length = 4) {
    return `${hex.substring(0, length + 2)}…${hex.substring(
      hex.length - length
    )}`;
  }
  const {
    payload: { PublicAddress },
  } = jwtDecode<JwtDecoded>(accessToken);

  const { loading, artist } = state;

  const ArtistName = artist && artist.ArtistName;

  return (
    <>

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center connect-btn-layout">
         
            
            

            <div className="mr-2">
              <div className="w-10 h-10 rounded-full object-cover object-right">
                <Blockies seed={PublicAddress} />
              </div>
            </div>

            <div className="mr-3">
              <p className="text-sm">Hi! {ArtistName}</p>
              <p className="text-sm text-gray-500">
                {shortenHex(PublicAddress, 4)}
              </p>
            </div>
            
            <span></span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="wallet-button-dropdown">
            <div className="px-1 py-1 ">
  
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/profile/[PublicAddress]"}
                    as={`/profile/${PublicAddress}`}
                  >
                    <a
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Profile
                    </a>
                  </Link>
                )}
              </Menu.Item>

             
              {/* <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Move
                </button>
              )}
            </Menu.Item> */}
            </div>

            <div className="px-1 py-1">
              

              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/art/bids/${PublicAddress}`}
                  >
                    <a
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      My bids
                    </a>
                  </Link>
                )}
              </Menu.Item>
             
            </div>


            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-0 text-sm`}
                    onClick={onLoggedOut}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
export default Profilepic;
