import React from 'react';
import FeaturedStoryItem from './frontPage/FeaturedStoryItem'

class FrontPage extends React.Component{
  state={
    featured: [],
    tags: []
  }

  getFeatured() {
    const params = { method: 'GET', headers: {'Content-Type':'application/json'}, cache: 'no-cache' }
    fetch(process.env.REACT_APP_API_ENDPOINT + 'popular-tags', params)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({tags: resp.tags})
      })
    fetch(process.env.REACT_APP_API_ENDPOINT + 'featured-stories', params)
      .then(resp => resp.json())
      .then(stories => {
        this.setState({featured: stories.story})
      })
  }

  componentDidMount() {
    this.getFeatured()
  }

  render() {
    const { featured } = this.state
    // const tagItems = tags.map(tag => {})
    const featuredItems = featured.map((fS) => <FeaturedStoryItem key={fS.id} title={fS.title}/>)

    return(
      <div>
        <h1>Featured</h1>
        {featuredItems}
      </div>

    )
  }
}

export default FrontPage
