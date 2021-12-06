import { useRouter } from "next/router";
import Profile from "../components/Profile";
import { Auth } from "../types";
import React, { useEffect, useState } from "react";
const LS_KEY = "login-with-metamask:auth";
interface State {
  auth?: Auth;
}
export default function Profil() {
  const [state, setState] = useState<State>({});
  const router = useRouter();
  useEffect(() => {
    // Access token is stored in localstorage
    const ls = window.localStorage.getItem(LS_KEY);
    const auth = ls && JSON.parse(ls);
    setState({ auth });
  }, []);
  const handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    setState({ auth: undefined });
    router.reload();
    router.push("/");
  };

  const { auth } = state;
  return (
    <>
      {auth? (
      
             <Profile auth={auth} onLoggedOut={handleLoggedOut} />
            ) : (      
        <h1>Login Please! </h1>
        )} 
      
    </>
  );
}
