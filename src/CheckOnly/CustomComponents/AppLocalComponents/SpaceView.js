import React from 'react';
import {View, StyleSheet} from 'react-native';

const SpaceView = (props) => {
  const {style} = props;

  const uiMainComponentView = (
    <View style={{...styles.mainComponentViewStyle, ...style}} />
  );
  return uiMainComponentView;
};

const styles = StyleSheet.create({
  mainComponentViewStyle: {
    height: 50,
  },
});

export default SpaceView;
