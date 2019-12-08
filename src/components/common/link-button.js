import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Alert, Button, Icon } from 'components';

class LinkButton extends React.Component {
  renderIcon() {
    const iconDefault = 'eye';

    return this.props.icon ? this.props.icon : iconDefault;
  }

  render() {
    return (
      <div>
        <Link to={this.props.url}>
          <Button shape="circle" type="icon">
            <Icon name={this.renderIcon()}/>
          </Button>
        </Link>
      </div>
    );
  }
}

LinkButton.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.string
};

export default LinkButton;
