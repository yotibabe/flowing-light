const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
const lerp=(a,b,t)=>a+(b-a)*t;
export const HOME={x:0,y:1.8,z:0,yaw:Math.atan2(8.3,16),pitch:Math.atan2(6.7,Math.hypot(8.3,16)),distance:Math.hypot(8.3,6.7,16),width:13.2};
const settings={tv:[5.2,3.9,.26,.30],phone:[5.0,3.8,.30,.44],cd:[5.7,4.2,.30,.48],gallery:[4.7,2.9,1.42,.05],album:[2.3,1.85,.15,.65],camera:[4.7,3.5,.32,.48],calendar:[4.2,2.9,.32,.24],present:[5.4,3.8,.36,.46],cake:[5.8,4.0,.32,.42],letter:[5.8,4,.32,.53],lamp:[8,5.2,.36,.32],pets:[7.5,5,.36,.43],dog:[4.7,3.7,.36,.40],rest:[12.2,8.2,.38,.38]};
export function viewFor(id,look){if(id==='home')return {...HOME};if(id==='table')return {x:0,y:1.4,z:.85,distance:9.2,width:6.3,yaw:.37,pitch:.49};const [distance,width,yaw,pitch]=settings[id]||settings.cake;return {x:look[0],y:look[1],z:look[2],distance,width,yaw,pitch};}
export function cameraPose(v,aspect,fov=34){const distance=Math.max(v.distance,(v.width*(aspect<.8?.74:1))/(2*Math.tan(fov*Math.PI/360)*aspect));const horizontal=distance*Math.cos(v.pitch);return {position:v.eye?[...v.eye]:[v.x+horizontal*Math.sin(v.yaw),v.y+distance*Math.sin(v.pitch),v.z+horizontal*Math.cos(v.yaw)],target:[v.x,v.y,v.z]};}
export class CameraRig{
 constructor(){this.current={...HOME};this.queue=[];this.end=0;this.view='home';this.aspect=16/9;}
 sample(time){while(this.queue.length){const s=this.queue[0],k=smooth((time-s.start)/s.duration);for(const key of Object.keys(HOME))this.current[key]=lerp(s.from[key],s.to[key],k);this.current.eye=s.a.map((v,i)=>lerp(v,s.b[i],k));if(k<1)break;this.queue.shift();}return this.current;}
 go(to,time,{duration=1.0,view='',via=null}={}){this.sample(time);const from={...this.current,eye:this.current.eye?[...this.current.eye]:undefined},target={...to};this.queue=[{from,to:target,a:cameraPose(from,this.aspect).position,b:cameraPose(target,this.aspect).position,start:time,duration}];if(via){const mid={...via};const midEye=cameraPose(mid,this.aspect).position;this.queue[0].to=mid;this.queue[0].b=midEye;this.queue[0].duration=.72;this.queue.push({from:mid,to:target,a:midEye,b:cameraPose(target,this.aspect).position,start:time+.72,duration});}this.end=time+duration+(via?.72:0);this.view=view;return this.end;}
 freeze(time){this.sample(time);this.queue=[];this.end=time;this.view='custom';}
 orbitOrigin(time){this.freeze(time);const v=this.current,p=cameraPose(v,this.aspect),d=p.position.map((n,i)=>n-p.target[i]),distance=Math.hypot(...d);v.distance=distance;v.width=0;v.yaw=Math.atan2(d[0],d[2]);v.pitch=Math.asin(d[1]/distance);delete v.eye;return {yaw:v.yaw,pitch:v.pitch};}
 orbit(yaw,pitch){this.current.yaw=clamp(yaw,-.2,1.48);this.current.pitch=clamp(pitch,.08,.78);delete this.current.eye;}
}
