// 'use strict';
// import React from 'react';
// import {RNCamera} from 'react-native-camera';

// import {
//   View,
//   StyleSheet,
//   Modal,
//   Text,
//   Alert,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';

// const CameraView = (props) => {
//   let camera = null;

//   const takePicture = async function (camera) {
//     const options = {quality: 0.5, base64: true};
//     const data = await camera.takePictureAsync(options);
//     console.log(data.uri);
//     props.onCameraSnapped(data.uri, props.callerID);
//   };

//   const onClose = () => {
//     props.onClosePress();
//   };

//   const PendingView = () => (
//     <View
//       style={{
//         // flex: 1,
//         height: 50,
//         width: 50,
//         backgroundColor: 'lightgreen',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <ActivityIndicator size="large" color="#0000ff" />
//     </View>
//   );

//   const mainUIComponent = (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={props.visibility}
//       onRequestClose={() => {
//         Alert.alert('Modal has been closed.');
//       }}>
//       <View style={styles.container}>
//         <RNCamera
//           ref={(ref) => {
//             camera = ref;
//           }}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           onGoogleVisionBarcodesDetected={({barcodes}) => {
//             console.log(barcodes);
//           }}>
//           {({camera, status, recordAudioPermissionStatus}) => {
//             if (status !== 'READY') {
//               return <PendingView />;
//             }
//             return (
//               <View
//                 style={{
//                   flex: 0,
//                   flexDirection: 'row',
//                   justifyContent: 'center',
//                 }}>
//                 <TouchableOpacity
//                   onPress={() => takePicture(camera)}
//                   style={styles.capture}>
//                   <Text style={{fontSize: 14}}> SNAP </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={onClose} style={styles.capture}>
//                   <Text style={{fontSize: 14}}> Close </Text>
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         </RNCamera>
//       </View>
//     </Modal>
//   );
//   return mainUIComponent;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });

// export default CameraView;
