export const PaymentTypes = [
  {
    displayText: 'Cash',
    value: 'cash',
  },
  {
    displayText: 'Card Payment',
    value: 'Card Payment',
  },
  {
    displayText: 'Online Payment',
    value: 'Online Payment',
  },
  {
    displayText: 'GPay',
    value: 'GPay',
  },
  {
    displayText: 'PhonePay',
    value: 'PhonePay',
  },
  {
    displayText: 'Cred',
    value: 'Cred',
  },
  {
    displayText: 'PAYTM',
    value: 'PAYTM',
  },
  {
    displayText: 'Other Mobile Walets',
    value: 'Other Mobile Walets',
  },
];

export const ExpenditureTypes = [
  { displayText: 'Beauty Products', value: 'Beauty_Products' },
  { displayText: 'Bills', value: 'Bills' },
  { displayText: 'Insurance', value: 'Bills_Insurance' },
  { displayText: 'Clothes', value: 'Clothes' },
  { displayText: 'DebtPayments', value: 'Debt_Payments' },
  { displayText: 'Entertainment', value: 'Entertainment' },
  { displayText: 'Groceries', value: 'Food_Groceries' },
  { displayText: 'Meals', value: 'Food_Meals' },
  { displayText: 'Poultry', value: 'Food_Poultry' },
  { displayText: 'Snacks', value: 'Food_Snacks' },
  { displayText: 'Tiffins', value: 'Food_Tiffins' },
  { displayText: 'Furniture And Equipment', value: 'Furniture_And_Equipment' },
  { displayText: 'Health Products', value: 'Health_Products' },
  { displayText: 'Investments', value: 'Investments' },
  { displayText: 'LoanGiven', value: 'Loan_Given' },
  { displayText: 'Medicines', value: 'Medicines' },
  { displayText: 'Miscellaneous', value: 'Miscellaneous' },
  { displayText: 'Rent or Mortgage', value: 'Rent_or_Mortgage' },
  { displayText: 'Services', value: 'Repairs_Services' },
  { displayText: 'Savings', value: 'Savings' },
  { displayText: 'Transportation', value: 'Transportation' },
  { displayText: 'Vegetables', value: 'Vegetables' },
  { displayText: 'Vitamins and Minerals', value: 'Vitamins_And_Minerals' },
];

const paymentTypePickerValues = [];
PaymentTypes.forEach((element) => {
  paymentTypePickerValues.push(element.displayText);
});

const expenditureTypePickerValues = [];
ExpenditureTypes.forEach((element) => {
  expenditureTypePickerValues.push(element.displayText);
});

const NAME_OF_PURCHASE = 'nameOfPurchase';
const AMOUNT_SPEND = 'amountSpend';
const PAID_BY = 'paidBy';
const DATE_OF_PURCHASE = 'dateOfPurchase';
const TIME_OF_PURCHASE = 'timeOfPurchase';
const EXPENDITURE_TYPE = 'expenditureType';
const DETAILS = 'details';
//"datetime-local";

export const EXPENSE_DATA = [
  {
    tempExpID: '',
    key: DATE_OF_PURCHASE,
    inputID: DATE_OF_PURCHASE,
    name: 'Purchase Date',
    placeHolder: 'Date of Purchase',
    legendTitle: 'Date of Purchase',
    hintText: '',
    isError: false,
    value: '',
    isDatePicker: true,
    isMandatory: true,
    type: 'date',
    options: null,
  },
  {
    tempExpID: '',
    key: NAME_OF_PURCHASE,
    inputID: NAME_OF_PURCHASE,
    name: 'Expense Title',
    placeHolder: 'Enter Name/Title of Expense',
    legendTitle: 'Enter Name/Title of Expense',
    hintText: '',
    isError: false,
    value: '',
    isMandatory: true,
    type: 'text',
    options: null,
  },
  {
    tempExpID: '',
    key: TIME_OF_PURCHASE,
    inputID: TIME_OF_PURCHASE,
    name: 'Purchase Time',
    placeHolder: 'Time of Purchase',
    legendTitle: 'Time of Purchase',
    hintText: '',
    isError: false,
    value: '',
    isDatePicker: true,
    isMandatory: true,
    type: 'time',
    options: null,
  },
  {
    tempExpID: '',
    key: AMOUNT_SPEND,
    inputID: AMOUNT_SPEND,
    name: 'Amount Spend',
    placeHolder: 'Amount Spend',
    legendTitle: 'Amount Spend',
    hintText: '',
    isError: false,
    value: '',
    isNumber: true,
    isMandatory: true,
    type: 'text',
    options: null,
  },
  {
    tempExpID: '',
    key: PAID_BY,
    inputID: PAID_BY,
    name: 'Payment Type',
    placeHolder: 'Payment Type',
    legendTitle: 'Payment Type',
    hintText: '',
    isError: false,
    value: '',
    isPicker: true,
    pickerData: paymentTypePickerValues,
    isMandatory: true,
    type: 'text',
    options: null,
  },
  {
    tempExpID: '',
    key: EXPENDITURE_TYPE,
    inputID: EXPENDITURE_TYPE,
    name: 'Expense Type',
    placeHolder: 'Expenditure Type',
    legendTitle: 'Expenditure Type',
    hintText: '',
    isError: false,
    value: '',
    isPicker: true,
    pickerData: expenditureTypePickerValues,
    isMandatory: true,
    type: 'text',
    options: null,
  },
  {
    tempExpID: '',
    key: DETAILS,
    inputID: DETAILS,
    name: 'Details',
    placeHolder: 'Details',
    legendTitle: 'Details',
    hintText: '',
    isError: false,
    value: '',
    isEditor: true,
    isMandatory: true,
    type: 'text',
    options: null,
  },
];
