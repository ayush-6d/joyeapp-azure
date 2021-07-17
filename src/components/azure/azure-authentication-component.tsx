// import React, { useState } from "react";
import * as React from "react";

import AzureAuthenticationContext from "./azure-authentication-context";
import { AccountInfo } from "@azure/msal-browser";
import MicrosoftLogin from "../../resources/icons/signin.png";
import { useState } from "react";

const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const isIE = msie > 0 || msie11 > 0;

// Log In, Log Out button
const AzureAuthenticationButton = ({ userDetail, onAuthenticated }: any): JSX.Element => {
  // Azure client context
  debugger;
  const authenticationModule: AzureAuthenticationContext = new AzureAuthenticationContext();

  const [authenticated, setAuthenticated] = useState<Boolean>(false);
  const [user, setUser] = useState<AccountInfo>();

  const logIn = (method: string): any => {
    const typeName = "loginPopup";
    const logInType = typeName;

    // Azure Login
    authenticationModule.login(logInType, returnedAccountInfo);
  };
  const logOut = (): any => {
    if (user) {
      onAuthenticated(undefined);
      // Azure Logout
      authenticationModule.logout(user);
    }
  };

  const returnedAccountInfo = async (user: AccountInfo) => {
    var self = this;
    setAuthenticated(user?.name ? true : false);
    await onAuthenticated(user);
    // userDetail(user)
    // userDetail=user
    setUser(user);
  };

  const showLogInButton = (): any => {
    return (
      //   <button id="authenticationButton" onClick={() => logIn("loginPopup")}>
      <img src={MicrosoftLogin} alt="React Logo" id="authenticationButton" style={{ cursor: "pointer" }} onClick={() => logIn("loginPopup")} />
      //   </button>
    );
  };

  const showLogOutButton = (): any => {
    return (
      <div id="authenticationButtonDiv">
        <div id="authentication">
          <button id="authenticationButton" onClick={() => logOut()}>
            Log out
          </button>
        </div>
      </div>
    );
  };

  const showButton = (): any => {
    return authenticated ? showLogOutButton() : showLogInButton();
  };

  return <div id="authentication">{authenticationModule.isAuthenticationConfigured ? showButton() : <div>Authentication Client ID is not configured.</div>}</div>;
};

export default AzureAuthenticationButton;
