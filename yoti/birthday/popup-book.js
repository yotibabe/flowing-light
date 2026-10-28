import {THREE,group,box,mesh,PI,phase} from './core.js';
import {textPlane} from './decor.js';

// A paper mechanism: every pop-up folds down into the pages before the cover closes.
export function makePopupBook(root){
 const paper=new THREE.MeshStandardMaterial({color:'#ecdfbf',roughness:.95,side:THREE.DoubleSide});
 const green=new THREE.MeshStandardMaterial({color:'#648271',roughness:.95,side:THREE.DoubleSide});
 const rust=new THREE.MeshStandardMaterial({color:'#ac6550',roughness:.92,side:THREE.DoubleSide});
 const gold=new THREE.MeshStandardMaterial({color:'#e7bd76',emissive:'#ffc56d',emissiveIntensity:.12,roughness:.8,side:THREE.DoubleSide});
 box(.86,.065,1.02,'#466857',0,0,0,root,.018);
 box(.80,.04,.96,paper,0,.048,0,root,.006);
 box(.045,.08,1.02,'#ad8d56',-.42,.018,0,root,.005);
 const cover=group(-.43,.080,0,root);
 box(.86,.030,1.02,'#466857',.43,0,0,cover,.012);
 const label=textPlane('A LITTLE\nWORLD',.66,.40,'#dfbf82',null,94);
 label.rotation.x=-PI/2;label.position.set(.43,.019,0);cover.add(label);
 const lining=box(.80,.008,.95,paper,.43,-.020,0,cover,.004);
 const coverStars=textPlane('✦   ☾   ✦',.57,.19,'#bda267',null,115);
 coverStars.rotation.x=PI/2;coverStars.position.set(.43,-.026,.17);cover.add(coverStars);
 const page=group(-.40,.078,0,root);
 box(.80,.006,.96,paper,.40,0,0,page,.003);
 const pageLabel=textPlane('SOMEWHERE\nTO REST',.58,.26,'#617b64',null,80);
 pageLabel.rotation.x=-PI/2;pageLabel.position.set(.40,.005,0);page.add(pageLabel);
 // A path and a printed garden remain flat on the page beneath the paper house.
 const path=mesh(new THREE.PlaneGeometry(.15,.34),new THREE.MeshStandardMaterial({color:'#d6b583',roughness:1}),.02,.072,.26,root);path.rotation.x=-PI/2;
 for(const x of [-.26,.29]){const lawn=mesh(new THREE.CircleGeometry(.13,28),green,x,.074,.24,root);lawn.rotation.x=-PI/2;}
 const folds=[];
 function fold(x,z,delay){const f=group(x,.078,z,root);folds.push({root:f,delay});return f;}
 function shape(points,mat,parent,z=0){const s=new THREE.Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();return mesh(new THREE.ExtrudeGeometry(s,{depth:.008,bevelEnabled:false}),mat,0,0,z,parent);}
 const house=fold(.015,-.02,0);
 shape([[-.24,0],[.24,0],[.24,.32],[0,.52],[-.24,.32]],paper,house);
 shape([[-.28,.31],[0,.56],[.28,.31],[.25,.28],[0,.49],[-.25,.28]],rust,house,.012);
 box(.055,.15,.018,'#99765b',.16,.43,-.013,house,.002);
 // Folded side walls give the paper house a little real depth.
 const side=box(.15,.31,.012,green,.24,.155,-.065,house,.002);side.rotation.y=PI/2;
 box(.09,.17,.018,'#587862',.02,.085,.013,house,.005);
 const windowMat=new THREE.MeshStandardMaterial({color:'#bda273',emissive:'#ffd58c',emissiveIntensity:0,roughness:.65});
 for(const x of [-.13,.14]){
  box(.115,.12,.014,'#9a754e',x,.24,.015,house,.003);
  box(.088,.092,.012,windowMat,x,.24,.026,house,.002);
  box(.008,.095,.008,'#9a754e',x,.24,.034,house,.001);
  box(.088,.007,.008,'#9a754e',x,.24,.034,house,.001);
 }
 const windowLight=new THREE.PointLight('#ffcb83',0,.9,2);windowLight.position.set(0,.26,.15);house.add(windowLight);
 const moon=fold(.22,-.28,.13),crescent=new THREE.Shape();
 crescent.moveTo(.01,.45);crescent.bezierCurveTo(-.21,.52,-.20,.79,.015,.81);crescent.bezierCurveTo(-.10,.73,-.10,.54,.01,.45);
 mesh(new THREE.ExtrudeGeometry(crescent,{depth:.012,bevelEnabled:false}),gold,0,0,0,moon);
 // Narrow paper supports remain visible, rather than leaving the moon floating.
 box(.018,.49,.008,'#d8c69c',-.025,.245,0,moon,.002);
 const trees=[];
 for(const [x,z,h,d] of [[-.25,-.15,.37,.06],[.32,.18,.25,.20],[-.28,.29,.21,.28]]){
  const f=fold(x,z,d);shape([[-h*.28,.05],[0,h],[h*.28,.05]],green,f);box(.023,.07,.009,'#987454',0,.03,.004,f,.002);trees.push(f);
 }
 const starFold=fold(-.24,-.29,.20);
 for(const [x,y,r] of [[-.02,.60,.047],[.14,.76,.030]]){
  const pts=[];for(let k=0;k<8;k++){const a=k*PI/4,rr=k%2?r*.27:r;pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr]);}shape(pts,gold,starFold);
  box(.009,y,.006,'#d6c49b',x,y/2,-.006,starFold,.001);
 }
 let opened=0;
 return {animate(age){
  const opening=phase(age,0,.78)*(1-phase(age,4.35,4.85));
  cover.rotation.z=opening*PI;
  page.rotation.z=phase(age,.57,1.16)*(1-phase(age,4.12,4.47))*3.10;
  folds.forEach(({root:f,delay})=>{const k=phase(age,1.15+delay,1.92+delay)*(1-phase(age,3.72,4.12));f.visible=k>.003;f.rotation.x=-(1-k)*PI/2;});
  opened=phase(age,1.8,2.35)*(1-phase(age,3.65,4.05));
  windowMat.emissiveIntensity=opened*1.35;windowMat.color.set(opened>.2?'#f7d49b':'#bda273');windowLight.intensity=opened*.35;gold.emissiveIntensity=.12+opened*.24;
  // A gentle lift makes the paper scene legible without disconnecting it from the table.
  root.scale.setScalar(1+opening*.12);
 },get opening(){return opened;}};
}
