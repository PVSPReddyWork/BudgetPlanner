import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import CustomActivityIndicator from '../../../../CustomComponents/CustomActivityIndicator';
import CustomHeader from '../../../../CustomComponents/CustomHeader';
import { IMAGE_BACK } from '../../../../Assets/ImageHelper';
import { EXPENSES_MONTHS_LIST } from '../../../../Constants/PageNameConstants';
import CustomTouch from '../../../../CustomComponents/CustomTouch';
import { connect } from 'react-redux';
import { getYearsMonthsDataReset } from './ExpenseYearListActions';
import {
  POPUP_ERROR_ALERT_HEADER,
  OKAY_BUTON_TEXT,
} from './../../../../Constants/TextConstants';
import AppStyleConstants, { DimenionsMinMaxValues } from '../../../../Constants/AppStyleConstants';
import SpaceView from '../../../../CustomComponents/AppLocalComponents/SpaceView';
import { fetchGetYearMonthList } from './ExpensesYearsListService';
import CustomContainerView from '../../../../CustomComponents/CustomContainerView';
import CustomServerLoading from '../../../../CustomComponents/CustomServerLoading';

const ExpensesYears_List = (props) => {
  const { dispatch, loaderVisibility, listItems, message } = props;

  useEffect(() => {
    // dispatch(fetchYearsData());
    dispatch(fetchGetYearMonthList());
  }, [dispatch]);

  const moveBack = () => {
    dispatch(getYearsMonthsDataReset());
    props.navigation.pop();
  };

  const onItemSelectionhandler = (data) => {
    props.navigation.navigate(EXPENSES_MONTHS_LIST, { monthsListData: data });
  };
  const getParentListViews = (data) => {
    const inputFiledView = (
      <CustomTouch
        isRequiredFeedback={true}
        childData={data}
        onPress={onItemSelectionhandler}
      >
        <View style={styles.listTextContainerStyle}>
          <Text style={styles.listTextStyle}>{data.name}</Text>
        </View>
      </CustomTouch>
    );
    return inputFiledView;
  };

  if (message !== null && message !== undefined && message !== '') {
    //the below code shows the error in an alert and it will be navigated back to the old pages
    // Alert.alert(POPUP_ERROR_ALERT_HEADER, message, [
    //   {
    //     text: OKAY_BUTON_TEXT,
    //     onPress: moveBack,
    //   },
    // ]);
  }

  const mainUIComponent = (
    <CustomContainerView style={styles.mainContainerStyle}>
      <>
        {/* <CustomActivityIndicator visibility={loaderVisibility} /> */}
        {
          (loaderVisibility) ?
            <CustomServerLoading />
            : <></>
        }
        <CustomHeader
          title="Select Year"
          {...AppStyleConstants.headerStyle}
          showNavigationIcon={true}
          onNavigationButtonPress={moveBack}
        />
        <ScrollView>
          <View style={styles.bottomSpaceStyle}>
            {listItems.map((item) => getParentListViews(item))}
          </View>

          <SpaceView />
        </ScrollView>
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

const mapStateToProps = (state) => {
  return {
    serviceState: state.ExpenseYearListReducer.serviceState,
    loaderVisibility: state.ExpenseYearListReducer.loaderVisibility,
    listItems: state.ExpenseYearListReducer.listItems,
    message: state.ExpenseYearListReducer.message,
  };
};

const ExpensesYearsList = connect(mapStateToProps)(ExpensesYears_List);
export default ExpensesYearsList;
