import { defineAction } from 'redux-define';
import { states } from 'redux/constants.js';

const prefix = 'detail';

const constants = {
  RESET: 'RESET',
  SET_PAGE_FILTER: defineAction('SET_PAGE_FILTER', states, prefix),
  SET_PAGE_DATA: defineAction('SET_PAGE_DATA', states, prefix),
  FETCH_FILES: defineAction('FETCH_FILES', states, prefix),
  CREATE_FILE: defineAction('CREATE_FILE', states, prefix),
  PROGRESS: defineAction('PROGRESS', states, prefix),
  FETCH_RESOURCES: defineAction('FETCH_RESOURCES', states, prefix),
};

export default constants;