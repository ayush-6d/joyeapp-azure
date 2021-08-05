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

// const msalConfig = {
//   auth: {
//     clientId: 'b083d035-a374-45ea-911c-5ddf8569b0f5',
//     // redirectUri: "https://joyeapp.netlify.app",
//     // redirectUri: "http://localhost:8080",
//     authority: 'https://login.microsoftonline.com/common',
//     // authority: 'https://login.microsoftonline.com/c93aeb09-e175-49b2-8982-9f00f6f8c073',
//     navigateToLoginRequestUrl: true

//   }
// };
// const msalInstance = new Msal.UserAgentApplication(msalConfig);

var loginRequest = {
  scopes: ["user.read", "mail.send"], // optional Array<string>
};
export default class AuthHelper {
  /**
   * Uses the current authetication context to check if a user
   * is logged in. In this case, this is determined by the presence
   * of a cached user and cached token with length > 0.
   */
  public static IsUserLoggedIn(): boolean {
    let cachedUser = authenticationContext.getCachedUser();
    let cachedToken = authenticationContext.getCachedToken(
      constants.Auth.appId
    );

    return !!cachedUser && cachedToken?.length > 0;

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
          authenticationContext.acquireToken(
            "https://graph.microsoft.com",
            (err, token) => {
              if (token) {
                // msTeams.authentication.notifySuccess(token);
                AuthHelper.getUserProfile(token);

                // window.location.href.replace('auth/signinend#', '')
                // window.opener.close('true')
              } else if (err) {
                msTeams.authentication.notifySuccess(token);
                // msTeams.authentication.notifyFailure(err);
              } else {
                msTeams.authentication.notifySuccess(token);
                msTeams.authentication.notifyFailure("UnexpectedFailure");
              }
            }
          );
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
  // public static async userLogin() {

  //   alert(JSON.stringify(msalInstance.getAccount()));
  //   if (msalInstance.getAccount()) {
  //       AuthHelper.getAccessSSOToken();
  //   } else {
  //     alert("user not log in");
  //     //  msalInstance.handleRedirectCallback((error, response) => {
  //     //   // handle redirect response or error
  //     //   alert(JSON.stringify(response))
  //     //   console.log(error);
  //     //   console.log(response);
  //     // });
  //     msalInstance.loginPopup(loginRequest)
  //       .then(response => {
  //         // handle response
  //          AuthHelper.getAccessSSOToken();
  //       })
  //       .catch(err => {
  //         alert("network error loginPopup");
  //         alert(JSON.stringify(err));
  //       });
  //     // user is not logged in, you will need to log them in to acquire a token
  //   }
  // }

  // private static async getAccessSSOToken() {
  //     try{
  //         var response= await  msalInstance.acquireTokenSilent(loginRequest);
  //         alert(JSON.stringify(response));
  //         if(response.accessToken){
  //          AuthHelper.getUserProfile(response.accessToken);
  //         }

  //     }
  //     catch (err) {
  //      if (err.name === "InteractionRequiredAuthError") {
  //         return msalInstance.acquireTokenPopup(loginRequest)
  //           .then(res => {
  //             alert("res");
  //             alert(JSON.stringify(res));
  //                 if(res.accessToken){
  //                 AuthHelper.getUserProfile(res.accessToken);
  //             }
  //             // get access token from response
  //             // response.accessToken
  //           })
  //           .catch(err => {
  //              alert("network error acquireTokenPopup");
  //              alert(JSON.stringify(err));
  //           });
  //       }
  //     }

  // }

  private static getUserProfile(token): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      var headers = new Headers();
      var bearer = "Bearer " + token;
      headers.append("Authorization", bearer);
      headers.append("Content-type", "application/json");
      var options = {
        method: "GET",
        headers: headers,
      };
      var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

      fetch(graphEndpoint, options)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.displayName) {
            localStorage.setItem("userDetails", JSON.stringify(data));
            var decoded = parseJwt(token);

            if (decoded.tid && data.id) {
              AuthHelper.createTokenId(data.id, decoded.tid, token);
            }
            // alert (JSON.stringify(decoded));
            // window.location.replace(window.location.origin + '/');
          }
        })
        .catch((err) => {
          alert("network error getUserProfile");
          alert(JSON.stringify(err));
        });
    });
  }

  private static async createTokenId(userId, tanentId, SSOtoken) {
    try {
      const createTokenId = await axios.post(
        `${API_ROOT}/createTokenId`,
        {
          organisationId: "-MHUPaNmo_p85_DR3ABC",
          subOrganisationId: tanentId,
          empId: userId,
          uid: `-MHUPaNmo_p85_DR3ABC||${userId}||b172c03f-be43-42e9-b17a-34fe50574266`,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (createTokenId.data.token) {
        firebaseInit
          .auth()
          .signInWithCustomToken(createTokenId.data.token)
          .then(async (userCredential) => {
            // Signed in
            localStorage.setItem(
              "userCredential",
              JSON.stringify(userCredential)
            );
            try {
              const data = await firebaseInit
                .database()
                .ref(
                  `users/-MHUPaNmo_p85_DR3ABC||${userId}||b172c03f-be43-42e9-b17a-34fe50574266/brew/weeks_average/24_2021/happinessCounter`
                )
                .once("value");
              // debugger;
              msTeams.authentication.notifySuccess(SSOtoken);
              // window.location.href.replace('auth/signinend#', '')
            } catch (e) {
              alert("network error at firebaseInit.database");
              alert(JSON.stringify(e));
            }
            //         // ...
          })
          .catch((e) => {
            alert("network error at signInWithCustomToken");
            alert(JSON.stringify(e));
          });
      }
    } catch (err) {
      alert("network error at createTokenId");
      alert(JSON.stringify(err));
    }
  }
}
