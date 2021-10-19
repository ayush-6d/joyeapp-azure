import * as React from 'react';


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
    if(location.href.indexOf('#access_token')){
        location.href = location.href.replace('#access_token', '?access_token') 
    }

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
  let x:any = getQueryParameters();

    return (
      <div>
          Hello {x.xyz}
      </div>
    );
}


// export const authEndComp = authEnd
