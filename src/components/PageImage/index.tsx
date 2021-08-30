import * as React from "react";
import ProcessComplete from "../../resources/icons/ProcessCompleted.png";

export interface IPageImageProps {
  height: string;
  width: string;
  marginTop?: string;
  marginLeft?: string;
  style?: any;
  marginBottom?: string;
  logo?: string;
  setCounter?: any;
  OnClick?: any;
  isFromMain?: boolean;
}

export class PageImage extends React.PureComponent<IPageImageProps, {}> {
  constructor(props: IPageImageProps) {
    super(props);
  }

  render() {
    const { height, width, logo, marginTop, marginLeft, style, setCounter, marginBottom, OnClick, isFromMain } = this.props;
    let styles = { ...style, ...{  } };
    return (
      <div className="logo-container" onClick={setCounter} style={isFromMain ? {} : styles}>
        <div className="boom-container" style={{ marginTop: marginTop, marginLeft: marginLeft, alignSelf: "center", zIndex:100, cursor:'pointer' }} onClick={OnClick}>
          <img src={logo} height={height} width={width}  />
        </div>
        {/* <img src={ProcessComplete} height={'190px'} width={'200px'} /> */}
      </div>
    );
  }
}
