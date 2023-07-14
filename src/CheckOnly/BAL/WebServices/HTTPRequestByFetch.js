// let promise = new Promise(function(resolve, reject) {
//     // the function is executed automatically when the promise is constructed

//     // after 1 second signal that the job is done with the result "done"
//     setTimeout(() => resolve("done"), 1000);
//   });

//   let promise = new Promise(function(resolve, reject) {
//     setTimeout(() => resolve("done!"), 1000);
//   });

//   // resolve runs the first function in .then
//   promise.then(
//     result => alert(result), // shows "done!" after 1 second
//     error => alert(error) // doesn't run
//   );

//   new Promise((resolve, reject) => {
//     /* do something that takes time, and then call resolve/reject */
//   })
//     // runs when the promise is settled, doesn't matter successfully or not
//     .finally(() => stop loading indicator)
//     // so the loading indicator is always stopped before we process the result/error
//     .then(result => show result, err => show error)

export const getAPIData = function (url, headers) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject('time out error'), 2500);
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJSON) => {
          console.log(responseJSON);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {}
  });
};

export const postAPIData = function (url, headers, postData) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject('time out error'), 2500);
    try {
      /*
            fetch('https://jsonplaceholder.typicode.com/posts/1', {
                method: 'GET'
            }).then((response) => {
                response.json();

            }).then((responseJson) => {
                console.log(responseJson);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
            */
      /*
             let response = await fetch(
                 'https://reactnative.dev/movies.json'
             );
             */
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJSON) => {
          console.log(responseJSON);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {}
  });
};
