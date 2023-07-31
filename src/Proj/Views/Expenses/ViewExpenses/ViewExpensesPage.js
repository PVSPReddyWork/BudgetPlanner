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
    requiredDate: `${DateTimeManipulations.getYear()}-${
      DateTimeManipulations.getMonth(false) < 10
        ? '0' + DateTimeManipulations.getMonth(false).toString()
        : DateTimeManipulations.getMonth(false).toString()
    }`,
  });

  useEffect(() => {
    try {
      const selectedDate = expensesData.requiredDate;
      let selectedYear = selectedDate.split('-')[0];
      let _selectedMonth = selectedDate.split('-')[1];
      let selectedMonth = 0;
      if (!isNaN(_selectedMonth)) {
        selectedMonth = parseInt(_selectedMonth);
      }
      if (selectedMonth > 0) {
        const timeObj = {
          year: parseInt(selectedYear),
          month: DateTimeManipulations.getMonthByNumber(
            selectedMonth.toString()
          ),
        };
        getExpenses(timeObj);
      } else {
        alert('Date Error');
      }
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  }, [expensesData.requiredDate]);

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
        let _expenseData = params.response_data;
        if (
          _expenseData === null ||
          _expenseData === undefined ||
          _expenseData === '' ||
          _expenseData === ' '
        ) {
          _expenseData = [];
        }
        let _totalExpense = 0;
        _expenseData.forEach((item) => {
          //console.log(item);
          const purchaseDate = new Date(item.dateOfPurchase);
          let displayDate = `${purchaseDate.getDate()}/${
            purchaseDate.getMonth() + 1
          }/${purchaseDate.getFullYear()}`;
          //console.log(item.dateOfPurchase);
          //console.log(displayDate);
          item.displayDate = displayDate;
          //item.dateOfPurchase = `${purchaseDate.getDay()}/${purchaseDate.getMonth()}/${purchaseDate.getFullYear()}`;
          if (!isNaN(item.amountSpend)) {
            _totalExpense += parseFloat(item.amountSpend);
          }
        });
        /*
        _expenseData.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          // return new Date(b.dateOfPurchase) - new Date(a.dateOfPurchase);
          return new Date(a.dateOfPurchase) - new Date(b.dateOfPurchase);
        });
        */
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
          <div className="expense_item_row">
            <div className="expense_item_column expense_item_text_index">
              <p className="expense_item_text">{item.index}</p>
            </div>
            <div className="expense_item_column">
              <p className="expense_item_text">{item.displayDate}</p>
            </div>
            <div className="expense_item_column">
              <p className="expense_item_text">{item.nameOfPurchase}</p>
            </div>
            <div className="expense_item_column">
              <p className="expense_item_text">{item.expenditureType}</p>
            </div>
            <div className="expense_item_column">
              <p className="expense_item_text">{item.paidBy}</p>
            </div>
            <div className="expense_item_column">
              <p className="expense_item_text">{item.amountSpend}</p>
            </div>
            {/* <div className="expense_item_column">
                  <p className="expense_item_text">{item.dateCreated}</p>
                </div>
                <div className="expense_item_column">
                  <p className="expense_item_text">{item.expenditureId}</p>
                </div>
                <div className="expense_item_column">
                  <p className="expense_item_text">{item.isSynced}</p>
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

  const setDateModule = () => {
    try {
      const maxDateString = `${DateTimeManipulations.getYear()}-${
        DateTimeManipulations.getMonth(false) < 10
          ? '0' + DateTimeManipulations.getMonth(false).toString()
          : DateTimeManipulations.getMonth(false).toString()
      }`;
      /*
      const today = new Date();
      const maxDateString = `${today.getFullYear()}-${
        today.getMonth() + 1 < 10
          ? '0' + (today.getMonth() + 1).toString()
          : (today.getMonth() + 1).toString()
      }`;
      */
      //console.log(maxDateString);
      return (
        <div>
          <input
            type="month"
            max={maxDateString}
            onChange={onDateChanged}
            value={expensesData.requiredDate}
          />
        </div>
      );
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onDateChanged = (e) => {
    try {
      const selectedDate = e.target.value;
      /*
      let selectedYear = selectedDate.split('-')[0];
      let selectedMonth = DateTimeManipulations.getMonthByNumber(
        selectedDate.split('-')[1]
      );
      const timeObj = {
        year: parseInt(selectedYear),
        month: selectedMonth,
      };
      getExpenses(timeObj);
      */
      setExpensesData({ ...expensesData, requiredDate: selectedDate });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  return (
    <div>
      {setDateModule()}
      <div className="expense_item_row">
        <div className="expense_total_text">
          <p className="expense_item_text">Total Amount: </p>
        </div>
        <div className="expense_total_value">
          <p className="expense_item_text">{expensesData.totalExpense}</p>
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
