 import React from 'react';
import PropTypes from 'prop-types';

import { Tag } from 'antd';
//import Utils from '../../utils';


// NOTE: https://atlassian.design/guidelines/product/components/badges
const Badge = ({color, children}) => (
  <Tag color={'red'}>
    {children}
  </Tag>
);

Badge.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string.isRequired
};

export default Badge;