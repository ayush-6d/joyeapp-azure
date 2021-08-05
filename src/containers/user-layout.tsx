import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from 'src/services/localStorage.service';

export default class GuestLayout extends React.PureComponent {
  render() {
    // eslint-disable-next-line
    const { children } = this.props;
    const userInfo = getCurrentUser();
    return (
      <div>
        <header className="hero is-light">
          <div className="hero-head container">
            <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <span className="navbar-item">{userInfo.displayName || 'User name'}</span>
                <Link className="navbar-item is--brand" to="/dashboard">
                  Dashboard
                </Link>
                <Link to="/pie-chart" className="navbar-item is-pulled-right">
                  Pie-Chart
                </Link>
                <Link to="/daily-chart" className="navbar-item is-pulled-right">
                  Daily-Chart
                </Link>
                <Link to="/design" className="navbar-item is-pulled-right">
                  Design
                </Link>
                <Link to="/logout" className="navbar-item is-pulled-right">
                  Logout
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <br />
        <div className="wrapper container p-l-md p-r-md">

          {children}

        </div>
      </div>
    );
  }
}
