function wwdGeom(t){
  const vw=innerWidth,vh=innerHeight,stack=vw<=900||vh>vw;
  const gm=Math.min(80,Math.max(20,.05*vw));
  const ctx=document.createElement('canvas').getContext('2d');ctx.font='500 100px "League Spartan"';
  const ww=Math.max(...t.words.map(s=>ctx.measureText(s).width-2*[...s].length))/100;
  if(stack)return {stack,fs:Math.floor(Math.min(72,(vw-2*gm)/ww))};
  const s=Math.max(vw/1920,vh/1080),vid=1920*s,off=(vw-vid)/2,gap=Math.max(24,.025*vw);
  const cl=.37*vid+off-gap,cr=.63*vid+off+gap,gl=Math.max(0,(vw-1440)/2)+gm;
  return {stack,fs:Math.floor(Math.min(112,(cl-gl)/ww,(vw-cr-gm)/ww)),cl:Math.round(cl),cr:Math.round(cr)};
}
function WhatWeDo({t}){
  const rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches&&!window.__wwdForceMotion;
  const sec=React.useRef(null);
  const [g,setG]=React.useState(()=>wwdGeom(t));
  const [on,setOn]=React.useState(true);
  React.useEffect(()=>{const up=()=>setG(wwdGeom(t));up();document.fonts.load('500 100px "League Spartan"').then(up,()=>{});let to;const r=()=>{clearTimeout(to);to=setTimeout(up,100)};
    addEventListener('resize',r);return ()=>{removeEventListener('resize',r);clearTimeout(to)}},[t]);
  React.useEffect(()=>{if(!('IntersectionObserver' in window))return;const io=new IntersectionObserver(([e])=>setOn(e.isIntersecting),{threshold:.2});io.observe(sec.current);return ()=>io.disconnect()},[]);
  const side=i=>i%2?'r':'l';
  return <section ref={sec} className={'wwd'+(rm?' rm':'')+(on?'':' off')} data-layout={g.stack?'stack':'side'} style={{'--wfs':g.fs+'px','--cl':(g.cl||0)+'px','--cr':(g.cr||0)+'px','--n':t.words.length}} data-screen-label="What we do" aria-label={t.eyebrow}>
    <h2 className="vh">{t.eyebrow}</h2>
    <p className="vh">{t.words.join(' ')}</p>
    {['l','r'].map(sd=><div key={sd} className={'wwd-side '+sd} aria-hidden="true">
      {t.words.map((w,i)=>side(i)===sd&&<span className="wm" key={w} style={{'--i':i}}><span>{w}</span></span>)}
    </div>)}
  </section>;
}
Object.assign(window,{WhatWeDo});
