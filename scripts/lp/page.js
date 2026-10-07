(function(){
  var d=document,w=window,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
  var reduce=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav: transparent over the hero, solid once scrolled.
  var nav=$('#nav');
  function onScroll(){nav.classList.toggle('is-solid',(w.scrollY||0)>8)}
  onScroll();w.addEventListener('scroll',onScroll,{passive:true});

  // How it works: highlight the part of the example message that matches the step in view.
  // Under reduced motion nothing is dimmed, so every state stays visible.
  var how=$('#how-phone');
  if(how&&!reduce&&'IntersectionObserver' in w){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting)how.setAttribute('data-active',e.target.getAttribute('data-step'))});
    },{rootMargin:'-40% 0px -40% 0px'});
    $$('[data-step]').forEach(function(li){io.observe(li)});
  }

  // Hero film: choose ONE source. preload="none" keeps it at zero bytes until
  // the viewer presses play, so setting src here costs nothing. A media
  // attribute on a source element is not honoured inside a video element, and
  // two video elements would fetch both files, so one matchMedia check does it.
  var film=$('#lv');
  if(film){
    var small=w.matchMedia&&w.matchMedia('(max-width: 48rem)').matches;
    var src=(small?film.getAttribute('data-sm'):film.getAttribute('data-lg'))||film.getAttribute('data-lg');
    if(src)film.src=src;
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

  // FAQ: one open at a time (the name attribute does this natively; this covers older browsers).
  $$('details[name="faq"]').forEach(function(el){
    el.addEventListener('toggle',function(){
      if(el.open)$$('details[name="faq"]').forEach(function(o){if(o!==el)o.open=false});
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

  // Hero motion video: built with createElement and attached only after window `load`,
  // so it never competes with first paint or counts toward the page's render-blocking budget.
  // Skipped on narrow viewports (CSS hides the layer there too) and on metered connections.
  var heroVideo=$('#hero-video');
  var saveData=navigator.connection&&navigator.connection.saveData;
  if(heroVideo&&!reduce&&!saveData&&w.matchMedia('(min-width: 900px)').matches){
    w.addEventListener('load',function(){
      try{
        var v=d.createElement('video');
        v.muted=true;v.loop=true;v.playsInline=true;v.autoplay=true;v.preload='auto';
        v.setAttribute('aria-hidden','true');
        v.addEventListener('loadeddata',function(){v.classList.add('is-ready')});
        v.addEventListener('error',function(){v.remove()});
        v.src='{{HERO_VIDEO_SRC}}';
        heroVideo.appendChild(v);
        var p=v.play();if(p&&p.catch)p.catch(function(){});
      }catch(e){}
    });
  }
})();
