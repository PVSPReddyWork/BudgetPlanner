import { CATCH_TRIGGERED_MESSAGE } from "../../../../Constants/TextConstants";
import { ConsoleLogger, ErrorEventLogger } from "../../../../Helpers/EventLogger";

export function fetchExpenseItemFromListFromLocal(expensesDeleteRequestParms) {
  return async (expensesDeleteRequestParms) => {
    dispatchEachMonthExpenseList(
      getEachMonthExpenseList(expensesRequestParms.sheetName),
    );
    try {
      // const dbQuery = `yearID = ${"2020"}`;
      const dbQuery = `year='${expensesRequestParms.year}' AND month='${expensesRequestParms.sheetName}'`;
      ExecuteMYSqliteDBOperations.getAvailableDataFromTable(EXPENSES_LIST_TABLE, dbQuery, [],
        (responseJSON) => {
          if (responseJSON.status_code === SUCCESS_STATUS_CODE) {
            const _list_ItemsData = responseJSON.response_data;
            const _listItemsData = [];
            if (_list_ItemsData !== null && _list_ItemsData !== undefined && Array.isArray(_list_ItemsData)) {
              _listItemsData = _list_ItemsData;
            }
            var listItemsData = [];
            var totalAmount = 0;
            for (let i = 0; i < _listItemsData.length; i++) {
              const eachListItem = _listItemsData[i];
              listItemsData.push({ ...eachListItem, isOpen: false });
              var floatValue = parseFloat(eachListItem.amountSpend);
              if (!isNaN(floatValue)) {
                totalAmount = totalAmount + parseFloat(eachListItem.amountSpend);
              }
            }
            ConsoleLogger("Data Response >>>> fetchExpenseItemFromListFromLocal >>>> ", listItemsData);
            dispatchEachMonthExpenseList(
              getEachMonthExpenseListSuccess({
                expenseListItems: listItemsData,
                pageTitle:
                  expensesRequestParms.sheetName + '(' + totalAmount + ')',
              }),
            );
            // dispatchYearsData(getYearsMonthsDataSuccess(listItemsData));
          }
        }, (error) => {
          dispatchEachMonthExpenseList(getEachMonthExpenseListFailure(CATCH_TRIGGERED_MESSAGE));
          ErrorEventLogger('DisplayExpenseItemService >>>> fetchExpenseItemFromListFromLocal >>>> error: ', error);
        });
    } catch (error) {
      dispatchEachMonthExpenseList(getEachMonthExpenseListFailure(CATCH_TRIGGERED_MESSAGE));
      ErrorEventLogger('DisplayExpenseItemService >>>> fetchExpenseItemFromListFromLocal >>>> error: ', error);
    }
  };
}