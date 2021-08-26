import * as React from "react";
import Page from "../Main/page"
import { withRouter, RouteComponentProps } from "react-router";
export interface IMobileMainProps extends RouteComponentProps {
  route?: any;
  openModal?: any;
}

export interface IMobileMainState { }

export class MobileMainClass extends React.PureComponent<IMobileMainProps, IMobileMainState> {
  constructor(props: IMobileMainProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <>
      <Page route={this.props.route} openModal={this.props.openModal} history={this.props.history}></Page>
    </>
  }
}

export const MobileMain = withRouter(MobileMainClass);
