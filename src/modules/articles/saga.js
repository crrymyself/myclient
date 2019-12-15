import { call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import { fetchArticles } from './api';
import { getArticles, getArticlesFail } from './action';


function* watchGetArticles() {
  yield takeLatest('GET_ARTICLES_START', onGetArticles);
}

function* onGetArticles({ payload, cb }) {
  try {
    const val = yield call(fetchArticles, payload);
    if (val.data.success) {
      yield put(getArticles.success(val.data.data));
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
  yield put(getArticlesFail());
}

export default [watchGetArticles];
