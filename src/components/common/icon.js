import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

const MyIcon = ({name, style}) => <Icon type={name} style={style} />;

MyIcon.propTypes = {
  name: PropTypes.string.isRequired
};

export default MyIcon;
