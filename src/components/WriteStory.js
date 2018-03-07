import React from 'react';
import ContentItem from './writeStory/ContentItem'
import RichEditor from './writeStory/RichEditor'
import { EditorState }from 'draft-js'

class WriteStory extends React.Component {



  state = {
    story: []
  }

  save() {
    //TODO: body needs to include the following info
    // {
    //   title: '',
    //   user_id: '',
    //   body: {
    //     content: {},
    //     coverImage: '',
    //     shortDescription: ''
    //   }
    // }
  }

  componentWillUnmount() {
    //save
  }

  composeEditorObject() {
    return {key: new Date().getTime(), editorState: EditorState.createEmpty()}
  }

  componentDidMount = () => {
    this.setState({
      story: [ this.composeEditorObject() ]
    })
  }

  addItem = () => {
    this.setState({
      story: [...this.state.story, this.composeEditorObject() ]
    })
  }

  changeBody = (change, index) => {
    let state = this.state.story
    state[index].body = change
    state.splice(index + 1, 0, {type: 'text', body: '...'})
    this.setState({
      story: state
    })
  }

  deleteField = (order) => {
    let state = this.state.story.filter((element, index) => index !== order)
    this.setState({
      story: state
    })
  }

  _setLocalStorage = (jsonArray) => {
    let blockArray = localStorage.setItem('mediumRareTextBlocks', jsonArray)
  }

  insertNewAfter = (currentIndex) => {
    console.log(currentIndex)
    let editedStory = this.state.story
    editedStory.splice(currentIndex + 1, 0, this.composeEditorObject())
    this.setState({story: editedStory})
  }

  removeEditor = (currentIndex) => {
    const editedStory = this.state.story.filter((element, index) => index !== currentIndex)
    this.setState({
      story: editedStory
    })
  }

  render() {

    //let contentItems = this.state.story.map((cI,index) => <ContentItem createCodeBlock={this.createCodeBlock} deleteField={this.deleteField} changeBody={this.changeBody} key={index} order={index} data={cI} addItem={this.addItem} />)
    const storyItems = this.state.story.map((sI, index) => <RichEditor
                                                            editorState={sI.editorState}
                                                            key={sI.key}
                                                            order={index}
                                                            insertNewAfter={this.insertNewAfter}
                                                            removeEditor={this.removeEditor}
                                                            />
                                                        )
    return (
      <div>
        <h1 style={{marginLeft: '10%'}} contentEditable='true'>Title...</h1>
        {storyItems}
        <div onClick={this.addItem} style={{height: '80px', border: '1px solid black'}}></div>
      </div>
    )
  }
}

export default WriteStory

//<h1 contenteditable='true' onChange={this.handleTitleChange}>{this.state.title}</h1>
