import React from 'react';
import { Navbar, Alignment, Button, NavbarDivider } from '@blueprintjs/core';

class KanbanTitleBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>{this.props.name}</Navbar.Heading>
            <NavbarDivider />
            <Button className="bp3-minimal" icon="user" text="Member list" />
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

export default KanbanTitleBar;
