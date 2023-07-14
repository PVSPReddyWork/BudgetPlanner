import React from 'react';
import { Alert, Platform } from 'react-native';
import Analytics from 'appcenter-analytics';

const ConsoleLogger = (title, obj = {}) => {
    // if (Platform.OS === "android") {
    //     try {
    //         Analytics.trackEvent(title, obj);
    //     }
    //     catch (error) {
    //         ErrorEventLogger("EventLogger.js > ErrorEventLogger", error);
    //     }
    // }
    try {
        console.log("Logged Data >>> " + title, obj);
        //Alert.alert('Alert', `Logged Data >>> ${title}`);
    }
    catch (error) {
        ErrorEventLogger("EventLogger.js > ErrorEventLogger", error);
    }
}

const GeneralEventLogger = (title, obj = {}) => {
    // if (Platform.OS === "android") {
    //     try {
    //         Analytics.trackEvent(title, obj);
    //     }
    //     catch (error) {
    //         ErrorEventLogger("EventLogger.js > ErrorEventLogger", error);
    //     }
    // }


    try {
        console.log("Event Logger Data >>> " + title, obj);
    }
    catch (error) {
        ErrorEventLogger("EventLogger.js > ErrorEventLogger", error);
    }
}

const ErrorEventLogger = (title, obj) => {
    // if (Platform.OS === "android") {
    //     try {
    //         Analytics.trackEvent(title, obj);
    //     }
    //     catch (error) {
    //         Analytics.trackEvent("EventLogger.js > ErrorEventLogger", error);
    //     }
    // }

    try {
        console.log("Error Logger Data >>> " + title, obj);
    }
    catch (error) {
        ErrorEventLogger("EventLogger.js > ErrorEventLogger", error);
    }
}

export { ConsoleLogger, GeneralEventLogger, ErrorEventLogger };