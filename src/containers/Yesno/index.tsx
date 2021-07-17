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
}

export class Yesno extends React.PureComponent<IYesnoProps, IYesnoState> {
  constructor(props: IYesnoProps) {
    super(props);
    this.state = {
      modalData: {},
      HelpLine: ["SOS", "HelpLine", "Cancel"],
      openModal: false
    };
  }

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

  render() {
    const { openModal, modalData } = this.state;
    return (
      <>
        <BasePage withMenu className="login-form">
          <div className="pageHeader">
            <img src={pageHeader} />
          </div>
          {openModal && (
            <div style={{ textAlign: "center", justifyContent: "space-around", display: "flex" }}>
              <Modal openModal={openModal} modalData={modalData} HelpLineServices={["SOS", "HelpLine", "Cancel"]}></Modal>
            </div>
          )}
          <div
            className="render-component"
            style={{
              background: "#1f00a4",
              color: "#fff",
              padding: "40px",
              textAlign: "center",
              minHeight: "700px",
              height: "auto",
              width: "100%",
              justifyContent: "space-around",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <>
              <div className="advertise-text bold" style={{ fontSize: "16px", marginTop: "-114px", color: "ffffff", lineHeight: "13px" }}>
                <p>Express freely in a few sentences </p>
                <p>Express freely in a few sentences </p>
                <p>Do not hold back</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div className="RowContainer">
                  <PageImage height="82px" width="82px" marginTop="-472px" marginLeft="-117px" logo={wrong} OnClick={e => this.handleModal()} />
                  <PageImage height="82px" width="82px" marginTop="-472px" marginLeft="33px" setCounter={e => this.props.history.push("congratulation")} logo={right} />
                </div>
              </div>
            </>
          </div>
        </BasePage>
      </>
    );
  }
}
