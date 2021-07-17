import * as React from "react";
import { BasePage } from "components/BasePage/index";
import "../Dashboards/Categories/index.scss";
const logo = require("../../resources/icons/LOGO_Square white_border.png");
const shield = require("../../resources/icons/shield.png");

export class TermsofService extends React.PureComponent {
  render() {
    let Date = "01 July 2021";
    return (
      <BasePage withMenu>
        <div
          className="render-component"
          style={{
            background: "#ffffff",
            color: "#808080",
            padding: "10px",
            textAlign: "center",
            minHeight: "700px",
            height: "auto",
            width: "70%",
            marginLeft: "16.5%",
            alignContent: "center",
            fontFamily: "Nunito-Regular",
            fontSize: "16px",
            lineHeight: "24px"
          }}
        >
          <div style={{ alignContent: "center", marginTop: "72px", marginBottom: "60px" }}>
            <img height="75px" width="75px" src={logo} />
          </div>

          <div style={{ alignContent: "center", marginTop: "40px", marginBottom: "40px" }}>
            <img height="42px" width="42px" src={shield} />
          </div>
          <p>Welcome to Joye. Speak your mind and Joye will keep you positive and productive amidst your emotional flux. It’s easy!</p>
          <p style={{ marginTop: "20px" }}>You have our promise to protect your privacy. We use an unique encrypted identity to recognise you inside of Joye. We do not require your personal details - no name, no email address, no profile picture, no employee ID.</p>
          <p style={{ marginTop: "20px" }}>Your organisation will not be able to access your personal information inside of Joye. We may share organisation level trends, but the information will not be identifiable to you or any individual users.</p>

          <p style={{ color: "#1E00A3", fontWeight: "bold", marginTop: "100px" }}>Terms of Service</p>
          <p style={{ color: "#808080", marginTop: "-10px" }}>{Date}</p>

          <div style={{ marginTop: "10px", textAlign: "left", marginLeft: "3px" }}>
            <p>Welcome to Joye. Speak your mind and Joye will keep you positive and productive amidst your emotional flux. It’s easy!</p>
            <p>Joye is not a medical device or a clinical solution.</p>
            <p>
              These Terms of Service (Terms) are the terms under which Joye Pte Ltd (Joye, Us, We, Our, or Company) provides its services, which are accessible via <a href="www.joye.ai">www.joye.ai</a> (Site) and/or via Joye mobile device application (App) and/or Joye app in the Microsoft Teams interface. Any User (You) should read these terms of service carefully, as they govern the access to, and use of the App, including any services and information available through the Site and the App.
            </p>
          </div>

          <div style={{ marginTop: "10px", textAlign: "left", marginLeft: "3px" }}>
            <p style={{ fontWeight: "bold", marginTop: "40px" }}>Use Policies</p>
            <p>Joye app is by no means a medical solution or medical device for any mental illness. The App is not intended for use in the diagnosis of disease, illness or other conditions, or in the cure, mitigation, treatment or prevention of such conditions. It is not designed or intended to replace any health assessment of a patient, judgement of clinical professional, or any clinical assessment. The user should consult a medical or professional expert for any cases of mental illness or any other forms of illness or disease. The user should reach out to family, local community, health-care services, help-lines or your organisation support services for any emergency.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Agreement to Terms</p>
            <p>By using the App, you agree to be bound by these Terms, including the Privacy Policy. If for any reason, you do not agree to these Terms, please do not use the App.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Change of Terms</p>
            <p>We may modify these Terms from time to time at our sole discretion. In case of this happening, the date stated above will be revised. We may endeavour to bring this to your notice through an in-app notification, however, it is your responsibility to be updated of the latest version. The latest version of Terms will supersede all earlier versions. Your continued use of the App, after any update on these Terms, will indicate that you agree to be bound by the modified Terms. If you do not agree to be bound by the modified Terms, please refrain from using the App.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Eligibility</p>
            <p>You may use the App only if you are over 15 years old. Individuals under the age of 15, or the applicable age of majority, may use the App only with the consent of a parent or legal guardian or your organisation’s administrator.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Licence</p>
            <p>Subject to your compliance with these Terms, Joye grants you a limited non-exclusive, non- transferable, non-sub-licensable license to download and install a copy of the App on a device that you own or control and to run such copy of the App solely for your own non-commercial purposes.</p>
            <p>Joye, or its licensors (as applicable), reserves all rights, title and ownership in the App.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Restrictions</p>
            <p>You agree not to do any of the following, except if it is expressly permitted by applicable law, or as we may authorise expressly in writing:</p>
            <ul>
              <li>Store, copy, modify, or resell any of the information; audio, visual, and audio-visual works, or other content made available on our App (collectively, “Service Content”)</li>
              <li>Compile or collect any Service Content as part of a database or other work</li>
              <li>Use any automated tool (e.g. robots) to access or use our App or to store, copy, modify, distribute, or resell any Service Content</li>
              <li>Reverse engineer, decompile or disassemble the App</li>
              <li>Make the functionality of the App available to multiple users through any means</li>
              <li>Distribute, transfer, rent, lease, sublicense or lend your access to our App to another person</li>
              <li>Circumvent or disable any digital rights management, usage rules or other security features of our App</li>
              <li>Remove, alter, or obscure any proprietary notices (including copyright and trademark notices) on any portion of our App or any Service Content</li>
              <li>Use our App in a manner that overburdens, or that threatens the integrity, performance, or availability of our App</li>
              <li>Collect or store personal data about other users</li>
              <li>Transmit any medical or professional recommendations to other users</li>
              <li>Impersonate any person or entity, or otherwise misrepresent your affiliation with a person or entity</li>
              <li>Violate any applicable law or regulation</li>
              <li>Interfere with or disrupt the App, servers or networks connected to the App, or disobey any requirements, procedures, policies or regulations of networks connected to the App</li>
              <li>Transmit any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunication equipment</li>
              <li>Send any unsolicited or unauthorised advertising, promotional materials, emails, junk mail, spam, chain letters or other forms of solicitation</li>
              <li>Upload, post, email or otherwise transmit any submission that infringes any patent, trademark, trade secret, copyright or other right of any party</li>
              <li>Upload, post, email or otherwise transmit any submission that contains unlawful, harmful, threatening, abusive, harassing, defamatory or racially, ethically or otherwise objectionable.</li>
            </ul>
            <p>We also reserve the right, in our sole discretion, to reject, refuse to post, or remove any material that you post or submit for posting, and to restrict, suspend, or terminate your access to our App at any time, for any reason, with or without prior notice, and without liability in order to ensure compliance with these Terms.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Links and Third party content</p>
            <p>Our App may display, or contain links to third party products, services or other Apps. We provide these links only as a convenience and we are not responsible for the content, products or services in such cases. We do not control third party content and do not guarantee the accuracy, integrity or quality of such third party content. You acknowledge sole responsibility for and assume all risk arising from, your use of any third-party products, services or other Apps.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Copyright and Trademarks</p>
            <p>“Joye”, the Joye logo, Daily Brew, 4-3-3 Breathing along with all material used in the App are owned by Joye Pte Ltd, and may not be copied, imitated or used in whole or in part, without the prior written permission of Joye Pte Ltd, as any misuse of the trademarks as displayed in the App is strictly prohibited.</p>
            <p>You may not utilise any ‘hidden text’ utilising “Joye” or any other name, trademark or product or service name of features within the App without our prior written permission. All intellectual property, other trademarks, logos, images, feature, product and company names displayed or referred to on our App are the property of their respective owners.</p>
            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Warranties and Limitations</p>
            <p>We warrant that we will use reasonable skill in providing the App.</p>
            <p>The App and the Service Content are provided on an “as is” and “as available” basis. We make no representations or warranties of any kind with respect to them, including as to the accuracy, completeness or usefulness of the App or its Service content.</p>
            <p>We and our suppliers and licensors expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied indemnities and warranties of merchantability, fitness for a particular purpose, title and non-infringement. Your use of the App and the Service Content is at your sole risk and discretion and we assume no liability for any errors or omissions of the App and Service Content.</p>
            <p>Any material that you access, download or obtain through the App is done at your own discretion and risk, and we will not be responsible for any damage to your device or loss of data.</p>
            <p>All conditions, warranties and other terms which are not expressly stated in this agreement and which may otherwise be implied by statute, common law or the law of equity are, to the extent permitted by law, excluded.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Limitation of Liability</p>
            <p>We, the suppliers and licensors of the App will not be liable, to the extent permitted by law, for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages, lost profits, loss of data, goodwill or any other intangible losses resulting from your use of the App and Service Content.</p>
            <p>Under no circumstances Joye Pte Ltd, its suppliers and licensors shall be liable for any total liability to you, arising from or related to your use of the App and Service Content (including but not limited to warranty claims), that exceeds, in the aggregate, the amount, if any, that you or your organisation has paid to Joye Pte Ltd for your use of the App and Service Content for the twelve (12) month period prior to the claim. This is the case regardless of the forum and regardless of whether any action or claim is based on contract, tort, or otherwise.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Indemnity</p>
            <p>You will indemnify and hold harmless Joye Pte Ltd along with its suppliers, licensors, respective subsidiaries, affiliates, officers, agents, employees, representatives from any claims, costs, damages, expenses and liabilities caused by your</p>
            <ul>
              <p>1. use of the App and Service Content,</p>
              <p>2. violation of these Terms</p>
              <p>3. violation of any rights of a third party through use of the App or Service Content.</p>
            </ul>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Waiver</p>
            <p>No delay or failure of Joye to enforce any right or provision of these Terms will be considered a waiver of such right or provision. The waiver of any such right or provision will be effective only if in writing and signed by a duly authorised representative of Joye.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Entire Agreement</p>
            <p>These Terms and any documents expressly referred to in them constitute the whole agreement between Us and supersedes all previous discussions, correspondences, previous arrangements, understanding or agreements between Us relating to their subject matter.</p>
            <p>We acknowledge that neither of Us relies on, or will have any remedies in respect of, any representation or warranty (whether made innocently or negligently) that it is not set out in these Terms or the documents referred to in them.</p>
            <p>Each of Us agrees that our only liability in respect of those representations and warranties that are set out in the Terms (whether made innocently or negligently) will be for breach of contract.</p>
            <p>Nothing in this section limits or excludes any liability for fraud; death or personal injury caused by negligence.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Termination</p>
            <p>We reserve the right to discontinue, temporarily or permanently, all or any part of the App, without notice. We will not be liable to you or any third party for any suspension, or discontinuance of all or any part of the App.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Feedback</p>
            <p>We welcome feedback, suggestions and ideas, if you choose, about our App (“Feedback”). By submitting feedback, you grant to us and our assigns a perpetual, worldwide, fully transferable, sub-licensable, fully paid-up, irrevocable, royalty free license to use, reproduce, modify, create derivative works from, distribute, and display the Feedback in any manner for any purpose, without any obligation to provide attribution or compensation to you or any third party.</p>

            <p>
              Please feel free to contact Us for any feedback by writing to us to:{" "}
              <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>
                connect@joye.ai
              </a>
            </p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Applicable Laws</p>
            <p>You agree that all matters relating to your access to or use of the App and Service Content will be governed by the laws of the Republic of Singapore without regard to its conflicts of laws provisions.</p>
            <p>Any legal action or proceeding relating to your access to, or use of, the App or Service Content shall be instituted in courts at Singapore.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Agreement to Arbitrate</p>
            <p>You and JOYE PTE LTD agree to submit to the jurisdiction of the Republic of Singapore, and agree that the venue is proper in these courts in any such legal action or proceeding.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Severability</p>
            <p>If any provision of the Terms is prohibited by law or judged by a court to be unlawful, void or unenforceable, the provision shall, to the extent required, be severed from the Terms of Service, and rendered ineffective as far as possible without modifying the remaining provisions of the Terms, and shall not in any way affect any other provisions of or the validity or enforceability of the Terms.</p>

            <p style={{ fontWeight: "bold", marginBottom: "10px", marginTop: "20px" }}>Connect with Us</p>
            <p>If you have any questions regarding the App or these Terms, please contact us at:</p>
            <p>
              <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>
                connect@joye.ai
              </a>
            </p>
          </div>
        </div>
      </BasePage>
    );
  }
}
