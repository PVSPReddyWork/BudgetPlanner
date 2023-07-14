import { combineReducers } from "redux";
import ExpenseYearListReducer from "./../UIModules/Expenses/DisplayExpenses/ExpenseYearList/ExpenseYearListReducer";
import EachMonthExpenseListReducer from "./../UIModules/Expenses/DisplayExpenses/ExpensesList/EachMonthExpenseListReducer";
import AddExpensePageReducer from "./../UIModules/Expenses/AddExpense/AddExpensePageReducer";
import ItemsListPageReducer from './../UIModules/Groceries/ItemsListPage/ItemsListPageReducer';
import TimePassPageReducer from './../UIModules/TimePass/TimePassPageReducer';
import SettingsPageReducer from './../UIModules/Settings/SettingsPageReducer';
import WishlistPageReducer from './../UIModules/Wishlist/WishlistPageReducer';
import SyncPageReducer from './../UIModules/SyncData/SyncPageReducer';

export const RootReducer = combineReducers({
    ExpenseYearListReducer,
    EachMonthExpenseListReducer,
    AddExpensePageReducer,
    ItemsListPageReducer,
    TimePassPageReducer,
    SettingsPageReducer,
    WishlistPageReducer,
    SyncPageReducer,
});