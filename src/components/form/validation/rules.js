import * as ErrorMessages from './error-msgs.js';

import NexysUtils from '@nexys/utils';

const { ds: DSUtils } = NexysUtils;

// NOTE: validation regex can be found at https://github.com/rickharrison/validate.js/blob/master/validate.js line 54
export const locationRequired = ({lat, long}) => {
  console.log('locztion requrired', lat, long);
  return lat && long ? null : ErrorMessages.locationIsRequired;
}

export const required = text => text ? null : ErrorMessages.isRequired;

export const phone = text => /^\d+$/.test(text) ? null : ErrorMessages.phone;

// NOTE: es6 regex - https://ponyfoo.com/articles/regular-expressions-post-es6
export const email = text => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  console.log(text, re.test(text));
  return !re.test(text) && ErrorMessages.isEmail;
}

export const mustMatch = (otherName, otherLabel) => {
  return (text, state) => {
    return text !== DSUtils.get(otherName, state) && ErrorMessages.mustMatch(otherLabel);
  };
};

export const mustBeInSeq = values => {
  return (value, state) => {
    if (value === null) return ErrorMessages.mustBeInSeq(values);
    return value && !(value in values) && ErrorMessages.mustBeInSeq(values);
  }
}

export const mustBeInInterval = (min, max) => {
  return (value, state) => {
    if (value === null) return ErrorMessages.mustBeInInterval(min, max);
    return value && (value < min || value > max) && ErrorMessages.mustBeInInterval(min, max);
  }
}

export const mustBeGreaterThan = min => {
  return (value, state) => {
    console.log(value);
    if (value === null || value === undefined) return ErrorMessages.mustBeGreaterThan(min);
    return (value <= min) && ErrorMessages.mustBeGreaterThan(min);
  }
}

export const minLength = length => {
  return text => {
    return text.length < length && ErrorMessages.minLength(length);
  };
};

export const mustMatchLength = length => {
  return text => {
    return text.length !== length && ErrorMessages.mustMatchLength(length);
  }
}

export default {
  required,
  email,
  phone,
  mustMatch,
  mustBeInSeq,
  mustBeInInterval,
  minLength,
  mustMatchLength,
  locationRequired
};