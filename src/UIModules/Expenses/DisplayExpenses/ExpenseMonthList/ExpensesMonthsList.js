import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import CustomHeader from '../../../../CustomComponents/CustomHeader';
import {IMAGE_BACK} from '../../../../Assets/ImageHelper';
import {EACH_MONTH_EXPENSES_LIST} from '../../../../Constants/PageNameConstants';
import CustomTouch from '../../../../CustomComponents/CustomTouch';
import AppStyleConstants, { DimenionsMinMaxValues } from '../../../../Constants/AppStyleConstants';
import CustomContainerView from '../../../../CustomComponents/CustomContainerView';

const ExpensesMonthsList = (props) => {
  const {route, navigation} = props;

  const yearItemData = route.params.monthsListData;
  const moveBack = () => {
    navigation.pop();
  };

  const onItemSelectionhandler = (data) => {
    props.navigation.navigate(EACH_MONTH_EXPENSES_LIST, {
      monthsExpensesParams: data,
    });
  };
  const getParentListViews = (data) => {
    const _year = yearItemData.name.split('_')[1];
    const eachMonthItem = {year: _year, ...data};
    const inputFiledView = (
      <CustomTouch
        isRequiredFeedback={true}
        childData={eachMonthItem}
        onPress={(item) => {
          onItemSelectionhandler(item);
        }}>
        <View style={styles.listTextContainerStyle}>
          <Text style={styles.listTextStyle}>{data.sheetName}</Text>
        </View>
      </CustomTouch>
    );
    return inputFiledView;
  };

  const mainUIComponent = (
    <CustomContainerView style={styles.mainContainerStyle}>
      <>
        <CustomHeader
          title={yearItemData.name}
          {...AppStyleConstants.headerStyle}
          showNavigationIcon={true}
          onNavigationButtonPress={moveBack}
        />
        <ScrollView>
          <View style={styles.bottomSpaceStyle}>
            {yearItemData.sheetsList.map((item) => getParentListViews(item))}
          </View>
        </ScrollView>
        <View />
      </>
    </CustomContainerView>
  );
  return mainUIComponent;
};

const styles = StyleSheet.create({
  listTextContainerStyle: {
    height: 50,
    justifyContent: 'center',
    borderBottomColor: AppStyleConstants.colors.BORDER_COLOR,
    borderBottomWidth: DimenionsMinMaxValues.borderWidth,
  },
  listTextStyle: {
    marginHorizontal: 30,
  },
  bottomSpaceStyle: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 0,
  },
  mainContainerStyle: {
    backgroundColor: AppStyleConstants.colors.MAIN_BODY_COLOR,
  },
});

export default ExpensesMonthsList;
