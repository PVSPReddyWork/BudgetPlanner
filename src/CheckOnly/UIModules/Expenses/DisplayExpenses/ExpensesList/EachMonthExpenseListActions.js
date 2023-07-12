export const GET_EACH_MONTH_EXPENSE_LIST = 'GET_EACH_MONTH_EXPENSE_LIST';
export const GET_EACH_MONTH_EXPENSE_LIST_SUCCESS =
  'GET_EACH_MONTH_EXPENSE_LIST_SUCCESS';
export const GET_EACH_MONTH_EXPENSE_LIST_FAILURE =
  'GET_EACH_MONTH_EXPENSE_LIST_FAILURE';
export const GET_EACH_MONTH_EXPENSE_LIST_RESET =
  'GET_EACH_MONTH_EXPENSE_LIST_RESET';

export const getEachMonthExpenseList = (pageTitle) => ({
  type: GET_EACH_MONTH_EXPENSE_LIST,
  payload: pageTitle,
});
export const getEachMonthExpenseListSuccess = (successData) => ({
  type: GET_EACH_MONTH_EXPENSE_LIST_SUCCESS,
  payload: successData,
});
export const getEachMonthExpenseListFailure = (failureReport) => ({
  type: GET_EACH_MONTH_EXPENSE_LIST_FAILURE,
  payload: failureReport,
});
export const getEachMonthExpenseListReset = () => ({
  type: GET_EACH_MONTH_EXPENSE_LIST_RESET,
});
