import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button, Alert } from 'components';
import { withI18n } from 'components/common';

import { run } from '../validation/rule-runner';

import APIService from 'lib/api-service';

import { classicAssociationErrors } from 'utils/business';

import NexysUtils from '@nexys/utils';
import DigisUtils from '@nexys/digis-i18n';

const { ds: DSUtils } = NexysUtils;
const { Request } = DigisUtils;

const isEmpty = obj => {
  if (!obj) return true;
  for (let key in obj) if(obj.hasOwnProperty(key)) return false;
  return true;
}

const deepCopy = (obj) => {
  if (!obj) return obj;
  return JSON.parse(JSON.stringify(obj));
}

const removePrefix = (obj, prefix) => {
  if (obj.data) return obj.data;
  return Object.keys(obj).reduce((a, key) => ({...a, [key.replace(prefix, "")]: obj[key] }), {});
}


// TODO: curried withFormWrapper version: FormBody => {}
class FormGeneratorWrapper extends Component {
  constructor(props) {
    super(props);
    const { data: initialData, errors } = this.props;

    this.state = {
      data: deepCopy(initialData) || {},
      validationErrors: {},
      errors
    };
  }

  handleMessage = event => {
    const { request } = this.props;
    const requestWData = request({});
    const { params } = requestWData;

    const json = JSON.parse(event.data);
    const { params: wsParams, data } = json;
    const { action, type } = wsParams;

    const eqAction = action === params.action || (params.action === 'update' && action === 'detail');
    if (wsParams && eqAction && type === params.type) {
      if(wsParams.isError) {
        this.onError(data, {});
      } else {
        this.onSuccess({ id: data.uuid });
      }
    }

    if (!wsParams.isError && action === "list") {
      this.handleClear();
    }
  }

  /*componentWillUnmount() {
    const { wsConnection: connection } = this.props;
    connection.removeEventListener('message', this.handleMessage);
  }*/

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data || {};
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        ...data
      }
    }));
    // PREV: this.setState({data});
  }

  onError = (errors, payload) => {
    const { afterSubmit } = this.props;
    errors = classicAssociationErrors(errors, this.props);
    errors = removePrefix(errors, "data.");

    this.setState({errors});

    if (afterSubmit) {
      afterSubmit(false, null, payload);
    }
  };

  onSuccess = (data, payload) => {
    const { afterSubmit, data: initialData } = this.props;
    this.setState({errors: {}, data: initialData});

    if (afterSubmit) {
      afterSubmit(true, data, payload);
    }
  };

  filterValidators = (validators, data) => {
    if (!validators) return null;
    else return validators.filter(item => !item.display || item.display(data)).map(item => item.validator);
  }

  // TODO: handle array removal - newObj={type: 'array', id, deleted=true}
  handleChange = (newObj, remove=false, wipe=false) => {
    let { onChange, fieldValidators } = this.props;
    let { data } = this.state;

    fieldValidators = this.filterValidators(fieldValidators, data);

    if (newObj.id && remove && wipe) {
      this.handleDeleteChange(newObj);
      return;
    }

    if (wipe) data = {};

    if (remove) data = DSUtils.removeProp(data, newObj.name);
    else data = DSUtils.updateObject(data, newObj);

    const validationErrors = fieldValidators ? run(data, fieldValidators) : {};

    if (onChange) onChange(data);
    else this.setState({data, validationErrors});
  }

  handleDeleteChange = ({name, id})=> {
    const { data } = this.state;
    const values = data[name].filter(item => item.id !== id);
    this.setState({data: {...data, [name]: values}});
  }

  getState = () => this.state;

  handleClear = () => {
    const { onClear, data: dataInit={}} = this.props;
    const { data } = this.state;
    if (onClear) onClear(data);
    this.setState({data: dataInit});
  }

  handleSubmit = event => {
    event.preventDefault();
    let { fieldValidators } = this.props;
    let { data, validationErrors } = this.state;

    fieldValidators = this.filterValidators(fieldValidators, data);

    if (isEmpty(validationErrors)) {
      validationErrors = fieldValidators ? run(data, fieldValidators) : {};
      this.setState({ validationErrors });
    }
    if (!isEmpty(validationErrors)) return;

    const { url, request, handleSubmit, notify, mapping } = this.props;

    const onSuccess = res => {
      this.handleClear();
      this.onSuccess(res, data);
    }
    const onError = errors => this.onError(errors, data);

    // NOTE: change reference so that data isn't polluted
    let payload = {...data};
    if (mapping) {
      payload = mapping(payload);
    }

    if (handleSubmit) {
      handleSubmit(payload);
    } else if (request) {
      // NOTE: differentiate between insert & update?
      const requestWData = request(payload);

      console.log(requestWData)

      Request.fetch(requestWData.uri, requestWData.payload, requestWData.method).then(x => {
        onSuccess(x)
      })
      
    } else if (url) {
      APIService.create(url, payload, onSuccess, onError, notify);
    }
  }

  renderButton = () => {
    const { noButton, button, translate, clear } = this.props;

    if (noButton) {
      return null;
    }

    if (button) {
      return button;
    }

    const submitBtn = <Button className="top-20" color="primary" submit>{translate('submit')}</Button>;

    if (clear) {
      return (
        <Fragment>
          {submitBtn}
          <Button style={{marginLeft: 10}} onClick={this.handleClear}>{translate('clear')}</Button>
        </Fragment>
      );
    }

    return submitBtn;
  }

  renderBody = (data, errors) => {
    const { children, entities, entityReload, inline } = this.props;

    // NOTE:
    // - either generate body via elements: <FormBody elements={...} />
    // - or create specific form component with props: {data, errors, onChange}: Body = ({data, errors, onChange}) => ()
    // example: check thread/index.js - line 124 (renderForm())
    return React.cloneElement(children, {
      data, errors, entities,
      onChange: this.handleChange,
      onSubmit: this.handleSubmit,
      onClear: this.handleClear,
      entityReload,
      inline
    });
  }

  render() {
    const { data, validationErrors, errors: formErrors } = this.state;
    const { errors: parentErrors } = this.props;

    let errors = formErrors || parentErrors;
    if (!isEmpty(validationErrors)) {
      errors = {...errors, ...validationErrors};
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {errors && errors.status && <Alert color="error" style={{marginBottom: 10}}>{errors.status}</Alert>}
        {errors && errors[''] && <Alert color="error">{errors['']}</Alert>}
        {errors && errors.data && <Alert color="error">{errors.data}</Alert>}
        {this.renderBody(data, errors)}
        {this.renderButton()}
      </form>
    );
  }
}

FormGeneratorWrapper.propTypes = {
  body: PropTypes.func,       // partial function that contain form elements
  children: PropTypes.node,   // component that contain form elements (same as above but more "react friendly")
  data: PropTypes.object,     // data that populates form
  errors: PropTypes.object,   // overrides form error
  onSubmit: PropTypes.func,   // associate action after form submitted
  url: PropTypes.string,      // if given, sends POST request to the address (deprecated, should favor `request`)
  request: PropTypes.func,    // if given, executes the request. Request is a function: (payload) => request(payload)
  button: PropTypes.func      // overrides default submit button
};

export default withI18n(FormGeneratorWrapper);
//export default withConnection(withRouter(withNotification(withI18n(FormGeneratorWrapper))));

export const Standalone = FormGeneratorWrapper;