/* @ds-bundle: {"format":4,"namespace":"DomoArigatoDesignSystem_282312","components":[{"name":"Avatar","sourcePath":"components/brand/Avatar.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Label","sourcePath":"components/core/Label.jsx"},{"name":"Rule","sourcePath":"components/core/Rule.jsx"}],"sourceHashes":{"components/brand/Avatar.jsx":"4b1a0107a099","components/brand/Logo.jsx":"921d533a3850","components/core/Button.jsx":"1cb83e926a10","components/core/Label.jsx":"198e3dfa7b45","components/core/Rule.jsx":"0f767129cd32","ui_kits/brand_applications/ProposalCover.jsx":"31ebe2805bb5","ui_kits/brand_applications/Scaled.jsx":"38ef76b62f04","ui_kits/brand_applications/SocialSquare.jsx":"82ee3829ca8c","ui_kits/brand_applications/TitleFrame.jsx":"8420f6f8dd61"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DomoArigatoDesignSystem_282312 = window.DomoArigatoDesignSystem_282312 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Avatar.jsx
try { (() => {
function Avatar({
  size = 64,
  signal = true,
  ground = 'black',
  style
}) {
  const bg = ground === 'white' ? 'var(--da-white)' : 'var(--da-black)';
  const fg = ground === 'white' ? 'var(--da-black)' : 'var(--da-white)';
  return /*#__PURE__*/React.createElement("div", {
    "aria-label": "DA",
    style: {
      width: size,
      height: size,
      background: bg,
      color: fg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: size * .05,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: size * .5,
      lineHeight: .8,
      letterSpacing: '-.04em',
      paddingTop: size * .06
    }
  }, "DA"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size * .46,
      height: Math.max(2, size * .07),
      background: signal ? 'var(--signal)' : fg
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function Logo({
  tone = 'white',
  width = 240,
  src,
  alt = 'Domo Arigato Studio',
  style
}) {
  const url = src || 'assets/logo/da-logo-' + (tone === 'black' ? 'black' : 'white') + '.svg';
  return /*#__PURE__*/React.createElement("img", {
    src: url,
    alt: alt,
    width: width,
    style: {
      display: 'block',
      width,
      height: 'auto',
      aspectRatio: '1130 / 727',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    h: 36,
    px: 14,
    fs: 12
  },
  md: {
    h: 44,
    px: 20,
    fs: 13
  },
  lg: {
    h: 56,
    px: 28,
    fs: 14
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  arrow = false,
  children,
  onClick,
  type = 'button',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = {
    primary: {
      bg: 'var(--text-1)',
      fg: 'var(--surface-ground)',
      bd: 'var(--text-1)',
      hbg: 'transparent',
      hfg: 'var(--text-1)'
    },
    secondary: {
      bg: 'transparent',
      fg: 'var(--text-1)',
      bd: 'var(--line-strong)',
      hbg: 'var(--text-1)',
      hfg: 'var(--surface-ground)'
    },
    signal: {
      bg: 'var(--signal)',
      fg: 'var(--text-on-signal)',
      bd: 'var(--signal)',
      hbg: 'transparent',
      hfg: 'var(--signal-text)'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--text-1)',
      bd: 'transparent',
      hbg: 'transparent',
      hfg: 'var(--signal-text)'
    }
  }[variant] || {};
  const on = hover && !disabled;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      height: s.h,
      padding: variant === 'ghost' ? 0 : '0 ' + s.px + 'px',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: s.fs,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      background: on ? v.hbg : v.bg,
      color: on ? v.hfg : v.fg,
      border: 'var(--border-hair) solid ' + v.bd,
      borderRadius: 'var(--radius-0)',
      textDecoration: variant === 'ghost' ? 'underline' : 'none',
      textUnderlineOffset: '.35em',
      textDecorationThickness: 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .4 : 1,
      transform: press && !disabled ? 'translateY(1px)' : 'none',
      transition: 'background var(--dur-snap) var(--ease-reveal), color var(--dur-snap) var(--ease-reveal)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, children), arrow && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      transform: on ? 'translateX(4px)' : 'none',
      transition: 'transform var(--dur-reveal) var(--ease-reveal)'
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Label.jsx
try { (() => {
function Label({
  children,
  tone = 'muted',
  index,
  boxed = false,
  style
}) {
  const color = {
    muted: 'var(--text-2)',
    default: 'var(--text-1)',
    signal: 'var(--signal-text)'
  }[tone] || 'var(--text-2)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-label)',
      fontSize: 'var(--type-label)',
      lineHeight: 'var(--lh-label)',
      letterSpacing: 'var(--tr-label)',
      textTransform: 'uppercase',
      color,
      padding: boxed ? '5px 8px' : 0,
      border: boxed ? 'var(--border-hair) solid currentColor' : 'none',
      ...style
    }
  }, index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, index), index != null && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 16,
      height: 1,
      background: 'currentColor'
    }
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Label.jsx", error: String((e && e.message) || e) }); }

// components/core/Rule.jsx
try { (() => {
function Rule({
  weight = 'hair',
  tone = 'line',
  width = '100%',
  vertical = false,
  style
}) {
  const t = {
    hair: 'var(--border-hair)',
    rule: 'var(--border-rule)',
    mark: 'var(--border-mark)'
  }[weight] || '1px';
  const c = {
    line: 'var(--line-1)',
    strong: 'var(--line-strong)',
    signal: 'var(--signal)'
  }[tone] || 'var(--line-1)';
  return /*#__PURE__*/React.createElement("div", {
    role: "separator",
    style: vertical ? {
      width: t,
      height: width,
      background: c,
      ...style
    } : {
      height: t,
      width,
      background: c,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Rule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Rule.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand_applications/ProposalCover.jsx
try { (() => {
const {
  Label: CvLabel,
  Rule: CvRule
} = window.DomoArigatoDesignSystem_282312;
function ProposalCover({
  lang = 'es'
}) {
  const es = lang === 'es';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      height: 720,
      background: 'var(--da-black)',
      color: '#fff',
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      columnGap: 24,
      padding: '64px 80px',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / 10',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(CvLabel, {
    index: "01"
  }, es ? 'Propuesta' : 'Proposal'), /*#__PURE__*/React.createElement(CvLabel, null, es ? 'Septiembre 2026' : 'September 2026')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 84,
      lineHeight: .88,
      letterSpacing: '-.03em'
    }
  }, es ? /*#__PURE__*/React.createElement(React.Fragment, null, "La herramienta", /*#__PURE__*/React.createElement("br", null), "cambia.", /*#__PURE__*/React.createElement("br", null), "La identidad no.") : /*#__PURE__*/React.createElement(React.Fragment, null, "The tool", /*#__PURE__*/React.createElement("br", null), "changes.", /*#__PURE__*/React.createElement("br", null), "The identity doesn\u2019t.")), /*#__PURE__*/React.createElement(CvRule, {
    weight: "mark",
    tone: "signal",
    width: 64,
    style: {
      marginTop: 36
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.55,
      maxWidth: '46ch',
      color: '#fff'
    }
  }, es ? 'Entre todo lo que la IA puede hacer, encontramos lo que vale la pena hacer.' : 'Of everything AI can do, we find what’s worth doing.')), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '10 / 13',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/da-logo-white.svg",
    style: {
      width: 200
    },
    alt: "Domo Arigato Studio"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      alignItems: 'flex-end',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(CvRule, null), (es ? ['Producción creativa', 'Entrenamiento', 'Herramientas a la medida'] : ['Creative production', 'Training', 'Tailored tools']).map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(CvLabel, {
    index: '0' + (i + 1),
    tone: "default"
  }, s))))));
}
window.ProposalCover = ProposalCover;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand_applications/ProposalCover.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand_applications/Scaled.jsx
try { (() => {
function Scaled({
  w,
  h,
  s = 1,
  fit = false,
  children
}) {
  const ref = React.useRef(null);
  const [k, setK] = React.useState(s);
  React.useLayoutEffect(() => {
    if (!fit || !ref.current) return;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / w));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [fit, w]);
  const z = fit ? k : s;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: fit ? {
      width: '100%',
      height: h * z,
      overflow: 'hidden'
    } : {
      width: w * s,
      height: h * s,
      flex: 'none',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: w,
      height: h,
      transform: 'scale(' + z + ')',
      transformOrigin: '0 0'
    }
  }, children));
}
window.Scaled = Scaled;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand_applications/Scaled.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand_applications/SocialSquare.jsx
try { (() => {
const {
  Label: SqLabel
} = window.DomoArigatoDesignSystem_282312;
function SocialSquare({
  lang = 'es'
}) {
  const t = lang === 'es' ? {
    h: ['Menos', 'ruido.', 'Más', 'intención.'],
    k: 'Producción creativa · Bogotá'
  } : {
    h: ['Less', 'noise.', 'More', 'intent.'],
    k: 'Creative production · Bogotá'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1080,
      background: 'var(--da-black)',
      color: '#fff',
      position: 'relative',
      padding: 96,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(SqLabel, {
    style: {
      fontSize: 22
    }
  }, t.k), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/da-logo-white.svg",
    style: {
      width: 150
    },
    alt: "Domo Arigato Studio"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 160,
      lineHeight: .86,
      letterSpacing: '-.035em'
    }
  }, /*#__PURE__*/React.createElement("div", null, t.h[0], " ", t.h[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("span", null, t.h[2])), /*#__PURE__*/React.createElement("div", null, t.h[3])), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      height: 10,
      background: 'var(--signal)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 24,
      color: 'var(--da-gray)'
    }
  }, "domoarigato.studio")));
}
window.SocialSquare = SocialSquare;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand_applications/SocialSquare.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand_applications/TitleFrame.jsx
try { (() => {
function TitleFrame({
  lang = 'es',
  playKey = 0
}) {
  const words = lang === 'es' ? ['Menos', 'ruido.', 'Más', 'intención.'] : ['Less', 'noise.', 'More', 'intent.'];
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [step, setStep] = React.useState(reduce ? 6 : 0);
  React.useEffect(() => {
    if (reduce) {
      setStep(6);
      return;
    }
    setStep(0);
    const ids = [1, 2, 3, 4, 5, 6].map(n => setTimeout(() => setStep(n), n * 500));
    return () => ids.forEach(clearTimeout);
  }, [playKey, lang]);
  const W = i => ({
    visibility: step > i ? 'visible' : 'hidden'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      height: 720,
      background: '#000',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 96,
      top: 200,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 150,
      lineHeight: .88,
      letterSpacing: '-.035em',
      opacity: step >= 6 ? 0 : 1
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: W(0)
  }, words[0]), " ", /*#__PURE__*/React.createElement("span", {
    style: W(1)
  }, words[1])), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: W(2)
  }, words[2]), " ", /*#__PURE__*/React.createElement("span", {
    style: W(3)
  }, words[3])), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      height: 12,
      background: 'var(--signal)',
      width: step > 4 ? 160 : 0,
      transition: 'width var(--dur-reveal) var(--ease-reveal)'
    }
  })), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/da-logo-white.svg",
    alt: "Domo Arigato Studio",
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 420,
      transform: 'translate(-50%,-50%)',
      opacity: step >= 6 ? 1 : 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 24,
      bottom: 20,
      fontFamily: 'ui-monospace,monospace',
      fontSize: 14,
      color: 'var(--da-gray)'
    }
  }, reduce ? 'reduced motion · end frame' : 'beat ' + Math.min(step, 6) + ' / 6 · 120 BPM'));
}
window.TitleFrame = TitleFrame;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand_applications/TitleFrame.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.Rule = __ds_scope.Rule;

})();
