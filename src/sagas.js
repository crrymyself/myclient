import { all, fork } from 'redux-saga/effects';

import user from './modules/user/saga';


const allsagas = [...user];
export default function* root() {
  yield all(allsagas.map(saga => fork(saga)));
}
