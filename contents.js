
function getCookie(n) {
  let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
  return a ? a[1] : '';
}

function postColor(color) {
  const charUrl = 'https://apiv5.openrec.tv/api/v5/users/me/chat-setting';
  const data = {
    "name_color": color
  }
  const token = getCookie('access_token');
  const uuid = getCookie('uuid');
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', charUrl, true);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.setRequestHeader('access-token', token);
  xhr.setRequestHeader('uuid', uuid);
  xhr.send(JSON.stringify(data));
  xhr.onerror = function() {
    alert('通信に失敗したようです、リロードして試してみてください');
  }
  xhr.onload = function () {
    alert('成功したようです');
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  postColor(request.message);
});