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
