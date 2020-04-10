chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
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
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 1:
      if (!request.data.token || !request.data.uuid) {
        localStorage.clear();
      }
      localStorage.setItem('uuid', request.data.uuid)
      localStorage.setItem('token', request.data.token);
      break;
    case 2:
      if (!localStorage.getItem('uuid') && !localStorage.getItem('token')) {
        alert("リロードしてください")
        break;
      }
      var charUrl = 'https://apiv5.openrec.tv/api/v5/users/me/chat-setting';
      var data = { name_color: request.color }
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', charUrl, true);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('access-token', localStorage.getItem('token'));
      xhr.setRequestHeader('uuid', localStorage.getItem('uuid'));
      xhr.send(JSON.stringify(data));
      xhr.onerror = () => {
        alert('失敗したようです、プレミアムアカウントでログインしていることを確認してください');
      }
      xhr.onload = () => {
        if (xhr.status === 200) {
          alert('成功したようです');
        }
      }
      break;
    default:
      break;
  }
});

