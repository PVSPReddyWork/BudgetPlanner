import { ExecuteMYSqliteDBOperations } from './../../LocalDBServices/index';
import { EXPENSES_LIST_TABLE } from './../../LocalDBServices/TablesConstants';
import { DATA_NOT_AVAILABLE_MESSAGE, CATCH_TRIGGERED_MESSAGE } from './../../../Constants/TextConstants';
import {
  PostGetAvailableMonthlyExpenseData,
  mainURL,
  SUCCESS_STATUS_CODE,
} from './../../../Constants/URLConstants';
import { ConsoleLogger, ErrorEventLogger } from './../../../Helpers/EventLogger';


export function fetchSyncEachMonthExpenseListData(dispatchSyncEachMonthExpenseData, syncExpensesRequestParms, getSyncEachMonthExpenseDataSuccess, getSyncEachMonthExpenseDataFailure, shallDispatchData = false, getSyncEachMonthExpenseDataInit = null) {
  try {
    fetchLocalEachMonthExpenseListData(dispatchSyncEachMonthExpenseData, syncExpensesRequestParms, getSyncEachMonthExpenseDataSuccess, getSyncEachMonthExpenseDataFailure, shallDispatchData, getSyncEachMonthExpenseDataInit);
  } catch (error) {
    ErrorEventLogger(error);
    if (dispatchSyncEachMonthExpenseData != null && getSyncEachMonthExpenseDataFailure !== null && shallDispatchData) {
      dispatchSyncEachMonthExpenseData(getSyncEachMonthExpenseDataFailure('Catch Block triggered'));
    }
  };
}

export function fetchLocalEachMonthExpenseListData(dispatchLocalEachMonthExpenseData, expensesRequestParms, getLocalEachMonthExpenseDataSuccess, getLocalEachMonthExpenseDataFailure, shallDispatchData = false, getLocalEachMonthExpenseDataInit = null) {
  var _expensesRequestParms = { ...expensesRequestParms, localDBEachMonthListItemsData: [] };
  try {
    const dbQuery = `year='${expensesRequestParms.year}' AND month='${expensesRequestParms.sheetName}'`;
    ExecuteMYSqliteDBOperations.getAvailableDataFromTable(EXPENSES_LIST_TABLE, dbQuery, [],
      (responseJSON) => {
        if (responseJSON.status_code === SUCCESS_STATUS_CODE) {
          const _listItemsData = responseJSON.response_data;
          var listItemsData = [];
          var totalAmount = 0;
          for (let i = 0; i < _listItemsData.length; i++) {
            const eachListItem = _listItemsData[i];
            listItemsData.push({ ...eachListItem, isOpen: false });
            var floatValue = parseFloat(eachListItem.amountSpend);
            if (!isNaN(floatValue)) {
              totalAmount = totalAmount + parseFloat(eachListItem.amountSpend);
            }
          }

          // ConsoleLogger("Data Response >>>> ", listItemsData);
          if (dispatchLocalEachMonthExpenseData != null && getLocalEachMonthExpenseDataSuccess !== null && shallDispatchData) {
            dispatchLocalEachMonthExpenseData(getLocalEachMonthExpenseDataSuccess({
              expenseListItems: listItemsData, pageTitle: expensesRequestParms.sheetName + '(' + totalAmount + ')',
            }));
          }
          _expensesRequestParms = { ..._expensesRequestParms, localDBEachMonthListItemsData: listItemsData }
          fetchServerEachMonthExpenseListData(dispatchLocalEachMonthExpenseData, _expensesRequestParms, getLocalEachMonthExpenseDataSuccess, getLocalEachMonthExpenseDataFailure, shallDispatchData, getLocalEachMonthExpenseDataInit);
        }
        else {
          if (dispatchLocalEachMonthExpenseData != null && getLocalEachMonthExpenseDataFailure !== null && shallDispatchData) {
            dispatchLocalEachMonthExpenseData(getLocalEachMonthExpenseDataFailure({
              errorMessage: 'No data found',
            }));
          }
          fetchServerEachMonthExpenseListData(dispatchLocalEachMonthExpenseData, _expensesRequestParms, getLocalEachMonthExpenseDataSuccess, getLocalEachMonthExpenseDataFailure, shallDispatchData, getLocalEachMonthExpenseDataInit);
          ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
        }
      }, (error) => {
        if (dispatchLocalEachMonthExpenseData != null && getLocalEachMonthExpenseDataFailure !== null && shallDispatchData) {
          dispatchLocalEachMonthExpenseData(getLocalEachMonthExpenseDataFailure({
            errorMessage: DATA_NOT_AVAILABLE_MESSAGE,
          }));
        }
        fetchServerEachMonthExpenseListData(dispatchLocalEachMonthExpenseData, _expensesRequestParms, getLocalEachMonthExpenseDataSuccess, getLocalEachMonthExpenseDataFailure, shallDispatchData, getLocalEachMonthExpenseDataInit);
        ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
      });
  }
  catch (error) {
    ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
    if (dispatchLocalEachMonthExpenseData != null && getLocalEachMonthExpenseDataFailure !== null && shallDispatchData) {
      dispatchLocalEachMonthExpenseData(getLocalEachMonthExpenseDataFailure({
        errorMessage: 'Catch block triggered',
      }));
    }
    fetchServerEachMonthExpenseListData(dispatchLocalEachMonthExpenseData, _expensesRequestParms, getLocalEachMonthExpenseDataSuccess, getLocalEachMonthExpenseDataFailure, shallDispatchData, getLocalEachMonthExpenseDataInit);
  }
}

export function fetchServerEachMonthExpenseListData(dispatchServerEachMonthExpenseData, expensesRequestParms, getServerEachMonthExpenseDataSuccess, getServerEachMonthExpenseDataFailure, shallDispatchData = false, getServerEachMonthExpenseDataInit = null) {
  var _expensesRequestParms = { ...expensesRequestParms, serverEachMonthListItemsData: [] };
  try {
    if(getServerEachMonthExpenseDataInit !== null){
      dispatchServerEachMonthExpenseData(getServerEachMonthExpenseDataInit(expensesRequestParms ));
    }
    const url = mainURL + PostGetAvailableMonthlyExpenseData;
    const postData = {
      method_name: 'getDatabyMonth',
      service_request_data: {
        month: expensesRequestParms.sheetName,
        year: expensesRequestParms.year,
      },
    };

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Accept-Encoding': ['gzip', 'deflate', 'br'],
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        if (responseJSON.status_code === SUCCESS_STATUS_CODE) {
          _expensesRequestParms = { ..._expensesRequestParms, serverEachMonthListItemsData: responseJSON.response_data };
          fetchSyncEachMonthExpenseListDataFinal(dispatchServerEachMonthExpenseData, _expensesRequestParms, getServerEachMonthExpenseDataSuccess, getServerEachMonthExpenseDataFailure, shallDispatchData, getServerEachMonthExpenseDataInit);
        }
      })
      .catch((error) => {
        fetchSyncEachMonthExpenseListDataFinal(dispatchServerEachMonthExpenseData, _expensesRequestParms, getServerEachMonthExpenseDataSuccess, getServerEachMonthExpenseDataFailure, shallDispatchData, getServerEachMonthExpenseDataInit);
        if (dispatchServerEachMonthExpenseData != null && getServerEachMonthExpenseDataFailure !== null && shallDispatchData) {
          dispatchServerEachMonthExpenseData(getServerEachMonthExpenseDataFailure({
            errorMessage: 'Catch Block triggered for fetch',
          }));
        }
        ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
      });
  } catch (error) {
    ErrorEventLogger(error);
    fetchSyncEachMonthExpenseListDataFinal(dispatchServerEachMonthExpenseData, _expensesRequestParms, getServerEachMonthExpenseDataSuccess, getServerEachMonthExpenseDataFailure, shallDispatchData, getServerEachMonthExpenseDataInit);
    if (dispatchServerEachMonthExpenseData != null && getServerEachMonthExpenseDataFailure !== null && shallDispatchData) {
      dispatchServerEachMonthExpenseData(getServerEachMonthExpenseDataFailure({ errorMessage: 'Catch Block triggered' }));
    }
  };
}

export function fetchSyncEachMonthExpenseListDataFinal(dispatchSyncEachMonthExpenseData, syncExpensesRequestParms, getSyncEachMonthExpenseDataSuccess, getSyncEachMonthExpenseDataFailure, shallDispatchData = false, getSyncEachMonthExpenseDataInit = null) {

  // ConsoleLogger("Sync Expense Params >>>> ", syncExpensesRequestParms);
  /*
  const {
    serverListItemsData,
    localDBListItemsData
  } = syncExpensesRequestParms;
  */
  var serverListItemsData = (syncExpensesRequestParms.serverEachMonthListItemsData !== null && syncExpensesRequestParms.serverEachMonthListItemsData !== undefined) ? syncExpensesRequestParms.serverEachMonthListItemsData : [];
  var localDBListItemsData = (syncExpensesRequestParms.localDBEachMonthListItemsData !== null && syncExpensesRequestParms.localDBEachMonthListItemsData !== undefined) ? syncExpensesRequestParms.localDBEachMonthListItemsData : [];

  try {
    if (localDBListItemsData.length > 0 && serverListItemsData.length > 0) {

      let expenseItems = [];
      serverListItemsData.forEach(serverItem => {
        let isItemExisted = false;
        localDBListItemsData.forEach(localItem => {
          if (localItem.expenditureId === serverItem.expenditureId) {
            isItemExisted = true;
          }
          else {
          }
        });
        if(!isItemExisted){
          expenseItems.push(serverItem);
        }
      });
      localDBListItemsData = [...localDBListItemsData, ...expenseItems];
    }
    else if (localDBListItemsData.length <= 0 && serverListItemsData.length > 0) {
      localDBListItemsData = serverListItemsData;
    }
    else { }
    // ConsoleLogger("Server Data Response >>>> ", serverListItemsData);
    // ConsoleLogger("Local Data Response >>>> ", localDBListItemsData);
    var totalAmount = 0;
    localDBListItemsData.map((item) => {
      var floatValue = parseFloat(item.amountSpend);
      if (!isNaN(floatValue)) {
        totalAmount = totalAmount + parseFloat(item.amountSpend);
      }
    });
    if (dispatchSyncEachMonthExpenseData != null && getSyncEachMonthExpenseDataSuccess !== null && shallDispatchData) {
      dispatchSyncEachMonthExpenseData(getSyncEachMonthExpenseDataSuccess({
        expenseListItems: localDBListItemsData, pageTitle: syncExpensesRequestParms.sheetName + '(' + totalAmount + ')',
      }));
    }

  } catch (error) {
    ErrorEventLogger(error);
    if (dispatchSyncEachMonthExpenseData != null && getSyncEachMonthExpenseDataFailure !== null && shallDispatchData) {
      dispatchSyncEachMonthExpenseData(getSyncEachMonthExpenseDataFailure({ errorMessage: 'Catch block triggered', }));
    }
  };
}
