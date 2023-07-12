import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import CustomFieldFrame from './CustomFieldsFrame';

class CustomTextInputField extends React.Component {
  // EDIT_MODE = "EDIT_MODE";
  // ERROR_MODE = "ERROR_MODE";
  // NORMAL_MODE = "EDIT_MODE";

  // constructor(props) {
  //     super(props)
  //     this.state = {
  //         mode: this.NORMAL_MODE
  //     }
  // }

  onChangeTextHandler = (text) => {
    const {onChangeText, inputID} = this.props;
    onChangeText(text, inputID);
  };

  render() {
    const {
      fontStyle,
      maxLength,
      keyboardType,
      placeHolder,
      numberOfLines,
      value,
      multiline,

      style,
      legendTextStyle,
      legendTitle,
      hintText,
      hintTextStyle,
      isError,
    } = this.props;

    // let indicationColor = "#000000";
    // if(isError)
    // {
    //     indicationColor = "#FF0000";
    // }

    // switch (this.state.mode) {
    //     case this.NORMAL_MODE:
    //         break;
    //     case this.EDIT_MODE:
    //         break;
    //     case this.ERROR_MODE:
    //         break;
    // }

    // console.log('CustomTextInputField >>>> value: ', value);

    const uiMainComponent = (
      <CustomFieldFrame
        style={style}
        legendTextStyle={legendTextStyle}
        legendTitle={legendTitle}
        hintText={hintText}
        hintTextStyle={hintTextStyle}
        isError={isError}>
        <TextInput
          style={{...styles.textInputStyle, ...fontStyle}}
          onChangeText={this.onChangeTextHandler}
          onFocus={() => this.setState({mode: this.EDIT_MODE})}
          onBlur={() => this.setState({mode: this.NORMAL_MODE})}
          maxLength={maxLength}
          keyboardType={keyboardType}
          placeholder={placeHolder}
          numberOfLines={numberOfLines}
          multiline={multiline}
          value={value}
        />
      </CustomFieldFrame>
      // <View style={{ ...styles.containerStyle, ...style }}>
      //     <View style={{ ...styles.textInputContainerStyle }}>
      //         <TextInput
      //             style={{ ...styles.textInputStyle, ...fontStyle }}
      //             onChangeText={this.onChangeTextHandler}
      //             onFocus={() => this.setState({ mode: this.EDIT_MODE })}
      //             onBlur={() => this.setState({ mode: this.NORMAL_MODE })}
      //             maxLength={maxLength}
      //             keyboardType={keyboardType}
      //             placeHolder={placeHolder}
      //             numberOfLines={numberOfLines}
      //             multiline={multiline}
      //             //value={value}
      //         />
      //         <Text style={{ ...styles.textLegendStyle, ...legendTextStyle }}>{legendTitle}</Text>
      //     </View>
      //     {isError ? <Text style={{ ...styles.hintTextStyle, ...hintTextStyle }}>{hintText}</Text> : <></>}
      // </View>
    );

    return uiMainComponent;
  }
}

const styles = StyleSheet.create({
  // hintTextStyle: {
  //     left: 10
  // },
  // textLegendStyle: {
  //     position: 'absolute',
  //     top: -10,
  //     left: 10,
  //     backgroundColor: "#FFFFFF"
  // },
  textInputStyle: {
    fontSize: 20,
    // height: 40,
    minHeight: 40,
    color: '#000000',
    marginLeft: 10,
    // flex: 1,
  },
  // textInputContainerStyle: {
  //     backgroundColor: "#FFFFFF",
  //     borderRadius: 8,
  //     justifyContent: "center",
  //     borderColor: "#000000",
  //     borderWidth: 1,
  //     margin: 0,
  //     padding: 0
  // },
  // containerStyle: {
  //     backgroundColor: "#00000000",
  //     paddingTop: 10
  // },
});

export default CustomTextInputField;
