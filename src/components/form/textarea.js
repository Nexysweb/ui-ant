import React from 'react';
import PropTypes from 'prop-types';

import { Textarea } from '../uielements/input';

//const prettier = require('prettier/standalone');
//const prettierHtml = require("prettier/parser-html");


class MyTextarea extends React.Component {
  handleChange = e => {
    const {name, onChange} = this.props;
    onChange({name, value: e.currentTarget.value});
  }

  handleBlur = e => {
    const {name, onBlur} = this.props;
    if (onBlur) {
      onBlur({name, value: e.currentTarget.value});
    }
  }

  render() {
    const { disabled, placeholder, rows, size, value } = this.props;

    // TODO: move higher up
    let content = value;
    //console.log(pretty)
    /*if (pretty) {
      content = prettier.format(content, {
        parser: "html",
        plugins: [prettierHtml]
      });
      console.log(content);
    }*/

    return (
      <Textarea
        autosize
        disabled={disabled}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        placeholder={placeholder}
        rows={rows}
        size={size}
        value={content}
      />
    );
  }
}

MyTextarea.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  size: PropTypes.string,
  value: PropTypes.string
};

export default MyTextarea;
