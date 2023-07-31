export const CustomLocalStorage = {
  SaveData: async (key, value, successCallBack, failureCallBack) => {
    let isSuccessful = false;
    try {
      var stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
      isSuccessful = true;
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
      if (failureCallBack !== null && failureCallBack !== undefined) {
        failureCallBack(ex);
      }
    }
    return isSuccessful;
  },
  RetriveData: async (key, successCallBack, failureCallBack) => {
    let retrunData = '';
    try {
      retrunData = localStorage.getItem(key);
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
      if (failureCallBack !== null && failureCallBack !== undefined) {
        failureCallBack(ex);
      }
    }
    return retrunData;
  },
  removeData: async (key, successCallBack, failureCallBack) => {
    let isSuccessful = false;
    try {
      localStorage.removeItem(key);
      isSuccessful = true;
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
      if (failureCallBack !== null && failureCallBack !== undefined) {
        failureCallBack(ex);
      }
    }
    return isSuccessful;
  },
  clearAllData: async (key, successCallBack, failureCallBack) => {
    let isSuccessful = false;
    try {
      localStorage.clear();
      isSuccessful = true;
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
      if (failureCallBack !== null && failureCallBack !== undefined) {
        failureCallBack(ex);
      }
    }
    return isSuccessful;
  },
};
//module.exports = { ViewExpensesService };
