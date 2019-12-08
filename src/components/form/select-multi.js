import React from 'react';
import PropTypes from 'prop-types';

import Select, { SelectOption } from '../uielements/select';

class MyMultiSelect extends React.Component {
  handleChange = value => {
    const {name, onChange} = this.props;
    onChange({name, value});
  }

  render() {
    const { allowEmpty, disabled, placeholder, value, values } = this.props;

    let options = [];
    if (values) {
      options = values.map(x => {
        return <SelectOption key={x.id} value={x.id}>{x.name}</SelectOption>;
      });
    }

    return (
      <Select
        allowClear={allowEmpty}
        disabled={disabled}
        mode="multiple"
        onChange={this.handleChange}
        placeholder={placeholder}
        style={{width: '100%'}}
        value={value}>
        {options}
      </Select>
    );
  }
}

MyMultiSelect.propTypes = {
  allowEmpty: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.node,
  values: PropTypes.array.isRequired
};

export default MyMultiSelect;
