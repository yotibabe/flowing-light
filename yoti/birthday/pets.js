import {THREE,group,ball,mesh,tube,material,PI,phase} from './core.js';
export function makePets(){
 const pets=[];
 for(const cat of [true]){
  const root=group(cat?.35:2.15,cat?1.14:.44,cat?-1.65:2.65);root.rotation.y=cat?.20:-.40;root.scale.setScalar(cat?.95:1.10);
  const coat=material(cat?'#b49b7b':'#b7804c',.9),cream=material('#eee0c4',.9),ink=material('#303b31'),earmat=material(cat?'#b78072':'#895d3d',.9);
  const body=group(0,0,0,root);ball(0,.29,-.09,.26,.32,.30,coat,body);ball(0,.30,.12,.20,.24,.13,cream,body);
  for(const s of [-1,1]){ball(s*.21,.11,-.11,.13,.12,.21,coat,body);ball(s*.11,.11,.24,.078,.13,.10,cream,body);}
  const head=group(0,.67,.09,body);ball(0,0,0,cat?.25:.255,cat?.22:.23,.22,coat,head);
  if(cat){for(const s of [-1,1]){const shape=new THREE.Shape();shape.moveTo(-.10,0);shape.lineTo(-.065,.23);shape.quadraticCurveTo(-.02,.24,.10,0);shape.closePath();const e=mesh(new THREE.ExtrudeGeometry(shape,{depth:.07,bevelEnabled:true,bevelSize:.02,bevelThickness:.015,bevelSegments:2}),coat,s*.17,.12,-.07,head);e.rotation.z=-s*.16;const inside=ball(s*.165,.21,.003,.052,.09,.014,earmat,head);inside.rotation.z=-s*.22;}
   for(let i=-1;i<=1;i++){const b=ball(i*.045,.125,.17,.012,.043,.012,'#88765f',head);b.rotation.z=-i*.25;}
  }else{for(const s of [-1,1]){const e=ball(s*.24,-.02,-.025,.085,.20,.085,earmat,head);e.rotation.z=-s*.17;}ball(0,.055,.20,.047,.14,.025,cream,head);}
  const eyes=[];for(const s of [-1,1]){const eye=group(s*.089,.008,.201,head);ball(0,0,0,.025,.030,.012,ink,eye);ball(-.005,.009,.010,.006,.006,.004,'#fff7e4',eye);eyes.push(eye);ball(s*.042,-.06,.20,cat?.056:.075,.045,cat?.042:.070,cream,head);if(cat)for(let j=0;j<2;j++)tube([[s*.07,-.05-j*.027,.237],[s*.19,-.03-j*.045,.22],[s*.28,-.02-j*.05,.18]],.0027,Cream(),head);}
  ball(0,-.04,cat?.254:.282,.025,.017,.018,cat?'#ab7f6c':ink,head);tube([[0,-.057,.26],[0,-.084,.253],[.032,-.09,.24]],.0035,ink,head);
  const tail=group(0,.16,-.27,root);tube(cat?[[0,0,0],[.30,-.02,-.1],[.43,-.06,.14],[.38,-.05,.29]]:[[0,0,0],[.17,.15,-.14],[.15,.32,-.15]],cat?.047:.06,coat,tail);
  const paw=group(cat?-.12:.12,.26,.22,body);ball(0,-.10,0,.07,.16,.07,cream,paw);
  pets.push({root,body,head,eyes,tail,paw,cat});
 }
 function Cream(){return '#e9ddc2'}
 return {pets,animate(t,active=-100){const elapsed=t-active;for(const p of pets){const {head,body,eyes,tail,paw,cat}=p;const excited=Math.max(0,1-elapsed/3)*(elapsed>=0?1:0);body.scale.y=1+Math.sin(t*2.1)*.015;head.rotation.y=Math.sin(t*.8+(cat?0:2))*.14+excited*Math.sin(elapsed*3)*.22;head.rotation.z=Math.sin(t*1.1)*.035;head.position.y=.67+excited*Math.sin(elapsed*4)*.025;tail.rotation.y=Math.sin(t*(cat?2:7))*(cat?.17:.34+excited*.35);paw.rotation.x=cat?-excited*.9:-excited*.40;paw.rotation.z=Math.sin(elapsed*7)*excited*.32;const blink=Math.pow(Math.max(0,Math.sin(t*1.2+(cat?0:2))),32);eyes.forEach(e=>e.scale.y=1-blink*.94);}}};
}
