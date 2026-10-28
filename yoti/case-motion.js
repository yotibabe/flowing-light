/* One quiet entrance per section; reading and scrolling remain fully native. */
(() => {
 let cleanup=()=>{};
 window.YotiCaseMotion={
  destroy(){cleanup();cleanup=()=>{};},
  mount(root,reader){
   cleanup();
   const motion=matchMedia('(prefers-reduced-motion: reduce)');
   if(motion.matches){cleanup=()=>{};return;}
   const animations=new Set();
   const observer=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
     if(!isIntersecting)return;
     observer.unobserve(target);
     if(motion.matches)return;
     const anim=target.animate([{opacity:.2,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:520,easing:'cubic-bezier(.22,1,.36,1)'});
     animations.add(anim);anim.onfinish=()=>animations.delete(anim);
    });
   },{root:reader,threshold:.12});
   root.querySelectorAll('.project-intro,.case-steps article,.case-margin-note,.birthday-small-discoveries').forEach(el=>observer.observe(el));
   const cancel=()=>{if(motion.matches)animations.forEach(a=>a.cancel());};
   motion.addEventListener('change',cancel);
   cleanup=()=>{observer.disconnect();animations.forEach(a=>a.cancel());motion.removeEventListener('change',cancel);};
  }
 };
})();
