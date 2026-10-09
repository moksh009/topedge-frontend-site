(function(){
  var d=document,w=window,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
  var reduce=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav capsule: ghost over the hero, solid once scrolled, same 40px trip point the
  // site navbar uses. Below 1024px the capsule is always solid, handled in CSS.
  var cap=$('#nav-capsule');
  function onScroll(){cap.classList.toggle('is-solid',(w.scrollY||0)>40)}
  onScroll();w.addEventListener('scroll',onScroll,{passive:true});

  // Scroll reveal, the one piece of motion the page has. The marker class goes
  // on <html> from here rather than living in the stylesheet, so the content is
  // visible when JS is off, when this script throws, and under reduced motion:
  // nothing is hidden by CSS that is waiting on a script to un-hide it.
  if(!reduce&&'IntersectionObserver' in w){
    var rvs=$$('[data-rv]');
    if(rvs.length){
      d.documentElement.className+=' js-rv';
      var rio=new IntersectionObserver(function(es){
        es.forEach(function(e){if(e.isIntersecting){e.target.className+=' on';rio.unobserve(e.target)}});
      },{rootMargin:'0px 0px -12% 0px',threshold:.1});
      rvs.forEach(function(el){rio.observe(el)});
    }
  }

  // The launch film, same behaviour as the product demos on the homepage: muted, looping,
  // and playing by itself on phones and desktop alike. Weight is the reason this is
  // scripted rather than an autoplay attribute. The markup carries no src, so the
  // page still paints from the poster alone; ONE source is attached when the film
  // is near the viewport (a media attribute on <source> is ignored inside <video>,
  // and two <video> elements would fetch both files). A visitor who never scrolls
  // past the fold on a metered connection downloads nothing.
  var film=$('#lv');
  if(film){
    var small=w.matchMedia&&w.matchMedia('(max-width: 48rem)').matches;
    var src=(small?film.getAttribute('data-sm'):film.getAttribute('data-lg'))||film.getAttribute('data-lg');
    var saveData=navigator.connection&&navigator.connection.saveData;
    var started=false;
    var start=function(){
      if(started||!src)return;
      started=true;
      film.muted=true;film.loop=true;film.playsInline=true;film.src=src;
      if(!reduce){var p=film.play();if(p&&p.catch)p.catch(function(){})}
    };
    if(saveData){
      // Poster only. The viewer can still press play and fetch it deliberately.
      film.addEventListener('play',function(){if(!film.getAttribute('src')&&src)film.src=src},{once:true});
    }else if('IntersectionObserver' in w){
      var fio=new IntersectionObserver(function(es){
        es.forEach(function(e){
          if(e.isIntersecting){start();if(!reduce&&film.paused){var p=film.play();if(p&&p.catch)p.catch(function(){})}}
          else if(started&&!film.paused){film.pause()}
        });
      },{rootMargin:'200px 0px',threshold:.25});
      fio.observe(film);
    }else{
      start();
    }
    // A backgrounded tab should not keep decoding frames.
    d.addEventListener('visibilitychange',function(){
      if(!started)return;
      if(d.hidden)film.pause();
    });
  }

  // Pricing cycle toggle. Both prices are in the HTML, so the page reads correctly before this runs.
  var plans=$('#plans');
  $$('[data-cycle]',d).forEach(function(b){
    if(b.tagName!=='BUTTON')return;
    b.addEventListener('click',function(){
      plans.setAttribute('data-cycle',b.getAttribute('data-cycle'));
      $$('.cycle button').forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-selected',on?'true':'false')});
    });
  });

  // Sticky mobile CTA: appears once the hero buttons have scrolled out above the viewport,
  // and stays out of the way while a form field has focus.
  var bar=$('#sticky-cta'),hero=$('#hero-cta'),past=false,typing=false;
  function sync(){bar.classList.toggle('on',past&&!typing)}
  if(hero&&'IntersectionObserver' in w){
    new IntersectionObserver(function(es){
      var e=es[0];past=!e.isIntersecting&&e.boundingClientRect.top<0;sync();
    }).observe(hero);
  }
  var field=/^(INPUT|TEXTAREA|SELECT)$/;
  d.addEventListener('focusin',function(e){if(field.test(e.target.tagName)){typing=true;sync()}});
  d.addEventListener('focusout',function(e){if(field.test(e.target.tagName)){typing=false;sync()}});

  // Trustpilot's TrustBox, loaded the same way the analytics tag is: after window
  // `load`, so the page still paints with no external request on the critical path.
  // The widget is only in the markup when a business unit id is configured, and the
  // verbatim cards inside it are what shows until the script swaps them out, or for
  // good if it never arrives.
  var tp=$('.trustpilot-widget');
  if(tp){
    w.addEventListener('load',function(){
      var s=d.createElement('script');
      s.async=true;
      s.src='https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      d.head.appendChild(s);
    });
  }
})();
