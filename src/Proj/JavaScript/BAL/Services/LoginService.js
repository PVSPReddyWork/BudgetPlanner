import { CustomLogger } from './../../Modules/Helper';
import { mainURL, UserLoginURL, SUCCESS_STATUS_CODE } from './../URLConstants';
import {
  PostData,
  PostDatabyProxy,
  PostDataDemo,
  PostforGetData,
} from '../HTTPRequestByFetch';

export const LoginService = {
  login: async (params, successCallBack = null, failureCallBack = null) => {
    try {
      const url = `${mainURL}${UserLoginURL}`; //user_data
      const postDataReqObj = {
        method_name: 'checkForUser',
        user_request: 'checkForUser',
        service_request_data: {
          user_email: params.user_email,
          user_password: params.user_password,
        },
      };
      /*
      //console.log(params.month);
      //console.log(params.year);
      //console.log(JSON.parse(JSON.stringify(params)));
      */

      const response = await PostDatabyProxy(url, postDataReqObj);

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
