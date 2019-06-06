import React from 'react';
import { Tag } from '@blueprintjs/core';

export const DEFAULT_COLOR = '#5C7080';

const Label = props => {
  const color = props.color ? props.color : DEFAULT_COLOR;
  return (
    <Tag round style={{ backgroundColor: color, margin: '0 2px' }}>
      {props.label}
    </Tag>
  );
};

export default Label;
