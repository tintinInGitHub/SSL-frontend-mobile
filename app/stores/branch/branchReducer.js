import * as types from "./branchActions";

const initialState = {
  selectedBranch: "",
};

const branchReducer = (state = initialState, action = {}) => {
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
