import * as React from "react";
import "./CircularCounter.scss";
import { firebaseInit } from "src/services/firebase";
import { getAuthId, getDbUrl } from "src/services/localStorage.service";
import moment from 'moment';
import { Link } from "react-router-dom";


export interface ICircleProps {
  OnClick?: any;
  style?: any;
  imgStyle?: any;
  img?: any;
  showImg?: boolean;
  className?: string;
}

export interface ICircleState {
  avarage?: string;
  allUserData?: object;
}



export class Circle extends React.PureComponent<ICircleProps, ICircleState> {
  constructor(props: ICircleProps) {
    super(props);
    this.state = {
      avarage: "0.0",
      allUserData: null,
    };
  }

  async componentDidMount() {
    const userId = getAuthId();
    console.log('getDbUrl()', getDbUrl());
    let dbRef = firebaseInit.database(getDbUrl());
    const date = moment().format("DD-MM-yyyy");

    try {
      let allData = await dbRef.ref(`users/${userId}/brew/brewData`).once('value');
      let avarage:any = "0.0";
      allData = allData?.val();
      if (allData && !Array.isArray(allData)) {
        this.setState({allUserData: allData});
        const data = await dbRef.ref(`users/${userId}/brew/brewData/${date}/avarage`).once('value');    
        avarage = data.val() || "0.0";
        this.setState({
          avarage: avarage !== "0.0" ? (Math.round(avarage * 10) / 10).toString() : avarage
        });
      }

    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { style, img, showImg, imgStyle, className, OnClick } = this.props;
    const { avarage, allUserData } = this.state;

    return (
      <div className={`${className}`} style={style} onClick={OnClick}>
        {showImg ? (
          <img style={imgStyle} src={img} />
        ) : (
          <div className="circe-text">
            {allUserData !== null && (
              <Link to={allUserData === null ? "/" : "/daily-chart?fromDashboard=true"}>
                <p>{avarage}</p>
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }
}
