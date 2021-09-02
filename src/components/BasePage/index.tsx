import * as React from 'react';
import './basePage.scss';
import { BurgerMenu } from 'src/components/BurgerMenu';
import Shield from "../../resources/icons/Privacyshield.png";
import InfoIcon from "../../resources/icons/infoIcon.png";
import { PageImage } from "src/components";
import Popup from '../Popup';
import { AboutUs } from 'src/routes';

export class BasePage extends React.Component<{
  className?: string;
  withMenu?: boolean;
  style?: React.CSSProperties;
  component?: boolean;
  showShield?: boolean;
  showInfoIcon?: boolean;
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
  onClickHandle() {

  }
  togglePopupOpen() {
    let screenMessage = [""];
    if (window.location.pathname === "/aboutus") {
      screenMessage = ["About us Popup message Second message for about usSecond message for about usSecond message for about usSecond message for about usSecond message for about usSecond message for about usSecond message for about usSecond message for about usSecond message for about usSecond message for about us",
      ];
    } else if (window.location.pathname === "/faq") {
      screenMessage = ["FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message FAQ Popup message"];
    } else if (window.location.pathname === "/termsofservice") {
      screenMessage = ["Terms Of Service Popup message"];
    } else if (window.location.pathname === "/deepBreath") {
      screenMessage = ["Deep Breath Popup message"];
    } else if (window.location.pathname === "/") {
      screenMessage = ["Home Popup message"];
    } else if (window.location.pathname === "/journal") {
      screenMessage = ["Journal message"];
    }
    this.setState({ popup: !this.state.popup, screenTitle: null, screenMessage });
  }
  shieldMessage = ["This message is going to appear on the sheild popup"];
  toggleShieldPopup() {
    this.setState({ shieldPopup: !this.state.shieldPopup });
  }
  togglePopupClose() {
    const screenTitle = null;
    const screenMessage = [""];
    this.setState({ popup: !this.state.popup, screenTitle, screenMessage })
  }
  render() {
    const { withMenu, className, children, style, component, showShield, showInfoIcon } = this.props;
    !withMenu ? style.flexDirection = 'column' : style.flexDirection = 'column';
    !withMenu ? style.height = 'auto' : style.height = '100%';
    return (
      <div className={`base-page-main login-form ${className || ``}`}>
        <div className="position-relative" style={{ height: '40px' }}>
          {this.state.popup && (<Popup text={this.state.screenTitle} screenMessage={this.state.screenMessage} closePopup={this.togglePopupClose.bind(this)} />)}
          {this.state.shieldPopup && (<Popup text={null} screenMessage={this.shieldMessage} closePopup={this.toggleShieldPopup.bind(this)} />)}

          {withMenu && localStorage.getItem("userId") ? <BurgerMenu /> : ''}
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
