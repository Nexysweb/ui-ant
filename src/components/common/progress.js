import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';


class ProgressBar extends Component {
  render() {
    let { progress, status } = this.props
    if (progress < 80 && status !== 'exception') status = 'active';
    return <Progress percent={this.props.progress} status={status} />;
  }
}

ProgressBar.propTypes = {
  /** nuber between 0 and 100 */
  progress: PropTypes.number.isRequired,
  /** exception or active */
  status: PropTypes.string
}

export default ProgressBar;