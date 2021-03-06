import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
import FrontPage from './FrontPage';
import Profile from './Profile';
import Stories from './Stories';
import Settings from './Settings';
import Signout from './Signout';
import WriteStory from './WriteStory';
import Bookmarks from './Bookmarks';
import NoMatch from './NoMatch';
import Authorize from './Authorize'

class Body extends React.Component {

  render() {
    const username = localStorage.getItem('username')
    const AuthStories = (Authorize(Stories))
    const AuthSettings = (Authorize(Settings))
    const AuthSignout = (Authorize(Signout))
    const AuthWriteStory = (Authorize(WriteStory))
    const AuthBookmarks = (Authorize(Bookmarks))

    return (
      <div style={{padding: '20px'}}>
        <Switch>
          <Route exact path='/' component={FrontPage} />
          <Route path={`/@${username}`} component={Profile} />
          <Route path='/me/stories' render={(props) => <AuthStories {...props} />} />
          <Route path='/me/settings' render={(props) => <AuthSettings {...props} />} />
          <Route path='/signout' render={(props) => <AuthSignout {...props} />} />
          <Route path='/new-story' render={(props) => <AuthWriteStory {...props} />} />
          <Route path='/browse/bookmarks' render={(props) => <AuthBookmarks {...props} />} />
          <Route component={NoMatch} />
        </Switch>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    username: state.user.username
  }
}

export default withRouter(connect(mapStateToProps)(Body))

// <Switch>
//   <Route exact path='/' component={Home} />
//   <Route path='/palates' component={PalatesContainer} />
//   <Route path='/logout' component={Logout} />
//   <Route path="/login" render={(props) => <AuthLoginForm {...props}/> }/>
//   <Route path="/signup" render={(props) => <AuthSignupForm {...props}/> }/>
//   <Route path='/edit' component={SVGEdit} />
//   <Route path={`/${username}/palates`} component={MyPalates} />
// </Switch>
