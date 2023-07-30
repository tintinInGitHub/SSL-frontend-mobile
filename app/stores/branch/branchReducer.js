import * as branchActionTypes from "./branchActions";

const initialState = {
  selectedBranch: "",
};

const branchReducer = (state = initialState, action) => {
  console.log(action, "action");
  switch (action.type) {
    case branchActionTypes.SET_SELECTED_BRANCH:
      return {
        ...state,
        selectedBranch: action.payload.selectedBranch,
      };
    default:
      return state;
  }
};

export default branchReducer;
