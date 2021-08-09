/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import legend from 'src/resources/icons/stack_i.png';

class LegendPopup extends React.Component<any> {
  render() {
    const { closePopup } = this.props;
    return (
      <div onClick={() => closePopup()} className="popup">
        <div
          className="popup_inner"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <div className="para-scroll">
            {/* <h1 className="popup_head">{text}</h1> */}
            <img src={legend} alt="legend" />
          </div>
          {/* <button className="popup_cancel_button" onClick={closePopup}>Cancel</button> */}
        </div>
      </div>
    );
  }
}

export default LegendPopup;
