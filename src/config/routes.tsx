import * as React from "react";
import { lazily } from 'react-lazily';

import SignInEnd from "src/containers/Login/sign-in-end";
import SignInStart from "src/containers/Login/sign-in-start";
import { RouteDefinition } from "src/Models/route-definition";

const { AboutUs } = lazily(() => import("src/containers/AboutUs"));
const { Dashboard } = lazily(() => import("src/containers/Dashboards/Categories"));
const { FAQS } = lazily(() => import("src/containers/FAQS"));
const { Journal } = lazily(() => import("src/containers/journal"));
const { Yesno } = lazily(() => import("src/containers/Yesno"));
const { DeepBreath } = lazily(() => import("src/containers/DeepBreath"));
const { Congratulation } = lazily(() => import("src/containers/congratulation"));
const { PrivacyPolicy } = lazily(() => import("src/containers/PrivacyPolicy"));
const { TermsofService } = lazily(() => import("src/containers/TermsofService"));
const { Configure } = lazily(() => import("src/routes"));
const { Login } = lazily(() => import("../containers/Login/index"));
// import { Home, Configure } from '../pages';
// import { Login, SignInStart, SignInEnd } from '../pages/auth';

const routes: RouteDefinition[] = [
  {
    route: "/",
    component: <Dashboard />,
    authenticated: true
  },
  {
    route: "/configure",
    component: <Configure />,
    authenticated: false
  },
  {
    route: "/",
    component: <Login />,
    authenticated: false
  },
  {
    route: "/auth/signinstart",
    component: <SignInStart />,
    authenticated: false
  },
  {
    route: "/auth/signinend",
    component: <SignInEnd />,
    authenticated: false
  },
  {
    route: "/journal",
    component: <Journal />,
    authenticated: false
  },
  {
    route: "/faq",
    component: <FAQS />,
    authenticated: false
  },
  {
    route: "/termsofservice",
    component: <TermsofService />,
    authenticated: false
  },
  {
    route: "/privacypolicy",
    component: <PrivacyPolicy />,
    authenticated: false
  },
  {
    route: "/aboutus",
    component: <AboutUs />,
    authenticated: false
  },
  {
    route: "/yesno",
    component: <Yesno />,
    authenticated: false
  },
  {
    route: "/congratulation",
    component: <Congratulation />,
    authenticated: false
  },
  {
    route: "/deepBreath",
    component: <DeepBreath />,
    authenticated: false
  }
];
// export const Journal = asyncComponent(() => import("src/containers/journal/index"), "Journal");
// export const PrivacyPolicy = asyncComponent(() => import("src/containers/PrivacyPolicy"), "PrivacyPolicy");
// export const TermsofService = asyncComponent(() => import("src/containers/TermsofService"), "TermsofService");
// export const FAQS = asyncComponent(() => import("src/containers/FAQS"), "FAQS");
// export const AboutUs = asyncComponent(() => import("src/containers/AboutUs"), "AboutUs");
export default routes;
