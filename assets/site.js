/* shared behaviour for every page except the landing, which has its own bundle */
document.querySelectorAll('.navdrop').forEach(function(dd){
  var btn = dd.querySelector('.navdrop-t');
  function set(on){ dd.classList.toggle('on',on); btn.setAttribute('aria-expanded',on); }
  dd.addEventListener('pointerenter',function(){ if(matchMedia('(hover:hover)').matches) set(true); });
  dd.addEventListener('pointerleave',function(){ if(matchMedia('(hover:hover)').matches) set(false); });
  btn.addEventListener('click',function(){ set(!dd.classList.contains('on')); });
  dd.addEventListener('focusout',function(e){ if(!dd.contains(e.relatedTarget)) set(false); });
  dd.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',function(){ set(false); }); });
  addEventListener('keydown',function(e){ if(e.key==='Escape') set(false); });
});

/* legal pages: the contents follows where you are in the document */
(function(){
  var toc = document.querySelector('.doc-split .toc');
  if(!toc) return;
  var links = [].slice.call(toc.querySelectorAll('a[href^="#"]'));
  var pairs = [];
  links.forEach(function(a){
    var el = document.getElementById(a.getAttribute('href').slice(1));
    if(el) pairs.push({a:a, el:el});
  });
  if(!pairs.length) return;
  var queued = false;
  function spy(){
    queued = false;
    var y = window.scrollY + 140, cur = pairs[0];
    pairs.forEach(function(p){
      if(p.el.getBoundingClientRect().top + window.scrollY <= y) cur = p;
    });
    pairs.forEach(function(p){ p.a.classList.toggle('on', p === cur); });
  }
  addEventListener('scroll', function(){
    if(!queued){ queued = true; requestAnimationFrame(spy); }
  }, {passive:true});
  addEventListener('resize', spy);
  spy();
})();
