import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import CustomActivityIndicator from '../../../../CustomComponents/CustomActivityIndicator';
import CustomHeader from '../../../../CustomComponents/CustomHeader';
import {IMAGE_BACK} from '../../../../Assets/ImageHelper';
import {DISPLAY_EXPENSE_ITEM} from '../../../../Constants/PageNameConstants';
import CustomTouch from '../../../../CustomComponents/CustomTouch';
import {connect} from 'react-redux';
import {getEachMonthExpenseListReset} from './EachMonthExpenseListActions';
import AppStyleConstants, { DimenionsMinMaxValues } from '../../../../Constants/AppStyleConstants';
import SpaceView from '../../../../CustomComponents/AppLocalComponents/SpaceView';
import {fetchEachMonthExpenseList} from './EachMonthExpenseListService';
import CustomContainerView from '../../../../CustomComponents/CustomContainerView';
import CustomServerLoading from '../../../../CustomComponents/CustomServerLoading';

const EachMonthExpense_List = (props) => {
  const {
    route,
    dispatch,
    pageTitle,
    loaderVisibility,
    expenseListItems,
    errorMessage,
  } = props;

  useEffect(() => {
    const expensesRequestParms = route.params.monthsExpensesParams;
    dispatch(fetchEachMonthExpenseList(expensesRequestParms));
    // dispatch(fetchEachMonthExpenseListFromLocal(expensesRequestParms));
  }, [dispatch, route.params.monthsExpensesParams]);

  const moveBack = () => {
    dispatch(getEachMonthExpenseListReset());
    props.navigation.pop();
  };

  const onItemSelectionhandler = (data) => {
    props.navigation.navigate(DISPLAY_EXPENSE_ITEM, {expenseItem: data});
  };

  const getListViews = (data) => {
    const inputFiledView = (
      <CustomTouch
        isRequiredFeedback={true}
        childData={data}
        onPress={(item) => {
          onItemSelectionhandler(item);
        }}>
        <View style={styles.listTextContainerStyle}>
          <View style={styles.expensesTextHolderStyle}>
            <Text style={styles.listTextStyle}>{data.nameOfPurchase}</Text>
            <Text style={styles.listTextStyle}>{data.dateOfPurchase}</Text>
          </View>
          <Text style={styles.amountTextStyle}>{data.amountSpend}</Text>
        </View>
      </CustomTouch>
    );
    return inputFiledView;
  };

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
          title={pageTitle}
          {...AppStyleConstants.headerStyle}
          showNavigationIcon={true}
          onNavigationButtonPress={moveBack}
        />
        <ScrollView>
          <View style={styles.bottomSpaceStyle}>
            {expenseListItems.map((item) => getListViews(item))}
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: AppStyleConstants.colors.BORDER_COLOR,
    borderBottomWidth: DimenionsMinMaxValues.borderWidth,
  },
  expensesTextHolderStyle: {
    flex: 1,
    marginHorizontal: 30,
  },
  listTextStyle: {
    fontSize: 15,
  },
  amountTextStyle: {
    alignSelf: 'center',
    marginRight: 30,
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
    pageTitle: state.EachMonthExpenseListReducer.pageTitle,
    serviceState: state.EachMonthExpenseListReducer.serviceState,
    loaderVisibility: state.EachMonthExpenseListReducer.loaderVisibility,
    expenseListItems: state.EachMonthExpenseListReducer.expenseListItems,
    errorMessage: state.EachMonthExpenseListReducer.errorMessage,
  };
};

const EachMonthExpenseList = connect(mapStateToProps)(EachMonthExpense_List);

export default EachMonthExpenseList;
