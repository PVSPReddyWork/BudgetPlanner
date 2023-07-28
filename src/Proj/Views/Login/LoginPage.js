import React, { useState } from 'react';
import {
  CustomLogger,
  DateTimeManipulations,
} from './../../JavaScript/Modules/Helper.js';

import { ExpensesService } from './../../JavaScript/BAL/Services/ViewExpensesSAL.js';
import './LoginPageStyles.css';

const Login_Page = (parms) => {
  const USER_EMAIL = 'user_email';
  const USER_PASSWORD = 'user_password';

  const defaultLoginValues = [
    {
      key: USER_EMAIL,
      inputID: USER_EMAIL,
      name: 'user email',
      placeHolder: 'User Email',
      legendTitle: 'Enter User Email',
      hintText: '',
      isError: false,
      value: '',
      isMandatory: true,
      type: 'Text',
    },
    {
      key: USER_PASSWORD,
      inputID: USER_PASSWORD,
      name: 'password',
      placeHolder: 'Enter User Password',
      legendTitle: 'User Password',
      hintText: '',
      isError: false,
      value: '',
      isNumber: true,
      isMandatory: true,
      type: 'Password',
    },
  ];
  const [loginData, setLoginData] = useState({
    loginCredentials: defaultLoginValues,
    isBusy: false,
    /*
    isSuccessCallBack: '',
    isFailureCallBack: '',
    */
  });

  const onTextChanged = (e) => {
    try {
      let _expenses = loginData.loginCredentials;
      _expenses.forEach((item) => {
        try {
          if (item.inputID === e.target.id) {
            item.value = e.target.value ?? '';
          }
        } catch (ex) {
          CustomLogger.ErrorLogger(ex);
        }
      });
      setLoginData({ ...loginData, loginCredentials: _expenses });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onPickerSelectionChanged = (e) => {
    try {
      let _expenses = loginData.loginCredentials;
      _expenses.forEach((item) => {
        try {
          if (item.inputID === e.target.id) {
            item.value = e.target.value ?? '';
          }
        } catch (ex) {
          CustomLogger.ErrorLogger(ex);
        }
      });
      setLoginData({ ...loginData, loginCredentials: _expenses });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onDateChanged = (e) => {
    try {
      let _expenses = loginData.loginCredentials;
      _expenses.forEach((item) => {
        try {
          if (item.inputID === e.target.id) {
            item.value = e.target.value ?? '';
          }
        } catch (ex) {
          CustomLogger.ErrorLogger(ex);
        }
      });
      setLoginData({ ...loginData, loginCredentials: _expenses });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onButtonClick = (e) => {
    try {
      /** /
      ExpensesService.addExpenses(
        ADD_EXPENSE_DATA,
        onInsertSuccess,
        onInsertFailure
      );
      setLoginData({ ...loginData, isBusy: true });
      /**/
      /**/
      //console.log(loginData.loginCredentials);
      let errorText = '';
      //let isValidToProceed=false;
      loginData.loginCredentials.forEach((item) => {
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
        };
        loginData.loginCredentials.forEach((item) => {
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
        ExpensesService.addExpenses(postData, onInsertSuccess, onInsertFailure);
        setLoginData({ ...loginData, isBusy: true });
      } /**/
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onInsertSuccess = (params) => {
    try {
      alert('Data Inserted Successfully');
      setLoginData({
        ...loginData,
        loginCredentials: defaultLoginValues,
        isBusy: false,
      });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onInsertFailure = (params) => {
    try {
      alert('Data Insert Failed');
      setLoginData({ ...loginData, isBusy: false });
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
      var inputFields = loginData.loginCredentials.map((item) => {
        return (
          <div key={item.key}>
            <input
              type={item.type}
              id={item.inputID}
              onChange={onTextChanged}
              placeholder={item.placeHolder}
              value={item.value}
            />
          </div>
        );
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
      {loginData.isBusy ? (
        <div className="addExpenseLoaderHolder">
          <p>Loading... Please Wait</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const LoginPage = Login_Page;
export default LoginPage;
