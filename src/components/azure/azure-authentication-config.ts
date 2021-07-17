import { Configuration, LogLevel } from "@azure/msal-browser";

const AzureActiveDirectoryAppClientId: any =
  process.env.REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID || 'b172c03f-be43-42e9-b17a-34fe50574266';

  console.log('sadas',AzureActiveDirectoryAppClientId)
export const MSAL_CONFIG: Configuration = {
  auth: {
    clientId: AzureActiveDirectoryAppClientId,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};