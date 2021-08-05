import * as React from "react";
import { BasePage } from "components/BasePage/index";
import "../Dashboards/Categories/index.scss";
const logo = require("../../resources/icons/LOGO_Square white_border.png");
const shield = require("../../resources/icons/shield.png");

export class FAQS extends React.PureComponent {
  render() {
    return (
      <BasePage withMenu showInfoIcon>
        <div
          className="render-component"
          style={{
            background: "#ffffff",
            color: "#808080",
            padding: "20px",
            textAlign: "center",
            minHeight: "600px",
            height: "auto",
            width: "100%",
            alignContent: "center",
            fontFamily: "Nunito-Regular",
            fontSize: "16px",
            lineHeight: "24px",  
            maxWidth:"748px",
            margin: "0 auto",  
            position:"relative"
          }}
        >
          <div className="joye-logo" style={{ alignContent: "center", marginTop: "72px", marginBottom: "60px" }}>
            <img height="75px" width="75px" src={logo} />
          </div>

          <div  style={{ alignContent: "center", marginTop: "40px", marginBottom: "40px" }}>
            <img height="42px" width="42px" src={shield} />
          </div>
          <p>Welcome to Joye. Speak your mind and Joye will keep you positive and productive amidst your emotional flux. It’s easy!</p>
          <p style={{ marginTop: "20px" }}>You have our promise to protect your privacy. We use an unique encrypted identity to recognise you inside of Joye. We do not require your personal details - no name, no email address, no profile picture, no employee ID.</p>
          <p style={{ marginTop: "20px" }}>Your organisation will not be able to access your personal information inside of Joye. We may share organisation level trends, but the information will not be identifiable to you or any individual users.</p>

          <p style={{ color: "#1E00A3", fontWeight: "bold", marginTop: "100px" }}>FAQ</p>

          <div style={{ marginTop: "10px", textAlign: "left", marginLeft: "3px" }}>
            <p style={{ fontWeight: "bold", marginTop: "40px" }}>How does Joye help my wellbeing?</p>
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
            <p style={{ fontWeight: "bold", marginTop: "40px" }}>What information we collect from you, and how we use it</p>
            <p>You have our promise to protect your privacy. We use an unique encrypted identity to recognise you in Joye. We do not require your personal details - no name, no email address, no profile picture, no employee ID.</p>
            <p>Any other times your information is being used will be to understand your encrypted identity a little better, and to train our machine learning to serve you better. Furthermore, when you finish a session in Joye, your expression of feelings will be immediately anonymised, and any association with you will be deleted. So express yourself freely!</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>Disclosure of your information to third parties</p>
            <p>We do not intend to use your personal profile and personal information for advertisements.</p>
            <p>Your organisation will not be able to access your personal information in Joye, as your identity is nothing more than an encrypted number. We may share organisation level trends, but the information will not be identifiable to individual users.</p>
            <p>We may only disclose your information to a third party where either you have asked this to be done, or if we are legally required to provide some information to the government or other legal governance agencies, which will be an exceptional scenario.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>Is Joye a clinical or psychiatric solution app?</p>
            <p>Joye is by no means a medical solution for any mental illness. Joye is not intended for use in the diagnosis of disease, illness or other conditions, or in the cure, mitigation, treatment or prevention of such conditions. It is not designed or intended to replace any health assessment of a patient, judgement of clinical professional, or any clinical assessment. The user should consult a medical or professional expert for any cases of mental illness or any other forms of illness or disease.</p>
            <p>In the case of an emergency, please reach out to your family, local community, help-lines or your organisation’s support services.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "40px" }}>Is Joye free to use?</p>
            <p>It is a paid service which your organisation will have to subscribe for its employees or students.</p>

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
