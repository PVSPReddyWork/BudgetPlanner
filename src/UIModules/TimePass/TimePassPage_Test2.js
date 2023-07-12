import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import AppStyleConstants, {AppHeight, AppWidth} from '../../Constants/AppStyleConstants';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomHeader from '../../CustomComponents/CustomHeader';
import CustomContainerView from '../../CustomComponents/CustomContainerView';
import CustomSectionView from '../../CustomComponents/CustomSectionView';
import CustomTouch from '../../CustomComponents/CustomTouch';
import { ceil } from 'react-native-reanimated';
const Sound = require('react-native-sound');
import A0 from './../../Assets/MusicNotes/PianoNotes/A0.mp3';
import { connect } from 'react-redux';
import { fetchUpdateTimePassState, fetchUpdateTimePassBGColor } from './TimePassPageActions';

import * as dataItems from './../../Constants/DataConstants/ColorPlayData.json';


// import { A0_MP3 } from './../../Assets/MusicNotes/MusicNotesConfig';

class TimePass_Page extends React.Component {
  // const [isVisibleModal, setIsVisibleModal] = useSta
  constructor(props) {
    super(props);
    this.state={
      backgroundColor: AppStyleConstants.colors.MAIN_BODY_COLOR,
      allSelectedColors: [],
    }
  }

  moveBack = () => {
    this.props.navigation.pop();
  };

  sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  onItemSelectionhandler = (item) => {
    console.log(item);
    if(item.id !== 12){
        let _allColours = this.state.allSelectedColors;
        _allColours.push(item.colorTag);
        this.setState({backgroundColor: item.colorTag, allSelectedColors: _allColours});
        // this.props.dispatch(fetchUpdateTimePassState({backgroundColor: item.colorTag, allSelectedColors: _allColours}));
        // console.log(this.state);
    }
    else{
      /*
      // // // console.log(this.state);
      //   this.props.allSelectedColors.forEach((item) => {
      //     console.log(item);
      //   setTimeout(function(){
      //     // this.setState({backgroundColor: item.colorTag})
      //     this.props.dispatch(fetchUpdateTimePassState({backgroundColor: item.colorTag}));
      //   }, 1000);
      // //   // this.setState({backgroundColor: item.colorTag})
      //   // this.props.dispatch(fetchUpdateTimePassState({backgroundColor: item.colorTag}));
      //   });
      */
      /*
      this.props.allSelectedColors.forEach(async (item) => {
        console.log('time pass >>>> : ');
        console.log(item);
        this.props.dispatch(fetchUpdateTimePassState({backgroundColor: item.colorTag}));
        await this.sleep(5000);
      });
      */
     var i = 1;
     const interval = 5000;
      this.state.allSelectedColors.forEach((item) => {
        console.log('time pass >>>> : ');
        console.log(item);
        i++;
        /*
        setTimeout(function () {
          this.setState({backgroundColor: item.colorTag})
          //this.props.dispatch(fetchUpdateTimePassState({backgroundColor: item.colorTag}));
        }, i * interval);
        // this.props.dispatch(fetchUpdateTimePassState({backgroundColor: item.colorTag}));
        // wait(5000);
        // Thre
        */
        setTimeout(this.test(item), i * interval);
      });
    }
  }

  test = (item) => {
    this.setState({backgroundColor: item.colorTag})
  }

  /*
  myLoop() {         //  create a loop function
    setTimeout(function() {   //  call a 3s setTimeout when the loop is called
      console.log('hello');   //  your code here
      i++;                    //  increment the counter
      if (i < 10) {           //  if the counter < 10, call the loop function
        myLoop();             //  ..  again which will trigger another 
      }                       //  ..  setTimeout()
    }, 3000)
  }
  */

  playMusicFromBundle(){
    let hello = new Sound('test.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log(error)
      }
    })

    hello.play((success) => {
      if (!success) {
        console.log('Bundle Sound did not play')
      }
    })
 }

  playMusicFromURLOnline(){
      const musicURL = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3';
      let hello = new Sound(musicURL, null, (error) => {
        if (error) {
          console.log(error)
        }
      })

      hello.play((success) => {
        if (!success) {
          console.log('url Sound did not play')
        }
      })
  }

  playMusicFromAssets(){
    Sound.setCategory('Playback');
    let hello = new Sound('A0.mp3', "./../../Assets/MusicNotes/PianoNotes/",(error) => {
        if (error) {
          console.log(error)
        }
      })

      hello.play((success) => {
        if (!success) {
          console.log('Asset Sound did not play')
        }
      })
  }

  viewCellTemplateDesign = (item) => {
    // console.log('HomePage >>>> viewCellTemplateDesign >>>> item: ', item);
    const uiViewCell = (
      <CustomTouch
        isRequiredFeedback={true}
        childData={item}
        onPress={() => this.onItemSelectionhandler(item)}>
        <View style={styles.listItemHolder}>
          <Text style={styles.listItemFontStyle}>{item.name}</Text>
        </View>
      </CustomTouch>
    );
    return uiViewCell;
  };

  render() {
      // console.log(this.state.backgroundColor);
    const mainUIComponent = (
      <>
        <CustomContainerView>
          <CustomHeader
          title="Composer Simulation"
          {...AppStyleConstants.headerStyle}
          showNavigationIcon={true}
          onNavigationButtonPress={this.moveBack}
        />

          <ScrollView style={{backgroundColor: this.state.backgroundColor}}>
            <View style={styles.sectionHolderViewStyle}>
              <CustomSectionView itemsData={dataItems.dataItems} columnsNeeded={3} rowHolderStyle={styles.rowHolderStyle} viewCellTemplate={this.viewCellTemplateDesign} />
            </View>
          </ScrollView>
        </CustomContainerView>
      </>
    );
    return mainUIComponent;
  }
}

const styles = StyleSheet.create({
  listItemFontStyle: {
    color: AppStyleConstants.colors.LIST_ITEM_FONT_COLOR,
    margin: 15,
  },
  listItemHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyleConstants.colors.LIST_ITEM_BACKGROUND_COLOR,
    height: ((AppHeight)/9),
    width: ((AppWidth - 80)/2),
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginVertical: 2.5,
  },
  rowHolderStyle: {
    marginBottom: 20,
    justifyContent: 'space-around',
    // height: ((AppWidth - 80)/2),
  },
  sectionHolderViewStyle: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  mainContainerStyle: {
    backgroundColor: AppStyleConstants.colors.MAIN_BODY_COLOR,
  }
});
const mapStateToProps = (state) => {
  return {
    backgroundColor: state.TimePassPageReducer.backgroundColor,
    allSelectedColors: state.TimePassPageReducer.allSelectedColors,
  };
};
const TimePassPage = TimePass_Page;//connect(mapStateToProps)(TimePass_Page);
export default TimePassPage;
