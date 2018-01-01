import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DraftsPublic from './DraftsPublic';
import { withRouter } from 'react-router';

const Stories = (props) => {

  return (
    <div>
      {
        <div>
          <Route path={props.match.url + '/drafts'} component={DraftsPublic}/>
          <Route path={props.match.url + '/public'} component={DraftsPublic}/>
        </div>
      }
      stories component
    </div>
  )
}

export default Stories
