import React from 'react';
import Lifecycle from '../../components/Lifecycle/Lifecycle';
import classes from './LifecyclesContainer.module.css';

const LifecyclesContainer = props => (
  <div className={classes.Lifecycles}>
    {props.lifecycles
      ? props.lifecycles.map((lifecycle, index) => <Lifecycle name={lifecycle.name} key={lifecycle._id} issues={lifecycle.issues} />)
      : null}
  </div>
);

export default LifecyclesContainer;
