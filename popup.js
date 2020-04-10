$(document).ready(function(){
  $('#submit-button').on('click', function(){
    var code = $('#color-code').val();
    console.log(chrome);
    if (code.match(/^#[A-Fa-f0-9]{6}$/) !== null) {
      chrome.runtime.sendMessage({type: 2, color: code})
      // chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
      //   chrome.tabs.sendMessage(tabs[0].id, {message: code});
      // });
    } else {
      alert('文字入力に誤りがあります')
    }
  })
});