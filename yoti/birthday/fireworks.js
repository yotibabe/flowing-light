import {THREE,PI,clamp,phase} from './core.js';

// Two quiet bursts in the open space beside the birthday greeting.
export function makeFireworks(scene){
 const root=new THREE.Group();scene.add(root);root.visible=false;
 const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const ctx=canvas.getContext('2d');
 const glow=ctx.createRadialGradient(32,32,0,32,32,32);glow.addColorStop(0,'#fff');glow.addColorStop(.14,'#fff');glow.addColorStop(.42,'rgba(255,255,255,.4)');glow.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,64,64);const sprite=new THREE.CanvasTexture(canvas);
 const rand=i=>{const x=Math.sin(i*127.1+37.8)*43758.5453;return x-Math.floor(x);};
 const bursts=[{at:6.03,x:-.66,y:.47,colors:['#ffdfa5','#f8bd73','#fff5d8']},{at:6.53,x:.67,y:.38,colors:['#ffcfb0','#e7aa93','#f9e5b8']}].map((spec,b)=>{
  const count=100,positions=new Float32Array(count*3),colors=new Float32Array(count*3),tails=new Float32Array(count*6),tailColors=new Float32Array(count*6),seeds=[];
  for(let i=0;i<count;i++){
   const angle=i*PI*2/count,depth=(rand(i+11+b*100)-.5)*.65,speed=.58+rand(i+62)*.48;
   seeds.push({x:Math.cos(angle)*speed,y:Math.sin(angle)*speed,z:depth,w:rand(i+31)*5});
   const color=new THREE.Color(spec.colors[i%spec.colors.length]).multiplyScalar(1.6);color.toArray(colors,i*3);color.toArray(tailColors,i*6);color.clone().multiplyScalar(.22).toArray(tailColors,i*6+3);
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  const mat=new THREE.PointsMaterial({map:sprite,size:.12,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false,toneMapped:false});
  const particles=new THREE.Points(geo,mat);particles.frustumCulled=false;particles.renderOrder=20;root.add(particles);
  const tailGeo=new THREE.BufferGeometry();tailGeo.setAttribute('position',new THREE.BufferAttribute(tails,3));tailGeo.setAttribute('color',new THREE.BufferAttribute(tailColors,3));
  const tailMat=new THREE.LineBasicMaterial({vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false,toneMapped:false});
  const trail=new THREE.LineSegments(tailGeo,tailMat);trail.frustumCulled=false;trail.renderOrder=19;root.add(trail);
  return {...spec,seeds,positions,tails,geo,tailGeo,mat,tailMat,particles,trail};
 });
 let active=false;
 return {get active(){return active;},animate(t,camera){
  active=t>=5.48&&t<8.35;root.visible=active;if(!active)return;
  root.position.copy(camera.position);root.quaternion.copy(camera.quaternion);
  const depth=12,height=2*depth*Math.tan(camera.fov*PI/360),width=height*camera.aspect,radius=Math.min(height*.19,width*.145);
  bursts.forEach(b=>{
   const age=t-b.at,launch=age<0,shown=age>=-.55&&age<1.82;b.particles.visible=b.trail.visible=shown;if(!shown)return;
   const cx=width*b.x*.5,cy=height*b.y*.5,fade=launch?phase(age,-.55,-.38):1-phase(age,.65,1.82);
   b.mat.opacity=fade;b.tailMat.opacity=fade*.95;b.mat.size=radius*.20;b.geo.setDrawRange(0,launch?1:b.seeds.length);b.tailGeo.setDrawRange(0,launch?2:b.seeds.length*2);
   for(let i=0;i<b.seeds.length;i++){
    const s=b.seeds[i],k=i*3,tk=i*6;
    for(let end=0;end<2;end++){
     const a=Math.max(0,age-end*.14),travel=(1-Math.exp(-a*2.9)),fall=a*a*.18;
     let x,y,z;
     if(launch){const p=clamp((age+.55)/.55);x=cx+Math.sin(p*4)*radius*.035;y=cy-(1-p)*radius*1.9-end*radius*.24;z=-depth;}
     else{x=cx+s.x*travel*radius;y=cy+(s.y*travel-fall)*radius;z=-depth+s.z*travel*radius;}
     b.tails[tk+end*3]=x;b.tails[tk+end*3+1]=y;b.tails[tk+end*3+2]=z;
     if(!end){b.positions[k]=x;b.positions[k+1]=y;b.positions[k+2]=z;}
    }
   }
   b.geo.attributes.position.needsUpdate=true;b.tailGeo.attributes.position.needsUpdate=true;
  });
 }};
}
