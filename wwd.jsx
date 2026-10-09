const WE_OUT='cubic-bezier(.16,1,.3,1)',WE_IN='cubic-bezier(.55,.055,.675,.19)',WE_IO='cubic-bezier(.76,0,.24,1)';
const wwdStrip=s=>s.replace(/\*/g,'');
const wwdItems=t=>[t.anchor+' '+t.words[0],...t.words.slice(1),t.lead,...t.parts.map(wwdStrip)];
function wwdGeom(t){
  const vw=innerWidth,gm=Math.min(80,Math.max(20,.05*vw));
  const ctx=document.createElement('canvas').getContext('2d');ctx.font='500 100px "League Spartan"';
  const ww=Math.max(...wwdItems(t).map(s=>ctx.measureText(s).width-4*[...s].length))/100;
  return {fs:Math.floor(Math.min(118,.86*(Math.min(vw,1440)-2*gm)/ww/1.05))};
}
const wwdChars=(s,bw)=>{let b=false;const out=[];[...s].forEach((c,i)=>{if(c==='*'){b=!b;return}out.push(<span className={'lc'+(c===' '?' sp':'')} key={i}><span className="ch" style={b&&bw?{fontWeight:bw}:undefined}>{c}</span></span>)});return out};
function WhatWeDo({t}){
  const rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches&&!window.__wwdForceMotion;
  const sec=React.useRef(null),root=React.useRef(null);
  const [g,setG]=React.useState(()=>wwdGeom(t));
  React.useEffect(()=>{const up=()=>setG(wwdGeom(t));up();document.fonts.load('500 100px "League Spartan"').then(up,()=>{});let to;const r=()=>{clearTimeout(to);to=setTimeout(up,100)};
    addEventListener('resize',r);return ()=>{removeEventListener('resize',r);clearTimeout(to)}},[t]);
  React.useEffect(()=>{
    if(rm)return;
    const R=root.current,q=(s,el=R)=>[...el.querySelectorAll(s)],one=s=>R.querySelector(s);
    const probe=document.createElement('span');probe.style.color='var(--signal)';R.appendChild(probe);const SIG=getComputedStyle(probe).color;probe.remove();
    const WHITE=getComputedStyle(R).color;
    const T=23600,list=[];
    const A=(el,pts)=>{const fr=pts.map(([ms,p,e])=>({offset:Math.min(1,ms/T),...p,easing:e||'linear'}));
      if(fr[0].offset>0)fr.unshift({...fr[0],offset:0});if(fr[fr.length-1].offset<1)fr.push({...fr[fr.length-1],offset:1,easing:'linear'});
      list.push(el.animate(fr,{duration:T,iterations:Infinity}))};
    const ty=v=>({transform:`translateY(${v}%)`}),tx=v=>({transform:`translateX(${v}%)`});
    const outH=(i,at)=>[[at+i*32,tx(0),WE_IN],[at+i*32+380,tx(-110)]];
    // 1 · "Hacemos" rises in at centre, slides left; "video." swipes down beside it; both open their tracking on the way out
    const l1=one('.l1'),hac=one('.l1 .hac'),vid=one('.l1 .vid');
    const lr=l1.getBoundingClientRect(),hr=hac.getBoundingClientRect(),dx=(lr.left+lr.width/2)-(hr.left+hr.width/2);
    A(hac,[[0,{transform:`translateX(${dx}px)`}],[1000,{transform:`translateX(${dx}px)`},WE_IO],[1700,{transform:'translateX(0px)'}]]);
    q('.ch',hac).forEach((c,i)=>A(c,[[0,ty(110)],[i*40,ty(110),WE_OUT],[i*40+700,ty(0)]]));
    q('.ch',vid).forEach((c,i)=>{const a=1450+i*45;A(c,[[0,ty(-110)],[a,ty(-110),WE_OUT],[a+650,ty(0)]])});
    const L1=q('.lc',l1),m1=(L1.length-1)/2;
    L1.forEach((l,i)=>A(l,[[0,{transform:'translateX(0em)',opacity:1}],[3300,{transform:'translateX(0em)',opacity:1},WE_IN],[3850,{transform:`translateX(${((i-m1)*.2).toFixed(2)}em)`,opacity:0}]]));
    // 2 · slides right→left with tight tracking; leaves letter by letter upward
    const w2=one('.w2'),cl=v=>({clipPath:v});
    A(w2,[[0,{transform:'translateX(28%)',letterSpacing:'-.16em',opacity:0}],[3950,{transform:'translateX(28%)',letterSpacing:'-.16em',opacity:0},WE_OUT],[4850,{transform:'translateX(0%)',letterSpacing:'-.04em',opacity:1}]]);
    q('.ch',w2).forEach((c,i)=>A(c,[[0,ty(0)],[5900+i*35,ty(0),WE_IN],[5900+i*35+400,ty(-110)]]));
    // 3 · letters blur in left→right in signal colour, settle white; drop away
    const w3=q('.w3 .ch'),n3=w3.length;
    w3.forEach((c,i)=>{const a=6750+i*80,o=8600+(n3-1-i)*35;const P=(x,y,b,op,col)=>({transform:`translate(${x}em,${y}em)`,filter:`blur(${b}px)`,opacity:op,color:col});
      A(c,[[0,P(-.35,0,14,0,SIG)],[a,P(-.35,0,14,0,SIG),WE_OUT],[a+500,P(0,0,0,1,SIG)],[a+750,P(0,0,0,1,WHITE)],[o,P(0,0,0,1,WHITE),WE_IN],[o+420,P(0,.6,0,0,WHITE)]]);});
    // 4 · punches in from scale with blur; wipes out right→left
    const w4=one('.w4'),S=(s,b,op,c)=>({transform:`scale(${s})`,filter:`blur(${b}px)`,opacity:op,clipPath:c}),FULL='inset(-20% -20% -20% -20%)',GONE='inset(-20% 120% -20% -20%)';
    A(w4,[[0,S(1.7,10,0,FULL)],[9300,S(1.7,10,0,FULL),WE_OUT],[9850,S(1,0,1,FULL)],[10900,S(1,0,1,FULL),WE_IO],[11350,S(1,0,1,GONE)],[11351,S(1,0,0,GONE)]]);
    // lead · word by word, then the line swipes off to the left
    const ld=one('.lead');
    q('.lw',ld).forEach((w,i)=>{const a=11450+i*110;A(w,[[0,{transform:'translateY(.45em)',opacity:0}],[a,{transform:'translateY(.45em)',opacity:0},WE_OUT],[a+700,{transform:'translateY(0em)',opacity:1}]])});
    A(ld,[[0,{transform:'translateX(0vw)',opacity:1}],[13600,{transform:'translateX(0vw)',opacity:1},WE_IN],[14150,{transform:'translateX(-60vw)',opacity:0}]]);
    // parts · each arrives its own way, each leaves sideways letter by letter
    const p1=q('.p1 .ch'),p2=q('.p2 .ch'),p3=q('.p3 .ch');
    p1.forEach((c,i)=>{const a=14200+i*40;A(c,[[0,{transform:'scale(.35)',opacity:0}],[a,{transform:'scale(.35)',opacity:0},WE_OUT],[a+520,{transform:'scale(1)',opacity:1}],[15800+i*32,{transform:'translateX(0%)',opacity:1},WE_IN],[15800+i*32+380,{transform:'translateX(-110%)',opacity:1}]])});
    p2.forEach((c,i)=>{const a=16550+i*35;A(c,[[0,ty(110)],[a,ty(110),WE_OUT],[a+620,ty(0)],[18350+i*32,{transform:'translate(0%,0%)'},WE_IN],[18350+i*32+380,{transform:'translate(-110%,0%)'}]])});
    p3.forEach((c,i)=>{const a=19100+i*35;A(c,[[0,tx(110)],[a,tx(110),WE_OUT],[a+620,tx(0)],...outH(i,22100)])});
    R.classList.add('live');
    const SPEED=1.6;list.forEach(a=>{a.pause();a.currentTime=0;a.playbackRate=SPEED});
    let running=false;
    const lock=()=>{
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      const nav=document.querySelector('.nav'),nh=nav?nav.getBoundingClientRect().height:0,el=sec.current;
      const y=el.getBoundingClientRect().top+scrollY-nh-Math.max(0,(innerHeight-nh-el.offsetHeight)/2);
      window.scrollTo({top:y,behavior:'smooth'});
      let tries=0,last=0,done=false;const HOLD=11450/SPEED;
      const release=()=>{if(done)return;done=true;clearTimeout(tm);removeEventListener('wheel',stop,opt);removeEventListener('touchmove',stop,opt);removeEventListener('keydown',key,true)};
      const intent=()=>{const n=performance.now();if(n-last>300)tries++;last=n;if(tries>=3)release()};
      const stop=e=>{e.preventDefault();intent()};
      const key=e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp',' ','Space','End','Home'].includes(e.key)){e.preventDefault();intent()}};
      const opt={passive:false};
      addEventListener('wheel',stop,opt);addEventListener('touchmove',stop,opt);addEventListener('keydown',key,true);
      const tm=setTimeout(release,HOLD);cleanupLock=release;
    };
    let cleanupLock=()=>{};
    const io=new IntersectionObserver(([e])=>{
      if(e.intersectionRatio>=.6&&!running){running=true;list.forEach(a=>{a.currentTime=0;a.play()});if(!window.__wwdLocked){window.__wwdLocked=true;lock()}}
      else if(!e.isIntersecting&&running){running=false;list.forEach(a=>{a.pause();a.currentTime=0})}
    },{threshold:[0,.6]});io.observe(sec.current);
    window.__wwd={T,seek:ms=>list.forEach(a=>{a.pause();a.currentTime=ms}),play:()=>list.forEach(a=>a.play())};
    return ()=>{io.disconnect();cleanupLock();list.forEach(a=>a.cancel());R.classList.remove('live')};
  },[t,rm,g.fs]);
  const [w1,w2,w3,w4]=t.words;
  return <section ref={sec} className={'wwd'+(rm?' rm':'')} style={{'--wfs':g.fs+'px'}} data-screen-label="What we do" aria-label={t.eyebrow}>
    <p className="vh">{t.anchor} {t.words.join(' ')} {t.lead} {wwdStrip(t.parts.join(' '))}</p>
    <div ref={root} className="wwd-c" aria-hidden="true">
      {rm?<div className="wwd-static"><p>{t.anchor} {t.words.join(' ')}</p><p>{t.lead} {wwdStrip(t.parts.join(' '))}</p></div>
      :<div className="wwd-slot">
        <p className="ww l1"><span className="hac">{wwdChars(t.anchor)}</span><span className="vid">{wwdChars(w1)}</span></p>
        <p className="ww w2">{wwdChars(w2)}</p>
        <p className="ww w3">{[...w3].map((c,i)=><span className="ch" key={i}>{c}</span>)}</p>
        <p className="ww w4">{w4}</p>
        <p className="ww lead">{t.lead.split(' ').map((w,i)=><span className="lw" key={i}>{w}</span>)}</p>
        <p className="ww p1">{wwdChars(t.parts[0],700)}</p>
        <p className="ww p2">{wwdChars(t.parts[1],800)}</p>
        <p className="ww p3">{wwdChars(t.parts[2],900)}</p>
      </div>}
    </div>
  </section>;
}
Object.assign(window,{WhatWeDo});
