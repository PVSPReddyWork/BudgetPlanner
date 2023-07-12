import React from 'react';

import {TouchableOpacity, StyleSheet} from 'react-native';

const CustomFloatingButton = (props) => {
  const mainUIComponent = (
    <TouchableOpacity
      style={{...styles.touchableButtonStyle, ...props.style}}
      onPress={props.onPress}>
      {/* {props.item} */}
      {props.children}
    </TouchableOpacity>
  );
  return mainUIComponent;
};

const styles = StyleSheet.create({
  touchableButtonStyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'blue',
    right: 40,
    bottom: 40,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomFloatingButton;
