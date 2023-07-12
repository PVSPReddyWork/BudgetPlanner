import { GROCERIES_LIST } from "../../../BAL/LocalDBServices/LocalDBConstants";
import { CustomAsyncStorage } from "../../../BAL/LocalDBServices/index";
// import { AvailableItems } from './ItemsListPageComponents/DefaultItems';
import { ConsoleLogger, ErrorEventLogger } from "../../../Helpers/EventLogger";
import { GetDyanmicIDFromDate } from "../../../Helpers/DateTimeManipulations";
import {
  OPTION_SORT_BY_NAME_A_Z_TEXT,
  OPTION_SORT_BY_NAME_Z_A_TEXT,
  OPTION_SORT_BY_SHOW_ALL_TEXT,
  OPTION_SORT_BY_AVAILABILITY_TEXT,
  OPTION_SORT_BY_UNAVAILABILITY_TEXT,
} from './ItemsListPageComponents/SearchComponent';
import { sortByAscendingOrder, sortByDescendingOrder } from "../../../Helpers/Helper";


export const GET_GROCERIRES_LIST = 'GET_GROCERIRES_LIST';
// export const GET_LOCAL_ANMIE_UPDATED_GROCERIRES_LIST = 'GET_LOCAL_ANMIE_UPDATED_GROCERIRES_LIST';
// export const GET_LOCAL_SORTED_FILTERED_GROCERIRES_LIST = 'GET_LOCAL_SORTED_FILTERED_GROCERIRES_LIST';
export const GET_GROCERIRES_LIST_SUCCESS = 'GET_GROCERIRES_LIST_SUCCESS';
export const GET_GROCERIRES_LIST_FAILURE = 'GET_GROCERIRES_LIST_FAILURE';
export const GET_GROCERIRES_LIST_RESET = 'GET_GROCERIRES_LIST_RESET';

export const GET_UPDATE_ADD_GROCERIES_LIST_ITEM = 'GET_UPDATE_ADD_GROCERIES_LIST_ITEM';
export const GET_ADD_GROCERIRES_LIST = 'GET_ADD_GROCERIRES_LIST';
export const GET_ADD_GROCERIRES_LIST_SUCCESS = 'GET_ADD_GROCERIRES_LIST_SUCCESS';
export const GET_ADD_GROCERIRES_LIST_FAILURE = 'GET_ADD_GROCERIRES_LIST_FAILURE';
export const GET_ADD_GROCERIRES_LIST_RESET = 'GET_ADD_GROCERIRES_LIST_RESET';

export const GET_DELETE_GROCERIRES_LIST = 'GET_DELETE_GROCERIRES_LIST';
export const GET_DELETE_GROCERIRES_LIST_SUCCESS = 'GET_DELETE_GROCERIRES_LIST_SUCCESS';
export const GET_DELETE_GROCERIRES_LIST_FAILURE = 'GET_DELETE_GROCERIRES_LIST_FAILURE';
export const GET_DELETE_GROCERIRES_LIST_RESET = 'GET_DELETE_GROCERIRES_LIST_RESET';

export const GET_DELETE_ALL_GROCERIRES_LIST = 'GET_DELETE_ALL_GROCERIRES_LIST';
export const GET_DELETE_ALL_GROCERIRES_LIST_SUCCESS = 'GET_DELETE_ALL_GROCERIRES_LIST_SUCCESS';
export const GET_DELETE_ALL_GROCERIRES_LIST_FAILURE = 'GET_DELETE_ALL_GROCERIRES_LIST_FAILURE';
export const GET_DELETE_ALL_GROCERIRES_LIST_RESET = 'GET_DELETE_ALL_GROCERIRES_LIST_RESET';

const getGroceriesList = () => ({
  type: GET_GROCERIRES_LIST
});
// const getLocalAnmieUpdatedGroceriesList = (groceriesListData) => ({
//     type: GET_LOCAL_ANMIE_UPDATED_GROCERIRES_LIST,
//     payload: groceriesListData,
// });
// const fetchGetLocalSortedFilteredGroceriesList = () => ({
//     type: GET_LOCAL_SORTED_FILTERED_GROCERIRES_LIST,
// });
const getGroceriesListSuccess = (groceriesListData) => ({
  type: GET_GROCERIRES_LIST_SUCCESS,
  payload: groceriesListData,
});
const getGroceriesListFailure = (failureMessage) => ({
  type: GET_GROCERIRES_LIST_FAILURE,
  payload: failureMessage,
});
const getGroceriesListReset = () => ({
  type: GET_GROCERIRES_LIST_RESET
});

const getUpdateAddGroceriesListItem = (groceryItem) => ({
  type: GET_UPDATE_ADD_GROCERIES_LIST_ITEM,
  payload: groceryItem,
});
const getAddGroceriesList = () => ({
  type: GET_ADD_GROCERIRES_LIST
});
const getAddGroceriesListSuccess = () => ({
  type: GET_ADD_GROCERIRES_LIST_SUCCESS
});
const getAddGroceriesListFailure = (failureMessage) => ({
  type: GET_ADD_GROCERIRES_LIST_FAILURE,
  payload: failureMessage,
});
const fetchGetAddGroceriesListReset = () => ({
  type: GET_ADD_GROCERIRES_LIST_RESET
});

const getDeleteGroceriesList = () => ({
  type: GET_DELETE_GROCERIRES_LIST
});
const getDeleteGroceriesListSuccess = () => ({
  type: GET_DELETE_GROCERIRES_LIST_SUCCESS
});
const getDeleteGroceriesListFailure = (failureMessage) => ({
  type: GET_DELETE_GROCERIRES_LIST_FAILURE,
  payload: failureMessage,
});
const getDeleteGroceriesListReset = () => ({
  type: GET_DELETE_GROCERIRES_LIST_RESET
});

const getDeleteAllGroceriesList = () => ({
  type: GET_DELETE_ALL_GROCERIRES_LIST
});
const getDeleteAllGroceriesListSuccess = () => ({
  type: GET_DELETE_ALL_GROCERIRES_LIST_SUCCESS
});
const getDeleteAllGroceriesListFailure = (failureMessage) => ({
  type: GET_DELETE_ALL_GROCERIRES_LIST_FAILURE,
  payload: failureMessage,
});
const getDeleteAllGroceriesListReset = () => ({
  type: GET_DELETE_ALL_GROCERIRES_LIST_RESET
});


export function fetchGetLocalAnmieUpdatedGroceriesList(gorceriesList) {
  return async (dispatchGetLocalAnmieUpdatedGroceriesList) => {
    dispatchGetLocalAnmieUpdatedGroceriesList(getGroceriesList());
    try {
      dispatchGetLocalAnmieUpdatedGroceriesList(getGroceriesListSuccess(gorceriesList));
    } catch (error) {
      ErrorEventLogger(error);
      dispatchGetLocalAnmieUpdatedGroceriesList(
        getGroceriesListFailure('Catch Block triggered'),
      );
    }
  };
}

export function fetchGetLocalSearchGroceriesListAction(searchString) {
  return async (dispatchGetLocalSortedFilteredGroceriesList) => {
    dispatchGetLocalSortedFilteredGroceriesList(getGroceriesList());
    try {
      CustomAsyncStorage.getDataFromStorage(
        GROCERIES_LIST,
        (success_Data) => {
          let available_Groceries_List_Data = [];
          if (success_Data !== null && success_Data !== undefined && success_Data.response_data !== null && success_Data.response_data !== undefined) {
            available_Groceries_List_Data = JSON.parse(success_Data.response_data);
            available_Groceries_List_Data = available_Groceries_List_Data.filter((item) => item.shallShowInList === true);
            available_Groceries_List_Data = available_Groceries_List_Data.map((item) => {
              let finalItem = {
                ...item,
                openOptions: false,
              }
              return finalItem;
            });
          }

          let availableGroceriesListData = available_Groceries_List_Data;

          if(searchString !== null && searchString !== undefined && searchString !== ''){
            availableGroceriesListData = availableGroceriesListData.filter((item) => item.name.toString().toLowerCase().includes(searchString.toLowerCase()));
          }

          ConsoleLogger(
            'ListItemPageActions >>>> fetchGetLocalSearchGroceriesListAction >>>> CustomAsyncStorage.getDataFromStorage >>>> availableGroceriesListData: ',
            availableGroceriesListData,
          );
          dispatchGetLocalSortedFilteredGroceriesList(getGroceriesListSuccess(availableGroceriesListData));
        },
        (failureData) => {
          dispatchGetLocalSortedFilteredGroceriesList(getGroceriesListFailure(failureData));
        },
      );
    } catch (error) {
      ErrorEventLogger(error);
      dispatchGetLocalSortedFilteredGroceriesList(
        getGroceriesListFailure('Catch Block triggered'),
      );
    }
  };
}

export function fetchGetLocalSortedGroceriesListAction(sortFilterOrder, gorceriesListItems) {
  return async (dispatchGetLocalSortedFilteredGroceriesList) => {
    dispatchGetLocalSortedFilteredGroceriesList(getGroceriesList());
    try {
      let availableGroceriesListData = gorceriesListItems;//available_Groceries_List_Data;

          if (sortFilterOrder === OPTION_SORT_BY_NAME_A_Z_TEXT) {
            availableGroceriesListData = sortByAscendingOrder (gorceriesListItems, 'name');
          } else if (sortFilterOrder === OPTION_SORT_BY_NAME_Z_A_TEXT) {
            availableGroceriesListData = sortByDescendingOrder(gorceriesListItems, 'name');
          } else { }
          ConsoleLogger(
            'ListItemPageActions >>>> fetchGetGroceriesListAction >>>> CustomAsyncStorage.getDataFromStorage >>>> availableGroceriesListData: ',
            availableGroceriesListData,
          );
          dispatchGetLocalSortedFilteredGroceriesList(getGroceriesListSuccess(availableGroceriesListData));
    } catch (error) {
      ErrorEventLogger(error);
      dispatchGetLocalSortedFilteredGroceriesList(
        getGroceriesListFailure('Catch Block triggered'),
      );
    }
  };
}

export function fetchGetLocalFilteredGroceriesListAction(sortFilterOrder) {
  return async (dispatchGetLocalSortedFilteredGroceriesList) => {
    dispatchGetLocalSortedFilteredGroceriesList(getGroceriesList());
    try {
      CustomAsyncStorage.getDataFromStorage(
        GROCERIES_LIST,
        (success_Data) => {
          ConsoleLogger(
            'ListItemPageActions >>>> fetchGetGroceriesListAction >>>> CustomAsyncStorage.getDataFromStorage >>>> success_Data: ',
            success_Data,
          );
          let available_Groceries_List_Data = [];
          if (success_Data !== null && success_Data !== undefined && success_Data.response_data !== null && success_Data.response_data !== undefined) {
            available_Groceries_List_Data = JSON.parse(success_Data.response_data);
            available_Groceries_List_Data = available_Groceries_List_Data.filter((item) => item.shallShowInList === true);
            available_Groceries_List_Data = available_Groceries_List_Data.map((item) => {
              let finalItem = {
                ...item,
                openOptions: false,
              }
              return finalItem;
            });
          }

          let availableGroceriesListData = available_Groceries_List_Data;

          if (sortFilterOrder === OPTION_SORT_BY_NAME_A_Z_TEXT) {
            availableGroceriesListData = sortByAscendingOrder (available_Groceries_List_Data, 'name');
          } else if (sortFilterOrder === OPTION_SORT_BY_NAME_Z_A_TEXT) {
            availableGroceriesListData = sortByDescendingOrder(available_Groceries_List_Data, 'name');
          } else if (sortFilterOrder === OPTION_SORT_BY_AVAILABILITY_TEXT) {
            availableGroceriesListData = available_Groceries_List_Data.filter((item) => (item.isAvailable === true));
          } else if (sortFilterOrder === OPTION_SORT_BY_UNAVAILABILITY_TEXT) {
            availableGroceriesListData = available_Groceries_List_Data.filter((item) => (item.isAvailable === false));
          } else if (sortFilterOrder === OPTION_SORT_BY_SHOW_ALL_TEXT) {
          } else { }
          
          ConsoleLogger(
            'ListItemPageActions >>>> fetchGetGroceriesListAction >>>> CustomAsyncStorage.getDataFromStorage >>>> availableGroceriesListData: ',
            availableGroceriesListData,
          );
          dispatchGetLocalSortedFilteredGroceriesList(getGroceriesListSuccess(availableGroceriesListData));
        },
        (failureData) => {
          dispatchGetLocalSortedFilteredGroceriesList(getGroceriesListFailure(failureData));
        },
      );
    } catch (error) {
      ErrorEventLogger(error);
      dispatchGetLocalSortedFilteredGroceriesList(
        getGroceriesListFailure('Catch Block triggered'),
      );
    }
  };
}

export function fetchGetGroceriesListAction() {
  return async (dispatchGetGroceriesList) => {
    dispatchGetGroceriesList(getGroceriesList());
    try {
      CustomAsyncStorage.getDataFromStorage(
        GROCERIES_LIST,
        (success_Data) => {
          ConsoleLogger(
            'ListItemPageActions >>>> fetchGetGroceriesListAction >>>> CustomAsyncStorage.getDataFromStorage >>>> success_Data: ',
            success_Data,
          );
          let available_Groceries_List_Data = [];
          if (success_Data !== null && success_Data !== undefined && success_Data.response_data !== null && success_Data.response_data !== undefined) {
            available_Groceries_List_Data = JSON.parse(success_Data.response_data);
            available_Groceries_List_Data = available_Groceries_List_Data.filter((item) => item.shallShowInList === true);
            available_Groceries_List_Data = available_Groceries_List_Data.map((item) => {
              let finalItem = {
                ...item,
                openOptions: false,
              }
              return finalItem;
            });
          }
          let availableGroceriesListData = available_Groceries_List_Data;
          ConsoleLogger(
            'ListItemPageActions >>>> fetchGetGroceriesListAction >>>> CustomAsyncStorage.getDataFromStorage >>>> availableGroceriesListData: ',
            availableGroceriesListData,
          );
          dispatchGetGroceriesList(getGroceriesListSuccess(availableGroceriesListData));
        },
        (failureData) => {
          dispatchGetGroceriesList(getGroceriesListFailure(failureData));
        },
      );
    } catch (error) {
      ErrorEventLogger(error);
      dispatchGetGroceriesList(
        getGroceriesListFailure('Catch Block triggered'),
      );
    }
  };
}

export function fetchUpdateAddGroceriesListItem(groceryItem){
  return async (dispatchUpdateAddGroceriesListItem) => {
    dispatchUpdateAddGroceriesListItem(getUpdateAddGroceriesListItem(groceryItem));
  };
}

export function fetchGetAddGroceriesListAction(selectedGroceryItem) {
  return async (dispatchGetAddGroceriesList) => {
    dispatchGetAddGroceriesList(getAddGroceriesList());
    try {
      CustomAsyncStorage.getDataFromStorage(
        GROCERIES_LIST,
        (success_Data) => {
          let available_Groceries_List_Data = [];
          if (success_Data !== null && success_Data.response_data !== null) {
            available_Groceries_List_Data = JSON.parse(success_Data.response_data);
          }

          const itemIndex = available_Groceries_List_Data.findIndex(
            (item) => item.name.toLowerCase() === selectedGroceryItem.name.toLowerCase(),
          );

          if (itemIndex !== null && itemIndex !== undefined && itemIndex > -1) {
            //if item is already available
            let grocery_Item = available_Groceries_List_Data[itemIndex];
            grocery_Item = {
              ...grocery_Item,
              ...selectedGroceryItem,
              shallShowInList: true,
            };
            available_Groceries_List_Data[itemIndex] = grocery_Item;
          } else {
            //if item is not available in the list or a new item to add
            selectedGroceryItem = {
              ...selectedGroceryItem,
              key: GetDyanmicIDFromDate(),
              shallShowInList: true,
              type: '',
              useAsPartOf: [],
            };
            available_Groceries_List_Data.push(selectedGroceryItem);
          }

          CustomAsyncStorage.addDataToStorage(
            GROCERIES_LIST,
            JSON.stringify(available_Groceries_List_Data),
            (successData) => {
              dispatchGetAddGroceriesList(fetchGetGroceriesListAction());
              dispatchGetAddGroceriesList(fetchGetAddGroceriesListReset());
              dispatchGetAddGroceriesList(
                getAddGroceriesListSuccess('Data added successfully'),
              );
            },
            (failureData) => {
              dispatchGetAddGroceriesList(getAddGroceriesListFailure(failureData));
            },
          );
        },
        (failureData) => {
          dispatchGetAddGroceriesList(getAddGroceriesListFailure(failureData));
        },
      );
    } catch (error) {
      ErrorEventLogger(error);
      dispatchGetAddGroceriesList(
        getAddGroceriesListFailure('Catch Block triggered'),
      );
    }
  };
}

export function fetchGetDeleteGroceriesListAction(selectedGroceryItem) {
  return async (dispatchGetDeleteGroceriesList) => {
    dispatchGetDeleteGroceriesList(getDeleteGroceriesList());
    try {
      CustomAsyncStorage.getDataFromStorage(
        GROCERIES_LIST,
        (success_Data) => {
          let available_Groceries_List_Data = [];
          if (success_Data !== null && success_Data.response_data !== null) {
            available_Groceries_List_Data = JSON.parse(success_Data.response_data);
          }

          const itemIndex = available_Groceries_List_Data.findIndex(
            (item) => item.name === selectedGroceryItem.name,
          );
          if (itemIndex !== -1) {
            let groceryItem = available_Groceries_List_Data[itemIndex];
            groceryItem = {
              ...groceryItem,
              shallShowInList: false,
            };
            available_Groceries_List_Data[itemIndex] = groceryItem;
            const availableGroceriesListData = available_Groceries_List_Data;
            CustomAsyncStorage.addDataToStorage(
              GROCERIES_LIST,
              JSON.stringify(availableGroceriesListData),
              (successData) => {
                dispatchGetDeleteGroceriesList(fetchGetGroceriesListAction());
                dispatchGetDeleteGroceriesList(fetchGetAddGroceriesListReset());
                dispatchGetDeleteGroceriesList(
                  getAddGroceriesListSuccess('Data added successfully'),
                );
              },
              (failureData) => {
                dispatchGetDeleteGroceriesList(getAddGroceriesListFailure(failureData));
              },
            );
          } else {
            dispatchGetDeleteGroceriesList(deletePetsFailure('failureData'));
          }
          availableGroceriesListData.push(groceryItem);
        },
        (failureData) => {
          dispatchGetDeleteGroceriesList(getAddGroceriesListFailure(failureData));
        },
      );
    } catch (error) {
      ErrorEventLogger(error);
      dispatchGetDeleteGroceriesList(
        getDeleteGroceriesListFailure('Catch Block triggered'),
      );
    }
  };
}

export function fetchGetDeleteAllGroceriesListAction() {
  return async (dispatchGetDeleteAllGroceriesList) => {
    dispatchGetDeleteAllGroceriesList(getDeleteAllGroceriesList());
    try {
    } catch (error) {
      ErrorEventLogger(error);
      dispatchGetDeleteAllGroceriesList(
        getDeleteAllGroceriesListFailure('Catch Block triggered'),
      );
    }
  };
}