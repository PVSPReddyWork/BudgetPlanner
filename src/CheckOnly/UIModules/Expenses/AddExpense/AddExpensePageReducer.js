import {ADD_EXPENSE_SUCCESS_MESSAGE} from '../../../Constants/TextConstants';
import {
  FAILURE,
  INACTIVE,
  LOADING,
  SUCCESS,
} from '../../../Constants/URLConstants';
import {
  ADD_EXPENSE,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAILURE,
  ADD_EXPENSE_RESET,
} from './AddExpensePageActions';

const initialState = {
  serviceState: INACTIVE,
  loaderVisibility: false,
  errorMessage: '',
  successMessage: '',
};

const AddExpensePageReducer = (state = initialState, action) => {
  state = {
    ...state,
    serviceState: INACTIVE,
    errorMessage: '',
    successMessage: '',
    loaderVisibility: false,
  };
  switch (action.type) {
    case ADD_EXPENSE:
      state = {...state, serviceState: LOADING, loaderVisibility: true};
      break;
    case ADD_EXPENSE_SUCCESS:
      state = {
        ...state,
        serviceState: SUCCESS,
        successMessage: ADD_EXPENSE_SUCCESS_MESSAGE,
      };
      break;
    case ADD_EXPENSE_FAILURE:
      state = {
        ...state,
        serviceState: FAILURE,
        errorMessage: action.payload.message,
      };
      break;
    case ADD_EXPENSE_RESET:
      state = {...state};
      break;
  }
  return state;
};

export default AddExpensePageReducer;
