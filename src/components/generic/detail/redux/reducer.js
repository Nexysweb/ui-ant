import Immutable from "immutable";
import constants from "./constants";

import { WS_MESSAGE } from 'redux/constants'; 

import NexysUtils from '@nexys/utils';
const { ds: DSUtils } = NexysUtils;

const initStateObj = {};
const initState = Immutable.Map(Immutable.fromJS(initStateObj));

const detailReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.SET_PAGE_FILTER.ACTION: {
      const { page = "detail", attr, value} = action.payload;
      // TODO: support object with multiple serialized keys and value pairs
      const prevState = state.getIn([page, 'filters']);
      const data = DSUtils.updateNestedObj(prevState ? prevState.toJS() : {}, {name: attr, value});
      console.log(data);
      return state.mergeDeep({[page]: {filters: data}});
    }
    case constants.SET_PAGE_DATA.ACTION: {
      const { page = "detail", data} = action.payload;
      return state.mergeDeep({[page]: { data }});
    }
    case constants.FETCH_FILES.SUCCESS: {
      const { data, action: { page = "detail" }} = action.payload;
      return state.setIn([page, 'file', 'list'], data);
    }
    case constants.PROGRESS.SUCCESS: {
      const { page = "detail" } = action.payload;
      return state.mergeDeep({[page]: {file: {progress: 0, status: undefined}}});
    }
    case constants.CREATE_FILE.FAILURE: {
      const { page = "detail" } = action.payload;
      return state.mergeDeep({[page]: {file: {status: 'exception'}}});
    }
    case constants.CREATE_FILE.SUCCESS: {
      const { page = "detail"} = action.payload;
      return state.mergeDeep({[page]: {file: {status: 'success'}}});
    }
    case constants.PROGRESS.ACTION: {
      const { page = "detail" , data: { loaded, total }} = action.payload;
      const progress = Math.round(loaded/total * 100);
      return state.mergeDeep({[page]: {file: {progress}}});
    }
    case WS_MESSAGE.ACTION: {
      const { message } = action
      const { params, data } = message;
      if (params.type === 'file' && params.action === 'list') {
        const { page } = params.apiParams;
        return state.setIn([page, 'file', 'list'], data);
      }
    }
    default:
      return state;
  }
}

export default detailReducer;