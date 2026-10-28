const $ = s => document.querySelector(s);
const reader = $('#reader');
const content = $('#reader-content');
let origin = null;
let photo = 0;
let activePage = '';
let momentIndex=0;
const titles={work:'作品',light:'LIGHT',workbench:'交易工作台',explore:'其他探索',hello:'打个招呼',birthday:'生日小屋'};
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const head = (label,title,text='') => `<div class="reader-inner"><div class="reader-heading"><div><span class="eyebrow">${label}</span><h2 id="reader-title">${title}</h2></div>${text?`<p>${text}</p>`:''}</div>`;
const galleries={
 light:[['yoti-making-original.jpg','Yoti · 活动现场'],['light-gathering-new.jpg','LIGHT · 活动合影'],['light-room-new.jpg','Flowing Light · 分享现场'],['light-people-clear.jpg','第三期 · 与嘉宾留下合影'],['light-vol3-group.jpg','第三期 · 活动合影'],['light-vol2-group.jpg','第二期 · 活动合影'],['light-group-clear.jpg','第四期 · 活动合影']],
 workbench:[['workbench-market.png','市场总览 · 把判断与依据放在一起'],['workbench-stock.png','个股研究 · 分钟走势与成交量'],['workbench-sector.png','板块详情 · 从整体走向具体成员']]
};
const gallery=page=>{
 const first=`<img class="project-hero" id="gallery-image" src="assets/${galleries[page][0][0]}" alt="${galleries[page][0][1]}">`;
 if(page==='workbench')return `<div class="case-gallery"><button class="refined-screen" data-wb-zoom="assets/${galleries[page][0][0]}" data-wb-title="${galleries[page][0][1]}" aria-label="放大当前工作台截图">${first}<span class="refined-zoom-hint">点击放大 ↗</span></button><div class="photo-caption"><span id="gallery-caption" aria-live="polite">${galleries[page][0][1]}</span><div class="photo-nav"><button data-photo="-1" aria-label="上一张截图">←</button><span class="gallery-count" id="gallery-count" aria-label="第 1 张，共 3 张">1 / 3</span><button data-photo="1" aria-label="下一张截图">→</button></div></div></div>`;
 return `<div class="case-gallery${page==='light'?' light-motion-gallery':''}"${page==='light'?' data-photo-index="0" data-autoplay="offscreen"':''}>${page==='light'?`<div class="light-photo-stage">${first}<span class="light-photo-progress" aria-hidden="true"></span></div>`:page==='workbench'?`<button class="refined-screen" data-wb-zoom="assets/${galleries[page][0][0]}" data-wb-title="${galleries[page][0][1]}" aria-label="放大当前工作台截图">${first}<span class="refined-zoom-hint">点击放大 ↗</span></button>`:first}<div class="photo-caption"><span id="gallery-caption" aria-live="polite">01 / ${String(galleries[page].length).padStart(2,'0')} · ${galleries[page][0][1]}</span><div class="photo-nav">${page==='light'?'<button class="light-play-toggle" data-light-play aria-label="暂停照片自动播放" aria-pressed="false">Ⅱ</button>':''}<button data-photo="-1" aria-label="上一张照片">←</button><button data-photo="1" aria-label="下一张照片">→</button></div></div><div class="gallery-thumbs">${galleries[page].map((v,i)=>`<button data-gallery-index="${i}" aria-label="查看：${v[1]}" aria-pressed="${i===0}"><img src="assets/${v[0]}" alt="" loading="lazy"><span>${String(i+1).padStart(2,'0')}${page==='workbench'?` / ${v[1].split(' · ')[0]}`:''}</span></button>`).join('')}</div></div>`;
};
const steps=items=>`<div class="case-steps">${items.map((s,i)=>`<article><span class="eyebrow">0${i+1}</span><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join('')}</div>`;
const endNav=(page,other,label)=>`<nav class="project-end" aria-label="本页与相关作品"><button data-reader-top>回到本页顶部 ↑</button><button data-open="${other}">${label} →</button></nav>`;
const templates = {
work:()=>head('01 / SELECTED THINGS','Made with<br><em>curiosity.</em>','一些想法，<br>后来有了自己的样子。')+`<div class="work-edition"><button class="work-feature" data-open="light"><span class="feature-photo"><img src="assets/light-host-clear.jpg" alt="Yoti 在 LIGHT 的主持现场"><span class="feature-caption">ON STAGE / A MOMENT FROM LIGHT</span></span><span class="feature-copy"><span class="eyebrow">01 / PEOPLE & CONVERSATIONS</span><span class="feature-word">Light<span class="hand">up a conversation.</span></span><span class="feature-description">把人聚在一起，<br>让故事被听见。</span><span class="feature-bottom">策划 · 主持 · 网站 <b>↗</b></span></span></button><button class="work-secondary" data-open="workbench"><span class="secondary-copy"><span class="eyebrow">02 / RESEARCH INTO PRACTICE</span><h3>交易工作台</h3><p>从研究中的问题，<br>到自己用得上的工具。</p><span class="hand">built from a real need.</span><span class="secondary-link">打开这份实践 ↗</span></span><span class="secondary-screen"><img src="assets/workbench-market.png" alt="交易工作台市场总览"></span></button></div><div class="collection-bottom">Always a work in progress. <button data-open="explore">还有一些小探索 ↗</button></div></div>`,
light:()=>`<div class="reader-inner light-editorial"><header class="light-masthead"><div><span class="eyebrow">01 / PEOPLE & CONVERSATIONS</span><h2 id="reader-title">LIGHT<span class="hand">light, in every sense.</span></h2></div><p>轻盈地相聚，<br>也让彼此被照见。</p></header><div class="light-opening"><figure class="light-leading"><img src="assets/light-host-clear.jpg" alt="Yoti 在 LIGHT 第二期主持现场"><figcaption><span>YOTI / ON STAGE</span><span>LIGHT · 第二期</span></figcaption></figure><aside class="light-side-note"><span class="issue-number">01—05</span><span class="eyebrow">A GROWING COLLECTION</span><h3>一次相遇，<br>一个新视角。</h3><p>LIGHT 是中大深圳校友会读书会的分享栏目，始于 2025 年 7 月。邀请不同职业背景的校友，聊聊经历中的转折、选择与发现。</p><span class="hand">a little light,<br>a little closer.</span></aside></div><section class="light-statement"><span class="eyebrow">WHY LIGHT</span><p>“Light” 有轻，也有光。<br>让人愿意开口，<em>也让经验被听见。</em></p><span>从策划、现场主持，到把活动整理成可以回看的网站。<br>这是我把表达与组织，放进真实场景的一次实践。</span></section><div class="light-spread"><figure><img class="light-group-scene" src="assets/light-gathering-new.jpg" alt="LIGHT 活动参与者合影" loading="lazy"><figcaption>把这次相遇留下来 / LIGHT 活动合影</figcaption></figure><div class="light-process"><span class="eyebrow">MY PART IN IT</span><h3>把想法，<br>变成可以相聚的现场。</h3><dl><div><dt><span>01</span> 策划</dt><dd>把想讨论的话题，组织成一次分享和交流。</dd></div><div><dt><span>02</span> 主持</dt><dd>倾听表达，接住话题，也把在场的人连接起来。</dd></div><div><dt><span>03</span> 留下内容</dt><dd>将活动介绍、嘉宾分享和照片整理进 LIGHT 网站。</dd></div></dl></div></div><div class="light-album-heading"><span class="eyebrow">FROM THE ROOM</span><h3>一些现场，一些相遇。</h3><span class="hand">people make it happen.</span></div>${gallery('light')}<section class="light-issue"><div><span class="eyebrow">A CLOSER LOOK / VOL. 05</span><h3>AI 时代浪潮来袭：<br>个体该如何进化？</h3><p>第五期从三种不同的实践出发，讨论工具变化之后，每个人怎样行动、怎样判断。</p></div><ol><li><span>01</span><div><h4>王崇生</h4><p>产品与 AI 应用：从真实需求出发。</p></div></li><li><span>02</span><div><h4>柒柒</h4><p>出海与 AI 实践：在工作流里反复尝试。</p></div></li><li><span>03</span><div><h4>衣正元</h4><p>人与 AI 的协作：保留人的判断与价值。</p></div></li></ol></section><a class="light-outro" href="https://www.sysulight.com/" target="_blank" rel="noopener"><span class="hand">There's more to the story.</span><strong>去 LIGHT 网站，继续看看 <span>↗</span></strong></a>${endNav('light','workbench','看看交易工作台')}</div>`,
workbench:()=>window.YotiCaseContent.workbench({head,endNav}),
explore:()=>window.YotiCaseContent.explore({head,steps,endNav}),
birthday:()=>window.YotiCaseContent.birthday({head,endNav}),

hello:()=>`<div class="reader-inner"><div class="hello-sheet"><div class="welcome-copy"><span class="eyebrow">A LITTLE HELLO</span><h2 id="reader-title">Oh, hello!</h2><p>嗨，欢迎来到我的小世界。<br>随意逛逛，认识一下我。</p><span class="signature">Yoti</span><span class="hello-countdown" aria-hidden="true"><i></i></span></div></div></div>`
};

let helloTimer = 0;
let pageTransition = 0;
let closeAnimation = null;
let lightMotion = null;
let stopMedia = () => {};
const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
const objectSlots=[...document.querySelectorAll('.object-slot')];
const objectResets=[];
function refreshObjectSpacing(){
 const active=reader.open?null:objectSlots.find(slot=>slot.classList.contains('is-hovered'))||objectSlots.find(slot=>slot.classList.contains('is-focused'));
 const selected=objectSlots.indexOf(active);
 objectSlots.forEach((slot,index)=>slot.style.setProperty('--neighbor-x',selected<0||index===selected?'0px':index<selected?'-18px':'18px'));
}
function resetObjectInteractions(){
 document.dispatchEvent(new Event('yoti:reset-objects'));
 objectResets.forEach(reset=>reset());
 objectSlots.forEach(slot=>slot.style.setProperty('--neighbor-x','0px'));
}

function render(page){
 window.YotiCaseMotion?.destroy();
 window.YotiCaseExperience?.destroy();
 window.YotiWorkbench?.destroy();
 window.YotiWelcomeLetter?.stop();
 stopMedia();
 stopLightMotion();
 content.querySelectorAll('video').forEach(v=>v.pause());
 content.querySelectorAll('iframe').forEach(f=>f.remove());
 reader.classList.toggle('hello-popover',page==='hello');
 reader.classList.toggle('workbench-refined-reader',page==='workbench');
 content.innerHTML=templates[page]();
 $('#reader-index').textContent=page==='light'||page==='workbench'?'YOTI / SELECTED WORK':'YOTI / '+page.toUpperCase();
 reader.scrollTop=0;photo=0;momentIndex=0;activePage=page;
 if(page==='light')startLightMotion();
 startMediaPreview();
 if(page==='birthday'||page==='explore')window.YotiCaseExperience?.mount(content,reader,page);
 if(page==='workbench')window.YotiWorkbench?.mount(content);
 if(page==='workbench'||page==='birthday')window.YotiCaseMotion?.mount(content,reader);
 document.title='Yoti — '+titles[page];
}
function loadBirthdayPreview(){
 const slot=content.querySelector('#birthday-stage');if(!slot||slot.querySelector('iframe'))return;
 const frame=document.createElement('iframe');frame.src='birthday/index.html?video&autoplay&embed';frame.title='生日小屋完整交互演示';frame.allow='autoplay; fullscreen';frame.allowFullscreen=true;
 slot.replaceChildren(frame);
 frame.addEventListener('load',()=>frame.contentWindow?.postMessage({type:'portfolio-visibility',visible:slot.dataset.visible==='true'},location.origin),{once:true});
}
function startMediaPreview(){
 const abort=new AbortController(),videos=[...content.querySelectorAll('video[data-auto-preview]')],stage=content.querySelector('#birthday-stage:not([data-birthday-experience])');
 const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting,intersectionRatio})=>{
  const visible=isIntersecting&&intersectionRatio>.2;target.dataset.visible=String(visible);
  if(target.tagName==='VIDEO'){
   if(visible&&!document.hidden&&!target.dataset.userPaused)target.play().catch(()=>{});else if(!visible)target.pause();
  }else{
   if(visible)loadBirthdayPreview();
   target.querySelector('iframe')?.contentWindow?.postMessage({type:'portfolio-visibility',visible},location.origin);
  }
 }),{root:reader,threshold:[0,.2,.5]});
 videos.forEach(video=>{
  video.muted=true;observer.observe(video);
  video.addEventListener('pause',()=>{if(video.dataset.visible==='true'&&!document.hidden)video.dataset.userPaused='true';},{signal:abort.signal});
  video.addEventListener('play',()=>delete video.dataset.userPaused,{signal:abort.signal});
 });
 if(stage)observer.observe(stage);
 document.addEventListener('visibilitychange',()=>{
  videos.forEach(video=>{if(document.hidden)video.pause();else if(video.dataset.visible==='true'&&!video.dataset.userPaused)video.play().catch(()=>{});});
  stage?.querySelector('iframe')?.contentWindow?.postMessage({type:'portfolio-visibility',visible:!document.hidden&&stage.dataset.visible==='true'},location.origin);
 },{signal:abort.signal});
 stopMedia=()=>{observer.disconnect();abort.abort();videos.forEach(v=>v.pause());stopMedia=()=>{};};
}
function sourceClip(el){
 const r=el?.getBoundingClientRect();
 if(!r||r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth)return 'inset(38% 34% 38% 34% round 18px)';
 return `inset(${Math.max(0,r.top)}px ${Math.max(0,innerWidth-r.right)}px ${Math.max(0,innerHeight-r.bottom)}px ${Math.max(0,r.left)}px round 16px)`;
}
function finishClose(){
 window.YotiCaseMotion?.destroy();
 window.YotiCaseExperience?.destroy();
 window.YotiWorkbench?.destroy();
 window.YotiWelcomeLetter?.stop();
 stopMedia();
 stopLightMotion();
 content.querySelectorAll('video').forEach(v=>v.pause());
 content.querySelectorAll('iframe').forEach(f=>f.remove());
 if(reader.open)reader.close();
 resetObjectInteractions();
 document.body.style.overflow='';document.body.classList.remove('reading');
 reader.classList.remove('hello-popover','workbench-refined-reader');
 activePage='';document.title='Yoti — Portfolio';
 if(origin?.isConnected)origin.focus({preventScroll:true});
}
function display(page,el){
 clearTimeout(helloTimer); helloTimer = 0;
 const transition=++pageTransition;
 closeAnimation?.cancel();closeAnimation=null;
 reader.getAnimations().forEach(a=>a.cancel());
 content.getAnimations().forEach(a=>a.cancel());
 if(!templates[page]){
  stopLightMotion();
  if(reader.open&&!reduced){
   content.querySelectorAll('video').forEach(v=>v.pause());
   closeAnimation=activePage==='hello'&&window.YotiWelcomeLetter ? window.YotiWelcomeLetter.close(reader) : reader.animate([{clipPath:'inset(0 0 0 0 round 0px)',opacity:1},{clipPath:sourceClip(origin),opacity:.15}],{duration:340,easing:'cubic-bezier(.55,0,.45,1)'});
   closeAnimation.finished.then(()=>{if(transition===pageTransition)finishClose();}).catch(()=>{});
  }else finishClose();
  return;
 }
 const wasOpen=reader.open;
 if(!wasOpen){origin=el||document.querySelector('.paper-open');document.body.style.overflow='hidden';document.body.classList.add('reading');}
 render(page);
 if(!wasOpen){
  reader.showModal();reader.scrollTop=0;
  if(!reduced&&page!=='hello')reader.animate([{clipPath:sourceClip(el||origin),opacity:.5},{clipPath:'inset(0 0 0 0 round 0px)',opacity:1}],{duration:620,easing:'cubic-bezier(.16,1,.3,1)'});
  resetObjectInteractions();
 }else if(!reduced&&page!=='hello'){
  content.animate([{opacity:0,transform:'translateY(15px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'});
 }
 if(page==='hello'){
  const unfoldDuration=window.YotiWelcomeLetter?.open(reader,origin)||0;
  reader.focus({preventScroll:true});
  helloTimer=setTimeout(()=>{
   if(activePage!=='hello'||!reader.open)return;
   history.replaceState({page:''},'',location.pathname+location.search);
   display('');
   window.scrollTo({top:0,behavior:'instant'});
  },3000+unfoldDuration);
 }else $('#close-reader').focus({preventScroll:true});
}
function navigate(page,el){
 const next=templates[page]?page:'';
 const hash=next?'#'+next:'';
 if(location.hash!==hash)history.pushState({page:next},'',location.pathname+location.search+hash);
 display(next,el);
}
function fromLocation(){
 let page='';try{page=decodeURIComponent(location.hash.slice(1));}catch{}
 // Hashes for on-page sections (including About Me) remain useful deep links.
 if(templates[page])display(page);
 else{
  display('');
  const section=page&&document.getElementById(page);
  if(section&&!reader.contains(section))requestAnimationFrame(()=>section.scrollIntoView({behavior:'instant'}));
 }
}
function changePhoto(direction){
 if(activePage==='light'&&lightMotion){lightMotion.change(direction);return;}
 const list=galleries[activePage];if(!list)return;
 photo=(photo+direction+list.length)%list.length;
 const im=$('#gallery-image');if(!im)return; im.src='assets/'+list[photo][0];im.alt=list[photo][1];
 const zoom=im.closest('[data-wb-zoom]');if(zoom){zoom.dataset.wbZoom=im.getAttribute('src');zoom.dataset.wbTitle=im.alt;}
 $('#gallery-caption').textContent=activePage==='workbench'?list[photo][1]:String(photo+1).padStart(2,'0')+' / '+String(list.length).padStart(2,'0')+' · '+list[photo][1];
 const count=$('#gallery-count');if(count){count.textContent=`${photo+1} / ${list.length}`;count.setAttribute('aria-label',`第 ${photo+1} 张，共 ${list.length} 张`);}
 document.querySelectorAll('[data-gallery-index]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===photo)));
 if(!reduced)im.animate([{opacity:.35},{opacity:1}],{duration:230});
}
// Only the Light album owns an automatic slide timer; other galleries stay manual.
function stopLightMotion(){
 lightMotion?.destroy();lightMotion=null;
}
function startLightMotion(){
 const root=content.querySelector('.light-motion-gallery');if(!root)return;
 const stage=root.querySelector('.light-photo-stage');
 const image=root.querySelector('#gallery-image');
 const progress=root.querySelector('.light-photo-progress');
 const toggle=root.querySelector('[data-light-play]');
 const caption=root.querySelector('#gallery-caption');
 const thumbs=[...root.querySelectorAll('[data-gallery-index]')];
 const list=galleries.light,abort=new AbortController();
 let visible=false,paused=false,destroyed=false,timer=0,sequence=0;
 let progressAnimation=null,slideAnimations=[];
 const stack=[];
 const canPlay=()=>!destroyed&&visible&&!paused&&!document.hidden&&activePage==='light';
 const restingTransform=index=>`translate3d(0,0,0) rotate(${index%2?1.25:-1.25}deg) scale(1)`;
 image.style.transform=restingTransform(photo);root.dataset.stackCount='1';
 function clearTimer(){clearTimeout(timer);timer=0;progressAnimation?.cancel();progressAnimation=null;}
 function settle(){slideAnimations.forEach(a=>a.cancel());slideAnimations=[];delete root.dataset.transitioning;}
 function schedule(){
  clearTimer();
  root.dataset.autoplay=canPlay()?'playing':!visible?'offscreen':'paused';
  if(!canPlay())return;
  if(!reduced)progressAnimation=progress.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:180,easing:'linear',fill:'forwards'});
  timer=setTimeout(()=>change(1,true),180);
 }
 async function change(direction,automatic=false){
  if(destroyed||!root.isConnected)return;
  const next=(photo+direction+list.length)%list.length;
  if(next===photo){schedule();return;}
  const request=++sequence;clearTimer();
  // Keep every displayed original until its successor has decoded.
  const preload=new Image();preload.src='assets/'+list[next][0];
  try{await preload.decode();}catch{}
  if(destroyed||request!==sequence||!root.isConnected)return;
  if(automatic&&!canPlay()){schedule();return;}
  settle();
  const previous=image.cloneNode();previous.removeAttribute('id');previous.alt='';previous.setAttribute('aria-hidden','true');previous.classList.add('light-photo-stacked');
  stage.append(previous);stack.unshift(previous);
  // The latest photo plus three earlier originals form a bounded, persistent pile.
  while(stack.length>3)stack.pop().remove();
  stack.forEach((card,depth)=>{
   const from=card.style.transform;
   const transforms=[
    'translate3d(-2.8%,1.8%,0) rotate(-5.5deg) scale(.99)',
    'translate3d(3%,-1.8%,0) rotate(6deg) scale(.97)',
    'translate3d(-.8%,1%,0) rotate(-8deg) scale(.95)'
   ];
   card.style.zIndex=String(4-depth);card.style.transform=transforms[depth];card.dataset.stackDepth=String(depth+1);
   if(!reduced)slideAnimations.push(card.animate([{transform:from},{transform:transforms[depth]}],{duration:560,easing:'cubic-bezier(.3,.3,.25,1)',fill:'forwards'}));
  });
  photo=next;image.src=preload.src;image.alt=list[next][1];root.dataset.photoIndex=String(photo);root.dataset.stackCount=String(stack.length+1);
  caption.setAttribute('aria-live',automatic?'off':'polite');
  caption.textContent=String(photo+1).padStart(2,'0')+' / '+String(list.length).padStart(2,'0')+' · '+list[photo][1];
  thumbs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===photo)));
  const strip=root.querySelector('.gallery-thumbs'),thumb=thumbs[photo];
  strip.scrollTo({left:Math.max(0,thumb.offsetLeft-strip.offsetLeft-(strip.clientWidth-thumb.offsetWidth)/2),behavior:reduced?'instant':'smooth'});
  const landed=restingTransform(photo);image.style.transform=landed;
  if(!reduced){
   const turn=photo%2?1:-1;root.dataset.transitioning='true';
   slideAnimations.push(image.animate([
    {transform:`translate3d(${turn*5}%,-95%,0) rotate(${turn*15}deg) scale(1.1)`,opacity:.2},
    {transform:`translate3d(0,2.8%,0) rotate(${-turn*.8}deg) scale(.985)`,opacity:1,offset:.76},
    {transform:landed,opacity:1}
   ],{duration:700,easing:'cubic-bezier(.3,.3,.25,1)',fill:'forwards'}));
   Promise.allSettled(slideAnimations.map(a=>a.finished)).then(()=>{if(!destroyed&&request===sequence){settle();schedule();}});
  }else schedule();
 }
 function sync(){
  if(!canPlay())settle();
  schedule();
 }
 const observer=new IntersectionObserver(entries=>{
  const nextVisible=entries[0].isIntersecting&&entries[0].intersectionRatio>.12;
  if(visible!==nextVisible){visible=nextVisible;sync();}
 },{root:reader,threshold:[0,.12]});
 observer.observe(stage);
 document.addEventListener('visibilitychange',sync,{signal:abort.signal});
 toggle.addEventListener('click',()=>{paused=!paused;toggle.textContent=paused?'▶':'Ⅱ';toggle.setAttribute('aria-label',paused?'播放照片自动轮播':'暂停照片自动播放');toggle.setAttribute('aria-pressed',String(paused));sync();},{signal:abort.signal});
 lightMotion={change,destroy(){destroyed=true;++sequence;clearTimer();settle();stack.forEach(card=>card.remove());observer.disconnect();abort.abort();}};
}
function setTheme(pink){
 document.body.classList.toggle('pink',pink);
 $('#theme-toggle').setAttribute('aria-pressed',String(pink));
 $('#theme-toggle').textContent=pink?'换回奶油色 ↗':'换张粉色纸 ↗';
 document.querySelector('meta[name="theme-color"]').content=pink?'#ebbbca':'#f1e7d8';
 try{localStorage.setItem('yoti-paper-theme',pink?'pink':'cream');}catch{}
}
document.addEventListener('click',e=>{
 const entry=e.target.closest('[data-open],[data-route]');
 if(entry){
  e.preventDefault();
  if(entry.classList.contains('keepsake')&&!reduced){
   if(entry.dataset.opening)return;entry.dataset.opening='true';
   const base=getComputedStyle(entry).transform;
   const lift=entry.animate([{transform:base},{transform:'translate3d(0,-38px,35px) rotate(0deg) scale(1.035)'}],{duration:170,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
   lift.finished.then(()=>{navigate(entry.dataset.open,entry);lift.cancel();delete entry.dataset.opening;}).catch(()=>{delete entry.dataset.opening;});
  }else navigate(entry.dataset.open||entry.dataset.route,entry);
 }
 if(e.target.closest('[data-load-birthday]'))loadBirthdayPreview();
 if(e.target.closest('[data-reader-top]'))reader.scrollTo({top:0,behavior:reduced?'instant':'smooth'});
 const jump=e.target.closest('[data-jump]');if(jump){e.preventDefault();document.getElementById(jump.dataset.jump)?.scrollIntoView({behavior:reduced?'instant':'smooth'});}
 const pic=e.target.closest('[data-photo]');if(pic)changePhoto(Number(pic.dataset.photo));
 const thumb=e.target.closest('[data-gallery-index]');if(thumb)changePhoto(Number(thumb.dataset.galleryIndex)-photo);
 const scroll=e.target.closest('[data-scroll]');if(scroll){
  e.preventDefault();const target=document.getElementById(scroll.dataset.scroll||'collection');
  if(target){if(reader.open)navigate('');target.scrollIntoView({behavior:reduced?'instant':'smooth'});}
 }
});
$('#close-reader').onclick=()=>navigate('');
reader.addEventListener('click',e=>{if(activePage==='hello'&&e.target===reader)navigate('');});
reader.addEventListener('cancel',e=>{e.preventDefault();navigate('');});
reader.addEventListener('keydown',e=>{
 if(galleries[activePage]&&content.querySelector('#gallery-image')&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();changePhoto(e.key==='ArrowRight'?1:-1);}
});
document.querySelectorAll('[data-home]').forEach(b=>b.onclick=()=>{navigate('');window.scrollTo({top:0,behavior:reduced?'instant':'smooth'});});
$('#theme-toggle').onclick=()=>setTheme(!document.body.classList.contains('pink'));
window.addEventListener('popstate',fromLocation);
window.addEventListener('hashchange',()=>{const page=location.hash.slice(1);if(page!==activePage)fromLocation();});
try{setTheme(localStorage.getItem('yoti-paper-theme')==='pink');}catch{setTheme(false);}
fromLocation();

// Pointer spring and drag are owned by object-drag.js.
