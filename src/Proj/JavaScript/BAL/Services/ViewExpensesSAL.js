import { CustomLogger } from './../../Modules/Helper';
import {
  mainURL,
  testURL,
  PostGetAvailableMonthlyExpenseData,
  SUCCESS_STATUS_CODE,
} from './../URLConstants';
import { PostData, PostDataDemo, PostforGetData } from '../HTTPRequestByFetch';

export const ExpensesService = {
  getExpenses: async (
    params,
    successCallBack = null,
    failureCallBack = null
  ) => {
    try {
      const url = `${mainURL}${PostGetAvailableMonthlyExpenseData}`; //
      const postDataReqObj = {
        method_name: 'getDatabyMonth',
        user_request: 'getDatabyMonth',
        service_request_data: {
          month: params.month,
          year: params.year,
        },
      };
      /*
      //console.log(params.month);
      //console.log(params.year);
      //console.log(JSON.parse(JSON.stringify(params)));
      */

      const response = await PostData(url, postDataReqObj);

      //return JSON.parse(response);
      /*
      if(response.ok){
        const responseJSONObj = await response.text();
        console.log(responseJSONObj);
      }
      */
      if (response.isSuccesful) {
        if (successCallBack !== null && successCallBack !== undefined) {
          //successCallBack(JSON.parse(response));
          successCallBack(response.data);
        }
      } else {
        if (failureCallBack !== null && failureCallBack !== undefined) {
          //failureCallBack(ex);
        }
      }
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
      if (failureCallBack !== null && failureCallBack !== undefined) {
        failureCallBack(ex);
      }
    }
  },
};

export const ViewExpensesService = {
  getExpenses: async (
    params,
    successCallBack = null,
    failureCallBack = null
  ) => {
    try {
      const _testURL = 'https://freepass.cyclic.app/test'; //'https://reqres.in/api/users?page=2';
      //const testURL = `https://tiny-pink-jay-veil.cyclic.app/proxy/?url=${_testURL}`; //mainURL + PostGetAvailableMonthlyExpenseData;
      const proxy = 'https://freepass.cyclic.app/proxy/?url='; //"http://localhost:3010/proxy/?url=";//https://freepass.cyclic.app/proxy/?url=
      const url = `${proxy}${_testURL}`; //`${proxy}${mainURL}${PostGetAvailableMonthlyExpenseData}`;//"https://freepass.cyclic.app/test";//`https://freepass.cyclic.app/proxy?url${mainURL}${PostGetAvailableMonthlyExpenseData}`;
      const postData = {
        method: 'GET',
        body: {
          method_name: 'getDatabyMonth',
          service_request_data: {
            month: 'July', //params.sheetName,
            year: '2023', //params.year,
          },
        },
        headers: {
          Accept: '*/*',
          'Access-Control-Allow-Origin': '*',
          'Accept-Encoding': ['gzip', 'deflate', 'br'],
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
        },
      };

      fetch(url, {
        method: 'POST',
        headers: {
          ...postData.headers,
          /*
          Accept: '* /*',
          'Access-Control-Allow-Origin': '*',
          'Accept-Encoding': ['gzip', 'deflate', 'br'],
          Connection: 'keep-alive',
          * /
          'Content-Type': 'application/json',
          */
        },
        body: JSON.stringify(postData),
        //body: JSON.stringify(postData.body),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON.status_code === SUCCESS_STATUS_CODE) {
            const _expensesRequestParms = {
              data: responseJSON.response_data,
            };
            if (successCallBack !== null && successCallBack !== undefined) {
              successCallBack(_expensesRequestParms);
            }
          }
        })
        .catch((ex) => {
          CustomLogger.ErrorLogger(ex);
          if (failureCallBack !== null && failureCallBack !== undefined) {
            failureCallBack(ex);
          }
        });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
      if (failureCallBack !== null && failureCallBack !== undefined) {
        failureCallBack(ex);
      }
    }
  },
};

//module.exports = { ViewExpensesService };
