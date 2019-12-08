import React from 'react';
import PropTypes from 'prop-types';

import StyleWrapper from './styles/table.style';

class Table extends React.Component {
  render() {
    const { className, style } = this.props;

    return (
      <StyleWrapper>
        <table className={className} style={style}>
          <tbody>
          {this.props.children}
          </tbody>
        </table>
      </StyleWrapper>
    );
  }
}

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Table;
