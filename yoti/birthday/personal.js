import {group} from './core.js';
// Keep the navigation's rest view, without a physical switch in the room.
export function makePersonal(objects){
 const rest=group();
 objects.items.rest={root:rest,title:'今天，先休息一下',look:[1.35,1.6,-.65]};objects.times.rest=-100;
 return {rest,animate(){},reset(){objects.times.rest=-100;}};
}
