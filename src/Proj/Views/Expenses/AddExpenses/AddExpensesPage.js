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
        placeHolder: 'Enter Name/Title of Expense',
        legendTitle: 'Enter Name/Title of Expense',
        hintText: '',
        isError: false,
        value: '',
      },
      {
        key: AMOUNT_SPEND,
        inputID: AMOUNT_SPEND,
        placeHolder: 'Amount Spend',
        legendTitle: 'Amount Spend',
        hintText: '',
        isError: false,
        value: 0,
        isNumber: true,
      },
      {
        key: PAID_BY,
        inputID: PAID_BY,
        placeHolder: 'Payment Type',
        legendTitle: 'Payment Type',
        hintText: '',
        isError: false,
        value: '',
        isPicker: true,
        pickerData: paymentTypePickerValues,
      },
      {
        key: DATE_OF_PURCHASE,
        inputID: DATE_OF_PURCHASE,
        placeHolder: 'Date of Purchase',
        legendTitle: 'Date of Purchase',
        hintText: '',
        isError: false,
        value: '',
        isDatePicker: true,
      },
      {
        key: EXPENDITURE_TYPE,
        inputID: EXPENDITURE_TYPE,
        placeHolder: 'Expenditure Type',
        legendTitle: 'Expenditure Type',
        hintText: '',
        isError: false,
        value: '',
        isPicker: true,
        pickerData: expenditureTypePickerValues,
      },
      {
        key: DETAILS,
        inputID: DETAILS,
        placeHolder: 'Details',
        legendTitle: 'Details',
        hintText: '',
        isError: false,
        value: '',
        isEditor: true,
      },
    ],
  });

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
      console.log(expensesData.expenses);
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onTextChanged = (e) => {
    try {
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const AddFieldsUI = () => {
    try {
      var inputFields = expensesData.expenses.map((item) => {
        if (item.isDatePicker) {
          return (
            <div>
              <input
                type="datetime-local"
                placeHolder={item.placeHolder}
                value={item.value}
              />
            </div>
          );
        } else if (item.isNumber) {
          return (
            <div>
              <input
                type="Number"
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
              <input
                type="Text"
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
    </div>
  );
};

const AddExpensesPage = AddExpenses_Page;
export default AddExpensesPage;
