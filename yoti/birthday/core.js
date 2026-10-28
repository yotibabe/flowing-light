import * as THREE from './vendor/three.module.js';
export {THREE};
export const PI=Math.PI,TAU=PI*2,clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),mix=THREE.MathUtils.lerp;
export const ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10)};
export const phase=(t,a,b)=>ease((t-a)/(b-a));
const geometries=new Map(),materials=new Map();
const rand=i=>{const q=Math.sin(i*127.17+12.8)*45758.2;return q-Math.floor(q)};
function tex(kind){
 const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');x.fillStyle=kind==='wood'?'#ededed':'#b8b8b8';x.fillRect(0,0,512,512);
 if(kind==='wood'){
  for(let j=0;j<1100;j++){const y=rand(j)*512;x.strokeStyle=`rgba(${rand(j+3)>.5?'255,255,255':'40,30,20'},${.03+rand(j+4)*.12})`;x.lineWidth=.25+rand(j+2)*1.2;x.beginPath();for(let k=0;k<=16;k++){const xx=k*32,yy=y+Math.sin(k*.34+j)*2.2+Math.sin(k*.8+j)*.8;k?x.lineTo(xx,yy):x.moveTo(xx,yy)}x.stroke()}
 }else if(kind==='linen'){
  for(let i=0;i<512;i+=2){x.fillStyle=i%4?'#a5a5a5':'#d0d0d0';x.fillRect(i,0,1,512);x.globalAlpha=.5;x.fillRect(0,i,512,1);x.globalAlpha=1;}
 }else{
  const d=x.getImageData(0,0,512,512);for(let i=0;i<d.data.length;i+=4){const v=165+rand(i)*70;d.data[i]=d.data[i+1]=d.data[i+2]=v;}x.putImageData(d,0,0);
 }
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(kind==='linen'?5:2,kind==='wood'?3:5);t.anisotropy=8;return t;
}
const textures={wood:tex('wood'),linen:tex('linen'),paper:tex('paper')};
const woodColors=['#886044','#bd956e','#b88c63','#a8835e','#795c42','#a5835c','#7d5237','#a67b51'];
const fabricColors=['#5c7e91','#6f91a2','#caa35a','#f0e5cc','#bb704c','#e5d7b6','#eee6d3','#d9c59e','#547b7e','#719294','#466f75','#658a8d'];
export function material(color,roughness=.55,metalness=0){
 const id=[color,roughness,metalness].join('|');if(materials.has(id))return materials.get(id);
 let m;
 if(metalness>.3)m=new THREE.MeshPhysicalMaterial({color,roughness:Math.min(roughness,.28),metalness:.82,clearcoat:.25,clearcoatRoughness:.2,envMapIntensity:1.25});
 else m=new THREE.MeshStandardMaterial({color,roughness,metalness});
 if(woodColors.includes(color)){m.bumpMap=textures.wood;m.bumpScale=.004;m.roughness=.46;m.map=textures.wood;}
 else if(fabricColors.includes(color)){m.bumpMap=textures.linen;m.bumpScale=.018;m.roughness=.92;}
 else if(roughness>.8){m.bumpMap=textures.paper;m.bumpScale=.016;}
 materials.set(id,m);return m;
}
export const M={cream:material('#f4eddf',.85),wood:material('#bd956e'),green:material('#3e6660',.36),mint:material('#b7c6a2'),pink:material('#c27c62'),gold:material('#d2ad67',.22,.85),orange:material('#d9a56b'),dark:material('#293c39',.4),white:material('#fff7e9',.7)};
export const world=new THREE.Group();
export function group(x=0,y=0,z=0,p=world){const g=new THREE.Group();g.position.set(x,y,z);p.add(g);return g;}
export function mesh(geo,mat,x=0,y=0,z=0,p=world){const m=new THREE.Mesh(geo,typeof mat==='string'?material(mat):mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;p.add(m);return m;}
export function rounded(w,h,d,r=.06){
 r=Math.min(r,w/2-.001,h/2-.001,d/2-.001);const id=[w,h,d,r].join('|');if(geometries.has(id))return geometries.get(id);
 const g=new THREE.BoxGeometry(1,1,1,10,10,10),a=g.attributes.position,n=g.attributes.normal,v=new THREE.Vector3(),q=new THREE.Vector3();
 for(let i=0;i<a.count;i++){v.fromBufferAttribute(a,i);q.set(clamp(v.x,-.3,.3),clamp(v.y,-.3,.3),clamp(v.z,-.3,.3));v.sub(q).normalize();a.setXYZ(i,q.x/.3*(w/2-r)+v.x*r,q.y/.3*(h/2-r)+v.y*r,q.z/.3*(d/2-r)+v.z*r);n.setXYZ(i,v.x,v.y,v.z)}g.computeBoundingSphere();geometries.set(id,g);return g;
}
export const box=(w,h,d,mat,x=0,y=0,z=0,p=world,r=.05)=>mesh(rounded(w,h,d,r),mat,x,y,z,p);
const sphere=new THREE.SphereGeometry(1,32,24);
export function ball(x,y,z,sx,sy,sz,mat,p=world){const m=mesh(sphere,mat,x,y,z,p);m.scale.set(sx,sy,sz);return m;}
export function cylinder(rt,rb,h,mat,x=0,y=0,z=0,p=world){const id=`c|${rt}|${rb}|${h}`;if(!geometries.has(id))geometries.set(id,new THREE.CylinderGeometry(rt,rb,h,48));return mesh(geometries.get(id),mat,x,y,z,p);}
export function tube(points,r,mat,p=world){const c=new THREE.CatmullRomCurve3(points.map(v=>new THREE.Vector3(...v)));return mesh(new THREE.TubeGeometry(c,Math.max(16,points.length*8),r,8,false),mat,0,0,0,p);}
export function label(text,w,h,color='#36514b',background=null,font='italic 64px Georgia'){
 const c=document.createElement('canvas');c.width=1536;c.height=768;const x=c.getContext('2d');x.scale(1.5,1.5);if(background){x.fillStyle=background;x.fillRect(0,0,1024,512)}x.fillStyle=color;x.font=font;x.textAlign='center';x.textBaseline='middle';const lines=text.split('\n'),base=Number(font.match(/(\d+)px/)[1]),width=Math.max(...lines.map(s=>x.measureText(s).width));const size=Math.min(350/lines.length,base*900/Math.max(1,width));x.font=font.replace(/\d+px/,size+'px');lines.forEach((s,i)=>x.fillText(s,512,256+(i-(lines.length-1)/2)*size*1.1));const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false}));return m;
}
const aoCanvas=document.createElement('canvas');aoCanvas.width=aoCanvas.height=128;const ac=aoCanvas.getContext('2d'),gr=ac.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(33,25,17,.4)');gr.addColorStop(.38,'rgba(33,25,17,.25)');gr.addColorStop(1,'rgba(33,25,17,0)');ac.fillStyle=gr;ac.fillRect(0,0,128,128);const aoTex=new THREE.CanvasTexture(aoCanvas);
export function contact(x,z,w,d,y=.275,p=world,opacity=1){const s=mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshBasicMaterial({map:aoTex,transparent:true,depthWrite:false,opacity}),x,y,z,p);s.rotation.x=-PI/2;s.castShadow=false;return s;}
export function petal(length,width,bend,mat,p){
 const pos=[],ind=[],N=20,K=12;
 for(let i=0;i<=N;i++)for(let j=0;j<=K;j++){const t=i/N,q=j/K*2-1,ww=width*Math.pow(Math.sin(PI*t),.78);pos.push(q*ww,length*t,bend*t*t+.065*q*q*Math.sin(PI*t));}
 for(let i=0;i<N;i++)for(let j=0;j<K;j++){const a=i*(K+1)+j,b=a+K+1;ind.push(a,b,a+1,b,b+1,a+1)}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(ind);g.computeVertexNormals();const m=mesh(g,mat,0,0,0,p);m.material.side=THREE.DoubleSide;return m;
}
export const U={THREE,group,mesh,box,ball,cylinder,tube,material,label,M};
