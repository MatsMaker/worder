import {loadSettings} from './adapter/local-storage';

chrome.browserAction.setBadgeText({text: ""});
let localStoreSetting = loadSettings();

let timeout = localStoreSetting.time || 5;
let showNotification = localStoreSetting.showNotification || 0.3;
let counter = 0;

const secondTomillisecond = (number) => number * 1000;
const minutesToMillisecond = (number) => number * 60 * 1000;

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  if (msg.type == 'NOTIFY_AFTER') {
    chrome.browserAction.setBadgeText({
      text: msg.value + ''
    });
  }
  console.log(msg, _);
  sendResponse("respons");
});

chrome.runtime.sendMessage({
  type: 'test_start'
}, function(response) {
  console.log(response);
});

/* Repeater */

let listenerRepeat;

const stopRepeat = () => {
  clearInterval(listenerRepeat);
}

const startRepeat = () => setInterval(function() {
  counter++;
  chrome.browserAction.setBadgeText({
    text: counter + ''
  });
}, secondTomillisecond(timeout));

setTimeout(() => {
  listenerRepeat = startRepeat();
}, minutesToMillisecond(showNotification));
