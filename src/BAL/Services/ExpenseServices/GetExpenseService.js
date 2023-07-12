/*
import { ExecuteMYSqliteDBOperations } from './../../LocalDBServices/index';
import { YEARS_LIST_TABLE } from './../../LocalDBServices/TablesConstants';
import { DATA_NOT_AVAILABLE_MESSAGE, CATCH_TRIGGERED_MESSAGE } from './../../../Constants/TextConstants';
import {
  GetAvailableYearsMonths,
  mainURL,
  SUCCESS_STATUS_CODE,
} from './../../../Constants/URLConstants';
import { ConsoleLogger, ErrorEventLogger } from './../../../Helpers/EventLogger';

export function fetchExpenseData(dispatchAddExpense, expensesRequestParms, addExpenseinit, onAddExpenseSuccess, onAddExpenseFailure) {
  dispatchAddExpense(addExpenseinit());
  try {
    fetchAddExpenseLocal(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
  } catch (error) {
    ErrorEventLogger(error);
    dispatchAddExpense(onAddExpenseFailure('Catch Block triggered'));
};
}

export function fetchYearsDataFromServer(dispatchYearsMonthsDataAddExpense, expensesRequestParms, getYearsMonthsDataSuccess, getYearsMonthsDataFailure) {
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
              dispatchYearsMonthsDataAddExpense(getYearsMonthsDataSuccess(listItemsData));
            }
          })
          .catch((error) => {
            dispatchYearsMonthsDataAddExpense(
              getYearsMonthsDataFailure(''),
            );
            ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
          });
      } catch (error) {
        ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
        dispatchYearsMonthsDataAddExpense(
          getYearsMonthsDataFailure({ errorMessage: 'Catch Block triggered' }),
        );
      }
  }
  
  export function fetchYearsDataFromLocal(dispatchYearsMonthsDataAddExpense, expensesRequestParms, getYearsMonthsDataSuccess, getYearsMonthsDataFailure) {
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
              }
            }
            console.log("Data Response >>>> ", listItemsData);
            dispatchYearsMonthsDataAddExpense(getYearsMonthsDataSuccess(listItemsData));
          }, (error) => {
            dispatchYearsMonthsDataAddExpense(getYearsMonthsDataFailure(DATA_NOT_AVAILABLE_MESSAGE));
            ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
          });
      } catch (error) {
        ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
        dispatchYearsMonthsDataAddExpense(
          getYearsMonthsDataFailure(CATCH_TRIGGERED_MESSAGE),
        );
      }
  }

  */

  /*
  export function fetchSyncExpenseData(dispatchSyncExpenseData, expensesRequestParms, getSyncExpenseDataSuccess, getSyncExpenseDataFailure) {
    try {
      const url = mainURL + GetAvailableYearsMonths;
    
          fetch(url, {
            method: 'GET',
            headers: {
              Accept: '* /*',
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
                dispatchSyncExpenseData(getSyncExpenseDataSuccess(listItemsData));
              }
            })
            .catch((error) => {
              dispatchSyncExpenseData(
                getSyncExpenseDataFailure(''),
              );
              ErrorEventLogger('ExpensesYearsListService >>>> fetchYearsDataFromLocal >>>> error: ', error);
            });
    } catch (error) {
      ErrorEventLogger(error);
      dispatchSyncExpenseData(getSyncExpenseDataFailure('Catch Block triggered'));
  };
  }
  */

  /*
  async function AddYearData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure) {
    try {
      const year = (DateManipulations.getYear(new Date(expensesRequestParms.dateOfPurchase))).toString();
      const month = (DateManipulations.getMonth(new Date(expensesRequestParms.dateOfPurchase))).toString();
      const dbQuery = '(month, year, file_name, dateCreated)';
      const values = [
        month,
        year,
        `BudgetPlanner_${year}`,
        new Date().toString()
      ];
      ExecuteMYSqliteDBOperations.insertWithQuery(YEARS_LIST_TABLE, dbQuery, values,
        (response) => {
          CheckForExpenseTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
        }, (error) => {
          dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
          ErrorEventLogger(error);
        });
  
    } catch (error) {
      dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
      ErrorEventLogger(error);
    }
    return null;
  }
  
  async function CreateYearTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure) {
    try {
      ExecuteMYSqliteDBOperations.createTable(YEARS_LIST_TABLE, yearsTable,
        (year_response) => {
          AddYearData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
        },
        (error) => {
          dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
          ErrorEventLogger(error);
        }
      );
    } catch (error) {
      ErrorEventLogger(error);
      dispatchAddExpense(onAddExpenseFailure('Catch Block triggered'));
    }
    return null;
  }
  
  async function CheckForYearTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure) {
    try {
      ExecuteMYSqliteDBOperations.checkForTable(YEARS_LIST_TABLE,
        (yearTableCheckResponse) => {
          if (yearTableCheckResponse.status_code === SUCCESS_STATUS_CODE) {
  
            const year = (DateManipulations.getYear(new Date(expensesRequestParms.dateOfPurchase))).toString();
            const month = (DateManipulations.getMonth(new Date(expensesRequestParms.dateOfPurchase))).toString();
  
            const dbQuery = `year='${year}' AND month='${month}'`;
            ExecuteMYSqliteDBOperations.getAvailableDataFromTable(YEARS_LIST_TABLE, dbQuery, [],
              (yearResponse) => {
                if (yearResponse.status_code === SUCCESS_STATUS_CODE) {
                  CheckForExpenseTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
                }
                else {
                  AddYearData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
                }
              }, (error) => {
                dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
                ErrorEventLogger(error);
              });
            //AddYearData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
          }
          else {
            CreateYearTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
            // CheckForExpenseTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
          }
        }, (error) => {
          // CreateYearTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
          dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
          ErrorEventLogger(error);
        });
    } catch (error) {
      dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
      ErrorEventLogger(error);
    }
    return null;
  }
  */