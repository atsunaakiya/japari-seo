var reloadCounter = 0;
var pauseTime     = 5000;
var counterDisplay= initCounter();
var thisFrame = null;
var searchUrl = 'https://www.baidu.com/s?wd=save%20japari';
var baseUrl = 'https://www.baidu.com/link?url=G4skpGoUe7JB-IqqDQqBI4tA7wLNlqAxNAC6n7h_oE6Pj4WBST1SFs12WbpVk3Ni&wd=&eqid=';

(function(){
  nextTask();
})();

function initCounter(){
  var counterDisplay= document.createElement("h1");
  counterDisplay.style.position = 'fixed';
  counterDisplay.style.top = counterDisplay.style.left = 0;
  counterDisplay.style.color = 'red';
  counterDisplay.style.fontSize = '100px';
  counterDisplay.textContent = '尚未开始';
  $(document.body).append(counterDisplay);
  return counterDisplay;
}

function updateCounter(){
  counterDisplay.textContent = '第 '+(reloadCounter++)+ ' 次';
} 

function nextTask(){
  var frame = document.createElement('iframe');
  frame.src = searchUrl;
  $(frame).on('load', function(evt){
    var jq = evt.target.contentWindow.$;
    var doc = evt.target.contentDocument;
    jq(doc).ready(function(){
      var eqid = jq('script').map(function(i, e){
        return e.textContent.match(/bds.comm.eqid = "(\w+)"/);
      })[0];
      var finished = false;
      var nextFrame = document.createElement('iframe');
      nextFrame.src = baseUrl + eqid;
      jq(nextFrame).on('load', function(){
        if(finished) return;
        updateCounter();
        setTimeout(function(){
          console.log("已经开始: " + reloadCounter);
          $(frame).remove();
          nextTask();
        }, pauseTime);
        finished = true;
      });
      jq(doc.body).append(nextFrame);
    })
  });
  $(document.body).append(frame);
  thisFrame = frame;
}
