import React, { useState } from 'react';
import { CustomLogger } from './../../JavaScript/Modules/Helper.js';

import { LoginService } from './../../JavaScript/BAL/Services/LoginService.js';
import {CustomLocalStorage} from './../../JavaScript/Modules/CustomLocalStorageService.js';
import {USER_DETAILS} from './../../JavaScript/BAL/Constants.js';
import './LoginPageStyles.css';

const Login_Page = (params) => {
  const { loginStyles, loginClassName, onLoginClicked, onLoginProcessCompleted } = params;

  const loginMainHolderClassName = `addLoginHolder ${
    loginClassName !== null && loginClassName !== undefined
      ? loginClassName
      : ''
  }`;

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

  const onLoginButtonClick = (e) => {
    try {
      let errorText = '';
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
          user_email: '',
          user_password: '',
        };
        loginData.loginCredentials.forEach((item) => {
          postData[item.key] = item.value;
        });
        LoginService.login(postData, onInsertSuccess, onInsertFailure);
        if (onLoginClicked !== null && onLoginClicked !== undefined) {
          onLoginClicked();
        }
        setLoginData({ ...loginData, isBusy: true });
      } /**/
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onInsertSuccess = async (params) => {
    try {
      let postData = {
        user_email: '',
        user_password: '',
      };
      loginData.loginCredentials.forEach((item) => {
        postData[item.key] = item.value;
      });
      
      let isSuccessful = await CustomLocalStorage.SaveData(USER_DETAILS,postData);
      if(isSuccessful){
        alert('Logged in successfully');
        if(onLoginProcessCompleted !== null && onLoginProcessCompleted !== undefined){
          onLoginProcessCompleted();
        }
      }
      else{
        onInsertFailure();
      }
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
      alert('Login failed');
      setLoginData({
        ...loginData,
        loginCredentials: defaultLoginValues,
        isBusy: false,
      });
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
    <div className={loginMainHolderClassName} style={...loginStyles}>
      <div>
        {AddFieldsUI()}
        <button onClick={onLoginButtonClick}>Login</button>
      </div>
      {loginData.isBusy ? (
        <div className="addLoginLoaderHolder">
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
