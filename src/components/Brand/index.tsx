import * as React from 'react';
import './brand.scss'
export interface IBrandProps {
  fontSize: string;
  marginTop?: string;
  marginLeft?: string;
  cursor?: string;
}

export class Brand extends React.PureComponent<IBrandProps, {}> {
  constructor(props: IBrandProps) {
    super(props);
  }

  render() {
    const { fontSize, marginTop, marginLeft } = this.props;
    return (
      <div className='brand'
      >
        <div>Welcome to Joye</div>
        <div>It’s as easy as 1-2-3!</div>
      </div>
    );
  }
}
