$(document).ready(function(){
  $('#submit-button').on('click', function(){
    var code = $('#color-code').val();
    if (code.match(/^#[A-Fa-f0-9]{6}$/) !== null) {
      // chrome.runtime.sendMessage({message: code})
      chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {message: code});
      });
    } else {
      alert('文字入力に誤りがあります')
    }
  })
});