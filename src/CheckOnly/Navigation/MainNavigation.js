// import React from "react"
// import { createDrawerNavigator } from "@react-navigation/drawer"
// import { useWindowDimensions } from "react-native";
// // import HomePage from "../Screens/MainScreens/HomePage";
// import ProfilePage from "../Screens/MainScreens/ProfilePage";
// import SettingsPage from "../Screens/MainScreens/SettingsPage";
// import MemoryNavigation from "./MemoryNavigation";
// import { MEMORY_NAVIGATION, PROFILE_PAGE, SETTINGS_PAGE } from "../Helpers/PageNameConstants";
// import SidebarMenu from "./SidebarMenu";

// const Drawer = createDrawerNavigator();

// const MainNavigation = () => {

//     const dimensions = useWindowDimensions();

//     const isLargeScreen = dimensions.width >= 768;

//     const mainNavigationComponent = (
//         <Drawer.Navigator
//             drawerContent={SidebarMenu}
//             drawerType={isLargeScreen ? 'permanent' : 'front'}
//             drawerStyle={isLargeScreen ? null : { width: '70%' }}
//             overlayColor="#00000030">
//                 <Drawer.Screen name={MEMORY_NAVIGATION} component={MemoryNavigation} options={{
//                 title: "Home"
//             }} />
//             {/* <Drawer.Screen name={MEMORY_NAVIGATION} component={MemoryNavigation} options={{
//                 title: "Home"
//             }} /> */}
//             {/* openByDefault drawerType={isLargeScreen ? 'permanent' : 'back'} */}
//             <Drawer.Screen name={PROFILE_PAGE} component={ProfilePage} />
//             <Drawer.Screen name={SETTINGS_PAGE} component={SettingsPage} />
//             {/* <Drawer.Screen name="Test" component={SidebarMenu}/> */}
//         </Drawer.Navigator >
//     )
//     return mainNavigationComponent;
// }

// export default MainNavigation;