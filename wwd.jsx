const WWD_D=2000,WWD_T=8800+WWD_D,WWD_IN='cubic-bezier(.55,.055,.675,.19)',WWD_OUT='cubic-bezier(.16,1,.3,1)',WWD_IO='cubic-bezier(.76,0,.24,1)';
function wwdLayout(){
  const vw=innerWidth,vh=innerHeight,s=Math.max(vw/1920,vh/1080),vid=1920*s;
  const bright=0.37*vid+(vw-vid)/2;
  const gm=Math.min(80,Math.max(20,.05*vw)),gl=Math.max(0,(vw-1440)/2)+gm;
  if(vw<1024)return {layout:'stack',pw:vw,gl};
  const g=Math.max(Math.min(gm,20),Math.min(gl,bright-32-40-340));
  const cw=Math.max(340,Math.min(460,Math.round(bright-32-g-40)));
  return {layout:'side',pw:Math.round(g+cw+40),gl:Math.round(g)};
}
function WhatWeDo({t}){
  const {Label}=window.DomoArigatoDesignSystem_282312;
  const rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches&&!window.__wwdForceMotion;
  const sec=React.useRef(null),panel=React.useRef(null),col=React.useRef(null),lab=React.useRef(null);
  const r={a1:React.useRef(null),a2:React.useRef(null),ap:React.useRef(null),b1:React.useRef(null),b2:React.useRef(null),bp:React.useRef(null)};
  const anims=React.useRef([]);
  const [L,setL]=React.useState(wwdLayout);
  const [pre,setPre]=React.useState(!rm);
  const finish=()=>{anims.current.forEach(a=>a.cancel());anims.current=[];setPre(false)};
  React.useEffect(()=>{let to;const on=()=>{clearTimeout(to);to=setTimeout(()=>{if(anims.current.length)finish();setL(wwdLayout())},120)};
    addEventListener('resize',on);return ()=>removeEventListener('resize',on)},[]);
  React.useEffect(()=>{if(anims.current.length)finish()},[t]);
  const play=()=>{
    const P=panel.current.getBoundingClientRect(),W=P.width,H=P.height;
    const R=el=>{const b=el.getBoundingClientRect();return {x:b.left-P.left,y:b.top-P.top,w:b.width,h:b.height}};
    const a1=R(r.a1.current),a2=R(r.a2.current),ap=R(r.ap.current),b1=R(r.b1.current),b2=R(r.b2.current),lb=R(lab.current);
    const cs=getComputedStyle(col.current),colR=R(col.current);
    const colX=a1.x,innerW=Math.min(460,colR.w-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)),padB=parseFloat(cs.paddingBottom);
    const FIN='translate(0px,0px) scale(1)';
    const tf=(f,X,Y,s)=>`translate(${X-f.x}px,${Y-f.y}px) scale(${s})`;
    const grp=(f,X,Y,s)=>tf(f,X+(f.x-a1.x)*s,Y+(f.y-a1.y)*s,s);
    const K0=(ms,p,e)=>({offset:ms/WWD_T,...p,easing:e||'linear'});
    const K=(ms,p,e)=>K0(ms+WWD_D,p,e);
    const go=(el,frames)=>{if(frames[0].offset>0)frames.unshift({...frames[0],offset:0});anims.current.push(el.animate(frames,{duration:WWD_T,fill:'both'}))};
    const sL=Math.min(W*.72/lb.w,(H*.22)/lb.h),LB=tf(lb,W/2-lb.w*sL/2,H/2-lb.h*sL/2,sL);
    go(lab.current,[K0(0,{transform:LB}),K0(1300,{transform:LB},WWD_IO),K0(2000,{transform:FIN}),K0(WWD_T,{transform:FIN})]);
    lab.current.querySelectorAll('.lc>span').forEach((c,i)=>go(c,[K0(0,{transform:'translateY(110%)'}),K0(i*45,{transform:'translateY(110%)'},WWD_IN),K0(i*45+500,{transform:'translateY(0%)'}),K0(WWD_T,{transform:'translateY(0%)'})]));
    // act 1
    const sBig=1.55*W/a1.w,Yb=H/2-a1.h*sBig/2;
    const aH=a2.y+a2.h-a1.y,sF=Math.min(innerW/Math.max(a1.w,a2.w),1.9);
    const Yf=Math.max(lb.y+lb.h+32,(H-(aH*sF+24+ap.h))/2),Xf=colX;
    const sA=.4,YA=lb.y+lb.h+16,aBot=YA+aH*sA;
    // act 2
    const s2=Math.min(innerW/b2.w,1.5),b2H=b2.h*s2,top=ap.y+ap.h+36,avail=H-padB-top;
    const sH=Math.min((avail-b2H-10)/b1.h,innerW/b1.w);
    const hy=top+Math.max(0,(avail-(b1.h*sH+b2H+10))/2),y2=hy+b1.h*sH+10;
    const sT=sH*.02,cx=colX+b1.w*sH/2,cy=hy+b1.h*sH/2;
    const hideR='inset(0% 100% 0% 0%)',show='inset(0% 0% 0% 0%)',hideL='inset(0% 0% 0% 100%)';
    const A1f=grp(a1,Xf,Yf,sF),A1a=grp(a1,XA(),YA,sA);function XA(){return colX}
    const A2f=grp(a2,Xf,Yf,sF),A2a=grp(a2,colX,YA,sA),A2l=grp(a2,Xf,Yf+H*.75,sF);
    go(r.a1.current,[K(0,{transform:tf(a1,1.02*W,Yb,sBig)},WWD_OUT),K(900,{transform:tf(a1,.01*W,Yb,sBig)}),K(1150,{transform:tf(a1,-.03*W,Yb,sBig)},WWD_IO),
      K(1950,{transform:A1f}),K(5200,{transform:A1f},WWD_IO),K(5950,{transform:FIN}),K(WWD_T-WWD_D,{transform:FIN})]);
    go(r.a2.current,[K(0,{transform:A2l}),K(1450,{transform:A2l},WWD_OUT),K(2250,{transform:A2f}),K(5200,{transform:A2f},WWD_IO),K(5950,{transform:FIN}),K(WWD_T-WWD_D,{transform:FIN})]);
    const APf=tf(ap,colX,Yf+aH*sF+24,1);
    go(r.ap.current,[K(0,{transform:APf}),K(5200,{transform:APf},WWD_IO),K(5950,{transform:FIN}),K(WWD_T-WWD_D,{transform:FIN})]);
    go(r.ap.current,[K(0,{clipPath:hideR}),K(2250,{clipPath:hideR},WWD_OUT),K(2800,{clipPath:show}),K(WWD_T-WWD_D,{clipPath:show})]);
    const B1t=tf(b1,cx-b1.w*sT/2,cy-b1.h*sT/2,sT),B1h=tf(b1,colX,hy,sH);
    go(r.b1.current,[K(0,{transform:B1t,opacity:0}),K(5990,{transform:B1t,opacity:0}),K(6000,{transform:B1t,opacity:1},WWD_OUT),K(6750,{transform:B1h,opacity:1}),
      K(7200,{transform:B1h,opacity:1},WWD_IO),K(8000,{transform:FIN,opacity:1}),K(WWD_T-WWD_D,{transform:FIN,opacity:1})]);
    const B2o=tf(b2,-b2.w*s2-40,y2,s2),B2h=tf(b2,colX,y2,s2);
    go(r.b2.current,[K(0,{transform:B2o}),K(6400,{transform:B2o},WWD_OUT),K(7150,{transform:B2h}),K(7200,{transform:B2h},WWD_IO),K(8000,{transform:FIN}),K(WWD_T-WWD_D,{transform:FIN})]);
    go(r.bp.current,[K(0,{clipPath:hideR}),K(8100,{clipPath:hideR},WWD_OUT),K(8700,{clipPath:show}),K(WWD_T-WWD_D,{clipPath:show})]);
    anims.current[0].onfinish=finish;
    setPre(false);
  };
  React.useEffect(()=>{
    if(rm)return;
    const io=new IntersectionObserver(([e])=>{if(!e.isIntersecting||(e.intersectionRatio<.6&&e.intersectionRect.height<innerHeight*.6))return;io.disconnect();document.fonts.ready.then(play)},{threshold:[0,.2,.4,.6,.8,1]});
    io.observe(panel.current);
    window.__wwd={play:()=>{io.disconnect();play()},seek:ms=>anims.current.forEach(a=>{a.pause();a.currentTime=ms}),resume:()=>anims.current.forEach(a=>a.play())};
    return ()=>io.disconnect();
  },[]);
  const split=h=>{const [w,...rest]=h.split(' ');return [w,rest.join(' ')]};
  const [aw1,aw2]=split(t.a.h),[bw1,bw2]=split(t.b.h);
  return <section ref={sec} className={'wwd'+(pre?' pre':'')} data-layout={L.layout} style={{'--pw':L.pw+'px','--glx':L.gl+'px'}} data-screen-label="What we do" aria-labelledby="wwd-label">
    <div ref={panel} className="wwd-panel">
      <div ref={col} className="wwd-col">
        <div className="wwd-list">
          <h2 id="wwd-label" ref={lab} className="wwd-label an" aria-label={t.eyebrow}><span aria-hidden="true">{[...t.eyebrow].map((c,i)=><span className={'lc'+(c===' '?' sp':'')} key={i}><span>{c}</span></span>)}</span></h2>
          <div className="wwd-item">
            <h3 className="wwd-h"><span ref={r.a1} className="ln an">{aw1}</span> <span ref={r.a2} className="ln an">{aw2}</span></h3>
            <p ref={r.ap} className="wwd-p an">{t.a.p}</p>
          </div>
          <div className="wwd-item">
            <h3 className="wwd-h"><span ref={r.b1} className="ln an">{bw1}</span> <span ref={r.b2} className="ln an">{bw2}</span></h3>
            <p ref={r.bp} className="wwd-p an">{t.b.p}</p>
          </div>
        </div>
      </div>
    </div>
    {L.layout==='stack'&&<div className="wwd-win" aria-hidden="true"></div>}
  </section>;
}
Object.assign(window,{WhatWeDo});
