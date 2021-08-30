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
import * as msTeams from '@microsoft/teams-js';


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
   
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      isLoading: true,
      currentUser: {},
      userDetails: {}
    };
  }

  isLoading = true;
  containerEl = null;
  externalWindow = null;

  componentDidMount() {
    firebaseInit;
  }

  componentWillMount() {
    this._isMounted = false;
  }

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

  userLogin =()=>{
        this.setState({ isLoading: true });
        if(!this.state.isLoading){
          AuthHelper.userLogin()
        }
        
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <BasePage withMenu showInfoIcon className="login-form home-screen">
          <Logo height="76px" width="76px" marginTop="72px" />
          <Brand fontSize="42px" />
          <div className="text-container">
            <div className="advertise-text">
              <p>Speak your mind and Joye will keep you positive and productive amidst your emotional flux</p>
            </div>
          </div>
        <div className="button-wrapper">
        
        <Button Loader={null} type="button" onClick={this.userLogin} marginBottom={'20px'} fontWeight={600} fontSize="16.67px" >{isLoading && <i className="fa fa-refresh fa-spin"></i>}Sign in</Button>
        </div>
        <div className="text-container">
            <div className="advertise-text small-text" style={{ color: "#808080", fontSize: "16px",}}>
              Easy and secure sign in with your Microsoft account
            </div>
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

        <BasePage className="login-form home-screen">
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
          
            <div style={{ alignContent: "center"}}>
              <img height="125px" width="93px" src={privacy} />
            </div>

            
            <p style={{ marginTop: "10px" }}>No one is listening. You have our promise to protect your privacy with advanced technology and strict privacy policy.</p>
            <p style={{ marginTop: "20px" }}>When you speak or write, we immediately anonymise your expression and no one can ever know what you spoke. Not only this, Joye’s technology is EU General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) compliant, to protect your privacy at the highest level. <a style={{ color: "#1E00A3"}} href="https://firebase.google.com/support/privacy">More Details</a> </p>
            <p style={{ marginTop: "20px" }}>Joye’s data is independently managed by Joye Pte Ltd Singapore, and your organisation will not be able to see your private information. They will only see a high-level overview of the organisation’s wellbeing. This will enable your organisation to make more empathetic and responsive policy decisions to better serve the emotional needs of your organisation. Individual level information will not be visible to your organisation.</p>

            <div className="text-container">
              <div className="advertise-text">
                <h3 className="advertise-text body-text" style={{ fontSize: "18px", color: "#1E00A3", marginTop: "50px",}}>
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
