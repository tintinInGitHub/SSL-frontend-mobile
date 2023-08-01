export const SET_SELECTED_BRANCH = "SET_SELCTED_BRANCH";

export const setSelectedBranchSuccess = (selectedBranch) => ({
  type: SET_SELECTED_BRANCH,
  payload: { selectedBranch },
});

export const setSelectedBranch = (selectedBranch) => async (dispatch) => {
  console.log("setSelectedBranch", selectedBranch);
  // return (dispatch) => {
  //   dispatch(setSelectedBranchSuccess(selectedBranch));
  // };
  dispatch({
    type: actionTypes.SET_SELECTED_BRANCH,
    payload: selectedBranch,
  });
};
