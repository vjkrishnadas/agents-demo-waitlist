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
