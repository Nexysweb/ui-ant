import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './button';
import Icon from './icon';


class IconButton extends Component {
  getIconType = type => {
    switch(type) {
      case "save":
        return "save";
      case "cancel":
        return "close";
      case "view":
        return "eye";
      case "edit":
        return "edit";
      case "delete":
        return "delete";
      default:
        return type;
    }
  }

  render() {
    const { type, onClick, color, round, style, className } = this.props;

    return (
      <Button onClick={onClick} color={color} shape={round && "circle"} className={className} style={style}>
        <Icon name={this.getIconType(type)} />
      </Button>
    );
  }
}

IconButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  shape: PropTypes.bool
};

export default IconButton;
