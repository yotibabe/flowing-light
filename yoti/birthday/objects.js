import {THREE,world,group,box,ball,cylinder,mesh,tube,material,PI,TAU,phase,clamp} from './core.js';
import {galleryPhotos} from './photo-data.js';
import {makePopupBook} from './popup-book.js';
import {C,arts,textPlane,ring,book,mug,plant,canvasTexture} from './decor.js';
export function makeObjects(room){
 let lastTime=0,discAngle=0;
 const items={},times={},state={disc:false,tv:0,album:0,calendar:0};
 const add=(id,g,title,pos,look)=>{g.userData.action=id;items[id]={root:g,title,pos,look};times[id]=-100;return g;};
 const load=n=>{const tx=new THREE.TextureLoader().load('./assets/'+n+'.jpg');tx.colorSpace=THREE.SRGBColorSpace;return tx;};const memories=galleryPhotos.map(spec=>{const tx=load(spec.file);if(spec.crop){const [x,y,w,h]=spec.crop;tx.repeat.set(w,h);tx.offset.set(x,1-y-h);}return tx;});const channels=['tv-cat','tv-room','tv-coffee','seaside'].map(load);
 const tv=add('tv',group(-3.9,.25,1.4),'换一个频道',[-5,3.0,5.5],[-3.9,1.15,1.4]);tv.rotation.y=.20;
 for(const x of [-.62,.62])for(const z of [-.22,.22]){const l=box(.065,.35,.065,C.ink,x,.2,z,tv,.015);l.rotation.z=x*.16;}
 box(1.7,1.26,.70,C.walnut,0,.98,0,tv,.15);box(1.52,1.10,.035,'#242d26',0,.98,.36,tv,.09);
 const screenMat=new THREE.MeshBasicMaterial({map:channels[0]});const screen=box(.86,.86,.035,screenMat,-.14,1.0,.39,tv,.065);
 for(const y of [.72,1.13]){const k=cylinder(.105,.105,.065,C.gold,.62,y,.405,tv);k.rotation.x=PI/2;box(.018,.1,.012,C.ink,.62,y,.446,tv,.002);}
 for(let i=0;i<6;i++)box(.22,.012,.012,'#ac8b58',.60,.49+i*.035,.406,tv,.002);
 tube([[-.3,1.63,0],[-.56,2.05,0]],.013,C.gold,tv);tube([[.3,1.63,0],[.60,2.08,0]],.013,C.gold,tv);
 const tvLabel=textPlane('SUNDAY CLUB',.65,.09,C.cream,null,70);tvLabel.position.set(-.10,.48,.40);tv.add(tvLabel);
 // Rotary telephone, suspended receiver and coiled cord.
 const phone=add('phone',group(-3.71,.25,-1.36),'接起小电话',[-5.7,3.3,2.2],[-3.71,1.35,-1.36]);
 box(1.3,.12,1.05,C.walnut,0,.77,0,phone,.05);for(const x of [-.49,.49])for(const z of [-.38,.38])box(.06,.73,.06,C.walnut,x,.38,z,phone,.01);
 const phoneBody=group(0,.84,0,phone);box(.84,.20,.65,'#974e39',0,.10,0,phoneBody,.10);box(.70,.17,.49,'#aa6246',0,.23,-.02,phoneBody,.08);
 const dial=cylinder(.21,.21,.026,C.gold,0,.324,.03,phoneBody);for(let i=0;i<10;i++){const a=i*TAU/10;cylinder(.032,.032,.009,C.walnut,Math.sin(a)*.155,.341,.03+Math.cos(a)*.155,phoneBody);}cylinder(.075,.075,.008,C.cream,0,.341,.03,phoneBody);
 const receiver=group(0,.43,-.18,phoneBody);tube([[-.37,0,0],[-.25,.10,0],[.25,.10,0],[.37,0,0]],.066,'#703f32',receiver);for(const x of [-.37,.37])cylinder(.11,.13,.10,'#703f32',x,-.045,0,receiver);
 const cord=group(.37,.31,-.18,phoneBody);const cp=[];for(let i=0;i<90;i++)cp.push([.12+Math.sin(i*.75)*.035,-i*.005,.03+Math.cos(i*.75)*.035]);tube(cp,.01,C.ink,cord);
 
 // CD deck with an opening glass lid, concentric rainbow grooves and speakers.
 const cd=add('cd',group(3.94,.25,-2.55),'放一张 CD',[6.3,4.2,2.5],[3.85,1.45,-2.55]);
 box(1.81,.70,.94,C.walnut,0,.46,0,cd,.05);for(const x of [-.72,.72])box(.08,.22,.08,C.walnut,x,.12,.31,cd,.015);
 for(let i=0;i<9;i++)box(.10,.47,.023,i%2?'#6e7963':'#b48b51',-.65+i*.16,.43,.483,cd,.015);
 box(1.16,.14,.76,'#d5c7a6',0,.89,0,cd,.06);box(.69,.015,.64,C.ink,-.12,.97,0,cd,.035);
 const disc=group(-.12,.985,0,cd);cylinder(.281,.281,.016,'#abbdb6',0,0,0,disc);
 for(let j=0;j<11;j++)ring(disc,0,.012,0,.13+j*.013,.004,['#c6c8ba','#b0c0b8','#c7b7b7','#bad0c9'][j%4],PI/2);
 cylinder(.09,.09,.02,'#b37f4c',0,.02,0,disc);const mark=box(.13,.005,.012,C.cream,.15,.025,0,disc,.001);cylinder(.022,.022,.025,C.ink,0,.03,0,disc);
 const lid=group(0,1.00,-.36,cd);box(1.16,.025,.75,new THREE.MeshPhysicalMaterial({color:'#bcc9bc',transparent:true,opacity:.23,roughness:.12,metalness:.1,side:THREE.DoubleSide}),0,0,.36,lid,.025);for(const x of [-.57,.57])box(.018,.028,.75,C.gold,x,0,.36,lid,.003);
 const equalizer=[];for(let i=0;i<5;i++)equalizer.push(box(.018,.035,.008,new THREE.MeshBasicMaterial({color:'#d3d78c'}),.36+i*.035,.875,.389,cd,.002));
 for(const x of [-.72,.72]){box(.26,.47,.40,'#354b40',x,1.06,0,cd,.03);for(const y of [.98,1.16]){const c=cylinder(.083,.083,.025,'#26372e',x,y,.22,cd);c.rotation.x=PI/2;ring(cd,x,y,.238,.06,.008,C.gold);}}
 const deckLabel=textPlane('FANCY FM',.54,.07,C.ink,null,80);deckLabel.position.set(-.05,.885,.386);cd.add(deckLabel);
 // A physical pop-up book: paper house, moon and warm window light.
 const album=add('album',group(-1.24,1.07,1.20),'翻开立体小书',[-2.3,4.8,4.3],[-1.65,1.36,1.15]);album.rotation.y=-.10;
 const popupBook=makePopupBook(album);
 // Ivory instant camera, motor-fed print and a slowly developing image.
 const camera=add('camera',group(.70,1.07,.80),'拍立得 · 留住这一刻',[],[.70,1.38,.95]);camera.rotation.y=-.13;
 box(.80,.46,.44,'#eee7d5',0,.27,0,camera,.085);box(.77,.17,.20,'#9dab97',0,.10,.26,camera,.035);
 const lens=cylinder(.15,.15,.13,'#405048',.07,.31,.27,camera);lens.rotation.x=PI/2;ring(camera,.07,.31,.345,.124,.013,C.gold);const lensglass=cylinder(.087,.087,.012,'#536c67',.07,.31,.35,camera);lensglass.rotation.x=PI/2;
 box(.17,.085,.018,'#c1c9bd',-.24,.41,.235,camera,.012);box(.08,.07,.025,'#35433d',.26,.43,.24,camera,.008);cylinder(.044,.044,.03,'#b67453',.26,.515,.02,camera);
 for(let i=0;i<4;i++)box(.025,.10,.012,['#bd8b66','#d1b878','#94aaa0','#8da7b3'][i],-.27+i*.026,.28,.234,camera,.001);
 box(.57,.022,.015,'#2f3e35',0,.078,.369,camera,.002);const cameraLabel=textPlane('INSTANT',.25,.045,'#405048',null,110);cameraLabel.position.set(.05,.53,.11);camera.add(cameraLabel);
 const print=group(0,.078,.105,camera);box(.52,.009,.52,'#fff8e7',0,0,0,print,.009);
 const printMat=new THREE.MeshStandardMaterial({map:arts[0],transparent:true,opacity:0,roughness:1});const pp=mesh(new THREE.PlaneGeometry(.44,.33),printMat,0,.006,-.028,print);pp.rotation.x=-PI/2;print.userData.action='camera';print.visible=false;
 const flash=box(.17,.085,.025,new THREE.MeshBasicMaterial({color:'#fffbe9',transparent:true,opacity:0}),-.24,.41,.25,camera,.009);
 // Two physical page turns, October 11 -> 12 -> 13, then hold the birthday.
 const calendar=add('calendar',group(1.43,1.07,1.56),'翻到 10 月 13 日',[],[1.43,1.49,1.56]);calendar.rotation.y=-.10;
 box(.64,.045,.43,C.walnut,0,.024,0,calendar,.018);const stand=box(.54,.74,.07,C.walnut,0,.40,-.09,calendar,.015);stand.rotation.x=-.12;
 function calendarMap(day){return canvasTexture((c,W,H)=>{c.fillStyle='#f2e5ca';c.fillRect(0,0,W,H);c.fillStyle='#526553';c.textAlign='center';c.font='38px Georgia';c.fillText('OCTOBER',W/2,110);c.fillStyle='#8d4937';c.font='230px Georgia';c.fillText(String(day),W/2,370);c.fillStyle='#526553';c.font='28px Georgia';c.fillText(day===13?'HAPPY BIRTHDAY':'A LITTLE CLOSER',W/2,485);c.font='italic 36px Georgia';c.fillText('Fancy',W/2,560)},512,640);}
 const calMaps=[11,12,13].map(calendarMap),calMat=new THREE.MeshStandardMaterial({map:calMaps[0],roughness:1,transparent:true});
 const backPage=mesh(new THREE.PlaneGeometry(.52,.70),new THREE.MeshStandardMaterial({map:calMaps[0],roughness:1}),0,.405,.024,calendar);backPage.rotation.x=-.11;
 const calPage=group(0,.755,-.015,calendar);calPage.rotation.x=-.11;
 mesh(new THREE.PlaneGeometry(.52,.70),calMat,0,-.35,.028,calPage);
 const calReverse=mesh(new THREE.PlaneGeometry(.52,.70),new THREE.MeshStandardMaterial({color:'#d9c8a9',transparent:true}),0,-.35,.022,calPage);calReverse.rotation.y=PI;
 for(let i=0;i<5;i++)ring(calendar,-.21+i*.105,.755,.01,.03,.008,C.gold,PI/2);
 // Cake piped in three rows, berries, five candle flames and smoke.
 const cake=add('cake',group(-.30,1.075,.48),'许一个生日愿望',[2.2,3.8,5.8],[-.30,1.48,.48]);
 cylinder(.68,.68,.035,C.cream,0,.02,0,cake);ring(cake,0,.04,0,.64,.012,C.gold,PI/2);cylinder(.53,.54,.46,'#f0dfbb',0,.29,0,cake);
 for(let row=0;row<2;row++)for(let j=0;j<28;j++){const a=j*TAU/28;ball(Math.sin(a)*.52,row?.52:.09,Math.cos(a)*.52,.043,.036,.051,'#fff0d4',cake);}
 for(let j=0;j<30;j++){const a=j*TAU/30;tube([[Math.sin(a)*.54,.12,Math.cos(a)*.54],[Math.sin(a+.025)*.54,.28,Math.cos(a+.025)*.54],[Math.sin(a)*.54,.46,Math.cos(a)*.54]],.007,'#fff2d6',cake);}
 for(let j=0;j<6;j++){const a=j*TAU/6;ball(Math.sin(a)*.39,.58,Math.cos(a)*.39,.061,.092,.062,'#a34832',cake);ball(Math.sin(a+.4)*.39,.55,Math.cos(a+.4)*.39,.061,.038,.063,C.cream,cake);}
 const flames=[],smoke=[];for(let j=0;j<5;j++){const x=(j-2)*.14,z=j%2?.09:-.08;cylinder(.022,.022,.36,j%2?'#d0a262':'#5d826d',x,.72,z,cake);cylinder(.004,.004,.035,C.ink,x,.92,z,cake);const f=ball(x,.97,z,.035,.085,.025,new THREE.MeshBasicMaterial({color:'#ffd36e'}),cake);flames.push(f);const inner=ball(0,-.016,.004,.013,.035,.014,new THREE.MeshBasicMaterial({color:'#fff2bb'}),f);inner.scale.set(.38,.48,.45);
  const s=ball(x,1.02,z,.023,.023,.023,new THREE.MeshBasicMaterial({color:'#dbd8c6',transparent:true,opacity:0,depthWrite:false}),cake);smoke.push(s);}
 const candleLight=new THREE.PointLight('#ffb75e',3,3,2);candleLight.position.set(0,.85,0);cake.add(candleLight);
 const topper=textPlane('FANCY',.49,.15,'#835a35',null,90);topper.position.set(0,.58,.38);cake.add(topper);
 // Physical envelope opens, then a blank sheet unfolds out of it.
 const letter=add('letter',group(-.25,1.075,1.62),'打开给 Fancy 的信',[.8,3.1,5.2],[-.25,1.6,1.62]);letter.rotation.y=.06;
 box(.73,.025,.43,'#ead9b9',0,0,0,letter,.01);
 const flap=group(0,.02,-.215,letter);const shape=new THREE.Shape();shape.moveTo(-.36,0);shape.lineTo(.36,0);shape.lineTo(0,.30);shape.closePath();const fm=mesh(new THREE.ShapeGeometry(shape),new THREE.MeshStandardMaterial({color:'#d6bd92',side:THREE.DoubleSide}),0,0,0,flap);fm.rotation.x=PI/2;
 const seal=cylinder(.065,.065,.012,'#8f4938',0,.027,.045,letter);const initial=textPlane('F',.065,.065,C.gold,null,200);initial.rotation.x=-PI/2;initial.position.set(0,.035,.045);letter.add(initial);
 const paper=group(0,.015,-.02,letter);box(.65,.006,.39,C.cream,0,0,0,paper,.002);const fold=group(0,0,-.195,paper);box(.65,.006,.39,C.cream,0,0,-.195,fold,.002);const dear=textPlane('Dear Fancy,',.51,.09,C.ink,null,80);dear.rotation.x=-PI/2;dear.position.set(0,.005,-.27);fold.add(dear);paper.visible=false;
 // The book-shelf decoration remains inactive.
 const stars=[];for(let i=0;i<20;i++){const m=ball(0,0,0,.025,.025,.025,new THREE.MeshBasicMaterial({color:'#ffdb8c',transparent:true,opacity:0}),world);stars.push(m);}
 // Books remain still on their shelf.
 add('lamp',room.lamp,'把夜晚点亮',[6,4.8,4.5],[2.68,2.2,-2.44]);
 const steam=[];for(let j=0;j<8;j++){const m=ball(-1.8,1.4+j*.07,.45,.025,.045,.025,new THREE.MeshBasicMaterial({color:'#f4e7cc',transparent:true,opacity:.10,depthWrite:false}),world);steam.push(m);}
 return {items,times,state,flames,candleLight,letter,paper,screenMat,print,printMat,disc,memories,calMaps,popupBook,reset(){state.calendar=0;state.tv=0;screenMat.map=channels[0];calMat.map=backPage.material.map=calMaps[0];calPage.rotation.x=-.11;calMat.opacity=calReverse.material.opacity=1;},act(id,t){times[id]=t;if(id==='cd')state.disc=!state.disc;if(id==='tv'){state.tv=(state.tv+1)%4;screenMat.map=channels[state.tv];screenMat.needsUpdate=true;}if(id==='album')state.album++;if(id==='calendar')state.calendar=0},
  animate(t,{blow=-100,celebrate=-100}={}){
   const dt=id=>t-times[id],pulse=(id,end=3)=>phase(dt(id),0,.5)*(1-phase(dt(id),end,end+.6));
   const p=pulse('phone',2.6);receiver.position.y=.43+p*.44;receiver.position.z=-.18+p*.18;receiver.rotation.z=p*.23;phoneBody.rotation.z=dt('phone')<.5&&dt('phone')>=0?Math.sin(t*50)*.025:0;cord.scale.y=1+p*1.2;
   lid.rotation.x=-.32-pulse('cd',1.5)*.95;if(state.disc)discAngle+=Math.max(0,t-lastTime)*4;disc.rotation.y=discAngle;lastTime=t;equalizer.forEach((m,i)=>m.scale.y=state.disc?1+Math.sin(t*8+i)*.65: .25);
   popupBook.animate(dt('album'));
   const ca=dt('camera');print.visible=times.camera>=0;print.position.z=.105+phase(ca,.20,1.90)*.52;print.position.y=.078;print.rotation.x=0;printMat.opacity=phase(ca,1.25,3.1);flash.material.opacity=ca>=0&&ca<.16?Math.sin(ca/.16*PI):0;camera.rotation.z=ca>=0&&ca<.35?Math.sin(ca*22)*.015:0;
   const cf=dt('calendar');
   if(times.calendar<0){state.calendar=0;calMat.map=backPage.material.map=calMaps[0];calPage.rotation.x=-.11;calMat.opacity=calReverse.material.opacity=1;}
   else {const turning=cf<.72||(cf>=1.40&&cf<2.12),index=cf<.72?0:cf<2.12?1:2,local=cf<.72?cf:cf-1.40;state.calendar=index;
    if(turning){calMat.map=calMaps[index];backPage.material.map=calMaps[index+1];calPage.rotation.x=-.11-phase(local,0,.72)*PI;calMat.opacity=calReverse.material.opacity=1-phase(local,.52,.71);}
    else{calMat.map=backPage.material.map=calMaps[index];calPage.rotation.x=-.11;calMat.opacity=calReverse.material.opacity=1;}}
   const be=dt('books');room.magic.position.z=pulse('books',2.5)*.32;stars.forEach((m,i)=>{const u=(be*.7+i/20)%1;m.material.opacity=be>=0&&be<3.5?Math.sin(PI*clamp(be/3.5))*.85:0;m.position.set(-3.5+Math.sin(i*2.4+be)*(.2+u*.9),2.5+u*1.6,-3.0+Math.cos(i*2.4)*u*.9);});
   const blew=t-blow;flames.forEach((f,i)=>{f.visible=blow<0||blew<0;f.scale.set(.035*(1+Math.sin(t*15+i)*.12),.085*(1+Math.cos(t*12+i)*.12),.025);f.rotation.z=Math.sin(t*13+i)*.11;});candleLight.intensity=blow<0||blew<0?2.8+Math.sin(t*9)*.3:0;
   smoke.forEach((m,i)=>{m.material.opacity=blew>=0&&blew<2.6?(1-blew/2.6)*.25:0;m.position.y=1.02+Math.max(0,blew)*.25;m.position.x=(i-2)*.14+Math.sin(blew*4+i)*.04;m.scale.setScalar(.025+Math.max(0,Math.min(blew,3))*.035);});
   const le=dt('letter'),l=pulse('letter',30);flap.rotation.x=-l*2.5;seal.visible=l<.1;initial.visible=l<.1;paper.visible=l>.08;paper.position.z=-.02-phase(le,.25,.85)*.28;paper.position.y=.015+phase(le,.65,1.4)*.48;paper.rotation.x=-phase(le,.65,1.4)*.8;fold.rotation.x=(1-phase(le,1,1.8))*PI;
   steam.forEach((m,i)=>{const u=(t*.38+i/8)%1;m.position.y=1.32+u*.55;m.position.x=-1.8+Math.sin(t*2+i)*.04;m.material.opacity=Math.sin(u*PI)*.095;});
  }};
}
