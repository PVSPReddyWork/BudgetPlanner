//CustomFloatingButton
import React, { useState } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './../WishlistPageStyles';
import CustomButton from './../../../CustomComponents/CustomButton';
import CustomModal from './../../../CustomComponents/CustomModal';
import CustomTextInputField from './../../../CustomComponents/CustomTextInputField';
import CustomTextInputPickerField from './../../../CustomComponents/CustomTextInputPickerField';
import AppStyleConstants from './../../../Constants/AppStyleConstants';
// import { MASTER_HEADER_HAM_BURGER } from './../Assets/ImageHelper';

export const CANCEL_ADD_GROCERY_ITEM_MODE = 'CANCEL_ADD_GROCERY_ITEM_MODE';
export const ADD_ADD_GROCERY_ITEM_MODE = 'ADD_ADD_GROCERY_ITEM_MODE';
export const EDIT_ADD_GROCERY_ITEM_MODE = 'EDIT_ADD_GROCERY_ITEM_MODE';
const AddItemsModalPopup = (props) => {
  const ITEM_NAME = 'ITEM_NAME';
  const IS_ITEM_AVAILABLE = 'IS_ITEM_AVAILABLE';
  const ITEM_AVAILABLE_QUANTITY = 'ITEM_AVAILABLE_QUANTITY';

  const OPTION_YES_TEXT = 'Yes';
  const OPTION_NO_TEXT = 'No';
  const [isErrorPopup, setIsErrorPopup] = useState(false);

  const { popupId, onComponentChanging, onComponentChanged, mode, formValues } = props;
  // const [itemData, setItemData] = useState({
  //   itemName: formValues.itemName,
  //   isItemAvaiable: formValues.isItemAvaiable,
  //   itemQty: formValues.itemQty,
  // });

  const onPressAddButtonHandler = () => {
    if (
      // itemData !== null &&
      // itemData.itemName !== null &&
      // itemData.itemName !== undefined &&
      // itemData.itemName !== '' &&
      // itemData.isItemAvaiable !== null &&
      // itemData.isItemAvaiable !== undefined
      formValues !== null &&
      formValues.itemName !== null &&
      formValues.itemName !== undefined &&
      formValues.itemName !== '' &&
      formValues.isItemAvaiable !== null &&
      formValues.isItemAvaiable !== undefined
    ) {
      // onComponentChanged(itemData, mode, popupId);
      onComponentChanged(formValues, mode, popupId);
    } else{
      setIsErrorPopup(true);
    }
  };

  const onPressCancelButtonHandler = () => {
    onComponentChanged(null, CANCEL_ADD_GROCERY_ITEM_MODE, popupId);
  };

  const onTextChangedHandler = (value, inputId) => {
    let form_Values = {};
    if(inputId === ITEM_NAME){
      // setItemData({ 
      //   ...itemData, 
      //   itemName: value,
      // });
      form_Values = {
        ...formValues,
        itemName: value
      };
      // onComponentChanging()
    } else if(inputId === ITEM_AVAILABLE_QUANTITY){
      // setItemData({ 
      //   ...itemData, 
      //   itemQty: value,
      // });
      form_Values = {
        ...formValues,
        itemQty: value
      };
    } else{}
    if(onComponentChanging !== null && onComponentChanging !== undefined){
      onComponentChanging(form_Values, mode, popupId);
    }
    setIsErrorPopup(false);
  };
  const onItemSelectedHandler = (value, inputId) => {
    //onComponentChanged(value, popupId);
    let form_Values = {};
    if(inputId === IS_ITEM_AVAILABLE){
    let responseValue = false;
    if(value === OPTION_YES_TEXT)
    {
      responseValue = true;
    }
    // setItemData({ 
    //   ...itemData,
    //   isItemAvaiable: responseValue,
    // });
      form_Values = {
        ...formValues,
        isItemAvaiable: responseValue,
      };
  }
  else{}
  if(onComponentChanging !== null && onComponentChanging !== undefined){
    onComponentChanging(form_Values, mode, popupId);
  }
    setIsErrorPopup(false);
  };

  // console.log('AddItemsModalPopup >>>> itemData.itemName ', itemData.itemName);

  const uiMainView = (
    <CustomModal>
    {/* onPress={onPressCancelButtonHandler}> */}
      <View style={styles.mainViewPopupStyle}>
        <View style={styles.popupContainerStyle}>
          <CustomTextInputField
            style={styles.popupTextInputStyle}
            onChangeText={onTextChangedHandler}
            placeHolder={'Enter Item Name'}
            legendTitle={'Enter Item Name * '}
            hintText={'This is a mandatory field'}
            inputID={ITEM_NAME}
            value={formValues.itemName}
          />
          <CustomTextInputPickerField
            style={styles.popupTextInputStyle}
            cancelButtonStyle={AppStyleConstants.buttonPopupStyle.style}
            cancelFontButtonStyle={AppStyleConstants.buttonPopupStyle.fontStyle}
            pickerData={[OPTION_YES_TEXT, OPTION_NO_TEXT]}
            placeHolder={'Is Item Available'}
            legendTitle={'Is Item Available * '}
            hintText={'This is a mandatory field'}
            // isError={isError}
            inputID={IS_ITEM_AVAILABLE}
            // {...textInputFieldProps}
            onItemSelected={onItemSelectedHandler}
          />
          <CustomTextInputField
            style={styles.popupTextInputStyle}
            placeHolder={'Enter item available quantity'}
            legendTitle={'Enter item available quantity'}
            inputID={ITEM_AVAILABLE_QUANTITY}
            onChangeText={onTextChangedHandler}
          />

          {isErrorPopup ? (
            <Text style={styles.popupErrorHintTextStyle}>
              Please fill all the above mandatory (*) fields with valid inputs
            </Text>
          ) : (
            <></>
          )}

          <CustomButton
            title={'Add'}
            {...AppStyleConstants.buttonActiveStyle}
            onPress={onPressAddButtonHandler}
          />
          <CustomButton
            title={'Cancel'}
            {...AppStyleConstants.buttonActiveStyle}
            onPress={onPressCancelButtonHandler}
          />
        </View>
      </View>
    </CustomModal>
  );

  return uiMainView;
};

export default AddItemsModalPopup;
