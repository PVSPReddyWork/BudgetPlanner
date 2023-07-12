import {
    SYNC_ALL_EXPENSE,
    SYNC_ALL_EXPENSE_SUCCESS,
    SYNC_ALL_EXPENSE_FAILURE,
    SYNC_ALL_EXPENSE_RESET,
} from './WishlistPageActions';
import {
  FAILURE,
  INACTIVE,
  LOADING,
  SUCCESS,
} from '../../Constants/URLConstants';

const initialState = {
  serviceState: INACTIVE,
  loaderVisibility: false,
  message:'',
  errorMessage: '',
  successMessage: '',
};

const WishlistPageReducer = (state = initialState, action) => {
    switch (action.type){
        case SYNC_ALL_EXPENSE:
            state={
                ...state,
                serviceState: LOADING,
                loaderVisibility: true,
                message:'',
            };
        break;
        case SYNC_ALL_EXPENSE_SUCCESS:
            state={
                ...state,
                serviceState: SUCCESS,
                loaderVisibility: false,
                message: action.payload,
            };
        break;
        case SYNC_ALL_EXPENSE_FAILURE:
            state={
                ...state,
                serviceState: FAILURE,
                loaderVisibility: false,
                message: action.payload,
            };
        break;
        case SYNC_ALL_EXPENSE_RESET:
            state={
                serviceState: INACTIVE,
                loaderVisibility: false,
                message:'',
            };
        break;
    }
  return state;
};

export default WishlistPageReducer;
