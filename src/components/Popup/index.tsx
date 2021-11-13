/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Button } from '../FormComponents';

const Popup = (props: any) => {
  const { screenMessage, text, closePopup, showCloseButton } = props;
  return (
    <div onClick={() => closePopup()} className="popup">
      <div
        className="popup_inner"
        onClick={(e) => {
          // e.stopPropagation();
        }}
      >
        <div className="para-scroll">
          {text && <h1 className="popup_head">{text}</h1>}
          {screenMessage && screenMessage.length > 0 && screenMessage.map((msg, i) => (
            <p key={i} className="popup_para" style={{ marginTop: i > 0 ? 20 : 0 }}>{msg}</p>
          ))}
          {showCloseButton && 
            <Button 
              Loader={null} 
              type="button" 
              onClick={() => closePopup()} 
              marginTop={"20px"} 
              fontWeight={600} 
              fontSize="16.67px"
              display="flex"
              justifyContent="center"
            >
              ok
            </Button>
          }
        </div>
        {/* <button className="popup_cancel_button" onClick={closePopup}>Cancel</button> */}
      </div>
    </div>
  );  
}

export default Popup;
