import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomTouch from './CustomTouch';

const CustomButton = (props) => {
  const {
    style,
    fontStyle,

    title,

    onPress,
    onLongPress,
  } = props;

  const mainUIMainComponent = (
    <CustomTouch
      isRequiredFeedback={true}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View style={{...styles.containerStyle, ...style}}>
        <Text style={{...styles.textStyle, ...fontStyle}}>{title}</Text>
      </View>
    </CustomTouch>
  );
  return mainUIMainComponent;
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#C2C2C2',
    // flex: 1,
  },
  textStyle: {
    textAlign: 'center',
    color:'red',
  },
});

export default CustomButton;
