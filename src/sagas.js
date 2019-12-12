import { all, fork } from 'redux-saga/effects';

import user from './modules/user/saga';
import articles from './modules/articles/saga';


const allsagas = [...user, ...articles];
export default function* root() {
  yield all(allsagas.map(saga => fork(saga)));
}
