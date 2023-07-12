import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import AppStyleConstants, {AppHeight, AppWidth} from '../../Constants/AppStyleConstants';
import CustomHeader from '../../CustomComponents/CustomHeader';
import CustomContainerView from '../../CustomComponents/CustomContainerView';
import CustomSectionView from '../../CustomComponents/CustomSectionView';
import CustomTouch from '../../CustomComponents/CustomTouch';
import { connect } from 'react-redux';
import { fetchUpdateTimePassState, fetchUpdateTimePassBGColor } from './TimePassPageActions';

import * as dataItems from './../../Constants/DataConstants/ColorPlayData.json';

class TimePass_Page extends React.Component {
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
        let _allColours = this.props.allSelectedColors;
        _allColours.push(item.colorTag);
        // this.setState({backgroundColor: item.colorTag, allSelectedColors: _allColours});
        this.props.dispatch(fetchUpdateTimePassState({backgroundColor: item.colorTag, allSelectedColors: _allColours}));
    }
    else{
      this.props.dispatch(fetchUpdateTimePassBGColor(this.props.allSelectedColors));
    //  var i = 1;
    //  const interval = 5000;
    //   this.state.allSelectedColors.forEach((item) => {
    //     console.log('time pass >>>> : ');
    //     console.log(item);
    //     i++;
    //     /*
    //     setTimeout(function () {
    //       this.setState({backgroundColor: item.colorTag})
    //       //this.props.dispatch(fetchUpdateTimePassState({backgroundColor: item.colorTag}));
    //     }, i * interval);
    //     // this.props.dispatch(fetchUpdateTimePassState({backgroundColor: item.colorTag}));
    //     // wait(5000);
    //     // Thre
    //     */
    //     setTimeout(this.test(item), i * interval);
    //   });
    }
  }

  test = (item) => {
    this.setState({backgroundColor: item.colorTag})
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
    const mainUIComponent = (
      <>
        <CustomContainerView>
          <CustomHeader
          title="Composer Simulation"
          {...AppStyleConstants.headerStyle}
          showNavigationIcon={true}
          onNavigationButtonPress={this.moveBack}
        />

          <ScrollView style={{backgroundColor: this.props.backgroundColor}}>
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
const TimePassPage = connect(mapStateToProps)(TimePass_Page);
export default TimePassPage;
