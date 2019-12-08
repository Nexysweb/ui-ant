import constants from './constants';

export const setPageFilterAction = (page, attr, value) => ({type: constants.SET_PAGE_FILTER.ACTION, payload: { page, attr, value }});
export const setPageDataAction = (page, data) => ({type: constants.SET_PAGE_DATA.ACTION, payload: { page, data }});