import { CustomLogger } from './../../Modules/Helper';
import {
  mainURL,
  testURL,
  PostGetAvailableMonthlyExpenseData,
  PostExpenditureURL,
  SUCCESS_STATUS_CODE,
} from './../URLConstants';
import {
  PostData,
  PostDatabyProxy,
  PostDataDemo,
  PostforGetData,
} from '../HTTPRequestByFetch';

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
          user_data: params.user_data,
        },
      };
      /*
      //console.log(params.month);
      //console.log(params.year);
      //console.log(JSON.parse(JSON.stringify(params)));
      */

      //const response = await PostDatabyProxy(url, postDataReqObj)
      const response = await PostDataDemo(url, postDataReqObj);

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
  addExpenses: async (
    expensesRequestParms,
    successCallBack = null,
    failureCallBack = null
  ) => {
    try {
      const url = `${mainURL}${PostExpenditureURL}`; //
      const postDataReqObj = {
        method_name: 'addNewBudgetData',
        user_request: 'addNewBudgetData',
        service_request_data: {
          expense_index: '',
          expenditureId: expensesRequestParms.expenditureId,
          dateOfPurchase: expensesRequestParms.dateOfPurchase,
          nameOfPurchase: expensesRequestParms.nameOfPurchase,
          expenditureType: expensesRequestParms.expenditureType,
          paidBy: expensesRequestParms.paidBy,
          amountSpend: expensesRequestParms.amountSpend,
          details: expensesRequestParms.details,
          dateCreated: expensesRequestParms.dateCreated,
          isSynced: '1',
          year: expensesRequestParms.year,
          month: expensesRequestParms.month,
          user_data: expensesRequestParms.user_data,
        },
      };
      const response = await PostDatabyProxy(url, postDataReqObj);
      //console.log(response);
      if (response.isSuccesful) {
        if (
          response.data !== null &&
          response.data !== undefined &&
          (response.data.status_code === '200' || 200)
        ) {
          if (successCallBack !== null && successCallBack !== undefined) {
            successCallBack(response.data);
          } else {
            if (failureCallBack !== null && failureCallBack !== undefined) {
            }
            failureCallBack('');
          }
        }
      } else {
        if (failureCallBack !== null && failureCallBack !== undefined) {
          failureCallBack('');
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
      const url = `${mainURL}${PostGetAvailableMonthlyExpenseData}`; //
      const postDataReqObj = {
        method_name: 'getDatabyMonth',
        user_request: 'getDatabyMonth',
        service_request_data: {
          month: params.month,
          year: params.year,
          user_data: params.user_data,
        },
      };
      /*
      //console.log(params.month);
      //console.log(params.year);
      //console.log(JSON.parse(JSON.stringify(params)));
      */

      const response = await PostDataDemo(url, postDataReqObj);

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

//module.exports = { ViewExpensesService };
