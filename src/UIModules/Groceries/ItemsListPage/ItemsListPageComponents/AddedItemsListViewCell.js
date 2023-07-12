import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { EDIT_ICON, DELETE_ICON, BOX_EMPTY_ICON, BOX_FULL_ICON, ARROW_LEFT_ICON, ARROW_RIGHT_ICON } from '../../../../Assets/ImageHelper';
import AppStyleConstants from '../../../../Constants/AppStyleConstants';
import CustomTouch from '../../../../CustomComponents/CustomTouch';
// import {Tooltip} from "react-native-elements"

export const EDIT_HARD_MODE = 'EDIT_HARD_MODE';
export const EDIT_SIMPLE_MODE = 'EDIT_SIMPLE_MODE';

const AddedItemsListViewCell = (props) => {
  const { dataItem, onPress, onOptionsToggler, onEdit, editTypeMode,onDelete } = props;
  let item = {
    name: '',
    isAvailable: false,
    availableQuantity: 0,
    type: '',
    useAsPartOf: [],
    shallShowInList: false,
    openOptions: false,
  };
  if (dataItem !== null && dataItem !== undefined) {
    item = dataItem;
  }

  const onPressHandler = () => {
    onPress(item);
  };

  const onOpenHandler = () => {
    // const open_Options = openOptions;
    // setOpenOptions(!open_Options)
    if (onOptionsToggler !== null && onOptionsToggler !== undefined) {
      onOptionsToggler(item);
    }
  }

  const onEditHandler = (editTypeMode) => {
    // setOpenOptions(false);
    if (onEdit !== null && onEdit !== undefined) {
      onEdit(item, editTypeMode);
    }
  }

  const onDeleteHandler = () => {
    // setOpenOptions(false);
    if (onDelete !== null && onDelete !== undefined) {
      onDelete(item);
    }
  }

  const viewCellComponent = (
    // <View>
    <TouchableOpacity activeOpacity={Platform.OS === 'ios' ? 0.4 : "0.4"} onPress={onOpenHandler}>
    <View style={styles.itemViewCellStyle}>
      {
        // <Image
        //   style={styles.itemViewCellImageStyle}
        //   source={IMAGE_PROFILE_DUMMY}
        // />
      }
      <View style={{ flex: 1, paddingLeft: 15 }}>
        <Text style={styles.itemViewCellNameTextStyle}>{item.name}</Text>
        {/* <Text style={styles.itemViewCellNameTextStyle}>{'Hello World'}</Text> */}
        <Text style={(item.isAvailable) ? { color: AppStyleConstants.colors.LIST_ITEM_FONT_COLOR } : { color: AppStyleConstants.colors.LIST_ITEM_THRESHOLD_FONT_COLOR }}>{(item.isAvailable) ? 'Available' : 'Not Available'}</Text>
      </View>
      {item.openOptions ? (
        // openOptions ? (
        <>
          <View style={{ ...styles.itemViewCellButtonHolderStyle, ...AppStyleConstants.floatButtonActiveStyle.style }}>
            {/* <Text style={{...styles.itemViewCellButtonTextStyle, ...AppStyleConstants.floatButtonActiveStyle.fontStyle}} onPress={onEditHandler}> {'/'} </Text> */}
            <CustomTouch onPress={() => onEditHandler(EDIT_HARD_MODE)}>
              <Image style={styles.itemViewCellImageStyle} source={EDIT_ICON} />
            </CustomTouch>
          </View>

          <View style={{ ...styles.itemViewCellButtonHolderStyle, ...AppStyleConstants.floatButtonActiveStyle.style }}>
            {/* <Text style={{...styles.itemViewCellButtonTextStyle, ...AppStyleConstants.floatButtonActiveStyle.fontStyle}} onPress={onDeleteHandler}> {'X'} </Text> */}
            <CustomTouch onPress={onDeleteHandler}>
              <Image style={styles.itemViewCellImageStyle} source={DELETE_ICON} />
            </CustomTouch>
          </View>
        </>
      ) : (
          <>
            <View style={{ ...styles.itemViewCellButtonHolderStyle, ...AppStyleConstants.floatButtonActiveStyle.style }}>
              {/* <Text style={{...styles.itemViewCellButtonTextStyle, ...AppStyleConstants.floatButtonActiveStyle.fontStyle}} onPress={onDeleteHandler}> {'X'} </Text> */}
              <CustomTouch onPress={() => onEditHandler(EDIT_SIMPLE_MODE)}>
                <Image style={styles.itemViewCellImageStyle} source={(item.isAvailable) ? BOX_EMPTY_ICON : BOX_FULL_ICON} />
              </CustomTouch>
            </View>
          </>
        )}
      {/* <View style={{ ...styles.itemViewCellButtonHolderStyle, ...AppStyleConstants.floatButtonActiveStyle.style }}>
        {/* <Text style={{...styles.itemViewCellButtonTextStyle, ...AppStyleConstants.floatButtonActiveStyle.fontStyle}} onPress={onOpenHandler}> {(item.openOptions) ? '>' : '<'} </Text> * /}
        <CustomTouch onPress={onOpenHandler}>
          <Image style={styles.itemViewCellImageStyle} source={(item.openOptions) ? ARROW_RIGHT_ICON : ARROW_LEFT_ICON} />
        </CustomTouch>
      </View> */}
      {/* {(item.item.showAccessibleButtons) ? <Button title="Delete" /> : <></>} */}
    </View>
  </TouchableOpacity>
    // </View>
  );
  return viewCellComponent;
};

const styles = StyleSheet.create({
  itemViewCellStyle: {
    backgroundColor: AppStyleConstants.colors.LIST_ITEM_BACKGROUND_COLOR,//'rgb(144,238,144)',//AppStyleConstants.colors.LIST_CELL_BODY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "center",
    minHeight: 60,
    borderRadius: 30,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 5,
    overflow: 'hidden',
  },
  itemViewCellImageStyle: {
    // height: 50,
    // width: 50,
    width: '60%',
    height: undefined,
    // borderRadius: 30,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  itemViewCellNameTextStyle: {
    fontSize: 18,
    color: AppStyleConstants.colors.LIST_ITEM_FONT_COLOR
  },
  itemViewCellButtonTextStyle: {
    fontSize: AppStyleConstants.fontSizes.ROUND_BUTTON_FONT_SIZE,
    color: AppStyleConstants.colors.ROUND_BUTTON_FONT_COLOR,
  },
  itemViewCellButtonHolderStyle: {
    backgroundColor: AppStyleConstants.colors.ROUND_BUTTON_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    padding: 5,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
});

export default AddedItemsListViewCell;
