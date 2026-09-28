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

function Entry({i,title,cat,body,media,links,credit,drafts,draft,flip,compact}){
  return <article className={'entry grid'+(flip?' flip':'')+(compact?' compact':'')}>
    <div className="entry-top"><Rule/><div className="entry-idx"><Label tone="default" index={String(i).padStart(2,'0')} style={{fontSize:'var(--type-caption)'}}>{cat}</Label></div></div>
    {media&&<div className="entry-media">{media}</div>}
    <div className={'entry-text'+(media?'':' solo')}>
      <h3 className="title">{title}</h3>
      {body&&<p className="body">{body}</p>}
      {links&&<div className="links">{links}</div>}
      {credit&&<p className="credit">{credit}</p>}
      <Draft show={drafts}>{draft}</Draft>
    </div>
  </article>;
}

function WLink({onClick,href,children}){
  return href?<a className="wlink" href={href} target="_blank" rel="noopener">{children} <span className="arr">→</span></a>
    :<button type="button" className="wlink" onClick={onClick}>{children} <span className="arr">→</span></button>;
}

function Work({t,drafts,cuates,open}){
  const yt=(id,title)=>()=>open({type:'yt',id,title});
  const items=[];let n=0;
  items.push(<Entry key="tod" i={++n} title="Tomorrow on Demand" {...t.tod}
    media={<Poster src={ytThumb(M.tod)} fallback={ytThumb(M.tod,'hqdefault')} alt="Tomorrow on Demand" cta={t.play} onClick={yt(M.tod,'Tomorrow on Demand')}/>}
    links={<WLink onClick={yt(M.tod,'Tomorrow on Demand')}>{t.tod.link}</WLink>}/>);
  items.push(<Entry key="here" i={++n} flip title="HERE" {...t.here}
    media={<Poster src={ytThumb(M.here)} fallback={ytThumb(M.here,'hqdefault')} alt="HERE" cta={t.play} onClick={yt(M.here,'HERE')}/>}
    links={<WLink onClick={yt(M.here,'HERE')}>{t.here.link}</WLink>}/>);
  items.push(<Entry key="zia" i={++n} title="ZIA" {...t.zia}
    media={<div className="pair">
      <figure><Poster src={ytThumb(M.tesseract)} fallback={ytThumb(M.tesseract,'hqdefault')} alt="ZIA — Tesseract" cta={t.play} onClick={yt(M.tesseract,'ZIA — Tesseract')}/><figcaption>Tesseract</figcaption></figure>
      <figure><Poster src={ytThumb(M.hypercube)} fallback={ytThumb(M.hypercube,'hqdefault')} alt="ZIA — Hypercube" cta={t.play} onClick={yt(M.hypercube,'ZIA — Hypercube')}/><figcaption>Hypercube</figcaption></figure>
    </div>}
    links={<><WLink onClick={yt(M.tesseract,'ZIA — Tesseract')}>{t.zia.l1}</WLink><WLink onClick={yt(M.hypercube,'ZIA — Hypercube')}>{t.zia.l2}</WLink><WLink href={M.ziaChannel}>{t.zia.l3}</WLink></>}/>);
  if(cuates)items.push(<Entry key="cuates" i={++n} flip compact title="Cuates Primates" {...t.cuates}
    media={<Poster className="vert" ratio="9 / 16" src={ytThumb(M.cuates,'hqdefault')} alt="Cuates Primates" cta={t.play} href={'https://youtube.com/shorts/'+M.cuates}/>}
    links={<WLink href={'https://youtube.com/shorts/'+M.cuates}>{t.cuates.link}</WLink>}/>);
  items.push(<Entry key="atenea" i={++n} title="Atenea" cat={t.atenea.cat} body={t.atenea.body}
    media={<Poster src={`https://drive.google.com/thumbnail?id=${M.atenea}&sz=w1600`} alt="Atenea" cta={t.play} onClick={()=>open({type:'drive',id:M.atenea,title:'Atenea'})}/>}
    links={<WLink onClick={()=>open({type:'drive',id:M.atenea,title:'Atenea'})}>{t.atenea.link}</WLink>}/>);
  const clickOpen=()=>open({type:'file',src:M.clicktopia,title:'Clicktopia — '+t.click.cap});
  items.push(<Entry key="click" i={++n} flip title="Clicktopia" {...t.click}
    media={<figure className="dev-fig"><button type="button" className="poster" style={{aspectRatio:'16 / 9'}} onClick={clickOpen} aria-label={t.click.link+' — Clicktopia'}>
      <video src={M.clicktopia+'#t=1'} muted playsInline preload="metadata" tabIndex={-1}></video>
      <span className="poster-cta">{t.play} <span className="arr">→</span></span><span className="poster-mark"></span>
    </button><figcaption>{t.click.cap}</figcaption></figure>}
    links={<><WLink onClick={clickOpen}>{t.click.link}</WLink><Label boxed tone="default">{t.devLabel}</Label></>}/>);
  return <section id="work" className="work" data-screen-label="Selected work">
    <div className="grid sec-head"><h2 className="display-l">{t.h}</h2></div>
    {items}
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

function Player({item,onClose,closeLabel}){
  React.useEffect(()=>{const k=e=>{if(e.key==='Escape')onClose()};document.addEventListener('keydown',k);document.body.style.overflow='hidden';
    return ()=>{document.removeEventListener('keydown',k);document.body.style.overflow=''}},[]);
  const isFile=item.type==='file';const src=item.type==='yt'?`https://www.youtube.com/embed/${item.id}?autoplay=1&rel=0&playsinline=1`:`https://drive.google.com/file/d/${item.id}/preview`;
  return <div className="player" role="dialog" aria-modal="true" aria-label={item.title}>
    <div className="player-bar"><Label tone="default">{item.title}</Label><Button variant="ghost" onClick={onClose} autoFocus>{closeLabel}</Button></div>
    <div className="player-frame">{isFile?<video src={item.src} controls autoPlay playsInline></video>:<iframe className={item.type==='drive'?'drive':''} src={src} title={item.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen></iframe>}</div>
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
      <Work t={c.work} drafts={tw.drafts} cuates={tw.cuates} open={setOpen}/>
      <Studio t={c.studio}/>
      <Contact t={c.contact} drafts={tw.drafts}/>
    </main>
    <footer className="foot grid">
      <p>{c.foot.a}</p><p>{c.foot.b}</p><p>2026 {c.foot.c}</p>
    </footer>
    {open&&<Player item={open} onClose={()=>setOpen(null)} closeLabel={c.work.close}/>}
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
