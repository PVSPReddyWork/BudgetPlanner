import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

const CustomCarouselView = (props) => {
  // console.log("Custom Carousel Page Props: ", props.children);
  // const screenWidth = Dimensions.get("screen").width;
  // const screenHeight = Dimensions.get("screen").height;

  //   function uiview() {
  //     return props.childern;
  //   }

  const mainUIComponent = (
    <ScrollView
      // style={{...styles.scrollContent, width: screenWidth, height: screenHeight, ...props.style}}
      style={{...styles.scrollContent, ...props.style}}
      contentContainerStyle={{
        ...styles.carouselContentContainerStyle,
        ...props.contentContainerStyle,
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      scrollEventThrottle={200}
      decelerationRate="fast"
      pagingEnabled>
      {/* <View> */}
      {/* {uiview()} */}
      {props.children}
      {/* <Text>hello World</Text> */}
      {/* </View> */}
      {/* { carouselData.map(item=>carouselContent(item)) } */}
    </ScrollView>
  );
  // console.log("Custom Carousel Page UI Component: ", mainUIComponent);
  return mainUIComponent;
};

const styles = StyleSheet.create({
  carouselContentContainerStyle: {
    flexGrow: 1,
  },
  scrollContent: {
    // backgroundColor: "blue"
  },
});

export default CustomCarouselView;
