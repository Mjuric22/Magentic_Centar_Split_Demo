/* global React */
const { useEffect: _useEffect2, useRef: _useRef2 } = React;

// Lightweight inline icon set — line style, gold-accent compatible
const Icon = ({ name, size = 24, ...props }) => {
  const common = {
    width: size, height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ...props,
  };
  switch (name) {
    case 'face': return (
      <svg {...common}>
        <path d="M12 3a8 8 0 0 1 8 8c0 4.5-3 9-8 10C7 20 4 15.5 4 11a8 8 0 0 1 8-8z"/>
        <circle cx="9" cy="11" r="0.5" fill="currentColor"/>
        <circle cx="15" cy="11" r="0.5" fill="currentColor"/>
        <path d="M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5"/>
      </svg>
    );
    case 'body': return (
      <svg {...common}>
        <circle cx="12" cy="5" r="2"/>
        <path d="M12 7v5M8 12h8M9 12l-2 9M15 12l2 9M10 16h4"/>
      </svg>
    );
    case 'massage': return (
      <svg {...common}>
        <path d="M3 14h18M5 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/>
        <path d="M7 14V8c0-1 1-2 2-2h6c1 0 2 1 2 2v6"/>
        <circle cx="9.5" cy="10" r="0.6" fill="currentColor"/>
      </svg>
    );
    case 'nails': return (
      <svg {...common}>
        <path d="M9 4h6l-1 14a2 2 0 0 1-2 2 2 2 0 0 1-2-2L9 4z"/>
        <path d="M9 8h6"/>
      </svg>
    );
    case 'wax': return (
      <svg {...common}>
        <path d="M5 21l4-12 6 2-4 12z"/>
        <path d="M9 9l1.5-4.5L15 4l1 4"/>
        <path d="M11 14l1.5.5"/>
      </svg>
    );
    case 'sun': return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"/>
      </svg>
    );
    case 'scissors': return (
      <svg {...common}>
        <circle cx="6" cy="7" r="2.5"/>
        <circle cx="6" cy="17" r="2.5"/>
        <path d="M8 9l12 9M8 15l12-9"/>
      </svg>
    );
    case 'sparkle': return (
      <svg {...common}>
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>
        <path d="M12 7l1.5 3.5L17 12l-3.5 1.5L12 17l-1.5-3.5L7 12l3.5-1.5z" fill="currentColor" opacity="0.18"/>
      </svg>
    );
    case 'arrow': return (
      <svg {...common}>
        <path d="M7 17L17 7M17 7H9M17 7v8"/>
      </svg>
    );
    case 'arrow-right': return (
      <svg {...common}>
        <path d="M5 12h14M13 6l6 6-6 6"/>
      </svg>
    );
    case 'arrow-left': return (
      <svg {...common}>
        <path d="M19 12H5M11 6l-6 6 6 6"/>
      </svg>
    );
    case 'phone': return (
      <svg {...common}>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>
      </svg>
    );
    case 'mail': return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="1"/>
        <path d="M3 7l9 6 9-6"/>
      </svg>
    );
    case 'pin': return (
      <svg {...common}>
        <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/>
        <circle cx="12" cy="10" r="2.5"/>
      </svg>
    );
    case 'clock': return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 2"/>
      </svg>
    );
    case 'check': return (
      <svg {...common} strokeWidth="1.5">
        <path d="M5 12l5 5L20 7"/>
      </svg>
    );
    case 'close': return (
      <svg {...common}>
        <path d="M6 6l12 12M6 18L18 6"/>
      </svg>
    );
    case 'menu': return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16"/>
      </svg>
    );
    case 'instagram': return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="4"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>
      </svg>
    );
    case 'facebook': return (
      <svg {...common}>
        <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v8h3v-8h2.5l.5-3H14V8z"/>
      </svg>
    );
    case 'whatsapp': return (
      <svg {...common}>
        <path d="M4 20l1.4-4A8 8 0 1 1 9 19.5L4 20z"/>
        <path d="M9 10c0 3 2 5 5 5l1.5-1.5-2-1-1 1c-1 0-2-1-2-2l1-1-1-2L9 10z" fill="currentColor"/>
      </svg>
    );
    default: return null;
  }
};

// Image-slot placeholder block (replaces stock image)
const ImgSlot = ({ label, className = '', style }) => (
  <div className={'imgslot ' + className} style={style}>
    <span className="imgslot-corner tl"></span>
    <span className="imgslot-corner tr"></span>
    <span className="imgslot-corner bl"></span>
    <span className="imgslot-corner br"></span>
    <span className="imgslot-label">{label}</span>
  </div>
);

// Logo / monogram
const Logo = () => (
  <a href="#top" className="logo" aria-label="Magnetic Centar Split">
    <span className="logo-mark" aria-hidden="true">M</span>
    <span className="logo-text">
      <span className="logo-name">MAGNETIC</span>
      <span className="logo-sub">Centar · Split</span>
    </span>
  </a>
);

// CountUp — animira broj od 0 do target kad uđe u viewport
const CountUp = ({ to = 100, duration = 1800, suffix = '', prefix = '', decimals = 0, className = '' }) => {
  const ref = _useRef2(null);
  const [val, setVal] = React.useState(0);
  _useEffect2(() => {
    const el = ref.current;
    if (!el) return;
    let raf, started = false;
    const start = (delay = 0) => {
      if (started) return;
      started = true;
      const t0 = performance.now() + delay;
      const tick = (now) => {
        const t = Math.min(1, Math.max(0, (now - t0) / duration));
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(to * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setVal(to);
      };
      raf = requestAnimationFrame(tick);
    };
    // If already in view at mount, kick off immediately
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh && r.bottom > 0) {
      start(120);
    } else {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { start(); obs.unobserve(el); }
        });
      }, { threshold: 0 });
      obs.observe(el);
      return () => { obs.disconnect(); if (raf) cancelAnimationFrame(raf); };
    }
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [to, duration]);
  const display = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString();
  return (
    <span ref={ref} className={className}>
      {prefix}{display}<span className="hero-stat-suffix">{suffix}</span>
    </span>
  );
};

// Stars rating
const Stars = ({ n = 5, className = 'review-stars' }) => (
  <span className={className} aria-label={`${n} od 5 zvjezdica`}>
    {'★'.repeat(n)}{'☆'.repeat(5 - n)}
  </span>
);

// Reveal-on-scroll wrapper
const Reveal = ({ children, as: Tag = 'div', delay = 0, ...rest }) => {
  const ref = _useRef2(null);
  _useEffect2(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add('in'), delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={'reveal ' + (rest.className || '')} {...rest}>{children}</Tag>;
};

Object.assign(window, { Icon, ImgSlot, Logo, Stars, Reveal, CountUp });
