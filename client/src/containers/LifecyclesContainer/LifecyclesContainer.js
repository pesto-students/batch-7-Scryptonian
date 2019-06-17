import React from 'react';
import Lifecycle from '../../components/Lifecycle/Lifecycle';
import { DragDropContext } from 'react-beautiful-dnd';
import classes from './LifecyclesContainer.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

class LifecyclesContainer extends React.Component {
  onDragEnd = result => {
    const { lifecycles } = this.props;
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const pickedFromLifecycle = lifecycles.find(lifecycle => lifecycle._id === source.droppableId);
    // const droppedIntoLifecycle = lifecycles.find(lifecycle => lifecycle._id === destination.droppableId);
    const newIssueList = Array.from(pickedFromLifecycle.issues);
    const movedIssue = newIssueList.splice(source.index, 1)[0];
    newIssueList.splice(destination.index, 0, movedIssue);

    const updatedPickedFromLifecycle = {
      ...pickedFromLifecycle,
      issues: newIssueList,
    }

    this.props.reorderIssues(updatedPickedFromLifecycle);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={classes.Lifecycles}>
          {this.props.lifecycles
            ? this.props.lifecycles.map((lifecycle, index) => (
                <Lifecycle
                  name={lifecycle.name}
                  key={index}
                  issues={lifecycle.issues}
                  lifecycleid={lifecycle._id}
                />
              ))
            : null}
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    lifecycles: state.lifecycles,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reorderIssues: (updatedLifecycle) => dispatch(actionCreators.reorderIssues(updatedLifecycle)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LifecyclesContainer);
