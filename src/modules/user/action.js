
export const SET_USER = payload => ({
  ...payload,
  type: 'SET_USER',
});

export const postLogin = {
  start: (payload, cb) => ({
    type: 'POST_LOGIN_START',
    payload,
    cb,
  }),
  success: () => ({
    type: 'POST_LOGIN_SUCCESS',
  }),
};

export const userFail = () => ({
  type: 'POST_LOGIN_FAIL',
});