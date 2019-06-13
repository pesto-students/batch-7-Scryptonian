import React from 'react';
import { InputGroup, Button, Label, TagInput } from '@blueprintjs/core';

export default class Lifecycle extends React.Component {
  state = {
    inputs: ['input-0']
  };

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
        {/* <TagInput values={[]} addOnBlur={true} /> */}
        {this.state.inputs.map((input, index) => (
          <div style={{ paddingBottom: '8px' }} key={index}>
            <InputGroup
              placeholder="Add Lifecycle"
              fill={true}
              value={input.value}
            />
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
