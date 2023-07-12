/*
Informational responses (100 – 199)
Successful responses (200 – 299)
Redirection messages (300 – 399)
Client error responses (400 – 499)
Server error responses (500 – 599)
*/

const CreateResponseObject = {
  CodeSuccess: 200,
  CodeClientError: 400,
  CodeServerError: 500,
  createResponseObject: async (statusCode = 0, responseData, message = '') => {
    let responseObject;
    try {
      responseObject = {
        statusCode: statusCode,
        data: responseData,
        message: message,
      };
      return responseObject;
    } catch (ex) {
      responseObject = {
        statusCode: Helper.CodeServerError,
        data: null,
        message:
          'Failed to create a JSON response object, please wait for sometime to fix the issue',
      };
      CustomLogger.ErrorLogger(ex);
    }
    return responseObject;
  },
  generate_uuidv4: async () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  },
};

export const CustomLogger = {
  MessageLogger: (dataObject) => {
    try {
      //var dataObjectString = JSON.stringify(dataObject);
      console.log(dataObject);
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  },
  DataLogger: (dataObject) => {
    try {
      var dataObjectString = JSON.stringify(dataObject);
      console.log(dataObjectString);
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  },
  ErrorLogger: (errorObject) => {
    try {
      console.log(errorObject);
    } catch (ex) {
      console.log(ex);
    }
  },
};

module.exports = { CreateResponseObject, CustomLogger };
