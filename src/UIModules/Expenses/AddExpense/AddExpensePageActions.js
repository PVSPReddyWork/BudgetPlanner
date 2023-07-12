export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS';
export const ADD_EXPENSE_FAILURE = 'ADD_EXPENSE_FAILURE';
export const ADD_EXPENSE_RESET = 'ADD_EXPENSE_RESET';

export const getAddExpense = () => ({type: ADD_EXPENSE});
export const getAddExpenseSuccess = (successData) => ({
  type: ADD_EXPENSE_SUCCESS,
  payload: successData,
});
export const getAddExpenseFailure = (failureReport) => ({
  type: ADD_EXPENSE_FAILURE,
  payload: failureReport,
});
export const getAddExpenseReset = () => ({type: ADD_EXPENSE_RESET});
