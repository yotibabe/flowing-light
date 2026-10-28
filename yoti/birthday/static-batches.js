import * as THREE from './vendor/three.module.js';

// Join opaque, stationary siblings without changing their vertices, materials,
// shadow flags, or interactive parent. Animated branches remain separate.
export function batchStaticSiblings(root,excluded=[]){
 const skip=new Set(excluded);let savedCalls=0;
 function visit(parent){
  if(skip.has(parent))return;
  const groups=new Map();
  for(const child of [...parent.children]){
   if(skip.has(child))continue;
   if(!child.isMesh){visit(child);continue;}
   const g=child.geometry,m=child.material;
   if(!child.visible||Array.isArray(m)||m.transparent||child.userData.action||g.morphAttributes.position||child.isSkinnedMesh)continue;
   const attrs=Object.keys(g.attributes).sort();
   const key=[m.uuid,child.castShadow,child.receiveShadow,child.renderOrder,...attrs.map(k=>`${k}:${g.attributes[k].itemSize}:${g.attributes[k].normalized}`)].join('|');
   if(!groups.has(key))groups.set(key,[]);groups.get(key).push(child);
  }
  for(const meshes of groups.values()){
   if(meshes.length<2)continue;
   const geometry=new THREE.BufferGeometry(),first=meshes[0],attributes=Object.keys(first.geometry.attributes);
   const source=meshes.map(m=>{m.updateMatrix();return m.geometry.clone().applyMatrix4(m.matrix);});
   const vertices=source.reduce((n,g)=>n+g.attributes.position.count,0);
   for(const name of attributes){const original=source[0].attributes[name],array=new original.array.constructor(vertices*original.itemSize);let offset=0;
    for(const g of source){array.set(g.attributes[name].array,offset);offset+=g.attributes[name].array.length;}
    geometry.setAttribute(name,new THREE.BufferAttribute(array,original.itemSize,original.normalized));
   }
   const indices=[];let offset=0;
   for(const g of source){if(g.index){for(const i of g.index.array)indices.push(i+offset);}else for(let i=0;i<g.attributes.position.count;i++)indices.push(i+offset);offset+=g.attributes.position.count;g.dispose();}
   geometry.setIndex(indices);geometry.computeBoundingBox();geometry.computeBoundingSphere();
   const batch=new THREE.Mesh(geometry,first.material);batch.castShadow=first.castShadow;batch.receiveShadow=first.receiveShadow;batch.renderOrder=first.renderOrder;batch.name='Static room details';
   parent.add(batch);for(const m of meshes)parent.remove(m);savedCalls+=meshes.length-1;
  }
 }
 visit(root);return savedCalls;
}
