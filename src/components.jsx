/* global React, Logo, Icon, Stars, ImgSlot, Reveal */
const { useState: _us, useEffect: _ue } = React;

// ============================================================
// NAVIGATION
// ============================================================
const Nav = ({ onBook }) => {
  const [scrolled, setScrolled] = _us(false);
  const [drawerOpen, setDrawerOpen] = _us(false);

  _ue(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#usluge', label: 'Usluge' },
    { href: '#signature', label: 'Tretmani' },
    { href: '#paketi', label: 'Paketi' },
    { href: '#recenzije', label: 'Recenzije' },
    { href: '#kontakt', label: 'Kontakt' },
  ];

  return (
    <>
      <nav className={'nav ' + (scrolled ? 'scrolled' : '')}>
        <div className="container nav-row">
          <Logo />
          <div className="nav-links">
            {links.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>
          <div className="nav-cta-wrap" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button className="btn btn-primary nav-cta" onClick={onBook}>Rezerviraj</button>
            <button className="nav-burger" aria-label="Otvori izbornik" onClick={() => setDrawerOpen(true)}>
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </nav>

      <div className={'drawer ' + (drawerOpen ? 'open' : '')}>
        <div className="drawer-head">
          <Logo />
          <button className="modal-close" onClick={() => setDrawerOpen(false)} aria-label="Zatvori">
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="drawer-links">
          {links.map(l => (
            <a key={l.href} href={l.href} className="drawer-link" onClick={() => setDrawerOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="drawer-foot">
          <button className="btn btn-primary" onClick={() => { setDrawerOpen(false); onBook(); }}>
            Rezerviraj termin
          </button>
        </div>
      </div>
    </>
  );
};

// ============================================================
// STICKY CTA (bottom-right)
// ============================================================
const StickyCTA = ({ onBook, visible }) => {
  if (!visible) return null;
  return (
    <button className="sticky-cta" onClick={onBook}>
      <span className="sticky-cta-dot" />
      <span>Rezerviraj</span>
      <Icon name="arrow-right" size={14} />
    </button>
  );
};

Object.assign(window, { Nav, StickyCTA });
