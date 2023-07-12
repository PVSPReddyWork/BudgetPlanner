// import React from "react"
// import {createStackNavigator} from "@react-navigation/stack"
// import HomePage from "../Screens/MainScreens/HomePage";
// import MemoryDetailPage from "../Screens/MainScreens/MemoryDetailPage";
// import AddNewMemoryPage from "../Screens/MainScreens/AddNewMemoryPage";
// import PersonDetailPage from "../Screens/MainScreens/PersonDetailPage";
// import AddNewPersonPage from "../Screens/MainScreens/AddNewPersonPage";
// import { HOME_PAGE, MEMORY_DETAIL_PAGE, ADD_NEW_MEMORY_PAGE, PERSON_DETAIL_PAGE, ADD_NEW_PERSON_PAGE } from "../Helpers/PageNameConstants";

// const stack = createStackNavigator();

// const MemoryNavigation = (params) => {
//     const memoryNavigationComponent = (
//         <stack.Navigator initialRouteName="HomePage" headerMode="none">
//             <stack.Screen name={HOME_PAGE} component={HomePage} />
//             <stack.Screen name={MEMORY_DETAIL_PAGE} component={MemoryDetailPage}/>
//             <stack.Screen name={ADD_NEW_MEMORY_PAGE} component={AddNewMemoryPage}/>
//             <stack.Screen name={PERSON_DETAIL_PAGE} component={PersonDetailPage} />
//             <stack.Screen name={ADD_NEW_PERSON_PAGE} component={AddNewPersonPage} />
//         </stack.Navigator>
//     )
//     return memoryNavigationComponent;
// }

// export default MemoryNavigation;