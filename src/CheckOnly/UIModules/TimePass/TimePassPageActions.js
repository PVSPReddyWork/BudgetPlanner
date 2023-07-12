// import { ExecuteMYSqliteDBOperations } from "../../BAL/LocalDBServices";
// import { EXPENSES_LIST_TABLE } from "../../BAL/LocalDBServices/TablesConstants";
// import { TABLE_NOT_AVAILABLE_MESSAGE, SYNC_SUCCESS_MESSAGE, SYNC_SUCCESS_NO_DATA_MESSAGE, CATCH_TRIGGERED_MESSAGE } from "../../Constants/TextConstants";
// import { mainURL, PostBulkExpenditureURL, SUCCESS_STATUS_CODE } from "../../Constants/URLConstants";
import { ErrorEventLogger } from "../../Helpers/EventLogger";

export const UPDATE_TIME_PASS_STATE = 'UPDATE_TIME_PASS_STATE';
export const UPDATE_TIME_PASS_BGCOLOR = 'UPDATE_TIME_PASS_BGCOLOR';

export const getUpdateTimePassState = (data) => ({ type: UPDATE_TIME_PASS_STATE, payload: data });

export const getUpdateTimePassBGColor = (data) => ({ type: UPDATE_TIME_PASS_BGCOLOR, payload: data });

export function fetchUpdateTimePassState(data) {
    return async (dispatchUpdateTimePassState) => {        
        dispatchUpdateTimePassState(getUpdateTimePassState(data));
    }
}   

export function fetchUpdateTimePassBGColor(data) {
    return async (dispatchUpdateTimePassBGColor) => {
        try {
            const timeInterval = 0;
            let i = 1;
            console.log(data);
            data.forEach((item) => {
                console.log(item);
                setInterval(changeColor(dispatchUpdateTimePassBGColor, item), i*timeInterval);
                i++;
                // dispatchUpdateTimePassBGColor(getUpdateTimePassBGColor(item));
            });
        }
        catch (error) {
            //dispatchUpdateTimePassBGColor(getSyncAllExpenseFailure(CATCH_TRIGGERED_MESSAGE));
            ErrorEventLogger('TimePassPageActions >>>> fetchUpdateTimePassBGColor >>>> error: ', error);
        }
    }
}

const changeColor = (dispatcher, item) =>{
    console.log(dispatcher);
    console.log(item);
    // dispatcher(getUpdateTimePassBGColor(item));
}
