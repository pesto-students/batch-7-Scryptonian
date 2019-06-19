import React from 'react';
import Lifecycle from '../../components/Lifecycle/Lifecycle';
import { DragDropContext } from 'react-beautiful-dnd';
import classes from './LifecyclesContainer.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

export class LifecyclesContainer extends React.Component {
  onDragEnd = result => {
    const { lifecycles } = this.props;
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const lifecyclePickedFrom = lifecycles.find(
      lifecycle => lifecycle._id === source.droppableId
    );
    const lifecycleDroppedInto = lifecycles.find(
      lifecycle => lifecycle._id === destination.droppableId
    );

    if (lifecyclePickedFrom === lifecycleDroppedInto) {
      const newIssueList = Array.from(lifecyclePickedFrom.issues);
      const movedIssue = newIssueList.splice(source.index, 1)[0];
      newIssueList.splice(destination.index, 0, movedIssue);

      const updatedLifecycle = {
        ...lifecyclePickedFrom,
        issues: newIssueList
      };

      return this.props.updateLifecycles(
        [lifecyclePickedFrom],
        [updatedLifecycle]
      );
    }

    const reducedIssueList = Array.from(lifecyclePickedFrom.issues);
    const movedIssue = reducedIssueList.splice(source.index, 1)[0];
    const updatedReducedLifecycle = {
      ...lifecyclePickedFrom,
      issues: reducedIssueList
    };

    const expandedIssueList = Array.from(lifecycleDroppedInto.issues);
    expandedIssueList.splice(destination.index, 0, movedIssue);
    const updatedExpandedLifecycle = {
      ...lifecycleDroppedInto,
      issues: expandedIssueList
    };

    this.props.updateLifecycles(
      [lifecyclePickedFrom, lifecycleDroppedInto],
      [updatedReducedLifecycle, updatedExpandedLifecycle]
    );
    return;
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={classes.Lifecycles}>
          {this.props.lifecycles ? (
            this.props.lifecycles.map((lifecycle, index) => (
              <Lifecycle
                name={lifecycle.name}
                key={index}
                issues={lifecycle.issues}
                lifecycleid={lifecycle._id}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    lifecycles: state.lifecycles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLifecycles: (originalLifecycles, updatedLifecycles) =>
      dispatch(
        actionCreators.updateLifecycles(originalLifecycles, updatedLifecycles)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LifecyclesContainer);
