import * as React from "react";
import "./CircularCounter.scss";
import { firebaseInit } from "src/services/firebase";
import { getAuthId, getDbUrl } from "src/services/localStorage.service";
import moment from 'moment';
import { navigateBack } from "@microsoft/teams-js";


export interface ICircleProps {
  OnClick?: any;
  style?: any;
  imgStyle?: any;
  img?: any;
  showImg?: boolean;
  className?: string;
  // history?: any;
}

export interface ICircleState {
  avarage?: string
}



export class Circle extends React.PureComponent<ICircleProps, ICircleState> {
  constructor(props: ICircleProps) {
    super(props);
    this.state = {
      avarage: ""
    };
  }

  async componentDidMount() {
    const userId = getAuthId();
    let dbRef = firebaseInit.database(getDbUrl());
    const date = moment().format("DD-MM-yyyy");

    try {
      const data = await dbRef.ref(`users/${userId}/brew/brewData/${date}/avarage`).once('value');
      let avarage = data.val();
      this.setState({
        avarage: avarage
      });

    } catch (e) {
      console.log(e);
    }
  }

  // dailyChart = () => {
  //   this.props.history.push("/daily-chart");
  // }

  render() {
    const { style, img, showImg, imgStyle, className, OnClick } = this.props;
    const { avarage } = this.state;

    return (
      <div className={`${className}`} style={style} onClick={OnClick}>
        {showImg ? (
          <img style={imgStyle} src={img} />
        ) : (
          <div className="circe-text"
          // onClick={this.dailyChart} 
          >
            <p>{avarage}</p>
          </div>
        )}
      </div>
    );
  }
}
