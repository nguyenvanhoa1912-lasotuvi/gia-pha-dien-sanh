/* Điều khiển blog họ Nguyễn Diên Sanh – nạp từ chủ đề Blogger.
   - Nút GIA PHẢ và các liên kết TNG cũ mở trang gia phả trong cửa sổ riêng.
   - Cửa sổ gia phả tự mở khóa bằng mật khẩu đã đăng nhập ở blog. */
(function(){
  var APP='https://nguyenvanhoa1912-lasotuvi.github.io/gia-pha-dien-sanh/';
  var ORIGIN='https://nguyenvanhoa1912-lasotuvi.github.io';
  var WIN='giapha-dien-sanh';
  function auth(){try{return JSON.parse(localStorage.getItem('gp-blog-auth')||sessionStorage.getItem('gp-blog-auth')||'null')}catch(e){return null}}
  function openTree(id){
    /* thêm ?v=giờ hiện tại để trình duyệt luôn lấy bản mới, tối đa trễ 1 giờ */
    var url=APP+'?v='+Math.floor(Date.now()/3600000)+(id?'#'+id:'');
    var w=null;try{w=window.open(url,WIN)}catch(e){}
    if(w){try{w.focus()}catch(e){}}else location.href=url;
  }
  function mark(a,id){
    a.setAttribute('href',APP+(id?'#'+id:''));a.setAttribute('target',WIN);a.setAttribute('data-gp-open',id||'');
  }
  function fixLinks(){
    var as=document.querySelectorAll('a[href]');
    for(var i=0;i<as.length;i++){
      var a=as[i],h=a.getAttribute('href')||'',m=h.match(/honguyendiensanh-ht\.com\/[a-z_]+\.php\?(?:[^#]*&)?personID=(I\d+)/i);
      if(m){mark(a,m[1]);continue;}
      if(a.closest&&a.closest('#navi')&&(/\/search\/label\/GIA(%20|\s)PH(Ả|%E1%BA%A2)/i.test(h)||/\/p\/gia-pha\.html/.test(h))){mark(a,'');continue;}
      if(a.closest&&a.closest('#navi')&&/\/search\/label\/NG(À|%C3%80)Y(%20|\s)GI(Ỗ|%E1%BB%96)/i.test(h)){mark(a,'ngay-gio');continue;}
      if(/^https?:\/\/(www\.)?honguyendiensanh-ht\.com\/?$/i.test(h)&&/gia\s*ph/i.test(a.textContent)){mark(a,'');}
    }
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-gp-open]');if(!a)return;
    if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey)return;
    e.preventDefault();openTree(a.getAttribute('data-gp-open'));
  });
  /* cửa sổ gia phả (hoặc khung nhúng) báo sẵn sàng -> gửi mật khẩu đã đăng nhập */
  window.addEventListener('message',function(e){
    if(e.origin!==ORIGIN)return;var d=e.data||{};
    if(d.giapha==='ready'){var a=auth();if(a&&a.pw&&e.source)try{e.source.postMessage({giapha:'auth',pw:a.pw},ORIGIN)}catch(x){}}
  });
  function frame(){
    var f=document.querySelector('iframe[data-giapha]');if(!f)return;
    var id=(location.hash||'').slice(1);
    if(/^[IN][0-9a-z]+$/i.test(id)&&f.src.indexOf('#'+id)<0)f.src=APP+'#'+id;
  }
  function run(){fixLinks();frame();}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run):run();
})();
