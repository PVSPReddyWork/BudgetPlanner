import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { FILTER_ICON, SEARCH_ICON, SORT_ICON } from '../../../../Assets/ImageHelper';
import AppStyleConstants from '../../../../Constants/AppStyleConstants';
import CustomTextInputField from '../../../../CustomComponents/CustomTextInputField';
import CustomTextInputPickerField from '../../../../CustomComponents/CustomTextInputPickerField';

import { GROCERY_ITEM_SEARCH, SEARCH_BUTTON, SORT_BUTTON, FILTER_BUTTON } from './../../../../Constants/PageNameConstants';

export const OPTION_SORT_BY_SHOW_ALL_TEXT = 'Show All';
export const OPTION_SORT_BY_NAME_A_Z_TEXT = 'Sort by Name A-Z';
export const OPTION_SORT_BY_NAME_Z_A_TEXT = 'Sort by Name Z-A';
export const OPTION_SORT_BY_AVAILABILITY_TEXT = 'Show Availabile Items';
export const OPTION_SORT_BY_UNAVAILABILITY_TEXT = 'Show Unavailabile Items';
const CustomSearch = (props) => {
    const {
        headerViewStyle,
        headerTextStyle,
        headerTitleFontStyle,

        title,

        searchIconSource,

        leftSideView,
        rightSideView,

        navigation,
        onChangedSearchText,
        onSearchIconsClick,
    } = props;

    var searchButtonImageSource = searchIconSource;
    if (
        searchButtonImageSource === null ||
        searchButtonImageSource === undefined
    ) {
        searchButtonImageSource = SEARCH_ICON;
    }

    const onItemSelectedHandler = (value, inputId) => {
        onChangedSearchText(value, inputId);
    }

    const onTextChangedHandler = (value, inputId) => {
        onChangedSearchText(value, inputId);
    };

    const mainUIComponent = (
        <View style={{ ...styles.mainHeaderHolderStyle, ...headerViewStyle }}>
            <CustomTextInputField
                style={styles.searchTextViewHolder}
                fontStyle={styles.searchFontStyle}
                onChangeText={onTextChangedHandler}
                placeHolder={'Enter Item Name'}
                inputID={GROCERY_ITEM_SEARCH}
            />
            {leftSideView}
            {
                <View style={styles.iconHolderStyle}>
                    <CustomTextInputPickerField
                        pickerData={[
                            OPTION_SORT_BY_NAME_A_Z_TEXT,
                            OPTION_SORT_BY_NAME_Z_A_TEXT,
                        ]}
                        imageStyle={styles.iconImageStyle}
                        imageHolderStyle={styles.iconImageStyle}
                        cancelButtonStyle={AppStyleConstants.buttonPopupStyle.style}
                        cancelFontButtonStyle={AppStyleConstants.buttonPopupStyle.fontStyle}
                        isImage={true}
                        imageSource={SORT_ICON}
                        onItemSelected={onItemSelectedHandler}
                        inputID={SORT_BUTTON}
                    />
                    <CustomTextInputPickerField
                        pickerData={[
                            OPTION_SORT_BY_SHOW_ALL_TEXT,
                            OPTION_SORT_BY_AVAILABILITY_TEXT,
                            OPTION_SORT_BY_UNAVAILABILITY_TEXT,
                        ]}
                        imageStyle={styles.iconImageStyle}
                        imageHolderStyle={styles.iconImageStyle}
                        cancelButtonStyle={AppStyleConstants.buttonPopupStyle.style}
                        cancelFontButtonStyle={AppStyleConstants.buttonPopupStyle.fontStyle}
                        isImage={true}
                        imageSource={FILTER_ICON}
                        onItemSelected={onItemSelectedHandler}
                        inputID={FILTER_BUTTON}
                    />
                </View>
            }
            {rightSideView}
        </View>
    );
    return mainUIComponent;
};

const styles = StyleSheet.create({
    searchFontStyle:{
        // backgroundColor: 'yellow'

    },
    searchTextViewHolder: {
        flex: 1,
        alignSelf: 'center',
        // backgroundColor: 'green',
        paddingBottom: 10,
    },

    iconImageStyle: {
        // alignSelf: 'flex-start',
        alignSelf: 'center',
        height: 30,
        width: 30,
    },
    iconHolderStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainHeaderHolderStyle: {
        // height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#C2C2C2',
        paddingHorizontal: 10,
        // paddingVertical: 10,
    },
});

export default CustomSearch;
