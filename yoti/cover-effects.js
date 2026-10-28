(() => {
  const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let audioContext;
  // Short tactile sounds are synthesized only after an intentional click.
  function sound(kind) {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      audioContext ||= new Audio();
      audioContext.resume().then(() => {
        const ctx=audioContext, now=ctx.currentTime;
        const burst=(offset,length,level,frequency)=>{
          const buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*length),ctx.sampleRate);
          const data=buffer.getChannelData(0);
          for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,2);
          const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
          source.buffer=buffer;filter.type='highpass';filter.frequency.value=frequency;gain.gain.value=level;
          source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);
          source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
          source.start(now+offset);
        };
        if(kind==='shutter'){burst(0,.045,.35,750);burst(.075,.065,.24,1200);}
        else{burst(0,.12,.07,1400);burst(.055,.15,.035,2200);}
      }).catch(()=>{});
    } catch {}
  }
  const camera=document.querySelector('[data-camera-shutter]');
  let flashTimer;
  camera?.addEventListener('click',()=>{
    sound('shutter');
    if(!motion)return;
    camera.querySelector('svg').animate([{scale:'1'},{scale:'.91',offset:.25},{scale:'1.04',offset:.65},{scale:'1'}],{duration:350,easing:'ease-out'});
    camera.classList.add('shutter-flash');clearTimeout(flashTimer);flashTimer=setTimeout(()=>camera.classList.remove('shutter-flash'),150);
  });
  document.querySelectorAll('[data-open="hello"]').forEach(button=>button.addEventListener('click',()=>sound('paper')));
  const hearts=document.querySelector('[data-heart-pop]');
  hearts?.addEventListener('click',()=>{
    if(!motion)return;
    hearts.querySelector('svg').animate([{scale:'1'},{scale:'1.2',offset:.35},{scale:'.95',offset:.7},{scale:'1'}],{duration:450,easing:'ease-out'});
    const rect=hearts.getBoundingClientRect();
    [-1,0,1].forEach((side,index)=>{
      const heart=document.createElement('span');heart.className='heart-confetti';heart.textContent='♥';heart.setAttribute('aria-hidden','true');
      heart.style.left=`${rect.left+rect.width*.5}px`;heart.style.top=`${rect.top+rect.height*.45}px`;document.body.append(heart);
      heart.animate([{opacity:0,translate:'0 0',scale:'.3'},{opacity:1,offset:.2},{opacity:0,translate:`${side*35}px ${-55-index*13}px`,scale:'.8',rotate:`${side*25}deg`}],{duration:800,delay:index*50,easing:'ease-out',fill:'both'}).finished.finally(()=>heart.remove());
    });
  });
  document.querySelector('.cutout-person')?.addEventListener('click',event=>{
    if(motion)event.currentTarget.querySelector('img').animate([{translate:'0 0'},{translate:'0 -12px',offset:.4},{translate:'0 0'}],{duration:420,easing:'ease-out'});
  });
})();
