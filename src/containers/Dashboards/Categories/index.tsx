import * as React from "react";
import { BasePage, Circle, ImportLoader } from "src/components";
//import pageHeader from '../../../resources/icons/pageHeader.png';
//import pageHeader2 from "../../../resources/icons/pageHeader2.png";
import { InputField, CheckboxField, Button } from "components/FormComponents/index";
import { Main } from "./Main";
import { ScorePoint } from "./scorepoints";
import "./index.scss";
import { TellUsAbout } from "./Tellusabout";
import { SaySomething } from "./SaySomething";
import { Congratulation } from "./congratulation";
import { Luncher } from "./Luncher";
import { Modal } from "src/components/Modal";
export interface IDashboardProps {
  route?: string;
  location?: string;
  openModal?: boolean;
}
let timer = null;
export interface IDashboardState {
  renderComponent?: string;
  headerImage?: string;
  modalData?: any;
  isLoading?: boolean;
  openModal?: any;
  HelpLine?: any;
  seconds?: any;
}
export interface ISideBarProps {}
export class Dashboard extends React.PureComponent<IDashboardProps, IDashboardState> {
  constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      renderComponent: "main",
      headerImage: "",
      modalData: {},
      HelpLine: ["SOS", "HelpLine", "Cancel"],
      isLoading: true,
      openModal: false,
      seconds: 2
    };
  }
  componentDidMount() {
    // this.setState({ renderComponent: this.props && this.props["match"]["url"].split('/')[2] });
    timer = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState(prevState => ({
          seconds: prevState.seconds - 1
        }));
      } else {
        this.setState(prevState => ({
          isLoading: !prevState.isLoading
        }));
        clearInterval(timer);
        console.log(this.state.seconds);
      }
    }, 500);
  }
  handleRoute = route => {
    //debugger;
   this.setState({ renderComponent: route });
  };
  handleModal = () => {
    if (this.state.renderComponent === "congratulation") {
      this.setState({
        modalData: {
          title: "Take Charge!",
          header: "A random uote from database",
          content: "Please contact below services"
        }
      });
    }
    this.setState(prevState => ({
      openModal: !prevState.openModal
    }));
  };
  renderContent = () => {
    const { renderComponent, openModal } = this.state;
    console.log('renderComponent', renderComponent);
    switch (renderComponent) {
      case "main":
        return <Main route={this.handleRoute} openModal={this.handleModal} />;
      case "tellusabout":
        return <TellUsAbout route={this.handleRoute} openModal={this.handleModal} />;
      case "saysomething":
        return <SaySomething route={this.handleRoute} openModal={this.handleModal} />;
      case "analysis":
        return <SaySomething route={this.handleRoute} analysisPage={true} />;
      case "congratulation":
        return <Congratulation route={this.handleRoute} openModal={this.handleModal} />;
      // default:
      //   return <ContactsTab contact={activeKey} />;
    }
  };
  render() {
    const { renderComponent, openModal, modalData, isLoading } = this.state;
    const headers = ["saysomething", "congratulation"];
    const showsSorePoint = ["tellusabout"];
    const component = ["main"]
    console.log(openModal);

    return (
      <>
        <BasePage className="login-form home-screen">
          <div className="pageHeader">
            {/*!headers.includes(renderComponent) && !showsSorePoint.includes(renderComponent) ? <Circle className={`circles score-point`} showImg={false} /> : null */}
            {/* {<img src={headers.includes(renderComponent) ? pageHeader2 : pageHeader} />} */}
          </div>
          <div
            className="render-component"
            style={{
              //background: "#1f00a4",
              // color: "#fff",
              // padding: "40px",
              textAlign: "center",
              minHeight: "87vh",
              height: "auto",
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "column",
              position: "relative"
            }}
          >
            {openModal && <Modal openModal={openModal} modalData={modalData} HelpLineServices={["SOS", "HelpLine", "Cancel"]}></Modal>}
            {isLoading ? <Luncher /> : this.renderContent()}
          </div>
        </BasePage>
      </>
    );
  }
}
