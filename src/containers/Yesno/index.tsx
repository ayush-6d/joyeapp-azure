import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { BasePage, Circle, PageImage } from "src/components";
import "../Dashboards/Categories/index.scss";
import { firebaseInit } from "src/services/firebase";
import right from "src/resources/icons/right.png";
import wrong from "src/resources/icons/wrong.png";
import { Modal } from "src/components/Modal";
import { Congratulation } from "src/containers/congratulation";
import { getAuthId, getDbUrl } from "src/services/localStorage.service";
import moment from 'moment';

export interface IYesNoProps extends RouteComponentProps {
  route?: any;
  history: any;
  openModal?: any;
  data?: any;
}

export interface IYesNoState {
  todaysFeeling?: string;
  jounrnalCheck?: string;
  isSkip?: boolean;
  showJoyelevel?: boolean;
  openModal?: any;
  modalData?: any;
  HelpLine?: any;
  ShowCongratulation?: boolean;
  happinessCounter: string;
  happinessCounterLifetime: string,
  avg: string,
  dominantemotion: string,
  weekdata: string,
  createdAt: number,
  employee_id: string,
  organisation_id: string,
  sub_organisation_id: string
  journalCount: any
}

export class YesNo extends React.PureComponent<IYesNoProps, IYesNoState> {
  constructor(props: IYesNoProps) {
    super(props);
    this.state = {
      modalData: {},
      HelpLine: ["SOS", "HelpLine", "Cancel"],
      openModal: false,
      ShowCongratulation: false,
      happinessCounter: "",
      happinessCounterLifetime: "",
      avg: "",
      dominantemotion: "",
      weekdata: "",
      createdAt: 0,
      employee_id: "",
      organisation_id: "",
      sub_organisation_id: "",
      journalCount: 0
    };
    // var cQuestion = this.props
    //   console.log(123,cQuestion);
  }

  async componentDidMount() {

    const userId = getAuthId();
    let dbRef = firebaseInit.database(getDbUrl());
    const year = moment().format('yyyy');
    const currentWeek: any = moment().format('w');
    try {
      const infoData = await dbRef.ref(`users/${userId}/info`).once('value');
      let info = infoData.val();
      console.log("info", info)
      this.setState({ createdAt: info.createdAt || new Date().getTime() });
      this.setState({ employee_id: info.employee_id });
      this.setState({ organisation_id: info.organisation_id });
      this.setState({ sub_organisation_id: info.sub_organisation_id });
      this.setState({ happinessCounterLifetime: info.happinessCounterLifetime ? info.happinessCounterLifetime + 1 : 1 });

      const currentWeekData = await dbRef.ref(`users/${userId}/brew/weeks_average/${currentWeek}_${year}`).once('value');
      let data = currentWeekData.val();
      console.log("data", data)
      this.setState({ avg: data.avg });
      this.setState({ happinessCounter: data.happinessCounter ? data.happinessCounter + 1 : 1 });
      this.setState({ dominantemotion: data.dominantemotion });
      this.setState({ weekdata: data.weekdata });
      this.setState({ journalCount: data.journalCount || 0 })
    } catch (e) {
      console.log(e);
    }
  }

  handleCongratulation = () => {
    const userId = getAuthId();
    let dbRef = firebaseInit.database(getDbUrl());
    const weekOfYear = moment().format("w_yyyy");
    const date = moment().format("DD-MM-yyyy");
    dbRef
      .ref(`users/${userId}/brew`)
      .child("weeks_average")
      .update({
        [weekOfYear]: {
          avg: this.state.avg,
          dominantemotion: this.state.dominantemotion,
          happinessCounter: this.state.happinessCounter,
          journalCount: this.state.journalCount,
          weekdata: this.state.weekdata,
        },
      });

    dbRef
      .ref(`users/${userId}/info`)
      .update({
        createdAt: this.state.createdAt,
        employee_id: this.state.employee_id,
        organisation_id: this.state.organisation_id,
        sub_organisation_id: this.state.sub_organisation_id,
        happinessCounterLifetime: this.state.happinessCounterLifetime
      });

    this.setState({ ShowCongratulation: true });
  };

  handleModal = () => {
    this.setState({
      modalData: {
        title: "Take Charge!",
        header: "A random uote from database",
        content: "Please contact below services"
      }
    });
    this.setState(prevState => ({
      openModal: !prevState.openModal
    }));
  };

  navigateToDashboard = () => {
    this.props.history.push(`/`);
  }

  renderYesnoContent = () => {
    if (this.state.ShowCongratulation) {
      return <Congratulation navigate={this.navigateToDashboard} />;
    }
  };

  render() {
    const { openModal, modalData, ShowCongratulation } = this.state;
    const { data: { congratulationQuestion } } = this.props;

    return (
      <>
        {ShowCongratulation ? (
          this.renderYesnoContent()
        ) : (
          <BasePage showInfoIcon className="login-form home-screen">
            {/*<div className="pageHeader">
              <img src={pageHeader} />
            </div>*/}
            {openModal && (
              <div style={{ textAlign: "center", justifyContent: "space-around", display: "flex" }}>
                <Modal handleClose={this.navigateToDashboard} openModal={openModal} modalData={modalData} HelpLineServices={["SOS", "HelpLine", "Cancel"]}></Modal>
              </div>
            )}
            <div
              className="render-component"
              style={{
                /*  background: "#1f00a4",
                  color: "#fff",
                  padding: "40px",
                  textAlign: "center",
                  minHeight: "600px",
                  height: "88vh",*/
                width: "100%",
                justifyContent: "space-around",
                display: "flex",
                alignItems: "center",
                WebkitJustifyContent: "center",
                flexDirection: "column",
                position: "relative"
              }}
            >
              <>
                <div
                  className="render-component"
                  style={{}}
                >
                  <>
                    <div className="text-container">
                      <div className="advertise-text bold text-blue" style={{ marginTop: "35px", height: "62px" }}>
                        <p>{congratulationQuestion}</p>
                      </div>
                      <div>
                        <div className="yes-no-icon-group" style={{ marginTop: "150px" }}>
                          <PageImage height="82px" width="82px" logo={wrong} OnClick={e => this.handleModal()} />
                          <PageImage height="82px" width="82px" setCounter={e => this.handleCongratulation()} logo={right} />
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </>
            </div>
          </BasePage>
        )}
      </>
    );
  }
}

export const Yesno = withRouter(YesNo);