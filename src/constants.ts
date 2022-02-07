export const TeamsThemes = {
  contrast: "contrast",
  dark: "dark",
  default: "default",
};

export const Auth = {
  appId: process.env.REACT_APP_APP_ID || "b21b4641-0dee-43e8-b37e-a4ba3f5637f8",
  cacheLocation: "localStorage",
  signInStartPage: "auth/signinstart",
  signInEndPage: "auth/signinend",
  authenticatedDomains: {
    "https://graph.microsoft.com": "https://graph.microsoft.com",
  },
};
