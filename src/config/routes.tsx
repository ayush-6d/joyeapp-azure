import * as React from "react";
import { AboutUs } from "src/containers/AboutUs";
import { Dashboard } from "src/containers/Dashboards/Categories";
import { FAQS } from "src/containers/FAQS";
import { Journal } from "src/containers/journal";
import { Yesno } from "src/containers/Yesno";
import { DeepBreath } from "src/containers/DeepBreath";
import { Congratulation } from "src/containers/congratulation";
import { Login } from "src/containers/Login";
import SignInEnd from "src/containers/Login/sign-in-end";
import SignInStart from "src/containers/Login/sign-in-start";
import { PrivacyPolicy } from "src/containers/PrivacyPolicy";
import { TermsofService } from "src/containers/TermsofService";
import { RouteDefinition } from "src/Models/route-definition";
import { Configure } from "src/routes";
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
