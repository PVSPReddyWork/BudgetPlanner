import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { ConsoleLogger } from '../Helpers/EventLogger';

const CustomModal = (props) => {
  const {
    visible,
    style,
    onRequestClose,
    animationType,
    transparent,
    children,
    onPress,
    inputId,
  } = props;

  const mainUIComponent = (
    <Modal
      animationType={animationType ?? 'slide'}
      transparent={transparent ?? true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <TouchableOpacity
        accessibility="none"
        accessibile={false}
        importantForAccessibility="no"
        accessibilityHint=""
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
          ConsoleLogger('CustomModal >>>> ', props);
          if (onPress && onPress !== null && onPress !== undefined) {
            onPress(inputId);
          }
        }}>
        <View style={{...styles.actionSheetMainHolderStyle, ...style}}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingViewStyle}
            behavior="padding"
            keyboardVerticalOffset={Platform.select({
              ios: () => 0,
              android: () => 100,
            })()}>
            {children}
          </KeyboardAvoidingView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return mainUIComponent;
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  actionSheetMainHolderStyle: {
    overflow: 'hidden',
    height,
    // flex: 1,
    backgroundColor: '#00000040',
    justifyContent: 'flex-end',
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomModal;
