import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { KeyValue as KeyValueView } from 'components';


class KeyValue extends Component {
  render() {
    const { item, definition=[] } = this.props;

    // TODO: prettier
    const entries = definition.map(r => ({key: r.label || r.title || r.name, value: r.render(item)}));

    return <KeyValueView entries={entries} />;
  }
}

KeyValue.propTypes = {
  definition: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired
};

export default KeyValue;