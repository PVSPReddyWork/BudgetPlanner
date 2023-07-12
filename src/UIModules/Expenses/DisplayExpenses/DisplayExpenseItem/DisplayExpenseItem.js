import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import CustomHeader from '../../../../CustomComponents/CustomHeader';
import { IMAGE_BACK } from '../../../../Assets/ImageHelper';
import CustomTextField from '../../../../CustomComponents/CustomTextFiled';
import AppStyleConstants from '../../../../Constants/AppStyleConstants';
import CustomButton from '../../../../CustomComponents/CustomButton';
import CustomContainerView from '../../../../CustomComponents/CustomContainerView';

const DisplayExpenseItem = (props) => {
  const { route, navigation } = props;
  const expenseItem = route.params.expenseItem;

  const moveBack = () => {
    navigation.pop();
  };

  const NAME_OF_PURCHASE = 'nameOfPurchase';
  const AMOUNT_SPEND = 'amountSpend';
  const PAID_BY = 'paidBy';
  const DATE_OF_PURCHASE = 'dateOfPurchase';
  const EXPENDITURE_TYPE = 'expenditureType';
  const DETAILS = 'details';

  const textFileds = [
    {
      inputID: NAME_OF_PURCHASE,
      legendTitle: 'Enter Name/Title of Expense',
      value: expenseItem.nameOfPurchase,
    },
    {
      inputID: AMOUNT_SPEND,
      legendTitle: 'Amount Spend',
      value: expenseItem.amountSpend,
    },
    {
      inputID: PAID_BY,
      legendTitle: 'Payment Type',
      value: expenseItem.paidBy,
    },
    {
      inputID: DATE_OF_PURCHASE,
      legendTitle: 'Date of Purchase',
      value: expenseItem.dateOfPurchase,
    },
    {
      inputID: EXPENDITURE_TYPE,
      legendTitle: 'Expenditure Type',
      value: expenseItem.expenditureType,
    },
    {
      inputID: DETAILS,
      legendTitle: 'Details',
      value: expenseItem.details,
    },
  ];

  const OnDeleteClickHandler = async () => {
    try {

      /*
      // if (nameOfPurchase.value === '' || nameOfPurchase.value === undefined) {
      //   setNameOfPurchase({
      //     ...nameOfPurchase,
      //     isError: true,
      //     errorText: 'Please Enter a valid Name',
      //   });
      // } else if (
      //   amountSpend.value === '' ||
      //   amountSpend.value === undefined ||
      //   isNaN(amountSpend.value)
      // ) {
      //   setAmountSpend({
      //     ...amountSpend,
      //     isError: true,
      //     errorText: 'Please Enter a valid amount',
      //   });
      // } else if (paidBy.value === '' || paidBy.value === undefined) {
      //   setPaidBy({
      //     ...paidBy,
      //     isError: true,
      //     errorText: 'Please Enter a valid payment type',
      //   });
      // } else if (
      //   dateOfPurchase.value === '' ||
      //   dateOfPurchase.value === undefined
      // ) {
      //   setDateOfPurchase({
      //     ...dateOfPurchase,
      //     isError: true,
      //     errorText: 'Please Enter a valid date',
      //   });
      // } else if (
      //   expenditureType.value === '' ||
      //   expenditureType.value === undefined
      // ) {
      //   setExpenditureType({
      //     ...expenditureType,
      //     isError: true,
      //     errorText: 'Please Enter a valid type',
      //   });
      // } else if (details.value === '' || details.value === undefined) {
      //   setDetails({
      //     ...details,
      //     isError: true,
      //     errorText: 'Please Enter a valid detail',
      //   });
      // } else {
      //   const postData = {
      //     dateOfPurchase: dateOfPurchase.value,
      //     nameOfPurchase: nameOfPurchase.value,
      //     expenditureType: expenditureType.value,
      //     paidBy: paidBy.value,
      //     amountSpend: amountSpend.value,
      //     details: details.value,
      //     dateCreated: new Date().toString(),
      //   };
      //   dispatch(fetchAddExpenseLocal(postData));
      // }
      // // const postData = {
      // //   dateOfPurchase: new Date().toString(),//dateOfPurchase.value,
      // //   nameOfPurchase: "nameOfPurchase.value",
      // //   expenditureType: "expenditureType.value",
      // //   paidBy: "paidBy.value",
      // //   amountSpend: "amountSpend.value",
      // //   details: "details.value",
      // //   dateCreated: new Date().toString(),
      // // };
      // // dispatch(fetchAddExpenseLocal(postData));
      */

    } catch (error) {
      ErrorEventLogger(error);
    }
  };

  const getInputFileds = (data) => {
    const value = data.value;
    if (
      value !== undefined &&
      value !== null &&
      value !== ''
    ) {
      const inputFiledView = (
        <CustomTextField
          legendTitle={data.legendTitle}
          inputID={data.inputID}
          value={value}
          style={styles.textInputFieldProps}
        />
      );
      return inputFiledView;
    }
  };

  const editButtonStyle= {
    style: {
      ...AppStyleConstants.buttonActiveStyle.style,
      width: (((Dimensions.get('screen').width)/100)*50) - 60,
      marginBottom: 0
    },
    fontStyle: {
      ...AppStyleConstants.buttonActiveStyle.fontStyle,
    }
  };

  const deleteButtonStyle= {
    style: {
      ...AppStyleConstants.buttonDeleteStyle.style,
      width: (((Dimensions.get('screen').width)/100)*50) - 60,
      marginBottom: 0
    },
    fontStyle: {
      ...AppStyleConstants.buttonDeleteStyle.fontStyle,
    }
  };

  const mainUIComponent = (
    <CustomContainerView style={styles.holderStyle}>
      <>
        <CustomHeader
          title={expenseItem.nameOfPurchase}
          {...AppStyleConstants.headerStyle}
          showNavigationIcon={true}
          onNavigationButtonPress={moveBack}
        />

        <View style={styles.bottomSpaceStyle}>

          <ScrollView style={styles.scrollViewStyle}>
            <View>
              {textFileds.map((item) => getInputFileds(item))}
            </View>
          </ScrollView>

          {/* <View style={styles.buttonHolderStyle}>
          <CustomButton
              title="Edit Expense"
              {...editButtonStyle}
              onPress={OnDeleteClickHandler}
            />

            <CustomButton
              title="Delete Expense"
              {...deleteButtonStyle}
              onPress={OnDeleteClickHandler}
            />
          </View> */}

        </View>

      </>
    </CustomContainerView>
  );
  return mainUIComponent;
};

const styles = StyleSheet.create({
  textInputFieldProps: {
    marginVertical: 10,
  },
  scrollViewStyle: {
    flex: 1,
  },
  buttonHolderStyle: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomSpaceStyle: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    // paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  holderStyle: {
    flex: 1,
    backgroundColor: AppStyleConstants.colors.MAIN_BODY_COLOR,
  },
  // mainContainerStyle: {
  //   backgroundColor: AppStyleConstants.colors.MAIN_BODY_COLOR,
  // },
});

export default DisplayExpenseItem;
