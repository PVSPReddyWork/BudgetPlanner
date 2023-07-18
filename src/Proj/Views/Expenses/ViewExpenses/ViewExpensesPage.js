import React, { useState, useEffect } from 'react';
import {
  CustomLogger,
  DateTimeManipulations,
} from './../../../JavaScript/Modules/Helper.js';
import { ExpensesService, ViewExpensesService } from './../../../JavaScript/BAL/Services/ViewExpensesSAL.js';

const ViewExpenses_Page = (parms) => {
  const [expensesData, setExpensesData] = useState({ expenses: [] });
  useEffect(() => {
    try {
      const timeObj = {
        year: DateTimeManipulations.getYear(),
        month: DateTimeManipulations.getMonth(),
      };
      getExpenses(timeObj);
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  }, []);

  const getExpenses = ((params) => {
    try{
      ExpensesService.getExpenses(params, onGetExpenses);
    }catch(ex){
      CustomLogger.ErrorLogger(ex);
    }
  });

  const onGetExpenses = ((params) =>{
    try{
      if(params !== null && params !== undefined){
        const _expenseData = params.data;
        setExpensesData({...expensesData, expenses: _expenseData});
      }
    }catch(ex){
      CustomLogger.ErrorLogger(ex);
    }
    
  })

  return (
    <div>
      {
        ((expensesData.length <= 0) ? 
        (<>
        <p>There is no data to display</p>
        </>) : 
        (<>
        <p>Data is to be parsed yet</p>
        </>))
      }
    </div>
  );
};

const ViewExpensesPage = ViewExpenses_Page;
export default ViewExpensesPage;
