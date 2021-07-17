import * as React from "react";
import "./CircularCounter.scss";

export interface ICircleProps {
  OnClick?: any;
  style?: any;
  imgStyle?: any;
  img?: any;
  showImg?: boolean;
  className?: string;
}

export class Circle extends React.PureComponent<ICircleProps, {}> {
  constructor(props: ICircleProps) {
    super(props);
  }

  render() {
    const { style, img, showImg, imgStyle, className, OnClick } = this.props;
    return (
      <div className={`${className}`} style={style} onClick={OnClick}>
        {showImg ? (
          <img style={imgStyle} src={img} />
        ) : (
          <div className="circe-text">
            <p>{"0 .0"}</p>
          </div>
        )}
      </div>
    );
  }
}
