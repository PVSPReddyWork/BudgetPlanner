import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IntroNavigation from './IntroNavigation';
//import UserAuthenticationPage from "../Screens/UserAuthenticationPage";
//import MainNavigation from "./MainNavigation";
//import { USER_AUTHENTICATION_PAGE, INTRO_NAVIGATION, MAIN_NAVIGATION } from "../Helpers/PageNameConstants";
import {INTRO_NAVIGATION} from '../Constants/PageNameConstants';

const stack = createStackNavigator();

const AppNavigation = () => {
  const mainNavigationComponent = (
    <stack.Navigator headerMode="none">
      {/* <stack.Screen name={USER_AUTHENTICATION_PAGE} component={UserAuthenticationPage}/> */}
      <stack.Screen
        name={INTRO_NAVIGATION}
        component={IntroNavigation}
        options={{headerMode: 'None'}}
      />
      {/* <stack.Screen name={MAIN_NAVIGATION} component={MainNavigation} /> */}
    </stack.Navigator>
  );
  return mainNavigationComponent;
};

export default AppNavigation;
