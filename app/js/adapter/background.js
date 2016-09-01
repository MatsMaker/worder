export const sendMessage = (message) => {
  chrome.runtime.sendMessage(message, (response) => {
    console.log(response);
  });
}

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  console.log(msg, _);
  sendResponse("respons");
})

export default {
  sendMessage
}
