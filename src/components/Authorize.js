import React from 'react';
import { Redirect } from 'react-router-dom';

function Authorize(RenderedComponent, props) {
  return class extends React.Component {
    render() {
      const hasToken = !!localStorage.getItem('jwtToken')
      const location = this.props.location.pathname
      if(!hasToken && location == ('/me/stories' || '/me/settings' || '/new-story' || '/browse/bookmarks' || '/signout')) {
        return <Redirect to={'/'} />
      } else {
        return <RenderedComponent {...this.props} {...props} />
      }
    }
  }
}

export default Authorize
