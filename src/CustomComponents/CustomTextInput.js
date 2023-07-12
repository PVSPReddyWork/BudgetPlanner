/* eslint-disable no-unused-vars */
import React, {useState, useReducer, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {IMAGE_PASSWORD_HIDE, IMAGE_PASSWORD_SHOW} from '../Assets/ImageHelper';

const CustomTextInput = (props) => {
  let validationOptions = props.validationOptions;
  if (
    validationOptions ||
    validationOptions === null ||
    typeof validationOptions === 'undefined'
  ) {
    validationOptions = {};
    //console.log("validation is null", validationOptions);
  }
  const {
    allowInbuiltValidation,
    allowErrorText,
    isValidInput,
    isRequired,
    isMobileNumber,
    isEmailID,
    isNumericValue,
  } = validationOptions;
  const {inputID, validationType} = props;
  const {shallInitValidation} = validationOptions;
  //const [shallInitInputValidation, setShallInitInputValidation] = useState(false);

  const arabic = '\u0f441'; //"\u0633";

  //Start For password eye icon show or hide, password text show or masked
  const {isPasswordInput} = props;
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(isPasswordInput); //useState(secureTextEntry);
  const onAlterShowPasswordPressed = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };
  //End For password eye icon show or hide, password text show or masked

  //Start Code for validation reducer
  const CHECK_VALIDATION = 'CHECK_VALIDATION';
  const initialState = {
    value: props.text,
    isValid: false,
  };
  const validationReducer = (state = initialState, action) => {
    if (action.type === CHECK_VALIDATION) {
      let isValidValue = true;
      let isTextEmpty = true;
      if (action.checkforValue.length > 0) {
        isTextEmpty = false;
      }
      if (!isTextEmpty) {
        const standardMobileRegex = /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/;
        const standardEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        const mediumPasswordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
        //^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$/
        if (
          action.isPasswordInput &&
          !mediumPasswordRegex.test(action.checkforValue)
        ) {
          isValidValue = false;
        } else if (
          action.isMobile &&
          !standardMobileRegex.test(action.checkforValue)
        ) {
          isValidValue = false;
        } else if (
          action.isEmail &&
          !standardEmailRegex.test(action.checkforValue)
        ) {
          isValidValue = false;
        }
      } else {
        if (action.notNull) {
          isValidValue = false;
        }
      }
      state = {...state, value: action.checkforValue, isValid: isValidValue};
    }
    return state;
  };
  const [valueState, valueValidationReducer] = useReducer(
    validationReducer,
    initialState,
  );

  useEffect(() => {
    //console.log("available to send", valueState);
    if (props.onInputChanged) {
      if (allowInbuiltValidation) {
        props.onInputChanged(inputID, valueState.value, valueState.isValid);
      } else {
        props.onInputChanged(inputID, valueState.value, true);
      }
    } else {
      //console.log("Invalid onInputChanged Function called")
    }
  }, [allowInbuiltValidation, inputID, props, valueState]);
  //End Code for validation reducer

  const onTextChanged = (text) => {
    // setShallInitInputValidation(false);
    valueValidationReducer({
      type: CHECK_VALIDATION,
      checkforValue: text,
      isPassword: isPasswordInput,
      isMobile: isMobileNumber,
      isEmail: isEmailID,
      isNumeric: isNumericValue,
      notNull: isRequired,
    });
  };

  const mainUIComponent = (
    <View style={{...styles.viewStyle, ...props.style}}>
      <View style={styles.textHolderViewStyle}>
        {/* <View style={{flexDirection: "row"}}>
                {((shallInitValidation)) ? <Text>shallInitInputValidation</Text> : <></>}
                {((!isValidInput)) ? <Text>isValidInput</Text> : <></>}
                </View> */}
        {allowErrorText && shallInitValidation && !isValidInput ? (
          <Text style={{...styles.textStyle, ...props.errorTextStyle}}>
            {props.errorHintText}
          </Text>
        ) : (
          <></>
        )}
        {/* <TextInput /> */}
        <TextInput
          style={{...styles.textInputStyle, ...props.inputTextStyle}}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          multiline={props.multiline}
          text={props.text}
          secureTextEntry={isSecureTextEntry}
          onChangeText={onTextChanged}
          //{...props}
        />
      </View>

      {/* <View style={styles.passwordImageStyle}>
    <Text>{arabic}</Text>
    {/* <Text>{entities.decode("&#1587")}</Text> * /}
</View> */}
      {isPasswordInput ? (
        <View style={styles.passwordImageViewStyle}>
          <TouchableOpacity onPress={onAlterShowPasswordPressed}>
            {isSecureTextEntry ? (
              <Image
                style={styles.passwordImageStyle}
                source={IMAGE_PASSWORD_HIDE}
              />
            ) : (
              <Image
                style={styles.passwordImageStyle}
                source={IMAGE_PASSWORD_SHOW}
              />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
  return mainUIComponent;
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    marginVertical: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  textHolderViewStyle: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    backgroundColor: 'white',
    color: 'maroon',
    margin: 0,
    padding: 0,
  },
  textInputStyle: {
    backgroundColor: 'white',
    color: 'blue',
    margin: 0,
    padding: 0,
  },
  passwordImageViewStyle: {
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  passwordImageStyle: {
    justifyContent: 'center',
    height: 30,
    width: 30,
  },
});

export default CustomTextInput;
