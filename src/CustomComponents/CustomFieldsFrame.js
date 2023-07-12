import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class CustomFieldFrame extends React.Component {
  render() {
    const {
      style,
      legendTextStyle,
      children,

      legendTitle,
      hintText,
      hintTextStyle,

      isError,
    } = this.props;

    const uiMainComponent = (
      <View style={{...styles.containerStyle, ...style}}>
        <View style={{...styles.childrenContainerStyle}}>
          {children}
          <Text style={{...styles.textLegendStyle, ...legendTextStyle}}>
            {legendTitle}
          </Text>
        </View>
        {isError ? (
          <Text style={{...styles.hintTextStyle, ...hintTextStyle}}>
            {hintText}
          </Text>
        ) : (
          <></>
        )}
      </View>
    );

    return uiMainComponent;
  }
}

const styles = StyleSheet.create({
  hintTextStyle: {
    left: 10,
  },
  textLegendStyle: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#FFFFFF',
  },
  childrenContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    margin: 0,
    padding: 0,
  },
  containerStyle: {
    backgroundColor: '#00000000',
    paddingTop: 10,
  },
});

export default CustomFieldFrame;
