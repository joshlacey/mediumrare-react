import React from 'react';
import Parser from 'html-react-parser';

class TextFieldComp extends React.Component {

  state={
    body: '...',
    change: ''
  }

  handleClick = () => {
    if (document.getElementById(`${this.props.order.toString()}textField`).innerHTML === '...'){
      this.setState({
        body: ''
      })
    }
  }

  checkForKeyCombo = (e) => {
      console.log(e.key)
      if(e.ctrlKey && e.key !== ''){
        switch(e.key){
          case 'b':
            return this.checkSelection('STRONG')
          case 'i':
            return this.checkSelection('em')
          case 'u':
            return this.checkSelection('u')
          case 'w':
            return this.removeFormatting()
          default:
            null
        }
      }
    }

  // getSelection (tagName) {
  //    var tag = document.createElement(tagName);
  //     if (window.getSelection) {
  //         var sel = window.getSelection();
  //         if (sel.rangeCount) {
  //             var range = sel.getRangeAt(0).cloneRange();
  //             range.surroundContents(tag);
  //             sel.removeAllRanges();
  //             sel.addRange(range);
  //         }
  //     }
  // }

  removeFormatting = () => {
    if(window.getSelection){
      let newtextField = document.getElementById(`${this.props.order.toString()}textField`).innerHTML
      let find = window.getSelection().baseNode.parentNode.outerHTML
      console.log(find)
      let replacement = find.replace(/<\/?strong>|<\/?em>|<\/?i>/g, '')
      newtextField = newtextField.replace(find, replacement)
      console.log(newtextField)
      this.setState({change: newtextField})
    }
  }

  checkSelection = (tagName) => {
    console.log('called')
      let tag = document.createElement(tagName)
      if(window.getSelection){
        let selection = window.getSelection()
        console.log(selection)
        let range = selection.getRangeAt(0)
        console.log(range)
        let selectedContents = range.extractContents()
        tag.appendChild(selectedContents)
        range.insertNode(tag)
        console.log('final', document.getElementById(`${this.props.order.toString()}textField`).innerHTML)
      }
  }

  updateBody = (e) => {
    console.log('updateBody')
    let textField = document.getElementById(`${this.props.order.toString()}textField`).innerHTML
    if(textField === '<br>'){this.setState({body:''})}
    if (e.key === 'Enter' && (getCaretPosition() === textField.length)) {
      //createNew Component
      let change = textField
      this.props.changeBody(change, this.props.order)
    } else if ((e.key === 'Backspace') && (textField === '' || textField === '<br>')){
      this.props.deleteField(this.props.order)
    } else if ((e.key ==='`' ) && textField ==='``'){
      //createCodeBlock
      this.props.createCodeBlock(this.props.order)
    }
    if(this.state.change){
      console.log(this.state)
      document.getElementById(`${this.props.order.toString()}textField`).innerHTML = ''
      this.setState({body: this.state.change, change: ''})
      this.forceUpdate()
    }

  }

  render() {
    return (
      <div id={this.props.order.toString() + 'textField'} onKeyUp={this.updateBody} onKeyDown={this.checkForKeyCombo} onClick={this.handleClick} style={{display: 'inline-block'}} contentEditable='true'>
        {Parser(this.state.body)}
      </div>
    )
  }
}



function getCaretPosition() {
  if (window.getSelection && window.getSelection().getRangeAt) {
    var range = window.getSelection().getRangeAt(0);
    var selectedObj = window.getSelection();
    var rangeCount = 0;
    var childNodes = selectedObj.anchorNode.parentNode.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
      if (childNodes[i] == selectedObj.anchorNode) {
        break;
      }
      if (childNodes[i].outerHTML)
        rangeCount += childNodes[i].outerHTML.length;
      else if (childNodes[i].nodeType == 3) {
        rangeCount += childNodes[i].textContent.length;
      }
    }
    return range.startOffset + rangeCount;
  }
  return -1;
}

export default TextFieldComp
