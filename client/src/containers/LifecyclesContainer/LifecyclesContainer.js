import React from 'react';
import Lifecycle from '../../components/Lifecycle/Lifecycle';
import classes from './LifecyclesContainer.module.css';

const LifecyclesContainer = props => (
  <div className={classes.Lifecycles}>
    {props.lifecycles
      ? props.lifecycles.map(lifecycle => <Lifecycle name={lifecycle} key={lifecycle} />)
      : null}
  </div>
);

export default LifecyclesContainer;
