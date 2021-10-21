import { getDbUrl, setTid, setUserId } from 'src/services/localStorage.service';
// import * as constants from 'src/constants';
import * as msTeams from '@microsoft/teams-js';
// import AuthenticationContext from 'adal-angular';
import {  parseJwt} from '../utilities/generalUtils';
import axios from "axios";
import { API_ROOT } from "../config";
import { firebaseInit, database } from '../services/firebase';
import { setAuthId, setDbUrl, getAuthId, getUserId, getTId } from '../services/localStorage.service';
import toQueryString from 'to-querystring';
import * as uuid from 'uuid';
export default class AuthHelper {

  constructor(){

  }

  public IsUserLoggedIn(): boolean {
    if(localStorage.getItem("userId")){
      this.createTokenId(true)
      return true;
    }else{
      if(!localStorage.getItem("active")){}
      return false;
    }
  }

  public async userLogin() {
  console.log('userLogin');
  await msTeams.initialize();
   this.getAccessSSOToken()
    .then((clientSideToken:any) => {
      console.log('clientSideToken', clientSideToken);
      localStorage.setItem("accessToken",clientSideToken)
      return this.getServerSideToken(clientSideToken);
    }).catch(err=>{
      console.log("accessToken error", err)
      // alert("Someting went wrong, Error Code- 001");
    })
}
public async getServerSideToken(clientSideToken) {
  return new Promise((resolve, reject) => {
    msTeams.getContext(async (context) => {
      try {
        const ssoToken = await axios.post("https://joye-backend-service-dot-joye-768f7.uc.r.appspot.com/auth/token", {
          token: clientSideToken,
          tid: context.tid
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        if (ssoToken.data.error && ssoToken.data.error == 'invalid_grant') {
          // alert("Access denied, Please ask your organization admin to provide access or if you're the organization admin please visit this url to provide consent- https://login.microsoftonline.com/common/adminconsent?client_id=b083d035-a374-45ea-911c-5ddf8569b0f5")
          let queryParams = {
              client_id: "b083d035-a374-45ea-911c-5ddf8569b0f5",
              response_type: "id_token token",
              response_mode: "fragment",
              scope: "https://graph.microsoft.com/Calendars.ReadWrite.Shared Contacts.ReadWrite.Shared offline_access User.Read email openid profile offline_access",
              redirect_uri: window.location.origin + "/auth/auth-end",
              nonce: uuid.v4(),
              state: uuid.v4(),
              login_hint: context.loginHint,
          };
          // Go to the AzureAD authorization endpoint (tenant-specific endpoint, not "common")
          // For guest users, we want an access token for the tenant we are currently in, not the home tenant of the guest. 
          let authorizeEndpoint = `https://login.microsoftonline.com/${context.tid}/oauth2/v2.0/authorize?${toQueryString(queryParams)}`;
          console.log(authorizeEndpoint)
          // let aTag:any = document.getElementById('permission-url');
          // aTag.href = authorizeEndpoint;
          // aTag.style.display  = 'inline';
          // aTag.style.color  = '#b62e2e';
          let win = window.open(authorizeEndpoint, '_blank', `toolbar=no,
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    scrollbars=yes,
                                    resizable=no,
                                    width=500,
                                    height=600`);
          // window.top.location.href = authorizeEndpoint;
          // let iframe:any = document.getElementById('popup-iframe');
          // iframe.src = authorizeEndpoint;
          // iframe.style.display  = 'block';
          // let timer = setInterval(() => {
          //   if(win.closed){
          //     clearInterval(timer);
          //     alert('closed');
          //     // localStorage.setItem("SSOtoken", hashParams["access_token"])
          //     // this.getUserProfile(localStorage.getItem("SSOtoken"), context.tid)
          //   }
          //   document.write(win.localStorage.getItem("SSOtoken"))
          // },2000)
          // localStorage.setItem("SSOtoken", data.data["accessToken"])
          this.getUserProfile(localStorage.getItem("SSOtoken"), context.tid)
        } else if (ssoToken.data.error){
          alert("Something went wrong, Error Code- 002");
        }

        if (ssoToken.data.sso) {
          // alert("got ssoToken");
          localStorage.setItem("SSOtoken",ssoToken.data.sso)
          this.getUserProfile(ssoToken.data.sso, context.tid)
        }

      } catch (error) {
        // console.log("sso token error");
        console.log(JSON.stringify(error));
        if (error.indexOf('invalid_grant') > -1) {
          alert("Access denied, Please ask your organization admin to provide access or if you're the organization admin please visit this url to provide consent- https://login.microsoftonline.com/common/adminconsent?client_id=b083d035-a374-45ea-911c-5ddf8569b0f5")
        } else {
          alert("Something went wrong, Error Code- 002");
        }
      }
    })
  });

}
private async getAccessSSOToken() {
  console.log('getAccessSSOToken');
  return new Promise((resolve, reject) => {
    msTeams.authentication.getAuthToken({
      successCallback: (result) => {
        localStorage.setItem('error', '');
        console.log('result', result);
        resolve(result);
      },
      failureCallback: function(error) {
        console.log('error', error);
        if (error.indexOf("resourceRequiresConsent") > -1 || error.indexOf("CancelledByUser") > -1){
          alert("Joye requires basic profile permission to continue. Check Privacy Policy for more details")
        } else {
          alert(`Something went wrong, Error Code- 003 - ${error}`);
        }
        localStorage.setItem('error', 'Something went wrong, please try again');
        window.location.replace(window.location.origin + '/');
        reject("Error getting token: " + error);
      }
    });
  });

}

private getUserProfile(token, tid): Promise < string > {
  var that = this;
  return new Promise < string > ((resolve, reject) => {
    var headers = new Headers();
    var bearer = "Bearer " + token;
    headers.append("Authorization", bearer);
    headers.append("Content-type", "application/json");
    var options = {
      method: "GET",
      headers: headers
    };
    var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

    fetch(graphEndpoint, options)
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        if (data.displayName) {
           fetch("https://graph.microsoft.com/v1.0/me/mailboxSettings", options)
            .then(function(response) {
              return response.json();
            }).then(function(emailData) {
                delete data["@odata.context"];
                delete data["@odata.id"]; 
                if(emailData["@odata.context"]){
                  delete emailData["@odata.context"]; 
                  localStorage.setItem("userProfile", JSON.stringify({...data,...emailData}))
                }else{
                  localStorage.setItem("userProfile", JSON.stringify(data))
                }
                
                var decoded = parseJwt(token);
                if (decoded.tid && data.id) {
                  // alert("user id"+ data.id);
                  setUserId(data.id)
                  setTid(tid ? tid : decoded.tid);
                  that.createTokenId()
                }
            })
         
          // alert (JSON.stringify(decoded));
          // window.location.replace(window.location.origin + '/');

        }

      }).catch(err => {
        // console.log("network error getUserProfile");
        alert("Someting went wrong, Error Code- 004");
        console.log(JSON.stringify(err));
      });
  })
}

private async createTokenId(loginCheck:boolean=false) {
  let userId = getUserId();
  let tid = getTId();
  if(tid && userId){
    try {
    const createTokenId = await axios.post(`${API_ROOT}/createTokenId`, {
      organisationId: "-MHUPaNmo_p85_DR3ABC",
      subOrganisationId: tid,
      empId: userId,
      // uid: `-MHUPaNmo_p85_DR3ABC||${userId}||b172c03f-be43-42e9-b17a-34fe50574266`
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    if (createTokenId && createTokenId.data.token) {
      firebaseInit
        .auth()
        .signInWithCustomToken(createTokenId.data.token)
        .then(async userCredential => {
          // Signed in
          this.setOrgData(userCredential.user);
          try {
            var d2 = new Date();
            const organisation = await database.ref(`master/organisation/-MHUPaNmo_p85_DR3ABC/suborganisation/${tid}`).once("value");        
            const organisationDetails= organisation.val();
            if(organisationDetails && organisationDetails.paid_subscription){
              this.success(loginCheck,0);
            } else {
              console.log('organisationDetails.pilot', organisationDetails.pilot);
                if(organisationDetails.pilot){
                  var datedifferece =await this.numDaysBetween(organisationDetails.pilot, d2);
                  console.log('datedifferece', datedifferece);
                  if(datedifferece<=30){
                      this.success(loginCheck,datedifferece);
                  }else{
                    this.fail();
                  }
                } else {
                  console.log('createTokenId', createTokenId);
                    const user = await firebaseInit.database(getDbUrl()).ref(`users/${createTokenId.data.uid}/info`).once("value");
                    const userDetails= user.val();
                    console.log('userDetails', userDetails);
                    if(userDetails.createdAt){
                      var datedifferece = await this.numDaysBetween(userDetails.createdAt, d2);
                      console.log('datedifferece', datedifferece);
                      if(datedifferece<=30){
                        this.success(loginCheck,datedifferece);
                      }else{
                        this.fail();
                      }
                    } else {
                      await firebaseInit.database(getDbUrl()).ref(`users/${createTokenId.data.uid}/info`).set({
                        ...userDetails,
                        createdAt: new Date().getTime(),
                      })
                      this.success(loginCheck,0);
                    }
                }   
            }
            let details = await firebaseInit.database(getDbUrl()).ref(`users/${createTokenId.data.uid}/details`).once("value");
            details = details.val();
            const newDetails = JSON.parse(localStorage.getItem("userProfile"));
            if (details) {
              await firebaseInit.database(getDbUrl()).ref(`users/${createTokenId.data.uid}/details`).update({
                ...details,
                ...newDetails
              })
            } else {
              await firebaseInit.database(getDbUrl()).ref(`users/${createTokenId.data.uid}/details`).set({
                ...newDetails
              })
            }
          } catch (e) {
            console.log("network error at firebaseInit.database");
            console.log(e);
          }
        })
        .catch(e => {
          console.log(" error at signInWithCustomToken");
          console.log(JSON.stringify(e));
          alert("Someting went wrong, Error Code- 005");
        });
    }
  } catch (err) {
    console.log("network error at createTokenId");
    console.log(JSON.stringify(err));
    alert("Someting went wrong, Error Code- 006");
  };
  }
}
  private async numDaysBetween(d1, d2) { 
  var today = d2.getTime();
  return Math.round(Math.abs(d1 - today)/(24 * 60 * 60 * 1000));
};

private async success(loginCheck,datedifferece) { 
 localStorage.removeItem("active");
 console.log('loginCheck', loginCheck);
 if(!loginCheck)
  window.location.replace(window.location.origin + '/');
  else{
    if(datedifferece && 30-datedifferece<7){
      alert("You have "+Math.round(30-datedifferece)+" days left")
    }
  }
};

  private async fail() { 
    alert("Your trial period is over")
    localStorage.clear()
    localStorage.setItem("active","false");
    window.location.replace(window.location.origin + '/');
  };

  public async setOrgData(user: any){
    setAuthId(user.uid)
    setDbUrl('https://teams-768f7-e6e45.firebaseio.com');
  }
}