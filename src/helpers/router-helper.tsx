import * as React from 'react';
// import { Dashboard, Login, NotFound, WelcomeScreen, SignInStart, Journal, Configure, SignInEnd } from 'src/routes';
import 'src/styles/importer.scss';
import { routes as routeDefinitions} from 'src/config';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { RouteDefinition } from 'src/Models/route-definition';
import { Login } from 'src/containers/Login';


export default class RouterHelper {
  public static AuthenticatedRoutes(): JSX.Element {
    return RouterHelper.RenderRoutes(routeDefinitions);
  }

  public static UnauthenticatedRoutes(): JSX.Element {
    let copyOfRoutes = routeDefinitions;

    for (let route of copyOfRoutes) {
      if (route.authenticated) {
        route.component = <Login />
      }
    }
    return RouterHelper.RenderRoutes(copyOfRoutes);
    // return (
    //   <HashRouter >
    //     <Switch>
    //     <div>
    //       <Route exact path="/" component={Login} />
    //       <Route exact path="/auth/signinstart" component={SignInStart} />
    //       <Route exact path="/auth/signinend" component={SignInEnd} />
    //       </div>
    //     </Switch>
    //   </HashRouter >
    // )
  }

  private static RenderRoutes(routes: RouteDefinition[]): JSX.Element {
    const ErrorBoundary = ({ children }) => {
      if (process.env.NODE_ENV === 'production') {
        return <div>{children}</div>;
      } else {
        return <div className='joye' style={{ height: '100%' }} >{children}</div>;
      }
    };
    debugger
    return (
      <Router>
        <Switch>
          {routes.map(route =>
            <Route path={route.route} exact={route.route === '/'}>
              {route.component}
            </Route>
          )}
        </Switch>
      </Router>
    );
    // return (

    //   <ErrorBoundary>
    //     <Provider store={store}>
    //       <HashRouter >
    //         <Switch>
    //           <div>
    //           <Route exact path="/configure" component={Configure} />
    //           <Route exact path="/" component={Dashboard} />
    //           <Route exact path="/dashboard" component={Dashboard} />
    //           <Route exact path="/welcomescreen" component={WelcomeScreen} />
    //           <Route exact path="/journal" component={Journal} />
    //           <Route path="*" component={NotFound} />
    //           </div>
    //         </Switch>
    //       </HashRouter >
    //     </Provider>
    //   </ErrorBoundary>
    // );
  }
}