import {THREE,group,ball,box,tube,material,mesh,phase,PI} from './core.js';
import {C} from './decor.js';
import {galleryPhotos} from './photo-data.js';
export function makeMemories(objects,room){
 // A small resting dog, anchored to the padded stool.
 const root=group(2.17,.85,2.62);root.rotation.y=-.30;root.userData.action='dog';
 const coat=material('#c8a477',.95),cream=material('#f1e3cc',.95),earmat=material('#a47c55',.95),ink=material('#353c35');
 const body=group(-.10,.175,-.035,root);ball(0,0,0,.39,.17,.245,coat,body);
 for(const z of [-.15,.15])ball(-.34,.075,z,.13,.075,.12,coat,root);for(const x of [.09,.41]){ball(x,.072,.23,.085,.072,.17,coat,root);ball(x,.046,.355,.085,.046,.105,cream,root);}
 const head=group(.25,.24,.10,root);ball(0,0,0,.205,.19,.19,coat,head);ball(0,-.065,.15,.115,.078,.09,cream,head);ball(0,-.035,.224,.037,.025,.022,ink,head);
 const ears=[];for(const side of [-1,1]){const ear=group(side*.17,-.035,-.015,head);ball(side*.01,-.07,0,.073,.15,.078,earmat,ear);ears.push(ear);const eye=ball(side*.078,.023,.174,.021,.027,.014,ink,head);eye.userData.dogEye=true;ball(side*.078-.006,.033,.187,.005,.006,.003,'#fff8e7',head);}
 tube([[0,-.064,.236],[0,-.089,.225],[.035,-.098,.21]],.003,ink,head);
 const tail=group(-.43,.12,-.04,root);tube([[0,0,0],[-.09,.07,.06],[-.08,.11,.20],[.04,.085,.22]],.045,coat,tail);
 objects.items.dog={root,title:'摸摸趴着的小狗',look:[2.17,1.07,2.62]};objects.times.dog=-100;

 // The V9 tree illustration stays in the wall frame. Real photos emerge as separate 3D cards.
 room.leftPicture.visible=false;
 const gallery=group(-4.92,3.05,-.80);gallery.rotation.y=PI/2;gallery.userData.action='gallery';
 const frame=group(0,0,.06,gallery);
 box(1.30,1.36,.09,C.walnut,0,0,0,frame,.025);
 box(1.19,1.25,.025,C.gold,0,0,.06,frame,.006);
 box(1.13,1.19,.015,C.cream,0,0,.078,frame,.002);
 const tree=new THREE.TextureLoader().load('./assets/gallery-tree.jpg');tree.colorSpace=THREE.SRGBColorSpace;tree.anisotropy=8;
 const art=mesh(new THREE.PlaneGeometry(1.055,1.055),new THREE.MeshStandardMaterial({map:tree,roughness:1}),0,0,.090,frame);art.castShadow=false;
 objects.items.gallery={root:gallery,title:'翻开相框里的回忆',look:[-4.50,3.05,-.80]};objects.times.gallery=-100;
 const popup=group();popup.visible=false;popup.userData.action='gallery-next';
 const cards=objects.memories.map((map,i)=>{
  const root=group(0,0,0,popup),height=1.42/galleryPhotos[i].aspect+.08;
  const border=new THREE.MeshBasicMaterial({color:'#fff6e6',toneMapped:false,transparent:true});
  box(1.50,height,.018,border,0,0,0,root,.008);
  const mat=new THREE.MeshBasicMaterial({map,toneMapped:false,transparent:true});
  mesh(new THREE.PlaneGeometry(1.42,height-.08),mat,0,0,.012,root);
  root.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=false;}});
  return {root,border,mat,height};
 });
 const origin=new THREE.Vector3(),destination=new THREE.Vector3(),forward=new THREE.Vector3(),sourceQ=new THREE.Quaternion(),targetQ=new THREE.Quaternion(),rollQ=new THREE.Quaternion();
 const fromPos=new THREE.Vector3(),fromQ=new THREE.Quaternion(),fromScale=new THREE.Vector3();
 const FRAME_TURN=.90,PHOTO_REVEAL=.85,PHOTO_SWITCH=.60;
 let galleryIndex=0,openedAt=-100,closingAt=-1,stage='intro',queue=[],shift=null;
 function galleryAction(kind,t){
  queue=[];
  if(!popup.visible){galleryIndex=kind==='prev'?cards.length-1:0;openedAt=t;closingAt=-1;stage='turning';return;}
  if(shift)galleryIndex=shift.to;
  const step=kind==='prev'?-1:1;shift={from:galleryIndex,to:(galleryIndex+step+cards.length)%cards.length,at:t,direction:step};stage='switching';
 }
 function closeGallery(t){queue=[];if(closingAt>=0)return;
  if(popup.visible){fromPos.copy(popup.position);fromQ.copy(popup.quaternion);fromScale.copy(popup.scale);closingAt=t;stage='retracting';}
  else{openedAt=-100;frame.rotation.y=0;frame.position.z=.06;stage='intro';}
 }
 function resetGallery(){galleryIndex=0;openedAt=-100;closingAt=-1;frame.rotation.y=0;frame.position.z=.06;popup.visible=false;queue=[];shift=null;stage='intro';}
 function startGallery(t,autoplay=false){resetGallery();queue=[{at:t+.60,kind:'first'}];if(autoplay)queue.push({at:t+3.75,kind:'next'});}
 return {root,gallery,popup,galleryAction,closeGallery,startGallery,
  get galleryIndex(){return shift?shift.to:galleryIndex;},get galleryStage(){return stage;},get popupVisible(){return popup.visible;},
  get galleryCaption(){return stage==='intro'?'树下的两个人。':`合照 ${shift?shift.to+1:galleryIndex+1} / ${cards.length} · 点照片换一张`;},
  reset:resetGallery,
  animate(t,camera){
   if(queue.length&&t>=queue[0].at){const event=queue.shift(),remaining=queue.slice();galleryAction(event.kind,t);queue=remaining;}
   gallery.updateWorldMatrix(true,false);origin.set(0,0,.18).applyMatrix4(gallery.matrixWorld);gallery.getWorldQuaternion(sourceQ);
   camera.getWorldDirection(forward);destination.copy(camera.position).addScaledVector(forward,2.65);
   targetQ.copy(camera.quaternion);rollQ.setFromAxisAngle(new THREE.Vector3(0,0,1),-.015);targetQ.multiply(rollQ);
   const viewHeight=2*2.65*Math.tan(camera.fov*PI/360),targetScale=Math.min(viewHeight*.76/1.145,viewHeight*camera.aspect*.86/1.50);
   if(closingAt>=0){
    const k=phase(t-closingAt,0,.4);popup.position.copy(fromPos).lerp(origin,k);popup.quaternion.copy(fromQ).slerp(sourceQ,k);popup.scale.copy(fromScale).lerp(new THREE.Vector3(.4,.4,.4),k);
    if(k>=1){popup.visible=false;closingAt=-1;openedAt=-100;stage='intro';}
   }else if(openedAt>=0){
    const elapsed=t-openedAt;
    if(elapsed<FRAME_TURN){popup.visible=false;const k=phase(elapsed,0,FRAME_TURN);frame.rotation.y=k*PI*2;frame.position.z=.06+Math.sin(k*PI)*.90;}
    else{
     frame.rotation.y=0;frame.position.z=.06;popup.visible=true;
     const k=phase(elapsed,FRAME_TURN,FRAME_TURN+PHOTO_REVEAL),scale=.40+(targetScale-.40)*k;
     popup.position.copy(origin).lerp(destination,k);popup.quaternion.copy(sourceQ).slerp(targetQ,k);popup.scale.setScalar(scale);stage=k<1?'emerging':`photo-${galleryIndex+1}`;
    }
   }
   if(shift&&t-shift.at>=PHOTO_SWITCH){galleryIndex=shift.to;shift=null;}
   cards.forEach(({root,border,mat},i)=>{
    const order=(i-galleryIndex+cards.length)%cards.length;
    root.visible=order<3;root.position.set(order*.024,-order*.015,-order*.032);root.rotation.set(0,0,order*.025);root.scale.setScalar(1-order*.025);border.opacity=mat.opacity=1;
   });
   if(shift){cards.forEach((card,i)=>{if(i!==shift.from&&i!==shift.to)card.root.position.z=-.09;});const k=phase(t-shift.at,0,PHOTO_SWITCH),out=cards[shift.from],incoming=cards[shift.to];
    out.root.position.set(-shift.direction*k*.62,k*.04,.03);out.root.rotation.z=shift.direction*k*.12;out.root.rotation.y=-shift.direction*k*.12;
    out.border.opacity=out.mat.opacity=1-phase(k,.20,1);
    incoming.root.position.set(.024*(1-k),-.015*(1-k),-.032*(1-k));incoming.root.rotation.z=.025*(1-k);incoming.root.scale.setScalar(.975+.025*k);stage='switching';
   }
  const e=t-objects.times.dog,a=e>=0?Math.max(0,1-e/3):0;
  body.scale.y=1+Math.sin(t*1.8)*.025;head.position.y=.24+a*.08;head.rotation.z=Math.sin(t*.8)*.025+a*Math.sin(e*3)*.08;
  tail.rotation.x=Math.sin(t*(a?7:1.2))*(.04+a*.24);ears.forEach((ear,i)=>ear.rotation.z=(i?1:-1)*a*Math.sin(e*4)*.08);
  const blink=(t%5.6)>5.25?Math.sin((t%5.6-5.25)/.35*PI):0;head.children.filter(o=>o.userData.dogEye).forEach(o=>o.scale.y=.027*(1-blink*.9));
  }
 };
}
