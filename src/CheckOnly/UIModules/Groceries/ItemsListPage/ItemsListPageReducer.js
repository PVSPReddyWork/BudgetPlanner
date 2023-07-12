
import {
  GET_GROCERIRES_LIST,
  GET_LOCAL_ANMIE_UPDATED_GROCERIRES_LIST,
  GET_GROCERIRES_LIST_SUCCESS,
  GET_GROCERIRES_LIST_FAILURE,
  GET_GROCERIRES_LIST_RESET,
  GET_UPDATE_ADD_GROCERIES_LIST_ITEM,
  GET_ADD_GROCERIRES_LIST,
  GET_ADD_GROCERIRES_LIST_SUCCESS,
  GET_ADD_GROCERIRES_LIST_FAILURE,
  GET_ADD_GROCERIRES_LIST_RESET,
  GET_DELETE_GROCERIRES_LIST,
  GET_DELETE_GROCERIRES_LIST_SUCCESS,
  GET_DELETE_GROCERIRES_LIST_FAILURE,
  GET_DELETE_GROCERIRES_LIST_RESET,
  GET_DELETE_ALL_GROCERIRES_LIST,
  GET_DELETE_ALL_GROCERIRES_LIST_SUCCESS,
  GET_DELETE_ALL_GROCERIRES_LIST_FAILURE,
  GET_DELETE_ALL_GROCERIRES_LIST_RESET,
} from './ItemsListPageActions';
import {
  FAILURE,
  INACTIVE,
  LOADING,
  SUCCESS,
} from './../../../Constants/URLConstants';

const initialState = {
  groceriesListData: [],
  newGroceryItem: {
    name: '',
    isAvailable: false,
    availableQuantity: 0,
    type: '',
    useAsPartOf: [],
    shallShowInList: false
  },
  serviceState: INACTIVE,
  loaderVisibility: false,
  successMessage: '',
  errorMessage: '',
  formErrorMessage: '',
};

const ItemsListPageReducer = (state = initialState, action) => {
  // console.log('ItemsListPageReducer >>>> action.type: ', action.type);
  // console.log('ItemsListPageReducer >>>> action.payload: ', action.payload);
  switch (action.type) {
    case GET_GROCERIRES_LIST:
      state = {
        ...state,
        formErrorMessage: '',
        serviceState: LOADING,
        loaderVisibility: true,
      };
      break;
    case GET_LOCAL_ANMIE_UPDATED_GROCERIRES_LIST:
      state = {
        ...state,
        formErrorMessage: '',
        serviceState: LOADING,
        loaderVisibility: true,
      };
      break;
    case GET_GROCERIRES_LIST_SUCCESS:
      state = {
        ...state,
        groceriesListData: action.payload,
        formErrorMessage: '',
        serviceState: SUCCESS,
        loaderVisibility: false,
      };
      break;
    case GET_GROCERIRES_LIST_FAILURE:
      state = {
        ...state,
        formErrorMessage: action.payload,
        serviceState: FAILURE,
        loaderVisibility: false
      };
      break;
    case GET_GROCERIRES_LIST_RESET:
      state = {
        successMessage: '',
        errorMessage: '',
        formErrorMessage: '',
        serviceState: INACTIVE,
        loaderVisibility: false,
      };
      break;
    case GET_UPDATE_ADD_GROCERIES_LIST_ITEM:
      state = {
        ...state,
        newGroceryItem: action.payload,
        successMessage: '',
        errorMessage: '',
        formErrorMessage: '',
        serviceState: INACTIVE,
        loaderVisibility: false,
      };
      break;
    case GET_ADD_GROCERIRES_LIST:
      state = {
        ...state,
        formErrorMessage: '',
        serviceState: LOADING,
        loaderVisibility: true,
      };
      break;
    case GET_ADD_GROCERIRES_LIST_SUCCESS:
      state = {
        ...state,
        formErrorMessage: '',
        serviceState: SUCCESS,
        loaderVisibility: false,
      };
      break;
    case GET_ADD_GROCERIRES_LIST_FAILURE:
      state = {
        ...state,
        formErrorMessage: action.payload,
        serviceState: FAILURE,
        loaderVisibility: false
      };
      break;
    case GET_ADD_GROCERIRES_LIST_RESET:
      state = {
        newGroceryItem: {
          name: '',
          isAvailable: false,
          availableQuantity: 0,
          type: '',
          useAsPartOf: [],
          shallShowInList: false
        },
        successMessage: '',
        errorMessage: '',
        formErrorMessage: '',
        serviceState: INACTIVE,
        loaderVisibility: false,
      };
      break;
    case GET_DELETE_GROCERIRES_LIST:
      state = {
        ...state,
        formErrorMessage: '',
        serviceState: LOADING,
        loaderVisibility: true,
      };
      break;
    case GET_DELETE_GROCERIRES_LIST_SUCCESS:
      state = {
        ...state,
        formErrorMessage: '',
        serviceState: SUCCESS,
        loaderVisibility: false,
      };
      break;
    case GET_DELETE_GROCERIRES_LIST_FAILURE:
      state = {
        ...state,
        formErrorMessage: action.payload,
        serviceState: FAILURE,
        loaderVisibility: false
      };
      break;
    case GET_DELETE_GROCERIRES_LIST_RESET:
      state = {
        successMessage: '',
        errorMessage: '',
        formErrorMessage: '',
        serviceState: INACTIVE,
        loaderVisibility: false,
      };
      break;
    case GET_DELETE_ALL_GROCERIRES_LIST:
      state = {
        ...state,
        formErrorMessage: '',
        serviceState: LOADING,
        loaderVisibility: true,
      };
      break;
    case GET_DELETE_ALL_GROCERIRES_LIST_SUCCESS:
      state = {
        ...state,
        formErrorMessage: '',
        serviceState: SUCCESS,
        loaderVisibility: false,
      };
      break;
    case GET_DELETE_ALL_GROCERIRES_LIST_FAILURE:
      state = {
        ...state,
        formErrorMessage: action.payload,
        serviceState: FAILURE,
        loaderVisibility: false
      };
      break;
    case GET_DELETE_ALL_GROCERIRES_LIST_RESET:
      state = {
        groceriesListData: [],
        successMessage: '',
        errorMessage: '',
        formErrorMessage: '',
        serviceState: INACTIVE,
        loaderVisibility: false,
      };
      break;
  }
  // console.log('ItemsListPageReducer >>>> return >>>> state: ', state);
  return state;
};

export default ItemsListPageReducer;
