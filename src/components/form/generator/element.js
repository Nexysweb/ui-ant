import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
  Input,
  DatePicker,
  DateTimePicker,
  TimePicker,
  NumberInput,
  Select,
  Textarea,
  Toggle,
  Wrapper
} from '../index';

//import { withI18n } from 'components/common';
//import Editor from 'components/editor';

import NexysUtils from '@nexys/utils';

const { ds: DSUtils } = NexysUtils;


class FormGeneratorElement extends Component {
  getOptional = o => typeof o === "boolean" ? o : false;

  getFormName = n => Array.isArray(n) ? n.join('.') : n;

  getFormValue = (formName, data) => DSUtils.get(formName, data);

  getComponent = (c, formName, formValue, placeholder, multiple=false) => {
    const { values, minLength, handleKeys, onChange } = this.props;
    const formValues = Array.isArray(values) ? values : [];

    // NOTE - alternative: https://medium.com/chrisburgin/rewriting-javascript-replacing-the-switch-statement-cfff707cf045
    switch (c) {
      case 'textarea':
        return (
          <Textarea
            name={formName}
            value={formValue}
            placeholder={placeholder}
            onChange={onChange}
            handleKeys={handleKeys}
          />
        );
      /*case 'editor':
        return (
          <Editor
            name={formName}
            value={formValue}
            onChange={onChange}
          />
        );*/
      /*case 'code':
        return (
          <Editor
            name={formName}
            value={formValue}
            onChange={onChange}
            code
          />
        );*/
      case 'password':
        return (
          <Input
            type="password"
            name={formName}
            value={formValue}
            placeholder={placeholder}
            onChange={onChange}
            handleKeys={handleKeys}
          />
        );
      case 'integer':
        return (
          <NumberInput
            name={formName}
            value={formValue}
            placeholder={placeholder}
            onChange={onChange}
            handleKeys={handleKeys}
            integer
          />
        );
      case 'decimal':
        return (
          <NumberInput
            name={formName}
            value={formValue}
            placeholder={placeholder}
            onChange={onChange}
            handleKeys={handleKeys}
          />
        );
      case 'date':
        return (
          <DatePicker
            name={formName}
            value={formValue}
            placeholder={placeholder}
            onChange={onChange}
            handleKeys={handleKeys}
          />
        );
      case 'datetime':
        return (
          <DateTimePicker
            name={formName}
            value={formValue}
            placeholder={placeholder}
            onChange={onChange}
            handleKeys={handleKeys}
          />
        );
      case 'time':
        return (
          <TimePicker
            name={formName}
            value={formValue}
            placeholder={placeholder}
            onChange={onChange}
          />
        );
      case 'user':
      case 'company':
      case 'product':
      case 'project':
      case 'task':
      case 'foreign':
      case 'autocomplete':
      case 'address':
      case 'contact':
      case 'select':
        return (
          <Select
            name={formName}
            value={formValue}
            values={formValues}
            onChange={onChange}
            minLength={minLength ? minLength : 1}
            handleKeys={handleKeys}
            multiple={multiple}
          />
        );
      case 'multiSelect':
        return (
          <Select
            name={formName}
            value={formValue}
            values={formValues}
            onChange={onChange}
            minLength={minLength ? minLength : 1}
            handleKeys={handleKeys}
            multiple
          />
        );
      case 'boolean':
        return (
          <Toggle
            name={formName}
            value={formValue}
            placeholder={placeholder}
            onChange={onChange}
            handleKeys={handleKeys}
          />
        );
      default:
        return (
          <Input
            name={formName}
            value={formValue}
            placeholder={placeholder}
            onChange={onChange}
            handleKeys={handleKeys}
          />
        );
    }
  }

  render() {
    const { translate = a => a, errors, data, name, label, placeholder, required, noLabel, noMargin, display, mapValues, multiple=false } = this.props;
    let { componentType: fieldType, values } = this.props;

    const formName = this.getFormName(name);
    const formValue = this.getFormValue(formName, data);

    const formLabel = !noLabel && translate(label || formName);
    const formPlaceholder = placeholder || formLabel;

    if (typeof fieldType === 'function') fieldType = fieldType(data);
    if (fieldType === 'hidden') return null;

    if (mapValues) values = mapValues(data, values);

    const component = this.getComponent(fieldType, formName, formValue, formPlaceholder, multiple);

    const element = (
      <Wrapper
        name={formName}
        errors={errors}
        label={formLabel}
        required={required || false}
        noMargin={noMargin}>
        {component}
      </Wrapper>
    );

    // TODO: document display function
    return display ? (display(data, values) && (element || null)) : element;
  }
}

FormGeneratorElement.propTypes = {
  fieldType: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  values: PropTypes.array,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default (FormGeneratorElement);
