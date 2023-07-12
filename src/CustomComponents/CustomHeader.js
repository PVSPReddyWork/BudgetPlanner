import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {IMAGE_BACK} from '../Assets/ImageHelper';

const CustomHeader = (props) => {
  const {
    headerViewStyle,
    headerIconStyles,
    headerTextStyle,
    headerTitleFontStyle,

    title,

    showNavigationIcon,
    isMasterDetailHeader,
    navigationIconSource,

    leftSideView,
    rightSideView,

    navigation,
    onNavigationButtonPress,
  } = props;

  var navigationButtonImageSource = navigationIconSource;
  if (
    navigationButtonImageSource === null ||
    navigationButtonImageSource === undefined
  ) {
    navigationButtonImageSource = IMAGE_BACK;
  }

  const onNavigationButtonPressHandler = () => {
    if (
      onNavigationButtonPress === null ||
      onNavigationButtonPress === undefined
    ) {
      if (navigation === null || navigation === undefined) {
      } else {
        if (!isMasterDetailHeader) {
          navigation.pop();
        } else {
          navigation.toggleDrawer();
        }
      }
    } else {
      onNavigationButtonPress();
    }
  };

  const mainUIComponent = (
    <View style={{...styles.mainHeaderHolderStyle, ...headerViewStyle}}>
      {showNavigationIcon ? (
        <TouchableWithoutFeedback onPress={onNavigationButtonPressHandler}>
          <Image style={{...styles.headerIconStyles, ...headerIconStyles}} source={navigationButtonImageSource} />
        </TouchableWithoutFeedback>
      ) : (
        <></>
      )}
      {leftSideView}
      <View style={{...styles.headerTitleHolderStyle, ...headerTextStyle}}>
        <Text style={{...styles.headerTitleFontStyle, ...headerTitleFontStyle}}>
          {title}
        </Text>
      </View>
      {rightSideView}
    </View>
  );
  return mainUIComponent;
};

const styles = StyleSheet.create({
  // mainHeaderHolderStyle: {
  //   height: 50,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: 'rgb(63,85,97)',
  //   paddingHorizontal: 10,
  // },
  // backImageStyle: {
  //   alignSelf: 'flex-start',
  // },
  // headerTitleFontStyle: {
  //   fontSize: 20,
  // },
  // headerTitleHolderStyle: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'transparent',
  //   flex: 1,
  //   paddingHorizontal: 10,
  // },
  mainHeaderHolderStyle: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C2C2C2',
    paddingHorizontal: 10,
  },
  headerIconStyles: {
    height: 30,
    width: 30,
  },
  backImageStyle: {
    alignSelf: 'flex-start',
  },
  headerTitleFontStyle: {
    fontSize: 20,
  },
  headerTitleHolderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default CustomHeader;
