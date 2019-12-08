import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Element from './element';

import { getEntityValues } from '../../../utils/business';

import NexysUtils from '@nexys/utils';

const { ds: DSUtils } = NexysUtils;


class FormGenerator extends Component {
  renderElement = (r, i) => {
    const { errors, data, entities, values, entityReload, onChange, inline } = this.props;

    let entityValues = getEntityValues(entities, r);

    const { form: { filters=null } = {}} = r;
    if (entityValues && filters) {
      entityValues = entityValues.filter(item => DSUtils.get(`${filters.name}.id`, item) === filters.id);
    }

    const formValues = values || entityValues;
    const onChangeFn = r.onChange ? r.onChange(onChange, data, entityReload, formValues, this.props) : onChange;

    const element = (
      <div key={`form-item-${i}`} style={inline ? {display: 'inline-block', marginRight: 15} : {}}>
        <Element
          data={data}
          errors={errors}
          values={formValues}
          {...r}
          onChange={onChangeFn}
          noMargin={i===0}
        />
        <Appendage>{r.append}</Appendage>
      </div>
    );

    if (r.prepend) {
      return (
        <Fragment>
          <div className="top-30">{r.prepend}</div>
          {element}
        </Fragment>
      );
    }

    return element;
  }

  render() {
    const { elements, data, className } = this.props;

    if (!elements) return null;

    const renderedElements = elements.filter(item => !item.switch || item.switch === data.switch).map((e, i) => this.renderElement(e, i));

    if (className) {
      return (
        <div className={className}>
          {renderedElements}
        </div>
      );
    } else {
      return renderedElements;
    }
  }
}

const Appendage = styled.div`
  // padding: 4px 0 0 7px;
`;

FormGenerator.propTypes = {
  elements: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default FormGenerator;
