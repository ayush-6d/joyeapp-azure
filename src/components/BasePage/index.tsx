import * as React from 'react';
import './basePage.scss';
import { BurgerMenu } from 'src/components/BurgerMenu';

export class BasePage extends React.Component<{
  className?: string;
  withMenu?: boolean;
  style?: React.CSSProperties;
}> {
  static defaultProps = {
    style: {}
  };

  render() {
    const { withMenu, className, children, style } = this.props;
    !withMenu ? style.flexDirection = 'column' : style.flexDirection = 'column';
    !withMenu ? style.height = 'auto' : style.height = '100%';
    return (
      <div
        className={`base-page-main login-form ${className || ``}`}
      >
        {withMenu ? <BurgerMenu /> : ''}
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
