import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showUserOptionsPopup } from '../../actions/user.js'

const UserOptionsPopup = (props) => {
  
  const menuOptions = [
    {title: 'New Story', path: '/new-story'},
    {title: 'Stories', path: '/me/stories/drafts'},
    {title: 'Bookmarks', path: '/browse/bookmarks'},
    {title: 'Profile', path: `/@${props.username}`},
    {title: 'Settings', path: '/me/settings'},
    {title: 'Signout', path: '/signout'}
  ]

  const handleClick = () => {
    props.showUserOptionsPopup()
  }

  const listItems = menuOptions.map(item => (<li key={item.title}><Link to={item.path} onClick={handleClick}>{item.title}</Link></li>))

  return(
    <ul>
      {listItems}
    </ul>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    showUserOptionsPopup: () => {
      dispatch(showUserOptionsPopup())
    }
  }
}

export default connect(null, mapDispatchToProps)(UserOptionsPopup)
