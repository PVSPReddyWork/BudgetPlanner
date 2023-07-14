export const INTEGER = 'INTEGER';
export const INT = 'INT';
export const STRING = 'VARCHAR';
export const BOOLEAN = 'INTEGER';


export const YEARS_LIST_TABLE = 'years_table';
export const EXPENSES_LIST_TABLE = 'expenses_table'

export const yearsTable = [
    {
        //If Auto-Increment then it should be INTEGER
        columnName: "id",
        columnType: INTEGER,
        isPrimary: true,
        isAutoIncrement: true,
        isNull: false,
    },
    {
        columnName: "month",
        columnType: STRING,
        isPrimary: false,
        isAutoIncrement: false,
        isNull: false,
        maxLength: 255
    },
    {
        columnName: "year",
        columnType: STRING,
        isPrimary: false,
        isAutoIncrement: false,
        isNull: false,
        maxLength: 255
    },
    {
        columnName: "file_name",
        columnType: STRING,
        isPrimary: false,
        isAutoIncrement: false,
        isNull: false,
        maxLength: 255
    },
    {
        columnName: "dateCreated",
        columnType: STRING,
        maxLength: 255
    }
];

export const expensesTable = [
    {
        //If Auto-Increment then it should be INTEGER
        columnName: "expenditureId",
        columnType: STRING,
        isPrimary: true,
        //isAutoIncrement: true,
        isNull: false,
    },
    {
        columnName: "expense_index",
        columnType: INTEGER,
        isAutoIncrement: true,
        // maxLength: 255
    },
    {
        columnName: "dateOfPurchase",
        columnType: STRING,
        maxLength: 255
    },
    {
        columnName: "nameOfPurchase",
        columnType: STRING,
        maxLength: 255
    },
    {
        columnName: "expenditureType",
        columnType: STRING,
        maxLength: 255
    },
    {
        columnName: "paidBy",
        columnType: STRING,
        maxLength: 255
    },
    {
        columnName: "spendAt",
        columnType: STRING,
        maxLength: 255
    },
    {
        columnName: "amountSpend",
        columnType: STRING,
        maxLength: 255
    },
    {
        columnName: "details",
        columnType: STRING,
        maxLength: 255
    },
    {
        columnName: "year",
        columnType: STRING,
        maxLength: 255
    },
    {
        columnName: "month",
        columnType: STRING,
        maxLength: 255
    },
    {
        columnName: "dateCreated",
        columnType: STRING,
        maxLength: 255
    },
    {
        columnName: "isSynced",
        columnType: BOOLEAN,
    }
];