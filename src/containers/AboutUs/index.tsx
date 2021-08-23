import * as React from "react";
import { BasePage } from "components/BasePage/index";
import "../Dashboards/Categories/index.scss";
import { relative } from "path";
const logo = require("../../resources/icons/LOGO_Square white_border.png");
const shield = require("../../resources/icons/shield.png");

export class AboutUs extends React.PureComponent {
  render() {
    let Date = "01 July 2021";
    return (
      <BasePage withMenu showInfoIcon className="login-form home-screen">
        <div
          className="render-component"
          style={{
            background: "#ffffff",
            color: "#808080",
            textAlign: "center",
            minHeight: "600px",
            height: "auto",
            width: "100%",
            alignContent: "center",
            fontFamily: "Nunito-Regular",
            fontSize: "16px",
            lineHeight: "24px",
            position:"relative"
          }}
        >
          <div className="joye-logo" style={{ alignContent: "center", marginTop: "72px", marginBottom: "60px" }}>
            <img height="75px" width="75px" src={logo} />
          </div>

          <p style={{ color: "#1E00A3", fontWeight: "bold", marginTop: "40px", marginBottom: "30px" }}>Bringing joy to work-life</p>
          <div style={{ marginTop: "10px", textAlign: "left", marginLeft: "3px" }}>
            <p style={{ marginTop: "20px" }}>At Joye, we have a vision of bringing joy to work-life, to make mental wellbeing into a habit, the mental fitness habit - the '10,000 steps' of mental wellbeing!</p>
            <p style={{ marginTop: "20px" }}>Our mission is to weave mental wellbeing into the digital lifestyle. We believe this is a strategic enabler for us to be happier and successful. </p>
            <p style={{ marginTop: "20px" }}>Joye is an AI-powered, context-sensitive mental wellbeing service for everyone, every day. It is a plug and play SaaS to embed in a company or healthcare app. Imagine after a stressful call or a busy day, the Joye button smartly appears in front of you to make you productive again. It's easy!</p>
            <p style={{ marginTop: "20px" }}>In parallel, we encrypt and anonymise the data, and present it as the organisation's emotional health insight, without traditional surveys.</p>
            <p style={{ marginTop: "20px" }}>This makes Joye a strategic tool to measure and improve emotional health of the organisation. It’s time to upgrade your employee engagement for the new normal.</p>
            <p style={{ marginTop: "20px" }}>The team at Joye brings together expertise in business management, psychology and technology. We are anchored in Singapore, with teams working across the globe.</p>
            <p style={{ marginTop: "20px" }}>
            For enquiries please contact us at{" "}
              <a href="connect@joye.ai" style={{ color: "#1E00A3" }}>
              connect@joye.ai
              </a>
            </p>
          </div>
          
        </div>
      </BasePage>
    );
  }
}
