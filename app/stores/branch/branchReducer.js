import * as types from "./branchActions";

const initialState = {
  selectedBranch: "",
};

const branchReducer = (state = initialState, action = {}) => {
  console.log(
    state,
    "state",
    "action.type",
    action.type,
    "action.payload",
    action.payload
  );
  switch (action.type) {
    case "SET_SELCTED_BRANCH":
      return {
        ...state,
        selectedBranch: action.payload,
      };
    default:
      return state;
  }
};

export default branchReducer;
