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
  disabled?: boolean;
}

export class Button extends React.Component<IButtonProps, {}> {
  constructor(props: IButtonProps) {
    super(props);
  }

  static defaultProps = {
    bgColor: '#8e7aec',
    height: '41px',
    width: '212px'
  };

  render() {
    const { isLoading, Loader, bgColor, height, width, onClick, type, id, fontWeight, marginBottom, fontSize, marginRight, fontFamily, disabled } = this.props;
    return (
      <div id={id} className="margin-top-10">
        {Loader}
        <button
          disabled={disabled}
          onClick={e => onClick(e)}
          className="btn btn-primary">
          {this.props.children}
        </button>
      </div>
    );
  }
}
