export const SET_SELECTED_BRANCH = "SET_SELCTED_BRANCH";

const setSelectedBranchSuccess = (selectedBranch) => ({
  type: SET_SELECTED_BRANCH,
  payload: selectedBranch,
});

export const setSelectedBranch = (selectedBranch) => async (dispatch) => {
  dispatch(setSelectedBranchSuccess(selectedBranch));
};
