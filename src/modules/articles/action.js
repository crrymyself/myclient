
export const getArticles = {
  start: (payload = {}, cb) => ({
    type: 'GET_ARTICLES_START',
    payload,
    cb,
  }),
  success: payload => ({
    payload: [...payload],
    type: 'GET_ARTICLES_SUCCESS',
  }),
};

export const getArticlesFail = () => ({
  type: 'GET_ARTICLES_FAIL',
});
