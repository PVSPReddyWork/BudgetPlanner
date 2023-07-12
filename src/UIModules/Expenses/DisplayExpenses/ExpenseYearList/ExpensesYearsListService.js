import { ConsoleLogger, ErrorEventLogger } from '../../../../Helpers/EventLogger';
import {
  getYearsMonthsData,
  getYearsMonthsDataFailure,
  getYearsMonthsDataSuccess,
} from './ExpenseYearListActions';
import { fetchSyncExpenseYearsData } from './../../../../BAL/Services/ExpenseServices/SyncExpenseService';
// import { fetchYearsDataFromLocal } from './../../../../BAL/Services/ExpenseServices/GetExpenseService';


function onInit(){
  return async (dispatchGetYearMonthListInit) => {
    try {
      dispatchGetYearMonthListInit(getYearsMonthsData());
    } catch (error) {
      ErrorEventLogger(error);
    }
  };
}

function onGetYearMonthListSuccess(listItemsData){
  return async (dispatchGetYearMonthListSuccess) => {
  try {
    dispatchGetYearMonthListSuccess(getYearsMonthsDataSuccess(listItemsData));
  } catch (error) {
    ErrorEventLogger(error);
  }
}
}

function onGetYearMonthListFailure(message){
  return async (dispatchGetYearMonthListFailure) => {
  try {
    dispatchGetYearMonthListFailure(
      getYearsMonthsDataFailure({
        errorMessage: message,
      }),);
  } catch (error) {
    ErrorEventLogger(error);
  }
}
}

export function fetchGetYearMonthList(expensesRequestParms) {
  return async (dispatchFetchGetYearMonthList) => {
    dispatchFetchGetYearMonthList(getYearsMonthsData());
    try {
      // fetchYearsDataFromLocal(dispatchFetchGetYearMonthList, expensesRequestParms, onGetYearMonthListSuccess, onGetYearMonthListFailure);
      fetchSyncExpenseYearsData(dispatchFetchGetYearMonthList, expensesRequestParms, onGetYearMonthListSuccess, onGetYearMonthListFailure, true, onInit);
    } catch (error) {
      ErrorEventLogger(error);
      dispatchFetchGetYearMonthList(
        getGetYearMonthListFailure({
          errorMessage: 'Catch Block triggered for fetch',
        }),
      );
    }
  };
}

/*
export function fetchYearsData() {
  return async (dispatchYearsData) => {
    dispatchYearsData(getYearsMonthsData());
    try {
      const url = mainURL + GetAvailableYearsMonths;

      fetch(url, {
        method: 'GET',
        headers: {
          Accept: '*//*',
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
            const _listItemsData = responseJSON.response_data;
            var listItemsData = [];
            for (let i = 0; i < _listItemsData.length; i++) {
              const eachListItem = _listItemsData[i];
              listItemsData.push({ ...eachListItem, isOpen: false });
            }
            dispatchYearsData(getYearsMonthsDataSuccess(listItemsData));
          }
        })
        .catch((error) => {
          dispatchYearsData(
            getYearsMonthsDataFailure(''),
          );
          ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
        });
    } catch (error) {
      ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
      dispatchYearsData(
        getYearsMonthsDataFailure({ errorMessage: 'Catch Block triggered' }),
      );
    }
  };
}

export function fetchYearsDataFromLocal() {
  return async (dispatchYearsData) => {
    dispatchYearsData(getYearsMonthsData());
    try {
      ExecuteMYSqliteDBOperations.getAvailableDataFromTable(YEARS_LIST_TABLE, "", [],
        (responseJSON) => {
          const _listItemsData = responseJSON.response_data;
          ConsoleLogger("Available year list items >>>>>>>>>>>> ", _listItemsData);
          var listItemsData = [];

          // let uniqueListNames = [...new Set(_listItemsData.map(item => item.file_name))];

          for (let i = 0; i < _listItemsData.length; i++) {
            const eachListItem = _listItemsData[i];
            
            const currentSheet = 
            {
              "sheetName": eachListItem.month
            };
            let newListItem = {
              "name": eachListItem.file_name,
              "id": listItemsData.length,
              "url": '',
              "sheetsList": [
              ]
            }

            if ( listItemsData.length <= 0) {
              newListItem.sheetsList.push(currentSheet);
              listItemsData.push({ ...newListItem, isOpen: false });
            }
            else
            {
              const __listItemsData = listItemsData;
              let itemIndex = -1;
              for (let j = 0; j < __listItemsData.length; j++) {
                let existingListItem = __listItemsData[j];
                if(existingListItem.name === eachListItem.file_name)
                {
                  itemIndex = j;
                }
              }
              if(itemIndex === -1){
                newListItem.sheetsList.push(currentSheet);
                listItemsData.push({ ...newListItem, isOpen: false });
              }
              else{
                let existingListItem = __listItemsData[itemIndex];
                existingListItem.sheetsList.push(currentSheet);
                listItemsData[itemIndex] = { ...existingListItem, isOpen: false };
              }
              // for (let j = 0; j < __listItemsData.length; j++) {
              //   let existingListItem = __listItemsData[j];
              //   if(existingListItem.name === eachListItem.file_name)
              //   {
              //     existingListItem.sheetsList.push(currentSheet);
              //     listItemsData[j] = { ...existingListItem, isOpen: false };
              //     //break;
              //   }
              //   else
              //   {
              //     newListItem.sheetsList.push(currentSheet);
              //     listItemsData.push({ ...newListItem, isOpen: false });
              //     //break;
              //   }
              // }
            }
          }

          
          
          // for (let i = 0; i < _listItemsData.length; i++) {
          //   const eachListItem = _listItemsData[i];
          //   const currentSheet = 
          //   {
          //     "sheetName": eachListItem.month
          //   };
          //   var newListItem = {
          //     "name": eachListItem.file_name,
          //     "id": listItemsData.length,
          //     "url": '',
          //     "sheetsList": [
          //     ]
          //   }
          //   if ( listItemsData.length <= 0) {
          //     newListItem.sheetsList.push(currentSheet);
          //     listItemsData.push({ ...newListItem, isOpen: false });
          //   }
          //   else
          //   {
          //     const __listItemsData = listItemsData;
          //     for (let j = 0; j < __listItemsData.length; j++) {
          //       let existingListItem = __listItemsData[j];
          //       if(existingListItem.name === eachListItem.file_name)
          //       {
          //         existingListItem.sheetsList.push(currentSheet);
          //         listItemsData[j] = { ...existingListItem, isOpen: false };
          //       }
          //       else
          //       {
          //         newListItem.sheetsList.push(currentSheet);
          //         listItemsData.push({ ...newListItem, isOpen: false });
          //       }
          //     }
          //   }
          // }
          console.log("Data Response >>>> ", listItemsData);
          dispatchYearsData(getYearsMonthsDataSuccess(listItemsData));
        }, (error) => {
          dispatchYearsData(getYearsMonthsDataFailure(DATA_NOT_AVAILABLE_MESSAGE));
          ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
        });
    } catch (error) {
      ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
      dispatchYearsData(
        getYearsMonthsDataFailure(CATCH_TRIGGERED_MESSAGE),
      );
    }
  };
}
*/

