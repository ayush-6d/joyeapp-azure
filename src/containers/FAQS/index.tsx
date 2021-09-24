import * as React from "react";
import { BasePage } from "components/BasePage/index";
import "../Dashboards/Categories/index.scss";
const logo = require("../../resources/icons/LOGO_Square white_border.png");
const shield = require("../../resources/icons/shield.png");
const privacy = require("../../resources/icons/Privacy_icon.png");

export class FAQS extends React.PureComponent {
  render() {
    return (
      <BasePage withCross showInfoIcon className="login-form home-screen">
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
            maxWidth: "748px",
            margin: "0 auto",
            position: "relative"
          }}
        >
          <div className="joye-logo" style={{ alignContent: "center", marginTop: "72px", marginBottom: "60px" }}>
            <img height="75px" width="75px" src={logo} />
          </div>

          <div style={{ alignContent: "center", marginTop: "40px", marginBottom: "40px" }}>
            <img height="125px" width="93px" src={privacy} />
          </div>

          <div style={{ marginTop: "10px", textAlign: "left", marginLeft: "3px" }}>
            <p style={{ fontWeight: "bold", marginTop: "40px" }}>How do I use Joye?</p>
            <br></br>
            <p>Joye's Daily Brew is as easy as 1-2-3!</p>
            <p>1: Speak your mind. You can speak, write or try guided reflection. Rest assured this is a safe and anonymised space.</p>
            <p>2: Joye will understand you and give you some good advice - just like your mentor or a dear friend would have guided you. You can also manage your daily joy level.</p>
            <p>3: Now you have a plan! Congratulations! You are ready to take on the rest of your day.</p>
            <p style={{ marginBottom: "10px", marginTop: "20px" }}>In addition, Joye will intelligently prompt you with notifications when we sense you need a break in your busy schedule. Joye's Stress buster will help you to recharge and boost your productivity again!</p>
            <p style={{ marginBottom: "10px", marginTop: "20px" }}>At every stage of the journey in Joye, you will see an info icon, which has detailed information on every feature and how to make the most of it!</p>
            <p style={{ marginBottom: "10px", marginTop: "20px" }}>Let’s make mental wellbeing into a habit, the mental fitness habit - your ‘10,000 steps’ of mental wellbeing!</p>
          </div>
        </div>
      </BasePage>
    );
  }
}
