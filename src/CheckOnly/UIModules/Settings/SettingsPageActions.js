import { ExecuteMYSqliteDBOperations } from "../../BAL/LocalDBServices";
import { EXPENSES_LIST_TABLE } from "../../BAL/LocalDBServices/TablesConstants";
import { TABLE_NOT_AVAILABLE_MESSAGE, SYNC_SUCCESS_MESSAGE, SYNC_SUCCESS_NO_DATA_MESSAGE, CATCH_TRIGGERED_MESSAGE } from "../../Constants/TextConstants";
import { mainURL, PostBulkExpenditureURL, SUCCESS_STATUS_CODE } from "../../Constants/URLConstants";
import { ErrorEventLogger } from "../../Helpers/EventLogger";

export const SYNC_ALL_EXPENSE = 'SYNC_ALL_EXPENSE';
export const SYNC_ALL_EXPENSE_SUCCESS = 'SYNC_ALL_EXPENSE_SUCCESS';
export const SYNC_ALL_EXPENSE_FAILURE = 'SYNC_ALL_EXPENSE_FAILURE';
export const SYNC_ALL_EXPENSE_RESET = 'SYNC_ALL_EXPENSE_RESET';

export const getSyncAllExpense = () => ({ type: SYNC_ALL_EXPENSE });
export const getSyncAllExpenseSuccess = (successData) => ({
    type: SYNC_ALL_EXPENSE_SUCCESS,
    payload: successData,
});
export const getSyncAllExpenseFailure = (failureReport) => ({
    type: SYNC_ALL_EXPENSE_FAILURE,
    payload: failureReport,
});
export const getSyncAllExpenseReset = () => ({ type: SYNC_ALL_EXPENSE_RESET });

export function fetchGetSyncAllExpenseReset() {
    return async (dispatchGetSyncAllExpenseReset) => {
        dispatchGetSyncAllExpenseReset(getSyncAllExpenseReset());
    }
}

export function fetchSyncAllExpense() {
    return async (dispatchSyncAllExpense) => {
        dispatchSyncAllExpense(getSyncAllExpense());
        try {
            //Get data from DB
            const getDataQuery = 'isSynced=0';
            ExecuteMYSqliteDBOperations.getAvailableDataFromTable(EXPENSES_LIST_TABLE, getDataQuery, [],
                (responseJSON) => {
                    //Obtained response
                    try {
                        let unsyncedData = [];
                        const _listItemsData = responseJSON.response_data;
                        if (_listItemsData !== null && _listItemsData !== undefined && Array.isArray(_listItemsData)) {
                            unsyncedData = _listItemsData.filter((item) => item.isSynced === 0);
                        }
                        if (unsyncedData !== null && unsyncedData !== undefined && unsyncedData.length > 0) {
                            const url = mainURL + PostBulkExpenditureURL;
                            const postData = {
                                method_name: 'addNewBulkBudgetData',
                                service_request_data: unsyncedData,
                            };
                            const post_Data = JSON.stringify(postData);
                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    Accept: '*/*',
                                    'Accept-Encoding': ['gzip', 'deflate', 'br'],
                                    Connection: 'keep-alive',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(postData),
                            })
                                .then(async (response) => {
                                    return response.json();
                                })
                                .then((responseJSON) => {
                                    if (responseJSON.status_code === SUCCESS_STATUS_CODE) {
                                        responseJSON.response_data.forEach(item => {
                                            let updatableColumns = ['isSynced'];
                                            let values = [1];
                                            const searchQuery = `id=${item.id}`;
                                            ExecuteMYSqliteDBOperations.updateWithQuery(
                                                EXPENSES_LIST_TABLE,
                                                updatableColumns,
                                                values,
                                                searchQuery,
                                                (responseJSON) => {
                                                    if (responseJSON.status_code === SUCCESS_STATUS_CODE) {
                                                        // dispatchSyncAllExpense(getSyncAllExpenseSuccess({}));
                                                        dispatchSyncAllExpense(getSyncAllExpenseSuccess(SYNC_SUCCESS_MESSAGE));
                                                        ErrorEventLogger('SettingsPageActions >>>> fetchSyncAllExpense >>>> SYNC_SUCCESS_MESSAGE: ', SYNC_SUCCESS_MESSAGE);
                                                        // ExecuteMYSqliteDBOperations.getAvailableDataFromTable(EXPENSES_LIST_TABLE, "isSynced=0", [],
                                                        //     (responseJSON) => {
                                                        //         const _listItemsData = responseJSON.response_data;
                                                        //     }, (error) => { });
                                                    }
                                                    else {
                                                        dispatchSyncAllExpense(getSyncAllExpenseFailure(CATCH_TRIGGERED_MESSAGE));
                                                        ErrorEventLogger('SettingsPageActions >>>> fetchSyncAllExpense >>>> CATCH_TRIGGERED_MESSAGE: ', CATCH_TRIGGERED_MESSAGE);
                                                    }
                                                },
                                                (error) => {
                                                    dispatchSyncAllExpense(getSyncAllExpenseFailure(CATCH_TRIGGERED_MESSAGE));
                                                    ErrorEventLogger('SettingsPageActions >>>> fetchSyncAllExpense >>>> error: ', error);
                                                });
                                        });
                                    }
                                })
                                .catch((error) => {
                                    dispatchSyncAllExpense(getSyncAllExpenseFailure(CATCH_TRIGGERED_MESSAGE));
                                    ErrorEventLogger('SettingsPageActions >>>> fetchSyncAllExpense >>>> error: ', error);
                                });
                        }
                        else {
                            dispatchSyncAllExpense(getSyncAllExpenseSuccess(SYNC_SUCCESS_NO_DATA_MESSAGE));
                        }
                    } catch (error) {
                        ErrorEventLogger('SettingsPageActions >>>> fetchSyncAllExpense >>>> error: ', error);
                        dispatchSyncAllExpense(getSyncAllExpenseFailure(CATCH_TRIGGERED_MESSAGE));
                    }
                }, (error) => {
                    dispatchSyncAllExpense(getSyncAllExpenseFailure(TABLE_NOT_AVAILABLE_MESSAGE));
                    ErrorEventLogger('SettingsPageActions >>>> fetchSyncAllExpense >>>> error: ', error);
                });
        }
        catch (error) {
            dispatchSyncAllExpense(getSyncAllExpenseFailure(CATCH_TRIGGERED_MESSAGE));
            ErrorEventLogger('SettingsPageActions >>>> fetchSyncAllExpense >>>> error: ', error);
        }
    };
}

/*
export function fetchSyncAllExpenseee() {
    return async (dispatchSyncAllExpense) => {
        dispatchSyncAllExpense(getSyncAllExpense());
        try {
            const service_request_data = [{ "paidBy": "Cash", "id": "637497696144510000", "amountSpend": "12", "dateCreated": "Wed Feb 24 2021 18:50:14 GMT+0530 (India Standard Time)", "isSynced": 0, "expenditureType": "Fun and Entertainment", "nameOfPurchase": "Utyutyuty", "details": "R6yttfgfgg", "year": "2021", "expense_index": null, "month": "January", "dateOfPurchase": "Sun Jan 24 2021" }, { "paidBy": "Card Payment", "id": "637497696378340000", "amountSpend": "13", "dateCreated": "Wed Feb 24 2021 18:50:37 GMT+0530 (India Standard Time)", "isSynced": 0, "expenditureType": "Street Foods", "nameOfPurchase": "Referee referee", "details": "Got tyutyutyu", "year": "2021", "expense_index": null, "month": "Feburary", "dateOfPurchase": "Tue Feb 23 2021" }];
            service_request_data.forEach(item => {
                let updatableColumns = ['isSynced'];
                let values = [0];
                const searchQuery = `id=${item.id}`;
                ExecuteMYSqliteDBOperations.updateWithQuery(
                    EXPENSES_LIST_TABLE,
                    updatableColumns,
                    values,
                    searchQuery,
                    (responseJSON) => {
                        if (responseJSON.status_code === SUCCESS_STATUS_CODE) {
                            // dispatchSyncAllExpense(getSyncAllExpenseSuccess({}));

                        }
                        else {
                            dispatchSyncAllExpense(
                                getSyncAllExpenseFailure({
                                    errorMessage: 'Catch Block triggered for fetch',
                                }),
                            );
                        }
                    },
                    (error) => {
                        dispatchSyncAllExpense(
                            getSyncAllExpenseFailure({
                                errorMessage: 'Catch Block triggered for fetch',
                            }),
                        );
                        ErrorEventLogger(error);
                    });
            });
        }
        catch (error) {
            ErrorEventLogger(error);
            dispatchSyncAllExpense(
                getSyncAllExpenseFailure({ errorMessage: 'Catch Block triggered' }),
            );
        }
    };
}
*/
