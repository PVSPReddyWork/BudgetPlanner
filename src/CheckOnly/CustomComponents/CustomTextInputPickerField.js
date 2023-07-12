import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, Image, View } from 'react-native';
import AppStyleConstants from '../Constants/AppStyleConstants';
import { CANCEL_BUTTON_TEXT } from '../Constants/TextConstants';
import CustomButton from './CustomButton';
import CustomFieldFrame from './CustomFieldsFrame';
import CustomModal from './CustomModal';
import CustomTouch from './CustomTouch';

class CustomTextInputPickerField extends React.Component {
  constructor(props) {
    super(props);

    const { fontStyle, placeHolder, placeHolderStyle, value, isImage } = this.props;

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

  onItemSelection = (value) => {
    const { fontStyle, onItemSelected, inputID } = this.props;

    this.setState({ popupVisible: false, text: value, textStyle: fontStyle });
    onItemSelected(value, inputID);
  };

  getPickerOptionView = (data) => {
    const inputFiledView = (
      <CustomTouch
        childData={data}
        isRequiredFeedback={false}
        onPress={this.onItemSelection}>
        <View style={styles.listTextItemStyle}>
          <Text>{data}</Text>
        </View>
      </CustomTouch>
    );
    return inputFiledView;
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

      pickerData,

      isImage,
      imageStyle,
      imageSource,
      imageHolderStyle,

      cancelButtonStyle,
      cancelButtonFontStyle,

      // onPress,
    } = this.props;

    const picker_Data =
      pickerData && pickerData !== undefined && pickerData != null
        ? pickerData
        : [];

    const uiMainComponent = (
      <>
        <CustomModal visible={this.state.popupVisible} onPress={() => {
          this.setState({ popupVisible: false });
        }}>
          <View style={styles.popupContainerStyle}>
            <ScrollView style={styles.scrollContainerStyle}>
              <View>
                {picker_Data.map((item) => this.getPickerOptionView(item))}
              </View>
            </ScrollView>
            <CustomButton
              title={CANCEL_BUTTON_TEXT}
              style={{...styles.buttonStyle, ...cancelButtonStyle}}
              fontStyle={{...styles.buttonFontStyle, ...cancelButtonFontStyle}}
              // style={styles.buttonStyle}
              // fontStyle={styles.buttonFontStyle}
              onPress={() => {
                this.setState({ popupVisible: false });
              }}
            />
          </View>
        </CustomModal>

        {(isImage) ? 
        (
          <CustomTouch
            isRequiredFeedback={false}
            onPress={() => {
              this.setState({ popupVisible: true });
            }}>
            <View style={imageHolderStyle}>
              <Image style={imageStyle} source={imageSource}/>
            </View>
            {/* <Image style={imageStyle} source={imageSource}/> */}
          </CustomTouch>
        ) : 
        (
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
              this.setState({ popupVisible: true });
            }}>
            <View>
              <Text
                style={{ ...styles.textDisplayStyle, ...this.state.textStyle }}
                numberOfLines={numberOfLines}>
                {this.state.text}
              </Text>
            </View>
          </CustomTouch>

        </CustomFieldFrame>
        )}
      </>
    );

    return uiMainComponent;
  }
}

const { height, width } = Dimensions.get('window');

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
  listTextItemStyle: {
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: AppStyleConstants.colors.BORDER_COLOR,
  },
  scrollContainerStyle: {
    maxHeight: (height / 100) * 50,
  },
  popupContainerStyle: {
    backgroundColor: AppStyleConstants.colors.POPUP_BACKGROUND_COLOR,
    overflow: 'hidden',
    width: (width / 100) * 80,
    paddingTop: 10,
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: AppStyleConstants.colors.BUTTON_COLOR,
  },
  buttonFontStyle: {
    color: AppStyleConstants.colors.BUTTON_FONT_COLOR,
  },
});

export default CustomTextInputPickerField;
