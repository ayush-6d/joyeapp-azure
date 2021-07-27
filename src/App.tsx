import * as React from 'react';
import { RouterHelper, AuthHelper } from './helpers';
import * as msTeams from '@microsoft/teams-js';
import { Provider, teamsTheme } from '@fluentui/react-northstar'

export default class App extends React.Component<IAppProps, IAppState> {  
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      loggedIn: AuthHelper.IsUserLoggedIn()
    };

    msTeams.initialize();
    msTeams.registerOnThemeChangeHandler(this.updateTheme.bind(this));
    msTeams.getContext(context => { this.updateTheme(context.theme) });
  }
  
  render() {
   // debugger
    return (
      <Provider theme={teamsTheme}>
        { this.state.loggedIn ? <RouterHelper.AuthenticatedRoutes /> : <RouterHelper.UnauthenticatedRoutes />}
      </Provider>
    )
  }

  private updateTheme(themeString: string | undefined): void {
    this.setState({
    });
  }
}

interface IAppProps { }

interface IAppState {
  loggedIn: boolean;
} 