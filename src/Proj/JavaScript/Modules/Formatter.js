function mySheetTestFunction() {
  //13MDkFeor11a-B5Og_sxm3t0jz2snvGJ04-DBrjPALBI
  //createSpreadsheet("TestSheet");
  //SortColumns("13MDkFeor11a-B5Og_sxm3t0jz2snvGJ04-DBrjPALBI", "Sheet1", "1");
  //GetdataFromColumns("13MDkFeor11a-B5Og_sxm3t0jz2snvGJ04-DBrjPALBI", "Sheet1", "1");
  //InsertDataToSheet("13MDkFeor11a-B5Og_sxm3t0jz2snvGJ04-DBrjPALBI", "Sheet1", "1");

  //var response = GetSheetDBData("1K7L_xU7BbWACEwh4NP8DK7Ue5MY52-p2", "September")
  //var response = GetSheetDBData("1SNPN3mWRQVbDUEyaZlNI0L4jZYjt0TAt9aHH7PKhkMY", "September")
  //var response = DeleteRow("1SNPN3mWRQVbDUEyaZlNI0L4jZYjt0TAt9aHH7PKhkMY", "Sheet2", 2)

  GetSheetDBDataJSON(groceriesSheetID, groceriesSheetName);

  // Logger.log(response);//800391
}

const GoogleSheetAccess = {
  /**
   * To create a new Google Sheet File in a Folder required Folder id and file Name
   * @param {string} folderId
   * @param {string} fileName
   * @returns {object}
   */
  CreateNewSheetFile: (folderId, fileName) => {
    var responseData = '';
    try {
      responseData = createFileInFolder(
        folderId,
        fileName,
        MimeType.GOOGLE_SHEETS
      ); // AccessGFolder
      /*
    var resource = {
      title: fileName,
      mimeType: MimeType.GOOGLE_SHEETS,
      parents: [{ id: folderId }]
    };
    var file = Drive.Files.insert(resource);
    //var fileId = fileJson.id;
    responseData = createResponseObject("1", file);
    */
    } catch (e) {
      logError('AccessGSheet >>>> createSheetFile', e);
      responseData = createResponseObject('-1', e);
    }
    return responseData;
  },

  /**
   * To Create a new sheet in existing google sheet file, required sheet file id and sheet name to be created
   * @param {string} sheetFileID
   * @param {string} inSheetName
   * @returns {object}
   */
  CreateNewSheetInFile: (sheetFileID, inSheetName) => {
    var responseData = '';
    try {
      var currentSheet = SpreadsheetApp.openById(sheetFileID);
      var yourNewSheet = currentSheet.getSheetByName(inSheetName);

      if (yourNewSheet != null) {
        //activeSpreadsheet.deleteSheet(yourNewSheet);
      } else {
        yourNewSheet = currentSheet.insertSheet();
        yourNewSheet.setName(inSheetName);
      }
      responseData = createResponseObject('1', yourNewSheet);
    } catch (e) {
      logError('AccessGSheet.gs >>>> createFileInFolder', e);
      responseData = createResponseObject('-1', e);
    }
    return responseData;
  },

  /**
   * To get all the sheet names available in a existing google sheet file, required sheet file id and sheet name to be created
   * @param {string} sheetFileID
   * @returns {object}
   */
  GetSheetsAvailableInFile: (sheetFileID) => {
    var responseData = '';
    try {
      var currentSheet = SpreadsheetApp.openById(sheetFileID);
      var sheetsList = currentSheet.getSheets();

      var sheetDataList = [];

      for (var sheet in sheetsList) {
        var sheetDataRAW = sheetsList[sheet];
        var sheetData = {
          sheetName: sheetDataRAW.getName(),
        };
        sheetDataList.push(sheetData);
      }

      let statusCode = '1';
      if (sheetDataList.length > 0) {
        statusCode = '1';
      } else {
        statusCode = '0';
      }
      responseData = createResponseObject(statusCode, sheetDataList);
    } catch (e) {
      logError('AccessGFolder >>>> GetFilesDataByFolderID', e);
      responseData = createResponseObject('-1', e);
    }
    return responseData;
  },

  /**
   * To delete a sheet in existing google sheet file, required sheet file id and sheet name( = 'Sheet1') to be created
   * @param {string} sheetFileID
   * @param {string} inSheetName
   * @returns {boolean}
   */
  DeleteSheetInFile: (sheetFileID, inSheetName) => {
    var isDeleted = false;
    try {
      var currentSheet = SpreadsheetApp.openById(sheetFileID);
      var yourGenericSheet = currentSheet.getSheetByName(inSheetName);

      if (yourGenericSheet != null) {
        currentSheet.deleteSheet(yourGenericSheet);
        isDeleted = true;
      }
    } catch (e) {
      logError('AccessGSheet.gs >>>> deleteGenericSheet', e);
    }
    return isDeleted;
  },

  /**
   * To get all the keys in a sheet in existing google sheet file, required sheet file id and sheet name( = 'Sheet1') to be created
   * @param {string} sheetFileID
   * @param {string} inSheetName
   * @returns {object}
   */
  GetKeysInASheet: (sheetFileID, inSheetName) => {
    let responseData = '';
    try {
      var sheetKeysData = '';
      var currentSheet = SpreadsheetApp.openById(sheetFileID);
      var sheet = currentSheet.getSheetByName(inSheetName);

      var _sheetKeysList = sheet.getSheetValues(1, 1, 1, sheet.getLastColumn());
      var sheetKeysList = [];
      if (_sheetKeysList.length > 0) {
        for (var keys in _sheetKeysList[0]) {
          const keyData = {
            keyIndex: keys,
            keyValue: _sheetKeysList[0][keys],
          };
          sheetKeysList.push(keyData);
        }
      }

      sheetKeysData = { SheetKeysData: sheetKeysList };
      responseData = createResponseObject('1', sheetKeysData);
    } catch (e) {
      logError('AccessGSheet.gs >>>> getKeysFromSheet', e);
      responseData = createResponseObject('-1', e);
    }
    return responseData;
  },

  DefaultSample: () => {},
};

function GetSheetDBDataJSON(
  sheetId,
  sheetName,
  availableKeyValues = initValues
) {
  var sheetData = '';
  try {
    var currentSheet = SpreadsheetApp.openById(sheetId);
    var sheet = currentSheet.getSheetByName(sheetName);

    var _sheetKeysList = sheet.getSheetValues(1, 1, 1, sheet.getLastColumn());
    var sheetKeysList = [];

    if (_sheetKeysList.length > 0) {
      for (var keys in _sheetKeysList[0]) {
        for (var _initialKey in availableKeyValues) {
          const initialKey = availableKeyValues[_initialKey];
          if (initialKey.keyValue === _sheetKeysList[0][keys]) {
            const keyData = {
              keyIndex: keys,
              keyValue: initialKey.keyName,
            };
            sheetKeysList.push(keyData);
          }
        }
      }
    }
    // console.log('AccessGSheet.gs >>>> GetSheetDBDataJSON >>>> sheetKeysList: ', sheetKeysList);

    var _sheetValuesList = sheet.getSheetValues(
      2,
      1,
      sheet.getLastRow() - 1,
      sheet.getLastColumn() - 1
    );
    if (_sheetValuesList.length > 0) {
      var eachItemArray = [];
      for (var _sheetValuesListEachRow in _sheetValuesList) {
        let _eachItem = '{';
        const sheetValuesListEachRow =
          _sheetValuesList[_sheetValuesListEachRow];
        for (var _sheetValuesListEachRowItem in sheetValuesListEachRow) {
          var sheetValuesListEachRowItem =
            sheetValuesListEachRow[_sheetValuesListEachRowItem];
          for (var _keyItem in sheetKeysList) {
            const keyItem = sheetKeysList[_keyItem];
            const currentIndex = keyItem.keyIndex;
            if (currentIndex === _sheetValuesListEachRowItem) {
              _eachItem +=
                '"' +
                keyItem.keyValue +
                '"' +
                ':' +
                '"' +
                sheetValuesListEachRowItem +
                '"' +
                ',';
            }
          }
        }
        if (_eachItem !== '{') {
          let eachItem = _eachItem.slice(0, -1);
          eachItem += '}';
          //eachItemArray.push(JSON.parse(eachItem));
          eachItemArray.push(JSON.parse(eachItem));
          sheetData = eachItemArray;
        }
      }
      // console.log('AccessGSheet.gs >>>> GetSheetDBDataJSON >>>> ', sheetData);
    }
  } catch (e) {
    logError('AccessGSheet.gs >>>> GetSheetDBDataJSON', e);
  }
  return sheetData;
}

function PutItemInSheetWithPosition(sheetId, sheetName, row, column, value) {
  try {
    var currentSheet = SpreadsheetApp.openById(sheetId);
    var sheet = currentSheet.getSheetByName(sheetName);
    //sheet.getRange(row, column, row + 1, column + 1).setValue(value);
    sheet.getRange(row + 1, column + 1).setValue(value);
  } catch (e) {
    Logger.log(e);
  }
}

function DeleteRow(sheetId, sheetName, row) {
  var responseObject = {
    status: 000,
    data: {},
  };
  try {
    var currentSheet = SpreadsheetApp.openById(sheetId);
    var sheet = currentSheet.getSheetByName(sheetName);
    var valueToDelete = sheet.getSheetValues(
      row + 1,
      1,
      1,
      sheet.getLastColumn()
    );
    var _sheetValuesList = sheet.deleteRow(row + 1);
    responseObject.status = 200;
    responseObject.data = valueToDelete;
  } catch (e) {
    responseObject.status = 400;
    responseObject.data = e;
    Logger.log(e);
  }
  response = JSON.stringify(responseObject);
  return response;
}

function DeleteColumn(sheetId, sheetName, column) {
  var responseObject = {
    status: 000,
    data: {},
  };
  try {
    var currentSheet = SpreadsheetApp.openById(sheetId);
    var sheet = currentSheet.getSheetByName(sheetName);
    var _sheetValuesList = sheet.deleteColumn(column + 1);
    var valueToDelete = sheet.getSheetValues(
      1,
      column + 1,
      sheet.getLastRow(),
      1
    );
    responseObject.status = 200;
    responseObject.data = valueToDelete;
  } catch (e) {
    responseObject.status = 400;
    responseObject.data = e;
    Logger.log(e);
  }
  response = JSON.stringify(responseObject);
  return response;
}

function GetSheetData(sheetId, sheetName) {
  var sheetData = '';
  try {
    var currentSheet = SpreadsheetApp.openById(sheetId);
    var sheet = currentSheet.getSheetByName(sheetName);

    var _sheetValuesList = sheet.getSheetValues(
      1,
      1,
      sheet.getLastRow(),
      sheet.getLastColumn()
    );
    Logger.log(_sheetValuesList);
    var sheetValuesList = [];
    if (_sheetValuesList.length > 0) {
      for (var valuesList in _sheetValuesList) {
        if (_sheetValuesList[valuesList].length > 0) {
          var newValues = [];
          for (var value in _sheetValuesList[valuesList]) {
            if (_sheetValuesList[valuesList][value] !== '') {
              newValues.push('"' + _sheetValuesList[valuesList][value] + '"');
            }
          }
          if (newValues.length > 0) {
            sheetValuesList.push('[ ' + newValues + ' ]');
          }
        }
      }
    }
    //Logger.log(sheetValuesList);

    sheetData = '{ "SheetValuesData" : [ ' + sheetValuesList + ' ]}';
    //Logger.log(sheetData);
  } catch (e) {
    Logger.log(e);
  }
  return sheetData;
}

function GetSheetDBData(sheetId, sheetName) {
  var sheetData = '';
  try {
    var currentSheet = SpreadsheetApp.openById(sheetId);
    var sheet = currentSheet.getSheetByName(sheetName);

    var _sheetKeysList = sheet.getSheetValues(1, 1, 1, sheet.getLastColumn());
    var sheetKeysList = [];
    if (_sheetKeysList[0].length > 0) {
      for (var keys in _sheetKeysList[0]) {
        sheetKeysList.push('"' + keys + '"');
      }
    }
    //Logger.log(sheetKeysList);

    var _sheetValuesList = sheet.getSheetValues(
      2,
      1,
      sheet.getLastRow(),
      sheet.getLastColumn()
    );
    var sheetValuesList = [];
    if (_sheetValuesList.length > 0) {
      for (var valuesList in _sheetValuesList) {
        if (valuesList.length > 0) {
          var newValues = [];
          for (var valuesList in valuesList) {
            if (valuesList !== '') {
              newValues.push('"' + valuesList + '"');
            }
          }
          if (newValues.length > 0) {
            sheetValuesList.push('[ ' + newValues + ' ]');
          }
        }
      }
    }
    //Logger.log(sheetValuesList);

    sheetData =
      '{ "SheetKeysData": [ ' +
      sheetKeysList +
      ' ] , "SheetValuesData" : [ ' +
      sheetValuesList +
      ' ]}';
    Logger.log(sheetData);
  } catch (e) {
    Logger.log(e);
  }
  return sheetData;
}

/*

function insertDataToSheet(sheetId, sheetName, column, value)
{//getLastRow
  try
  { 
    var currentSheet = SpreadsheetApp.openById(sheetId);
    var sheet = currentSheet.getSheetByName(sheetName);
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, column + 1).setValue(value);
  }
  catch(e)
  {
    Logger.log(e);
  }
}

function getData()
{
  var spreadSheetID = "14WXUZDxmO_YDz93baBm51h-sigl3sq4VIfcp7O6IAzM";
  var sheetName = "September";//"Sheet2";//"September";
  var sheetDataResponse = GetBeautifiedJSONSheetDBData(spreadSheetID, sheetName);
}

function GetBeautifiedJSONSheetDBData(sheetId, sheetName) 
{
  var sheetData = "";
  try
  { 
    var currentSheet = SpreadsheetApp.openById(sheetId);
    var sheet = currentSheet.getSheetByName(sheetName);
    
    var _sheetKeysList = sheet.getSheetValues(1, 1, 1, sheet.getLastColumn());
    var sheetKeysList = _sheetKeysList[0];
    Logger.log(sheetKeysList);
    var userPolicyNumberIndex = -1;
  var userNameIndex = -1;
  var userCityIndex = -1;
  var userMobileIndex = -1;
  var userAgeIndex = -1;
  var userTermIndex = -1;
  var userAmountIndex = -1;
  var userMonthIndex = -1;
  var userStartedOnIndex = -1;
  var userEndsOnIndex = -1;
  var userNotesIndex = -1;
  
  if(sheetKeysList.length > 0)
  {
    userPolicyNumberIndex = sheetKeysList.indexOf("Policy Number");
    userNameIndex = sheetKeysList.indexOf("Name");
    userCityIndex = sheetKeysList.indexOf("City");
    userMobileIndex = sheetKeysList.indexOf("Mobile");
    userAgeIndex = sheetKeysList.indexOf("Age");
    userTermIndex = sheetKeysList.indexOf("Term");
    userAmountIndex = sheetKeysList.indexOf("Amount");
    userMonthIndex = sheetKeysList.indexOf("Month");
    userStartedOnIndex = sheetKeysList.indexOf("Started on");
    userEndsOnIndex = sheetKeysList.indexOf("Ends On");
    userNotesIndex = sheetKeysList.indexOf("Notes");
  }
  
//  Logger.log(userNotesIndex);
  
    //Logger.log(sheetKeysList);
    
    var _sheetValuesList = sheet.getSheetValues(2, 1, sheet.getLastRow(), sheet.getLastColumn());
    var sheetValuesList = [];
    //Logger.log(_sheetValuesList);
    if(_sheetValuesList.length > 0)
    {
      for (var valuesList in _sheetValuesList)
      {
        if(valuesList.length > 0)
        {
        //Logger.log(valuesList);
          var obj = {
            policyNumber : (userPolicyNumberIndex !== -1) ? valuesList[userPolicyNumberIndex].toString() : "",
            name : (userNameIndex !== -1) ? valuesList[userNameIndex].toString() : "",
            city : (userCityIndex !== -1) ? valuesList[userCityIndex].toString() : "",
            mobileNumber : (userMobileIndex !== -1) ? valuesList[userMobileIndex].toString() : "",
            polAge : (userAgeIndex !== -1) ? valuesList[userAgeIndex].toString() : "",
            term : (userTermIndex !== -1) ? valuesList[userTermIndex].toString() : "",
            amount : (userAmountIndex !== -1) ? valuesList[userAmountIndex].toString() : "",
            payableMonth : (userMonthIndex !== -1) ? valuesList[userMonthIndex].toString() : "",
            startedOn : (userStartedOnIndex !== -1) ? valuesList[userStartedOnIndex].toString() : "",
            endsOn : (userEndsOnIndex !== -1) ? valuesList[userEndsOnIndex].toString() : "",
            notes : (userNotesIndex !== -1) ? valuesList[userNotesIndex].toString() : "",
            }
//Logger.log(obj);
sheetValuesList.push(obj);
//          if(newValues.length > 0)
//          {
//            sheetValuesList.push("[ " + newValues + " ]");
//          }
        }
      }
    }
    //Logger.log(sheetValuesList);
    
    sheetData = { data : sheetValuesList};
Logger.log(JSON.stringify(sheetData));
  }
  catch(e)
  {
    Logger.log(e);
  }
  //return sheetData;
}

function PolicyNumberCorrectionAlogorithm()
{
try
{
  var info = "";//https://docs.google.com/spreadsheets/d/14WXUZDxmO_YDz93baBm51h-sigl3sq4VIfcp7O6IAzM/edit?usp=sharing
  var spreadSheetID = "14WXUZDxmO_YDz93baBm51h-sigl3sq4VIfcp7O6IAzM";
  var sheetName = "September"
  var sheetDataResponse = GetSheetData(spreadSheetID, sheetName);
  
  
  //createGoogleDriveTextFile(sheetDataResponse);
  //console.log(sheetDataResponse);
  
  
  var sheetDataResponseJSON = JSON.parse(sheetDataResponse);
  
  console.log("done testing");
  
  var keys = sheetDataResponseJSON.SheetValuesData[0];
  
  var userPolicyNumberIndex = -1;
  var userNameIndex = -1;
  var userCityIndex = -1;
  var userMobileIndex = -1;
  var userAgeIndex = -1;
  var userTermIndex = -1;
  var userAmountIndex = -1;
  var userMonthIndex = -1;
  var userStartedOnIndex = -1;
  var userEndsOnIndex = -1;
  var userNotesIndex = -1;
  
  if(keys.length > 0)
  {
    userPolicyNumberIndex = keys.indexOf("Policy Number");
    userNameIndex = keys.indexOf("Name");
    userCityIndex = keys.indexOf("City");
    userMobileIndex = keys.indexOf("Mobile");
    userAgeIndex = keys.indexOf("Age");
    userTermIndex = keys.indexOf("Term");
    userAmountIndex = keys.indexOf("Amount");
    userMonthIndex = keys.indexOf("Month");
    userStartedOnIndex = keys.indexOf("Started on");
    userEndsOnIndex = keys.indexOf("Ends On");
    userNotesIndex = keys.indexOf("Notes");
  }
  
  var values = [];
  if(sheetDataResponseJSON.SheetValuesData.length > 1)
  {
    var i = 1;
    for( ; i < sheetDataResponseJSON.SheetValuesData.length; i++ )
    {
      if(sheetDataResponseJSON.SheetValuesData[i][userPolicyNumberIndex].length < 4)
      {
      var currentValue = sheetDataResponseJSON.SheetValuesData[i][userPolicyNumberIndex]
      var j = 1
      while(sheetDataResponseJSON.SheetValuesData[i-j][userPolicyNumberIndex].length < 4)
      {
      j++
      Logger.log(j);
      }
      var previousValue = sheetDataResponseJSON.SheetValuesData[i-j][userPolicyNumberIndex];
      previousValue = previousValue.substring(0, previousValue.length-3);
      if(sheetDataResponseJSON.SheetValuesData[i][userPolicyNumberIndex].length < 3)
      {
      currentValue = previousValue + "0" + currentValue;
      }
      else if(sheetDataResponseJSON.SheetValuesData[i][userPolicyNumberIndex].length === 3)
      {
      currentValue = previousValue + "" + currentValue;
      }
      var row = i;
      var column = userPolicyNumberIndex;
      PutItemInSheet(spreadSheetID, sheetName, row, column, currentValue);
      }
    }
  return info;
  }
  //Logger.log(info);
  }
  catch(e)
  {
  return e;
  }
}

*/
