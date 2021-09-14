import * as React from 'react';
import './login.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { UserModel } from 'src/Models/UserModel';
import { Logo, Brand, BasePage, PageImage } from 'components/index';
import "./login.scss";
const privacy = require("../../resources/icons/Privacy_icon.png");
import { Button } from 'src/components/FormComponents/Button';
import AuthHelper from 'src/helpers/auth-helper';
import { firebaseInit } from 'src/services/firebase';
import Popup from 'src/components/Popup';


export interface ILoginProps {
  OnClick?: any;
  history: {
    push: (path: string) => void;
  };
}
export interface ILoginState {
  isLoading?: boolean;
  popup?: boolean;
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
      isLoading: false,
      currentUser: {},
      userDetails: {},
      popup: false
    };
  }

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

  userLogin = () => {
    console.log('clicked')
    this.setState({ isLoading: true });
    if (!this.state.isLoading) {
      let auth = new AuthHelper();
      auth.userLogin();
    }
  }
  togglePopup = () => {
    this.setState({ popup: !this.state.popup });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {this.state.popup && (<Popup
          text="Welcome to Joye. It’s as easy as 1-2-3!"
          screenMessage={[
            "1: Speak your mind. You can speak, write or try guided reflection.",
            "2: Joye will understand you and give you some good advice - just like your mentor or a dear friend would have guided you. You can also manage your daily joy level.",
            "3: Now you have a plan! Congratulations! You are ready to take on the rest of your day.",
            "Let’s make mental wellbeing into a habit, the mental fitness habit - your ‘10,000 steps’ of mental wellbeing!"
          ]}
          closePopup={this.togglePopup} />)}
        <BasePage withMenu showInfoIcon className="login-form home-screen">
          <Logo height="76px" width="76px" marginTop="72px" />
          <Brand fontSize="42px" />
          <div className="text-container">
            <div className="advertise-text">
              <p>Speak your mind and Joye will keep you positive and productive amidst your emotional flux</p>
            </div>
          </div>
          <div className="button-wrapper">

            <Button
              Loader={null}
              type="button"
              disabled={isLoading}
              onClick={() => {
                this.togglePopup();
                this.userLogin();
              }}
              marginBottom={'20px'}
              fontWeight={600}
              fontSize="16.67px"
            >
              {isLoading && <i className="fa fa-refresh fa-spin"></i>}Sign in
            </Button>
          </div>
          <div className="text-container">
            <div className="advertise-text small-text" style={{ color: "#808080", fontSize: "16px", }}>
              Easy and secure sign in with your Microsoft account
            </div>
          </div>
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
              alignContent: "center",
              fontFamily: "Nunito-Regular",
              fontSize: "16px",
              lineHeight: "24px",
              position: "relative"
            }}
          >

            <div style={{ alignContent: "center" }}>
              <img height="125px" width="93px" src={privacy} />
            </div>


            <p style={{ marginTop: "10px" }}>No one is listening. You have our promise to protect your privacy with advanced technology and strict privacy policy.</p>
            <p style={{ marginTop: "20px" }}>When you speak or write, we immediately anonymise your expression and no one can ever know what you spoke. Not only this, Joye’s technology is EU General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) compliant, to protect your privacy at the highest level. <a style={{ color: "#1E00A3" }} href="https://firebase.google.com/support/privacy">More Details</a> </p>
            <p style={{ marginTop: "20px" }}>Joye’s data is independently managed by Joye Pte Ltd Singapore, and your organisation will not be able to see your private information. They will only see a high-level overview of the organisation’s wellbeing. This will enable your organisation to make more empathetic and responsive policy decisions to better serve the emotional needs of your organisation. Individual level information will not be visible to your organisation.</p>

            <div className="text-container">
              <div className="advertise-text">
                <h3 className="advertise-text body-text" style={{ fontSize: "18px", color: "#1E00A3", marginTop: "50px", }}>
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
