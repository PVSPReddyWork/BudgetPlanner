import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppStyleConstants from '../Constants/AppStyleConstants';
import CustomFieldFrame from './CustomFieldsFrame';
import CustomTouch from './CustomTouch';
import DateTimePicker from '@react-native-community/datetimepicker';

class CustomTextInputDatePickerField extends React.Component {
  constructor(props) {
    super(props);

    const {fontStyle, placeHolder, placeHolderStyle, value} = this.props;

    let text_Style = styles.textDisplayStyle;
    let init_Text = '';
    if (value && value !== '') {
      text_Style = fontStyle;
      init_Text = value;
    } else {
      text_Style = placeHolderStyle
        ? placeHolderStyle
        : styles.placeHolderStyle;
      init_Text =
        placeHolder && placeHolder !== '' ? placeHolder : 'Select from picker';
    }

    this.state = {
      popupVisible: false,
      text: init_Text,
      textStyle: text_Style,
    };
  }

  onDateChangeHandler = (date) => {
    const {fontStyle, onChange, inputID} = this.props;
    var dateTimeStamp = date?.nativeEvent?.timestamp;
    if (!isNaN(dateTimeStamp)) {
      var selectedDate = new Date(dateTimeStamp).toDateString();
      this.setState({
        popupVisible: false,
        text: selectedDate,
        textStyle: fontStyle,
      });
      onChange(selectedDate, inputID);
    }
  };

  render() {
    const {
      numberOfLines,
      // value,

      style,
      legendTitle,
      legendTextStyle,
      hintText,
      hintTextStyle,
      isError,

      // pickerData,

      // onPress,
    } = this.props;

    // const picker_Data =
    //   pickerData && pickerData != undefined && pickerData != null
    //     ? pickerData
    //     : [];

    const uiMainComponent = (
      <CustomFieldFrame
        style={style}
        legendTextStyle={legendTextStyle}
        legendTitle={legendTitle}
        hintText={hintText}
        hintTextStyle={hintTextStyle}
        isError={isError}>
        <CustomTouch
          isRequiredFeedback={false}
          onPress={() => {
            this.setState({popupVisible: true});
          }}>
          <View>
            <Text
              style={{...styles.textDisplayStyle, ...this.state.textStyle}}
              numberOfLines={numberOfLines}>
              {this.state.text}
            </Text>
          </View>
        </CustomTouch>

        {this.state.popupVisible ? (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={this.onDateChangeHandler}
          />
        ) : (
          <></>
        )}
      </CustomFieldFrame>
    );

    return uiMainComponent;
  }
}

const styles = StyleSheet.create({
  textDisplayStyle: {
    fontSize: 20,
    color: '#000000',
    margin: 10,
  },
  placeHolderStyle: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#999', //#636c72
    margin: 10,
  },
  popupContainerStyle: {
    backgroundColor: AppStyleConstants.colors.POPUP_BACKGROUND_COLOR,
    overflow: 'hidden',
    borderRadius: 10,
  },
  buttonStyle: {
    marginBottom: 20,
    backgroundColor: AppStyleConstants.colors.BUTTON_COLOR,
  },
  buttonFontStyle: {
    color: AppStyleConstants.colors.BUTTON_FONT_COLOR,
  },
});

export default CustomTextInputDatePickerField;
