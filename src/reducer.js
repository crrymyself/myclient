import { combineReducers } from 'redux';

import user from './modules/user/reducer';
import articles from './modules/articles/reducer';

const rootReducer = combineReducers({
  user,
  articles,
});

export default rootReducer;
