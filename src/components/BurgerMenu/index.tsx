import * as React from "react";
import "./burgerMenu.scss";
import { withRouter, RouteComponentProps } from "react-router";
import { baseGreen, baseBlack } from "../../constants/colors";
const shield = require("../../resources/icons/shield.png");
const termsofService = require("../../resources/icons/TermsofService.png");
const faq = require("../../resources/icons/faq.png");
const aboutUs = require("../../resources/icons/aboutus.svg");
const home = require("../../resources/icons/home.png");
const brewicon = require("../../resources/icons/brewicon.png");
const out = require("../../resources/icons/out.png");
import { Button } from "../FormComponents";
import * as microsoftTeams from "@microsoft/teams-js";


export interface IBurgerMenuProps extends RouteComponentProps { }

export interface IBurgerMenuState {
  activeKey: number;
  isOpen: boolean;
  modalOpened: boolean;
}

export class BurgerMenuImpl extends React.PureComponent<IBurgerMenuProps, IBurgerMenuState> {
  constructor(props: IBurgerMenuProps) {
    super(props);
    this.state = {
      activeKey: 1,
      isOpen: false,
      modalOpened: false
    };
  }
  componentDidMount(){
    microsoftTeams.initialize();
  }

  handleSelect = activeKey => {
    this.setState({ activeKey });
  };

  onClickHandle = () => {
    window.localStorage.clear();
    this.props.history.push("/");
  };

  modalToggle = () => {
    this.setState({ modalOpened: !this.state.modalOpened });
  };

  handleSubmit = () => {
    this.setState({ modalOpened: !this.state.modalOpened });
    setTimeout(() => {
      window.localStorage.clear();
      window.location.reload();
      this.props.history.push("/");
    }, 1000);

    // this.onClickHandle()
    // window.localStorage.clear();
    // this.props.history.push("/");
  };

  render() {
    const containerClass = this.state.modalOpened ? "modal__container modal__container-active" : "modal__container";
    const coverClass = this.state.modalOpened ? "modal__cover modal__cover-active" : "modal__cover";

    return (
      <div className="dis-flex-menu">
        <div className="burger-menu-container">
          <div className="burger">
            <input onClick={() => this.setState({ isOpen: !this.state.isOpen })} type="checkbox" />
            <span></span>
            <span></span>
            <span style={{ marginBottom: "0px" }}></span>
          </div>

          {/* Privacy policy

Terms of service

FAQ

Feedback

About us */}
          <div id="mySidenav" className={`${this.state.isOpen ? "sidenav" : "sidenav sidenav-hidden"}`}>
            {/* <div id="mySidenav" className={`${this.state.isOpen ? 'sidenav' : 'sidenav'}`}> */}
            {/* <div className="logo-container" >
                        <img src={tdLogo} alt="" className="" />
                    </div> */}
            <a onClick={() => this.setState({ isOpen: !this.state.isOpen })} className="closebtn">
              &times;
            </a>
            <div className="sidebar-container">
              <Tab onClick={() => this.props.history.push("/")} name="main">
                <img height="30px" width="28px" src={home} />
                <div className="item-label" style={{ marginLeft: "25px", fontSize: "18px" }}>
                  Home
                </div>
              </Tab>

              <Tab onClick={() => {
                microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/entity/6c75be83-05a8-4515-9c7b-b5f759b99b7f/stressbuster")
              }} name="main">
                <img height="30px" width="28px" src={brewicon} />
                <div className="item-label" style={{ marginLeft: "25px", fontSize: "18px" }}>
                  Stress Buster
                </div>
              </Tab>

              {/*  <Tab onClick={() => this.props.history.push("/journal")} name="main">
              <img height="30px" width="28px" src={shield} />
                <div className="item-label" style={{ marginLeft: "25px", fontSize: "18px" }}>
                  Journal
                </div>
              </Tab> */}

              <Tab onClick={() => this.props.history.push("/privacypolicy")} name="reports">
                <img height="30px" width="28px" src={shield} />
                <div className="item-label" style={{ marginLeft: "25px", fontSize: "18px" }}>
                  Privacy Policy
                </div>
              </Tab>
              <Tab onClick={() => this.props.history.push("/termsofservice")} name="reports">
                <img height="30px" width="28px" src={termsofService} />
                <div className="item-label" style={{ marginLeft: "25px", fontSize: "18px" }}>
                  Terms of Service
                </div>
              </Tab>
              <Tab onClick={() => this.props.history.push("/faq")} name="reports">
                <img height="25px" width="25px" src={faq} />
                <div className="item-label" style={{ marginLeft: "30px", fontSize: "18px" }}>
                  FAQ
                </div>
              </Tab>

              {/* <Tab onClick={() => this.props.history.push("/dashboard/reports")} name="reports">
                <img height="30px" width="28px" src={heart} />
                <div className="item-label" style={{ marginLeft: "25px", fontSize: "18px" }}>
                  Feedback
                </div>
              </Tab> */}
              <Tab onClick={() => this.props.history.push("/aboutus")} name="reports">
                <img height="24px" width="24px" src={aboutUs} />
                <div className="item-label" style={{ marginLeft: "27px", fontSize: "18px" }}>
                  About us
                </div>
              </Tab>
              <Tab onClick={this.modalToggle} name="reports">
                <img height="25px" width="25px" src={out} />
                <div className="item-label" style={{ marginLeft: "30px", fontSize: "18px" }}>
                  Sign out
                </div>
              </Tab>
            </div>
          </div>
        </div>
        {/* modal start */}
        {this.state.modalOpened &&
          <React.Fragment>
            <div className="modal__button" onClick={this.modalToggle}>

            </div>
            <div className={containerClass}>
              <div className="text-container center-items">
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
                  Wait
                </div>
                <div
                  className="advertise-text bold journal-title"
                  style={{
                  }}
                >
                  Do you really want to logout?
                </div>

                <div className="cancel-btn margin-top-10" >
                  <Button Loader={null} type="button" onClick={this.handleSubmit} marginBottom={"20px"} fontWeight={600} fontSize="16.67px">
                    Yes
                  </Button>
                </div>
                <div className="cancel-btn margin-top-10" >
                  <Button Loader={null} type="button" onClick={this.modalToggle} marginBottom={"20px"} fontWeight={600} fontSize="16.67px">
                    No
                  </Button>
                </div>
              </div>
            </div>
            <div className={coverClass} onClick={this.modalToggle}></div>
          </React.Fragment>
        }
        {/* modal end */}
      </div>
    );
  }
}

export const BurgerMenu = withRouter(BurgerMenuImpl as any);

function getIcon(isActive, name) {
  switch (name) {
    case "main":
      return isActive ? <DashIcon color={baseGreen} /> : <DashIcon color={baseBlack} />;
    case "activities":
      return isActive ? <ActivityIcon color={baseGreen} /> : <ActivityIcon color={baseBlack} />;
    case "my-targets":
      return isActive ? <TargetIcon color={baseGreen} /> : <TargetIcon color={baseBlack} />;
    case "contacts":
      return isActive ? <ContactIcon color={baseGreen} /> : <ContactIcon color={baseBlack} />;
    case "reports":
      return isActive ? <StackIcon color={baseGreen} /> : <StackIcon color={baseBlack} />;
    case "user-profile":
      return isActive ? <SettingIcon color={baseGreen} /> : <SettingIcon color={baseBlack} />;
  }
}

const Tab = ({ children, name, onClick }) => {
  const isActive = location.href.split("/").pop() === name;
  return (
    <div onClick={onClick} className={`sidebar-item ${isActive ? "active" : ""}`}>
      {/* {getIcon(isActive, name)}
        &nbsp;
        &nbsp;
        &nbsp; */}
      {children}
    </div>
  );
};
/* tslint:disable */
const DashIcon = ({ color }) => {
  return (
    <svg width="393" height="394" viewBox="0 0 393 394" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 196.281C0 88.0508 88.0508 0 196.281 0C304.512 0 392.562 88.0508 392.562 196.281C392.562 239.074 378.798 278.712 355.463 311H316.535C341.788 284.536 358.42 249.777 361.879 211.281H326.613V181.281H361.879C358.77 146.68 345.02 115.098 323.93 89.8438L299.047 114.727L277.832 93.5156L302.715 68.6328C277.465 47.543 245.883 33.793 211.281 30.6836V65.9453H181.281V30.6836C146.68 33.793 115.098 47.543 89.8477 68.6328L114.73 93.5156L93.5156 114.727L68.6328 89.8438C47.543 115.098 33.793 146.68 30.6836 181.281H65.9492V211.281H30.6836C34.1427 249.777 50.775 284.536 76.0272 311H37.0995C13.7649 278.712 0 239.074 0 196.281Z" fill={color} />
      <path d="M202.332 197.812V149L195 145L187.332 144L178.5 145L172.332 149V197.812C155.527 203.949 143.5 220.098 143.5 239C143.5 257.902 155.527 274.051 172.332 280.188L186.5 281H196.5L202.332 280.188C219.137 274.051 231.164 257.902 231.164 239C231.164 220.098 219.137 203.949 202.332 197.812ZM187.332 252.832C179.703 252.832 173.5 246.629 173.5 239C173.5 231.371 179.703 225.168 187.332 225.168C194.961 225.168 201.164 231.371 201.164 239C201.164 246.629 194.961 252.832 187.332 252.832Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M89.0403 360.262L303.82 361.913L304.861 309.489L271.637 309.259C271.673 309.914 271.684 310.572 271.671 311.233C271.186 335.684 237.315 355.275 196.017 354.99C154.72 354.705 121.636 334.653 122.121 310.202C122.134 309.541 122.171 308.883 122.233 308.229L89.0403 308L89.0403 360.262Z" fill={color} />
      <path d="M304.236 356.125C304.236 376.658 256.277 393.302 197.118 393.302C137.958 393.302 90 376.658 90 356.125C90 335.593 137.958 356.125 197.118 356.125C256.277 356.125 304.236 335.593 304.236 356.125Z" fill={color} />
      <path d="M37 308H89V329L68 326.73L49.5 318.216L37 308Z" fill={color} />
      <path d="M355.99 309.008L303.991 309.25L304.086 329.741L325.075 327.428L343.537 319.035L355.99 309.008Z" fill={color} />
    </svg>
  );
};
const SettingIcon = ({ color }) => {
  return (
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 268.765 268.765">
      <g id="Settings">
        <g>
          <path
            fill={color}
            d="M267.92,119.461c-0.425-3.778-4.83-6.617-8.639-6.617
                c-12.315,0-23.243-7.231-27.826-18.414c-4.682-11.454-1.663-24.812,7.515-33.231c2.889-2.641,3.24-7.062,0.817-10.133
                c-6.303-8.004-13.467-15.234-21.289-21.5c-3.063-2.458-7.557-2.116-10.213,0.825c-8.01,8.871-22.398,12.168-33.516,7.529
                c-11.57-4.867-18.866-16.591-18.152-29.176c0.235-3.953-2.654-7.39-6.595-7.849c-10.038-1.161-20.164-1.197-30.232-0.08
                c-3.896,0.43-6.785,3.786-6.654,7.689c0.438,12.461-6.946,23.98-18.401,28.672c-10.985,4.487-25.272,1.218-33.266-7.574
                c-2.642-2.896-7.063-3.252-10.141-0.853c-8.054,6.319-15.379,13.555-21.74,21.493c-2.481,3.086-2.116,7.559,0.802,10.214
                c9.353,8.47,12.373,21.944,7.514,33.53c-4.639,11.046-16.109,18.165-29.24,18.165c-4.261-0.137-7.296,2.723-7.762,6.597
                c-1.182,10.096-1.196,20.383-0.058,30.561c0.422,3.794,4.961,6.608,8.812,6.608c11.702-0.299,22.937,6.946,27.65,18.415
                c4.698,11.454,1.678,24.804-7.514,33.23c-2.875,2.641-3.24,7.055-0.817,10.126c6.244,7.953,13.409,15.19,21.259,21.508
                c3.079,2.481,7.559,2.131,10.228-0.81c8.04-8.893,22.427-12.184,33.501-7.536c11.599,4.852,18.895,16.575,18.181,29.167
                c-0.233,3.955,2.67,7.398,6.595,7.85c5.135,0.599,10.301,0.898,15.481,0.898c4.917,0,9.835-0.27,14.752-0.817
                c3.897-0.43,6.784-3.786,6.653-7.696c-0.451-12.454,6.946-23.973,18.386-28.657c11.059-4.517,25.286-1.211,33.281,7.572
                c2.657,2.89,7.047,3.239,10.142,0.848c8.039-6.304,15.349-13.534,21.74-21.494c2.48-3.079,2.13-7.559-0.803-10.213
                c-9.353-8.47-12.388-21.946-7.529-33.524c4.568-10.899,15.612-18.217,27.491-18.217l1.662,0.043
                c3.853,0.313,7.398-2.655,7.865-6.588C269.044,139.917,269.058,129.639,267.92,119.461z M134.595,179.491
                c-24.718,0-44.824-20.106-44.824-44.824c0-24.717,20.106-44.824,44.824-44.824c24.717,0,44.823,20.107,44.823,44.824
                C179.418,159.385,159.312,179.491,134.595,179.491z"
          />
        </g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
};
const ContactIcon = ({ color }) => {
  return (
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40.536px" height="40.536px" viewBox="0 0 40.536 40.536">
      <g>
        <path
          fill={color}
          d="M2.644,10.29c0-2.144,1.746-3.889,3.891-3.889s3.89,1.745,3.89,3.889c0,2.145-1.745,3.89-3.89,3.89
       S2.644,12.435,2.644,10.29z M20.27,21.382c3.505,0,6.361-2.855,6.361-6.363s-2.854-6.361-6.361-6.36
       c-3.507,0-6.361,2.853-6.361,6.36S16.764,21.382,20.27,21.382z M34.005,14.181c2.146,0,3.892-1.745,3.892-3.89
       c0-2.144-1.746-3.89-3.892-3.89s-3.89,1.746-3.89,3.89C30.117,12.435,31.861,14.181,34.005,14.181z M13.017,18.764l0.052-0.063
       l-0.012-0.081c-0.333-2.178-1.471-3.926-3.203-4.926L9.73,13.623l-0.098,0.103c-0.817,0.857-1.918,1.33-3.097,1.33
       c-1.179,0-2.279-0.473-3.097-1.33l-0.099-0.104l-0.124,0.071c-1.731,1-2.869,2.748-3.203,4.926L0,18.7l0.052,0.063
       c1.729,2.073,4.031,3.214,6.481,3.214C8.983,21.978,11.288,20.836,13.017,18.764z M40.527,18.621
       c-0.332-2.178-1.471-3.926-3.202-4.926l-0.124-0.071l-0.098,0.103c-0.818,0.857-1.918,1.33-3.099,1.33
       c-1.179,0-2.278-0.472-3.097-1.33l-0.1-0.103l-0.123,0.071c-1.731,1-2.869,2.748-3.203,4.926l-0.012,0.081l0.051,0.063
       c1.729,2.073,4.031,3.215,6.481,3.215c2.451,0,4.752-1.144,6.481-3.215l0.052-0.063L40.527,18.621z M25.697,20.584l-0.201-0.116
       l-0.161,0.168c-1.336,1.403-3.136,2.175-5.064,2.175c-1.928,0-3.728-0.771-5.064-2.175l-0.161-0.168l-0.202,0.116
       c-2.832,1.636-4.692,4.494-5.237,8.056l-0.02,0.133l0.085,0.103c2.827,3.393,6.591,5.26,10.599,5.26
       c4.008,0,7.772-1.867,10.599-5.26l0.085-0.103l-0.02-0.133C30.391,25.079,28.529,22.22,25.697,20.584z"
        />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
};
const TargetIcon = ({ color }) => {
  return (
    <svg width="295" height="294" viewBox="0 0 295 294" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M135.239 168.04C130.102 168.04 125.924 163.861 125.924 158.724C125.924 156.077 127.04 153.692 128.819 151.997C129.827 154.944 131.481 157.719 133.827 160.067C136.159 162.399 138.949 164.098 141.984 165.124C140.289 166.916 137.896 168.04 135.239 168.04V168.04Z" fill={color} />
      <path d="M178.608 145.161C179.953 149.448 180.693 154 180.693 158.725C180.693 183.789 160.302 204.179 135.239 204.179C110.176 204.179 89.786 183.788 89.786 158.725C89.786 133.662 110.177 113.272 135.239 113.272C139.933 113.272 144.457 114.002 148.72 115.329C148.72 115.329 132.696 131.433 132.186 132.08C118.829 133.601 108.416 144.968 108.416 158.725C108.416 173.516 120.449 185.55 135.24 185.55C149.041 185.55 160.438 175.072 161.902 161.654C162.518 161.161 178.608 145.161 178.608 145.161V145.161Z" fill={color} />
      <path d="M135.239 240.319C90.248 240.319 53.646 203.716 53.646 158.725C53.646 113.734 90.248 77.1324 135.239 77.1324C150.076 77.1324 163.992 81.1254 175.99 88.0774L162.215 101.842C154.034 97.9474 144.887 95.7624 135.238 95.7624C100.521 95.7624 72.276 124.007 72.276 158.724C72.276 193.442 100.521 221.687 135.238 221.687C169.956 221.687 198.201 193.442 198.201 158.724C198.201 149.051 196.005 139.883 192.09 131.686L205.858 117.927C212.828 129.937 216.832 143.869 216.832 158.725C216.832 203.715 180.23 240.319 135.239 240.319V240.319Z" fill={color} />
      <path d="M239.91 43.7654C239.91 49.4034 244.496 53.9894 250.134 53.9894H252.356L154.949 151.332C153.239 153.04 151 153.894 148.76 153.894C146.519 153.894 144.277 153.038 142.567 151.328C139.149 147.907 139.151 142.364 142.571 138.947L239.91 41.6724V43.7654V43.7654Z" fill={color} />
      <path d="M135.239 23.4844C164.919 23.4844 192.389 33.1054 214.715 49.3774L188.723 75.3524C173.283 65.4114 154.929 59.6224 135.24 59.6224C80.595 59.6224 36.1379 104.079 36.1379 158.724C36.1379 213.369 80.595 257.827 135.24 257.827C189.885 257.827 234.342 213.369 234.342 158.724C234.342 139.02 228.544 120.654 218.59 105.206L244.577 79.2364C260.856 101.564 270.481 129.039 270.481 158.725C270.481 233.297 209.812 293.966 135.24 293.966C60.669 293.966 -6.10352e-05 233.297 -6.10352e-05 158.725C-6.10352e-05 84.1534 60.668 23.4844 135.239 23.4844V23.4844Z" fill={color} />
      <path d="M253.875 17.4524L270.976 0.562361C272.199 -0.645639 274.271 0.221361 274.271 1.93936V7.50736C274.271 14.2224 279.715 19.6664 286.43 19.6664H292.287C294.017 19.6664 294.878 21.7624 293.647 22.9784L276.38 40.0414C276.018 40.3994 275.529 40.6004 275.02 40.6004H255.234C254.165 40.6004 253.299 39.7344 253.299 38.6654V18.8294C253.299 18.3124 253.506 17.8164 253.875 17.4524Z" fill={color} />
    </svg>
  );
};
const ActivityIcon = ({ color }) => {
  return (
    <svg width="367" height="368" viewBox="0 0 367 368" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="228" width="104" height="140" fill={color} />
      <rect x="132" y="163" width="106" height="205" fill={color} />
      <path d="M271 113H367V367H271V113Z" fill={color} />
      <path d="M240.986 69.4458C241.07 68.0326 230.201 72.5881 228.945 71.5089C227.689 70.4297 236.306 63.9394 234.661 64.0124C234.564 64.0088 234.468 64 234.37 64L212.598 71.5089C209.269 71.5089 208.378 68.6488 208.378 71.5089C208.378 74.3691 194.213 72.2857 197.902 74.3571L212.598 82.3839L160.832 125.551L138.361 106.246C137.231 105.275 135.697 104.729 134.099 104.729C132.5 104.729 130.967 105.275 129.837 106.246L17 202.527C19.7124 205.375 19.1241 204.642 21.4779 206.665C22.6551 207.675 24.1975 208.181 25.74 208.181C27.2825 208.181 20.0138 205.893 25.74 209L134.099 117.231L156.57 136.536C158.924 138.558 162.74 138.558 165.095 136.536L228.945 81.6812L218.927 83.4196C218.927 86.2798 227.352 84.9732 230.681 84.9732C234.01 84.9732 230.681 82.6548 230.681 79.7946L241 69.6964C241 69.612 240.99 69.5297 240.986 69.4458Z" fill={color} />
      <path d="M271.985 35.3558L246.703 119.1L177.35 57.862L271.985 35.3558Z" fill={color} />
    </svg>
  );
};

const StackIcon = ({ color }) => {
  return (
    <svg width="519" height="583" viewBox="0 0 519 583" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="27" height="553" fill={color} />
      <rect x="439" width="25" height="431" transform="rotate(90 439 0)" fill={color} />
      <rect x="494" y="558" width="25" height="431" transform="rotate(90 494 558)" fill={color} />
      <rect x="442" y="258" width="28" height="325" transform="rotate(90 442 258)" fill={color} />
      <rect x="442" y="328" width="28" height="325" transform="rotate(90 442 328)" fill={color} />
      <rect x="442" y="398" width="28" height="325" transform="rotate(90 442 398)" fill={color} />
      <rect x="39" y="30" width="27" height="553" fill={color} />
      <rect x="492" y="30" width="27" height="553" fill={color} />
      <rect x="39" y="30" width="480" height="108" fill={color} />
    </svg>
  );
};
