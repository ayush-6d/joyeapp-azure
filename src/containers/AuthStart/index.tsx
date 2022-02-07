import * as React from "react";
import * as msTeams from '@microsoft/teams-js';
import * as uuid from 'uuid';
import toQueryString from 'to-querystring';

class AuthStartComp extends React.PureComponent {

    componentDidMount(){
        msTeams.initialize();
        msTeams.getContext(async (context) => {
            let queryParams = {
                client_id: "27a087a7-f40f-4b6f-8eea-c40b56e58882",
                response_type: "id_token token",
                response_mode: "fragment",
                prompt: "consent",
                scope: "https://graph.microsoft.com/Calendars.Read offline_access User.Read email openid profile MailboxSettings.Read TeamsActivity.Send",
                redirect_uri: window.location.origin + "/auth/auth-end",
                nonce: uuid.v4(),
                state: uuid.v4(),
                login_hint: context.loginHint,
              };
              // Go to the AzureAD authorization endpoint (tenant-specific endpoint, not "common")
              // For guest users, we want an access token for the tenant we are currently in, not the home tenant of the guest. 
              let authorizeEndpoint = `https://login.microsoftonline.com/${context.tid}/oauth2/v2.0/authorize?${toQueryString(queryParams)}`;
              window.location.assign(authorizeEndpoint);    
            //   window.open(
            //     authorizeEndpoint, '_blank', `toolbar=no,
            //     location=no,
            //     status=no,
            //     menubar=no,
            //     scrollbars=yes,
            //     resizable=no,
            //     width=500,
            //     height=600`
            //   );
        })
    }

    render () {
        return <p>Loading...</p>        
    }
}

export { AuthStartComp };