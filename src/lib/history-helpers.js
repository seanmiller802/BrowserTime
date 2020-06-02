/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';

// gets alexa web information for the given hostname
const fetchAlexaData = (hostname) => {
  axios({
    method: 'get',
    url: 'https://awis.api.alexa.com/api',
    params: {
      Action: 'UrlInfo',
      ResponseGroup: 'Categories',
      Output: 'json',
      Url: hostname,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'x-api-key': 'BL30Bi6WLtFpKGVRFv1fwhTgxnQz582ctuQ5mj60',
    },
  })
    .then((response) => {
      console.log('FETCHALEXADATA response', response);
      if (!_.get(response.data, 'Awis.Results.Result.Alexa.Related.Categories')) {
        console.log('no categories');
        return { title: '', absolutePath: '' };
      }
      console.log('got categories', response.data.Awis.Results.Result.Alexa.Related.Categories);
      const { CategoryData } = response.data.Awis.Results.Result.Alexa.Related.Categories;
      const isArr = Array.isArray(CategoryData);
      const { title, absolutePath } = isArr ? CategoryData[0] : CategoryData;
      return { title, absolutePath };
    })
    .catch((e) => console.error('FETCHALEXADATA api error', e));
};

// takes an array of history items and adds Alex web information
export const enrichItems = (items) => new Promise((resolve) => {
  console.log('ENRICHITEMS items', items);
  const enrichedItems = items.map(async (item) => {
    const { hostname } = new URL(item.url);
    let retObj;

    chrome.storage.local.get(hostname, async (cached) => {
      if (cached[hostname]) {
        console.log('cached value', hostname, { ...cached[hostname] });
        retObj = { ...item, alexa: { ...cached[hostname] } };
        return;
      }

      console.log('no cached value');
      const alexaData = await fetchAlexaData(hostname);
      console.log('alexaData', alexaData);
      chrome.storage.local.set({ [hostname]: alexaData }, () => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        } else {
          console.log('item stored successfully', { ...alexaData });
          retObj = { ...item, alexa: { ...alexaData } };
        }
      });
    });

    console.log('ENRICHITEMS retObj', retObj);
    return retObj;
  });
  console.log('ENRICHITEMS enrichedItems', enrichedItems);
  resolve(enrichedItems);
});


// takes an array of history items and adds Alex web information
// const enrichItems = (items) => {
//   console.log('ENRICHITEMS items', items);
//   const enrichedItems = items.map((item) => new Promise((resolve, reject) => {
//     const { hostname } = new URL(item.url);
//     chrome.storage.local.get(hostname, (cached) => {
//       if (cached[hostname]) {
//         console.log('found cached value', { ...cached[hostname] });
//         resolve({ ...item, alexa: { ...cached[hostname] } });
//       } else {
//         console.log('no cached value');
//         fetchAlexaData(hostname)
//           .then((alexaData) => {
//             console.log('alexaData', alexaData);
//             chrome.storage.local.set({ [hostname]: alexaData }, () => {
//               if (chrome.runtime.lastError) {
//                 console.log(chrome.runtime.lastError);
//               } else {
//                 console.log('item stored successfully', { ...alexaData });
//                 resolve({ ...item, alexa: { ...alexaData } });
//               }
//             });
//           })
//           .catch((e) => reject(e));
//       }
//     });
//   }));
//   console.log('enrichedItems', enrichedItems);
//   return Promise.all(enrichedItems);
// };


// takes an array of history items and outputs the data grouped by date
export const groupHistoryByDate = (data) => _(data)
  .groupBy((item) => moment(item.lastVisitTime).startOf('day'))
  .map((value, key) => ({ date: key, items: value }))
  .value();


// takes grouped history data and enriches the data with Alexa api
export const categorizeHistory = (data) => Promise.all(data.map(async (day) => {
  const enrichedItems = await enrichItems(day.items);
  return {
    ...day,
    item: [...enrichedItems],
  };
}));

// takes grouped history data and enriches the data with Alexa api
// export const categorizeHistory = (data) => {
//   console.log('categorizeHistoryData', data);
//   const enrichedData = data.map((day) => new Promise((resolve, reject) => {
//     enrichItems(day.items)
//       .then((results) => {
//         console.log('results', results);
//         resolve({
//           ...day,
//           items: [...results],
//         });
//       })
//       .catch((e) => reject(e));
//   }));
//   console.log('enrichedData', enrichedData);
//   Promise.all(enrichedData)
//     .then((values) => {
//       console.log('final values', values);
//     });
// };
