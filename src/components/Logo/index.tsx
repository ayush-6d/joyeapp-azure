import * as React from "react";
const logo = require("../../resources/icons/LOGO_Square white_border.png");

export interface ILogoProps {
  height: string;
  width: string;
  marginTop?: string;
}

export class Logo extends React.PureComponent<ILogoProps, {}> {
  constructor(props: ILogoProps) {
    super(props);
  }

  render() {
    const { height, width, marginTop } = this.props;
    return (
      <div className="logo-container" style={{ textAlign: "center", marginTop, marginBottom: "20px" }}>
        <img src={logo} height={height} width={width} />
      </div>
    );
  }
}
