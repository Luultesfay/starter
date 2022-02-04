//we put functions  here in order to  uses  them repeatedly in all our program

//this time out function uses to timeout the program if the promise took too long
import { TIME_OUT } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//refactoring the getJSON  and  sendJSON and put them in one function
//we  are using here terinary operator instead of if else statement
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST', // this line of code post the code to the server
          headers: {
            'Content-Type': 'application/json', //this the data is in json format
          },
          //Convert a JavaScript object into a string with JSON.stringify().
          body: JSON.stringify(uploadData), //When sending data to a web server, the data has to be a string.
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]); //we race the promise with timeout after certain second, the winner then displayed
    const data = await res.json();
    //console.log(res, data);
    if (!res.ok) throw new Error(`${data.message}(${res.status})`); //we throw our own error
    //lets format the property of the recipe
    return data;
  } catch (err) {
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]); //we race the promise with timeout after certain second, the winner then displayed
    const data = await res.json();
    //console.log(res, data);
    if (!res.ok) throw new Error(`${data.message}(${res.status})`); //we throw our own error
    //lets format the property of the recipe
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST', // this line of code post the code to the server
      headers: {
        'Content-Type': 'application/json', //this the data is in json format
      },
      //Convert a JavaScript object into a string with JSON.stringify().
      body: JSON.stringify(uploadData), //When sending data to a web server, the data has to be a string.
    });

    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]); //we race the promise with timeout after certain second, the winner then displayed
    const data = await res.json();
    //console.log(res, data);
    if (!res.ok) throw new Error(`${data.message}(${res.status})`); //we throw our own error
    //lets format the property of the recipe
    return data;
  } catch (err) {
    throw err;
  }
};
*/
