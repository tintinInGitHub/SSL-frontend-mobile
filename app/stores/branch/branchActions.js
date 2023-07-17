export const SET_SELECTED_BRANCH = "SET_SELCTED_BRANCH";

export const setSelectedBranchSuccess = (selectedBranch) => ({
  type: SET_SELECTED_BRANCH,
  payload: { selectedBranch },
});

export function setSelectedBranch(selectedBranch) {
  return (dispatch) => {
    dispatch(setSelectedBranchSuccess(selectedBranch));
  };
}
