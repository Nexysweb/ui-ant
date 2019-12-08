import React from 'react';
import PropTypes from 'prop-types';

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        {this.props.children}
      </tr>
    );
  }
}

TableRow.propTypes = {
  children: PropTypes.node
};

export default TableRow;
