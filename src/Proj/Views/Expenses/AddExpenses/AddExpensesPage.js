import React, { useState } from 'react';
import {
  CustomLogger,
  DateTimeManipulations,
} from './../../../JavaScript/Modules/Helper.js';
import { PaymentTypes, ExpenditureTypes } from './../ExpenseTypeConstants.js';

const AddExpenses_Page = (parms) => {
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

  const [expensesData, setExpensesData] = useState({
    expenses: [
      {
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
        key: DATE_OF_PURCHASE,
        inputID: DATE_OF_PURCHASE,
        name: 'Purchase Date',
        placeHolder: 'Date of Purchase',
        legendTitle: 'Date of Purchase',
        hintText: '',
        isError: false,
        value: '2023-07-26T18:39',
        isDatePicker: true,
        isMandatory: true,
      },
      {
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
    ],
  });

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
      console.log(expensesData.expenses);
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
      }
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
            <div>
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
            <div>
              <input
                type="Number"
                id={item.inputID}
                onChange={onTextChanged}
                placeHolder={item.placeHolder}
                value={item.value}
              />
            </div>
          );
        } else if (item.isPicker) {
          return (
            <div>
              <select
                className="picker"
                id={item.inputID}
                onChange={onPickerSelectionChanged}
              >
                {/* <option value={null} disabled selected hidden> */}
                <option value="" defaultValue>
                  Select a {item.placeHolder}
                </option>
                {item.pickerData.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </div>
          );
        } else if (item.isEditor) {
          return (
            <div>
              <textarea
                rows="4"
                cols="25"
                id={item.inputID}
                onChange={onTextChanged}
                placeHolder={item.placeHolder}
                value={item.value}
              />
            </div>
          );
        } else {
          return (
            <div>
              <input
                type="Text"
                id={item.inputID}
                onChange={onTextChanged}
                placeHolder={item.placeHolder}
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
    <div>
      <p>This is under development</p>
      {AddFieldsUI()}
      <button onClick={onButtonClick}>Submit</button>
    </div>
  );
};

const AddExpensesPage = AddExpenses_Page;
export default AddExpensesPage;
