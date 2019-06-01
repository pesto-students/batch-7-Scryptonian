import React from 'react';
import { Card, Elevation, Divider } from '@blueprintjs/core';
import classes from './Lifecycle.module.css';

const Lifecycle = props => <Card elevation={Elevation.ONE} className={classes.Lifecycle}>
  <h3>{props.name}</h3>
  <Divider />
  {props.issues ? props.issues : null}
</Card>;

export default Lifecycle;
