import { all, fork } from 'redux-saga/effects';

import user from './modules/user/saga';


const allsagas = all([...user]);

export default function* root() {
  yield allsagas.ALL.map(saga => fork(saga));
}
