import React from 'react'
import { connect } from 'react-redux'
import Parser from 'html-react-parser';

class Body extends React.Component {

  render() {
    const stories = this.props.stories.map(s => ( <li key={s.title}><h1>{s.title}</h1>{Parser(s.body.html)}</li> ))
    return (
      <div>
        <h1>Body goes here</h1>
        <ul>
          {stories}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stories: state.story.stories
  }
}

export default connect(mapStateToProps)(Body)
