import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Icon from './icon.js';
import { Tooltip } from 'antd';

// TODO: replace with react-tippy
class MyTooltip extends Component {
  render() {
    const { text, children } = this.props;
    let { iconName, placement } = this.props;

    if (!children && !iconName) {
      iconName = 'info-circle';
    }

    if (!placement) {
      placement = 'top';
    }

    return (
      <Tooltip
        title={text}
        placement={placement}
        arrowPointAtCenter={false}
        overlayClassName="digis-tooltip">
        {children} {iconName && <Fragment><span><Icon name={iconName} /></span></Fragment>}
      </Tooltip>
    );
  }
}

// TODO: StyledTooltip
MyTooltip.propTypes = {
  iconName: PropTypes.string,
  placement: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default MyTooltip;
