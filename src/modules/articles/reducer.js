const defaultState = {
  articles: [],
  loading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_ARTICLES_START':
      return { ...state, loading: true };
    case 'GET_ARTICLES_SUCCESS':
      return { ...state, articles: [ ...action.payload ], loading: false };
    case 'GET_ARTICLES_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};
