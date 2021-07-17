import * as React from 'react';
import './formComponents.scss';
export interface ICheckboxFieldProps {
  content?: string;
  checked?: boolean;
  onChange?: (Function) => void;
  fontSize?: string;
  marginTop?: string;
}

export class CheckboxField extends React.PureComponent<
  ICheckboxFieldProps,
  {}
  > {
  constructor(props: ICheckboxFieldProps) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <label className="container">
          <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange} />
          <span className="checkmark" />
          <span className="nameProp" style={{ fontSize: this.props.fontSize }}>{this.props.children}</span>
        </label>
      </React.Fragment>
    );
  }
}
