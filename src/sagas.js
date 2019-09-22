import user from './modules/user/saga';
import { all, fork } from 'redux-saga/effects';

const allsagas = all([...user]);

export default function* root() {
  yield allsagas.ALL.map(saga => fork(saga));
}