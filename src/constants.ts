export const TeamsThemes = {
  contrast: "contrast",
  dark: "dark",
  default: "default",
};

export const Auth = {
  appId: process.env.REACT_APP_APP_ID || "27a087a7-f40f-4b6f-8eea-c40b56e58882",
  cacheLocation: "localStorage",
  signInStartPage: "auth/signinstart",
  signInEndPage: "auth/signinend",
  authenticatedDomains: {
    "https://graph.microsoft.com": "https://graph.microsoft.com",
  },
};
