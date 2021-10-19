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


export const AuthEndComp = () => {
//   let _isMounted = false;

//   let containerEl = null;
//   let externalWindow = null;

//   let componentDidMount = () => {
//     firebaseInit;
//   }

//   let componentWillMount =() => {
//     _isMounted = false;
//   }

  let getQueryParameters = () => {
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

    return (
      <div>
          Hello
      </div>
    );
}


// export const authEndComp = authEnd
