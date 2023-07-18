import React, { useState, useEffect } from 'react';
import {
  CustomLogger,
  DateTimeManipulations,
} from './../../../JavaScript/Modules/Helper.js';
import {
  ExpensesService,
  ViewExpensesService,
} from './../../../JavaScript/BAL/Services/ViewExpensesSAL.js';
import './ViewExpensePageStyles.css';

const ViewExpenses_Page = (parms) => {
  const [expensesData, setExpensesData] = useState({ expenses: [] });
  useEffect(() => {
    try {
      const timeObj = {
        year: DateTimeManipulations.getYear(),
        month: DateTimeManipulations.getMonth(),
      };
      getExpenses(timeObj);
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  }, []);

  const getExpenses = (params) => {
    try {
      ExpensesService.getExpenses(params, onGetExpenses);
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onGetExpenses = (params) => {
    try {
      if (params !== null && params !== undefined) {
        const _expenseData = params.response_data;
        setExpensesData({ ...expensesData, expenses: _expenseData });
      }
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const fillExpenseData = () => {
    try {
      if (
        expensesData.expenses !== null &&
        expensesData.expenses !== undefined &&
        expensesData.expenses.length > 0
      ) {
        var expenseTableUIData = expensesData.expenses.map((item) => {
          return (
            <>
              <div class="expense_item_row">
                <div class="expense_item_column expense_item_text_index">
                  <p class="expense_item_text">{item.index}</p>
                </div>
                {/* <div class="expense_item_column">
                  <p class="expense_item_text">{item.dateOfPurchase}</p>
                </div> */}
                <div class="expense_item_column">
                  <p class="expense_item_text">{item.nameOfPurchase}</p>
                </div>
                <div class="expense_item_column">
                  <p class="expense_item_text">{item.expenditureType}</p>
                </div>
                <div class="expense_item_column">
                  <p class="expense_item_text">{item.paidBy}</p>
                </div>
                <div class="expense_item_column">
                  <p class="expense_item_text">{item.amountSpend}</p>
                </div>
                {/* <div class="expense_item_column">
                  <p class="expense_item_text">{item.dateCreated}</p>
                </div>
                <div class="expense_item_column">
                  <p class="expense_item_text">{item.expenditureId}</p>
                </div>
                <div class="expense_item_column">
                  <p class="expense_item_text">{item.isSynced}</p>
                </div> */}
              </div>
            </>
          );
        });
        return <>{expenseTableUIData}</>;
      } else {
        return (
          <>
            <p>No data yet</p>
          </>
        );
      }
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  return <div>{fillExpenseData()}</div>;
};

const ViewExpensesPage = ViewExpenses_Page;
export default ViewExpensesPage;
