var _katao = _katao || [];
(function() {
  var katao = document.createElement('script'); katao.type = 'text/javascript';
  katao.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'code.jquery.com/jquery-3.5.1.slim.min.js';
  var elkatao = document.getElementsByTagName('script')[0]; elkatao.parentNode.insertBefore(katao, elkatao);
  function defer(method){if(window.jQuery){method()}else{setTimeout(function(){defer(method)},50)}};
  defer(function(){
    $(document).ready(function(){
      $("body").append("Hello World!");
    });
  });
})();

