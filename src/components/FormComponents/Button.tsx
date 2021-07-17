import * as React from 'react';
import './formComponents.scss';

export interface IButtonProps {
  width?: string;
  bgColor?: string;
  height?: string;
  onClick: (event) => void;
  type: string;
  fontWeight?: number;
  fontSize?: string;
  marginRight?: string;
  marginBottom?: string;
  id?: string;
  fontFamily?: string;
  isLoading?: boolean;
  Loader?: JSX.Element;
}

export class Button extends React.Component<IButtonProps, {}> {
  constructor(props: IButtonProps) {
    super(props);
  }

  static defaultProps = {
    bgColor: '#9A8CD6',
    height: '41px',
    width: '212px'
  };

  render() {
    const { isLoading, Loader, bgColor, height, width, onClick, type, id, fontWeight, marginBottom, fontSize, marginRight, fontFamily } = this.props;
    return (
      <div id={id} className="button-container">
        {Loader}
        <button
          onClick={e => onClick(e)}
          className="btn-default-green"
          style={{ backgroundColor: bgColor, height, width, fontWeight, marginBottom, fontSize, marginRight, fontFamily }}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}
