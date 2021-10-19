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


class authEnd extends React.Component {
  _isMounted = false;

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

  render() {
    return (
      <div>
          Hello
      </div>
    );
  }
}


export const authEndComp = authEnd
