import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const CustomSectionView = (props) => {
  const { 
    itemsData,
    columnsNeeded,
    viewCellTemplate,
    rowHolderStyle,
  } = props;

  let items_Data = [];
  if (itemsData !== null && itemsData !== undefined && Array.isArray(itemsData)) {
    items_Data = itemsData;
  }

  let columns_Needed = 1;
  if (columnsNeeded !== null && columnsNeeded !== undefined && columnsNeeded > 0) {
    columns_Needed = columnsNeeded;
  }

  const itemsCount = items_Data.length;
  if(columns_Needed > itemsCount){
    columns_Needed = itemsCount;
  }
  
  const remainingItemsCount = (itemsCount % columns_Needed);
  let rows_Needed = ((itemsCount - remainingItemsCount) / columns_Needed);
  if (remainingItemsCount > 0) {
    rows_Needed = rows_Needed + 1;
  }

  let itemIndex = 0;
  let items2DDataMatrix = [];
  for (var rowNum = 0; rowNum < rows_Needed; rowNum++) {
    let itemsRow1DMatrix = [];
    for (var columnNum = 0; columnNum < columns_Needed; columnNum++) {
      if(itemIndex < itemsCount){
        itemsRow1DMatrix.push(itemIndex);
      }
      itemIndex++;
    }
    items2DDataMatrix.push(itemsRow1DMatrix);
  }

  

  // console.log('CustomSectionView >>>> uiMainview >>>> itemsCount: ', itemsCount);
  // console.log('CustomSectionView >>>> uiMainview >>>> columnsNeeded: ', columnsNeeded);
  // console.log('********************************************************************************');
  // console.log('CustomSectionView >>>> uiMainview >>>> remainingItemsCount: ', remainingItemsCount);
  // console.log('CustomSectionView >>>> uiMainview >>>> columns_Needed: ', columns_Needed);
  // console.log('CustomSectionView >>>> uiMainview >>>> rows_Needed: ', rows_Needed);
  // console.log('CustomSectionView >>>> uiMainview >>>> items2DDataMatrix: ', items2DDataMatrix);

  // console.log('********************************************************************************');
  // console.log('CustomSectionView >>>> uiMainview >>>> itemRowMatrix: ', itemRowMatrix);
  // console.log('CustomSectionView >>>> uiMainview >>>> index: ', index);
  // console.log('CustomSectionView >>>> uiMainview >>>> items_Data[index]: ', items_Data[index]);

  // let numberOfRowsArray =[];
  // if (rows_Needed !== -1) {
  //     for (var i = 1; i <= rows_Needed; i++) {
  //         numberOfRowsArray.push(i);
  //     }
  // }

  const uiMainview = (
    <ScrollView>
      <View>
        {items2DDataMatrix.map((itemRowMatrix) => {
          return (
            <View style={{...styles.rowHolderStyle, ...rowHolderStyle}}>
              {itemRowMatrix.map((index) => {
                return viewCellTemplate(items_Data[index]);
              })}
            </View>);
        })}
      </View>
    </ScrollView>
  );
  return uiMainview;
};

const styles = StyleSheet.create({
  rowHolderStyle: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignContent: 'center',
    // backgroundColor: 'rgb(170,170,170)',
  },
});

export default CustomSectionView;
