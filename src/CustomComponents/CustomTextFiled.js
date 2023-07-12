import React from 'react';
import {StyleSheet, Text} from 'react-native';
import CustomFieldFrame from './CustomFieldsFrame';

class CustomTextField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      style,
      fontStyle,
      legendTextStyle,
      numberOfLines,
      legendTitle,
      value,
    } = this.props;

    const uiMainComponent = (
      <CustomFieldFrame
        style={style}
        legendTextStyle={legendTextStyle}
        legendTitle={legendTitle}>
        <Text
          style={{...styles.textDataStyle, ...fontStyle}}
          numberOfLines={numberOfLines}>
          {value}
        </Text>
      </CustomFieldFrame>
    );

    return uiMainComponent;
  }
}

const styles = StyleSheet.create({
  textDataStyle: {
    fontSize: 20,
    color: '#000000',
    margin: 10,
  },
});

export default CustomTextField;
