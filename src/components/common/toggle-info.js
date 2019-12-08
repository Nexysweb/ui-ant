import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from './tooltip';

class ToggleInfo extends React.Component {
  constructor(props) {
    super(props);

    const isShow = false;

    this.state = {isShow};
  }

  handleToggle = a => {
    const isShow = !this.state.isShow;

    this.setState({isShow});
  }

  render() {
    const { isShow } = this.state;
    const { children, label, labelBack, tooltipText } = this.props;

    if (isShow) {
      return (<div>
        {/* eslint-disable  jsx-a11y/anchor-is-valid */}
        <a onClick={this.handleToggle}>{labelBack}</a>
        <br/>
        {children}
      </div>);
    }

    /* eslint-disable  jsx-a11y/anchor-is-valid */
    return (<a onClick={this.handleToggle}>{label} <Tooltip text={tooltipText}/></a>);
  }
}

ToggleInfo.propTypes = {
  /** label of the toggle button */
  label: PropTypes.string.isRequired,
  /** label of the toggle back button */
  labelBack: PropTypes.string.isRequired,
  /** label of the tooltip */
  tooltipText: PropTypes.string.isRequired,
  /** content inside */
  children: PropTypes.node.isRequired
};

export default ToggleInfo