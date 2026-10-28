import {THREE,world,group,mesh,contact,PI,phase,clamp,ease,mix} from './core.js';
import {galleryPhotos} from './photo-data.js';
import {CameraRig,HOME,viewFor,cameraPose} from './motion.js';import {makePersonal} from './personal.js';
import {makeMemories} from './memories.js';
import {makeFireworks} from './fireworks.js';
import {makePresentationCue} from './presentation.js';
import {makeFrameReview} from './performance-review.js';
import {makeRoom} from './room.js?v=20261023-letter-throw';import {makeObjects} from './objects.js';import {makePets} from './pets.js';
const $=s=>document.querySelector(s),host=$('#scene');
const setText=(selector,value)=>{const el=$(selector);if(el.textContent!==value)el.textContent=value;};
const params=new URLSearchParams(location.search),videoMode=params.has('video');let presentationCue=null;
document.body.classList.toggle('video-demo',videoMode);document.body.dataset.presentation=videoMode?'video':'gift';
document.body.classList.toggle('portfolio-preview',videoMode&&params.has('embed'));
if(videoMode){$('#night').hidden=true;$('#mode').textContent='演示播放 · 默认静音';}
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.96;host.appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.add(world);const camera=new THREE.PerspectiveCamera(34,1,.1,100);
const studio=new THREE.Scene();studio.background=new THREE.Color('#b3bcae');for(const [x,y,z,w,h,col,intensity] of [[-4,6,5,5,7,'#ffefd2',3],[5,4,2,4,5,'#e5efdd',2]]){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(col).multiplyScalar(intensity),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);studio.add(m);}const pm=new THREE.PMREMGenerator(renderer);scene.environment=pm.fromScene(studio,.03).texture;pm.dispose();scene.environmentIntensity=.5;
const hemi=new THREE.HemisphereLight('#ffefce','#577063',1);scene.add(hemi);
const sun=new THREE.DirectionalLight('#ffe0ad',2.5);sun.position.set(-3,9,7);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:28});sun.shadow.normalBias=.025;sun.shadow.bias=-.00012;sun.shadow.radius=3;scene.add(sun);
const fill=new THREE.DirectionalLight('#d4e4db',.75);fill.position.set(8,5,4);scene.add(fill);
const ground=mesh(new THREE.PlaneGeometry(150,150),new THREE.ShadowMaterial({opacity:.13}),0,-.17,0,scene);ground.rotation.x=-PI/2;ground.castShadow=false;
const room=makeRoom(),objects=makeObjects(room),pets=makePets(),personal=makePersonal(objects),memories=makeMemories(objects,room),rig=new CameraRig(),fireworks=makeFireworks(scene);
pets.pets.forEach(p=>p.root.userData.action='pets');objects.items.pets={root:pets.pets[0].root,title:'摸摸沙发上的小猫',look:[.35,1.55,-1.65]};objects.times.pets=-100;
let time=0,last=performance.now(),paused=false,auto=false,tourStart=0,tourIndex=0,selected='',pending=null,overview={...HOME},night=1,wantNight=1,drag=null,birthday=-1,blow=-1,wishReady=false,wishAt=-1,moodDark=0,letterShown=false,paperShown=false,photoIndex=0,albumOpenAt=-1,manualLetterAt=-1;
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),projected=new THREE.Vector3();
const captions={gallery:['相框里，藏着我们的照片。','翻开回忆，让照片来到眼前。'],rest:['今天，先休息一下。','让 CD 转起来，把这一小段时间留给自己。'],tv:['换个频道，看看小世界。','点一下，还可以换一幅画。'],phone:['叮铃铃，有一通小小来电。','Fancy，生日快乐。'],cd:['放一张 CD，让唱片慢慢转。','想听音乐时，点右上角的音符。'],album:['书页里，也藏着一间小屋。','房子立起来，窗里的灯也亮了。'],camera:['咔嚓。留住这一刻。','等一小下，照片正在显影。'],pets:['今天也有小伙伴陪你。','摸摸头，挥挥爪。'],dog:['小狗也在这里，陪你休息。','抬抬头，摇摇尾巴。'],calendar:['再翻两页，就是你的生日。','10 月 11 日 → 12 日 → 13 日'],cake:['Fancy，许一个愿吧。','准备好了，让烛光替你记住。'],letter:['有些话，想写给你。','给 Fancy 的一封信。'],lamp:['把灯打开，今晚就待在这里。','点一下，切换白天和夜晚。']};
const relights=[];for(const [pos,power,range] of [[[-3.71,2,-1.36],8,3],[[-3.5,3.7,-2.9],8,3],[[-3.8,1.9,1.4],6,3],[[.8,2.3,-1.4],6,4],[[-4.3,3.7,-.8],5,3],[[0,2.4,.8],9,4],[[3.8,2.5,-1],10,4]]){const l=new THREE.PointLight('#ffd395',0,range,2);l.position.set(...pos);scene.add(l);relights.push({l,power});}
world.traverse(o=>{if(o.isMesh&&(o.material?.transparent||objects.flames.includes(o)))o.castShadow=false;});
const candleBounce=new THREE.PointLight('#ffce8b',0,3,2);candleBounce.position.set(0,.90,.90);objects.items.cake.root.add(candleBounce);
const audio=new Audio('./assets/reference-audio.m4a');audio.id='reference-audio';audio.preload='auto';audio.loop=true;audio.volume=.5;audio.hidden=true;audio.muted=true;document.body.append(audio);let soundOn=false;
function soundUI(){ $('#sound').setAttribute('aria-label',soundOn?'关闭配乐':'开启配乐');$('#sound .mute-dot').style.display=soundOn?'none':'';document.body.dataset.sound=String(soundOn);}
async function toggleAudio(){try{if(soundOn){audio.pause();audio.muted=true;soundOn=false;}else{audio.muted=false;await audio.play();soundOn=true;}objects.state.disc=soundOn;soundUI();}catch{$('#hint').textContent='点击右上角 ♫ 开启配乐。';}}
const roomPrintTarget=new THREE.WebGLRenderTarget(768,576,{depthBuffer:true,stencilBuffer:false});roomPrintTarget.texture.colorSpace=THREE.SRGBColorSpace;
const printCamera=new THREE.PerspectiveCamera(34,4/3,.1,100);
function captureRoomPhoto(){const oldTarget=renderer.getRenderTarget(),oldBackground=scene.background,show=objects.print.visible;const view={...HOME,distance:15,width:12.2},pose=cameraPose(view,4/3);printCamera.position.set(...pose.position);printCamera.lookAt(...pose.target);objects.print.visible=false;scene.background=new THREE.Color('#263f35');renderer.setRenderTarget(roomPrintTarget);renderer.render(scene,printCamera);renderer.setRenderTarget(oldTarget);scene.background=oldBackground;objects.print.visible=show;objects.printMat.map=roomPrintTarget.texture;objects.printMat.needsUpdate=true;}
function setCaption(id){if(!captions[id])return;$('#status').textContent=captions[id][0];$('#hint').textContent=captions[id][1];}
function openDialog(el){el.classList.remove('closing');if(!el.open)el.showModal();}
function closeDialog(el){if(!el.open)return;el.classList.add('closing');setTimeout(()=>{if(el.classList.contains('closing')){el.close();el.classList.remove('closing');}},220);}
function showLetter(){openDialog($('#letter-dialog'));}
function showPhotos(){const spec=galleryPhotos[photoIndex],crop=spec.crop||[0,0,1,1];$('#photo-image').src='./assets/'+spec.file+'.jpg';$('#photo-viewport').style.aspectRatio=String(spec.aspect);const [x,y,w,h]=crop;Object.assign($('#photo-image').style,{left:(-x/w*100)+'%',top:(-y/h*100)+'%',width:(100/w)+'%',height:(100/h)+'%'});$('#photo-title').textContent=spec.title;$('#polaroid').classList.remove('flipped');$('#photo-flip').textContent='↻ 翻到背面';openDialog($('#photo-dialog'));}

function flipPhoto(){const p=$('#polaroid');p.classList.toggle('flipped');$('#photo-flip').textContent=p.classList.contains('flipped')?'↻ 看看正面':'↻ 翻到背面';}
const nextStops={gallery:['tv','看看电视 →'],tv:['phone','接个电话 →'],phone:['cd','放张 CD →'],cd:['album','翻开小书 →'],album:['camera','拍一张 →'],camera:['calendar','翻到生日 →'],calendar:['cake','去许愿 →']};
function controls(id){const next=nextStops[id];$('#next-stop').hidden=!next;if(next)$('#next-stop').textContent=next[1];$('#detail-controls').hidden=!['gallery','tv','calendar','camera','album','phone','dog','cd'].includes(id);$('#open-photos').hidden=id!=='gallery';$('#previous').hidden=$('#next').hidden=!['gallery','tv'].includes(id);$('#detail-replay').textContent={gallery:'重看这组',tv:'换个频道',calendar:'再翻两页',camera:'再拍一张',album:'再翻一页',phone:'再接一次',dog:'摸摸小狗',cd:'转动 / 暂停 CD'}[id]||'再看一次';}
function stopTour(){auto=false;$('#mode').textContent='自由探索';$('#pause').hidden=true;}
function cancelStory(){presentationCue?.reset();pending=null;birthday=blow=-1;wishReady=false;wishAt=-1;letterShown=paperShown=false;albumOpenAt=manualLetterAt=-1;$('#wish').hidden=true;$('#greeting').classList.remove('show');document.body.classList.remove('celebrating','wishing');}
function fullView(){memories.closeGallery(time);pending=null;selected='';albumOpenAt=-1;$('#back-wrap').hidden=true;$('#detail-controls').hidden=true;rig.go(overview,time,{duration:1,view:'home'});document.body.dataset.view='home';$('#status').textContent='一间可以慢慢探索的小屋';$('#hint').textContent='拖动看看，点点里面的小东西。';document.querySelectorAll('[data-action]').forEach(b=>b.classList.remove('active'));}
function begin(id,manual=false){if(id!=='tv')objects.act(id,time);setCaption(id);document.body.dataset.action=id;if(id==='rest'){wantNight=1;objects.state.disc=true;objects.act('pets',time);objects.act('dog',time);}
 if(id==='cd'&&!manual)objects.state.disc=true;
 if(id==='lamp'){if(!videoMode)wantNight=wantNight>.5?0:1;fullView();}
 if(id==='cake'){document.body.classList.add('wishing');wishReady=true;wishAt=time;$('#wish').hidden=false;$('#detail-controls').hidden=true;}
 if(id==='gallery')memories.startGallery(time,!manual);
 if(id==='camera')captureRoomPhoto();
 if(id==='letter')manualLetterAt=time+1.8;
}
function act(id,manual=true){if(manual){stopTour();cancelStory();}if(id==='gallery-next'){memories.galleryAction('next',time);return;}if(id==='photos'){photoIndex=memories.galleryIndex;showPhotos();return;}if(!objects.items[id])return;if(paused){paused=false;$('#pause').textContent='Ⅱ';if(soundOn)audio.play().catch(()=>{});}if(!selected&&time>=rig.end){overview={...rig.sample(time)};if(overview.eye)overview.eye=[...overview.eye];}if(selected==='gallery'&&id!=='gallery')memories.closeGallery(time);selected=id;document.body.dataset.view=id;setCaption(id);$('#back-wrap').hidden=false;$('#more-panel').hidden=true;$('#more').setAttribute('aria-expanded','false');controls(id);document.querySelectorAll('[data-action]').forEach(b=>b.classList.toggle('active',b.dataset.action===id));if(rig.view===id&&time>=rig.end){if(id==='tv')objects.act('tv',time);begin(id,manual);}else{const tableViews=['album','camera','calendar','cake'];const sameTable=tableViews.includes(rig.view)&&tableViews.includes(id);const via=!sameTable&&rig.view!=='home'&&rig.view!==id&&rig.view!=='custom'?overview:null;pending={id,manual,at:rig.go(viewFor(id,objects.items[id].look),time,{duration:1,view:id,via})+.12};}}
function blowCandles(){if(!wishReady)return;if(paused){paused=false;$('#pause').textContent='Ⅱ';$('#pause').setAttribute('aria-label','暂停动画');if(soundOn)audio.play().catch(()=>{});}wishReady=false;birthday=blow=time;document.body.classList.remove('wishing');$('#wish').hidden=true;$('#back-wrap').hidden=true;$('#detail-controls').hidden=true;letterShown=paperShown=false;document.body.classList.add('celebrating');}
const TOUR_DURATION=62;
const schedule=[[1,'gallery'],[8.1,'galleryClose'],[8.7,'home'],[10,'tv'],[12.7,'tvNext'],[14.9,'tvNext'],[16.7,'home'],[18,'phone'],[22.5,'home'],[23.8,'cd'],[27.2,'home'],[28.5,'album'],[34.4,'camera'],[39.9,'calendar'],[44.9,'cake']];
function runEvent([,id]){if(id==='home')fullView();else if(id==='galleryClose')memories.closeGallery(time);else if(id==='tvNext')objects.act('tv',time);else if(id==='photos')showPhotos();else if(id==='closePhoto')closeDialog($('#photo-dialog'));else if(id==='blow')blowCandles();else act(id,false);}
function replay(){cancelStory();selected='';overview={...HOME};rig.go(HOME,time,{duration:.5,view:'home'});auto=true;paused=false;tourStart=time;tourIndex=0;wantNight=1;night=1;objects.reset();objects.state.disc=false;memories.reset();personal.reset();photoIndex=0;Object.keys(objects.times).forEach(k=>objects.times[k]=-100);$('#pause').hidden=false;$('#pause').textContent='Ⅱ';$('#pause').setAttribute('aria-label','暂停动画');$('#mode').textContent='生日小片播放中';$('#detail-controls').hidden=true;$('#back-wrap').hidden=true;for(const el of document.querySelectorAll('dialog'))if(el.open)el.close();if(soundOn){audio.currentTime=0;audio.play().catch(()=>{});}$('#tour').textContent='↻ 重播';}
$('#blow-candles').onclick=blowCandles;
if(videoMode)presentationCue=makePresentationCue($('#blow-candles'));
$('#tour').onclick=replay;$('#pause').onclick=()=>{paused=!paused;$('#pause').textContent=paused?'▷':'Ⅱ';$('#pause').setAttribute('aria-label',paused?'继续动画':'暂停动画');if(soundOn){if(paused)audio.pause();else audio.play().catch(()=>{});}};
$('#home').onclick=$('#back').onclick=()=>{stopTour();cancelStory();fullView();};$('#night').onclick=()=>{if(videoMode)return;stopTour();cancelStory();wantNight=wantNight>.5?0:1;};$('#sound').onclick=toggleAudio;
document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>act(b.dataset.action));$('#more').onclick=()=>{$('#more-panel').hidden=!$('#more-panel').hidden;$('#more').setAttribute('aria-expanded',String(!$('#more-panel').hidden));};
$('#detail-replay').onclick=()=>{stopTour();if(selected==='gallery')memories.startGallery(time,false);else if(selected==='tv')objects.act('tv',time);else begin(selected,true);};
$('#open-photos').onclick=()=>{stopTour();photoIndex=memories.galleryIndex;showPhotos();};
function changeGallery(direction){stopTour();if(selected==='gallery')memories.galleryAction(direction,time);else{if(direction==='prev')objects.state.tv=(objects.state.tv+2)%4;objects.act('tv',time);}}
$('#previous').onclick=()=>changeGallery('prev');$('#next').onclick=()=>changeGallery('next');
$('#next-stop').onclick=()=>{const next=nextStops[selected];if(next)act(next[0]);};

$('#close-letter').onclick=$('#fold-letter').onclick=()=>{closeDialog($('#letter-dialog'));stopTour();cancelStory();fullView();};$('#close-photo').onclick=()=>closeDialog($('#photo-dialog'));$('#polaroid').onclick=$('#photo-flip').onclick=flipPhoto;$('#photo-prev').onclick=()=>{photoIndex=(photoIndex+galleryPhotos.length-1)%galleryPhotos.length;showPhotos();};$('#photo-next').onclick=()=>{photoIndex=(photoIndex+1)%galleryPhotos.length;showPhotos();};for(const el of document.querySelectorAll('dialog'))el.addEventListener('click',e=>{if(e.target===el){closeDialog(el);if(el.id==='letter-dialog'){stopTour();cancelStory();fullView();}}});
function hit(e){const r=host.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);for(const h of ray.intersectObjects(world.children,true)){let q=h.object,hidden=false,id=null;while(q&&q!==world){if(!q.visible)hidden=true;if(!id&&q.userData.action)id=q.userData.action;q=q.parent;}if(hidden||h.object.material?.opacity===0)continue;if(id)return id;if(h.object.material?.transparent)continue;return null;}return null;}
host.addEventListener('pointerdown',e=>{if(e.target.closest('button')||birthday>=0||wishReady)return;const v=rig.sample(time);drag={x:e.clientX,y:e.clientY,a:v.yaw,b:v.pitch,moved:false};host.setPointerCapture(e.pointerId);});
host.addEventListener('pointermove',e=>{if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>5&&!selected){if(!drag.moved){stopTour();cancelStory();const o=rig.orbitOrigin(time);drag.a=o.yaw;drag.b=o.pitch;}drag.moved=true;rig.orbit(drag.a+dx*.0022,drag.b+dy*.0017);}}else if(e.pointerType!=='touch'&&birthday<0){const id=hit(e);host.style.cursor=id?'pointer':'grab';$('#hover').style.display=id?'block':'none';if(id){$('#hover').textContent=id==='gallery-next'?'点一下，换下一张':id==='photos'?'查看我们的合照':objects.items[id]?.title||'';$('#hover').style.left=Math.min(e.clientX+13,innerWidth-160)+'px';$('#hover').style.top=e.clientY+13+'px';}}});
host.addEventListener('pointerup',e=>{if(drag&&!drag.moved){const id=hit(e);if(id)act(id);}drag=null;});host.addEventListener('pointercancel',()=>drag=null);host.addEventListener('pointerleave',()=>$('#hover').style.display='none');
host.addEventListener('wheel',e=>{e.preventDefault();if(selected||birthday>=0)return;stopTour();const v={...rig.sample(time)},factor=Math.exp(clamp(e.deltaY,-100,100)*.00065);delete v.eye;v.distance=clamp(v.distance*factor,4,26);v.width=clamp(v.width*factor,2.6,17);rig.go(v,time,{duration:.3,view:'custom'});},{passive:false});
addEventListener('keydown',e=>{if(e.key==='Escape'){stopTour();cancelStory();fullView();}if(e.code==='Space'&&!['INPUT','BUTTON','TEXTAREA'].includes(e.target.tagName)){e.preventDefault();if(auto)$('#pause').click();else $('#tour').click();}});
const pins=[];for(const id of ['tv','phone','cd','album','camera','calendar','cake','pets','letter','gallery','dog']){const el=document.createElement('button');el.className='pin';el.textContent=id==='cake'?'✦':'+';el.setAttribute('aria-label',objects.items[id].title);el.onclick=e=>{e.stopPropagation();act(id);};$('#pins').appendChild(el);const bb=new THREE.Box3().setFromObject(objects.items[id].root);pins.push({id,el,center:bb.getCenter(new THREE.Vector3())});}
let sceneWidth=1,sceneHeight=1;
function resize(){const w=sceneWidth=host.clientWidth,h=sceneHeight=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();rig.aspect=w/h;if(!rig.queue.length)delete rig.current.eye;}addEventListener('resize',resize);resize();
const frameReview=params.has('perf-review')?makeFrameReview():null;
let done=false,frameCount=0;let recordFrame=null;if(params.has('motion-review'))import('./review-recorder.js').then(m=>recordFrame=m.installRecorder(renderer.domElement,()=>$('#tour').click(),TOUR_DURATION));
function render(now){const cpuStart=performance.now();requestAnimationFrame(render);if(document.hidden){last=now;return;}const raw=(now-last)/1000,dt=clamp(raw,0,.10);last=now;if(!paused)time+=dt;
 if(auto&&!paused){if(wishReady)tourStart+=dt;const tt=time-tourStart;while(tourIndex<schedule.length&&tt>=schedule[tourIndex][0])runEvent(schedule[tourIndex++]);$('#progress').style.width=clamp(tt/TOUR_DURATION)*100+'%';setText('#mode',wishReady?(videoMode?'许个愿吧':'等你许好愿望'):`生日小片 · ${Math.min(TOUR_DURATION,Math.floor(tt))} / ${TOUR_DURATION}`);if(tt>=TOUR_DURATION){auto=false;$('#pause').hidden=true;$('#mode').textContent='小屋一直在 · 点物件继续探索';}}
 if(pending&&time>=pending.at){const p=pending;pending=null;begin(p.id,p.manual);}
 if(albumOpenAt>=0&&time>=albumOpenAt){albumOpenAt=-1;showPhotos();}if(manualLetterAt>=0&&time>=manualLetterAt){manualLetterAt=-1;showLetter();}
 // The gift waits for a person; the video visibly clicks after three seconds.
 presentationCue?.update(time,wishReady?wishAt:-1);
 const bt=birthday<0?-1:time-birthday;moodDark=mix(moodDark,wishReady?.96:0,1-Math.exp(-dt*5));let dark=bt>=0?1:moodDark;
 document.body.classList.toggle('camera-moving',time<rig.end||!!pending);
 if(bt>=0){if(bt>=.18&&rig.view!=='birthday-wide'){selected='birthday-wide';rig.go(overview,time,{duration:.9,view:'birthday-wide'});}if(bt>=6.0)$('#greeting').classList.add('show');if(bt>=6.5&&!paperShown){paperShown=true;objects.act('letter',time);}if(bt>=8.4&&!letterShown){letterShown=true;showLetter();}}
 night=mix(night,wantNight,1-Math.exp(-dt*2));document.body.classList.toggle('night',night>.52);document.body.style.background=bt>=0?'#050604':wishReady?'#152820':'';
 room.animate(time,night,dark,0);room.skyMat.color.multiplyScalar(bt>=0?.008:mix(1,.10,moodDark/.96));room.sun.material.color.multiplyScalar(bt>=0?.008:mix(1,.12,moodDark/.96));room.windows.forEach(m=>m.color.multiplyScalar(bt>=0?.003:mix(1,.13,moodDark/.96)));
 hemi.intensity=mix(1,.48,night)*(1-dark);sun.intensity=mix(2.5,1.25,night)*(1-dark);fill.intensity=mix(.75,.44,night)*(1-dark);scene.environmentIntensity=mix(.5,.25,night)*(1-dark);
 objects.screenMat.color.setScalar(bt>=0?phase(bt,2.4,2.75):mix(1,.08,moodDark/.96));objects.animate(time,{blow});const channelAge=time-objects.times.tv;if(channelAge>=0&&channelAge<.38)objects.screenMat.color.multiplyScalar(1-Math.sin(channelAge/.38*PI)*.65);
 if(wishReady)objects.candleLight.intensity=4.5+Math.sin(time*9)*.25;candleBounce.intensity=bt<0?moodDark/.96*1.25:0;
 relights.forEach(({l,power},i)=>l.intensity=bt>=0?phase(bt,.80+i*.55,1.16+i*.55)*power:0);
 if(bt>=0){
  room.bulbs.forEach((m,i)=>m.emissiveIntensity=phase(bt,2.2+i*.17,2.42+i*.17)*1.1);
  const lampOn=phase(bt,5.1,5.75);room.lampLight.intensity=13*lampOn;room.shadeMat.emissiveIntensity=.57*lampOn;
  hemi.intensity=.10*lampOn;fill.intensity=.05*lampOn;scene.environmentIntensity=.07*lampOn;
 }
 pets.animate(time,objects.times.pets);personal.animate(time,dark);
 if(selected==='gallery'){setText('#hint',memories.galleryCaption);setText('#detail-replay','重看这组');}if(selected==='calendar'&&objects.state.calendar===2){setText('#status','10 月 13 日，生日快乐。');setText('#hint','Fancy，今天留给你。');}
 const view=rig.sample(time),pose=cameraPose(view,camera.aspect,camera.fov);camera.position.set(...pose.position);camera.lookAt(...pose.target);camera.updateMatrixWorld();memories.animate(time,camera);fireworks.animate(bt,camera);
 const hidePins=auto||!!selected;
 pins.forEach(({el,center})=>{if(el.hidden!==hidePins)el.hidden=hidePins;if(hidePins)return;projected.copy(center).project(camera);el.style.left=(projected.x*.5+.5)*sceneWidth+'px';el.style.top=(-projected.y*.5+.5)*sceneHeight+'px';});
 renderer.render(scene,camera);frameReview?.sample({raw:raw*1000,cpu:performance.now()-cpuStart,auto,tt:time-tourStart,moving:time<rig.end,calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,view:selected||'home',muted:audio.muted&&audio.paused});if(recordFrame)recordFrame(time,pose,bt>=0?'#050604':night>.5?'#203931':'#eee8db');if(!done){$('#loading').classList.add('done');$('#loading').hidden=true;done=true;}
 if(++frameCount%10===0)Object.assign(document.body.dataset,{time:time.toFixed(2),tourTime:auto?(time-tourStart).toFixed(2):'',view:selected||'home',cameraView:rig.view,transition:String(time<rig.end),pending:pending?.id||'',cameraPosition:pose.position.map(n=>n.toFixed(3)).join(','),mode:auto?'auto':'explore',calendarDay:String(11+objects.state.calendar),galleryIndex:String(memories.galleryIndex),galleryStage:memories.galleryStage,popupVisible:String(memories.popupVisible),birthday:bt.toFixed(2),wishAge:wishReady?(time-wishAt).toFixed(2):'',rightLamp:room.lampLight.intensity.toFixed(2),relitCount:String(relights.filter(({l})=>l.intensity>.1).length),candles:String(objects.flames.filter(f=>f.visible).length),letterBlank:String(!$('.blank-letter').textContent.trim()),bookOpen:objects.popupBook.opening.toFixed(2),fireworks:String(fireworks.active),presentationCue:presentationCue?.stage||'none',demoClicks:String(presentationCue?.clickCount||0),frameMs:(raw*1000).toFixed(1),triangles:renderer.info.render.triangles,batchedDrawCalls:String(room.savedCalls)});
}
document.addEventListener('visibilitychange',()=>{last=performance.now();});
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();$('#error').hidden=false;$('#error').textContent='画面暂时中断了，请刷新后重新打开。';paused=true;});requestAnimationFrame(render);

if(params.has('autoplay')){requestAnimationFrame(()=>replay());}
if(params.has('embed')){
 const playerState=()=>parent.postMessage({type:'birthday-player-state',paused,soundOn,ended:!auto},location.origin);
 addEventListener('message',async e=>{
  if(e.origin!==location.origin||e.source!==parent||e.data?.type!=='portfolio-controls')return;
  if(e.data.action==='pause'){if(!auto)replay();else $('#pause').click();}
  if(e.data.action==='replay')replay();
  if(e.data.action==='sound')await toggleAudio();
  playerState();
 });
 parent.postMessage({type:'birthday-ready'},location.origin);
 const playerTimer=setInterval(playerState,500);
 addEventListener('pagehide',()=>clearInterval(playerTimer),{once:true});
 let hiddenPaused=false,wasPaused=false;
 addEventListener('message',e=>{
  if(e.origin!==location.origin||e.source!==parent||e.data?.type!=='portfolio-visibility')return;
  if(!e.data.visible&&!hiddenPaused){wasPaused=paused;paused=true;hiddenPaused=true;audio.pause();}
  else if(e.data.visible&&hiddenPaused){paused=wasPaused;hiddenPaused=false;if(soundOn&&!paused)audio.play().catch(()=>{});}
 });
}
