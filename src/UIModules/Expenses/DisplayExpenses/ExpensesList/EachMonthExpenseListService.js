import { ExecuteMYSqliteDBOperations } from '../../../../BAL/LocalDBServices/index';
import { EXPENSES_LIST_TABLE } from '../../../../BAL/LocalDBServices/TablesConstants';
import {
  PostGetAvailableMonthlyExpenseData,
  mainURL,
  SUCCESS_STATUS_CODE,
} from '../../../../Constants/URLConstants';
import { ConsoleLogger, ErrorEventLogger } from '../../../../Helpers/EventLogger';
import {
  getEachMonthExpenseList,
  getEachMonthExpenseListFailure,
  getEachMonthExpenseListSuccess,
} from './EachMonthExpenseListActions';

import { fetchSyncEachMonthExpenseListData } from './../../../../BAL/Services/ExpenseServices/SyncExpenseDataService';

function onInit(expensesRequestParms){
  return async (dispatchEachMonthListInit) => {
    try {
      dispatchEachMonthListInit(getEachMonthExpenseList(expensesRequestParms.sheetName));
    } catch (error) {
      ErrorEventLogger(error);
    }
  };
}

function onGetEachMonthExpenseListSuccess(listItemsData){
  return async (dispatchEachMonthListInit) => {
  try {
    dispatchEachMonthListInit(getEachMonthExpenseListSuccess(listItemsData));
  } catch (error) {
    ErrorEventLogger(error);
  }
}
}

function onGetEachMonthExpenseListFailure(message){
  return async (dispatchEachMonthListInit) => {
  try {
    dispatchEachMonthListInit(
      getEachMonthExpenseListFailure({
        errorMessage: message,
      }),);
  } catch (error) {
    ErrorEventLogger(error);
  }
}
}

export function fetchEachMonthExpenseList(expensesRequestParms) {
  return async (dispatchEachMonthExpenseList) => {
    try {
      dispatchEachMonthExpenseList(onInit(expensesRequestParms));
      // fetchYearsDataFromLocal(dispatchFetchGetYearMonthList, expensesRequestParms, onGetYearMonthListSuccess, onGetYearMonthListFailure);
      fetchSyncEachMonthExpenseListData(dispatchEachMonthExpenseList, expensesRequestParms, onGetEachMonthExpenseListSuccess, onGetEachMonthExpenseListFailure, true, onInit);
    } catch (error) {
      ErrorEventLogger(error);
      dispatchEachMonthExpenseList(
        onGetEachMonthExpenseListFailure({
          errorMessage: 'Catch Block triggered for fetch',
        }),
      );
    }
  };
}

/*
export function fetchEachMonthExpenseListServers(expensesRequestParms) {
  return async (dispatchEachMonthExpenseList) => {
    dispatchEachMonthExpenseList(
      getEachMonthExpenseList(expensesRequestParms.sheetName),
    );
    try {
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
          Accept: '* /*',
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
            var totalAmount = 0;
            responseJSON.response_data.map((item) => {
              var floatValue = parseFloat(item.amountSpend);
              if (!isNaN(floatValue)) {
                totalAmount = totalAmount + parseFloat(item.amountSpend);
              }
            });
            dispatchEachMonthExpenseList(
              getEachMonthExpenseListSuccess({
                expenseListItems: responseJSON.response_data,
                pageTitle:
                  expensesRequestParms.sheetName + '(' + totalAmount + ')',
              }),
            );
          }
        })
        .catch((error) => {
          dispatchEachMonthExpenseList(
            getEachMonthExpenseListFailure({
              errorMessage: 'Catch Block triggered for fetch',
            }),
          );
          ErrorEventLogger(error);
        });
    } catch (error) {
      ErrorEventLogger(error);
      dispatchEachMonthExpenseList(
        getEachMonthExpenseListFailure({ errorMessage: 'Catch Block triggered' }),
      );
    }
  };
}

/*
export function fetchEachMonthExpenseListFromLocal(expensesRequestParms) {
  return async (dispatchEachMonthExpenseList) => {
    dispatchEachMonthExpenseList(
      getEachMonthExpenseList(expensesRequestParms.sheetName),
    );
    try {
      // const dbQuery = `yearID = ${"2020"}`;
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
            ConsoleLogger("Data Response >>>> ", listItemsData);
            dispatchEachMonthExpenseList(
              getEachMonthExpenseListSuccess({
                expenseListItems: listItemsData,
                pageTitle:
                  expensesRequestParms.sheetName + '(' + totalAmount + ')',
              }),
            );
            // dispatchYearsData(getYearsMonthsDataSuccess(listItemsData));
          }
          else{
            dispatchEachMonthExpenseList(
              getEachMonthExpenseListFailure({
                errorMessage: 'No data found',
              }),
            );
          }
        }, (error) => {
          dispatchEachMonthExpenseList(
            getEachMonthExpenseListFailure({
              errorMessage: 'Catch Block triggered for fetch',
            }),
          );
          ErrorEventLogger(error);
        });
    } catch (error) {
      ErrorEventLogger(error);
      dispatchEachMonthExpenseList(
        getEachMonthExpenseListFailure({ errorMessage: 'Catch Block triggered' }),
      );
    }
  };
}
*/