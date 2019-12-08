import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
//import durationFormat from 'moment-duration-format';
// TODO: move moment & moment duration to lib/time

import { TimePicker } from 'antd';
//durationFormat(moment);

class MyTimePicker extends Component {
  handleChange = (time=null, timeString) => {
    if (timeString) {
      const { format } = this.props;
      const formatToUse = format || 'HH:mm';

      // NOTE: time - moment, timeString - formatted time
      const value = moment.duration(timeString, formatToUse).asMinutes();

      const { name, onChange } = this.props;
      onChange({name, value});
    }
  }

  render() {
    const { disabled, format, placeholder, value } = this.props;

    const formatToUse = format || 'HH:mm';
    const time = (value || value === 0) ? moment(moment.duration(value, "minutes").format(formatToUse, { trim: false }), formatToUse) : moment('08:00', formatToUse);

    return (
      <TimePicker
        disabled={disabled}
        format={formatToUse}
        onChange={this.handleChange}
        placeholder={placeholder}
        value={time}
      />
    );
  }
}

MyTimePicker.propTypes = {
  disabled: PropTypes.bool,
  format: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.node
};

export default MyTimePicker;
