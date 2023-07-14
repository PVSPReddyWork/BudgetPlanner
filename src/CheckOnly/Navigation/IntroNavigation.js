import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//import IntroPage from "../Screens/IntroPage";
//import LoginPage from "../Screens/LoginPage";
//import CarouselPage from "../Screens/CarouselPage";
//import RegistrationPage from "../Screens/RegistrationPage";
//import ResetPage from "../Screens/ResetPage";
//import { LOGIN_PAGE, REGISTRATION_PAGE, RESET_PAGE, CAROUSEL_PAGE } from "../Helpers/PageNameConstants";
import {
  HOME_PAGE,
  //   INTRO_PAGE,
  ADD_EXPENSE_PAGE,
  EXPENSES_YEARS_LIST,
  EXPENSES_MONTHS_LIST,
  EACH_MONTH_EXPENSES_LIST,
  DISPLAY_EXPENSE_ITEM,
  DISPLAY_ITEMS_LIST,
  WISHLIST_PAGE,
  TIME_PASS_PAGE,
  SETTINGS_PAGE,
} from '../Constants/PageNameConstants';
// import IntroPage from '../UIModules/IntroPage';
import HomePage from '../UIModules/HomeScreen/HomePage';
import AddExpensePage from '../UIModules/Expenses/AddExpense/AddExpensePage';
import ExpensesYearsList from '../UIModules/Expenses/DisplayExpenses/ExpenseYearList/ExpensesYearsList';
import ExpensesMonthsList from '../UIModules/Expenses/DisplayExpenses/ExpenseMonthList/ExpensesMonthsList';
import EachMonthExpenseList from '../UIModules/Expenses/DisplayExpenses/ExpensesList/EachMonthExpensesList';
import DisplayExpenseItem from '../UIModules/Expenses/DisplayExpenses/DisplayExpenseItem/DisplayExpenseItem';
import ItemsListPage from '../UIModules/Groceries/ItemsListPage/ItemsListPage';
import WishlistPage from '../UIModules/Wishlist/WishlistPage';
import TimePassPage from './../UIModules/TimePass/TimePassPage';
import SettingsPage from '../UIModules/Settings/SettingsPage';

const stack = createStackNavigator();

const IntroNavigation = (params) => {
  const stackNaviComponent = (
    <stack.Navigator initialRouteName={HOME_PAGE} headerMode="none">
      {/* <stack.Screen name={INTRO_PAGE} component={IntroPage} /> */}
      <stack.Screen name={HOME_PAGE} component={HomePage} />
      <stack.Screen name={ADD_EXPENSE_PAGE} component={AddExpensePage} />
      <stack.Screen name={EXPENSES_YEARS_LIST} component={ExpensesYearsList} />
      <stack.Screen
        name={EXPENSES_MONTHS_LIST}
        component={ExpensesMonthsList}
      />
      <stack.Screen
        name={EACH_MONTH_EXPENSES_LIST}
        component={EachMonthExpenseList}
      />
      <stack.Screen
        name={DISPLAY_EXPENSE_ITEM}
        component={DisplayExpenseItem}
      />
      <stack.Screen name={DISPLAY_ITEMS_LIST} component={ItemsListPage} />
      <stack.Screen name={WISHLIST_PAGE} component={WishlistPage} />
      <stack.Screen name={TIME_PASS_PAGE} component={TimePassPage} />
      <stack.Screen name={SETTINGS_PAGE} component={SettingsPage} />
    </stack.Navigator>
    // <stack.Navigator initialRouteName="LoginPage" headerMode="none">
    //     {/* <stack.Screen name="IntroPage" component={IntroPage} /> */}
    //     <stack.Screen name={LOGIN_PAGE} component={LoginPage} />
    //     <stack.Screen name={REGISTRATION_PAGE} component={RegistrationPage}
    //     options={{
    //         title: "Registration",
    //         headerTitleStyle: {
    //             alignSelf: 'center'
    //         },
    //         headerStyle: {
    //             backgroundColor: "skyblue"
    //         }
    //     }}/>
    //     <stack.Screen name={RESET_PAGE} component={ResetPage} />
    //     <stack.Screen name={CAROUSEL_PAGE} component={CarouselPage} />
    // </stack.Navigator>
  );
  return stackNaviComponent;
};

export default IntroNavigation;
