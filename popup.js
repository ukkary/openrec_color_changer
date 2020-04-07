$('#submit-button').on('click', function(){
  var code = $('#color-code').val();
  if (code.match(/^#[A-Fa-f0-9]{6}$/) !== null) {
    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {message: code}, function(item){  });
    });
  } else {
    alert('文字入力に誤りがあります')
  }
});