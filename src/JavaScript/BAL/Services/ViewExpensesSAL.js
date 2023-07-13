import { CustomLogger } from './../../Modules/Helper';
// import {
//   mainURL,
//   PostGetAvailableMonthlyExpenseData,
//   SUCCESS_STATUS_CODE,
// } from './../URLConstants';

const SUCCESS_STATUS_CODE = 200;
export const ViewExpensesService = {
  getExpenses: async (
    params,
    successCallBack = null,
    failureCallBack = null
  ) => {
    try {
      const _testURL = 'https://reqres.in/api/users?page=2';
      const testURL = `https://tiny-pink-jay-veil.cyclic.app/proxy/?url=${_testURL}`; //mainURL + PostGetAvailableMonthlyExpenseData;
      const url = testURL; // mainURL + PostGetAvailableMonthlyExpenseData;
      const postData = {
        method: 'POST',
        body: {
          method_name: 'getDatabyMonth',
          service_request_data: {
            month: params.sheetName,
            year: params.year,
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
          /*
          Accept: '* /*',
          'Access-Control-Allow-Origin': '*',
          'Accept-Encoding': ['gzip', 'deflate', 'br'],
          Connection: 'keep-alive',
          */
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON.status_code === SUCCESS_STATUS_CODE) {
            _expensesRequestParms = {
              data: responseJSON.response_data,
            };
            if (successCallBack !== null && successCallBack !== undefined) {
              successCallBack(_expensesRequestParms);
            }
          }
        })
        .catch((error) => {
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

module.exports = { ViewExpensesService };
