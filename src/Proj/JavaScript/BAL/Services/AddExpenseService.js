import { ExecuteMYSqliteDBOperations } from '../../LocalDBServices/index';
import { expensesTable, EXPENSES_LIST_TABLE, yearsTable, YEARS_LIST_TABLE } from '../../LocalDBServices/TablesConstants';
import {
  PostExpenditureURL,
  mainURL,
  SUCCESS_STATUS_CODE,
} from '../../../Constants/URLConstants';
import { DateManipulations } from '../../../Helpers/DateTimeManipulations';
import { ConsoleLogger, ErrorEventLogger } from '../../../Helpers/EventLogger';

/*
export function fetchAddExpense(dispatchAddExpense, expensesRequestParms, addExpenseinit, onAddExpenseSuccess, onAddExpenseFailure) {
  dispatchAddExpense(addExpenseinit());
  try {
    fetchAddExpenseLocal(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
  } catch (error) {
    ErrorEventLogger(error);
    dispatchAddExpense(onAddExpenseFailure('Catch Block triggered'));
};
}
*/

export function fetchAddExpenseLocal(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer = true) {
  try {
    CheckForYearTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer);
  } catch (error) {
    ErrorEventLogger(error);
    dispatchAddExpense(onAddExpenseFailure('Catch Block triggered'));
};
}

export function fetchAddExpenseServer(dispatchAddExpense, expensesRequestParms) {
  try {
    const url = mainURL + PostExpenditureURL;
    const postData = {
      method_name: 'addNewBudgetData',
      service_request_data: {
        expense_index: "",
        expenditureId: expensesRequestParms.expenditureId,
        dateOfPurchase: expensesRequestParms.dateOfPurchase,
        nameOfPurchase: expensesRequestParms.nameOfPurchase,
        expenditureType: expensesRequestParms.expenditureType,
        paidBy: expensesRequestParms.paidBy,
        amountSpend: expensesRequestParms.amountSpend,
        details: expensesRequestParms.details,
        dateCreated: expensesRequestParms.dateCreated,
        isSynced: "1",
        year: expensesRequestParms.year,
        month: expensesRequestParms.month,
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
          //onAddExpenseSuccess({});
          let columns = ["isSynced"];
          let values = [1];
          let searchQuery = `id = ${service_request_data.expenditureId}`;
          ExecuteMYSqliteDBOperations.updateWithQuery(EXPENSES_LIST_TABLE, columns, values, searchQuery,
            (response) => {
            }, (error) => {
              //the process is offline so no point in showing it to user
              /*
          dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
          */
              ErrorEventLogger(error);
            });
        }
      })
      .catch((error) => {
        //the process is offline so no point in showing it to user
        /*
        dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
        */
        ErrorEventLogger(error);
      });
  } catch (error) {
    ErrorEventLogger(error);
    //the process is offline so no point in showing it to user
    /*
    dispatchAddExpense(onAddExpenseFailure('Catch Block triggered'));
    */
  };
}

async function AddExpenseData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer = true) {
  try {
    const year = (DateManipulations.getYear(new Date(expensesRequestParms.dateOfPurchase))).toString().toLowerCase();
    const month = (DateManipulations.getMonth(new Date(expensesRequestParms.dateOfPurchase))).toString().toLowerCase();
    const dbQuery = '(expenditureId, dateOfPurchase, nameOfPurchase, expenditureType, paidBy, spendAt, amountSpend, details, year, month, dateCreated, isSynced)';//`INSERT INTO ${EXPENSES_LIST_TABLE} (id, dateOfPurchase, nameOfPurchase, expenditureType, paidBy, amountSpend, details, yearID, month, dateCreated) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    const values = [
      expensesRequestParms.expenditureId,
      expensesRequestParms.dateOfPurchase,
      expensesRequestParms.nameOfPurchase,
      expensesRequestParms.expenditureType,
      expensesRequestParms.paidBy,
      expensesRequestParms.spendAt,
      expensesRequestParms.amountSpend,
      expensesRequestParms.details,
      expensesRequestParms.year,
      expensesRequestParms.month,
      expensesRequestParms.dateCreated,
      0
    ];
    ExecuteMYSqliteDBOperations.insertWithQuery(EXPENSES_LIST_TABLE, dbQuery, values,
      (response) => {
        if(AddToServer){
          fetchAddExpenseServer(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
        }
        dispatchAddExpense(onAddExpenseSuccess());
      }, (error) => {
        dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
        ErrorEventLogger(error);
      });
  } catch (error) {
    dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
    ErrorEventLogger(error);
  }
  return null;
  // }
}

async function CreateExpenseTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer = true) {
  try {
    ExecuteMYSqliteDBOperations.createTable(EXPENSES_LIST_TABLE, expensesTable, (expenseTableResult) => {
      AddExpenseData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer);
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

async function CheckForExpenseTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer = true) {
  try {
    ExecuteMYSqliteDBOperations.checkForTable(EXPENSES_LIST_TABLE,
      (expenseTableCheckResponse) => {
        if (expenseTableCheckResponse.status_code === SUCCESS_STATUS_CODE) {
          AddExpenseData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer);
        }
        else {
          CreateExpenseTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer);
        }
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


async function AddYearData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer = true) {
  try {
    //responseJSON
    // const year_response_Data = yearResponse./response_data;
    // const yearID = year_response_Data.id;
    const year = (DateManipulations.getYear(new Date(expensesRequestParms.dateOfPurchase))).toString().toLowerCase();
    const month = (DateManipulations.getMonth(new Date(expensesRequestParms.dateOfPurchase))).toString().toLowerCase();
    const dbQuery = '(month, year, file_name, dateCreated)';
    const values = [
      month,
      year,
      `BudgetPlanner_${year}`,
      new Date().toString()
    ];
    ExecuteMYSqliteDBOperations.insertWithQuery(YEARS_LIST_TABLE, dbQuery, values,
      (response) => {
        CheckForExpenseTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer);
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

async function CreateYearTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer = true) {
  try {
    ExecuteMYSqliteDBOperations.createTable(YEARS_LIST_TABLE, yearsTable,
      (year_response) => {
        AddYearData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer);
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

async function CheckForYearTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer = true) {
  try {
    ExecuteMYSqliteDBOperations.checkForTable(YEARS_LIST_TABLE,
      (yearTableCheckResponse) => {
        if (yearTableCheckResponse.status_code === SUCCESS_STATUS_CODE) {

          const year = (DateManipulations.getYear(new Date(expensesRequestParms.dateOfPurchase))).toString().toLowerCase();
          const month = (DateManipulations.getMonth(new Date(expensesRequestParms.dateOfPurchase))).toString().toLowerCase();

          const dbQuery = `year='${year}' AND month='${month}'`;
          ExecuteMYSqliteDBOperations.getAvailableDataFromTable(YEARS_LIST_TABLE, dbQuery, [],
            (yearResponse) => {
              if (yearResponse.status_code === SUCCESS_STATUS_CODE) {
                CheckForExpenseTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer);
              }
              else {
                AddYearData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer);
              }
            }, (error) => {
              dispatchAddExpense(onAddExpenseFailure('Catch Block triggered for fetch'));
              ErrorEventLogger(error);
            });
          //AddYearData(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure);
        }
        else {
          CreateYearTable(dispatchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddExpenseFailure, AddToServer);
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
