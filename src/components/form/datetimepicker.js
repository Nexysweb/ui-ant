import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePicker from '../uielements/datePicker';

class MyDatetimepicker extends React.Component {
  handleChange = (date, dateString) => {
    const { name, onChange } = this.props;
    onChange({name, value: date.toJSON()});
  }

  render() {
    const { disabled, format, placeholder, value } = this.props;

    let formatToUse = format ? format : 'YYYY-MM-DD HH:mm';
    const date = value ? moment(new Date(value), formatToUse) : null;

    return (
      <DatePicker
        disabled={disabled}
        format={formatToUse}
        onChange={this.handleChange}
        placeholder={placeholder}
        showTime={true}
        value={date}
      />
    );
  }
}

MyDatetimepicker.propTypes = {
  disabled: PropTypes.bool,
  format: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.node.isRequired
};

export default MyDatetimepicker;
