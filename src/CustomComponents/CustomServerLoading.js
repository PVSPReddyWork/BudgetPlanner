import React from 'react';

import {TouchableOpacity, Text, View, ActivityIndicator, StyleSheet} from 'react-native';

const CustomServerLoading = (props) => {
  const mainUIComponent = (
    // <TouchableOpacity
    //   style={{...styles.touchableButtonStyle, ...props.style}}
    //   onPress={props.onPress}>
    //   {/* {props.item} */}
    //   {props.children}
    // </TouchableOpacity>
    <View style={{...styles.serverLoadingHolderStyle, ...props.style}}>
        <ActivityIndicator size="large" color="#0000ff" />
        {/* <Text>syncing data from server ...</Text> */}
    </View>
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
  serverLoadingHolderStyle: {
    height: 60,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
  },
});

export default CustomServerLoading;