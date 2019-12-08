import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePicker from '../uielements/datePicker';

class MyDatePicker extends React.Component {
  handleChange = (date, dateString) => {
    const { name, onChange } = this.props;
    onChange({name, value: dateString});
  }

  render() {
    const { disabled, format, showTime, placeholder, value } = this.props;

    let formatToUse = format ? format : 'YYYY-MM-DD';
    if (showTime && !format) {
      formatToUse += ' HH:mm';
    }
    const date = value ? moment(value, formatToUse) : null;

    return (
      <DatePicker
        disabled={disabled}
        format={formatToUse}
        onChange={this.handleChange}
        placeholder={placeholder}
        showTime={showTime}
        value={date}
      />
    );
  }
}

MyDatePicker.propTypes = {
  disabled: PropTypes.bool,
  format: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showTime: PropTypes.bool,
  value: PropTypes.node
};

export default MyDatePicker;
