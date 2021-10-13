import * as React from "react";
import * as microsoftTeams from "@microsoft/teams-js";

import { BasePage } from "components/BasePage/index";
import "../Dashboards/Categories/index.scss";
const logo = require("../../resources/icons/LOGO_Square white_border.png");
const privacy = require("../../resources/icons/Privacy_icon.png");

export class FAQS extends React.PureComponent {
  componentDidMount() {
    microsoftTeams.initialize();
  }
  componentCleanup() {    
    microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/entity/6c75be83-05a8-4515-9c7b-b5f759b99b7f/joyeapp");
  }
  render() {
    return (
      <BasePage withCross showInfoIcon className="login-form home-screen" unload={this.componentCleanup.bind(this)}>
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
            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>How do I use Joye?</p>            
            <p>Joye's Daily Brew is as easy as 1-2-3!</p>
            <p>1: Speak your mind. You can speak, write or try guided reflection. Rest assured this is a safe and anonymised space.</p>
            <p>2: Joye will understand you and give you some good advice - just like your mentor or a dear friend would have guided you. You can also manage your daily joy level.</p>
            <p>3: Now you have a plan! Congratulations! You are ready to take on the rest of your day.</p>
            <p style={{ marginBottom: "10px", marginTop: "20px" }}>In addition, Joye will intelligently prompt you with notifications when we sense you need a break in your busy schedule. Joye's Stress buster will help you to recharge and boost your productivity again!</p>
            <p style={{ marginBottom: "10px", marginTop: "20px" }}>At every stage of the journey in Joye, you will see an info icon, which has detailed information on every feature and how to make the most of it!</p>
            <p style={{ marginBottom: "10px", marginTop: "20px" }}>Let’s make mental wellbeing into a habit, the mental fitness habit - your ‘10,000 steps’ of mental wellbeing!</p>
            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>Note: Your Teams administrator needs to approve permissions for you to use Joye in Teams. Please request your Teams administrator to do so.</p>
            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>How does Joye help my wellbeing?</p>
            <p>Positive Psychology has the power to make you think and behave in ways which will change the world around you. Joye has converted the science of Positive Psychology and Cognitive Behavior Therapy into an intelligent software for you to manage the emotional flux of your day to day work-life. Speak your mind and Joye will help you to stay positive and productive amidst your emotional flux.</p>
            <p>Some inspiring research:</p>

            <p style={{ marginBottom: "10px", marginTop: "20px" }}>Authentic Happiness, Dr Martin Seligman, University of Pennsylvania</p>
            <div style={{ marginTop: "-10px" }}>
              <a href="https://www.authentichappiness.sas.upenn.edu/">https://www.authentichappiness.sas.upenn.edu/</a>
            </div>

            <p style={{ marginBottom: "10px", marginTop: "20px" }}>Atlas of Emotions, Dr Paul Ekman and Dalai Lama</p>
            <div style={{ marginTop: "-10px" }}>
              <a href="http://atlasofemotions.org/">http://atlasofemotions.org/</a>
            </div>
            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>What information we collect from you, and how we use it</p>
            <p>No one is listening. You have our promise to protect your privacy with advanced technology and strict privacy policy.</p>
            <p>When you speak or write, we immediately anonymise your expression and no one can ever know what you spoke. Not only this, Joye’s technology is EU General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) compliant, to protect your privacy at the highest level. <a href="https://firebase.google.com/support/privacy">More Details</a></p>
            <p>Joye’s data is independently managed by Joye Pte Ltd, Singapore, and your organisation will not be able to see your private information. They will only see a high-level overview of the organisation’s wellbeing. This will enable your organisation to make more empathetic and responsive policy decisions to better serve the emotional needs of your organisation. Individual level information will not be visible to your organisation.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>Disclosure of your information to third parties</p>
            <p>We do not intend to use your personal profile and personal information for advertisements.</p>
            <p>Your organisation will not be able to access your personal information in Joye, as your identity is protected by our privacy policy and advanced technology. We may share high-level overview of organisation level trends, but the information will not be identifiable to individual users.</p>
            <p>We may only disclose your information to a third party where either you have asked this to be done, or if we are legally required to provide some information to the government or other legal governance agencies, which will be an exceptional scenario.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>Is Joye a clinical or psychiatric solution app?</p>
            <p>Joye is by no means a medical solution for any mental illness. Joye is not intended for use in the diagnosis of disease, illness or other conditions, or in the cure, mitigation, treatment or prevention of such conditions. It is not designed or intended to replace any health assessment of a patient, judgement of clinical professional, or any clinical assessment. The user should consult a medical or professional expert for any cases of mental illness or any other forms of illness or disease.</p>
            <p>In the case of an emergency, please reach out to your family, local community, help-lines or your organisation’s support services.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>Is Joye free to use?</p>
            <p>Joye is a paid service which your organisation will need to subscribe to. We are pleased to offer a free-of-charge trial period for now. Please ask your HR to reach us at: connect@joye.ai to subscribe.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>How can I get more information?</p>
            <p>
              You can read more about our Privacy policy and Terms of service. We may also choose to write to your organisation contacts. You may also write to us at{" "}
              <a href="connect@joye.ai" style={{ color: "#1E00A3" }}>
                connect@joye.ai
              </a>
              . Please mention your employer name as a reference.
            </p>
          </div>
        </div>
      </BasePage>
    );
  }
}
