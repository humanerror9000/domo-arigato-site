const {Button,Label,Rule,Logo}=window.DomoArigatoDesignSystem_282312;
const M=window.DA_MEDIA;
const ytThumb=(id,q='maxresdefault')=>`https://i.ytimg.com/vi/${id}/${q}.jpg`;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Draft({show,children}){return show?<p className="draft"><span>Draft ·</span> {children}</p>:null}

function Poster({src,fallback,alt,ratio='16 / 9',onClick,href,cta,className=''}){
  const [s,setS]=React.useState(src);const [failed,setFailed]=React.useState(false);
  const inner=<>
    {!failed&&<img src={s} alt={alt} loading="lazy" onError={()=>{if(fallback&&s!==fallback)setS(fallback);else setFailed(true)}}/>}
    {failed&&<span className="poster-empty">{alt}</span>}
    <span className="poster-cta">{cta} <span className="arr">→</span></span>
    <span className="poster-mark"></span>
  </>;
  const st={aspectRatio:ratio};
  return href?<a className={'poster '+className} style={st} href={href} target="_blank" rel="noopener">{inner}</a>
    :<button type="button" className={'poster '+className} style={st} onClick={onClick} aria-label={cta+' — '+alt}>{inner}</button>;
}

function Hero({t,onReel}){
  const vid=React.useRef(null);
  const [playing,setPlaying]=React.useState(!reduced);
  React.useEffect(()=>{const v=vid.current;if(!v)return;v.muted=true;v.defaultMuted=true;v.setAttribute('muted','');v.setAttribute('playsinline','');
    if(reduced)return;const tryPlay=()=>{const p=v.play();if(p&&p.then)p.then(()=>setPlaying(true)).catch(()=>setPlaying(false))};
    tryPlay();v.addEventListener('canplay',tryPlay,{once:true});
    const onTouch=()=>{if(v.paused&&playing!==false)tryPlay()};document.addEventListener('touchstart',onTouch,{once:true,passive:true});
    return ()=>document.removeEventListener('touchstart',onTouch)},[]);
  const toggle=()=>{const v=vid.current;if(!v)return;if(v.paused){v.play();setPlaying(true)}else{v.pause();setPlaying(false)}};
  return <section className="hero" data-screen-label="Hero">
    <div className="bg-video" aria-hidden="true">
      <video ref={vid} src={M.heroLoop} autoPlay={!reduced} muted loop playsInline preload="auto"></video>
    </div>
    <div className="hero-meta">
      <button type="button" className="chip" onClick={toggle}>{playing?t.pause:t.play}</button>
    </div>
    <div className="hero-copy grid">
      <div className="hero-head panel">
        <h1 className="display">{t.h[0]}<br/>{t.h[1]}</h1>
      </div>
      <div className="hero-side panel">
        <Rule weight="mark" tone="signal" width="48px"/>
        <p className="lead">{t.sub}</p>
        <div className="btns">
          <Button variant="signal" arrow onClick={onReel}>{t.reel}</Button>
          <Button variant="secondary" onClick={()=>{const el=document.getElementById('work');window.scrollTo({top:el.offsetTop-70,behavior:reduced?'auto':'smooth'})}}>{t.explore}</Button>
        </div>
      </div>
    </div>
  </section>;
}

function useYTTitle(id,fixed){const [v,setV]=React.useState(fixed||'');
  React.useEffect(()=>{if(fixed||!id)return;fetch('https://noembed.com/embed?url='+encodeURIComponent('https://www.youtube.com/watch?v='+id)).then(r=>r.json()).then(j=>{if(j&&j.title)setV(j.title)}).catch(()=>{})},[id]);return v}
const firstSentence=s=>s?(s.match(/^[\s\S]*?[.?!](?=\s|$)/)||[s])[0]:'';

function LoopPoster({src,alt,cta,onClick}){
  const v=React.useRef(null);
  React.useEffect(()=>{const el=v.current;if(!el)return;el.muted=true;el.setAttribute('muted','');if(!reduced){const p=el.play();if(p&&p.catch)p.catch(()=>{})}},[src]);
  return <button type="button" className="poster" style={{aspectRatio:'16 / 9'}} onClick={onClick} aria-label={cta+' — '+alt}>
    <video ref={v} src={reduced?src+'#t=1':src} autoPlay={!reduced} muted loop playsInline preload={reduced?'metadata':'auto'} tabIndex={-1}></video>
    <span className="poster-cta">{cta} <span className="arr">→</span></span><span className="poster-mark"></span>
  </button>;
}

function Tile({p,t,open}){
  const go=()=>open(p);
  const thumb=p.thumb||(p.yt&&ytThumb(p.yt,p.vert?'hqdefault':'maxresdefault'));
  const media=p.loop?<LoopPoster src={p.file} alt={p.title} cta={t.play} onClick={go}/>
    :<Poster src={thumb} fallback={p.yt&&ytThumb(p.yt,'hqdefault')} alt={p.title} ratio={p.vert?'9 / 16':'16 / 9'} cta={t.play} onClick={go}/>;
  const teaser=firstSentence(p.body);
  return <article className={'tile '+(p.span||'s6')+(p.feat?' feat':'')}>
    {media}
    <div className="tile-meta">
      <div className="tile-hd">{p.cat&&<p className="tile-cat">{p.cat}</p>}<h3 className="tile-t"><button type="button" onClick={go}>{p.title}</button></h3></div>
      {(teaser||p.dev)&&<div className="tile-side">{teaser&&<p className="body">{teaser}</p>}{p.dev&&<Label boxed tone="default">{t.devLabel}</Label>}</div>}
    </div>
  </article>;
}

function Work({t,cuates,open}){
  const new2Title=useYTTitle(M.new2,t.new2.title);
  const P=[
    {key:'camino',title:'El Camino',yt:M.elcamino,thumb:M.elcaminoThumb,...t.camino,feat:true,span:'s12'},
    {key:'tod',title:'Tomorrow on Demand',yt:M.tod,...t.tod},
    {key:'here',title:'HERE',yt:M.here,...t.here},
    {key:'zia',title:'ZIA',yt:M.tesseract,...t.zia,span:cuates?'s9':'s12',videos:[{label:'Tesseract',type:'yt',id:M.tesseract},{label:'Hypercube',type:'yt',id:M.hypercube}],links:[{label:t.zia.l3,href:M.ziaChannel}]},
    cuates&&{key:'cuates',title:'Cuates Primates',yt:M.cuates,vert:true,...t.cuates,span:'s3'},
    {key:'new2',yt:M.new2,...t.new2,title:new2Title||'—'},
    {key:'atenea',title:'Atenea',drive:M.atenea,thumb:`https://drive.google.com/thumbnail?id=${M.atenea}&sz=w1600`,...t.atenea},
    {key:'click',title:'Clicktopia',file:M.clicktopia,loop:true,dev:true,...t.click,feat:true,span:'s12'}
  ].filter(Boolean);
  const toVid=p=>p.yt?{type:'yt',id:p.yt,vert:p.vert}:p.drive?{type:'drive',id:p.drive}:{type:'file',src:p.file};
  return <section id="work" className="work" data-screen-label="Selected work">
    <div className="grid sec-head"><h2 className="display-l">{t.h}</h2></div>
    <div className="grid gal">{P.map(p=><Tile key={p.key} p={p} t={t} open={x=>open({...x,info:true,videos:x.videos||[toVid(x)]})}/>)}</div>
  </section>;
}

function Studio({t}){
  return <section id="studio" className="studio grid" data-screen-label="Studio">
    <div className="sec-label"><Label index="02" tone="signal">{t.label}</Label></div>
    <h2 className="display-l studio-h">{t.h}</h2>
    <div className="studio-copy"><p className="lead">{t.p1}</p><p className="body">{t.p2}</p></div>
  </section>;
}

function Contact({t,drafts}){
  const go=u=>()=>{if(u)window.open(u,'_blank')};
  return <section id="contact" className="contact" data-ground="light" data-screen-label="Contact">
    <div className="grid">
      <div className="sec-label"><Label index="03" tone="signal">{t.label}</Label></div>
      <h2 className="display-l contact-h">{t.h}</h2>
      <div className="contact-side">
        <p className="lead">{t.p}</p>
        <div className="btns">
          <Button variant="signal" size="lg" arrow onClick={go(M.email&&'mailto:'+M.email)}>{t.email}</Button>
          <Button variant="secondary" size="lg" onClick={go(M.whatsapp)}>{t.wa}</Button>
        </div>
        <p className="credit"><a href={'mailto:'+M.email}>{M.email}</a> · <a href={M.whatsapp} target="_blank" rel="noopener">WhatsApp {M.phone}</a></p>
      </div>
    </div>
  </section>;
}

function Player({item,onClose,t}){
  const vids=item.videos||[item];const [ix,setIx]=React.useState(0);const v=vids[ix];
  React.useEffect(()=>{const k=e=>{if(e.key==='Escape')onClose()};document.addEventListener('keydown',k);document.body.style.overflow='hidden';
    return ()=>{document.removeEventListener('keydown',k);document.body.style.overflow=''}},[]);
  const src=v.type==='yt'?`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`:`https://drive.google.com/file/d/${v.id}/preview`;
  const name=item.title+(vids.length>1?' — '+v.label:'');
  return <div className="player" role="dialog" aria-modal="true" aria-label={name}>
    <div className="player-bar"><Label tone="default">{name}</Label><Button variant="ghost" onClick={onClose} autoFocus>{t.close}</Button></div>
    <div className={'player-body'+(item.info?' has-info':'')}>
      <div className={'player-frame'+(v.vert?' vert':'')}>{v.type==='file'?<video key={v.src} src={v.src} controls autoPlay playsInline></video>:<iframe key={src} className={v.type==='drive'?'drive':''} src={src} title={name} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen></iframe>}</div>
      {item.info&&<div className="player-info grid">
        <div className="pi-h">{item.cat&&<p className="tile-cat">{item.cat}</p>}<h2 className="display-l">{item.title}</h2></div>
        <div className="pi-side">
          {item.body&&<p className="lead">{item.body}</p>}
          {vids.length>1&&<div className="btns">{vids.map((x,i)=><Button key={x.label} variant={i===ix?'primary':'secondary'} onClick={()=>setIx(i)}>{x.label}</Button>)}</div>}
          {item.links&&<div className="links">{item.links.map(l=><a key={l.href} className="wlink" href={l.href} target="_blank" rel="noopener">{l.label} <span className="arr">→</span></a>)}</div>}
          {item.credit&&<p className="credit">{item.credit}</p>}
        </div>
      </div>}
    </div>
  </div>;
}

const TWEAK_DEFAULTS=/*EDITMODE-BEGIN*/{"expression":"cyan","drafts":true,"cuates":true}/*EDITMODE-END*/;

function App(){
  const [tw,setTweak]=useTweaks(TWEAK_DEFAULTS);
  const [lang,setLang]=React.useState(()=>localStorage.getItem('da-lang')||'en');
  const [open,setOpen]=React.useState(null);
  React.useEffect(()=>{localStorage.setItem('da-lang',lang);document.documentElement.lang=lang},[lang]);
  React.useEffect(()=>{document.documentElement.dataset.expression=tw.expression},[tw.expression]);
  const c=window.DA_COPY[lang];
  return <>
    <header className="nav">
      <div className="nav-in">
        <a href="#top" className="nav-logo" aria-label="Domo Arigato Studio"><Logo width={96} src={M.logo||"assets/logo/da-logo-white.svg"}/></a>
        <nav className="nav-links">
          <a href="#work">{c.nav.work}</a><a href="#studio">{c.nav.studio}</a><a href="#contact">{c.nav.contact}</a>
          <button type="button" className="lang" onClick={()=>setLang(lang==='en'?'es':'en')} aria-label={lang==='en'?'Español':'English'}>{c.nav.lang}</button>
        </nav>
      </div>
    </header>
    <main id="top">
      <Hero t={c.hero} onReel={()=>setOpen({type:'drive',id:M.reel.id,title:'Domo Arigato — Reel 2026'})}/>
      <WhatWeDo t={c.wwd}/>
      <Work t={c.work} cuates={tw.cuates} open={setOpen}/>
      <Studio t={c.studio}/>
      <Contact t={c.contact} drafts={tw.drafts}/>
    </main>
    <footer className="foot grid">
      <p>{c.foot.a}</p><p>{c.foot.b}</p><p>2026 {c.foot.c}</p>
    </footer>
    {open&&<Player item={open} onClose={()=>setOpen(null)} t={c.work}/>}
    <TweaksPanel>
      <TweakSection label="Expression"/>
      <TweakRadio label="Signal" value={tw.expression} options={['cyan','magenta','mono']} onChange={v=>setTweak('expression',v)}/>
      <TweakSection label="Content"/>
      <TweakToggle label="Show draft notes" value={tw.drafts} onChange={v=>setTweak('drafts',v)}/>
      <TweakToggle label="Include Cuates Primates" value={tw.cuates} onChange={v=>setTweak('cuates',v)}/>
    </TweaksPanel>
  </>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
