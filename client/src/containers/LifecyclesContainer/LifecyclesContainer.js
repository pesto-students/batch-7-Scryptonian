import React from 'react';
import Lifecycle from '../../components/Lifecycle/Lifecycle';
import { DragDropContext } from 'react-beautiful-dnd';
import classes from './LifecyclesContainer.module.css';

class LifecyclesContainer extends React.Component {

  onDragEnd = result => {
    
  }

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

export default LifecyclesContainer;
