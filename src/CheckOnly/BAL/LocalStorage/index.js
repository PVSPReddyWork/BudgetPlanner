import * as RNFS from "react-native-fs";
import { FAILURE_STATUS_CODE, NOT_FOUND_STATUS_CODE, SUCCESS_STATUS_CODE } from "../../Constants/URLConstants";
// import { ConsoleLogger, ErrorEventLogger } from "../../Helpers/EventLogger";
import { CreateReponseObject } from "../DataHelper";


const title = "LocalDBMYSQL";

export const ExecuteDeviceStorageForText = {
    createSaveTextFile: function (textData, successCallBackFunction = null, failureCallBackFunction = null) {
        var path = RNFS.DocumentDirectoryPath + '/test.txt';
        var textEncoding = 'utf8';
        // write the file
        RNFS.writeFile(path, textData, textEncoding)
            .then((success) => {
                const statusMessage = `Data saved to file successfully`;
                var responseObj = CreateReponseObject(SUCCESS_STATUS_CODE, statusMessage, {});
                if (successCallBackFunction !== null) {
                    successCallBackFunction(responseObj);
                }
            })
            .catch((err) => {
                const statusMessage = `Unable to save file to device`;
                var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                if (failureCallBackFunction !== null) {
                    failureCallBackFunction(responseObj);
                }
            });
    },
    getFileFrompath: function (textData, successCallBackFunction = null, failureCallBackFunction = null) {
        /*
        var path = RNFS.DocumentDirectoryPath + '/test.txt';
        var textEncoding = 'utf8';
        // write the file
        RNFS.writeFile(path, textData, textEncoding)
            .then((success) => {
                const statusMessage = `Data saved to file successfully`;
                var responseObj = CreateReponseObject(SUCCESS_STATUS_CODE, statusMessage, {});
                if (successCallBackFunction !== null) {
                    successCallBackFunction(responseObj);
                }
            })
            .catch((err) => {
                const statusMessage = `Unable to save file to device`;
                var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                if (failureCallBackFunction !== null) {
                    failureCallBackFunction(responseObj);
                }
            });
            */
    },
}

export const ExecuteDeviceStorageForPath = {
    getFilesAsList: function (successCallBackFunction = null, failureCallBackFunction = null) {
        var mainDirectoryPath = RNFS.DocumentDirectoryPath;
        var textEncoding = 'utf8';
        // Read data in the directory
        console.log('Started accessing device local storage');
        console.log(`Path: \t ${mainDirectoryPath}`);
        RNFS.readDir(mainDirectoryPath).then(files => {
            console.log(JSON.stringify(files));
            console.log(files);
            let directoryFiles = [];
            if (files !== null, files !== undefined && files.isArray === true) {
                files.forEach((item) => {
                    const file = {
                        fileName: item.name,
                        filePath: item.path,
                        fileSize: item.size,
                        isDirectory: item.isDirectory,
                        isFile: item.isFile,
                        createdOn: item.ctime,
                        modifiedOn: item.mtime,
                    };
                    directoryFiles.push(file);
                });
                console.log(`Directory files details: ${JSON.stringify(directoryFiles)}`);
                const statusMessage = `Data Obtained Successfully`;
                var responseObj = CreateReponseObject(SUCCESS_STATUS_CODE, statusMessage, directoryFiles);
                if (successCallBackFunction !== null) {
                    successCallBackFunction(responseObj);
                }
            }
        })
            .catch((err) => {
                const statusMessage = `No data found`;
                var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                if (failureCallBackFunction !== null) {
                    failureCallBackFunction(responseObj);
                }
            });
    },
}

/*
[{"ctime":null,"mtime":"2022-03-03T12:46:49.000Z","name":"appcenter","path":"/data/user/0/com.budgetplanner/files/appcenter","size":4096},{"ctime":null,"mtime":"2022-03-03T12:46:49.000Z","name":"error","path":"/data/user/0/com.budgetplanner/files/error","size":4096},{"ctime":null,"mtime":"2022-03-03T12:47:16.000Z","name":"ReactNativeDevBundle.js","path":"/data/user/0/com.budgetplanner/files/ReactNativeDevBundle.js","size":5049444}]
*/
