import React from 'react';

class CodeBlock extends React.Component {

  render() {
    return (
      <code contentEditable='true' style={{backgroundColor: '#eee', display: 'block', padding: '20px'}} ref={codeblock => this.codeblock = codeblock}></code>
    )
  }
}

export default CodeBlock
