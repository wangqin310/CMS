(function (win, options) {
  var jsUrl = undefined;
  var sdkUrl = undefined;

  sdkUrl = options.sourcePrefix + 'QiZhiSDK.js?_=' + Math.random();
  jsUrl = options.sourcePrefix + 'robot.dev.js?_=' + Math.random();

  var charset = "utf-8";

  var isload = false;
  var loadJs = function (src, success, error, charset) {
    var script = document.createElement("script"),
      body = document.getElementsByTagName("body")[0],
      isload = false;
    script.type = "text/javascript";
    script.charset = charset;

    script.src = src;
    script.onreadystatechange = function () {
      var r = script.readyState;
      if (!isload && (r === 'loaded' || r === 'complete')) {
        isload = true;
        success && success();
        script.onreadystatechange = null;
        body.removeChild(script);
      }
    }
    script.onload = function () {
      if (!isload) {
        isload = true;
        success && success();
        body.removeChild(script);
      }
    }
    if (error) {
      script.onerror = error;
    }
    body.appendChild(script);
  }

  var loadback = function () {
    loadJs(sdkUrl, function () {

    }, function () {
      console.log(sdkUrl + '加载失败');
    }, charset)
    loadJs(jsUrl, function () {
      getRobotConfigs(options);
      sdk(options);
    }, function () {
      console.log(jsUrl + '加载失败');
    }, charset);



  }
  setTimeout(function () {
    !isload && loadback();
  }, 500);
})(window, {
  "robotUrl" : "http://api.chatbot.cn/",
  "hostUrl" : "http://cloud.chatbot.cn/",
  "picUrl" : "http://cloud.chatbot.cn/robot-id/upload",
  "robotId" : "5aebd3e50e000027424ac35f",
  "userId" : "",
  "channel" : "web",
  "kefuUrl" : "//kf.chatbot.cn/",
  "robotWelcome" : "您好，您问我答，但是我智商有限不要问太难的喔",
  "kefuWelcome" : "您好，请问有什么可以帮您？",
  "quesList" : [ ],
  "writeBoxTip" : "请输入您要咨询的问题",
  "companyName" : "上海天正科技",
  "robotName" : "渠道奇智机器人",
  "isVoice" : true,
  "msgStyle" : "style01",
  "themeColor" : "#38baa6",
  "companyImg" : "http://cloud.chatbot.cn/cloud/assets/images/default.png",
  "robotHeadImg" : "https://cloud.chatbot.cn/file/5afbde9d46f6dd0c325d9d9e",
  "userHeadImg" : "https://cloud.chatbot.cn/file/5afbde9d46f6dd0c325d9d9e",
  "isExternalKeFu" : false,
  "kefuHost" : "",
  "isShowBtn" : false,
  "isFeedBtn" : false,
  "token" : "7af26ae251ec0cf9a05cf608762ca6a8",
  "appKey" : "7af26ae251ec0cf9a05cf608762ca6a8",
  "KFHeadImg" : "http://cloud.chatbot.cn/file/5b42ff0946f6dd78b390a1bd",
  "isSimilar" : false,
  "copyright" : "https://www.boccfc.cn/",
  "sourcePrefix" : "//www.chatbot.cn/robot-cloud/",
  "isShowChat" : false,
  "customerBtn" : false,
  "rightBtn" : false,
  "defaultProblem" : "",
  "model" : false,
  "urlEvent" : [ {
    "ad" : "http://localhost:8080/#",
    "problem" : "666",
    "time" : "3",
    "note" : "你好呀"
  } ],
  "member_uuid" : "",
  "member_nickname" : "",
  "member_avatar" : "https://cloud.chatbot.cn/file/5afbde9d46f6dd0c325d9d9e",
  "member_tel" : "",
  "member_email" : "",
  "uploadUrl" : "https://kf.chatbot.cn/upload/file",
  "websocket_url" : "wss://kf.chatbot.cn:9000/websocket",
  "_entrance" : "",
  "evaluateStyle" : "star",
  "third_id" : "",
  "_short_url" : "http://kefu-shortUrl-not-found",
  "notice" : "",
  "_mobileKFImg" : ""
});
