import React, { useState, useEffect } from 'react';
import {
  CustomLogger,
  DateTimeManipulations,
} from './../../../JavaScript/Modules/Helper.js';
import './ExpensesMainPageStyles.css';
import { CustomLocalStorage } from './../../../JavaScript/Modules/CustomLocalStorageService.js';
import { USER_DETAILS } from './../../../JavaScript/BAL/Constants.js';
import AddExpensesPage from './../AddExpenses/AddExpensesPage.js';
import ViewExpensesPage from './../ViewExpenses/ViewExpensesPage.js';

const ExpensesMain_Page = (params) => {
  const { history } = params;

  const [expensesData, setExpensesData] = useState({
    expenses: [],
    totalExpense: 0,
    requiredDate: `${DateTimeManipulations.getYear()}-${
      DateTimeManipulations.getMonth(false) < 10
        ? '0' + DateTimeManipulations.getMonth(false).toString()
        : DateTimeManipulations.getMonth(false).toString()
    }`,
    userDetails: null,
    isValidUser: false,
  });

  useEffect(() => {
    try {
      if (expensesData.isValidUser) {
        //getExpenses();
      } else {
        doValidateUser();
      }
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  }, [expensesData.requiredDate, expensesData.isValidUser]);

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

  return (
    <>
      {expensesData.isValidUser ? (
        <div className="mainHolderDiv">
          <div className="leftHolderDiv">
            <ViewExpensesPage />
          </div>
          <div className="rightHolderDiv">
            <AddExpensesPage />
          </div>
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

const ExpensesMainPage = ExpensesMain_Page;
export default ExpensesMainPage;
