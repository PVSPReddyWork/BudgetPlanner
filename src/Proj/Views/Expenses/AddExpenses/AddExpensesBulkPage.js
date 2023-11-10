import React, { useState, useEffect } from 'react';
import {
  CustomLogger,
  DateTimeManipulations,
} from './../../../JavaScript/Modules/Helper.js';
import { PaymentTypes, ExpenditureTypes } from './../ExpenseTypeConstants.js';

import { ADD_EXPENSE_DATA } from './../../../JavaScript/BAL/Services/TempData.js';
import { ExpensesService } from './../../../JavaScript/BAL/Services/ViewExpensesSAL.js';
import './AddExpensesPageStyles.css';
import { CustomLocalStorage } from './../../../JavaScript/Modules/CustomLocalStorageService.js';
import { USER_DETAILS } from './../../../JavaScript/BAL/Constants.js';

const AddExpensesBulk_Page = (parms) => {
  /*
  expense_index: '',
  expenditureId: '',
  dateCreated: '',
  isSynced: '1',
  year: '',
  month: '',
  */

  const NAME_OF_PURCHASE = 'nameOfPurchase';
  const AMOUNT_SPEND = 'amountSpend';
  const PAID_BY = 'paidBy';
  const DATE_OF_PURCHASE = 'dateOfPurchase';
  const EXPENDITURE_TYPE = 'expenditureType';
  const DETAILS = 'details';

  const paymentTypePickerValues = [];
  PaymentTypes.forEach((element) => {
    paymentTypePickerValues.push(element.displayText);
  });

  const expenditureTypePickerValues = [];
  ExpenditureTypes.forEach((element) => {
    expenditureTypePickerValues.push(element.displayText);
  });
  /*
  const getMaxDateString = async () => {
    try {
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };
  */
  const defaultExpenseValues = [
    {
      tempExpID: '',
      key: DATE_OF_PURCHASE,
      inputID: DATE_OF_PURCHASE,
      name: 'Purchase Date',
      placeHolder: 'Date of Purchase',
      legendTitle: 'Date of Purchase',
      hintText: '',
      isError: false,
      value: '',
      isDatePicker: true,
      isMandatory: true,
    },
    {
      tempExpID: '',
      key: NAME_OF_PURCHASE,
      inputID: NAME_OF_PURCHASE,
      name: 'Expense Title',
      placeHolder: 'Enter Name/Title of Expense',
      legendTitle: 'Enter Name/Title of Expense',
      hintText: '',
      isError: false,
      value: '',
      isMandatory: true,
    },
    {
      tempExpID: '',
      key: AMOUNT_SPEND,
      inputID: AMOUNT_SPEND,
      name: 'Amount Spend',
      placeHolder: 'Amount Spend',
      legendTitle: 'Amount Spend',
      hintText: '',
      isError: false,
      value: '',
      isNumber: true,
      isMandatory: true,
    },
    {
      tempExpID: '',
      key: PAID_BY,
      inputID: PAID_BY,
      name: 'Payment Type',
      placeHolder: 'Payment Type',
      legendTitle: 'Payment Type',
      hintText: '',
      isError: false,
      value: '',
      isPicker: true,
      pickerData: paymentTypePickerValues,
      isMandatory: true,
    },
    {
      tempExpID: '',
      key: EXPENDITURE_TYPE,
      inputID: EXPENDITURE_TYPE,
      name: 'Expense Type',
      placeHolder: 'Expenditure Type',
      legendTitle: 'Expenditure Type',
      hintText: '',
      isError: false,
      value: '',
      isPicker: true,
      pickerData: expenditureTypePickerValues,
      isMandatory: true,
    },
    {
      tempExpID: '',
      key: DETAILS,
      inputID: DETAILS,
      name: 'Details',
      placeHolder: 'Details',
      legendTitle: 'Details',
      hintText: '',
      isError: false,
      value: '',
      isEditor: true,
      isMandatory: true,
    },
  ];
  /*
  postData: {
    expense_index: '',
    expenditureId: '',
    dateOfPurchase: '',
    nameOfPurchase: '',
    expenditureType: '',
    paidBy: '',
    amountSpend: '',
    details: '',
    dateCreated: '',
    isSynced: '1',
    year: '',
    month: '',
  },
  */ const [expensesData, setExpensesData] = useState({
    expenses: defaultExpenseValues,
    isBusy: false,
    userDetails: null,
    isValidUser: false,

    /*
    isSuccessCallBack: '',
    isFailureCallBack: '',
    */
  });

  useEffect(() => {
    try {
      if (expensesData.isValidUser) {
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

  const onTextChanged = (e) => {
    try {
      let _expenses = expensesData.expenses;
      _expenses.forEach((item) => {
        try {
          if (item.inputID === e.target.id) {
            item.value = e.target.value ?? '';
          }
        } catch (ex) {
          CustomLogger.ErrorLogger(ex);
        }
      });
      setExpensesData({ ...expensesData, expenses: _expenses });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onPickerSelectionChanged = (e) => {
    try {
      let _expenses = expensesData.expenses;
      _expenses.forEach((item) => {
        try {
          if (item.inputID === e.target.id) {
            item.value = e.target.value ?? '';
          }
        } catch (ex) {
          CustomLogger.ErrorLogger(ex);
        }
      });
      setExpensesData({ ...expensesData, expenses: _expenses });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onDateChanged = (e) => {
    try {
      let _expenses = expensesData.expenses;
      _expenses.forEach((item) => {
        try {
          if (item.inputID === e.target.id) {
            item.value = e.target.value ?? '';
          }
        } catch (ex) {
          CustomLogger.ErrorLogger(ex);
        }
      });
      setExpensesData({ ...expensesData, expenses: _expenses });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onButtonClick = (e) => {
    try {
      if (expensesData.isValidUser) {
        /** /
      ExpensesService.addExpenses(
        ADD_EXPENSE_DATA,
        onInsertSuccess,
        onInsertFailure
      );
      setExpensesData({ ...expensesData, isBusy: true });
      /**/
        /**/
        //console.log(expensesData.expenses);
        let errorText = '';
        //let isValidToProceed=false;
        expensesData.expenses.forEach((item) => {
          if (
            (item.isMandatory && item.value === null) ||
            item.value === undefined ||
            item.value === ''
          ) {
            errorText += `${errorText === '' ? '' : ', '}${item.name}`;
          }
        });
        if (errorText !== '') {
          errorText += ' field(s) are mandatory, please fill a valid value';
          alert(errorText);
        } else {
          let postData = {
            expense_index: '',
            expenditureId: '',
            dateOfPurchase: '',
            nameOfPurchase: '',
            expenditureType: '',
            paidBy: '',
            amountSpend: '',
            details: '',
            dateCreated: '',
            isSynced: '1',
            year: '',
            month: '',
            user_data: expensesData.userDetails,
          };
          expensesData.expenses.forEach((item) => {
            postData[item.key] = item.value;
          });

          const _purchaseDate = new Date(postData.dateOfPurchase);
          if (_purchaseDate !== null && _purchaseDate !== undefined) {
            postData.month = _purchaseDate.getMonth() + 1;
            postData.year = _purchaseDate.getFullYear();
          }
          postData.dateCreated = new Date();
          postData.expenditureId = DateTimeManipulations.getTicks();
          //console.log(JSON.stringify(postData));
          ExpensesService.addExpenses(
            postData,
            onInsertSuccess,
            onInsertFailure
          );
          setExpensesData({ ...expensesData, isBusy: true });
        } /**/
      } else {
        alert(
          'Invalid user, please go to home page and login with valid credentials'
        );
      }
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onInsertSuccess = (params) => {
    try {
      alert('Data Inserted Successfully');
      setExpensesData({
        ...expensesData,
        expenses: defaultExpenseValues,
        isBusy: false,
      });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onInsertFailure = (params) => {
    try {
      alert('Data Insert Failed');
      setExpensesData({ ...expensesData, isBusy: false });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onChanged = (e) => {
    try {
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const AddFieldsUI = () => {
    try {
      var inputFields = expensesData.expenses.map((item) => {
        if (item.isDatePicker) {
          const today = new Date();
          const maxDateString = `${today.getFullYear()}-${
            today.getMonth() + 1 < 10
              ? '0' + (today.getMonth() + 1).toString()
              : (today.getMonth() + 1).toString()
          }-${
            today.getDate() + 1 < 10
              ? '0' + today.getDate().toString()
              : today.getDate().toString()
          }T${today.getHours()}:${today.getMinutes()}`;
          //console.log(maxDateString);
          return (
            <div key={item.key}>
              {/*max="2018-06-14T00:00"*/}
              <input
                type="datetime-local"
                max={maxDateString}
                id={item.inputID}
                onChange={onDateChanged}
                value={item.value}
              />
            </div>
          );
        } else if (item.isNumber) {
          return (
            <div key={item.key}>
              <input
                type="Number"
                id={item.inputID}
                onChange={onTextChanged}
                placeholder={item.placeHolder}
                value={item.value}
              />
            </div>
          );
        } else if (item.isPicker) {
          return (
            <div key={item.key}>
              <select
                className="picker"
                id={item.inputID}
                onChange={onPickerSelectionChanged}
              >
                {/* <option value={null} disabled selected hidden> */}
                <option value="" defaultValue>
                  Select a {item.placeHolder}
                </option>
                {item.pickerData.map((optionItem) => {
                  if (item.value !== optionItem) {
                    return <option value={optionItem}>{optionItem}</option>;
                  } else {
                    return (
                      <option value={optionItem} selected>
                        {optionItem}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          );
        } else if (item.isEditor) {
          return (
            <div key={item.key}>
              <textarea
                rows="4"
                cols="25"
                id={item.inputID}
                onChange={onTextChanged}
                placeholder={item.placeHolder}
                value={item.value}
              />
            </div>
          );
        } else {
          return (
            <div key={item.key}>
              <input
                type="Text"
                id={item.inputID}
                onChange={onTextChanged}
                placeholder={item.placeHolder}
                value={item.value}
              />
            </div>
          );
        }
      });
      return <>{inputFields}</>;
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  return (
    <div className="addExpenseHolder">
      <div>
        {AddFieldsUI()}
        <button onClick={onButtonClick}>Submit</button>
      </div>
      {expensesData.isBusy ? (
        <div className="addExpenseLoaderHolder">
          <p>Loading... Please Wait</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const AddExpensesBulkPage = AddExpensesBulk_Page;
export default AddExpensesBulkPage;
