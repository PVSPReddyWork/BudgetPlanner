import { CustomLogger } from '../Modules/Helper';
import { proxy } from './URLConstants.js';
import { VIEW_EXPENSE_DATA, VIEW_EXPENSE_DATA_TEXT } from './Services/TempData';

export const GENERAL_HEADERS = {
  Accept: '*/*',
  Connection: 'keep-alive',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*/*',
  'Accept-Encoding': ['gzip', 'deflate', 'br'],
};

export const PostDatabyProxy = async (
  url,
  postDataReqObj,
  successCallBack,
  failureCallBack
) => {
  let responseData = null;
  try {
    const _reqbody = {
      url: url,
      method: 'POST',
      headers: GENERAL_HEADERS,
      body: postDataReqObj,
    };
    let reqbody = JSON.parse(JSON.stringify(_reqbody));
    //console.log(JSON.stringify(reqbody));
    const response = await fetch(`${proxy}${url}`, {
      method: 'POST',
      body: JSON.stringify(reqbody) /***/,
      headers: {
        //'Content-Type': 'application/json'
      } /**/,
    }); /*
      .then((response) => {
        return response.text();
        //return response;
      })
      .then((responseText) => {
        //console.log(responseText);
      })
      .catch((ex) => {});
  */
    //return response;
    if (response.ok) {
      var textResp = await response.text();
      //console.log(textResp);
      var jsonResp = JSON.parse(textResp); //await response.json();
      responseData = {
        error: '',
        message: '',
        dataText: textResp,
        data: jsonResp,
        isSuccesful: true,
      };
    } else {
      var textResp = await response.text();
      responseData = {
        error: '',
        message: '',
        dataText: textResp,
        data: null,
        isSuccesful: false,
      };
    }
  } catch (ex) {
    CustomLogger.ErrorLogger(ex);
    responseData = {
      error: ex,
      message: '',
      dataText: '',
      data: null,
      isSuccesful: false,
    };
  }
  return responseData;
};

export const PostData = async (
  url,
  postDataReqObj,
  successCallBack,
  failureCallBack
) => {
  let responseData = null;
  try {
    const _reqbody = {
      url: url,
      method: 'POST',
      headers: GENERAL_HEADERS,
      body: postDataReqObj,
    };
    let reqbody = JSON.parse(JSON.stringify(_reqbody));
    //console.log(JSON.stringify(reqbody));
    const response = await fetch(`${proxy}${url}`, {
      method: 'POST',
      body: JSON.stringify(reqbody) /***/,
      headers: {
        //'Content-Type': 'application/json'
      } /**/,
    }); /*
      .then((response) => {
        return response.text();
        //return response;
      })
      .then((responseText) => {
        //console.log(responseText);
      })
      .catch((ex) => {});
  */
    //return response;
    if (response.ok) {
      var textResp = await response.text();
      //console.log(textResp);
      var jsonResp = JSON.parse(textResp); //await response.json();
      responseData = {
        error: '',
        message: '',
        dataText: textResp,
        data: jsonResp,
        isSuccesful: true,
      };
    } else {
      var textResp = await response.text();
      responseData = {
        error: '',
        message: '',
        dataText: textResp,
        data: null,
        isSuccesful: false,
      };
    }
  } catch (ex) {
    CustomLogger.ErrorLogger(ex);
    responseData = {
      error: ex,
      message: '',
      dataText: '',
      data: null,
      isSuccesful: false,
    };
  }
  return responseData;
};

export const PostDataDemo = async (
  url,
  postDataReqObj,
  successCallBack,
  failureCallBack
) => {
  try {
    const _reqbody = {
      url: url,
      method: 'POST',
      headers: GENERAL_HEADERS,
      body: postDataReqObj,
    };
    let reqbody = JSON.parse(JSON.stringify(_reqbody));
    //console.log(JSON.stringify(reqbody));
    //console.log(JSON.parse(VIEW_EXPENSE_DATA));
    const responseData = {
      error: '',
      message: '',
      dataText: VIEW_EXPENSE_DATA_TEXT,
      data: VIEW_EXPENSE_DATA,
      isSuccesful: true,
    };
    return responseData; //JSON.stringify(VIEW_EXPENSE_DATA);
    //return response;
  } catch (ex) {
    CustomLogger.ErrorLogger(ex);
  }
};

export const PostforGetData = async (
  url,
  postData,
  successCallBack,
  failureCallBack
) => {
  try {
    const _reqbody = {
      url: url,
      method: 'GET',
      headers: GENERAL_HEADERS,
      //body:  postDataReqObj
    };
    let reqbody = JSON.parse(JSON.stringify(_reqbody));
    ///console.log(JSON.stringify(reqbody));
    const response = await fetch(`${proxy}${url}`, {
      method: 'POST',
      body: JSON.stringify(reqbody) /***/,
      headers: {
        //'Content-Type': 'application/json'
      } /**/,
    });
    return response;
  } catch (ex) {
    CustomLogger.ErrorLogger(ex);
  }
};

export const getAPIData = function (url, headers) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject('time out error'), 2500);
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJSON) => {
          console.log(responseJSON);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {}
  });
};

export const postAPIData = function (url, headers, postData) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject('time out error'), 2500);
    try {
      /*
            fetch('https://jsonplaceholder.typicode.com/posts/1', {
                method: 'GET'
            }).then((response) => {
                response.json();

            }).then((responseJson) => {
                console.log(responseJson);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
            */
      /*
             let response = await fetch(
                 'https://reactnative.dev/movies.json'
             );
             */
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJSON) => {
          console.log(responseJSON);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {}
  });
};
