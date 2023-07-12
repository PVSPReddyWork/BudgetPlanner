import { DateManipulations } from '../../../Helpers/DateTimeManipulations';
import { ErrorEventLogger } from '../../../Helpers/EventLogger';
import {
  getAddExpense,
  getAddExpenseFailure,
  getAddExpenseSuccess,
} from './AddExpensePageActions';
import { fetchAddExpenseLocal } from '../../../BAL/Services/ExpenseServices/AddExpenseService';

function onInit(){
  return async (dispatchAddExpenseInit) => {
    try {
      dispatchAddExpenseInit(getAddExpense());
    } catch (error) {
      ErrorEventLogger(error);
    }
  };
}

function onAddExpenseSuccess(){
  return async (dispatchAddExpenseSuccess) => {
  try {
    dispatchAddExpenseSuccess(getAddExpenseSuccess({}));
  } catch (error) {
    ErrorEventLogger(error);
  }
}
}

function onAddexpenseFailure(message){
  return async (dispatchAddExpenseFailure) => {
  try {
    dispatchAddExpenseFailure(
      getAddExpenseFailure({
        errorMessage: message,
      }),);
  } catch (error) {
    ErrorEventLogger(error);
  }
}
}

//No use for now
export function fetchAddExpense(expensesRequestParms) {
  return async (dispatchFetchAddExpense) => {
    // dispatchFetchAddExpense(getAddExpense());
    try {
      const year = (DateManipulations.getYear(new Date(expensesRequestParms.dateOfPurchase))).toString().toLowerCase();
      const month = (DateManipulations.getMonth(new Date(expensesRequestParms.dateOfPurchase))).toString().toLowerCase();
      expensesRequestParms.expenditureId = (DateManipulations.getTicks()).toString();
      expensesRequestParms.dateOfPurchase = expensesRequestParms.dateOfPurchase.toString();
      expensesRequestParms.year = year;
      expensesRequestParms.month = month;
      expensesRequestParms.dateCreated = DateManipulations.getDateByFormat().toString();
      // fetchAddExpenseLocal(dispatchFetchAddExpense, expensesRequestParms, getAddExpenseSuccess, getAddExpenseFailure);
      fetchAddExpenseLocal(dispatchFetchAddExpense, expensesRequestParms, onAddExpenseSuccess, onAddexpenseFailure);
    } catch (error) {
      ErrorEventLogger(error);
      dispatchFetchAddExpense(
        getAddExpenseFailure({
          errorMessage: 'Catch Block triggered for fetch',
        }),
      );
    }
  };
}

/*
export function fetchAddExpenseLocal1(dispatchAddExpense, expensesRequestParms) {
  dispatchAddExpense(getAddExpense());
  try {
    CheckForYearTable(dispatchAddExpense, expensesRequestParms);
  } catch (error) {
    ErrorEventLogger(error);
    dispatchAddExpense(
      getAddExpenseFailure({ errorMessage: 'Catch Block triggered' }),
    );
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
        Accept: * /*',
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
          //dispatchAddExpense(getAddExpenseSuccess({}));
          let columns = ["isSynced"];
          let values = [1];
          let searchQuery = `id = ${service_request_data.expenditureId}`;
          ExecuteMYSqliteDBOperations.updateWithQuery(EXPENSES_LIST_TABLE, columns, values, searchQuery,
            (response) => {
            }, (error) => {
              //the process is offline so no point in showing it to user
              /*
          dispatchAddExpense(
            getAddExpenseFailure({
              errorMessage: 'Catch Block triggered for fetch',
            }),
          );* /
              ErrorEventLogger(error);
            });
        }
      })
      .catch((error) => {
        //the process is offline so no point in showing it to user
        /*
        dispatchAddExpense(
          getAddExpenseFailure({
            errorMessage: 'Catch Block triggered for fetch',
          }),
        );
        * /
        ErrorEventLogger(error);
      });
  } catch (error) {
    ErrorEventLogger(error);
    //the process is offline so no point in showing it to user
    /*
    dispatchAddExpense(
      getAddExpenseFailure({ errorMessage: 'Catch Block triggered' }),
    );
    * /
  };
}

async function AddExpenseData(dispatchAddExpense, expensesRequestParms) {
  try {
    const year = (DateManipulations.getYear(new Date(expensesRequestParms.dateOfPurchase))).toString();
    const month = (DateManipulations.getMonth(new Date(expensesRequestParms.dateOfPurchase))).toString();
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
        dispatchAddExpense(getAddExpenseSuccess({}));
        fetchAddExpenseServer(dispatchAddExpense, expensesRequestParms);
      }, (error) => {
        dispatchAddExpense(
          getAddExpenseFailure({
            errorMessage: 'Catch Block triggered for fetch',
          }),
        );
        ErrorEventLogger(error);
      });
  } catch (error) {
    dispatchAddExpense(
      getAddExpenseFailure({
        errorMessage: 'Catch Block triggered for fetch',
      }),
    );
    ErrorEventLogger(error);
  }
  return null;
  // }
}

async function CreateExpenseTable(dispatchAddExpense, expensesRequestParms) {
  try {
    ExecuteMYSqliteDBOperations.createTable(EXPENSES_LIST_TABLE, expensesTable, (expenseTableResult) => {
      AddExpenseData(dispatchAddExpense, expensesRequestParms);
    }, (error) => {
      dispatchAddExpense(
        getAddExpenseFailure({
          errorMessage: 'Catch Block triggered for fetch',
        }),
      );
      ErrorEventLogger(error);
    });
  } catch (error) {
    dispatchAddExpense(
      getAddExpenseFailure({
        errorMessage: 'Catch Block triggered for fetch',
      }),
    );
    ErrorEventLogger(error);
  }
  return null;
}

async function CheckForExpenseTable(dispatchAddExpense, expensesRequestParms) {
  try {
    ExecuteMYSqliteDBOperations.checkForTable(EXPENSES_LIST_TABLE,
      (expenseTableCheckResponse) => {
        if (expenseTableCheckResponse.status_code === SUCCESS_STATUS_CODE) {
          AddExpenseData(dispatchAddExpense, expensesRequestParms);
        }
        else {
          CreateExpenseTable(dispatchAddExpense, expensesRequestParms);
        }
      }, (error) => {
        dispatchAddExpense(
          getAddExpenseFailure({
            errorMessage: 'Catch Block triggered for fetch',
          }),
        );
        ErrorEventLogger(error);
      });
  } catch (error) {
    dispatchAddExpense(
      getAddExpenseFailure({
        errorMessage: 'Catch Block triggered for fetch',
      }),
    );
    ErrorEventLogger(error);
  }
  return null;
}


async function AddYearData(dispatchAddExpense, expensesRequestParms) {
  try {
    //responseJSON
    // const year_response_Data = yearResponse./response_data;
    // const yearID = year_response_Data.id;
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
        CheckForExpenseTable(dispatchAddExpense, expensesRequestParms);
      }, (error) => {
        dispatchAddExpense(
          getAddExpenseFailure({
            errorMessage: 'Catch Block triggered for fetch',
          }),
        );
        ErrorEventLogger(error);
      });

  } catch (error) {
    dispatchAddExpense(
      getAddExpenseFailure({
        errorMessage: 'Catch Block triggered for fetch',
      }),
    );
    ErrorEventLogger(error);
  }
  return null;
}

async function CreateYearTable(dispatchAddExpense, expensesRequestParms) {
  try {
    ExecuteMYSqliteDBOperations.createTable(YEARS_LIST_TABLE, yearsTable,
      (year_response) => {
        AddYearData(dispatchAddExpense, expensesRequestParms);
      },
      (error) => {
        dispatchAddExpense(
          getAddExpenseFailure({
            errorMessage: 'Catch Block triggered for fetch',
          }),
        );
        ErrorEventLogger(error);
      }
    );
  } catch (error) {
    ErrorEventLogger(error);
    dispatchAddExpense(
      getAddExpenseFailure({ errorMessage: 'Catch Block triggered' }),
    );
  }
  return null;
}

async function CheckForYearTable(dispatchAddExpense, expensesRequestParms) {
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
                CheckForExpenseTable(dispatchAddExpense, expensesRequestParms);
              }
              else {
                AddYearData(dispatchAddExpense, expensesRequestParms);
              }
            }, (error) => {
              dispatchAddExpense(
                getAddExpenseFailure({
                  errorMessage: 'Catch Block triggered for fetch',
                }),
              );
              ErrorEventLogger(error);
            });
          //AddYearData(dispatchAddExpense, expensesRequestParms);
        }
        else {
          CreateYearTable(dispatchAddExpense, expensesRequestParms);
          // CheckForExpenseTable(dispatchAddExpense, expensesRequestParms);
        }
      }, (error) => {
        // CreateYearTable(dispatchAddExpense, expensesRequestParms);
        dispatchAddExpense(
          getAddExpenseFailure({
            errorMessage: 'Catch Block triggered for fetch',
          }),
        );
        ErrorEventLogger(error);
      });
  } catch (error) {
    dispatchAddExpense(
      getAddExpenseFailure({
        errorMessage: 'Catch Block triggered for fetch',
      }),
    );
    ErrorEventLogger(error);
  }
  return null;
}

/*
Original method
export function fetchAddExpenseServer(expensesRequestParms) {
  return async (dispatchAddExpense) => {
    dispatchAddExpense(getAddExpense());
    try {
      const url = mainURL + PostExpenditureURL;
      const postData = {
        method_name: 'addNewBudgetData',
        service_request_data: {
          dateOfPurchase: expensesRequestParms.dateOfPurchase,
          nameOfPurchase: expensesRequestParms.nameOfPurchase,
          expenditureType: expensesRequestParms.expenditureType,
          paidBy: expensesRequestParms.paidBy,
          amountSpend: expensesRequestParms.amountSpend,
          details: expensesRequestParms.details,
          dateCreated: new Date().toString(),
        },
      };

      fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*//**',
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
  dispatchAddExpense(getAddExpenseSuccess({}));
}
})
.catch((error) => {
dispatchAddExpense(
  getAddExpenseFailure({
    errorMessage: 'Catch Block triggered for fetch',
  }),
);
ErrorEventLogger(error);
});
} catch (error) {
ErrorEventLogger(error);
dispatchAddExpense(
getAddExpenseFailure({ errorMessage: 'Catch Block triggered' }),
);
}
};
}
*/
