import * as constants from "src/constants";
import * as msTeams from "@microsoft/teams-js";
import AuthenticationContext from "adal-angular";
import { parseJwt } from "../utilities/generalUtils";
import axios from "axios";
import { API_ROOT } from "../config";
import { firebaseInit } from "../services/firebase";

// import * as Msal from "msal";

const authenticationContext = new AuthenticationContext({
  clientId: constants.Auth.appId,
  redirectUri: `${window.location.origin}/${constants.Auth.signInEndPage}`,
  cacheLocation: constants.Auth.cacheLocation as
    | "localStorage"
    | "sessionStorage",
  endpoints: constants.Auth.authenticatedDomains,
  navigateToLoginRequestUrl: false,
});

export default class AuthHelper {
   
  /**
   * Uses the current authetication context to check if a user
   * is logged in. In this case, this is determined by the presence
   * of a cached user and cached token with length > 0.
   */

  public static IsUserLoggedIn(): boolean {

    // if(window.location.origin=="http://localhost:8080"){
    let cachedUser = authenticationContext.getCachedUser();
    let cachedToken = authenticationContext.getCachedToken(
      constants.Auth.appId
    );

    return !!cachedUser && cachedToken?.length > 0;
    // }
    // return localStorage.getItem("userDetails")?true:false;
  }

  /**
   * Attempts to get an access token for the user. If successful,
   * sends the user to the home page again where they will now
   * be logged in.
   */
  public static async Login(): Promise<void> {
    //  debugger
    let accessToken;

    try {
      accessToken = await AuthHelper.getAccessToken();
      console.log("accessToken", accessToken);
      if (accessToken.length > 0) {
        // debugger
        window.location.replace(window.location.origin + "/");
      }
      //  debugger
    } catch (err) {
      // debugger
      let cachedToken = authenticationContext.getCachedToken(
        constants.Auth.appId
      );
      if (cachedToken && cachedToken.length > 0) {
        window.location.replace(window.location.origin);
      } else {
        console.error(err);
      }
    }
  }

  /**
   * Clears any existing user from the cache, then requests
   * an AD token.
   */
  public static StartSignIn(): void {
    authenticationContext.clearCache();
    authenticationContext.login();
  }

  /**
   * Called from the sign-in-end page. Checks for the presence
   * of the AD token, and notifies teams of a successful log in
   * if it is there, or notifies of failure otherwise.
   */
  public static EndSignIn(): void {
    // debugger
    if (authenticationContext.isCallback(window.location.hash)) {
      authenticationContext.handleWindowCallback(window.location.hash);

      if (window.opener) {
        //   debugger
        if (authenticationContext.getCachedUser()) {
          authenticationContext.acquireToken("https://graph.microsoft.com", (err, token) => {
            if (token) {
              msTeams.authentication.notifySuccess(token);
              window.location.href.replace('auth/signinend#', '')
               //AuthHelper.getUserProfile(token,null);
              // window.opener.close('true')
            } else if (err) {
              msTeams.authentication.notifySuccess(token);
              // msTeams.authentication.notifyFailure(err);
            } else {
              msTeams.authentication.notifySuccess(token);
              msTeams.authentication.notifyFailure("UnexpectedFailure");
            }
          });
        } else {
          msTeams.authentication.notifySuccess();
          microsoftTeams.authentication.notifyFailure(
            authenticationContext.getLoginError()
          );
        }
      }
    }
  }

  /**
   * Begins the login flow by opening a popup window
   * at the sign-in-start page.
   */
  private static async getAccessToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      msTeams.authentication.authenticate({
        url: `${window.location.origin}/${constants.Auth.signInStartPage}`,
        width: 600,
        height: 535,
        successCallback: (accessToken: string | undefined) => {
          // debugger
          console.log(accessToken);
          resolve(accessToken);
        },
        failureCallback: (reason) => {
          //  debugger
          reject(reason);
        },
      });
    });
  }
  public static async userLogin() {
    
    if(window.location.origin=="http://localhost:8080"){
        AuthHelper.Login()
    }else{
    AuthHelper.getAccessSSOToken()
      .then((clientSideToken:any) => {
        localStorage.setItem("accessToken",clientSideToken)
        return AuthHelper.getServerSideToken(clientSideToken);
      }).catch(err=>{
        alert("accessToken error")
        alert(err)
      })
    }
  }
  public static async getServerSideToken(clientSideToken) {
    return new Promise((resolve, reject) => {
      msTeams.getContext(async (context) => {
        try {
          alert(context.tid);
          const ssoToken = await axios.post("https://1bb8c079264f.ngrok.io/auth/token", {
            token: clientSideToken,
            tid: context.tid
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          if (ssoToken.data.sso) {
            localStorage.setItem("SSOtoken",ssoToken.data.sso)
            AuthHelper.getUserProfile(ssoToken.data.sso, context.tid)
          }

        } catch (error) {
          alert("sso token error");
          alert(JSON.stringify(error));
        }
      })
    });

  }
  private static async getAccessSSOToken() {
    return new Promise((resolve, reject) => {
      msTeams.authentication.getAuthToken({
        successCallback: (result) => {
          resolve(result);
        },
        failureCallback: function(error) {
          reject("Error getting token: " + error);
        }
      });
    });

  }

  private static getUserProfile(token, tid): Promise < string > {
    return new Promise < string > ((resolve, reject) => {
      var headers = new Headers();
      var bearer = "Bearer " + token;
      headers.append("Authorization", bearer);
      headers.append("Content-type", "application/json");
      var options = {
        method: "GET",
        headers: headers
      };
      var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

      fetch(graphEndpoint, options)
        .then(function(response) {
          return response.json();
        }).then(function(data) {
          if (data.displayName) {
            alert(data.displayName);
            localStorage.setItem("userProfile", JSON.stringify(data))
            var decoded = parseJwt(token);

            if (decoded.tid && data.id) {
              AuthHelper.createTokenId(data.id, tid ? tid : decoded.tid, token)
            }
            // alert (JSON.stringify(decoded));
            // window.location.replace(window.location.origin + '/');

          }

        }).catch(err => {
          alert("network error getUserProfile");
          alert(JSON.stringify(err));
        });
    })
  }

  private static async createTokenId(userId, tanentId, SSOtoken) {

    try {
      const createTokenId = await axios.post(`${API_ROOT}/createTokenId`, {
        organisationId: "-MHUPaNmo_p85_DR3ABC",
        subOrganisationId: tanentId,
        empId: userId,
        uid: `-MHUPaNmo_p85_DR3ABC||${userId}||b172c03f-be43-42e9-b17a-34fe50574266`
      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      if (createTokenId.data.token) {
        firebaseInit
          .auth()
          .signInWithCustomToken(createTokenId.data.token)
          .then(async userCredential => {
            // Signed in
            localStorage.setItem("userCredential", JSON.stringify(userCredential));
            try {
              const data = await firebaseInit.database().ref(`users/-MHUPaNmo_p85_DR3ABC||${userId}||b172c03f-be43-42e9-b17a-34fe50574266/brew/weeks_average/24_2021/happinessCounter`).once("value");
              // debugger;
              if(window.location.origin!=="http://localhost:8080")
                window.location.replace(window.location.origin + '/');
              else
                msTeams.authentication.notifySuccess(SSOtoken);
            } catch (e) {
              alert("network error at firebaseInit.database");
              alert(e);
            }
            //         // ...
          })
          .catch(e => {
            alert(" error at signInWithCustomToken");
            alert(JSON.stringify(e));
          });
      }
    } catch(e){
      console.log('error', e);
    }
  }
}