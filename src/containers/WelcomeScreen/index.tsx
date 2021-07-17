import * as React from 'react';
import { BasePage } from 'src/components';
import pageHeader from '../../resources/icons/pageHeader.png'
import { Button } from 'components/FormComponents/index';
import './index.scss';
export interface IWelcomeScreenProps {
}
export class WelcomeScreen extends React.PureComponent<IWelcomeScreenProps, {}> {
  constructor(props: IWelcomeScreenProps) {
    super(props);
  }
  handleSubmit = () => {

  }
  render() {
    return (
      <BasePage className="login-form">
        <div className="pageHeader">
          <img src={pageHeader} />
        </div>
        <div className='' style={{
          background: '#1f00a4', color: '#fff', padding: '20px',
          textAlign: 'center'
        }}>
          <div className="text-container">
            <div className="advertise-text bold">
              Congratulations!</div>
          </div>
          <div className="text-container">
            <div className="advertise-text bold">
              Be your best, every day!</div>
          </div>
          <div className="button-wrapper">
          </div>
          <div className="text-container">
            <div className="advertise-text">
              <span className="dont-have-account-text">Speak your mind and Joye’s context sensitive suggestions will keep you positive and productive amidst your emotional flux.</span></div>
          </div>
          <div className="text-container">
            <div className="advertise-text">
              <span className="dont-have-account-text">Joye’s AI is trained to recognise your unique situation with extreme privacy, and it will guide you to the right care at the right time. These suggestions include mood analytics, contextual behaviour tips and bite-sized podcasts.</span></div>
          </div>
          <div className="text-container">
            <div className="advertise-text">
              <span className="dont-have-account-text">It is time to make mental wellbeing into a habit, the mental fitness habit!
              </span></div>
          </div>
          <div className="button-wrapper" style={{ marginTop: '60px', marginBottom: '60px' }}>
            <Button type="button" onClick={this.handleSubmit} fontWeight={600} fontSize="16.67px" >
              Begin

            </Button>
          </div>
        </div>
      </BasePage >
    );
  }
}

