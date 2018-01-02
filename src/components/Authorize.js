import React from 'react';
import { Redirect } from 'react-router-dom';

function Authorize(RenderedComponent, props) {
  return class extends React.Component {
    checkpath(location) {
      return (/\/me\/stories|\/me\/settings|\/browse\/bookmarks|\/signout/.test(location))
    }
    render() {
      const hasToken = !!localStorage.getItem('jwtToken')
      const location = this.props.location.pathname
      if(!hasToken && this.checkpath(location)) {
        return <Redirect to={'/'} />
      } else {
        return <RenderedComponent {...this.props} {...props} />
      }
    }
  }
}

export default Authorize
