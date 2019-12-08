import React, { Component } from 'react';

import Toggle from './toggle';
import Hoc from 'components/business/address/hoc-w-data';

import DigisUtil from '@nexys/digis-i18n';
const { Request } = DigisUtil;

const requestCrud = props => {
  const { id, config: {requestCrud: {detail }}} = props;
  console.log(detail(id))
  return detail(id);
};

export default Hoc(requestCrud)(Toggle);
