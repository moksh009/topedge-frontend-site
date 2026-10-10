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
    //
    // The billing cycle rides along too. The page opens on Yearly, and a visitor who reads a
    // yearly price, picks a plan and then lands on a signup form defaulting to monthly has been
    // quoted one number and shown another. Yearly is also the only cycle where a click from this
    // campaign pays for itself on the first payment, so losing the cycle here is not cosmetic.
    var plansEl=document.getElementById('plans');
    var setHrefs=function(){
      var c=plansEl?plansEl.getAttribute('data-cycle'):'';
      document.querySelectorAll('a[data-cta="trial"]').forEach(function(a){
        var plan=a.getAttribute('data-plan'),u=href;
        if(plan)u+='&plan='+encodeURIComponent(plan);
        if(c)u+='&cycle='+encodeURIComponent(c);
        a.href=u;
      });
    };
    setHrefs();
    // The toggle's own handler sets data-cycle on #plans; defer so this reads the new value.
    document.querySelectorAll('.cycle button[data-cycle]').forEach(function(b){
      b.addEventListener('click',function(){setTimeout(setHrefs,0)});
    });
  }catch(e){}
  // Two measurable paths: the primary trial CTA and the secondary Shopify install click.
  //
  // The trial CTA also sends a Google Ads conversion when one is configured. That send
  // is what lets Google optimise towards the people who actually reach signup — it is
  // not the reporting number. The account is created on dash.topedgeai.com, so the real
  // signup, activation and payment events arrive there and by offline import keyed on
  // the gclid stored above. Treat this one as a secondary conversion in the Ads UI.
  var SEND_TO='{{ADS_SEND_TO}}';
  try{
    document.querySelectorAll('a[data-cta]').forEach(function(a){
      a.addEventListener('click',function(){
        if(!window.gtag)return;
        if(a.getAttribute('data-cta')==='shopify'){window.gtag('event','shopify_install_click',{page:location.pathname});return}
        window.gtag('event','cta_click',{page:location.pathname,cta:'trial'});
        if(SEND_TO)window.gtag('event','conversion',{send_to:SEND_TO,page_path:location.pathname});
      });
    });
  }catch(e){}
})();
