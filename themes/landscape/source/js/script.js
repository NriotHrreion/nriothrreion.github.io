(function($){
  // Slogan
  var $slogan = $('#slogan');
  var slogans = [
    "欢迎来到我的博客!",
    "Black Lives Matter!",
    "Hello World!",
    "标语!",
    "Slogan!",
    "!nagolS",
    "卧槽, 牛逼!",
    "PHP是世界上最好的语言!",
    "蛋糕是个谎言!",
    "WTF!",
    "OMG!",
    "Chromium!",
    "看什么, 写作业去!",
    "千万别查看这个网站的网页源代码!",
    "Windows12最新版本体验: https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "Minecraft2.0预告片: https://www.bilibili.com/video/BV1GJ411x7h7",
    "Rickroll!",
    "Yahhhooooo!",
    "头疼抹手, 手疼抹脚, 脚疼抹____!",
    "牛逼log!",
    "人生苦短, 我用Python!",
    "全世界最大的同性交友网站!",
    "只因你太美!",
    "你干嘛~哈哈~~哎哟",
    "404 Not Found!",
    "403 Forbidden!",
    "400 Bad Request!",
    "500 Server Error!",
    "200 Success!",
    "https://git.io/Jfcmp",
    "...!"
  ];
  $slogan[0].innerHTML = slogans[NUtils.getRandom(0, slogans.length - 1)];

  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      title = $this.attr('data-title'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodedUrl + '&sharesource=qzone&title=' + encodeURIComponent(title) + '" class="article-share-qq" target="_blank" title="QQ Zone"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://www.linkedin.com/shareArticle?mini=true&url=' + encodedUrl + '" class="article-share-linkedin" target="_blank" title="LinkedIn"></a>',
            '<a href="javascript:void(0);" class="article-share-copy" title="Copy Link" id="copy-link"></a>',
          '</div>',
          '<script>new ClipboardJS("#copy-link", { text: () => "'+ url +'" })</script>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" data-fancybox=\"gallery\" data-caption="' + alt + '"></a>')
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
})(jQuery);