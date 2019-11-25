import { call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import { postApiLogin } from './api';
import { userFail } from './action';


function* watchPostLogin() {
  yield takeLatest('POST_LOGIN_START', onPostLogin);
}

function* onPostLogin({ payload, cb }) {
  try {
    const val = yield call(postApiLogin, payload);
    if (val.data.success) {
      message.success(val.data.message);
      localStorage.setItem('token', val.data.token);
      localStorage.setItem('userId', val.data.userId);
      localStorage.setItem('isOk', true);
      cb && cb();
    } else {
      message.warning(val.data.message);
    }
  } catch (error) {
    console.log(error);
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
