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
