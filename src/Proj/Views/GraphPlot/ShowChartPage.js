import React, { useState, useEffect } from 'react';
import LineChart from './../../JavaScript/Modules/GraphMaker/LineChart.js';
import BarChart from './../../JavaScript/Modules/GraphMaker/BarChart.js';
import {
  CustomLogger,
  DateTimeManipulations,
} from './../../JavaScript/Modules/Helper.js';
import {
  ExpensesService,
  ViewExpensesService,
} from './../../JavaScript/BAL/Services/ViewExpensesSAL.js';

const showChart_page = () => {
  const [expensesData, setExpensesData] = useState({
    expenses: [],
    totalExpense: 0,
    requiredDate: `${DateTimeManipulations.getYear()}-${
      DateTimeManipulations.getMonth(false) < 10
        ? '0' + DateTimeManipulations.getMonth(false).toString()
        : DateTimeManipulations.getMonth(false).toString()
    }`,
    userDetails: null,
    isValidUser: true,
    xValues: [],
    yValues: [],
    displayData: [],
  });

  useEffect(() => {
    try {
      getExpenses();
      /** /
      if (expensesData.isValidUser) {
        getExpenses();
      } else {
        doValidateUser();
      }
      /**/
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  }, [expensesData.requiredDate, expensesData.isValidUser]);

  useEffect(() => {
    try {
      const arrayUniqueByKey1 = [
        ...new Map(
          expensesData.expenses.map((item) => [item['expenditureType'], item])
        ).values(),
      ];

      const arrayUniqueByKey2 = expensesData.expenses
        .map((item) => item.expenditureType)
        .filter((value, index, self) => self.indexOf(value) === index);

      console.log(arrayUniqueByKey1);

      console.log(arrayUniqueByKey2);

      let dataObjects = [];
      arrayUniqueByKey2.forEach((item) => {
        let eachDataObj = {
          type: item,
          value: 0,
        };
        dataObjects.push(eachDataObj);
      });

      expensesData.expenses.forEach((item) => {
        dataObjects.forEach((_item) => {
          if (_item.type === item.expenditureType) {
            _item.value += parseInt(item.amountSpend);
          }
        });
      });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  }, [expensesData.expenses]);

  const doValidateUser = async (params) => {
    try {
      let _isValidUser = false;
      let userDetailsJSON;
      const userDetailsString = await CustomLocalStorage.RetriveData(
        USER_DETAILS
      );
      if (
        userDetailsString !== null &&
        userDetailsString !== undefined &&
        userDetailsString !== ''
      ) {
        userDetailsJSON = JSON.parse(userDetailsString);
        if (userDetailsJSON != null && userDetailsJSON !== undefined) {
          _isValidUser = true;
        }
      }
      if (_isValidUser) {
        setExpensesData({
          ...expensesData,
          userDetails: {
            user_email: userDetailsJSON.user_email,
            user_password: userDetailsJSON.user_password,
          },
          isValidUser: true,
        });
      } else {
        //history.push('/');
      }
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const getExpenses = async (params) => {
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
          user_data: expensesData.userDetails,
        };
        //getExpenses(timeObj);
        ViewExpensesService.getExpenses(timeObj, onGetExpenses);
      } else {
        alert('Date Error');
      }

      //ViewExpensesService.getExpenses(params, onGetExpenses);
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

        _expenseData.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.dateOfPurchase) - new Date(a.dateOfPurchase);
          //return new Date(a.dateOfPurchase) - new Date(b.dateOfPurchase);
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

  const xData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const yData = [12, 19, 3, 5, 2, 3];

  return (
    <>
      {expensesData.isValidUser ? (
        <div>
          <h1>My Line Chart App</h1>
          {/* <LineChart xData={xData} yData={yData} /> */}
          <BarChart
            xData={expensesData.xData}
            yData={expensesData.yData}
            plotValues={expensesData.displayData}
          />
        </div>
      ) : (
        <>
          <div>
            Invalid user, please go to home page and login with valid
            credentials
          </div>
        </>
      )}
    </>
  );
};

const ShowChartPage = showChart_page;
export default ShowChartPage;
