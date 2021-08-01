import * as React from 'react';
import './login.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { UserModel } from 'src/Models/UserModel';
// import { createHash, parseJwt, saveUserDataForSession } from 'src/utilities/generalUtils';
import { Logo, Brand, BasePage, PageImage } from 'components/index';
import * as firebase from "firebase";
import axios from "axios";
import { API_ROOT } from "../../config";
import "./login.scss";
const privacy = require("../../resources/icons/Privacy_icon.png");
// import { AccountInfo, PublicClientApplication } from "@azure/msal-browser";
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { createHash, parseJwt, saveUserDataForSession } from "src/utilities/generalUtils";
import { removeAlert } from "src/actions/alertAction";
import * as microsoftTeams from "@microsoft/teams-js";
import { AuthenticationContext, adalFetch, withAdalLogin } from "react-adal";
// import {uuid} from 'uuid'
import * as $ from "jquery";

// import { authContext } from './adalConfig';
// import auth from './auth'

// import { loginUser } from 'src/actions/loginActions';
import { Button } from 'src/components/FormComponents/Button';
// import AzureAuthenticationButton from 'src/components/azure/azure-authentication-component';
// import { firebaseInit } from 'src/services/firebase';
// import WelcomeUser from './welcome';
// import { WelcomeUser, SignInButton } from './welcome';
// import { SampleAppButtonLaunch } from 'src/components/SPAAuthentication/authentication';
import { AuthHelper } from 'src/helpers';
import { firebaseInit } from 'src/services/firebase';
import { loginUser } from 'src/actions/loginActions';
// let authority = 'https://login.microsoftonline.com/common';
// let authorizeEndpoint = '/oauth2/v2.0/authorize';
// let tokenEndpoint = '/oauth2/v2.0/token';
// let scope = 'Calendars.ReadWrite.Shared Contacts.ReadWrite.Shared offline_access';
import * as Msal from "msal";

export interface ILoginProps {
  OnClick?: any;
  history: {
    push: (path: string) => void;
  };
}
export interface ILoginState {
  isLoading?: boolean;
  currentUser?: object;
  userDetails?: object;
  rememberMe?: boolean;
  notMatching?: boolean;
}

class LoginImpl extends React.Component<ILoginProps, ILoginState> {
  _isMounted = false;
    msalConfig 

    msalInstance
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      isLoading: false,
      currentUser: {},
      userDetails: {}
    };
     this.msalConfig = {
        auth: {
            clientId: 'b083d035-a374-45ea-911c-5ddf8569b0f5',
            // redirectUri: "http://localhost:8080/",
            navigateToLoginRequestUrl: true

        }
    };
       this.msalInstance = new Msal.UserAgentApplication(this.msalConfig);

  }

  isLoading = false;
  containerEl = null;
  externalWindow = null;

  componentDidMount() {
    firebaseInit;
    var authTokenRequest = {
      successCallback: function(result) { console.error("Success: " + result); },
      failureCallback: function(error) { console.error("Failure: " + error); }
    };
    console.warn(authTokenRequest);
    microsoftTeams.authentication.getAuthToken(authTokenRequest);
  }

  componentWillMount() {
    this._isMounted = false;
  }

  // handleSubmit = async (user) => {
  //   debugger
  //   console.log('userdasda*******', user)
  //   const config = {
  //     auth: {
  //       clientId: 'b172c03f-be43-42e9-b17a-34fe50574266',
  //       redirectUri: "http://localhost:8080", //defaults to application start page
  //       postLogoutRedirectUri: "http://localhost:8080"
  //     }
  //   }
  //   debugger
  //   let userId = await createHash(user['tenantId'])
  //   debugger
  //   let self = this;
  //   axios.post(`${API_ROOT}/createTokenId`,
  //     {
  //       "organisationId": "-MHUPaNmo_p85_DR3ABC",
  //       "subOrganisationId": "596ef7d8-f109-4c4e-9c91-81896baa9da5",
  //       "empId": userId,
  //       "uid": `-MHUPaNmo_p85_DR3ABC||${userId}||b172c03f-be43-42e9-b17a-34fe50574266`
  //     },
  //     {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       }
  //     })
  //     .then(function (res) {
  //       debugger
  //       console.log('response', res)
  //       self.setState({ isLoading: false });
  //       if (!res.data.status && res.data.StatusCode === 401) {

  //         removeAlert('loginError');
  //       } else {
  //         debugger
  //         const token = res.data.token;
  //         debugger
  //         console.log(token)
  //         const userInstance = parseJwt(token);
  //         let data = {
  //           ...userInstance,
  //           token: token
  //         }
  //         debugger
  //         console.log('data', data)
  //         new UserModel({
  //           ...userInstance,
  //           token: token
  //         }).$save();
  //         console.log('userInstance', userInstance)
  //         loginUser({ ...userInstance, token: token });
  //         saveUserDataForSession({ accessToken: token.data, isLoggedIn: true });
  //         firebaseInit.auth().signInWithCustomToken(token).then(async (userCredential) => {
  //           // Signed in
  //           var user = userCredential.user;
  //           debugger
  //           console.log(user)
  //           try {
  //             const data = await firebaseInit.database().ref(`users/-MHUPaNmo_p85_DR3ABC||${userId}||b172c03f-be43-42e9-b17a-34fe50574266/brew/weeks_average/24_2021/happinessCounter`).once('value')
  //             debugger
  //             console.log('firebase', data)
  //           } catch (e) {
  //             debugger
  //             console.log(e)
  //           }
  //           //         // ...
  //         })
  //           .catch((error) => {
  //             var errorCode = error.code;
  //             var errorMessage = error.message;
  //             debugger
  //             //           // ...
  //           });
  //         self.props.history.push(`/dashboard`);
  //       }
  //     })
  //     .catch(function (error) {
  //       self.setState({ isLoading: false });
  //       throw error;
  //     });
  // }
  //   getAuthUrl() {
  //     return authority + authorizeEndpoint +
  //         '?client_id=' + "b172c03f-be43-42e9-b17a-34fe50574266" +
  //         '&response_type=code' +
  //         '&scope=' + scope +
  //         '&redirect_uri=' + 'http://localhost:8080' +
  //         '&response_mode=query' +
  //         '&nonce=' + 'b172c03f-be43-42e9-b17a-34fe50556266';

  // }
  handleSubmit = async user => {
    //debugger;
    console.log("userdasda*******", user);
    const config = {
      auth: {
        clientId: "b172c03f-be43-42e9-b17a-34fe50574266",
        redirectUri: "http://localhost:8080", //defaults to application start page
        postLogoutRedirectUri: "http://localhost:8080"
      }
    };
   // debugger;
    let userId = await createHash(user["tenantId"]);
    //debugger;
    let self = this;
    axios
      .post(
        `${API_ROOT}/createTokenId`,
        {
          organisationId: "-MHUPaNmo_p85_DR3ABC",
          subOrganisationId: "596ef7d8-f109-4c4e-9c91-81896baa9da5",
          empId: userId,
          uid: `-MHUPaNmo_p85_DR3ABC||${userId}||b172c03f-be43-42e9-b17a-34fe50574266`
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then(function (res) {
       // debugger;
        console.log("response", res);
        self.setState({ isLoading: false });
        if (!res.data.status && res.data.StatusCode === 401) {
          removeAlert("loginError");
        } else {
        //  debugger;
          const token = res.data.token;
         // debugger;
          console.log(token);
          const userInstance = parseJwt(token);
          let data = {
            ...userInstance,
            token: token
          };
         // debugger;
          console.log("data", data);
          new UserModel({
            ...userInstance,
            token: token
          }).$save();
          // const config = {
          //   apiKey: 'AIzaSyDgBMwAlFM7VnTNELf-ZJnWOkCETCTr9Kk',
          //   authDomain: 'joye-768f7.firebaseapp.com',
          //   projectId: 'joye-768f7',
          //   type: 'service_account',
          //   project_id: 'joye-768f7',
          //   databaseURL: 'https://teams-768f7-e6e45.firebaseio.com',
          // };
          // const firebaseInit = firebase.initializeApp(config);
          // debugger
          console.log("userInstance", userInstance);
          loginUser({ ...userInstance, token: token });
          saveUserDataForSession({ accessToken: token.data, isLoggedIn: true });
          firebaseInit
            .auth()
            .signInWithCustomToken(token)
            .then(async userCredential => {
              // Signed in
              var user = userCredential.user;
              //debugger;
              console.log(user);
              try {
                const data = await firebaseInit.database().ref(`users/-MHUPaNmo_p85_DR3ABC||${userId}||b172c03f-be43-42e9-b17a-34fe50574266/brew/weeks_average/24_2021/happinessCounter`).once("value");
               // debugger;
                console.log("firebase", data);
              } catch (e) {
               // debugger;
                console.log(e);
              }
              //         // ...
            })
            .catch(error => {
              var errorCode = error.code;
              var errorMessage = error.message;
             // debugger;
              //           // ...
            });
          self.props.history.push(`/dashboard`);
        }
      })
      .catch(function (error) {
        self.setState({ isLoading: false });
        throw error;
      });
  };

  getQueryParameters = () => {
    let queryParams = {};
    location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        let s = item.split("="),
          k = s[0],
          v = s[1] && decodeURIComponent(s[1]);
        queryParams[k] = v;
      });
    return queryParams;
  };


  getToken = () => {
    // var bodyFormData = new FormData();
    // bodyFormData.append('client_id', 'b083d035-a374-45ea-911c-5ddf8569b0f5');
    // bodyFormData.append('scope', 'api://joyeapp.netlify.app/b083d035-a374-45ea-911c-5ddf8569b0f5/.default');
    // bodyFormData.append('client_secret', 'M.BX.JE-KvjS6.83~rt_1PtwiOuX1D9T2U');
    // bodyFormData.append('grant_type', 'client_credentials');
    // axios({
    //   method: "post",
    //   url: 'https://login.microsoftonline.com/c93aeb09-e175-49b2-8982-9f00f6f8c073/oauth2/v2.0/token',
    //   data: bodyFormData,
    //   // headers: { "Content-Type": "multipart/form-data"},
    // })
    //   .then(function (response) {
    //     alert("response");
    //     alert(JSON.stringify(response))
    //     //handle success
    //     console.warn(response);
    //   })
    //   .catch(function (error) {
    //     //handle error
    //     alert("error");
    //     alert(JSON.stringify(error))
    //     console.error(error);
    //   });
    
      this.msalInstance.handleRedirectCallback((error, response) => {
        alert(response);
        alert(JSON.stringify(error));
        // handle redirect response or error
    });
       var loginRequest = {
       scopes: ["user.read", "mail.send"] // optional Array<string>
   };

    // this.msalInstance.loginPopup(loginRequest)
    //     .then(response => {
    //         // handle response
    //          alert(JSON.stringify(response));
        
    //     })
    //     .catch(err => {
    //         // handle error
    //         alert(JSON.stringify(err));
    //     });
     var tokenRequest = {
            scopes: ["user.read", "mail.send"]
        };
        if (this.msalInstance.getAccount()) {
       
        this.msalInstance.acquireTokenSilent(tokenRequest)
            .then(response => {
              alert("dharmesh");
              alert(JSON.stringify(response));
              console.info(response);
                // get access token from response
                // response.accessToken

                 var headers = new Headers();
                    var bearer = "Bearer " + response.accessToken;
                    headers.append("Authorization", bearer);
                    var options = {
                         method: "GET",
                         headers: headers
                    };
                    var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

                    fetch(graphEndpoint, options)
                        .then(resp => {
                           alert("resp");
                           console.info(resp);
                             //do something with response
                        });
            })
            .catch(err => {
                // could also check if err instance of InteractionRequiredAuthError if you can import the class.
                if (err.name === "InteractionRequiredAuthError") {
                    return this.msalInstance.acquireTokenPopup(tokenRequest)
                        .then(res => {
                          alert("res");
                          alert(JSON.stringify(res));
                          
                            // get access token from response
                            // response.accessToken
                        })
                        .catch(err => {
                            // handle error
                        });
                }
            });
    } else {
      this.msalInstance.acquireTokenPopup(tokenRequest)
                        .then(res => {
                          alert("res");
                          alert(JSON.stringify(res));
                          
                            // get access token from response
                            // response.accessToken
                        })
                        .catch(err => {
                          alert("err");
                          alert(JSON.stringify(err));
                            // handle error
                        });
        // user is not logged in, you will need to log them in to acquire a token
    }
  }
  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <BasePage withMenu className="login-form">
          <Logo height="76px" width="76px" marginTop="72px" />
          <Brand fontSize="42px" />
          <div className="text-container">
            <div className="advertise-text">
              <p>Speak your mind and Joye will keep you</p>
              <p>positive and productive amidst your emotional flux</p>
            </div>
          </div>
        <div className="button-wrapper">
         <Button Loader={null} type="button" onClick={this.getToken} marginBottom={'20px'} fontWeight={600} fontSize="16.67px" >Login</Button> 
        {/*<Button Loader={null} type="button" onClick={AuthHelper.Login} marginBottom={'20px'} fontWeight={600} fontSize="16.67px" >Login</Button>*/}
        </div>
        {/* <PageImage height="42px" width="42px" marginTop="72px" logo={shield} /> */}
     {/*<span className="dont-have-account-text">
          You have our promise for your privacy protection. We will use only an encrypted idenity as your unique 
          identifier. We do not need any of your other personal details - no email address, no profile picture, no
           employee ID.</span> */}
        {/* <div className="text-container">
          <div className="advertise-text">
            <h3 className="advertise-text">Privacy poilicy</h3>
          </div>
          </div> */}

          {/* <div className="button-wrapper">
            <AzureAuthenticationButton onAuthenticated={this.handleSubmit} />
          </div> */}

          
        </BasePage>

        <BasePage className="login-form">
          <div
            className="render-component"
            style={{
              background: "#ffffff",
              color: "#808080",
              padding: "10px",
              textAlign: "center",
              minHeight: "600px",
              height: "auto",
             // width: "70%",
             // marginLeft: "16.5%",
              alignContent: "center",
              fontFamily: "Nunito-Regular",
              fontSize: "16px",
              lineHeight: "24px",
              position:"relative"
            }}
          >
          <div className="text-container">
            <div className="advertise-text" style={{ color: "#808080", fontSize: "16px", marginTop: "15px",}}>
              Easy and secure sign in with your Microsoft account
            </div>
        </div>
            <div style={{ alignContent: "center"}}>
              <img height="125px" width="93px" src={privacy} />
            </div>

            <p style={{ marginTop: "10px" }}>You have our promise to protect your privacy. We use an unique encrypted identity to recognise you inside of Joye. We do not require your personal details - no name, no email address, no profile picture, no employee ID.</p>
            <p style={{ marginTop: "20px" }}>Your organisation will not be able to access your personal information inside of Joye. We may share organisation level trends, but the information will not be identifiable to you or any individual users.</p>

            <div className="text-container">
              <div className="advertise-text">
                <h3 className="advertise-text" style={{ fontSize: "18px", color: "#1E00A3", marginTop: "50px",}}>
                  <a href="#" style={{ color: "#1E00A3" }}>Privacy poilicy</a> &nbsp;|&nbsp; <a href="#" style={{ color: "#1E00A3" }}>Terms of service</a>
                </h3>
              </div>
            </div>

            {/* <div className="text-container">
              <div className="advertise-text">
                <h3 className="advertise-text" style={{ fontSize: "18px", color: "#1E00A3", marginTop: "10px", marginLeft: "-62px" }}>
                 
                </h3>
              </div>
            </div> */}
            <div className="copy-right-text" style={{ marginTop: "20px" }}>
              <a href="www.joye.ai" style={{ color: "#1E00A3" }}>
                www.joye.ai
              </a>
            </div>
          </div>
      </BasePage>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  const userInstances = UserModel.list(state);
  return {
    user: userInstances
  };
};

export const Login = withRouter(connect(mapStateToProps)(LoginImpl) as any);
