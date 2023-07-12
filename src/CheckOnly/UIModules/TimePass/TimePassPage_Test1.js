import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import AppStyleConstants, {AppHeight, AppWidth} from '../../Constants/AppStyleConstants';
import {
  ADD_EXPENSE_PAGE,
  EXPENSES_YEARS_LIST,
  DISPLAY_ITEMS_LIST,
  SETTINGS_PAGE,
} from '../../Constants/PageNameConstants';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomHeader from '../../CustomComponents/CustomHeader';
import CustomContainerView from '../../CustomComponents/CustomContainerView';
import { RUPEE_ADD_ICON, RUPEE_LIST_ICON, GROCERIES_LIST_ICON, SETTINGS_ICON, COMPOSE_ICON } from './../../Assets/ImageHelper';
import CustomSectionView from '../../CustomComponents/CustomSectionView';
import CustomTouch from '../../CustomComponents/CustomTouch';
import { ceil } from 'react-native-reanimated';
const Sound = require('react-native-sound');
import A0 from './../../Assets/MusicNotes/PianoNotes/A0.mp3';

// import { A0_MP3 } from './../../Assets/MusicNotes/MusicNotesConfig';

class TimePass_Page extends React.Component {
  // const [isVisibleModal, setIsVisibleModal] = useSta
  constructor(props) {
    super(props);
    this.state = {
      isVisibleModal: false,
      backgroundColor: AppStyleConstants.colors.MAIN_BODY_COLOR,
      allSelectedColors: [],
    };
  }

  dataItems = [
    {
      id: 1,
      name: '1',
      colorTag: "#FFF",
    },
    {
      id: 2,
      name: '2',
      colorTag: "#9400D3",
    },
    {
      id: 3,
      name: '3',
      colorTag: "#4B0082",
    },
    {
      id: 4,
      name: '4',
      colorTag: "#0000FF",
    },
    {
      id: 5,
      name: '5',
      colorTag: "#00FF00",
    },
    {
      id: 6,
      name: '6',
      colorTag: "#FFFF00",
    },
    {
      id: 7,
      name: '7',
      colorTag: "#FF7F00",
    },
    {
      id: 8,
      name: '8',
      colorTag: "#FF0000",
    },
    {
      id: 9,
      name: '9',
      colorTag: "#008080",
    },
    {
      id: 10,
      name: '*',
      colorTag: "#FBCBC9",
    },
    {
      id: 0,
      name: '0',
      colorTag: "#000",
    },
    {
      id: 11,
      name: '#',
      colorTag: "#6B7B8C",
    },
    {
      id: 12,
      name: 'Done',
      colorTag: "#FFFFFF",
    }
  ];

  moveBack = () => {
    this.props.navigation.pop();
  };

  onItemSelectionhandler = (item) => {
    // this.playMusicFromURLOnline();
    // this.playMusicFromAssets();
    // this.playMusicFromBundle();
    console.log(item);
    if(item.id !== 12){
        let _allColours = this.state.allSelectedColors;
        _allColours.push(item.colorTag);
        this.setState({backgroundColor: item.colorTag, allSelectedColors: _allColours});
        console.log(this.state);
    }
    else{
      console.log(this.state);
        this.state.allSelectedColors.forEach((item) => {
          console.log(item);
        setTimeout(function(){this.setState({backgroundColor: item.colorTag})}, 1000);
        // this.setState({backgroundColor: item.colorTag})
        });
    }
  }

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
      console.log(this.state.backgroundColor);
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
              <CustomSectionView itemsData={this.dataItems} columnsNeeded={3} rowHolderStyle={styles.rowHolderStyle} viewCellTemplate={this.viewCellTemplateDesign} />
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
const TimePassPage = TimePass_Page;
export default TimePassPage;
