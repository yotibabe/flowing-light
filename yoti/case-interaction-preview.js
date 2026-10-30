/* Three case studies, using the portfolio's existing type, colours and assets. */
(() => {
  window.YotiCaseContent = {
    workbench({head,endNav}) {
      return head('02 / RESEARCH INTO PRACTICE','交易工作台','把研究中的问题，<br>变成自己用得上的工具。').replace('reader-inner','reader-inner workbench-refined wb-editorial wb-restored') + `
      <div class="case-tags"><span>投资研究</span><span>信息组织</span><span>AI 工具实践</span></div>
      <figure class="wb-market-opening" id="wb-market"><button class="wb-full-screen" data-wb-zoom="assets/workbench-deck/market.jpg" data-wb-title="今日市场：完整大盘与工作台全貌" aria-label="放大完整大盘截图"><img src="assets/workbench-deck/market.jpg" alt="完整工作台界面，展示指数、涨跌范围、量能与板块入口"><span>查看完整截图 ↗</span></button><figcaption><span>01 / 先看市场全貌</span><span>真实界面 · 行情日期 2026.10.23</span></figcaption></figure>
      <nav class="wb-reading-path" aria-label="工作台阅读顺序"><a href="#wb-market" data-jump="wb-market">大盘全貌</a><span>→</span><a href="#wb-details" data-jump="wb-details">板块与个股</a><span>→</span><a href="#wb-alerts" data-jump="wb-alerts">跟踪与提醒</a></nav>
      <section class="wb-market-context"><h3>先有背景，<br>再看个股。</h3><p>把指数、上涨范围、量能和板块方向放在一起。先判断是普遍活跃，还是局部变化，再往具体板块和公司看。</p></section>
      <section class="wb-detail-pair" id="wb-details" aria-label="板块与个股的真实界面">
        <header class="wb-detail-heading"><div><span class="eyebrow">02–03 / 板块与个股</span><h3>从板块，看到个股。</h3></div><p>查看板块成员，再对照个股走势。</p></header>
        <div class="wb-detail-grid">
          <figure><span class="wb-detail-label">板块</span><button class="wb-detail-crop" data-wb-zoom="assets/workbench-sector.png" data-wb-title="板块详情：MLOps 概念与成员" aria-label="放大板块详情截图"><img src="assets/workbench-sector.png" alt="MLOps 板块详情，上涨比例与代表公司列表" loading="lazy"></button><figcaption>板块详情 · 2026.10.23 · 点击放大 ↗</figcaption></figure>
          <figure><span class="wb-detail-label">个股</span><button class="wb-detail-crop" data-wb-zoom="assets/workbench-stock.png" data-wb-title="个股走势：奥比中光分时与分钟成交额" aria-label="放大个股走势截图"><img src="assets/workbench-stock.png" alt="奥比中光的分时曲线、逐分钟成交额与量能比较" loading="lazy"></button><figcaption>个股走势 · 2026.10.23 · 点击放大 ↗</figcaption></figure>
        </div>
      </section>
      <section class="wb-alert-story" id="wb-alerts">
        <div class="wb-records">
          <div class="wb-record-tabs" role="tablist" aria-label="查看重点跟踪与提醒截图"><button data-wb-tab="tracking">重点跟踪</button><button data-wb-tab="review">提醒与复盘</button></div>
          <figure class="wb-record-panel" data-wb-panel="tracking"><div class="wb-record-stage"><button class="wb-tracking-panorama" data-wb-zoom="assets/workbench-interaction/tracking-overview.png" data-wb-title="个股异动与重点跟踪：2026.10.27 09:46 历史界面" aria-label="放大重点跟踪原始截图"><img src="assets/workbench-interaction/tracking-overview.png" alt="个股异动与重点跟踪整体画面，包含变化记录和跟踪卡片" loading="eager" width="2826" height="1614"></button></div><figcaption>重点跟踪 · 原始界面局部 · 点击查看完整截图 ↗</figcaption></figure>
          <figure class="wb-record-panel" data-wb-panel="review" hidden><div class="wb-record-stage"><button class="wb-review-screen" data-wb-zoom="assets/workbench-interaction/alerts-20261028.png" data-wb-title="变化提醒：2026.10.28 真实提醒列表" aria-label="放大变化提醒截图"><img src="assets/workbench-interaction/alerts-20261028.png" alt="变化提醒页，包含事件时间、当时报价和信号阶段" loading="eager" width="796" height="797"></button></div><figcaption>变化提醒 · 2026.10.28 · 点击放大 ↗</figcaption></figure>
        </div>
        <div class="wb-alert-copy"><span class="eyebrow">04 / 跟踪与回看</span><h3>值得关注的变化，<br>留在眼前。</h3><p>重点跟踪回答：现在有哪些股票值得继续观察？<br>变化提醒记录：刚刚发生了什么？</p><p>卡片留下首次记录、价格与入选依据。看到提示后，再回到市场背景与走势里核对，也把当时的依据留在复盘中。</p><span class="wb-small-note">切换查看重点跟踪与复盘记录；点击图片，可以放大细看。</span><span class="hand">notice. understand. look back.</span></div>
      </section>
      <section class="project-intro wb-making"><div><span class="eyebrow">THE THINKING BEHIND IT</span><h3>从自己的问题，<br>开始做一个工具。</h3></div><div><p>研究过程中，信息、判断和后续变化常常散落在不同地方。我尝试用 AI，把信息整理、市场观察和复盘记录连接起来，让每一次关注有依据，也能在之后回看和验证。</p><p>我来定义问题、选择观察重点，再用实际体验调整功能。AI 协助实现界面与数据处理，让这些想法逐步变成自己用得上的工具。</p><details class="wb-context-note"><summary>一次使用后的重新思考</summary><p>起初，我更担心错过变化，希望看到更多提醒。用起来以后，又开始重新判断：哪些变化值得占用注意力？工作台也随之不断调整。</p></details></div></section>
      <section class="wb-conclusion" aria-label="继续探索的三个方向">
        <div class="wb-conclusion-heading"><span class="eyebrow">STILL A WORK IN PROGRESS</span><h3 class="wb-final-thought">让工具，<br>更贴近自己的判断。</h3></div>
        <div class="wb-next-steps"><div class="wb-principles" role="group" aria-label="点选下一步方向">${[['数据更可靠','来源、时间、缺口都看得见。'],['信号更聚焦','把有限注意力留给重要变化。'],['验证更扎实','让每轮修改都有可比较的依据。']].map((s,i)=>`<button data-wb-principle aria-pressed="${i===0}" aria-controls="wb-principle-${i}">${s[0]}</button>`).join('')}</div><div class="wb-principle-detail" aria-live="polite">${['来源、时间、缺口都看得见。','把有限注意力留给重要变化。','让每轮修改都有可比较的依据。'].map((s,i)=>`<p id="wb-principle-${i}" ${i?'hidden':''}>${s}</p>`).join('')}</div></div>
      </section>${endNav('workbench','light','看看 Light')}</div>`;
    },
    explore({head,steps,endNav}) {
      return head('03 / SMALL EXPERIMENTS','Little things,<br><em>big feelings.</em>','保持好奇，<br>也保持一点异想天开。').replace('reader-inner','reader-inner travel-edition')+`
      <nav class="little-directory" aria-label="选择小作品"><a href="#travel-story" data-jump="travel-story" aria-current="location">01 / 旅行星球</a><button data-open="birthday">02 / 生日小屋 ↗</button></nav>
      <section class="travel-feature" id="travel-story"><div class="travel-copy"><span class="eyebrow">MY LITTLE PLANET</span><h3>把去过的地方，<br>放进一颗星球。</h3><p>照片常常散在相册里。我想试试：如果旅行足迹能变成一颗可以探索的小星球，回看一次旅行会是什么感觉？</p><p>先沿着这段短片，走过八段旅行。</p><button class="travel-play" data-play-travel>播放旅行短片 <span>1:54 ↗</span></button><span class="hand">a world of memories.</span></div><figure class="travel-film"><video id="travel-original" data-auto-preview controls playsinline muted preload="metadata" poster="assets/travel-original-poster.png" aria-label="旅行星球原始短片，一分五十四秒"><source src="assets/travel-original.mp4" type="video/mp4"><track kind="captions" src="assets/travel-original-captions.vtt" srclang="zh" label="中文场景说明">你的浏览器暂不支持视频。</video><figcaption><span>八段旅行 · 1:54</span><button data-travel-sound aria-pressed="false">开启音乐</button></figcaption></figure></section>
      <div class="travel-credit">配乐：<a href="https://www.scottbuckley.com.au/library/childhood/" target="_blank" rel="noopener">Childhood — Scott Buckley</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>（原短片已节选、调整音量）</div>
      ${steps([['记下一站','选择地点，留下日期、照片与当时的心情。'],['慢慢回看','沿着时间线，重新找到某个地方、某一天。'],['带走一张','把记录变成一张旅行海报，保存或分享。']])}
      <section class="planet-film travel-product-demo"><div><span class="eyebrow">HOW IT WORKS / 30 SECONDS</span><h3>一颗星球，<br>怎样开始？</h3><p>从记录一站旅行，到沿着时间线回看，再把回忆生成海报。用这段 30 秒演示，看看原型怎样使用。</p><span class="hand">A little idea, in motion.</span><p class="case-note">目前是产品原型。头像为示例，记录保存在本机浏览器。</p></div><div class="video-paper"><video data-auto-preview controls playsinline muted loop preload="metadata" poster="assets/planet.jpg" aria-label="旅行星球三十秒产品演示"><source src="assets/planet.mp4" type="video/mp4">你的浏览器暂不支持视频。</video><p>音乐：<a href="https://www.scottbuckley.com.au/library/wanderlust/" target="_blank" rel="noopener">Wanderlust — Scott Buckley</a><br><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a></p></div></section>${endNav('explore','birthday','下一件：生日小屋')}</div>`;
    },
    birthday({head,endNav}) {
      return head('03 / A PERSONAL GIFT','A little<br><em>birthday world.</em>','把一句生日快乐，<br>变成一间可以走进去的小屋。').replace('reader-inner','reader-inner birthday-refined birthday-edition')+`
      <section class="birthday-experience" aria-label="生日小屋体验"><div class="birthday-modebar"><div class="birthday-mode-tabs" role="group" aria-label="选择体验方式"><button data-room-mode="preview" aria-pressed="true">看演示</button><button data-room-mode="explore" aria-pressed="false">自己探索 ↗</button></div><div class="birthday-external-controls"><button data-room-command="pause" aria-pressed="false">暂停</button><button data-room-command="replay">重播</button><button data-room-command="sound" aria-pressed="false">开启音乐</button></div><button class="room-exit" data-room-exit hidden>退出探索</button></div><div class="birthday-stage" id="birthday-stage" data-birthday-experience data-mode="preview"><img class="room-poster" src="assets/birthday-room.png" alt="一间深绿色生日小屋，摆着蛋糕、照片和立体书"></div><div class="birthday-understage"><p id="room-mode-note" aria-live="polite">先看一段演示，再亲手打开里面的小惊喜。</p><a href="birthday/index.html?video" target="_blank" rel="noopener">独立打开 ↗</a></div></section>
      <section class="birthday-letter-intro"><div><span class="eyebrow">MADE FOR A FRIEND</span><h3>把心意，<br>留在小细节里。</h3><span class="hand">a little world, just for you.</span></div><div><p>我为朋友做了一间生日小屋，把照片、祝福和一些小惊喜放进房间。我希望这份礼物可以慢慢看，也能亲手打开、参与其中。</p><p>有些回忆，可以翻开。<br>有些祝福，要亲自许下一个愿望。</p><p>剩下的，等你走进房间再发现。</p><button class="case-text-button" data-room-discover>走进小屋 ↗</button></div></section>${endNav('birthday','explore','下一件：旅行星球')}</div>`;
    }
  };

  let cleanup = () => {};
  window.YotiCaseExperience = {
    destroy() { cleanup(); cleanup=()=>{}; },
    mount(root, reader, page) {
      cleanup();
      const abort=new AbortController(),{signal}=abort;
      const film=root.querySelector('#travel-original');
      if(film){
        const sound=root.querySelector('[data-travel-sound]');
        const sync=()=>{sound.textContent=film.muted?'开启音乐':'关闭音乐';sound.setAttribute('aria-pressed',String(!film.muted));};
        sound.addEventListener('click',()=>{film.muted=!film.muted;film.play().catch(()=>{});sync();},{signal});
        film.addEventListener('volumechange',sync,{signal});
        root.querySelector('[data-play-travel]').addEventListener('click',()=>{film.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'center'});film.play().catch(()=>{});},{signal});
        const videos=[...root.querySelectorAll('video')];
        videos.forEach(video=>video.addEventListener('play',()=>videos.forEach(other=>{if(other!==video)other.pause();}),{signal}));
      }
      const stage=root.querySelector('[data-birthday-experience]');
      let observer=null,frame=null,mode='preview',visible=false;
      const send=(type,more={})=>frame?.contentWindow?.postMessage({type,...more},location.origin);
      const visibility=()=>send('portfolio-visibility',{visible:visible&&!document.hidden});
      if(stage){
        const modeButtons=[...root.querySelectorAll('[data-room-mode]')],exit=root.querySelector('[data-room-exit]'),controls=root.querySelector('.birthday-external-controls'),note=root.querySelector('#room-mode-note');
        function load(nextMode){
          if(frame&&nextMode===mode)return;
          mode=nextMode;stage.dataset.mode=mode;
          modeButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.roomMode===mode)));
          exit.hidden=mode!=='explore';controls.hidden=mode!=='preview';
          note.textContent=mode==='preview'?'先看一段演示，再亲手打开里面的小惊喜。':'已进入探索：拖动视角、点开物件。看完后，点击上方“退出探索”。';
          frame=document.createElement('iframe');
          frame.src=mode==='preview'?'birthday/index.html?video&autoplay&embed&v=20261028-2':'birthday/index.html?embed&v=20261028-2';
          frame.title=mode==='preview'?'生日小屋自动演示':'生日小屋自由探索';frame.allow='autoplay; fullscreen';frame.allowFullscreen=true;
          frame.tabIndex=mode==='preview'?-1:0;frame.inert=mode==='preview';
          if(mode==='preview')frame.setAttribute('aria-hidden','true');
          frame.addEventListener('load',visibility,{once:true,signal});stage.replaceChildren(frame);
          root.querySelector('[data-room-command="pause"]').textContent='暂停';root.querySelector('[data-room-command="pause"]').setAttribute('aria-pressed','false');
          root.querySelector('[data-room-command="sound"]').textContent='开启音乐';root.querySelector('[data-room-command="sound"]').setAttribute('aria-pressed','false');
        }
        modeButtons.forEach(b=>b.addEventListener('click',()=>load(b.dataset.roomMode),{signal}));
        exit.addEventListener('click',()=>{load('preview');modeButtons[0].focus({preventScroll:true});},{signal});
        root.querySelector('[data-room-discover]').addEventListener('click',()=>{load('explore');root.querySelector('.birthday-experience').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});},{signal});
        controls.addEventListener('click',e=>{const b=e.target.closest('[data-room-command]');if(b)send('portfolio-controls',{action:b.dataset.roomCommand});},{signal});
        window.addEventListener('message',e=>{
          if(e.origin!==location.origin||e.source!==frame?.contentWindow)return;
          if(e.data?.type==='birthday-ready')visibility();
          if(e.data?.type==='birthday-player-state'){
            const pause=root.querySelector('[data-room-command="pause"]'),sound=root.querySelector('[data-room-command="sound"]');
            pause.textContent=e.data.ended?'再看一次':e.data.paused?'继续':'暂停';pause.setAttribute('aria-pressed',String(!!e.data.paused));
            sound.textContent=e.data.soundOn?'关闭音乐':'开启音乐';sound.setAttribute('aria-pressed',String(!!e.data.soundOn));
          }
        },{signal});
        observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>.15;if(visible&&!frame)load(mode);visibility();},{root:reader,threshold:[0,.15,.5]});observer.observe(stage);
        document.addEventListener('visibilitychange',visibility,{signal});
      }
      cleanup=()=>{abort.abort();observer?.disconnect();frame?.remove();cleanup=()=>{};};
    }
  };
})();
