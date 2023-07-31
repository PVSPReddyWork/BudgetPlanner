import React, {useState} from 'react';
import {SafeAreaView, View, Alert, StyleSheet, ScrollView} from 'react-native';
import CustomButton from '../../../CustomComponents/CustomButton';
import CustomTextInputField from '../../../CustomComponents/CustomTextInputField';
import CustomActivityIndicator from '../../../CustomComponents/CustomActivityIndicator';
import {HOME_PAGE} from '../../../Constants/PageNameConstants';
import {IMAGE_BACK} from '../../../Assets/ImageHelper';
import CustomHeader from '../../../CustomComponents/CustomHeader';
import {connect} from 'react-redux';
import SpaceView from '../../../CustomComponents/AppLocalComponents/SpaceView';
import {fetchAddExpense} from './AddExpensePageService';
import {
  POPUP_OKAY_BUTTON_TEXT,
  POPUP_HEADER_TEXT,
  POPUP_ERROR_ALERT_HEADER,
} from '../../../Constants/TextConstants';
import {getAddExpenseReset} from './AddExpensePageActions';
import CustomTextInputPickerField from './../../../CustomComponents/CustomTextInputPickerField';
import {PaymentTypes, ExpenditureTypes} from './AddExpenseConstants';
import CustomTextInputDatePickerField from '../../../CustomComponents/CustomTextInputDatePickerField';
import { ErrorEventLogger } from '../../../Helpers/EventLogger';
import AppStyleConstants from '../../../Constants/AppStyleConstants';
import CustomContainerView from '../../../CustomComponents/CustomContainerView';

const AddExpense_Page = (props) => {
  const {
    dispatch,
    serviceState,
    loaderVisibility,
    errorMessage,
    successMessage,
  } = props;

  const NAME_OF_PURCHASE = 'nameOfPurchase';
  const AMOUNT_SPEND = 'amountSpend';
  const PAID_BY = 'paidBy';
  const DATE_OF_PURCHASE = 'dateOfPurchase';
  const EXPENDITURE_TYPE = 'expenditureType';
  const DETAILS = 'details';

  const [nameOfPurchase, setNameOfPurchase] = useState({
    value: '',
    isError: false,
    errorText: '',
  });
  const [amountSpend, setAmountSpend] = useState({
    value: '',
    isError: false,
    errorText: '',
  });
  const [paidBy, setPaidBy] = useState({
    value: '',
    isError: false,
    errorText: '',
  });
  const [dateOfPurchase, setDateOfPurchase] = useState({
    value: '',
    isError: false,
    errorText: '',
  });
  const [expenditureType, setExpenditureType] = useState({
    value: '',
    isError: false,
    errorText: '',
  });
  const [details, setDetails] = useState({
    value: '',
    isError: false,
    errorText: '',
  });

  const paymentTypePickerValues = [];
  PaymentTypes.forEach((element) => {
    paymentTypePickerValues.push(element.displayText);
  });

  const expenditureTypePickerValues = [];
  ExpenditureTypes.forEach((element) => {
    expenditureTypePickerValues.push(element.displayText);
  });

  const textFileds = [
    {
      key:NAME_OF_PURCHASE,
      inputID: NAME_OF_PURCHASE,
      placeHolder: 'Enter Name/Title of Expense',
      legendTitle: 'Enter Name/Title of Expense',
      hintText: nameOfPurchase.errorText,
      isError: nameOfPurchase.isError,
      value: nameOfPurchase.value,
    },
    {
      key:AMOUNT_SPEND,
      inputID: AMOUNT_SPEND,
      placeHolder: 'Amount Spend',
      legendTitle: 'Amount Spend',
      hintText: amountSpend.errorText,
      isError: amountSpend.isError,
      value: amountSpend.value,
      isNumber: true,
    },
    {
      key:PAID_BY,
      inputID: PAID_BY,
      placeHolder: 'Payment Type',
      legendTitle: 'Payment Type',
      hintText: paidBy.errorText,
      isError: paidBy.isError,
      value: paidBy.value,
      isPicker: true,
      pickerData: paymentTypePickerValues,
    },
    {
      key:DATE_OF_PURCHASE,
      inputID: DATE_OF_PURCHASE,
      placeHolder: 'Date of Purchase',
      legendTitle: 'Date of Purchase',
      hintText: dateOfPurchase.errorText,
      isError: dateOfPurchase.isError,
      value: dateOfPurchase.value,
      isDatePicker: true,
    },
    {
      key:EXPENDITURE_TYPE,
      inputID: EXPENDITURE_TYPE,
      placeHolder: 'Expenditure Type',
      legendTitle: 'Expenditure Type',
      hintText: expenditureType.errorText,
      isError: expenditureType.isError,
      value: expenditureType.value,
      isPicker: true,
      pickerData: expenditureTypePickerValues,
    },
    {
      key:DETAILS,
      inputID: DETAILS,
      placeHolder: 'Details',
      legendTitle: 'Details',
      hintText: details.errorText,
      isError: details.isError,
      value: details.value,
      isEditor: true,
    },
  ];

  const getInputFileds = (data) => {
    const {
      placeHolder,
      legendTitle,
      hintText,
      isError,
      inputID,
      isEditor,
      isPicker,
      isNumber,
      isDatePicker,
      pickerData,
    } = data;
    let textInputFieldProps = {
      style: {
        marginVertical: 10,
      },
    };
    if (isEditor) {
      textInputFieldProps = {
        ...textInputFieldProps,
        multiline: true,
        fontStyle: {
          minHeight: 150,
          height: 150,
          textAlignVertical: 'top',
        },
      };
    }
    if (isNumber) {
      textInputFieldProps = {
        ...textInputFieldProps,
        keyboardType: 'numeric',
      };
    }
    let inputFieldView = <></>;
    if (isPicker) {
      inputFieldView = (
        <CustomTextInputPickerField
          pickerData={pickerData}
          placeHolder={placeHolder}
          legendTitle={legendTitle}
          hintText={hintText}
          isError={isError}
          inputID={inputID}
          {...textInputFieldProps}
          onItemSelected={onItemSelectedHandler}
        />
      );
    } else if (isDatePicker) {
      inputFieldView = (
        <CustomTextInputDatePickerField
          placeHolder={placeHolder}
          legendTitle={legendTitle}
          hintText={hintText}
          isError={isError}
          inputID={inputID}
          {...textInputFieldProps}
          onChange={onChangeHandler}
        />
      );
    } else {
      inputFieldView = (
        <CustomTextInputField
          placeHolder={placeHolder}
          legendTitle={legendTitle}
          hintText={hintText}
          isError={isError}
          inputID={inputID}
          {...textInputFieldProps}
          onChangeText={onChangeTextHandler}
        />
      );
    }
    return inputFieldView;
  };

  const onChangeTextHandler = (textValue, inputID) => {
    try {
      switch (inputID) {
        case NAME_OF_PURCHASE:
          setNameOfPurchase({
            ...nameOfPurchase,
            value: textValue,
            isError: false,
            errorText: '',
          });
          break;
        case AMOUNT_SPEND:
          setAmountSpend({
            ...amountSpend,
            value: textValue,
            isError: false,
            errorText: '',
          });
          break;
        case DETAILS:
          setDetails({
            ...details,
            value: textValue,
            isError: false,
            errorText: '',
          });
          break;
      }
    } catch (error) {
      ErrorEventLogger(error);
    }
  };

  const onChangeHandler = (textValue, inputID) => {
    try {
      switch (inputID) {
        case DATE_OF_PURCHASE:
          setDateOfPurchase({
            ...dateOfPurchase,
            value: textValue,
            isError: false,
            errorText: '',
          });
          break;
      }
    } catch (error) {
      ErrorEventLogger(error);
    }
  };

  const onItemSelectedHandler = (textValue, inputID) => {
    try {
      switch (inputID) {
        case PAID_BY:
          setPaidBy({
            ...paidBy,
            value: textValue,
            isError: false,
            errorText: '',
          });
          break;
        case EXPENDITURE_TYPE:
          setExpenditureType({
            ...expenditureType,
            value: textValue,
            isError: false,
            errorText: '',
          });
          break;
      }
    } catch (error) {
      ErrorEventLogger(error);
    }
  };

  const OnSubmitButtonClickHandler = async () => {
    try {
      
      if (nameOfPurchase.value === '' || nameOfPurchase.value === undefined) {
        setNameOfPurchase({
          ...nameOfPurchase,
          isError: true,
          errorText: 'Please Enter a valid Name',
        });
      } else if (
        amountSpend.value === '' ||
        amountSpend.value === undefined ||
        isNaN(amountSpend.value)
      ) {
        setAmountSpend({
          ...amountSpend,
          isError: true,
          errorText: 'Please Enter a valid amount',
        });
      } else if (paidBy.value === '' || paidBy.value === undefined) {
        setPaidBy({
          ...paidBy,
          isError: true,
          errorText: 'Please Enter a valid payment type',
        });
      } else if (
        dateOfPurchase.value === '' ||
        dateOfPurchase.value === undefined
      ) {
        setDateOfPurchase({
          ...dateOfPurchase,
          isError: true,
          errorText: 'Please Enter a valid date',
        });
      } else if (
        expenditureType.value === '' ||
        expenditureType.value === undefined
      ) {
        setExpenditureType({
          ...expenditureType,
          isError: true,
          errorText: 'Please Enter a valid type',
        });
      } else if (details.value === '' || details.value === undefined) {
        setDetails({
          ...details,
          isError: true,
          errorText: 'Please Enter a valid detail',
        });
      } else {
        const postData = {
          dateOfPurchase: dateOfPurchase.value,
          nameOfPurchase: nameOfPurchase.value,
          expenditureType: expenditureType.value,
          spendAt: '',
          paidBy: paidBy.value,
          amountSpend: amountSpend.value,
          details: details.value,
          dateCreated: new Date().toString(),
        };
        dispatch(fetchAddExpense(postData));
      }
      
      // const postData = {
      //   dateOfPurchase: new Date().toString(),//dateOfPurchase.value,
      //   nameOfPurchase: "nameOfPurchase.value",
      //   expenditureType: "expenditureType.value",
      //   paidBy: "paidBy.value",
      //   amountSpend: "amountSpend.value",
      //   details: "details.value",
      //   dateCreated: new Date().toString(),
      // };
      // dispatch(fetchAddExpenseLocal(postData));

    } catch (error) {
      ErrorEventLogger(error);
    }
  };

  const moveBack = () => {
    dispatch(getAddExpenseReset());
    props.navigation.navigate(HOME_PAGE);
  };

  if (successMessage !== '') {
    Alert.alert(POPUP_HEADER_TEXT, successMessage, [
      {
        text: POPUP_OKAY_BUTTON_TEXT,
        onPress: () => {
          moveBack();
        },
      },
    ]);
  } else if (errorMessage !== '') {
    Alert.alert(POPUP_ERROR_ALERT_HEADER, errorMessage, [
      {
        text: POPUP_OKAY_BUTTON_TEXT,
        onPress: () => {},
      },
    ]);
  }

  const uiMainComponent = (
    <CustomContainerView>
      <>
        {/* <CustomActivityIndicator visibility={loaderVisibility} /> */}

        <CustomHeader
          title="Add Expense"
          {...AppStyleConstants.headerStyle}
          showNavigationIcon={true}
          onNavigationButtonPress={() => {
            moveBack();
          }}
        />
        <ScrollView>
          <View style={styles.mainContainerStyle}>
            {textFileds.map((item) => getInputFileds(item))}
            <CustomButton
              title="Add Expense"
              {...AppStyleConstants.buttonActiveStyle}
              onPress={OnSubmitButtonClickHandler}
            />
            <SpaceView />
          </View>
        </ScrollView>
      </>
    </CustomContainerView>
  );
  return uiMainComponent;
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    padding: 20,
    backgroundColor: AppStyleConstants.colors.MAIN_BODY_COLOR,
  },
});

const mapStateToProps = (state) => {
  return {
    serviceState: state.AddExpensePageReducer.serviceState,
    loaderVisibility: state.AddExpensePageReducer.loaderVisibility,
    errorMessage: state.AddExpensePageReducer.errorMessage,
    successMessage: state.AddExpensePageReducer.successMessage,
  };
};

const AddExpensePage = connect(mapStateToProps)(AddExpense_Page);

export default AddExpensePage;
