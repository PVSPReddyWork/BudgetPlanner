import {
  FAILURE,
  INACTIVE,
  LOADING,
  SUCCESS,
} from '../../../../Constants/URLConstants';
import {
  GET_YEARS_MONTHS_DETAILS,
  GET_YEARS_MONTHS_DETAILS_SUCCESS,
  GET_YEARS_MONTHS_DETAILS_FAILURE,
  GET_YEARS_MONTHS_DETAILS_RESET,
} from './ExpenseYearListActions';

const initialState = {
  listItems: [],
  serviceState: INACTIVE,
  loaderVisibility: false,
  message: '',
};

const ExpenseYearListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_YEARS_MONTHS_DETAILS:
      state = {...state, serviceState: LOADING, loaderVisibility: true, message: '',};
      break;
    case GET_YEARS_MONTHS_DETAILS_SUCCESS:
      state = {...state, listItems: action.payload, serviceState: SUCCESS, loaderVisibility: false, message: '',};
      break;
    case GET_YEARS_MONTHS_DETAILS_FAILURE:
      state = {
        ...state,
        serviceState: FAILURE,
        loaderVisibility: false,
        message: action.payload,
      };
      break;
    case GET_YEARS_MONTHS_DETAILS_RESET:
      state = {
        listItems: [],
        serviceState: INACTIVE,
        loaderVisibility: false,
        message: '',
      };
      break;
  }
  return state;
};

export default ExpenseYearListReducer;
