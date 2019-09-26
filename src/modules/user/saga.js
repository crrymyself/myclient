import { call, put, takeLatest } from 'redux-saga/effects';

import { postApiLogin } from './api';
import { userFail } from './action';


function* watchPostLogin() {
  yield takeLatest('POST_LOGIN_START', onPostLogin);
}

function* onPostLogin({ payload, cb }) {
  try {
    const { data } = yield call(postApiLogin, payload);
    if (data.token) {
      window.localStorage.setItem('user', data.token);
      cb && cb();
    }
  } catch (error) {
    if (error.response) {
      // console.log(error.response);
    }
    yield onError(error);
  }
}

function* onError() {
  yield put(userFail());
}

export default [watchPostLogin];
