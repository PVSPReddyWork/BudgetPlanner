import { CustomLogger } from './../../Modules/Helper';

export const ViewExpensesService = {
  getExpenses: async (
    params,
    successCallBack = null,
    failureCallBack = null
  ) => {
    try {
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
      if (failureCallBack !== null && failureCallBack !== undefined) {
        failureCallBack(ex);
      }
    }
  },
};

module.exports = { ViewExpensesService };
