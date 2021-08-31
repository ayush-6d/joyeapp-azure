import * as React from "react";
import { firebaseInit } from "src/services/firebase";
import "src/styles/common.scss";
import { Button } from "../FormComponents";
import "./modalStyle.scss";
import * as firebase from "firebase";

export interface IDashboardProps {
  handleClose?: (event) => void;
  show?: boolean;
  openModal?: boolean;
  HelpLineServices?: any;
  header?: string;
  buttonName?: JSX.Element;
  style?: React.CSSProperties;
  modalData?: any;
  emergencyData?: any;
}

export interface IDashboardState {
  modalOpened?: boolean;
  emergencyData?: any;
}

export class Modal extends React.PureComponent<IDashboardProps, IDashboardState> {
  constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      modalOpened: props.openModal,
      emergencyData: ["SOS", "HelpLine"]
    };
    console.log("props model", props.openModal)
  }

  async componentDidMount() {

    try {
      var query = await firebaseInit.database().ref("master/organisation/-MHUPaNmo_p85_DR3ABC/suborganisation/596ef7d8-f109-4c4e-9c91-81896baa9da5/emergency").orderByKey();
      let snapshot = await query.once("value");
      snapshot.forEach(function (childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
      });

      const userRefEmergency = await firebase.database().ref(`master/organisation/-MHUPaNmo_p85_DR3ABC/suborganisation/596ef7d8-f109-4c4e-9c91-81896baa9da5/emergency`);

      userRefEmergency.on("value", snapshot => {
        snapshot.forEach(data => {
          const dataVal = data.val();
          console.log("dataVal", dataVal);
          //this.setState({ emergencyData: dataVal });
        });
      });

      // });
      //       const happinessCounter = await firebaseInit.database().ref(`master/organisation/-MHUPaNmo_p85_DR3ABC/suborganization/596ef7d8-f109-4c4e-9c91-81896baa9da5`).once('value')
      //       console.log(typeof happinessCounter)
      //       debugger
      //       for (const childSnapshot in happinessCounter) {
      // debugger
      //       // .forEach(function(childSnapshot) {
      //         // var childKey = childSnapshot.key;
      //         // var childData = childSnapshot.val();
      //       //   debugger
      //       //   // ...
      //       // });
      //       console.log('happinessCounter',happinessCounter)
      //       }
    } catch (e) {
      console.log(e);
    }
  }
  modalToggle = () => {
    this.setState({ modalOpened: !this.state.modalOpened });
  };
  handleSubmit = () => {
    this.setState({ modalOpened: !this.state.modalOpened });
  };
  render() {
    console.log("emergencyData", this.state.emergencyData);
    console.log("modalOpened", this.state.modalOpened)
    const coverClass = this.state.modalOpened ? "modal__cover modal__cover-active" : "modal__cover";
    const containerClass = this.state.modalOpened ? "modal__container modal__container-active" : "modal__container";
    const { modalData, HelpLineServices, buttonName } = this.props;
    console.log(HelpLineServices);
    // debugger

    let emergency = this.state.emergencyData.map((item, index) => {
      return (
        <Button Loader={null} type="button" onClick={this.handleSubmit} marginBottom={"20px"} fontWeight={600} fontSize="16.67px">
          {item}
        </Button>
      );
    });

    return (
      <React.Fragment>
        <div className="modal__button" onClick={this.modalToggle}>
          {buttonName}
        </div>

        <div className={containerClass}>
          <div className="text-container">
            <div
              className="advertise-text bold"
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                textAlign: "center",
                marginBottom: "20px",

                color: "#1E00A3"
              }}
            >
              {modalData["title"]}
            </div>
            <div
              className="advertise-text bold journal-title"
              style={{
              }}
            >
              {modalData["header"]}
            </div>
            <div
              className="advertise-text bold journal-title"
              style={{
                marginBottom: "20px"
              }}
            >
              {modalData["content"]}
            </div>
            {/* <div className="modal-btn-dasd">{emergency}</div> */}
            <div className="cancel-btn margin-top-10" >
              <Button Loader={null} type="button" onClick={this.handleSubmit} marginBottom={"20px"} fontWeight={600} fontSize="16.67px">
                ok
              </Button>
            </div>
          </div>
        </div>
        <div className={coverClass} onClick={this.modalToggle}></div>
      </React.Fragment>
    );
  }
}
