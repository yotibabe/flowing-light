import {batchStaticSiblings} from './static-batches.js';
import {THREE,world,group,box,ball,cylinder,mesh,tube,material,contact,PI,TAU,phase,clamp} from './core.js';
import {C,canvasTexture,picture,textPlane,ring,mug,book,plant,rugTexture} from './decor.js';
export function makeRoom(){
 const root=group(),lights=[],bulbs=[],curtains=[],leaves=[];
 const nightSky=new THREE.Color('#203b53'),dayWindow=new THREE.Color('#cbd7c7');
 const wood=material(C.walnut,.48);const floorColors=['#ad8058','#a67b51','#b88c63','#9d704c','#bd956e'];
 box(10.4,.30,8.1,wood,0,0,0,root,.12);box(10.18,.035,7.9,'#483d2d',0,.17,0,root,.03);
 for(let j=0;j<17;j++)for(let i=0;i<4;i++){const len=i===0||i===3?2.53:2.54;box(len-.018,.045,.445,floorColors[(i+j*3)%5],-3.82+i*2.545,.20,-3.7+j*.458,root,.004);}
 for(const x of [-5.13,5.13])box(.025,.035,8,C.gold,x,.17,0,root,.003);box(10.28,.035,.025,C.gold,0,.17,4,root,.003);
 box(10.35,4.9,.19,C.wall,0,2.65,-3.96,root,.025);box(.18,4.9,4.8,C.wall,-5.10,2.65,-1.65,root,.025);
 // Panel mouldings and the low wainscot continue around the room.
 for(const y of [.3,1.1,4.96]){box(10.2,.075,.11,C.trim,0,y,-3.81,root,.012);box(.11,.075,4.8,C.trim,-4.97,y,-1.65,root,.012);}
 for(let i=0;i<9;i++){const x=-4.6+i*1.15;for(const dx of [-.48,.48])box(.024,.62,.04,C.trim,x+dx,.7,-3.83,root,.004);for(const y of [.39,1.01])box(.97,.024,.04,C.trim,x,y,-3.83,root,.004);}
 box(.13,.31,3.25,C.wall,5.10,.36,2.40,root,.02);
 const rug=mesh(new THREE.PlaneGeometry(7.6,4.5),new THREE.MeshStandardMaterial({map:rugTexture(),roughness:1}),.25,.24,1.23,root);rug.rotation.x=-PI/2;rug.castShadow=false;
 for(let i=0;i<60;i++){for(const side of [-1,1])tube([[-3.48+i*.126,.246,1.23+side*2.23],[-3.48+i*.126,.245,1.23+side*2.38]],.008,'#cfb58b',root);}
 // A city beyond a deep window, with a real sill and separated panes.
 const windowRoot=group(1.55,3.0,-3.78,root);const skyMat=new THREE.MeshBasicMaterial({color:'#b8cfca'});mesh(new THREE.PlaneGeometry(3.25,2.45),skyMat,0,0,-.04,windowRoot);
 const city=group(0,-1.10,.005,windowRoot);const windows=[];
 for(let i=0;i<7;i++){const x=-1.44+i*.46,h=.55+(i*7%5)*.15;box(.43,h,.035,['#81969a','#95a2a0','#afb3a5'][i%3],x,h/2,0,city,.002);box(.48,.05,.06,'#758b88',x,h+.02,.025,city,.002);box(.045,.18,.04,'#738985',x+.13,h+.1,0,city,.002);
  for(let r=0;r<3;r++)for(let k=0;k<2;k++){const mat=new THREE.MeshBasicMaterial({color:'#cbd7c7'});const m=box(.07,.105,.008,mat,x-.1+k*.19,.13+r*.22,.028,city,.001);windows.push(mat);}
 }
 for(const x of [-1.68,0,1.68])box(.085,2.6,.19,C.ink,x,0,.085,windowRoot,.01);for(const y of [-1.28,0,1.28])box(3.43,.07,.19,C.ink,0,y,.085,windowRoot,.01);
 box(3.7,.13,.5,C.wood,0,-1.34,.15,windowRoot,.035);box(3.75,.13,.22,C.walnut,0,1.37,.08,windowRoot,.025);
 const sun=ball(.95,.77,-.018,.19,.19,.015,'#eadca9',windowRoot);sun.material=new THREE.MeshBasicMaterial({color:'#f4dfaa'});
 for(const s of [-1,1]){const geo=new THREE.PlaneGeometry(.72,2.65,20,28);const a=geo.attributes.position;for(let i=0;i<a.count;i++){a.setZ(i,Math.sin(a.getX(i)*38)*.065);}geo.computeVertexNormals();const curtain=mesh(geo,new THREE.MeshStandardMaterial({color:'#d3ba8d',roughness:1,side:THREE.DoubleSide}),s*1.52,-.04,.26,windowRoot);curtains.push({m:curtain,base:Float32Array.from(a.array)});for(let j=0;j<5;j++)ring(windowRoot,s*1.52-.28+j*.14,1.35,.25,.055,.009,C.gold,PI/2);}
 cylinder(.025,.025,3.9,C.gold,0,1.4,.26,windowRoot).rotation.z=PI/2;
 // Full height bookcase: gold stamped spines, ceramic objects and drawers.
 const shelf=group(-3.65,.25,-3.38,root);box(2.0,4.15,.17,C.walnut,0,2.075,-.24,shelf,.025);
 for(const x of [-1,1])box(.12,4.25,.71,C.walnut,x,2.12,0,shelf,.025);
 for(const y of [0,.65,1.9,2.95,4.2]){box(2.16,.13,.76,C.walnut,0,y,0,shelf,.022);box(2.14,.026,.018,C.gold,0,y+.034,.389,shelf,.003);}
 for(let j=0;j<2;j++){box(.91,.44,.59,'#3b5744',-.48+j*.96,.31,.04,shelf,.02);ball(-.48+j*.96,.31,.352,.045,.029,.022,C.gold,shelf);}
 const palettes=['#56705b','#8d493d','#bb995c','#5e6661','#77553d','#3d595c'];const titles=['LITTLE THINGS','SLOW DAYS','CREATIVE LIFE','THE ART OF REST','HERE & NOW','GOOD COMPANY'];
 const magic=group(0,0,0,shelf);
 for(let row=0;row<3;row++){const yy=[.73,1.98,3.03][row];for(let j=0;j<6;j++){const b=book(row===1&&j===3?magic:shelf,-.83+j*.29,yy,.16,.24,.75+(j%3)*.08,palettes[(j+row)%6],titles[j]);if(row===1&&j===3)magic.userData.book=b;}}
 plant(shelf,.65,4.27,-.08,.57);picture(root,-1.55,3.55,-3.80,1.15,1.45,1);picture(root,-.15,4.1,-3.80,.68,.81,2);
 const leftPicture=picture(root,-4.96,3.05,-.80,1.15,1.50,3);leftPicture.rotation.y=PI/2;
 // Leather sofa: curved arms, individual welted cushions and button tufting.
 const sofa=group(-.45,.25,-1.91,root);for(const x of [-1.86,1.86])for(const z of [-.58,.58])cylinder(.055,.042,.28,C.walnut,x,.14,z,sofa);
 box(4.35,.43,1.69,C.leather,0,.47,0,sofa,.16);box(4.19,1.12,.33,C.leather,0,1.20,-.67,sofa,.16);
 for(const s of [-1,1]){box(.40,.82,1.7,C.leather,s*2.01,.92,0,sofa,.19);tube([[s*2.00,.99,.71],[s*2.00,1.31,.55],[s*2.00,1.34,-.53]],.013,'#c2875b',sofa);}
 for(let j=0;j<3;j++){const x=-1.22+j*1.22;box(1.17,.23,1.29,'#b2774e',x,.77,.08,sofa,.1);const back=box(1.18,.89,.33,'#a96843',x,1.30,-.51,sofa,.14);back.rotation.x=-.08;tube([[x-.51,.81,.69],[x+.51,.81,.69],[x+.55,.81,-.40],[x-.55,.81,-.40],[x-.51,.81,.69]],.011,'#d19a6c',sofa);for(const xx of [-.29,.29])ball(x+xx,1.35,-.326,.035,.035,.016,'#8b5334',sofa);}
 const cushion=box(.65,.62,.21,'#d1ac68',-1.32,1.13,-.17,sofa,.11);cushion.rotation.z=.15;const cushion2=box(.61,.64,.20,'#486658',1.3,1.15,-.18,sofa,.11);cushion2.rotation.z=-.17;
 // The central table is deliberately generous enough for the little stories.
 const table=group(-.25,.25,.96,root);box(4.10,.17,1.95,C.walnut,0,.72,0,table,.19);box(3.70,.075,1.55,C.wood,0,.3,0,table,.06);for(const x of [-1.7,1.7])for(const z of [-.68,.68]){const leg=box(.10,.70,.10,C.walnut,x,.35,z,table,.02);leg.rotation.z=x*.024;}
 book(table,-1.21,.36,0,.65,.07,'#8b4e3c','');mug(table,-1.55,.82,-.51,'#57765e');
 // Armchair and drink table; right side leaves room for the dog.
 const chair=group(3.55,.25,.66,root);chair.rotation.y=-.32;
 for(const x of [-.62,.62])for(const z of [-.58,.58]){const leg=box(.08,.81,.08,C.walnut,x,.43,z,chair,.02);leg.rotation.z=x*.16;}
 box(1.40,.27,1.4,'#6a7750',0,.75,0,chair,.13);const cb=box(1.40,1.06,.27,'#68764e',0,1.28,-.61,chair,.14);cb.rotation.x=-.12;
 for(const x of [-.79,.79]){box(.12,.12,1.6,C.walnut,x,1.14,0,chair,.06);box(.07,.45,.07,C.walnut,x,.93,.48,chair,.015);}
 const side=group(3.48,.25,-.86,root);cylinder(.57,.57,.09,C.walnut,0,.82,0,side);for(let j=0;j<3;j++)box(.055,.78,.055,C.walnut,Math.sin(j*TAU/3)*.34,.41,Math.cos(j*TAU/3)*.34,side,.01);mug(side,.12,.87,.09,'#d2b684');
 // Brass pleated lamp; bright shades also illuminate the nearby wall.
 const lamp=group(2.68,.25,-2.44,root);cylinder(.34,.38,.08,C.walnut,0,.04,0,lamp);cylinder(.025,.025,2.76,C.gold,0,1.45,0,lamp);
 const shadeGeo=new THREE.CylinderGeometry(.39,.66,.74,64,1,true),sa=shadeGeo.attributes.position;for(let i=0;i<sa.count;i++){const a=Math.atan2(sa.getX(i),sa.getZ(i)),f=1+.018*Math.cos(a*32);sa.setX(i,sa.getX(i)*f);sa.setZ(i,sa.getZ(i)*f);}shadeGeo.computeVertexNormals();
 const shadeMat=new THREE.MeshStandardMaterial({color:'#e6c98e',emissive:'#e5aa51',emissiveIntensity:.35,roughness:.9,side:THREE.DoubleSide});mesh(shadeGeo,shadeMat,0,2.95,0,lamp);ring(lamp,0,2.58,0,.66,.012,C.gold,PI/2);ring(lamp,0,3.32,0,.39,.012,C.gold,PI/2);
 const lampLight=new THREE.PointLight('#ffd18a',11,7,2);lampLight.position.set(0,2.72,0);lamp.add(lampLight);lights.push(lampLight);
 // A little wall clock and swaying moon mobile.
 const clock=group(-.17,2.65,-3.77,root);cylinder(.30,.30,.09,C.gold,0,0,0,clock).rotation.x=PI/2;const face=cylinder(.266,.266,.014,'#e6d4b1',0,0,.055,clock);face.rotation.x=PI/2;
 for(let j=0;j<12;j++){const m=box(.015,.036,.012,C.ink,Math.sin(j*TAU/12)*.223,Math.cos(j*TAU/12)*.223,.071,clock,.002);m.rotation.z=-j*TAU/12;}
 const minute=group(0,0,.084,clock),hour=group(0,0,.089,clock);box(.014,.19,.009,C.ink,0,.074,0,minute,.004);box(.024,.13,.009,C.ink,0,.044,0,hour,.004);ball(0,0,.1,.025,.025,.015,C.gold,clock);
 const mobile=group(-1.02,4.84,-2.98,root);tube([[0,0,0],[0,-.35,0]],.005,C.gold,mobile);ring(mobile,0,-.56,0,.22,.012,C.gold);for(let j=0;j<3;j++){tube([[(j-1)*.15,-.72,0],[(j-1)*.15,-.9-j%2*.13,0]],.004,C.gold,mobile);const s=ball((j-1)*.15,-.96-j%2*.13,0,.045,.07,.025,C.gold,mobile);s.rotation.z=PI/4;}
 // A strand of lights makes the birthday relighting tangible.
 const lightCable=[];for(let j=0;j<=32;j++)lightCable.push([-4.8+j*.30,4.65-Math.sin(j/32*PI)*.38,-3.64]);tube(lightCable,.009,'#324038',root);
 for(let j=0;j<14;j++){const x=-4.65+j*.71,y=4.65-Math.sin((x+4.8)/9.6*PI)*.38;const mat=new THREE.MeshStandardMaterial({color:'#f6d393',emissive:'#ffbd5d',emissiveIntensity:.7});ball(x,y-.065,-3.64,.045,.065,.045,mat,root);bulbs.push(mat);}
 leaves.push(plant(root,4.60,.25,-3.43,1.20),plant(root,-4.45,.25,3.0,1.02));
 // Cushioned pet bed and a basket of magazines.
 const dogStool=group(2.17,.25,2.62,root);box(1.15,.12,.91,C.walnut,0,.46,0,dogStool,.07);box(1.10,.10,.87,'#b4ac88',0,.55,0,dogStool,.08);for(const x of [-.45,.45])for(const z of [-.31,.31])box(.065,.44,.065,C.walnut,x,.22,z,dogStool,.012);
 const basket=group(-3.67,.25,-.02,root);box(.72,.45,.67,'#b68e5d',0,.24,0,basket,.09);for(let j=0;j<7;j++)box(.74,.016,.69,'#d2af7c',0,.08+j*.055,0,basket,.03);const magazine=book(basket,.0,.25,.06,.51,.65,'#567466','SUNDAY');magazine.rotation.z=.18;
 contact(0,0,12,10,-.16,world,.7);
 const savedCalls=new URLSearchParams(location.search).has('perf-baseline')?0:batchStaticSiblings(root,[...curtains.map(c=>c.m),...leaves,minute,hour,mobile,magic,leftPicture,sun]);
 return {savedCalls,root,table,sofa,shelf,magic,leftPicture,lamp,lampLight,shadeMat,windowRoot,skyMat,windows,sun,bulbs,clock,
  animate(t,night=0,blackout=0,relight=1){
   curtains.forEach(({m,base},j)=>{const a=m.geometry.attributes.position;for(let i=0;i<a.count;i++){const yy=base[i*3+1];a.setZ(i,base[i*3+2]+Math.sin(t*2.2+base[i*3]*4+j)*.055*(1-(yy+1.325)/2.65));}a.needsUpdate=true;});
   leaves.forEach((m,i)=>m.rotation.z=Math.sin(t*1.4+i)*.025);minute.rotation.z=-t*.12;hour.rotation.z=-1.2-t*.01;mobile.rotation.z=Math.sin(t*1.3)*.10;
   skyMat.color.set('#b8cfca').lerp(nightSky,night);sun.material.color.set(night>.5?'#eee8ca':'#f4dfaa');windows.forEach((m,i)=>m.color.set(i%3?'#f4c979':'#91a3a5').lerp(dayWindow,1-night));
   lampLight.intensity=(8+night*5)*(1-blackout);shadeMat.emissiveIntensity=(.22+night*.35)*(1-blackout);
   bulbs.forEach((m,i)=>m.emissiveIntensity=(.3+night*.8)*(1-blackout)+Math.max(0,relight-i/16)*blackout*2.2);
  }};
}
