import * as types from "./userActions";

const initialState = {
  user: "111111111x",
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "GET_USER":
      return {
        ...state.user,
      };
    default:
      return state;
  }
};

export default userReducer;
