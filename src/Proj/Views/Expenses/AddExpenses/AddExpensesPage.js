import React, { useState } from 'react';
import {
  CustomLogger,
  DateTimeManipulations,
} from './../../../JavaScript/Modules/Helper.js';

const AddExpenses_Page = (parms) => {
  const InputFields = [
    {
      id: 'index',
      name: 'index',
    },
    {
      id: 'dateOfPurchase',
      name: 'dateOfPurchase',
    },
    {
      id: 'nameOfPurchase',
      name: 'nameOfPurchase',
    },
    {
      id: 'expenditureType',
      name: 'expenditureType',
    },
    {
      id: 'paidBy',
      name: 'paidBy',
    },
    {
      id: 'amountSpend',
      name: 'amountSpend',
    },
    {
      id: 'details',
      name: 'details',
    },
    {
      id: 'dateCreated',
      name: 'dateCreated',
    },
    {
      id: 'expenditureId',
      name: 'expenditureId',
    },
    {
      id: 'isSynced',
      name: 'isSynced',
    },
  ];
  const [expensesData, setExpensesData] = useState({
    expenses: {
      index: '',
      dateOfPurchase: '',
      nameOfPurchase: '',
      expenditureType: '',
      paidBy: '',
      amountSpend: 0,
      details: '',
      dateCreated: '',
      expenditureId: '',
      isSynced: '',
    },
  });

  const AddFieldsUI = () => {
    try {
      var inputFields = InputFields.map((item) => {
        return <input type="Text" />;
      });
      return <>{inputFields}</>;
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  return (
    <div>
      <p>This is under development</p>
      {AddFieldsUI()}
    </div>
  );
};

const AddExpensesPage = AddExpenses_Page;
export default AddExpensesPage;
