import AsyncStorage from "@react-native-async-storage/async-storage";
import { openDatabase } from "react-native-sqlite-storage"
import { FAILURE_STATUS_CODE, NOT_FOUND_STATUS_CODE, SUCCESS_STATUS_CODE } from "../../Constants/URLConstants";
// import { ConsoleLogger, ErrorEventLogger } from "../../Helpers/EventLogger";
import { CreateReponseObject } from "../DataHelper";

export const databaseConnection = openDatabase({ name: 'UserExpensesDatabase.db' });

const title = "LocalDBMYSQL";

export const ExecuteMYSqliteDBOperations = {
    createTable: function (tableName, tableContentsObject = [], successCallBackFunction = null, failureCallBackFunction = null) {
        //'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))';
        let queryString = "CREATE TABLE if not exists " + tableName + " (";
        tableContentsObject.forEach(item => {
            var subQueryString = "";
            if (item.columnName && item.columnName !== "" && item.columnName !== undefined && item.columnName !== null) {
                subQueryString += item.columnName
            }
            if (item.columnType && item.columnType !== "" && item.columnType !== undefined && item.columnType !== null) {
                subQueryString += " " + item.columnType
                if (item.maxLength && item.maxLength !== undefined && item.maxLength !== null) {
                    subQueryString += "(" + item.maxLength.toString() + ")";
                }
            }
            if (item.isAutoIncrement && item.isAutoIncrement !== undefined && item.isAutoIncrement !== null && item.isAutoIncrement) {
                subQueryString += " AUTO INCREMENT";
            }
            if (item.isPrimary && item.isPrimary !== undefined && item.isPrimary !== null && item.isPrimary) {
                subQueryString += " PRIMARY KEY";
            }
            queryString += subQueryString + ",";
        });
        const query_String = queryString.slice(0, -1);
        queryString = query_String + ");";
        // ConsoleLogger(title, queryString);
        databaseConnection.transaction(function (txn) {
            txn.executeSql(queryString, [], (txn, results) => {
                // ConsoleLogger(title, results);
                const statusMessage = `"${tableName}" table is Created successfully`;
                var responseObj = CreateReponseObject(SUCCESS_STATUS_CODE, statusMessage, {});
                if (successCallBackFunction !== null) {
                    successCallBackFunction(responseObj);
                }
            }
            );
        }, (error) => {
            // ErrorEventLogger(title, error);
            const statusMessage = `Unable to create "${tableName}" table`;
            var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
            if (failureCallBackFunction !== null) {
                failureCallBackFunction(responseObj);
            }
        });
    },
    checkForTable: function(tableName, successCallBackFunction = null, failureCallBackFunction = null){
        //SELECT name FROM sqlite_master WHERE type='table' AND name='table_name' COLLATE NOCASE
        // let queryString = `SELECT count(*) FROM sqlite_master WHERE type='table' AND name='${tableName}';`;
        //select DISTINCT tbl_name from sqlite_master where tbl_name
        //SELECT name FROM sqlite_master WHERE type='table' AND name=
        let queryString = `select DISTINCT tbl_name from sqlite_master where tbl_name='${tableName}';`;
        // ConsoleLogger(title, queryString);
        databaseConnection.transaction(function (txn) {
            txn.executeSql(queryString, [], (txn, results) => {
                // ConsoleLogger(title, results);
                var len = results.rows.length;
                if (len > 0) {
                    const res = results.rows.item(0);
                    const statusMessage = `"${tableName}" table is exist`;
                    var responseObj = CreateReponseObject(SUCCESS_STATUS_CODE, statusMessage, {});
                    if (successCallBackFunction !== null) {
                        successCallBackFunction(responseObj);
                    }
                }
                else {
                    const statusMessage = `"${tableName}" table does not exist`;
                    var responseObj = CreateReponseObject(NOT_FOUND_STATUS_CODE, statusMessage, {});
                    if (successCallBackFunction !== null) {
                        successCallBackFunction(responseObj);
                    }
                }
            }, (error) => {
                // ErrorEventLogger(title, error);
                const statusMessage = `Unknown error found while searching for table : "${tableName}"`;
                var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                if (failureCallBackFunction !== null) {
                    failureCallBackFunction(responseObj);
                }
            });
        });
    },
    dropTable: function (tableName, successCallBackFunction = null, failureCallBackFunction = null) {
        let queryString = "DROP TABLE if exists " + tableName;
        // ConsoleLogger(title, queryString);
        databaseConnection.transaction(function (txn) {
            txn.executeSql(queryString, [], (txn, results) => {
                // ConsoleLogger(title, results);
                const statusMessage = `"${tableName}" table is deleted successfully`;
                var responseObj = CreateReponseObject(SUCCESS_STATUS_CODE, statusMessage, {});
                if (successCallBackFunction !== null) {
                    successCallBackFunction(responseObj);
                }
            }, (error) => {
                // ErrorEventLogger(title, error);
                const statusMessage = `Unable to delete "${tableName}" table`;
                var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                if (failureCallBackFunction !== null) {
                    failureCallBackFunction(responseObj);
                }
            });
        });
    },
    insertWithQuery: function (tableName, query, values = [], successCallBackFunction = null, failureCallBackFunction = null) {
        databaseConnection.transaction(function (txn) {
            let questionMarkString = "";
            values.forEach(value_item => {
                questionMarkString += "?,"
            })
            const questionMark_String = questionMarkString.slice(0, -1);
            questionMarkString = questionMark_String + ")";
            // ConsoleLogger("test", questionMarkString);

            let queryString = `INSERT INTO ${tableName} ${query} VALUES (${questionMarkString}`;
            // ConsoleLogger(title, queryString);
            txn.executeSql(queryString, values, (txn, results) => {
                // ConsoleLogger(title, results);
                if (results.rowsAffected > 0) {
                    const statusMessage = `Values are inserted in to the "${tableName}"`;
                    var responseObj = CreateReponseObject(SUCCESS_STATUS_CODE, statusMessage, {});
                    if (successCallBackFunction !== null) {
                        successCallBackFunction(responseObj);
                    }
                }
                else {
                    //alert('Registration Failed');
                    const statusMessage = `Unable to add data to "${tableName}"`;
                    var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                    if (failureCallBackFunction !== null) {
                        failureCallBackFunction(responseObj);
                    }
                }
            }, (error) => {
                // ErrorEventLogger(title, error);
                const statusMessage = `Unable to add data to "${tableName}"`;
                var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                if (failureCallBackFunction !== null) {
                    failureCallBackFunction(responseObj);
                }
            });
        });
    },
    updateWithQuery: function (tableName, columns = [], values = [], searchQuery = '', successCallBackFunction = null, failureCallBackFunction = null) {
        databaseConnection.transaction(function (txn) {
            let questionMarkString = "";
            columns.forEach(value_item => {
                questionMarkString += `${value_item}=?, `
            })
            const questionMark_String = questionMarkString.slice(0, -2);
            questionMarkString = questionMark_String + " ";
            // ConsoleLogger("test", questionMarkString);
            //UPDATE table_name SET column_name = value_1 WHERE id = id_value;
            /*
            var inputData = [req.body.GIVENNAME, req.body.SURNAME, id];
            db.run("UPDATE f11 SET GIVENNAME=?, SURNAME=? WHERE id=?",inputData,function(err,rows){})
            */
            let queryString = `UPDATE ${tableName} SET ${questionMarkString} WHERE ${searchQuery}`;
            // ConsoleLogger(title, queryString);
            txn.executeSql(queryString, values, (txn, results) => {
                // ConsoleLogger(title, results);
                if (results.rowsAffected > 0) {
                    const statusMessage = `Values are inserted in to the "${tableName}"`;
                    var responseObj = CreateReponseObject(SUCCESS_STATUS_CODE, statusMessage, {});
                    if (successCallBackFunction !== null) {
                        successCallBackFunction(responseObj);
                    }
                }
                else {
                    //alert('Registration Failed');
                    const statusMessage = `Unable to add data to "${tableName}"`;
                    var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                    if (failureCallBackFunction !== null) {
                        failureCallBackFunction(responseObj);
                    }
                }
            }, (error) => {
                // ErrorEventLogger(title, error);
                const statusMessage = `Unable to add data to "${tableName}"`;
                var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                if (failureCallBackFunction !== null) {
                    failureCallBackFunction(responseObj);
                }
            });
        });
    },
    getAvailableDataFromTable: function (tableName, query = "", values = [], successCallBackFunction = null, failureCallBackFunction = null) {
        databaseConnection.transaction(function (txn) {
            let queryString = "";
            if (query !== "") {
                queryString = `SELECT * From ${tableName} WHERE ${query}`;
            }
            else {
                queryString = `SELECT * From ${tableName}`;
            }
            // ConsoleLogger(title, queryString);
            txn.executeSql(queryString, values, (txn, results) => {
                // ConsoleLogger(title + ' >>>>', results);
                var len = results.rows.length;
                if (len > 0) {
                    // const res = results.rows.item(0);
                    const data = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        data.push(results.rows.item(i));
                    };
                    const statusMessage = `Values are obtained successfully from "${tableName}"`;
                    var responseObj = CreateReponseObject(SUCCESS_STATUS_CODE, statusMessage, data);
                    if (successCallBackFunction !== null) {
                        // ConsoleLogger(title + ' >>>>> responseObj: ', responseObj);
                        successCallBackFunction(responseObj);
                    }
                }
                else {
                    //alert('Registration Failed');
                    const statusMessage = `Data is empty "${tableName}"`;
                    var responseObj = CreateReponseObject(NOT_FOUND_STATUS_CODE, statusMessage, {});
                    if (successCallBackFunction !== null) {
                        // ConsoleLogger(title + ' >>>>> responseObj: ', responseObj);
                        successCallBackFunction(responseObj);
                    }
                }
            }, (error) => {
                // ErrorEventLogger(title, error);
                const statusMessage = `Unable to get data from "${tableName}"`;
                var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                if (failureCallBackFunction !== null) {
                    failureCallBackFunction(responseObj);
                }
            });
        });
    },
    deleteItemFromTable: function (tableName, query, values = [], successCallBackFunction = null, failureCallBackFunction = null) {
        databaseConnection.transaction(function (txn) {
            let questionMarkString = "";
            values.forEach(value_item => {
                questionMarkString += "?,"
            })
            const questionMark_String = questionMarkString.slice(0, -1);
            questionMarkString = questionMark_String + ")";
            // ConsoleLogger("test", questionMarkString);

            let queryString = `INSERT INTO ${tableName} ${query} VALUES (${questionMarkString}`;
            // ConsoleLogger(title, queryString);
            txn.executeSql(queryString, values, (txn, results) => {
                // ConsoleLogger(title, results);
                if (results.rowsAffected > 0) {
                    const statusMessage = `Values are inserted in to the "${tableName}"`;
                    var responseObj = CreateReponseObject(SUCCESS_STATUS_CODE, statusMessage, {});
                    if (successCallBackFunction !== null) {
                        successCallBackFunction(responseObj);
                    }
                }
                else {
                    //alert('Registration Failed');
                    const statusMessage = `Unable to add data to "${tableName}"`;
                    var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                    if (failureCallBackFunction !== null) {
                        failureCallBackFunction(responseObj);
                    }
                }
            }, (error) => {
                // ErrorEventLogger(title, error);
                const statusMessage = `Unable to add data to "${tableName}"`;
                var responseObj = CreateReponseObject(FAILURE_STATUS_CODE, statusMessage, {});
                if (failureCallBackFunction !== null) {
                    failureCallBackFunction(responseObj);
                }
            });
        });
    },
}

export const CustomAsyncStorage = {
    addDataToStorage: async function (
      dataKey,
      dataValue = null,
      successCallBackFunction = null,
      failureCallBackFunction = null,
    ) {
      try {
        const response = await AsyncStorage.setItem(dataKey, dataValue);
        successCallBackFunction();
        // ConsoleLogger(`${title} >>>> addDataToStorage >>>> response :`, response);
      } catch (error) {
        // Error saving data
        // ErrorEventLogger(title, error);
        const statusMessage = `${title} >>>> addDataToStorage >>>> catch >>>> error :`;
        var responseObj = CreateReponseObject(
          FAILURE_STATUS_CODE,
          statusMessage,
          {},
        );
        if (failureCallBackFunction !== null) {
          failureCallBackFunction(responseObj);
        }
      }
    },
  
    getDataFromStorage: async function (
      dataKey,
      successCallBackFunction = null,
      failureCallBackFunction = null,
    ) {
      try {
        // ConsoleLogger(`${title} >>>> getDataFromStorage >>>> dataKey :`, dataKey);
        const response = await AsyncStorage.getItem(dataKey);
        if (response !== null) {
          // ConsoleLogger(
          //   `${title} >>>> getDataFromStorage >>>> response :`,
          //   response,
          // );
          const statusMessage = '';
          var response_Obj = CreateReponseObject(
            SUCCESS_STATUS_CODE,
            statusMessage,
            response,
          );
          // ConsoleLogger(
          //   `${title} >>>> getDataFromStorage >>>> response_Obj :`,
          //   response_Obj,
          // );
          if (successCallBackFunction !== null) {
            successCallBackFunction(response_Obj);
          }
          return response_Obj;
        } else {
          // ErrorEventLogger( `Error >>>> ${title} >>>> getDataFromStorage >>>> dataKey :`, dataKey);
          // failureCallBackFunction(responseObj);
          const statusMessage = '';
          var response_Obj = CreateReponseObject(
            SUCCESS_STATUS_CODE,
            statusMessage,
            response,
          );
          if (successCallBackFunction !== null) {
            successCallBackFunction(response_Obj);
          }
          return response_Obj;
        }
      } catch (error) {
        // ErrorEventLogger(title, error);
        const statusMessage = `${title} >>>> getDataFromStorage >>>> catch >>>> error :`;
        var responseObj = CreateReponseObject(
          FAILURE_STATUS_CODE,
          statusMessage,
          {},
        );
        if (failureCallBackFunction !== null) {
          // ErrorEventLogger(title, error);
          failureCallBackFunction(responseObj);
        }
        return response_Obj;
      }
    },
  }; 

// db.transaction(function(txn) {
//     txn.executeSql(
//       query,                 //Query to execute as prepared statement
//       argsToBePassed[],      //Argument to pass for the prepared statement
//       function(tx, res) {}   //Callback function to handle the result
//     );
//   });

//Example INSERT
// db.transaction(function (tx) {
//     tx.executeSql(
//         'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
//         [userName, userContact, userAddress],
//         (tx, results) => {
//             console.log('Results', results.rowsAffected);
//             if (results.rowsAffected > 0) {
//                 Alert.alert(
//                     'Success',
//                     'You are Registered Successfully',
//                     [
//                         {
//                             text: 'Ok',
//                             onPress: () => navigation.navigate('HomeScreen'),
//                         },
//                     ],
//                     { cancelable: false }
//                 );
//             } else alert('Registration Failed');
//         }
//     );
// });

//Example SELECT
// db.transaction((tx) => {
//     tx.executeSql(
//         'SELECT * FROM table_user where user_id = ?',
//         [inputUserId],
//         (tx, results) => {
//             var len = results.rows.length;
//             if (len > 0) {
//                 let res = results.rows.item(0);
//                 updateAllStates(res.user_name, res.user_contact, res.user_address);
//             } else {
//                 alert('No user found');
//                 updateAllStates('', '', '');
//             }
//         }
//     );
// });
