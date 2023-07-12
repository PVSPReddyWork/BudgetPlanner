import { ExecuteMYSqliteDBOperations } from './../../LocalDBServices/index';
import { YEARS_LIST_TABLE } from './../../LocalDBServices/TablesConstants';
import { DATA_NOT_AVAILABLE_MESSAGE, CATCH_TRIGGERED_MESSAGE } from './../../../Constants/TextConstants';
import {
  GetAvailableYearsMonths,
  mainURL,
  SUCCESS_STATUS_CODE,
} from './../../../Constants/URLConstants';
import { ConsoleLogger, ErrorEventLogger } from './../../../Helpers/EventLogger';


export function fetchSyncExpenseYearsData(dispatchSyncExpenseYearsMonthsData, syncExpensesRequestParms, getSyncExpenseYearsMonthsDataSuccess, getSyncExpenseYearsMonthsDataFailure, shallDispatchData = false, getSyncExpenseYearsMonthsDataInit = null) {
  try {
    fetchLocalExpenseYearsData(dispatchSyncExpenseYearsMonthsData, syncExpensesRequestParms, getSyncExpenseYearsMonthsDataSuccess, getSyncExpenseYearsMonthsDataFailure, shallDispatchData, getSyncExpenseYearsMonthsDataInit);
  } catch (error) {
    ErrorEventLogger(error);
    if (dispatchSyncExpenseYearsMonthsData != null && getSyncExpenseYearsMonthsDataFailure !== null && shallDispatchData) {
      dispatchSyncExpenseYearsMonthsData(getSyncExpenseYearsMonthsDataFailure('Catch Block triggered'));
    }
  };
}

export function fetchLocalExpenseYearsData(dispatchLocalExpenseYearsMonthsData, expensesRequestParms, getLocalExpenseYearsMonthsDataSuccess, getLocalExpenseYearsMonthsDataFailure, shallDispatchData = false, getLocalExpenseYearsMonthsDataInit = null) {
  var _expensesRequestParms = { ...expensesRequestParms, localDBListItemsData: [] };
  try {
    ExecuteMYSqliteDBOperations.getAvailableDataFromTable(YEARS_LIST_TABLE, "", [],
      (responseJSON) => {
        const _localDBListItemsData = responseJSON.response_data;
        // ConsoleLogger("Available year list items >>>>>>>>>>>> ", _localDBListItemsData);
        var localDBListItemsData = [];
        for (let i = 0; i < _localDBListItemsData.length; i++) {
          const eachListItem = _localDBListItemsData[i];

          const currentSheet =
          {
            "sheetName": eachListItem.month
          };
          let newListItem = {
            "name": eachListItem.file_name,
            "id": localDBListItemsData.length,
            "url": '',
            "sheetsList": [
            ]
          }

          if (localDBListItemsData.length <= 0) {
            newListItem.sheetsList.push(currentSheet);
            localDBListItemsData.push({ ...newListItem, isOpen: false });
          }
          else {
            const __listItemsData = localDBListItemsData;
            let itemIndex = -1;
            for (let j = 0; j < __listItemsData.length; j++) {
              let existingListItem = __listItemsData[j];
              if (existingListItem.name === eachListItem.file_name) {
                itemIndex = j;
              }
            }
            if (itemIndex === -1) {
              newListItem.sheetsList.push(currentSheet);
              localDBListItemsData.push({ ...newListItem, isOpen: false });
            }
            else {
              let existingListItem = __listItemsData[itemIndex];
              existingListItem.sheetsList.push(currentSheet);
              localDBListItemsData[itemIndex] = { ...existingListItem, isOpen: false };
            }
          }
        }
        // ConsoleLogger("Data Response >>>> ", localDBListItemsData);
        _expensesRequestParms = { ..._expensesRequestParms, localDBListItemsData: localDBListItemsData }
        //fetchServerExpenseYearsData(dispatchLocalExpenseYearsMonthsData, _expensesRequestParms, getLocalExpenseYearsMonthsDataSuccess, getLocalExpenseYearsMonthsDataFailure, shallDispatchData, getLocalExpenseYearsMonthsDataInit);
        if (dispatchLocalExpenseYearsMonthsData != null && getLocalExpenseYearsMonthsDataSuccess !== null && shallDispatchData) {
          dispatchLocalExpenseYearsMonthsData(getLocalExpenseYearsMonthsDataSuccess(localDBListItemsData));
        }
        fetchServerExpenseYearsData(dispatchLocalExpenseYearsMonthsData, _expensesRequestParms, getLocalExpenseYearsMonthsDataSuccess, getLocalExpenseYearsMonthsDataFailure, shallDispatchData, getLocalExpenseYearsMonthsDataInit);
      }, (error) => {
        if (dispatchLocalExpenseYearsMonthsData != null && getLocalExpenseYearsMonthsDataFailure !== null && shallDispatchData) {
          dispatchLocalExpenseYearsMonthsData(getLocalExpenseYearsMonthsDataFailure(DATA_NOT_AVAILABLE_MESSAGE));
        }
        fetchServerExpenseYearsData(dispatchLocalExpenseYearsMonthsData, _expensesRequestParms, getLocalExpenseYearsMonthsDataSuccess, getLocalExpenseYearsMonthsDataFailure, shallDispatchData, getLocalExpenseYearsMonthsDataInit);
        ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
      });
  }
  catch (error) {
    ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
    if (dispatchLocalExpenseYearsMonthsData != null && getLocalExpenseYearsMonthsDataFailure !== null && shallDispatchData) {
      dispatchLocalExpenseYearsMonthsData(getLocalExpenseYearsMonthsDataFailure(''),);
    }
    fetchServerExpenseYearsData(dispatchLocalExpenseYearsMonthsData, _expensesRequestParms, getLocalExpenseYearsMonthsDataSuccess, getLocalExpenseYearsMonthsDataFailure, shallDispatchData, getLocalExpenseYearsMonthsDataInit);
  }
}

export function fetchServerExpenseYearsData(dispatchServerExpenseYearsMonthsData, expensesRequestParms, getServerExpenseYearsMonthsDataSuccess, getServerExpenseYearsMonthsDataFailure, shallDispatchData = false, getServerExpenseYearsMonthsDataInit = null) {
  var _expensesRequestParms = { ...expensesRequestParms, serverListItemsData: [] };
  try {
    if(getServerExpenseYearsMonthsDataInit !== null){
      dispatchServerExpenseYearsMonthsData(getServerExpenseYearsMonthsDataInit());
    }
    const url = mainURL + GetAvailableYearsMonths;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Accept-Encoding': ['gzip', 'deflate', 'br'],
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        if (responseJSON.status_code === SUCCESS_STATUS_CODE) {
          const _serverListItemsData = responseJSON.response_data;
          var serverListItemsData = [];
          for (let i = 0; i < _serverListItemsData.length; i++) {
            const eachListItem = _serverListItemsData[i];
            serverListItemsData.push({ ...eachListItem, isOpen: false });
          }
          _expensesRequestParms = { ..._expensesRequestParms, serverListItemsData: serverListItemsData };
          fetchSyncExpenseYearsDataFinal(dispatchServerExpenseYearsMonthsData, _expensesRequestParms, getServerExpenseYearsMonthsDataSuccess, getServerExpenseYearsMonthsDataFailure, shallDispatchData, getServerExpenseYearsMonthsDataInit);
        }
      })
      .catch((error) => {
        fetchSyncExpenseYearsDataFinal(dispatchServerExpenseYearsMonthsData, _expensesRequestParms, getServerExpenseYearsMonthsDataSuccess, getServerExpenseYearsMonthsDataFailure, shallDispatchData, getServerExpenseYearsMonthsDataInit);
        if (dispatchServerExpenseYearsMonthsData != null && getServerExpenseYearsMonthsDataFailure !== null && shallDispatchData) {
          dispatchServerExpenseYearsMonthsData(getServerExpenseYearsMonthsDataFailure(''),);
        }
        ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
      });
  } catch (error) {
    ErrorEventLogger(error);
    fetchSyncExpenseYearsDataFinal(dispatchServerExpenseYearsMonthsData, _expensesRequestParms, getServerExpenseYearsMonthsDataSuccess, getServerExpenseYearsMonthsDataFailure, shallDispatchData, getServerExpenseYearsMonthsDataInit);
    if (dispatchServerExpenseYearsMonthsData != null && getServerExpenseYearsMonthsDataFailure !== null && shallDispatchData) {
      dispatchServerExpenseYearsMonthsData(getServerExpenseYearsMonthsDataFailure('Catch Block triggered'));
    }
  };
}

export function fetchSyncExpenseYearsDataFinal(dispatchSyncExpenseYearsMonthsData, syncExpensesRequestParms, getSyncExpenseYearsMonthsDataSuccess, getSyncExpenseYearsMonthsDataFailure, shallDispatchData = false, getSyncExpenseYearsMonthsDataInit = null) {

  // ConsoleLogger("Sync Expense Params >>>> ", syncExpensesRequestParms);
  /*
  const {
    serverListItemsData,
    localDBListItemsData
  } = syncExpensesRequestParms;
  */
  var serverListItemsData = (syncExpensesRequestParms.serverListItemsData !== null && syncExpensesRequestParms.serverListItemsData !== undefined) ? syncExpensesRequestParms.serverListItemsData : [];
  var localDBListItemsData = (syncExpensesRequestParms.localDBListItemsData !== null && syncExpensesRequestParms.localDBListItemsData !== undefined) ? syncExpensesRequestParms.localDBListItemsData : [];

  try {
    if (localDBListItemsData.length > 0 && serverListItemsData.length > 0) {

      let yearItems = [];
      serverListItemsData.forEach(serverItem => {
        let isItemExisted = false;
        localDBListItemsData.forEach(localItem => {
          if (localItem.name === serverItem.name) {
            isItemExisted = true;
            serverItem.sheetsList.forEach(serverListMonthsData => {
              let isMonthExisted = false;
              localItem.sheetsList.forEach(localListMonthsData => {
                if (serverListMonthsData.sheetName === localListMonthsData.sheetName) {
                  isMonthExisted = true;
                }
              });
              if (isMonthExisted === false) {
                localItem.sheetsList.push(serverListMonthsData);
              }
            })
          }
          else { }
        });
        if(!isItemExisted){
          yearItems.push(serverItem);
        }
      });
      localDBListItemsData = [...localDBListItemsData, ...yearItems];
    }
    else if (localDBListItemsData.length <= 0 && serverListItemsData.length > 0) {
      localDBListItemsData = serverListItemsData;
    }
    else { }

    // ConsoleLogger("Server Data Response >>>> ", serverListItemsData);
    // ConsoleLogger("Local Data Response >>>> ", localDBListItemsData);
    if (dispatchSyncExpenseYearsMonthsData != null && getSyncExpenseYearsMonthsDataSuccess !== null && shallDispatchData) {
      dispatchSyncExpenseYearsMonthsData(getSyncExpenseYearsMonthsDataSuccess(localDBListItemsData));
    }

  } catch (error) {
    ErrorEventLogger(error);
    if (dispatchSyncExpenseYearsMonthsData != null && getSyncExpenseYearsMonthsDataFailure !== null && shallDispatchData) {
      dispatchSyncExpenseYearsMonthsData(getSyncExpenseYearsMonthsDataFailure('Catch Block triggered'));
    }
  };
}

