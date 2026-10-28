// A visible click for the video demonstration. The gift version never installs this.
export function makePresentationCue(button){
 const cursor=document.createElement('div');cursor.id='demo-cursor';cursor.hidden=true;cursor.setAttribute('aria-hidden','true');
 cursor.innerHTML='<svg viewBox="0 0 28 36" width="28" height="36"><path d="M3 2L3 26L10 20L15 32L20 30L15 18L25 18Z" fill="#fff8e8" stroke="#28372e" stroke-width="1.8" stroke-linejoin="round"/></svg>';
 const ring=document.createElement('div');ring.id='demo-click-ring';ring.hidden=true;ring.setAttribute('aria-hidden','true');
 document.body.append(cursor,ring);
 let cycle=-1,clickedAt=-1,clicks=0,x=0,y=0,stage='idle';
 const clamp=n=>Math.min(1,Math.max(0,n));
 const ease=n=>{n=clamp(n);return n*n*(3-2*n);};
 function hide(){cursor.hidden=ring.hidden=true;button.classList.remove('demo-hover','demo-pressed');stage='idle';}
 return {
  get stage(){return stage;},get clickCount(){return clicks;},
  reset(){cycle=clickedAt=-1;clicks=0;hide();},
  update(t,wishAt){
   if(wishAt>=0){
    if(cycle!==wishAt){cycle=wishAt;clickedAt=-1;hide();}
    const age=t-cycle;
    if(age<2.15){stage='waiting';return;}
    const r=button.getBoundingClientRect(),tx=r.left+r.width*.60,ty=r.top+r.height*.53;
    const fromX=Math.min(innerWidth-35,tx+110),fromY=Math.min(innerHeight-45,ty+65),k=ease((age-2.15)/.65);
    x=fromX+(tx-fromX)*k;y=fromY+(ty-fromY)*k;
    cursor.hidden=false;cursor.style.left=x+'px';cursor.style.top=y+'px';cursor.style.opacity='1';cursor.style.transform=age>=2.9?'scale(.90)':'scale(1)';
    stage=age<2.8?'moving':age<2.9?'pointing':'pressing';button.classList.toggle('demo-hover',age>=2.7);button.classList.toggle('demo-pressed',age>=2.9);
    if(age>=3&&clickedAt<0){clickedAt=t;clicks++;stage='clicked';button.click();}
   }
   if(clickedAt>=0){
    const since=t-clickedAt;stage='clicked';
    ring.hidden=false;ring.style.left=x+'px';ring.style.top=y+'px';ring.style.opacity=String(1-clamp(since/.38));ring.style.transform=`translate(-50%,-50%) scale(${.35+ease(since/.38)*1.1})`;
    cursor.style.opacity=String(1-clamp((since-.10)/.26));
    if(since>=.38){hide();clickedAt=-1;}
   }else if(wishAt<0){hide();cycle=-1;}
  }
 };
}
