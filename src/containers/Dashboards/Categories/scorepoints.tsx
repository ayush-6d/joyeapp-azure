import * as React from 'react';
import './index.scss';
export interface IScorePointProps {
}
export class ScorePoint extends React.PureComponent<IScorePointProps, {}> {
  constructor(props: IScorePointProps) {
    super(props);
  }
  handleSubmit = () => {

  }
  render() {
    return (
      <div className="circle__inner"><div className="circle__content">0.0</div></div>
    )
  }
}