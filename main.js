var targetUrl = 'target';
$(document).ready(function(){
  $.get(targetUrl, function(code){
    console.log(code);
    $('#code_display').val(code);
  })
});