//CustomFloatingButton
import React from 'react';
import {
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
 
 const CustomContainerView = (props) =>  {

    const {
      children,
      style
    } = props;

  const uiMainView = (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{...styles.mainViewStyle, ...style}}
        >
          <SafeAreaView style={{...styles.mainViewStyle, ...style}}>
              {children}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );

    return uiMainView;
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
    }
});

export default CustomContainerView;
