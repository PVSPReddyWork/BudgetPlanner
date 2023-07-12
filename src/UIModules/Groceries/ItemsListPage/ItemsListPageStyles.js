import { StyleSheet } from 'react-native';
import AppStyleConstants, {DimenionsMinMaxValues} from './../../../Constants/AppStyleConstants';

const styles = StyleSheet.create({
  textStyle: {
    //color: AppColors.defaultTextColor
  },
  itemDisplayStyle: {
    // backgroundColor: 'yellow'
  },
  textInputMessageViewStyle: {
    //flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  buttonSendStyle: {
    minWidth: 60
  },
  mainViewStyle: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyleConstants.colors.MAIN_BODY_COLOR,
  },

  //popup styles
  popupTextInputStyle:{
    minHeight: DimenionsMinMaxValues.minHeight,
    marginBottom: 10,
  },
  // popupButtonStyle:{
  //   minHeight: DimenionsMinMaxValues.minHeight,
  //   marginTop: 10,
  //   backgroundColor: AppStyleConstants.colors.POPUP_BUTTON_COLOR,
  // },
  popupErrorHintTextStyle:{
    color: AppStyleConstants.colors.ERROR_HINT_COLOR,
  },
  popupContainerStyle: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyleConstants.colors.WHITE_COLOR,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mainViewPopupStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default styles;
