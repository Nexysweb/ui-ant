import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Alert } from '../';
import { Table, TableRow, TableCell } from '../table';
import { withI18n } from '../common';


class KeyValueView extends Component {
  normalize = entries => entries.map(entry => {
    if (Array.isArray(entry)) return {key: entry[0], value: entry[1]};
    return entry;
  });

  renderRow = (key, value, i) => {
    const { translate } = this.props;
    const label = translate(key);

    return (
      <TableRow key={i}>
        <TableCell style={{verticalAlign: 'top'}}>
          <strong style={{fontWeight: 'bold'}}>{label}</strong>
        </TableCell>
        <TableCell style={{whiteSpace: 'pre-wrap'}}>{this.renderValue(value) || '-'}</TableCell>
      </TableRow>
    );
  }

  renderValue = value => {
    if (value && value.$$typeof) {
      return value;
    }
    if (typeof value === 'object' && value !== null)
      return value.name;
    else 
      return value;
  }

  render() {
    let { entries, translate } = this.props;

    if (!entries) return <Alert color="warning">{translate('data.none')}</Alert>;

    entries = this.normalize(entries);

    return (
      <Table style={{tableLayout: 'fixed'}}>
        {entries.map(({key, value}, i) => this.renderRow(key, value, i))}
      </Table>
    );
  }
}

KeyValueView.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default withI18n(KeyValueView);
