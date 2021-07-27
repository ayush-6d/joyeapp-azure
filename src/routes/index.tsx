import asyncComponent from "components/AsyncComponent";

export const Login = asyncComponent(() => import("src/containers/Login/index"), "Login");

export const NotFound = asyncComponent(() => import("src/containers/NotFound/index"), "NotFound");
export const Dashboard = asyncComponent(() => import("src/containers/Dashboards/Categories/index"), "Dashboard");

export const WelcomeScreen = asyncComponent(() => import("src/containers/WelcomeScreen/index"), "WelcomeScreen");
export const Configure = asyncComponent(() => import("src/containers/configure"), "Configure");
export const SignInStart = asyncComponent(() => import("src/containers/Login/sign-in-start"), "SignInStart");
export const SignInEnd = asyncComponent(() => import("src/containers/Login/sign-in-end"), "SignInEnd");
// export const NotFound = asyncComponent(() => import("src/containers/NotFound/index"), "NotFound");
// export const Dashboard = asyncComponent(() => import("src/containers/Dashboards/Categories/index"), "Dashboard");
// export const Journal = asyncComponent(() => import("src/containers/journal/index"), "Journal");
// export const WelcomeScreen = asyncComponent(() => import("src/containers/WelcomeScreen/index"), "WelcomeScreen");
// export const Configure = asyncComponent(() => import("src/containers/configure"), "Configure");
// export const NotFound = asyncComponent(() => import("src/containers/NotFound/index"), "NotFound");
// export const Dashboard = asyncComponent(() => import("src/containers/Dashboards/Categories/index"), "Dashboard");
export const Journal = asyncComponent(() => import("src/containers/journal/index"), "Journal");
export const DeepBreath = asyncComponent(() => import("src/containers/DeepBreath"), "DeepBreath");
export const Yesno = asyncComponent(() => import("src/containers/Yesno/index"), "Yesno");
export const Congratulation = asyncComponent(() => import("src/containers/congratulation/index"), "Congratulation");
// export const WelcomeScreen = asyncComponent(() => import("src/containers/WelcomeScreen/index"), "WelcomeScreen");
// export const Configure = asyncComponent(() => import("src/containers/configure"), "Configure");
export const PrivacyPolicy = asyncComponent(() => import("src/containers/PrivacyPolicy"), "PrivacyPolicy");
export const TermsofService = asyncComponent(() => import("src/containers/TermsofService"), "TermsofService");
export const FAQS = asyncComponent(() => import("src/containers/FAQS"), "FAQS");
export const AboutUs = asyncComponent(() => import("src/containers/AboutUs"), "AboutUs");
