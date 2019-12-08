import React from 'react';

import { Link } from 'react-router-dom';

import Rules from '../components/form/validation/rules';
import { ruleRunner } from '../components/form/validation/rule-runner';
import NexysUtils from '@nexys/utils';

const { ds, date: DateUtils } = NexysUtils;

const formTypes = ['add', 'edit'];

const getViews = attributes => {
  return attributes.filter(({view}) => !!view);
}

const formatRecord = ({name, form}, record) => {
  const value = ds.get(name, record);

  if (form) {
    const { fieldType } = form;

    if (value && fieldType === 'date') {
      return DateUtils.formatDate(value);
    }

    if (value && fieldType === 'datetime') {
      return DateUtils.formatDate(value) + ' ' + DateUtils.formatTime(value);
    }

    if (typeof value == 'boolean' && fieldType === 'boolean') {
      return value ? 'yes' : 'no';
    }

    const { values } = form;
    // TODO: hasClassicValues => r.field.name
    if (typeof value == 'number' && fieldType === 'select' && values && Array.isArray(values)) {
      const arr = values.filter(x => value === x.id);

      if (arr.length > 0) {
        return arr[0].name;
      }

      return null;
    }
  }

  return value;
};



export const getColumns = (attributes, translate) => {
  if (!attributes) return null;

  const views = getViews(attributes);

  return views.map(item => {
    const { name, label, view } = item;

    const { render: renderFn, list } = view;

    if (!list) return null;

    let editable = false;
    if (list && list.editable) editable = list.editable;
    // TODO: merge with form fields

    // searchable column
    let search = false;
    if (list && list.search) search = !!list.search;

    // sortable column
    let sorter = false;
    if (list && list.sorting) sorter = !!list.sorting;

    // hideable column
    let hidden = false;
    if (list && list.hidden) hidden = !!list.hidden;

    // aggregateable column
    let aggregate = false;
    if (list && list.aggregate) aggregate = !!list.aggregate;
    const getValue = list.getValue;

    const prevRender = renderFn || list.render || (r => formatRecord(item, r));
    let render = prevRender;

    /*if (list && list.copy) {
      const copy = this.copyToClipboard;
      render = r => {
        return (
          /*<Tooltip text="Copy link to clipboard">
            <a onClick={copy}>{prevRender(r)}</a>
          </Tooltip>*
          null
        );
      }
    }*/

    return {
      key: name,
      title: translate ? translate(label) : label,
      ...list,
      search,
      sorter,
      hidden,
      aggregate,
      getValue,
      editable,
      render
    };
  }).filter(obj => obj);
}



export const getFormConfig = (attributes, type) => {
  const elements = getFormElements(attributes, type);
  const entities = getFormEntities(elements);
  const fieldValidators = getFormValidators(elements);

  return { elements, entities, fieldValidators };
}


export const getFormEntities = (elements) => {
  if (!elements) return null;

  // StringUtils.lower(item.entity)
  const entities = elements.filter(({entity, classic}) => !!entity && !classic);
  const classicEntities = elements.filter(({entity, classic}) => !!entity && !!classic);

  return entities.concat(classicEntities).map(({entity, classic, post, params, mapping, filter, crud}) => ({entity, classic, post, params, mapping, filter, crud}));
}

const getFormValidators = (elements) => {
  if (!elements) return null;

  const rules = elements.filter(({validationRules}) => validationRules);
  const validators = rules.map(rule => {
    const { name, label, display, validationRules } = rule;
    const rules = validationRules.map(rule => {
      if (typeof rule === 'function') return rule;
      else return Rules[rule];
    }).filter(Boolean);

    const validator = ruleRunner(name, label, ...rules);
    return { validator, display };
  });

  return validators;
}

const classicValues = ['address', 'user', 'company', 'project', 'product', 'task', 'contact'];

const hasClassicValues = componentType => classicValues.includes(componentType);

export const getEntityValues = (entityData, r) => {
  if (entityData && (r.entity || hasClassicValues(r.componentType))) {
    const entity = r.entity.toLowerCase() || r.componentType;
    const entityValues = entity in entityData ? entityData[entity] : null;
    return entityValues;
  }
  return null;
}


export const getFormElements = (attributes, type) => {
  if (!attributes) return null;
  if (!formTypes.includes(type)) return null;

  /* 
  NOTE: Possible content
    - name
    - fieldType (input, area, select)
    - entity or values
    - (classic, post)
    - label
    - required
  */

  return attributes.filter(({form}) => !!form && !!form[type]).map(item => {
    const { name, label, form } = item;

    return {
      name,
      label,
      ...form,
      ...form[type]
    };
  });
}

export const getRows = (attributes) => {
  if (!attributes) return null;

  const views = getViews(attributes);

  return views.map(item => {
    const { name, label, view } = item;

    const { render: renderFn, detail } = view;

    if (!detail) return null;

    const render = detail.render || renderFn || (r => formatRecord(item, r)) 

    return {
      key: name,
      label,
      render
    };
  }).filter(obj => obj);
}

export const classicAssociationErrors = (errors, props) => {
  /*if ('entity1.id' in errors) {
    errors[`${entity}.id`] = errors['entity1.id'];
  }
  if ('entity2.id' in errors) {
    errors[`${associated}.id`] = errors['entity2.id'];
  } */
  return errors;
}

export const getColumnEntities = (attributes) => {
  if (!attributes) return null;

  const views = getViews(attributes);
  const editables = views.map(e => e.view).filter(view => !!view.list && !!view.list.editable && view.list.editable !== true).map(view => view.list.editable);

  const entities = editables.filter(({entity, classic}) => !!entity && !classic);
  const classicEntities = editables.filter(({entity, classic}) => !!entity && !!classic);

  return entities.concat(classicEntities).map(({entity, classic, post, params, mapping, crud}) => ({entity, classic, post, params, mapping, crud}))
}

// move this since it is areact functuin
export const toForeignEntityKeys = (elements) => {
  if (!elements) return [];

  return elements.map(item => {
    const { componentType: ctype, entity, name: attrName } = item;
    if (['select', 'foreign', 'user', 'company', 'contact'].includes(ctype)) {
      item.render = r => {
        let value = ds.get(attrName + '.name', r);
        if (ctype === 'select') return value;
        else {
          let uri = '';
          if (ctype === 'user' || ctype === 'contact') {
            const firstName = ds.get(`${attrName}.firstName`, r);
            const lastName = ds.get(`${attrName}.lastName`, r);
            if (!firstName && !lastName) return null;
            value = firstName + ' ' + lastName;
            uri = `/app/user/${ds.get(`${attrName}.id`, r)}/detail`;
          } else if (ctype === 'company') {
            uri = `/app/company/${ds.get(`${attrName}.id`, r)}/detail`;
          } else {
            uri = `/app/entity/${entity.toLowerCase()}/${ds.get(attrName + '.uuid', r)}/detail`;
          }
          return <Link to={uri}>{value}</Link>;
        }
      }
      const name = `${attrName}.${['select', 'user', 'company'].includes(ctype) ? 'id' : 'uuid'}`;
      return {...item, name};
    } else return item;
  });
}

export default { getColumns, getFormConfig, getFormEntities,  getFormValidators, getEntityValues, getFormElements, getRows, classicAssociationErrors, toForeignEntityKeys };
