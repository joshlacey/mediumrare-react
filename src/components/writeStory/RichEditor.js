import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
import '../../styles/rich-editor.css'
import StyleButton from './StyleButton'
import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'

//
// function myKeyBindingFn(event) {
//   if (event.keyCode === 8 /* es */ && KeyBindingUtil.hasCommandModifier(event) && !this.state.editorState.hasText()) {
//     console.log('removeEditor')
//     return 'removeEditor';
//   }
//   return getDefaultKeyBinding(event);
// }



class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: this.props.editorState, focused: true};
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.onTab = this._onTab.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }


  _handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleKeyPress = (e) => {
    console.log(this.focus)
    if(e.keyCode === 8 && !this.state.editorState.getCurrentContent().hasText()){
      console.log('removed')
      this.props.removeEditor(this.props.order)
      return true
    }
    return false
  }

  handleFocus = (e) => {
    this.setState({focused: true})
  }
  handleBlur = (e) => {
    this.setState({focused: false})
  }

  save = () => {
    const string = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    console.log(string)
    this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(string))) })
  }

  insertNewAfter = () => {
    this.props.insertNewAfter(this.props.order)
    this.setState({focused: false})
  }

  render() {
    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    const focused = this.state.focused

    return (
      <div className="RichEditor-wrapper">

        {focused ? (
          <div>
            <button onClick={this.save}>Save</button>
            <div className="mockButton" onMouseDown={this.insertNewAfter}>+</div>
          </div>
        ): null}

        <div onFocus={this.handleFocus} onBlur={this.handleBlur} onKeyDown={this.handleKeyPress} className="RichEditor-root">

          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder="..."
              ref="editor"
              spellCheck={true}
            />
          </div>

          {focused ? (
              <div>
                <BlockStyleControls
                  editorState={editorState}
                  insertNewAfter={this.props.insertNewAfter}
                  onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                  editorState={editorState}
                  onToggle={this.toggleInlineStyle}
                />
              </div>
          ) : null }

        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}



export default RichEditor
