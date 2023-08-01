export const SET_USER = "SET_USER";

const setUserSuccess = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setUser = (user) => async (dispatch) => {
  dispatch(setUserSuccess(user));
};
