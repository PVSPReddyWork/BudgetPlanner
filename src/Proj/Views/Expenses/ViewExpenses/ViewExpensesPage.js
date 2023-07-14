import React, { useState, useEffect } from 'react';
import {
  CustomLogger,
  DateTimeManipulations,
} from './../../../JavaScript/Modules/Helper.js';
import { ViewExpensesService } from './../../../JavaScript/BAL/Services/ViewExpensesSAL.js';

const ViewExpenses_Page = (parms) => {
  const [expensesData, setExpensesData] = useState({ expenses: [] });
  useEffect(() => {
    try {
      const timeObj = {
        year: DateTimeManipulations.getYear,
        month: DateTimeManipulations.getMonth,
      };
      (async () => {
        const reqObj = await ViewExpensesService.getExpenses(timeObj);
        //setExpensesData({ ...expensesData, expenses: reqObj });
      })();
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  }, []);
  return (
    <div>
      <p>This is under development</p>
    </div>
  );
};

const ViewExpensesPage = ViewExpenses_Page;
export default ViewExpensesPage;
