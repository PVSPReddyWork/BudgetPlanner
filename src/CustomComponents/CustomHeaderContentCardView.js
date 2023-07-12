import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomHeaderContentCardView = (props) => {
  const mainUIContent = (
    <View style={{...styles.cardMainHolderStyle, ...props.style}}>
      <View style={{...styles.cardHeaderHolderStyle, ...props.headerStyle}}>
        <Text style={{...styles.cardHeaderTextStyle, ...props.headerTextStyle}}>
          {props.title}
        </Text>
      </View>
      <View style={{...styles.cardContentHolderStyle, ...props.bodyStyle}}>
        {props.children}
      </View>
    </View>
  );
  return mainUIContent;
};

const styles = StyleSheet.create({
  cardMainHolderStyle: {
    marginBottom: 30,
    overflow: 'hidden',
  },
  cardHeaderHolderStyle: {
    backgroundColor: '#c7c7c7',
    margin: 0,
    paddingVertical: 10,
  },
  cardHeaderTextStyle: {
    fontSize: 20,
  },
  cardContentHolderStyle: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },
});

export default CustomHeaderContentCardView;
