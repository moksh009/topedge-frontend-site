(function(){
  var SLUG='{{SLUG}}';
  var KEYS=['gclid','gbraid','wbraid','utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  var d={},n=0,s=null;
  try{
    var p=new URLSearchParams(location.search);
    KEYS.forEach(function(k){var v=p.get(k);if(v){d[k]=v.slice(0,200);n++;}});
    if(n){
      d.lp=SLUG;d.ts=new Date().toISOString();s=JSON.stringify(d);
      try{localStorage.setItem('te_attr',s);}catch(e){}
      document.cookie='te_attr='+encodeURIComponent(s)+'; max-age=7776000; path=/; domain=.topedgeai.com; SameSite=Lax';
    }else{
      try{s=localStorage.getItem('te_attr');}catch(e){}
    }
    var o=s?JSON.parse(s):{};
    var q=KEYS.filter(function(k){return o[k];}).map(function(k){return k+'='+encodeURIComponent(o[k]);});
    q.push('lp='+encodeURIComponent(SLUG));
    var href='/signup?'+q.join('&');
    document.querySelectorAll('a[data-cta]').forEach(function(a){
      a.href=href;
      a.addEventListener('click',function(){if(window.gtag)window.gtag('event','cta_click',{page:location.pathname});});
    });
  }catch(e){}
})();
