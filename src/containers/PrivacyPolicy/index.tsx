import * as React from "react";
import { BasePage } from "src/components";
import "../Dashboards/Categories/Main/index.scss";
import "src/resources/css/fonts/fonts.css";
const logo = require("../../resources/icons/LOGO_Square white_border.png");
const shield = require("../../resources/icons/Newshield.svg");
const privacy = require("../../resources/icons/Privacy_icon.png");

export class PrivacyPolicy extends React.PureComponent {
  
  componentCleanup(e) { // this will hold the cleanup code
    if (e) {
      e.preventDefault();
    }
    microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/entity/6c75be83-05a8-4515-9c7b-b5f759b99b7f/joyeapp");
  }

  componentWillUnmount() {
    this.componentCleanup(undefined);
    window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
  }

  render() {
    let Date = "01 July 2021";
    return (
      <>
        <BasePage withCross showInfoIcon className="login-form home-screen deepbreath-page" unload={this.componentCleanup.bind(this)}>
          <div
            className="render-component"
            style={{
              width: "100%",
            }}
          >
            <div className="joye-logo" style={{ alignContent: "center", marginTop: "72px", marginBottom: "60px" }}>
              <img height="75px" width="75px" src={logo} />
            </div>

            <div style={{ alignContent: "center", marginTop: "40px", marginBottom: "40px" }}>
              {/* <img height="42px" width="42px" src={shield} /> */}
              <img height="125px" width="93px" src={privacy} />
            </div>
            <div className="text-left">
            <p>No one is listening. You have our promise to protect your privacy with advanced technology and strict privacy policy.</p>
            <p style={{ marginTop: "20px" }}>When you speak or write, we immediately anonymise your expression and no one can ever know what you spoke. Not only this, Joye’s technology is EU General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) compliant, to protect your privacy at the highest level. <a style={{ color: "#1E00A3"}} href="https://firebase.google.com/support/privacy">More Details</a> </p>
            <p style={{ marginTop: "20px" }}>Joye’s data is independently managed by Joye Pte Ltd Singapore, and your organisation will not be able to see your private information. They will only see a high-level overview of the organisation’s wellbeing. This will enable your organisation to make more empathetic and responsive policy decisions to better serve the emotional needs of your organisation. Individual level information will not be visible to your organisation.</p>
            <p style={{ marginTop: "20px" }}>Speak your mind freely!</p>
            <p style={{ marginTop: "20px" }}>While you help yourself, you are also helping your organisation to serve you better.</p>
            </div>
            <p style={{ color: "#1E00A3", fontWeight: "bold", marginTop: "100px" }}>Privacy Policy</p>
            <p style={{ color: "#808080"}}>1st September 2021</p>

            <p style={{ color: "#1E00A3", fontWeight: "bold", marginTop: "110px" }}>Privacy Policy</p>
            <p style={{ fontWeight: "bold" }}>(Summary)</p>

            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>What information we collect from you, and how we use it</p>
              <p>No one is listening. You have our promise to protect your privacy with advanced technology and strict privacy policy.</p>
              <p style={{ marginTop: "20px" }}>When you speak or write, we immediately anonymise your expression and no one can ever know what you spoke. Not only this, Joye’s technology is EU General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) compliant, to protect your privacy at the highest level. <a style={{ color: "#1E00A3"}} href="https://firebase.google.com/support/privacy">More Details</a> </p>
              <p style={{ marginTop: "20px" }}>Joye’s data is independently managed by Joye Pte Ltd Singapore, and your organisation will not be able to see your private information. They will only see a high-level overview of the organisation’s wellbeing. This will enable your organisation to make more empathetic and responsive policy decisions to better serve the emotional needs of your organisation. Individual level information will not be visible to your organisation.</p>
            </div>

            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Disclosure of your information to third parties</p>
              <p>We do not intend to use your personal profile and personal information for advertisements.</p>
              <p>Your organisation will not be able to access your personal information in Joye, as your identity is protected by our privacy policy and advanced technology. We may share high-level overview of organisation level trends, but the information will not be identifiable to individual users.</p>

              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Where is your data stored and how we ensure that it is secure</p>
              <p>We store your data in a secure datacenter of a leading Cloud service provider. In most cases we endeavour to host this in Singapore or the USA. Joye’s technology is EU General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) compliant, to protect your privacy at the highest level. <a href="https://firebase.google.com/support/privacy">More Details</a></p>
              <p>We have architected the design and the processes to ensure that all transmissions are secure using technical and physical security measures.</p>
            </div>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Contact information</p>
            <p>
              We are an email away. Please contact us at{" "}
              <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>
                connect@joye.ai
              </a>
            </p>

            <p style={{ color: "#1E00A3", fontWeight: "bold", marginTop: "140px" }}>Privacy Policy</p>
            <p style={{ fontWeight: "bold" }}>(detailed)</p>
            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p>This Privacy Policy will inform you of the basis on which we collect personal information from you and the basis on which it is used, processed or disclosed by us. This Privacy Policy does not apply to any third-party websites, services or applications, even if they are accessible through our product.</p>
              <p>Joye Pte Ltd (Joye, Us, We, Our or Company) is committed to protecting and respecting your privacy in connection with your use of our Products (App or Site) and accompanying services and features thereof. In this Privacy Policy, references to You, or User indicates the person whose personal data we collect, use and process.</p>
              <p>At the outset, please be assured that we will use your personal data only for the purposes and in the manner outlined below, and in compliance with applicable laws. We request that you read this Privacy Policy carefully to understand our treatment and use of personal data. Please note that by using our Product, you acknowledge that you have read and understood this Privacy Policy.</p>
              <p>
                In case of any further doubts and clarifications, you can reach out to us at{" "}
                <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>
                  connect@joye.ai
                </a>{" "}
                and we will endeavour to address your concern at the earliest.
              </p>
            </div>

            <div style={{ marginTop: "50px" }}>
              <p style={{ fontWeight: "bold" }}>Information we collect from you and how we use </p>
            </div>
            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Sign up and Sign in</p>
              <p>You will use your Microsoft Teams login credentials to gain access to Joye. Once One the access is granted through Microsoft’s Active Directory authentication services (in some cases pre-approved by your organisation), we only collect your unique system-identity, example, organisation identity, your Microsoft Teams ID, your email. We do not need your personal details - no name, no picture.</p>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>In-app features</p>
              <p>When you speak or write to express your feelings, our AI algorithm will process this to understand your context and will respond appropriately to recommend tips and nudges to enhance your mental wellbeing.</p>
              <p>
                By using our in-app Journal text entry service (not the ‘how are you feeling today’ text input, only the journal text input), you grant Joye consent to store your text recording in its secure database to enable you to revisit it within the app. Users may request and obtain removal of such posted content by contacting us at{" "}
                <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>
                  connect@joye.ai
                </a>{" "}
                and specifically identifying the content to be removed. Please be advised that despite our best efforts, this may take time as we will only have your encrypted identity in our records and the process may be manual. In addition any such removal may not ensure complete or comprehensive removal of all traces of the content posted.
              </p>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Notifications</p>
              <p>In the matters of mental wellbeing, it is mostly about the timing of the care. In addition to our in-app context-sensing AI algorithm we endeavour to sense your calendar and chat activity and usage patterns inside of Microsoft Teams to try to assist your mental wellbeing needs at the appropriate time. We may track some basic usage patterns in your free/busy time and frequency of chat services. We encourage users to keep notifications on to get the right care at the right time. In doing so, we do not access any content in your calendar or chat or any other place in your personal systems.</p>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Financial Information</p>
              <p>Joye does not collect or process credit or debit cards or any other payment related information.</p>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>General information</p>
              <p>Just like any other application, we may also have access to the operating system version on your device, the device type and system performance information. This will enable us to understand your broad, non-specific geographic location to help us identify groups of users by general geographic market (such as zip code, state or country).</p>
              <p>We use analytics software to allow us to better understand the functionality of our software. This software may record information such as how often you engage with the Products, the events that occur within the Products, aggregated usage and performance data, and where the Applications were downloaded from. We may link the information we store within the analytics software to other information available to us.</p>
              <p>We gather certain information automatically and store it in log files. This information may include Internet Protocol (IP) addresses, browser type, Internet service provider (ISP), referring/exit pages, operating system, date/time stamp, and/or clickstream data. Details of your visits to and interactions with the Products including, but not limited to, traffic data, location data, weblogs and other communication data, whether this is required for our own billing purposes or otherwise and the resources that you access.</p>
            </div>
            <div style={{ marginTop: "50px" }}>
              <p style={{ fontWeight: "bold" }}>Legal basis for processing your personal data</p>
            </div>
            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p>We will use your Personal Data for the purposes for which we collect it as listed below, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose. If we need to use your Personal Data for an unrelated purpose, we will update this Privacy Policy and we will explain the legal basis, which allows us to do so.</p>
              <p>In respect of each of the purposes for which we use your Personal Data, we ensure that we have a 'legal basis’ for that use. Most commonly, we will rely on one of the following legal bases:</p>
              <p>Where we need to perform a contract we are about to enter into or have entered into with you (ContractualNecessity).</p>
              <p>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests (Legitimate Interests).</p>
              <p>Where we need to comply with a legal or regulatory obligation (Compliance with Law).</p>
              <p>Where we have your specific consent to carry out the processing for the Purpose in question (Consent).</p>
            </div>
            <div style={{ marginTop: "50px" }}>
              <p style={{ fontWeight: "bold" }}>Your rights related to your Personal Data</p>
            </div>
            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>The right to access your Personal Data</p>
              <p>This right enables you to receive a copy of the Personal Data we hold about you and to check that we are lawfully processing it.</p>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>The right to rectification of errors</p>
              <p>In the event that any information that we hold about you is incomplete, partially incorrect or incorrect in its entirety, this right enables you to have any such data corrected.</p>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>The right to removal of data</p>
              <p>This right enables you to ask us for deletion or removal of your Personal data where there is no good reason for us to continue processing it. You also have the right to ask us to delete or remove your Personal Data where you have exercised your right to object to processing (see below).</p>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>The right to object to processing of your Personal Data</p>
              <p>This right exists where we are relying on a legitimate interest as the legal basis for our processing and there is something about your particular situation, which makes you want to object to processing on this ground.</p>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>The right to data portability</p>
              <p>We will provide to you, or a third party you have chosen, your Personal Data in a structured, commonly used, machine- readable format. Note that this right only applies to automated information which you initially provided consent for us to use or where we used the information to perform a contract with you.</p>
              <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>The right to withdraw consent</p>
              <p>This right only exists where we are relying on consent to process your Personal Data (“Consent Withdrawal”). If you withdraw your consent, we may not be able to provide you with access to the certain specific functionalities of our Products. We will advise you if this is the case at the time you withdraw your consent.</p>
              <p>Please note that whenever you request any of the above, we will take necessary steps to verify your identity in accordance with the applicable law. This is a security measure to ensure that Personal Data is not disclosed to any person who has no right to receive it. Further, except in relation to Consent Withdrawal, we may charge a reasonable fee if your request is manifestly unfounded, repetitive or excessive, or, we may refuse to comply with your request in these circumstances.</p>
              <p>We try to respond to all legitimate requests within 30 days. Occasionally it may take us longer if your request is particularly complex or you have made a number of requests.</p>
            </div>
            <div style={{ marginTop: "50px" }}>
              <p style={{ fontWeight: "bold" }}>Disclosure of your information to third parties</p>
            </div>
            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p>Your identity within Joye is an encrypted unique identity and not associated with your personal identity outside of the Joye. Your organisation will not be able to access your information inside of Joye, as your identity is nothing more than an encrypted number which is encrypted. We may share organisation level trends, but the information will not be identifiable to individual users.</p>
              <p>We may disclose your information, to third parties as follows:</p>
              <p>In some circumstances, based on your specific requests, we may need to disclose your personal information to a third party so that they can provide a service you have requested from such a party, or fulfill a request for information from such a party.</p>
              <p>In the event that we sell or buy any business or assets, in which case we may disclose your personal information to the prospective seller or buyer of such business or assets.</p>
              <p>If Joye or substantially all of our assets are acquired by a third party, in which case personal information held by us about our customers will be one of the transferred assets.</p>
              <p>If we are under a duty to disclose or share your personal information in order to comply with any legal obligation such as to comply with a subpoena, bankruptcy proceedings, similar legal process, or in order to enforce or apply our agreements with you; or to protect the rights, property, or safety Joye, our customers, or others. This includes exchanging information with other companies and organisations for the purposes of fraud protection or similar scenarios.</p>
            </div>

            <div style={{ marginTop: "50px" }}>
              <p style={{ fontWeight: "bold" }}>Minors using Joye</p>
            </div>
            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p>Joye is designed for users 15 years of age and above. Individuals under the age of 15, or otherwise the applicable age of majority, can use the services offered by the Product only with the involvement and consent of a parent or legal guardian and under such parent or legal guardian’s account who is otherwise subject to this Privacy Policy. However, the Products are not intended to be used by children under 15 and we do not knowingly collect personal data from minors. If a parent or legal guardian learns that their child has provided us with personal data without their consent, they may contact us as set forth below. If we learn that we have collected any personal data in violation of applicable law, we will promptly take steps to delete such personal data and terminate the minor’s account.</p>
            </div>

            <div style={{ marginTop: "50px" }}>
              <p style={{ fontWeight: "bold" }}>Where your data is stored and how we ensure it’s security</p>
            </div>
            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p>security All information you provide to us through the Products is stored on our cloud service providers secure servers, at most times located in Singapore or USA. On request and mutual agreement with the organisation, we could also consider storing your data in a mutually agreed country.</p>
              <p>Any payment transactions, if any, will be encrypted using SSL technology; all payment information is stored with our payment processor and is never stored on Joye’s servers.</p>
              <p>Just like it can be said of any other application or any forum of the web, the transmission of information via the Internet is never completely secure. Although we will do our best to protect your personal information, we cannot guarantee the security of your information transmitted to the Products; any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorized access.</p>
              <p>Joye operates and uses appropriate technical and physical security measures to protect your personal data. We have partnered with leading cloud service providers to protect your personal data from accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. Access is only granted on a need-to-know basis to those people whose roles require them to process your personal data. All your personal data by which you can be identified, we will destroy, as per our policies, after you have requested to deactivate your Joye account.</p>
              <p>You are also responsible for helping to protect the security of your personal data. Furthermore, you are responsible for maintaining the security of any device on which you utilize the Services. Unfortunately, no system is 100% secure, and we cannot ensure or warrant the security of any personal data you provide to us. To the fullest extent permitted by applicable law, we do not accept liability for unintentional disclosure.</p>
            </div>

            <div style={{ marginTop: "50px" }}>
              <p style={{ fontWeight: "bold" }}>Revisions to Privacy Policy</p>
            </div>
            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p>Any information that is collected via our Product is covered by the Privacy Policy in effect at the time such information is collected. We may revise this Privacy Policy from time to time. If we make any material changes to this Privacy Policy, we’ll notify you of those changes by posting them on the Product or by sending you an email or other notification as required by applicable law, and we will update the “Last Updated Date” above to indicate when those changes will become effective. You understand and agree that you will be deemed to have accepted the updated Privacy Policy if you use the Product after the updated Privacy Policy is posted on the Product. Additionally, before we use Personal Information for any new purpose not originally authorized by you, we will endeavor to provide information regarding the new purpose and give you the opportunity to opt- out. Where consent of the individual for the Processing of Personal Information is otherwise required by law or contract, Joye will endeavor to comply with the law or contract.</p>
            </div>

            <div style={{ marginTop: "50px" }}>
              <p style={{ fontWeight: "bold" }}>Contact information</p>
            </div>
            <div style={{ marginTop: "30px", textAlign: "left", marginLeft: "3px" }}>
              <p>We will be happy to provide any other information that you consider relevant to enable you to exercise your rights, or hear back from you if you have any queries or suggestions about this Privacy Policy.</p>
              <p>Please contact Joye’s Data Protection Officer at:</p>
              <p>
                <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>
                  connect@joye.ai
                </a>
              </p>
            </div>
          </div>
        </BasePage>
      </>
    );
  }
}
