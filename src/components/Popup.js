import React from 'react';
import { connect } from 'react-redux';
import { closePopup } from '../actions/main.js'


function Popup (RenderedComponent, props) {
   const Pop = (props) => {
      return(
        <div className='popup-window'>
          <p onClick={props.closePopup}>X</p>
          <RenderedComponent />
        </div>
      )
  }

  function mapDispatchToProps(dispatch) {
    return {
      closePopup: () => {
        dispatch(closePopup())
      }
    }
  }

  return connect(null, mapDispatchToProps)(Pop)
}

export default Popup
