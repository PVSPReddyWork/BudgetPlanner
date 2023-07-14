//CustomFloatingButton
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import styles from './ItemsListPageStyles';
import CustomHeader from './../../../CustomComponents/CustomHeader';
import AddedItemsListViewCell, { EDIT_HARD_MODE, EDIT_SIMPLE_MODE } from './ItemsListPageComponents/AddedItemsListViewCell';
import CustomFloatingButton from './../../../CustomComponents/CustomFloatingButton';
import AddItemsModalPopup, { ADD_ADD_GROCERY_ITEM_MODE, EDIT_ADD_GROCERY_ITEM_MODE, CANCEL_ADD_GROCERY_ITEM_MODE } from './ItemsListPageComponents/AddItemsModalPopup';
import { GROCERY_ITEM_SEARCH, SEARCH_BUTTON, SORT_BUTTON, FILTER_BUTTON } from './../../../Constants/PageNameConstants';

import { MASTER_HEADER_HAM_BURGER } from '../../../Assets/ImageHelper';
import CustomContainerView from '../../../CustomComponents/CustomContainerView';

import { AvailableItems } from './ItemsListPageComponents/DefaultItems';
import { connect } from 'react-redux';

import {
  fetchGetGroceriesListAction,
  fetchGetLocalAnmieUpdatedGroceriesList,
  fetchGetLocalSortedGroceriesListAction,
  fetchGetLocalFilteredGroceriesListAction,
  fetchGetLocalSearchGroceriesListAction,
  fetchUpdateAddGroceriesListItem,
  fetchGetAddGroceriesListAction,
  fetchGetAddGroceriesListReset,
  fetchGetDeleteGroceriesListAction,
  fetchGetDeleteAllGroceriesListAction
} from './ItemsListPageActions';
import AppStyleConstants from '../../../Constants/AppStyleConstants';
import CustomSearch from './ItemsListPageComponents/SearchComponent';
import CustomTextInputPickerField from '../../../CustomComponents/CustomTextInputPickerField';
import { ConsoleLogger } from '../../../Helpers/EventLogger';
import { sortByAscendingOrder, sortByDescendingOrder } from '../../../Helpers/Helper';

const ItemsList_Page = (props) => {

  const {
    groceriesListData,
    newGroceryItem,
    serviceState,
    loaderVisibility,
    successMessage,
    errorMessage,
    formErrorMessage,
    dispatch,
    navigation,
  } = props;

  const [isAddItemPopupVisible, setIsAddItemPopupVisible] = useState(false);
  const [addItemPopupMode, setAddItemPopupMode] = useState('');
  const [popupOptions, setPopupOptions] = useState({
    isAddItemPopupVisible: false,
    addItemPopupMode: '',
  });
  const [shallOpenSortOptions, setShallOpenSortOptions] = useState(false);
  // const [itemsAdded, setItemsAdded] = useState([]);

  useEffect(() => {
    dispatch(fetchGetGroceriesListAction());
  }, []);

  let itemsAdded = [];
  if (groceriesListData !== null && groceriesListData !== undefined) {
    itemsAdded = groceriesListData;
  }

  const onChangedSearchTextHandler = (value, inputId) => {
    if (inputId === SORT_BUTTON) {
      dispatch(fetchGetLocalSortedGroceriesListAction(value, itemsAdded));
    }
    else if (inputId === FILTER_BUTTON) {
      dispatch(fetchGetLocalFilteredGroceriesListAction(value));
    }
    else if (inputId === GROCERY_ITEM_SEARCH) {
      dispatch(fetchGetLocalSearchGroceriesListAction(value));
    }
    else { }
  }

  const onSearchIconsClickHandler = (iconId) => {
    if (iconId === SEARCH_BUTTON) {
    } else if (iconId === SORT_ICON) {
    } else if (iconId === FILTER_ICON) {
    } else { }
  }

  const onComponentChangedClickHandler = (value, mode, popupId) => {
    if (mode !== null && mode !== undefined) {
      if (mode === CANCEL_ADD_GROCERY_ITEM_MODE) {
      } else if (mode === ADD_ADD_GROCERY_ITEM_MODE || mode === EDIT_ADD_GROCERY_ITEM_MODE) {
        if (value !== null || value !== undefined) {
          const { itemName, isItemAvaiable, itemQty } = value;
          const groceryItem = {
            name: itemName,
            isAvailable: isItemAvaiable,
            availableQuantity: itemQty,
          }
          dispatch(fetchGetAddGroceriesListAction(groceryItem));
        } //else if (mode === EDIT_ADD_GROCERY_ITEM_MODE) { } else { }
      }
    }
    // setIsAddItemPopupVisible(false);
    setPopupOptions({
      isAddItemPopupVisible: false,
      addItemPopupMode: '',
    });
  }

  const onComponentChangingHandler = (value, mode, popupId) => {
    if (mode !== null && mode !== undefined) {
      if (mode === CANCEL_ADD_GROCERY_ITEM_MODE) {
      } else if (mode === ADD_ADD_GROCERY_ITEM_MODE || mode === EDIT_ADD_GROCERY_ITEM_MODE) {
        if (value !== null || value !== undefined) {
          const { itemName, isItemAvaiable, itemQty } = value;
          const groceryItem = {
            name: itemName,
            isAvailable: isItemAvaiable,
            availableQuantity: itemQty,
          }
          dispatch(fetchUpdateAddGroceriesListItem(groceryItem));
        } //else if (mode === EDIT_ADD_GROCERY_ITEM_MODE) { } else { }
      }
    }
  }

  const onClosePopupHandler = () => {
    // setIsAddItemPopupVisible(false);
    setPopupOptions({
      isAddItemPopupVisible: false,
      addItemPopupMode: '',
    });
  }

  const onItemPressHandler = (selectedItem) => {
    // Alert.alert(`${selectedItem.name} item clicked`);
  }

  const onOptionsTogglerHandler = (selectedItem) => {
    let items_Added = itemsAdded;
    items_Added.map((item) => {
      if (item.name === selectedItem.name) {
        item.openOptions = (!(item.openOptions));
      } else {
        item.openOptions = false;
      }
    });
    dispatch(fetchGetLocalAnmieUpdatedGroceriesList(items_Added));
  };

  const onEditItemClickHanadler = (selectedItem, editTypeMode) => {
    // Alert.alert(`${selectedItem.name} item clicked`);
    if (editTypeMode === EDIT_HARD_MODE) {
      const groceryItem = {
        name: selectedItem.name,
        isAvailable: selectedItem.isAvailable,
        availableQuantity: selectedItem.availableQuantity,
      }
      dispatch(fetchUpdateAddGroceriesListItem(groceryItem));
      // setAddItemPopupMode(EDIT_ADD_GROCERY_ITEM_MODE);
      // setIsAddItemPopupVisible(true);
      setPopupOptions({
        isAddItemPopupVisible: true,
        addItemPopupMode: EDIT_ADD_GROCERY_ITEM_MODE,
      });
    }
    else if (editTypeMode === EDIT_SIMPLE_MODE) {
      if (selectedItem !== null || selectedItem !== undefined) {
        const { name, isAvailable, availableQuantity } = selectedItem;
        const groceryItem = {
          ...selectedItem,
          name: name,
          isAvailable: !(isAvailable),
          availableQuantity: availableQuantity,
        }
        // console.log('ItemsListPage >>>> onEditItemClickHandler >>>> selectedItem: ', selectedItem);
        // console.log('ItemsListPage >>>> onEditItemClickHandler >>>> groceryItem: ', groceryItem);
        dispatch(fetchGetAddGroceriesListAction(groceryItem));
      }
    } else { }
  }

  const onAddNewClickHandler = () => {
    const groceryItem = {
      name: '',
      isAvailable: false,
      availableQuantity: 0,
    }
    dispatch(fetchUpdateAddGroceriesListItem(groceryItem));
    // setAddItemPopupMode(ADD_ADD_GROCERY_ITEM_MODE);
    // setIsAddItemPopupVisible(true);
    setPopupOptions({
      isAddItemPopupVisible: true,
      addItemPopupMode: ADD_ADD_GROCERY_ITEM_MODE,
    });
  }

  const onDeleteItemClickHanadler = (selectedItem) => {
    dispatch(fetchGetDeleteGroceriesListAction(selectedItem));
  }

  // console.log('ItemsListPage >>>> newGroceryItem: ', newGroceryItem);

  const uiMainView = (
    <CustomContainerView>
      <View
        style={styles.mainViewStyle}
      >
        {
          (popupOptions.isAddItemPopupVisible === true) ?
            <AddItemsModalPopup
              formValues={(newGroceryItem !== null && newGroceryItem !== undefined) ? {
                itemName: newGroceryItem.name,
                isItemAvaiable: newGroceryItem.isAvailable,
                itemQty: newGroceryItem.availableQuantity,
              } : {
                  itemName: '',
                  isItemAvaiable: false,
                  itemQty: 0,
                }}
              mode={popupOptions.addItemPopupMode}
              onPress={onClosePopupHandler} onComponentChanged={onComponentChangedClickHandler} onComponentChanging={onComponentChangingHandler} /> : <></>
        }
        <CustomHeader
          title={'Items List Page'}
          showNavigationIcon={true}
          {...AppStyleConstants.headerStyle}
          navigation={navigation}
        // rightSideView={
        //   <Image source={MASTER_HEADER_HAM_BURGER}/>
        // }
        />
        <CustomSearch
          title={'search ... '}
          showNavigationIcon={true}
          onChangedSearchText={onChangedSearchTextHandler}
          onSearchIconsClicked={onSearchIconsClickHandler}
          {...AppStyleConstants.headerStyle}
        />
        <ScrollView
          style={styles.itemDisplayStyle}
        >
          {
            //   itemsAdded.map((item) => 
            //   {
            //     item = {...item, dispatch: dispatch};

            //     const uiItem = <AddedItemsListViewCell dataItem={item} onPress={onItemPressHandler} onOptionsToggler={onOptionsTogglerHandler} onDelete={onDeleteItemClickHanadler} onEdit={onEditItemClickHanadler}/>
            //     return uiItem;
            // })
            itemsAdded.map((item) => AddedItemsListViewCell({ dataItem: item, onPress: onItemPressHandler, onOptionsToggler: onOptionsTogglerHandler, onDelete: onDeleteItemClickHanadler, onEdit: onEditItemClickHanadler }))
            // itemsList.map((item) => AddedItemsListViewCell({ dataItem: item, onPress: onItemPressHandler, onOptionsToggler: onOptionsTogglerHandler, onDelete: onDeleteItemClickHanadler, onEdit: onEditItemClickHanadler }))
            // AvailableItems.map((item) => AddedItemsListViewCell({dataItem: item, onPress: onItemPressHandler, onOptionsToggler: onOptionsTogglerHandler, onDelete: onDeleteItemClickHanadler, onEdit: onEditItemClickHanadler}))
          }
        </ScrollView>
        <CustomFloatingButton style={AppStyleConstants.floatButtonActiveStyle.style} onPress={onAddNewClickHandler} >
          <Text style={AppStyleConstants.floatButtonActiveStyle.fontStyle}>
            {"+"}
          </Text>
        </CustomFloatingButton>
      </View>
    </CustomContainerView>
  );

  return uiMainView;
}
const mapStateToProps = (state) => {
  return {
    groceriesListData: state.ItemsListPageReducer.groceriesListData,
    newGroceryItem: state.ItemsListPageReducer.newGroceryItem,
    serviceState: state.ItemsListPageReducer.serviceState,
    loaderVisibility: state.ItemsListPageReducer.loaderVisibility,
    errorMessage: state.ItemsListPageReducer.errorMessage,
    successMessage: state.ItemsListPageReducer.successMessage,
    formErrorMessage: state.ItemsListPageReducer.formErrorMessage,
  };
};
const ItemsListPage = connect(mapStateToProps)(ItemsList_Page);

export default ItemsListPage;