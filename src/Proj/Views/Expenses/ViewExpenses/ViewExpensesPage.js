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
  const [expensesData, setExpensesData] = useState({
    expenses: [],
    totalExpense: 0,
  });
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
        let _totalExpense = 0;
        _expenseData.forEach((item) => {
          if (!isNaN(item.amountSpend)) {
            _totalExpense += parseFloat(item.amountSpend);
          }
        });
        setExpensesData({
          ...expensesData,
          expenses: _expenseData,
          totalExpense: _totalExpense.toFixed(2),
        });
      }
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const fillExpenseDataHelper = (item) => {
    try {
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
          return fillExpenseDataHelper(item);
          /*
          var itemUI = (
            <>
            </>
          );
          return itemUI*/
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

  return (
    <div>
      <div className="expense_item_row">
        <div class="expense_total_text">
          <p class="expense_item_text">Total Amount: </p>
        </div>
        <div class="expense_total_value">
          <p class="expense_item_text">{expensesData.totalExpense}</p>
        </div>
      </div>
      {fillExpenseDataHelper({
        index: 'S.No',
        dateOfPurchase: 'Purchase Date',
        nameOfPurchase: 'Name',
        expenditureType: 'Type',
        paidBy: 'Paid Via',
        amountSpend: 'Amount',
        details: 'Details',
        dateCreated: 'Added On',
        expenditureId: '',
        isSynced: '',
      })}
      {fillExpenseData()}
    </div>
  );
};

const ViewExpensesPage = ViewExpenses_Page;
export default ViewExpensesPage;
