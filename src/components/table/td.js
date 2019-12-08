import React from 'react';
import PropTypes from 'prop-types';

class TableCell extends React.Component {
  render() {
    const { className, style } = this.props;

    return (
      <td className={className} style={style}>
        {this.props.children}
      </td>
    );
  }
}

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

export default TableCell;
