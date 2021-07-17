export const TeamsThemes = {
    contrast: "contrast",
    dark: "dark",
    default: "default"
};

export const Auth = {
    appId: process.env.REACT_APP_APP_ID || 'b083d035-a374-45ea-911c-5ddf8569b0f5',
    cacheLocation: 'localStorage',
    signInStartPage: 'auth/signinstart',
    signInEndPage: 'auth/signinend',
    authenticatedDomains: {
        "https://graph.microsoft.com": "https://graph.microsoft.com"
    }
};