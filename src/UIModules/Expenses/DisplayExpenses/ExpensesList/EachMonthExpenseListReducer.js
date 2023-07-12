import {
  FAILURE,
  INACTIVE,
  LOADING,
  SUCCESS,
} from '../../../../Constants/URLConstants';
import {
  GET_EACH_MONTH_EXPENSE_LIST,
  GET_EACH_MONTH_EXPENSE_LIST_SUCCESS,
  GET_EACH_MONTH_EXPENSE_LIST_FAILURE,
  GET_EACH_MONTH_EXPENSE_LIST_RESET,
} from './EachMonthExpenseListActions';

const initialState = {
  pageTitle: 'Expenses',
  serviceState: INACTIVE,
  loaderVisibility: false,
  expenseListItems: [],
  errorMessage: '',
};

const EachMonthExpenseListReducer = (state = initialState, action) => {
  state = {
    ...state,
    serviceState: INACTIVE,
    errorMessage: '',
    loaderVisibility: false,
  };
  switch (action.type) {
    case GET_EACH_MONTH_EXPENSE_LIST:
      state = {
        ...state,
        pageTitle: action.payload,
        serviceState: LOADING,
        loaderVisibility: true,
      };
      break;
    case GET_EACH_MONTH_EXPENSE_LIST_SUCCESS:
      state = {...state, serviceState: SUCCESS, ...action.payload};
      break;
    case GET_EACH_MONTH_EXPENSE_LIST_FAILURE:
      state = {
        ...state,
        serviceState: FAILURE,
        errorMessage: action.payload.message,
      };
      break;
    case GET_EACH_MONTH_EXPENSE_LIST_RESET:
      state = {...state, expenseListItems: []};
      break;
  }
  return state;
};

export default EachMonthExpenseListReducer;
