import * as React from 'react';
import './basePage.scss';
import { BurgerMenu } from 'src/components/BurgerMenu';
import Shield from "../../resources/icons/Privacyshield.png";
import InfoIcon from "../../resources/icons/infoIcon.png";
import { PageImage } from "src/components";

export class BasePage extends React.Component<{
  className?: string;
  withMenu?: boolean;
  style?: React.CSSProperties;
  component?: boolean;
  showShield?: boolean;
  showInfoIcon?: boolean;
}> {
  static defaultProps = {
    style: {}
  };
  
  onClickHandle() {

  }

  render() {
    const { withMenu, className, children, style, component, showShield, showInfoIcon } = this.props;
    console.log('Component', component);
    !withMenu ? style.flexDirection = 'column' : style.flexDirection = 'column';
    !withMenu ? style.height = 'auto' : style.height = '100%';
    return (
      <div className={`base-page-main login-form ${className || ``}`}>
        <div className="position-relative">
          {withMenu? <BurgerMenu  /> : ''}
          {showShield? (<div className="home-shield">
            <PageImage height="24px" width="21px" style={{ cursor: "pointer" }} isFromMain={true} logo={Shield} OnClick={e => this.onClickHandle()} />
          </div>) : ''}

          {showInfoIcon? (<div className="home-info"><PageImage height="22px" width="22px" style={{ cursor: "pointer" }} isFromMain={true} logo={InfoIcon} OnClick={e => this.onClickHandle()} /> </div>): ''}
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
