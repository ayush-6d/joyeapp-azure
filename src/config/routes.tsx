import * as React from "react";
import { lazily } from "react-lazily";
import { AuthEndComp } from "src/containers/AuthEnd";
import { AuthStartComp } from "src/containers/AuthStart";
import ErrorPage from "src/containers/ErrorScreen";
import ExpiryWarning from "src/containers/ExpiryWarning";

import { RouteDefinition } from "src/Models/route-definition";

const { AboutUs } = lazily(() => import("src/containers/AboutUs"));
const { Dashboard } = lazily(
  () => import("src/containers/Dashboards/Categories")
);
const { FAQS } = lazily(() => import("src/containers/FAQS"));
const { Journal } = lazily(() => import("src/containers/journal"));
const { Yesno } = lazily(() => import("src/containers/Yesno"));
const { DeepBreath } = lazily(() => import("src/containers/DeepBreath"));
const { Congratulation } = lazily(
  () => import("src/containers/congratulation")
);
const { PrivacyPolicy } = lazily(() => import("src/containers/PrivacyPolicy"));
const { TermsofService } = lazily(
  () => import("src/containers/TermsofService")
);
const { NewDashboard } = lazily(() => import("src/containers/newDashboard"));
const { Configure } = lazily(() => import("src/routes"));
const { Login } = lazily(() => import("../containers/Login/index"));
const { Pie } = lazily(() => import("../containers/Pie/index"));
const { DailyChart } = lazily(() => import("../containers/DailyChart/index"));

const routes: RouteDefinition[] = [
  {
    route: "/",
    component: <Dashboard />,
    authenticated: true,
  },
  {
    route: "/configure",
    component: <Configure />,
    authenticated: false,
  },
  {
    route: "/",
    component: <Login />,
    authenticated: false,
  },
  {
    route: "/journal",
    component: <Journal />,
    authenticated: false,
  },
  {
    route: "/faq",
    component: <FAQS />,
    authenticated: false,
  },
  {
    route: "/termsofservice",
    component: <TermsofService />,
    authenticated: false,
  },
  {
    route: "/privacypolicy",
    component: <PrivacyPolicy />,
    authenticated: false,
  },
  {
    route: "/aboutus",
    component: <AboutUs />,
    authenticated: false,
  },
  {
    route: "/yesno",
    component: <Yesno />,
    authenticated: false,
  },
  {
    route: "/congratulation",
    component: <Congratulation />,
    authenticated: false,
  },
  {
    route: "/deepBreath",
    component: <DeepBreath />,
    authenticated: false,
  },
  {
    route: "/dashboard",
    component: <NewDashboard />,
    authenticated: true,
  },
  {
    route: "/pie-chart",
    component: <Pie />,
    authenticated: true,
  },
  {
    route: "/daily-chart",
    component: <DailyChart />,
    authenticated: true,
  },
  {
    route: "/auth/auth-start",
    component: <AuthStartComp />,
    authenticated: false,
  },
  {
    route: "/auth/auth-end",
    component: <AuthEndComp />,
    authenticated: false,
  },
  {
    route: "/error",
    component: <ErrorPage />,
    authenticated: false,
  },
  {
    route: "/expiry",
    component: <ExpiryWarning />,
    authenticated: false,
  },
];

export default routes;
