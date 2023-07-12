import React from 'react';

import {View, Text, Modal, Alert, StyleSheet} from 'react-native';
import CustomTouch from './CustomTouch';

class CustomActionSheet extends React.Component {
  dataItems = [];

  constructor(props) {
    super(props);
    this.dataItems = this.props.options;
    if (typeof this.dataItems === 'undefined') {
      this.dataItems = [];
    }
    this.state = {
      showDisplayAcionSheet: false,
    };
  }

  static getDerivedStateFromProps(nextProps, oldState) {
    // console.log("props changed");
    if (nextProps.visibility !== oldState.showDisplayAcionSheet) {
      return {showDisplayAcionSheet: nextProps.visibility};
    }
    return null;
  }

  // componentWillReceiveProps(nextProps) {
  //     console.log("called depricated")
  //   }

  // componentDidUpdate(prevProps, prevState, snapshot)
  // {
  //     console.log("updating")
  // }

  createButtons = (item) => {
    // console.log(item);
    const uiComponent = (
      <CustomTouch onPress={() => this.onOptionSelectedHandler(item)}>
        {/* () => { console.log("clicked cancel"); item.onPress}}> */}
        <View style={styles.actionSheetItemsHolder}>
          <Text
            style={{
              ...styles.actionSheetItemsTextStyle,
              ...this.props.actionSheetItemsTextStyle,
            }}>
            {item.text}
          </Text>
        </View>
      </CustomTouch>
    );
    return uiComponent;
  };

  onOptionSelectedHandler = (item) => {
    // console.log("onOptionSelectionHandler");
    // this.setState({showDisplayAcionSheet: false});
    if (typeof item.onPress !== 'undefined') {
      // console.log("press is valid")
      item.onPress(this.props.id, item.text);
    }
  };

  render() {
    const mainUIComponent = (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showDisplayAcionSheet}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.actionSheetMainHolderStyle}>
          <View
            style={{...styles.actionSheetDataHolderStyle, ...this.props.style}}>
            <View
              style={{
                ...styles.actionSheetHeaderHolderStyle,
                ...this.props.headerStyle,
              }}>
              <Text
                style={{
                  ...styles.actionSheetHeaderTextStyle,
                  ...this.props.headerTextStyle,
                }}>
                {this.props.title}
              </Text>
            </View>
            {/* <Text style={{ ...styles.actionSheetDescriptionTextStyle, ...this.props.descritionTextStyle }}>{this.props.description}</Text> */}
            <View
              style={{
                ...styles.actionSheetContentHolderStyle,
                ...this.props.bodyStyle,
              }}>
              {/* {props.children} */}
              {this.dataItems.map((item) => {
                return this.createButtons(item);
              })}
            </View>
            {this.createButtons({
              id: 'cancel',
              text: 'Cancel',
              onPress: this.props.onCancelPress,
            })}
          </View>
        </View>
      </Modal>
    );
    return mainUIComponent;
  }
}

const styles = StyleSheet.create({
  actionSheetMainHolderStyle: {
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#00000040',
    // alignContent: "flex-end",
    justifyContent: 'flex-end',
  },
  actionSheetDataHolderStyle: {
    overflow: 'hidden',
    backgroundColor: 'white',
    // alignContent: "flex-end",

    justifyContent: 'flex-end',
  },
  actionSheetHeaderHolderStyle: {
    backgroundColor: '#C7C7C7',
    margin: 0,
    paddingVertical: 10,
  },
  actionSheetHeaderTextStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
  actionSheetDescriptionTextStyle: {
    fontSize: 15,
  },
  actionSheetContentHolderStyle: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },

  actionSheetItemsHolder: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionSheetItemsTextStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CustomActionSheet;
