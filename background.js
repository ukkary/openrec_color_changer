var color = '';
var uuid = '';
var token = '';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.openrec.tv', schemes: ['https'] }
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// type: 1 get security token
// type: 2 get color code
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

  if (request.type === 1) {
    uuid = request.data.uuid;
    token = request.data.token;
  }

  if (request.type === 2) {
    color = request.color;
    var charUrl = 'https://apiv5.openrec.tv/api/v5/users/me/chat-setting';
    var data = {"name_color": color}

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', charUrl, true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('access-token', token);
    xhr.setRequestHeader('uuid', uuid);
    xhr.send(JSON.stringify(data));
    xhr.onerror = function() {
      alert('失敗したようです、プレミアムアカウントでログインしていることを確認して、リロードして試してみてください');
    }
    xhr.onload = function() {
      alert('成功したようです');
    }
  }

});
