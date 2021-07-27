
import * as uuid from 'uuid';
import axios from 'axios';

// constants
// let constants = require('../../lib/constants');

// others
// let common = require('./common');

// import User from '../models/User';
// var officeRouter = express.Router();
// var employeeDetailController = new EmployeeDetailController();
let token = `eyJ0eXAiOiJKV1QiLCJub25jZSI6ImVGWXVmcW1xc1pIaFNlN1c5RFh1Q3I1akpaRUhrYkhMdVE5VjRnaWxNN1EiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jOTNhZWIwOS1lMTc1LTQ5YjItODk4Mi05ZjAwZjZmOGMwNzMvIiwiaWF0IjoxNjI1OTIwMjQxLCJuYmYiOjE2MjU5MjAyNDEsImV4cCI6MTYyNTkyNDE0MSwiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iLCJ1cm46bWljcm9zb2Z0OnJlcTEiLCJ1cm46bWljcm9zb2Z0OnJlcTIiLCJ1cm46bWljcm9zb2Z0OnJlcTMiLCJjMSIsImMyIiwiYzMiLCJjNCIsImM1IiwiYzYiLCJjNyIsImM4IiwiYzkiLCJjMTAiLCJjMTEiLCJjMTIiLCJjMTMiLCJjMTQiLCJjMTUiLCJjMTYiLCJjMTciLCJjMTgiLCJjMTkiLCJjMjAiLCJjMjEiLCJjMjIiLCJjMjMiLCJjMjQiLCJjMjUiXSwiYWlvIjoiQVVRQXUvOFRBQUFBNEs3MVU4NTliNDUvZWtIdE5ZaDBhczFFZzJpNjUzU2w0c29EUTBwQTg4WDEwV1ZwdzVPRjQrTWV2cW9FVEgrWUZEYk9ha1c5dzNzbk9MVGhudmc3b3c9PSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiSm95ZSIsImFwcGlkIjoiYjA4M2QwMzUtYTM3NC00NWVhLTkxMWMtNWRkZjg1NjliMGY1IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJEZXZlbG9wZXIiLCJnaXZlbl9uYW1lIjoiSm95ZSIsImhhc3dpZHMiOiJ0cnVlIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiNTkuOTYuODYuMTQ1IiwibmFtZSI6IkRldmVsb3BlcjEiLCJvaWQiOiI0MmYxOWIzNi1hYTczLTRmMjYtYmFiYy0xYmY3YzZjY2ZkNGEiLCJwbGF0ZiI6IjUiLCJwdWlkIjoiMTAwMzIwMDE0NzY4NDVEMyIsInJoIjoiMC5BWEVBQ2VzNnlYWGhza21KZ3A4QTl2akFjelhRZzdCMG8tcEZrUnhkMzRWcHNQVnhBRTguIiwic2NwIjoiTm90aWZpY2F0aW9ucy5SZWFkV3JpdGUuQ3JlYXRlZEJ5QXBwIG9mZmxpbmVfYWNjZXNzIG9wZW5pZCBwcm9maWxlIFRlYW1zQWN0aXZpdHkuUmVhZCBUZWFtc0FjdGl2aXR5LlNlbmQgVXNlci5SZWFkIFVzZXIuUmVhZFdyaXRlIFVzZXJOb3RpZmljYXRpb24uUmVhZFdyaXRlLkNyZWF0ZWRCeUFwcCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6ImctRUhoX08xdzJTWTB4cTdLMi1MRDNaUW1lcHpmeS1WNkNXVmlOLXNHRWsiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiQVMiLCJ0aWQiOiJjOTNhZWIwOS1lMTc1LTQ5YjItODk4Mi05ZjAwZjZmOGMwNzMiLCJ1bmlxdWVfbmFtZSI6ImRldmVsb3BlcjFAam95ZS5haSIsInVwbiI6ImRldmVsb3BlcjFAam95ZS5haSIsInV0aSI6ImlBR0ZfWkJ0S2tHUkhzTFBKdnNrQWciLCJ2ZXIiOiIxLjAiLCJ4bXNfdGNkdCI6MTYxNDA2NzkwMX0.LlqgoEbBWyJ1kCJQjMzAyE2wUEm4TBSA2cWAtQ5VBsrCT5r0qRqJNjm74NDmpB70zu5QqMJBBjspU46Rv6qsdMjX-42KH3DMHNkzLIKeIbECKnAmZNAkHZPYQHlE_i9CFTkykIbaAHBY6dQ2QzZDDLFT5Q6_8K9OL-RVEtJXLMxlkGzSuY93fgxZiausFbemAmQztlqw0AAaeUBuyJzF1UPu8ACUQHnD090X7P1P9vzlvcB9sqEq0WfpOvjpTiIjCGR-wMMFPrjcYlxac3xqb0xNQVw2hLOf86YM_KcCvkAgKZz57yD7PKA200d7e8WXF9evEQ6UehzhF_4INEZHgQ`
let config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};
let authority = 'https://login.microsoftonline.com/common';
let authorizeEndpoint = '/oauth2/v2.0/authorize';
let tokenEndpoint = '/oauth2/v2.0/token';
let scope = 'Calendars.ReadWrite.Shared Contacts.ReadWrite.Shared offline_access';

// export const getTokenFromRefreshToken = (refreshToken) => {
//     let OAuth2 = OAuth.OAuth2;
//     let oauth2 = new OAuth2(
//         process.env.OFFICE_CLIENT_ID,
//         process.env.OFFICE_CLIENT_SECRET,
//         authority,
//         authorizeEndpoint,
//         tokenEndpoint
//     );

//     oauth2.getOAuthAccessToken(
//         refreshToken, {
//             grant_type: 'refresh_token',
//             redirect_uri: process.env.APP_URL,
//             response_mode: 'form_post',
//             nonce: uuid.v4()
//         },
//         function (err, accessToken, refreshToken) {
//             callback(err, accessToken, refreshToken);
//         }
//     );
// }

export const hasAccessTokenExpired = (e) => {
    let expired = false;
    if (e.status === 401 && e.statusText === 'Unauthorized') {
        expired = true;
    }
    return expired;
}

export const getAuthUrl = () => {
    return authority + authorizeEndpoint +
        '?client_id=' + "b172c03f-be43-42e9-b17a-34fe50574266" +
        '&response_type=code' +
        '&scope=' + scope +
        '&redirect_uri=' + 'http://localhost:8080' +
        '&response_mode=query' +
        '&nonce=' + uuid.v4();
}

export const getEvents =(startDate, endDate, accessToken) => {
    // let { startDate, endDate } = req.params;
    let url = 'https://graph.microsoft.com/v1.0/me/calendarView?$top=10000&startDateTime=' + startDate + '&endDateTime=' + endDate;

    axios.get(url, config).then(function (response) {
        console.log(response.data.value);
        sendNotification()
    }).catch(function (err) {
      //  debugger
        if (hasAccessTokenExpired(err.response)) {
            // let refreshToken = req.cookies.OFFICE_REFRESH_TOKEN;
            // getTokenFromRefreshToken(refreshToken, function (error, newAccessToken, newRefreshToken) {
            //     if (!error) {
            //         res.cookie(constants.COOKIES.OFFICE_ACCESS_TOKEN, newAccessToken);
            //         res.cookie(constants.COOKIES.OFFICE_REFRESH_TOKEN, newRefreshToken);
            //         config = {
            //             headers: {
            //                 Authorization: 'Bearer ' + newAccessToken
            //             }
            //         };

            //         axios.get(url, config).then(function (response) {
            //             callback(null, response.data.value);
            //         }).catch(function (e) {
            //             console.log(e);
            //             callback(e);
            //         });
            //     } else {
            //         console.log(error);
            //         callback({
            //             statusCode: constants.STATUS_CODES.INVALID_TOKEN
            //         });
            //     }
            // });
        } else {
            console.log(err);
            // callback(err);
        }
    });
}
// 'https://graph.microsoft.com/v1.0/user/b172c03f-be43-42e9-b17a-34fe50574266/joyeapp/sendActivityNotification';
const sendNotification = () => {
    // f89bf4dc-4e04-4d12-bd27-b688258319ec
    let url = `https://graph.microsoft.com/v1.0/users/b172c03f-be43-42e9-b17a-34fe50574266/teamwork/sendActivityNotification`
    // 'https://graph.microsoft.com/v1.0/user/b172c03f-be43-42e9-b17a-34fe50574266/joyeapp/sendActivityNotification'
    // `https://graph.microsoft.com/v1.0/teams/b172c03f-be43-42e9-b17a-34fe50574266/sendActivityNotification`
    let payload = {

        "topic": {
    
            "source": "text",
    
            "value": "App Tab Notification",
    
            "webUrl": "https://teams.microsoft.com/l/entity/6c75be83-05a8-4515-9c7b-b5f759b99b7f/joyeapp"
    
        },
    
        "activityType": "newNotification",
    
        "previewText": {
    
            "content": "New notification",
    
            "contentType": "text"
    
        },
    
        "recipient": {
    
            "@odata.type": "microsoft.graph.aadUserNotificationRecipient",
    
            "userId": "6c75be83-05a8-4515-9c7b-b5f759b99b7f"
    
        },
    
        "templateParameters": [
    
            {
    
                "name": "notification",
    
                "value": "New Candidate!"
    
            }
    
        ]
    
    }
    axios.post(url, payload, config).then(function (response) {
        console.log(response.data.value);
        sendNotification()
    }).catch(function (err) {})

}

// officeRouter.get('/authUrl', function (req, res) {
//     res.json(getAuthUrl());
// });

// router.get('/login/:code', common.ensureAuthenticated, function (req, res) {
//     if (typeof req.params.code !== 'undefined') {
//         getTokenFromCode(req.params.code, function (err, accessToken, refreshToken) {
//             if (!err) {
//                 res.cookie(constants.COOKIES.OFFICE_ACCESS_TOKEN, accessToken);
//                 res.cookie(constants.COOKIES.OFFICE_REFRESH_TOKEN, refreshToken);
//                 User.findOneAndUpdate({ firstName: 'Jasper' }, { $set: { refreshToken } }, { new: true }, () => {
//                     res.json();
//                 });
//             } else {
//                 console.log(err);
//                 res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).send(constants.RESPONSE_MESSAGES.ERROR);
//             }
//         });
//     } else {
//         console.log('Invalid Office Login');
//         res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).send(constants.RESPONSE_MESSAGES.ERROR);
//     }
// });

// router.get('/contacts/:query', common.ensureAuthenticated, function (req, res) {
//     let query = req.params.query;
//     query = query.replace('\'', '\'\'');
//     query = encodeURIComponent(query);
//     let accessToken = req.cookies.OFFICE_ACCESS_TOKEN;
//     if (accessToken) {
//         getContacts(accessToken, query, req, res, function (err, contacts) {
//             if (!err) {
//                 res.json(contacts);
//             } else if (err.statusCode) {
//                 res.status(constants.STATUS_CODES.INVALID_TOKEN).send(constants.RESPONSE_MESSAGES.INVALID_TOKEN);
//             } else {
//                 res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).send(constants.RESPONSE_MESSAGES.ERROR);
//             }
//         });
//     } else {
//         console.log('No access token');
//         res.status(constants.STATUS_CODES.NOT_FOUND).send(constants.RESPONSE_MESSAGES.OFFICE_365.TOKEN_NOT_FOUND);
//     }
// });

// router.get('/contractors/:query', common.ensureAuthenticated, function (req, res) {
//     let accessToken = req.cookies.OFFICE_ACCESS_TOKEN;
//     let query = req.params.query;
//     query = query.replace('\'', '\'\'');
//     query = encodeURIComponent(query);
//     if (accessToken) {
//         getContractors(accessToken, query, req, res, function (err, contacts) {
//             if (!err) {
//                 res.json(contacts);
//             } else if (err.statusCode) {
//                 res.status(constants.STATUS_CODES.INVALID_TOKEN).send(constants.RESPONSE_MESSAGES.INVALID_TOKEN);
//             } else {
//                 res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).send(constants.RESPONSE_MESSAGES.ERROR);
//             }
//         });
//     } else {
//         console.log('No access token');
//         res.status(constants.STATUS_CODES.NOT_FOUND).send(constants.RESPONSE_MESSAGES.OFFICE_365.TOKEN_NOT_FOUND);
//     }
// });

// const getEventDetails = ({startDate, endDate}) {
//     let accessToken = req.cookies.OFFICE_ACCESS_TOKEN;
//     if (accessToken) {
//         let payload = {
//             accessToken,
//             req,
//             res
//         };
//         getEvents(payload, function (err, events) {
//             if (!err) {
//                 res.json(events);
//             } else if (err.statusCode) {
//                 res.status(constants.STATUS_CODES.INVALID_TOKEN).send(constants.RESPONSE_MESSAGES.INVALID_TOKEN);
//             } else {
//                 res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).send(constants.RESPONSE_MESSAGES.ERROR);
//             }
//         });
//     } else {
//         console.log('No access token');
//         res.status(constants.STATUS_CODES.NOT_FOUND).send(constants.RESPONSE_MESSAGES.OFFICE_365.TOKEN_NOT_FOUND);
//     }
// });

// // get access token for customer user using refresh token
// router.get('/access-token-for-customer', async (req, res) => {
//     try {
//         const { refreshToken } = await User.findOne({ firstName: 'Jasper' }).select('refreshToken').exec().catch(e => { throw e; });
//         getTokenFromRefreshToken(refreshToken, function (err, accessToken, newRefreshToken) {
//             if (err) {
//                 res.status(constants.STATUS_CODES.INVALID_TOKEN).json({});
//                 console.log('Error in access-token-for-customer API : ', err);
//                 return;
//             }
//             res.cookie(constants.COOKIES.OFFICE_ACCESS_TOKEN, accessToken);
//             res.cookie(constants.COOKIES.OFFICE_REFRESH_TOKEN, newRefreshToken);
//             res.status(200).json('Success');
//         });
//     } catch (error) {
//         res.status(constants.STATUS_CODES.NOT_FOUND).send(constants.RESPONSE_MESSAGES.OFFICE_365.TOKEN_NOT_FOUND);
//     }
// });

// module.exports = router;
