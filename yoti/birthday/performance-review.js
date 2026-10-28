// Opt-in, lightweight timing of normal playback; no screen capture or encoder.
export function makeFrameReview(){
 let rows=[],running=false,lastT=-1;
 const summarize=list=>{const a=list.map(r=>r.raw).sort((a,b)=>a-b),q=p=>a[Math.min(a.length-1,Math.floor(a.length*p))]||0;
  return {frames:a.length,fps:+(1000*a.length/(a.reduce((x,y)=>x+y,0)||1)).toFixed(1),p50:+q(.5).toFixed(1),p90:+q(.9).toFixed(1),p99:+q(.99).toFixed(1),over25ms:a.filter(t=>t>25).length,over50ms:a.filter(t=>t>50).length,meanCpu:+(list.reduce((a,r)=>a+r.cpu,0)/(a.length||1)).toFixed(2),meanCalls:Math.round(list.reduce((a,r)=>a+r.calls,0)/(a.length||1))};};
 return {sample(row){
  if(row.auto&&(!running||row.tt<lastT-.5)){rows=[];running=true;}
  if(!running)return;lastT=row.tt;
  if(row.auto&&row.tt>=2)rows.push(row);
  if(rows.length%60===0||!row.auto){document.body.dataset.frameReview=JSON.stringify({all:summarize(rows),moving:summarize(rows.filter(r=>r.moving)),duration:+row.tt.toFixed(2),silent:rows.every(r=>r.muted),complete:!row.auto,views:[...new Set(rows.map(r=>r.view))]});}
  if(!row.auto)running=false;
 }};
}
