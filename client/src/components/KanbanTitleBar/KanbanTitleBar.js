import React from 'react';
import { Navbar, Alignment, Button, NavbarDivider } from '@blueprintjs/core';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

export class KanbanTitleBar extends React.Component {
  render() {
    const { toggleMemberListModal } = this.props;
    return (
      <div>
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>{this.props.name}</Navbar.Heading>
            <NavbarDivider />
            <Button
              className="bp3-minimal"
              icon="user"
              text="Member list"
              onClick={toggleMemberListModal}
            />
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMemberListModal: () => dispatch(actionCreators.toggleMemberListModal()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(KanbanTitleBar);
