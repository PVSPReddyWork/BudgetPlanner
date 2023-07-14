import React from 'react';
import { Alert, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AppStyleConstants from '../../Constants/AppStyleConstants';
import CustomActivityIndicator from '../../CustomComponents/CustomActivityIndicator';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomHeader from '../../CustomComponents/CustomHeader';
import CustomFloatingButton from '../../CustomComponents/CustomFloatingButton';
import AddedItemsListViewCell from './WishListPageComponents/AddedItemsListViewCell';
import AddItemsModalPopup from './WishListPageComponents/AddItemsModalPopup';

import { IMAGE_BACK } from '../../Assets/ImageHelper';

import styles from './WishlistPageStyles';
import { fetchSyncAllExpense, fetchGetSyncAllExpenseReset } from './WishlistPageActions';
import { FAILURE, SUCCESS } from '../../Constants/URLConstants';
import { POPUP_HEADER_TEXT, POPUP_OKAY_BUTTON_TEXT } from '../../Constants/TextConstants';

const Wishlist_Page = (props) => {
    const {
        serviceState,
        loaderVisibility,
        message,

        dispatch,
        navigation,
    } = props;

    let itemsAdded = [];

    const moveBack = () => {
        navigation.pop();
    };

    const onSyncDataClickHandler = () => {
        dispatch(fetchSyncAllExpense());
    };

    if (serviceState === null && serviceState === undefined && serviceState === FAILURE && serviceState === SUCCESS && message !== null && message !== undefined && message !== '') {
        Alert.alert(POPUP_HEADER_TEXT, message, [{
            text: POPUP_OKAY_BUTTON_TEXT, onPress: () => {
                dispatch(fetchGetSyncAllExpenseReset());
            }
        }]);
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

    const mainUIComponent = (
        <>
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <View style={styles.mainContainerStyle}>
                    <CustomActivityIndicator visibility={loaderVisibility} />
                    <CustomHeader
                        title="Wishlist"
                        {...AppStyleConstants.headerStyle}
                        showNavigationIcon={true}
                        onNavigationButtonPress={moveBack}
                    />
                    <CustomFloatingButton style={AppStyleConstants.floatButtonActiveStyle.style} onPress={onAddNewClickHandler} >
                        <Text style={AppStyleConstants.floatButtonActiveStyle.fontStyle}>
                            {"+"}
                        </Text>
                    </CustomFloatingButton>
                    {
                        (popupOptions.isAddItemPopupVisible === true) ?
                            (<AddItemsModalPopup
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
                                onPress={onClosePopupHandler} onComponentChanged={onComponentChangedClickHandler} onComponentChanging={onComponentChangingHandler} />) : 
                                (<></>)
                    }
                    <ScrollView style={styles.itemDisplayStyle} >
                        {
                            itemsAdded.map((item) => AddedItemsListViewCell({ dataItem: item, onPress: onItemPressHandler, onOptionsToggler: onOptionsTogglerHandler, onDelete: onDeleteItemClickHanadler, onEdit: onEditItemClickHanadler }))
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
    return mainUIComponent;
}

const mapStateToProps = (state) => {
    return {
        serviceState: state.WishlistPageReducer.serviceState,
        loaderVisibility: state.WishlistPageReducer.loaderVisibility,
        message: state.WishlistPageReducer.message,
    }
};

const WishlistPage = connect(mapStateToProps)(Wishlist_Page);
export default WishlistPage;

