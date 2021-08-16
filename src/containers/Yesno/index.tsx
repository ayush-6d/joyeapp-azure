import * as React from "react";
import { Route } from "react-router-dom";
import { BasePage, Circle, PageImage } from "src/components";
import pageHeader from "src/resources/icons/pageHeader2.png";
import processCompleted from "src/resources/icons/speakingcircle.png";
import rightTick from "src/resources/icons/rightTick.png";
import "../Dashboards/Categories/index.scss";
import { createHash } from "src/utilities/generalUtils";
import { firebaseInit } from "src/services/firebase";
import * as firebase from "firebase";
import right from "src/resources/icons/right.png";
import wrong from "src/resources/icons/wrong.png";
import { Modal } from "src/components/Modal";
import { Congratulation } from "src/containers/congratulation";

export interface IYesnoProps {
  route?: any;
  history?: any;
  openModal?: any;
}

export interface IYesnoState {
  todaysFeeling?: string;
  jounrnalCheck?: string;
  isSkip?: boolean;
  showJoyelevel?: boolean;
  openModal?: any;
  modalData?: any;
  HelpLine?: any;
  ShowCongratulation?: boolean;
}

export class Yesno extends React.PureComponent<IYesnoProps, IYesnoState> {
  constructor(props: IYesnoProps) {
    super(props);
    this.state = {
      modalData: {},
      HelpLine: ["SOS", "HelpLine", "Cancel"],
      openModal: false,
      ShowCongratulation: false
    };
  }

  handleCongratulation = () => {
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

  renderYesnoContent = () => {
    if (this.state.ShowCongratulation) {
      return <Congratulation />;
    }
  };

  render() {
    const { openModal, modalData, ShowCongratulation } = this.state;
    return (
      <>
        {ShowCongratulation ? (
          this.renderYesnoContent()
        ) : (
          <BasePage withMenu showInfoIcon className="login-form home-screen">
           {/*<div className="pageHeader">
              <img src={pageHeader} />
            </div>*/} 
            {openModal && (
              <div style={{ textAlign: "center", justifyContent: "space-around", display: "flex" }}>
                <Modal openModal={openModal} modalData={modalData} HelpLineServices={["SOS", "HelpLine", "Cancel"]}></Modal>
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
                alignItems:"center",
                WebkitJustifyContent:"center",
                flexDirection: "column",
                position: "relative"
              }}
            >
              <>
               {/*<div className="advertise-text bold">
                  <p>Express freely in a few sentences </p>
                  <p>Do not hold back</p>
                </div> */} 
                <div
                  className="render-component"
                  style={{
                 /*   background: "#1f00a4",
                    color: "#fff",
                    padding: "40px",
                    textAlign: "center",
                    minHeight: "700px",
                    height: "auto",
                    width: "100%",
                    justifyContent: "space-around",
                    display: "flex",
                    flexDirection: "column"*/
                  }}
                >
                  <>
                  <div className="text-container">
                  <div  className="advertise-text bold text-blue" style={{  marginTop: "35px",height:"62px" }}>
                     <p>Express freely in a few sentences </p>
                      {/* <p className="do-not-txt">Do not hold back</p> */}
                    </div>
                    <div>
                      <div className="yes-no-icon-group"  style={{marginTop: "150px" }}>
                        <PageImage height="82px" width="82px"  logo={wrong} OnClick={e => this.handleModal()} />
                        <PageImage height="82px" width="82px"  setCounter={e => this.handleCongratulation()} logo={right} />
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
