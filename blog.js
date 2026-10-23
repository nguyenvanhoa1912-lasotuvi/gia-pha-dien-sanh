/* Điều khiển blog họ Nguyễn Diên Sanh – nạp từ chủ đề Blogger.
   Đổi liên kết TNG cũ sang trang gia phả mới, mở đúng người theo #mã. */
(function(){
  var GP='/p/gia-pha.html';
  var APP='https://nguyenvanhoa1912-lasotuvi.github.io/gia-pha-dien-sanh/';
  var ORIGIN='https://nguyenvanhoa1912-lasotuvi.github.io';
  function fixLinks(){
    var as=document.querySelectorAll('a[href]');
    for(var i=0;i<as.length;i++){
      var a=as[i],h=a.getAttribute('href')||'',m=h.match(/honguyendiensanh-ht\.com\/[a-z_]+\.php\?(?:[^#]*&)?personID=(I\d+)/i);
      if(m){a.setAttribute('href',GP+'#'+m[1]);a.removeAttribute('target');continue;}
      if(a.closest&&a.closest('#navi')&&/\/search\/label\/GIA(%20|\s)PH(Ả|%E1%BA%A2)/i.test(h)){a.setAttribute('href',GP);continue;}
      if(/^https?:\/\/(www\.)?honguyendiensanh-ht\.com\/?$/i.test(h)&&/gia\s*ph/i.test(a.textContent)){a.setAttribute('href',GP);a.removeAttribute('target');}
    }
  }
  function frame(){
    var f=document.querySelector('iframe[data-giapha]');if(!f)return;
    var id=(location.hash||'').slice(1);
    if(/^[IN][0-9a-z]+$/i.test(id)&&f.src.indexOf('#'+id)<0)f.src=APP+'#'+id;
    window.addEventListener('hashchange',function(){
      var id=(location.hash||'').slice(1);if(!id)return;
      try{f.contentWindow.postMessage({giapha:'goto',id:id},ORIGIN)}catch(e){}
      f.scrollIntoView({behavior:'smooth',block:'start'});
    });
  }
  function run(){fixLinks();frame();}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run):run();
})();
