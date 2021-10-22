import * as React from 'react';

import './basePage.scss';
import { BurgerMenu } from 'src/components/BurgerMenu';
import Shield from "../../resources/icons/Privacyshield.png";
import InfoIcon from "../../resources/icons/infoIcon.png";
import { PageImage } from "src/components";
import Popup from '../Popup';
import * as microsoftTeams from "@microsoft/teams-js";
import Close from "src/resources/icons/Close.png";
import { Button } from "../FormComponents";
const out = require("../../resources/icons/logout.png");

export class BasePage extends React.Component<{
  className?: string;
  withMenu?: boolean;
  style?: React.CSSProperties;
  component?: boolean;
  showShield?: boolean;
  showInfoIcon?: boolean;
  withCross?: boolean;
  unload?: any;
  showSignout?: boolean;
  history?: any;
},
  {
    popup: boolean, screenMessage: string[], screenTitle: string, shieldPopup: boolean, isOpen: boolean, modalOpened: boolean,
  }> {
  static defaultProps = {
    style: {}
  };
  constructor(props: any) {
    super(props);
    this.state = {
      popup: false,
      screenMessage: [""],
      screenTitle: "",
      shieldPopup: false,
      isOpen: false,
      modalOpened: false
    };
  }

  componentDidMount() {
    microsoftTeams.initialize();
  }
  onClickHandle() {

  }
  togglePopupOpen() {
    let screenMessage = [""];

    if (window.location.pathname === "/aboutus") {
      screenMessage = ["Joye is an engaging mental wellbeing service for everyone, every day. Let’s make mental wellbeing into a habit, the mental fitness habit, the ‘10,000 steps’ of mental wellbeing!",
        "No one is listening. When you speak or write, we immediately anonymise your expression and no one can ever know what you spoke. Your data is independently managed by Joye, and your employer or anyone else will not be able to see your private information."];
    } else if (window.location.pathname === "/privacypolicy") {
      screenMessage = ["Joye is an engaging mental wellbeing service for everyone, every day. Let’s make mental wellbeing into a habit, the mental fitness habit, the ‘10,000 steps’ of mental wellbeing!",
        "No one is listening. When you speak or write, we immediately anonymise your expression and no one can ever know what you spoke. Your data is independently managed by Joye, and your employer or anyone else will not be able to see your private information."];
    } else if (window.location.pathname === "/faq") {
      screenMessage = ["Joye is an engaging mental wellbeing service for everyone, every day. Let’s make mental wellbeing into a habit, the mental fitness habit, the ‘10,000 steps’ of mental wellbeing!",
        "No one is listening. When you speak or write, we immediately anonymise your expression and no one can ever know what you spoke. Your data is independently managed by Joye, and your employer or anyone else will not be able to see your private information."];
    } else if (window.location.pathname === "/termsofservice") {
      screenMessage = ["Joye is an engaging mental wellbeing service for everyone, every day. Let’s make mental wellbeing into a habit, the mental fitness habit, the ‘10,000 steps’ of mental wellbeing!",
        "No one is listening. When you speak or write, we immediately anonymise your expression and no one can ever know what you spoke. Your data is independently managed by Joye, and your employer or anyone else will not be able to see your private information."];
    } else if (window.location.pathname === "/deepBreath") {
      screenMessage = ["Excessive stress and anxiety affect our mind, body, and even decision making capability.",
        "Joye’s Stress Buster is a technique of 10 breaths with gradual lengthening of the exhale cycle. The visuals are inspired by the colors of the vedic energy chakras.",
        "We are sure you will find this easy and effective during those stressful moments - after a call or before that critical meeting.",
        "Get your energy streamlined for effective decision making!"];
    } else if (window.location.pathname === "/") {
      screenMessage = ["Speak your mind freely - you can speak, write or take our guided reflection. No one is listening, express yourself freely.",
        "Becoming aware of your emotions is the first step in managing your wellbeing. Make a conscious effort to check-in every day, and whenever you are in an emotional flux. Make this your mental fitness habit, your ‘10,000 steps’ of mental wellbeing!",
        "You can now also manage your daily Joye-level. Tap on the number to see your Joye-level analytics and Journal entries."];
    } else if (window.location.pathname === "/journal") {
      screenMessage = ["Now that you have some good advice, you need to plan how you will act on it. It is best to write it down.",
        "Journal it!",
        "In the future, you can retrieve this. It serves as a contextual journal."];
    }
    this.setState({ popup: !this.state.popup, screenTitle: null, screenMessage });
  }
  shieldMessage = ["No one is listening. When you speak or write, we immediately anonymise your expression and no one can ever know what you spoke. Your data is independently managed by Joye, and your employer or anyone else will not be able to see your private information",
    <a href={'/privacypolicy'}>Privacy policy</a>
  ];
  toggleShieldPopup() {
    this.setState({ shieldPopup: !this.state.shieldPopup });
  }
  togglePopupClose() {
    const screenTitle = null;
    const screenMessage = [""];
    this.setState({ popup: !this.state.popup, screenTitle, screenMessage })
  }

  modalToggle = () => {
    this.setState({ modalOpened: !this.state.modalOpened });
  };

  handleSubmit = () => {
    window.localStorage.clear();
    setTimeout(() => {
      this.setState({ modalOpened: !this.state.modalOpened });
      // this.props.history.push("/");
      window.location.reload();
    }, 500);
  };
  render() {
    const { withMenu, className, children, style, component, showShield, showInfoIcon, withCross, unload, showSignout} = this.props;
    !withMenu ? style.flexDirection = 'column' : style.flexDirection = 'column';
    !withMenu ? style.height = 'auto' : style.height = '100%';
    const containerClass = this.state.modalOpened ? "modal__container modal__container-active" : "modal__container";
    const coverClass = this.state.modalOpened ? "modal__cover modal__cover-active" : "modal__cover";
    return (
      <div className={`base-page-main login-form ${className || ``}`}>
        <div className="position-relative" style={{ height: '40px' }}>
          {this.state.popup && (<Popup text={this.state.screenTitle} screenMessage={this.state.screenMessage} closePopup={this.togglePopupClose.bind(this)} />)}
          {this.state.shieldPopup && (<Popup text={null} screenMessage={this.shieldMessage} closePopup={this.toggleShieldPopup.bind(this)} />)}

          {/* {withMenu && localStorage.getItem("userId") ? <BurgerMenu /> : ''} */}
          {withCross ? (
            <div className="close-icon">
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  // padding: "10px",
                  zIndex: 15
                }}
                type="button"
                onClick={() => microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/entity/6c75be83-05a8-4515-9c7b-b5f759b99b7f/")}
              >
                <img alt="Close" src={Close} style={{color: "grey"}} />
              </button>
            </div>
          ) : ''}
          
          {showShield ? (<div className="home-shield">
            <PageImage height="24px" width="21px" style={{ cursor: "pointer" }} isFromMain={true} logo={Shield} OnClick={() => this.toggleShieldPopup()} />
          </div>) : ''}
          

          {showInfoIcon ? (<div className="home-info"><PageImage height="22px" width="22px" style={{ cursor: "pointer" }} isFromMain={true} logo={InfoIcon} OnClick={e => this.togglePopupOpen()} /> </div>) : ''}
          {showSignout ? (
            <div className="home-signout">
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  // padding: "10px",
                  height:"32px",
                  width:"32px"
                }}
                type="button"
                onClick={this.modalToggle}
              >
                <img alt="Close" src={out} />
              </button>
            </div>
          ) : ''}
          {/* modal start */}
        {this.state.modalOpened &&
          <React.Fragment>
            <div className="modal__button" onClick={this.modalToggle}>

            </div>
            <div className={containerClass}>
              <div className="text-container center-items">
                <div
                  className="advertise-text bold"
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    textAlign: "center",
                    marginBottom: "20px",

                    color: "#1E00A3"
                  }}
                >
                  Wait
                </div>
                <div
                  className="advertise-text bold journal-title"
                  style={{
                  }}
                >
                  Do you really want to logout?
                </div>

                <div className="cancel-btn margin-top-10" >
                  <Button Loader={null} type="button" onClick={this.handleSubmit} marginBottom={"20px"} fontWeight={600} fontSize="16.67px">
                    Yes
                  </Button>
                </div>
                <div className="cancel-btn margin-top-10" >
                  <Button Loader={null} type="button" onClick={this.modalToggle} marginBottom={"20px"} fontWeight={600} fontSize="16.67px">
                    No
                  </Button>
                </div>
              </div>
            </div>
            <div className={coverClass} onClick={this.modalToggle}></div>
          </React.Fragment>
        }
        {/* modal end */}
        </div>
        <div className="layout-children">{children}</div>
      </div>
    );
  }
}

const styles = {
  basePage: {
    display: 'flex',
  }
};
