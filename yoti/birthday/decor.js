import {THREE,group,box,ball,cylinder,mesh,tube,material,PI,petal} from './core.js';
export const C={wall:'#29473f',trim:'#3e5c4c',walnut:'#725038',wood:'#a67b51',leather:'#a5613e',gold:'#cba56b',cream:'#eee1c5',ink:'#263a36',green:'#6a7750',red:'#944a36'};
export function canvasTexture(draw,w=1024,h=1024){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');draw(x,w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
export function artTexture(kind=0){return canvasTexture((x,w,h)=>{
 x.fillStyle=['#ebd9b8','#d7dbca','#d4b38c','#e7d6b7'][kind%4];x.fillRect(0,0,w,h);
 if(kind%4===0){
  x.fillStyle='#d28851';x.beginPath();x.arc(720,245,100,0,PI*2);x.fill();
  ['#b6bba0','#728f81','#456b61'].forEach((c,j)=>{x.fillStyle=c;x.beginPath();x.moveTo(0,h);for(let k=0;k<=12;k++)x.lineTo(k*w/12,480+j*120+Math.sin(k*.7+j*2)*90);x.lineTo(w,h);x.fill();});
  x.strokeStyle='#f4e7ca';x.lineWidth=4;for(let j=0;j<6;j++){x.beginPath();x.moveTo(80,790+j*30);x.bezierCurveTo(300,770+j*30,550,820+j*20,920,780+j*30);x.stroke();}
 }else if(kind%4===1){
  x.fillStyle='#b95739';x.beginPath();x.moveTo(380,550);x.bezierCurveTo(290,940,750,940,650,550);x.fill();
  x.strokeStyle='#3d6150';x.lineWidth=10;for(let j=0;j<8;j++){const ex=200+(j*113)%660,ey=150+(j*73)%350;x.beginPath();x.moveTo(510,650);x.quadraticCurveTo(500,400,ex,ey);x.stroke();x.fillStyle=j%2?'#587958':'#7b8c55';x.beginPath();x.ellipse(ex,ey,70,25,j*.7,0,PI*2);x.fill();}
 }else if(kind%4===2){
  x.fillStyle='#396a70';x.fillRect(0,360,w,h);x.fillStyle='#f1dbab';x.beginPath();x.arc(720,210,95,0,PI*2);x.fill();
  x.fillStyle='#a8ba9e';x.beginPath();x.moveTo(0,460);x.lineTo(450,250);x.lineTo(850,600);x.lineTo(0,720);x.fill();x.strokeStyle='#ebd4ac';x.lineWidth=8;for(let j=0;j<9;j++){x.beginPath();x.moveTo(100+j*53,680+j*22);x.lineTo(250+j*57,680+j*22);x.stroke();}
 }else{
  x.fillStyle='#b88559';x.beginPath();x.ellipse(510,540,210,260,0,0,PI*2);x.fill();x.beginPath();x.moveTo(310,410);x.lineTo(320,180);x.lineTo(455,330);x.lineTo(580,330);x.lineTo(720,180);x.lineTo(705,440);x.fill();
  x.strokeStyle='#373d32';x.lineWidth=13;[430,600].forEach(a=>{x.beginPath();x.arc(a,470,32,0,PI);x.stroke()});x.fillStyle='#eee2c6';x.beginPath();x.ellipse(515,585,65,50,0,0,PI*2);x.fill();x.fillStyle='#89573b';x.beginPath();x.moveTo(495,553);x.lineTo(535,553);x.lineTo(515,574);x.fill();
 }
 x.strokeStyle='rgba(255,248,223,.38)';x.lineWidth=10;x.strokeRect(26,26,w-52,h-52);
 });}
export const arts=[0,1,2,3].map(artTexture);
export function picture(p,x,y,z,w,h,kind=0){const g=group(x,y,z,p);box(w+.15,h+.15,.09,C.walnut,0,0,0,g,.025);box(w+.04,h+.04,.025,C.gold,0,0,.06,g,.006);box(w,h,.015,C.cream,0,0,.078,g,.002);const m=mesh(new THREE.PlaneGeometry(w*.84,h*.84),new THREE.MeshStandardMaterial({map:arts[kind%4],roughness:.9}),0,0,.09,g);m.castShadow=false;return g;}
export function textPlane(text,w,h,color=C.cream,bg=null,size=80){const t=canvasTexture((x,W,H)=>{if(bg){x.fillStyle=bg;x.fillRect(0,0,W,H)}x.fillStyle=color;x.textAlign='center';x.textBaseline='middle';x.font=`${size}px Georgia`;const lines=text.split('\n');lines.forEach((s,i)=>x.fillText(s,W/2,H/2+(i-(lines.length-1)/2)*size*1.25,W*.9));},1024,512);return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:t,transparent:!bg,roughness:.9,side:THREE.DoubleSide}));}
export function ring(p,x,y,z,r,t,color,rx=0){const m=mesh(new THREE.TorusGeometry(r,t,8,40),color,x,y,z,p);m.rotation.x=rx;return m;}
export function mug(p,x,y,z,color=C.cream){const g=group(x,y,z,p);cylinder(.13,.11,.23,color,0,.12,0,g);cylinder(.116,.116,.006,'#5c3925',0,.242,0,g);ring(g,.14,.14,0,.07,.018,color);cylinder(.21,.21,.022,C.cream,0,.012,0,g);return g;}
export function book(p,x,y,z,w,h,color,title='A LITTLE WORLD'){const g=group(x,y,z,p);box(w,h,.37,color,0,h/2,0,g,.015);box(w-.04,h-.065,.36,C.cream,0,h/2,-.008,g,.003);box(w,h,.035,color,0,h/2,.186,g,.008);for(const yy of [.10,h-.1])box(w*.85,.014,.008,C.gold,0,yy,.208,g,.002);const label=textPlane(title,h*.75,w*.75,C.cream,null,64);label.rotation.z=PI/2;label.position.set(0,h/2,.209);g.add(label);return g;}
export function plant(p,x,y,z,s=1,flowers=false){const g=group(x,y,z,p);g.scale.setScalar(s);cylinder(.23,.17,.37,flowers?'#d7bb87':'#ae7250',0,.18,0,g);cylinder(.22,.22,.025,'#403c29',0,.37,0,g);
 for(let j=0;j<(flowers?9:8);j++){const a=j*2.4,ex=Math.sin(a)*.30,ez=Math.cos(a)*.28,yy=.8+(j%3)*.13;tube([[0,.3,0],[ex*.5,.62,ez*.5],[ex,yy,ez]],.011,'#66784c',g);const l=petal(.38,.10,.13,material(j%2?'#6d8755':'#4e7051'),g);l.position.set(ex*.5,.55,ez*.5);l.rotation.set(.6,a,.7);if(flowers){const f=group(ex,yy,ez,g);ball(0,0,0,.047,.04,.047,C.gold,f);for(let k=0;k<7;k++){const b=ball(Math.sin(k*PI*2/7)*.07,.018,Math.cos(k*PI*2/7)*.07,.042,.018,.08,j%3?'#f0dec0':'#bd7554',f);b.rotation.y=k*PI*2/7;}}}
 return g;}
export function rugTexture(){return canvasTexture((x,w,h)=>{
 x.fillStyle='#8d4937';x.fillRect(0,0,w,h);
 for(let y=0;y<h;y+=3){x.fillStyle=y%6?'rgba(242,214,183,.055)':'rgba(43,25,20,.05)';x.fillRect(0,y,w,1);}
 for(let i=0;i<w;i+=4){x.fillStyle=i%8?'rgba(244,211,181,.025)':'rgba(52,29,24,.025)';x.fillRect(i,0,1,h);}
 });}
