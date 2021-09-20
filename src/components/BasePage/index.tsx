import * as React from 'react';
import './basePage.scss';
import { BurgerMenu } from 'src/components/BurgerMenu';
import Shield from "../../resources/icons/Privacyshield.png";
import InfoIcon from "../../resources/icons/infoIcon.png";
import { PageImage } from "src/components";
import Popup from '../Popup';
import * as microsoftTeams from "@microsoft/teams-js";
import Close from "src/resources/icons/Close.png";
export class BasePage extends React.Component<{
  className?: string;
  withMenu?: boolean;
  style?: React.CSSProperties;
  component?: boolean;
  showShield?: boolean;
  showInfoIcon?: boolean;
  withCross?: boolean;
  unload?: any;
},
  {
    popup: boolean, screenMessage: string[], screenTitle: string, shieldPopup: boolean
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
      shieldPopup: false
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
  render() {
    const { withMenu, className, children, style, component, showShield, showInfoIcon, withCross, unload } = this.props;
    !withMenu ? style.flexDirection = 'column' : style.flexDirection = 'column';
    !withMenu ? style.height = 'auto' : style.height = '100%';
    return (
      <div className={`base-page-main login-form ${className || ``}`}>
        <div className="position-relative" style={{ height: '40px' }}>
          {this.state.popup && (<Popup text={this.state.screenTitle} screenMessage={this.state.screenMessage} closePopup={this.togglePopupClose.bind(this)} />)}
          {this.state.shieldPopup && (<Popup text={null} screenMessage={this.shieldMessage} closePopup={this.toggleShieldPopup.bind(this)} />)}

          {withMenu && localStorage.getItem("userId") ? <BurgerMenu /> : ''}
          {withCross ? (
            <div className="close-icon">
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  // padding: "10px",
                }}
                type="button"
                onClick={unload}
              >
                <img alt="Close" src={Close} />
              </button>
            </div>
          ) : ''}
          {showShield ? (<div className="home-shield">
            <PageImage height="24px" width="21px" style={{ cursor: "pointer" }} isFromMain={true} logo={Shield} OnClick={e => this.toggleShieldPopup()} />
          </div>) : ''}

          {showInfoIcon ? (<div className="home-info"><PageImage height="22px" width="22px" style={{ cursor: "pointer" }} isFromMain={true} logo={InfoIcon} OnClick={e => this.togglePopupOpen()} /> </div>) : ''}
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
