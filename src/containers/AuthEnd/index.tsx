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
        msTeams.authentication.notifySuccess(key);
        window.close();
    } else {
        // Unexpected condition: hash does not contain error or access_token parameter
        localStorage.setItem("auth.error", JSON.stringify(hashParams));
        msTeams.authentication.notifyFailure("UnexpectedFailure");
        window.close();
    }

    return (
      <div>
          Hello {hashParams.access_token}
      </div>
    );
}


// export const authEndComp = authEnd
