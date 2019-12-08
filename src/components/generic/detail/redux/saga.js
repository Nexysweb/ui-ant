import { takeLatest, all } from 'redux-saga/effects';

import SagaFactory from 'lib/saga-factory.js';
import constants from './constants';
const { FETCH_FILES, CREATE_FILE, PROGRESS } = constants;


function* pageSaga() {
  yield all([
    takeLatest(FETCH_FILES.ACTION, SagaFactory.produceCreateSaga(FETCH_FILES)),
    takeLatest(CREATE_FILE.ACTION, SagaFactory.produceUploadSaga(CREATE_FILE, PROGRESS, 3000))
  ]);
}

export default pageSaga;