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
    // Only the trial links carry attribution into signup. The Shopify link goes to the App Store as is.
    // A plan card's own CTA keeps the plan it was clicked from, so signup opens on that plan
    // rather than dropping the visitor back at the top of the list.
    document.querySelectorAll('a[data-cta="trial"]').forEach(function(a){
      var plan=a.getAttribute('data-plan');
      a.href=plan?href+'&plan='+encodeURIComponent(plan):href;
    });
  }catch(e){}
  // Two measurable paths: the primary trial CTA and the secondary Shopify install click.
  try{
    document.querySelectorAll('a[data-cta]').forEach(function(a){
      a.addEventListener('click',function(){
        if(!window.gtag)return;
        if(a.getAttribute('data-cta')==='shopify')window.gtag('event','shopify_install_click',{page:location.pathname});
        else window.gtag('event','cta_click',{page:location.pathname,cta:'trial'});
      });
    });
  }catch(e){}
})();
