import React, {useState} from 'react';

import {
  // View,
  // StyleSheet,
  // Modal,
  ActivityIndicator,
  // Text,
  // Button,
} from 'react-native';
import CustomModal from './CustomModal';

const CustomActivityIndicator = (props) => {
  // const [loadingText, setLoadingText] = useState("loading");
  // const [modalVisibility, setModalVisibility] = useState(props.visibility);
  // const [] = useState(props.visibility);
  const {visibility} = props;

  // let i = 0;
  // const interval = setInterval(function () {
  //     // method to be executed;
  //     if (i === 0) {
  //         setLoadingText("loading");
  //         i++;
  //     }
  //     else if (i === 1) {
  //         setLoadingText("loading.");
  //         i++;
  //     }
  //     else if (i === 2) {
  //         setLoadingText("loading..");
  //         i++;
  //     }
  //     else if (i === 3) {
  //         setLoadingText("loading...");
  //         i++;
  //     }
  //     else {
  //         setLoadingText("loading");
  //         i = 0;
  //     }
  // }, 1000);
  // useEffect(() => {
  //     if (!modalVisibility) {
  //         clearInterval(interval);
  //         i = 0;
  //         setLoadingText("loading");
  //     }
  // }, [modalVisibility])

  const mainUIComponent = (
    <CustomModal visible={visibility}>
      <ActivityIndicator size="large" color="#0000ff" />
    </CustomModal>
    // <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={props.visibility}
    //     onRequestClose={() => {
    //         Alert.alert("Modal has been closed.");
    //     }}>
    //     <View
    //         style={styles.viewHolderStyle}>
    //         <ActivityIndicator size="large" color="#0000ff" />
    //         {/* <Text>{loadingText}</Text> */}
    //         {/* <Button title="Cancel" onPress={() => {setModalVisibility(false)}}/> */}
    //     </View>
    // </Modal>
  );
  return mainUIComponent;
};

// const styles = StyleSheet.create({
//     viewHolderStyle: {
//         backgroundColor: "#00000030",
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center"
//     }
// });

export default CustomActivityIndicator;
