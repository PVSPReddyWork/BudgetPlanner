import {
    UPDATE_TIME_PASS_STATE,
    UPDATE_TIME_PASS_BGCOLOR,
} from './TimePassPageActions';
import AppStyleConstants from './../../Constants/AppStyleConstants';

const initialState = {
    isVisibleModal: false,
    backgroundColor: AppStyleConstants.colors.MAIN_BODY_COLOR,
    allSelectedColors: [],
  };

const TimePassPageReducer = (state = initialState, action) => {
    console.log(`data is : ${action.payload}`)
    switch (action.type){
        case UPDATE_TIME_PASS_STATE:
            state={
                ...state,
                ...action.payload,
            };
        break;
        case UPDATE_TIME_PASS_BGCOLOR:
            state={
                ...state,
                backgroundColor: action.payload,
            };
        break;
    }
  return state;
};

export default TimePassPageReducer;
