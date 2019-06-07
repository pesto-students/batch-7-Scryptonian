import React from 'react';
import { InputGroup, Button, Label } from '@blueprintjs/core';

export default class Lifecycle extends React.Component {
  state = { inputs: ['input-0'] };

  appendInput = event => {
    event.preventDefault();
    var newInput = `input-${this.state.inputs.length}`;
    this.setState(prevState => ({
      inputs: prevState.inputs.concat([newInput])
    }));
  };

  render() {
    return (
      <Label style={{ margin: '4px' }}>
        <span> Add Lifecycle:</span>
        {this.state.inputs.map(input => (
          <div style={{ paddingBottom: '8px' }}>
            <InputGroup round={true} placeholder="Add Lifecycle" fill={true} />
          </div>
        ))}

        <Button
          onClick={this.appendInput}
          icon="add"
          minimal={true}
          large={true}
          fill={true}
          intent="primary"
        />
      </Label>
    );
  }
}
