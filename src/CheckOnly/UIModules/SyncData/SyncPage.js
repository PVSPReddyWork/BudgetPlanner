import React from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';
import AppStyleConstants from '../../Constants/AppStyleConstants';
import CustomActivityIndicator from '../../CustomComponents/CustomActivityIndicator';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomHeader from '../../CustomComponents/CustomHeader';

import { IMAGE_BACK } from './../../Assets/ImageHelper';

import styles from './SyncPageStyles';
import { fetchSyncAllExpense, fetchGetSyncAllExpenseReset } from './SyncPageActions';
import { FAILURE, SUCCESS } from '../../Constants/URLConstants';
import { POPUP_HEADER_TEXT, POPUP_OKAY_BUTTON_TEXT } from '../../Constants/TextConstants';

const Sync_Page = (props) => {
    const {
        serviceState,
        loaderVisibility,
        message,

        dispatch,
        navigation,
    } = props;

    const moveBack = () => {
        navigation.pop();
    };
    
    const onSyncDataClickHandler = () => {
        dispatch(fetchSyncAllExpense());
    };

    if(serviceState === null && serviceState === undefined && serviceState === FAILURE && serviceState === SUCCESS && message !== null && message !== undefined && message !== ''){
        Alert.alert(POPUP_HEADER_TEXT, message, [{text: POPUP_OKAY_BUTTON_TEXT, onPress: () => {
            dispatch(fetchGetSyncAllExpenseReset());
        }}]);
    }

    const mainUIComponent = (
        <>
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <View style={styles.mainContainerStyle}>
                    <CustomActivityIndicator visibility={loaderVisibility} />
                    <CustomHeader
                        title="Sync"
                        {...AppStyleConstants.headerStyle}
                        showNavigationIcon={true}
                        onNavigationButtonPress={moveBack}
                    />
                    <View style={styles.buttonContainerStyle}>
                        <CustomButton
                            title="Sync Data Online"
                            {...AppStyleConstants.buttonActiveStyle}
                            onPress={onSyncDataClickHandler}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
    return mainUIComponent;
}

const mapStateToProps = (state) => {
    return {
        serviceState: state.SyncPage.serviceState,
        loaderVisibility: state.SyncPage.loaderVisibility,
        message: state.SyncPage.message,
    }
};

const SyncPage = connect(mapStateToProps)(Sync_Page);
export default SyncPage;

