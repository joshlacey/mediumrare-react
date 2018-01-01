import React from 'react';
import { connect } from 'react-redux';
import { searchStories } from '../../actions/stories';

class SearchStories extends React.Component {
  state = {
    searchTerm: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const term = this.state.searchTerm
    if (term !== '') {
      this.props.search(term)
      this.setState({searchTerm: ''})
    }
  }

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render () {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Search MediumRare' onChange={this.handleChange} value={this.state.searchTerm}/>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    search: (searchTerms) => {
      dispatch(searchStories(searchTerms))
    }
  }
}

export default connect(null, mapDispatchToProps)(SearchStories)
