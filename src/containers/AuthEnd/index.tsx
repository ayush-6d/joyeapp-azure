import * as React from 'react';
import * as msTeams from '@microsoft/teams-js';
import axios from "axios";

export const AuthEndComp = () => {
//   let _isMounted = false;

//   let containerEl = null;
//   let externalWindow = null;

//   let componentDidMount = () => {
//     firebaseInit;
//   }

//   let componentWillMount =() => {
//     _isMounted = false;
//   
    msTeams.initialize();
    localStorage.removeItem("auth.error");

    let getHashParameters = () => {
        let hashParams = {};
        location.hash.substr(1).split("&").forEach(function(item) {
            let s = item.split("="),
            k = s[0],
            v = s[1] && decodeURIComponent(s[1]);
            hashParams[k] = v;
        });
        return hashParams;
    }
  let hashParams:any = getHashParameters();

    if (hashParams["error"]) {
        // Authentication/authorization failed
        localStorage.setItem("auth.error", JSON.stringify(hashParams));
        axios.post("https://b3bd-110-224-167-251.ngrok.io/tempData/" + hashParams["state"], hashParams, 
        {
          headers: {
            "Content-Type": "application/json"
          }
        })
            .then(async data => {
                await msTeams.authentication.notifyFailure("UnexpectedFailure");
                window.close();
            })
        // window.close();
    } else if (hashParams["access_token"]) {
        // Get the stored state parameter and compare with incoming state
        // let expectedState = localStorage.getItem("auth.state");
        // if (expectedState !== hashParams["state"]) {
        //     // State does not match, report error
        //     localStorage.setItem("auth.error", JSON.stringify(hashParams));
        //     msTeams.authentication.notifyFailure("StateDoesNotMatch");
        // } else {
        //     // Success -- return token information to the parent page.
        //     // Use localStorage to avoid passing the token via notifySuccess; instead we send the item key.
        //     let key = "auth.result";
        //     // TODO: not sure why this isn't being set
        //     localStorage.setItem(key, JSON.stringify({
        //         idToken: hashParams["id_token"],
        //         accessToken: hashParams["access_token"],
        //         tokenType: hashParams["token_type"],
        //         expiresIn: hashParams["expires_in"]
        //     }));
        //     msTeams.authentication.notifySuccess(key);
        // }
        let key = "auth.result";
        // TODO: not sure why this isn't being set
        localStorage.setItem("SSOtoken", hashParams["access_token"])
        // localStorage.setItem('accessToken', hashParams["access_token"])
        localStorage.setItem(key, JSON.stringify({
          idToken: hashParams["id_token"],
          accessToken: hashParams["access_token"],
          tokenType: hashParams["token_type"],
          expiresIn: hashParams["expires_in"]
        }));
        console.log('key', key);
        // axios.post("https://1fc8-110-224-187-24.ngrok.io/tempData/" + hashParams["state"], {
        //     idToken: hashParams["id_token"],
        //     accessToken: hashParams["access_token"],
        //     tokenType: hashParams["token_type"],
        //     expiresIn: hashParams["expires_in"]
        // }, {
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // })
        //     .then(async data => {
                msTeams.authentication.notifySuccess(key);
                window.close();
            // })
    } else {
        // Unexpected condition: hash does not contain error or access_token parameter
        localStorage.setItem("auth.error", JSON.stringify(hashParams));
        axios.post("https://b3bd-110-224-167-251.ngrok.io/tempData/" + hashParams["state"], hashParams, 
        {
          headers: {
            "Content-Type": "application/json"
          }
        })
            .then(async data => {
                await msTeams.authentication.notifyFailure("UnexpectedFailure");
                window.close();
            })
    }

    return (
      <div>
          Hello {hashParams.access_token}
      </div>
    );
}


// export const authEndComp = authEnd
