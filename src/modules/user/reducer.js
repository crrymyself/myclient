const defaultState = {
  user: null,
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_USER':
      return { ...state, user: {...action}};
    case 'POST_LOGIN_START':
      return { ...state, loading: true };
    case 'POST_LOGIN_SUCCESS':
      return { ...state, loading: false };
    case 'POST_LOGIN_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
}