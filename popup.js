$(document).ready(function(){
  $('#submit-button').on('click', function(){
    var code = $('#color-code').val();
    if (code.match(/^#[A-Fa-f0-9]{6}$/) !== null) {
      chrome.runtime.sendMessage({type: 2, color: code})
    } else {
      alert('文字入力に誤りがあります')
    }
  })
});