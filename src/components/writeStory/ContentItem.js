import React from 'react';
import TextFieldComp from './TextFieldComp.js';
import CodeBlock from './CodeBlock';

class ContentItem extends React.Component {

  checkType = () => {
    switch(this.props.data.type){
      case 'text':
        return <TextFieldComp createCodeBlock={this.props.createCodeBlock} deleteField={this.props.deleteField} changeBody={this.props.changeBody} body={this.props.data.body} order={this.props.order} />
      case 'codeBlock':
        return <CodeBlock />
      default:
        return 'Unknown Type'
    }
  }

  render() {
    return (
      <div>
        {this.checkType()}
      </div>
    )
  }
}

export default ContentItem
