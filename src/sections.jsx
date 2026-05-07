/* global React, ImgSlot, Icon, Stars, Reveal, CountUp,
   SERVICES, SERVICE_CATEGORIES, SIGNATURE, PACKAGES, REVIEWS, HOURS */
const { useState: _su, useMemo: _smm, useRef: _sr, useEffect: _se } = React;

// ============================================================
// HERO
// ============================================================
const Hero = ({ tweaks, onBook }) => {
  const titleLines = (tweaks.heroTitle || '').split('\n');
  const line1 = titleLines.slice(0, -1).join(' ') || titleLines[0];
  const line2 = titleLines.length > 1 ? titleLines[titleLines.length - 1] : '';

  const shapes = [
    { delay: 0.3, w: 600, h: 140, rot: 12,  from: 'rgba(94,31,41,0.35)',     pos: { left: '-8%',  top: '18%' } },
    { delay: 0.5, w: 500, h: 120, rot: -15, from: 'rgba(201,139,139,0.22)',  pos: { right: '-3%', top: '70%' } },
    { delay: 0.4, w: 300, h: 80,  rot: -8,  from: 'rgba(214,178,124,0.25)',  pos: { left: '8%',   bottom: '8%' } },
    { delay: 0.6, w: 200, h: 60,  rot: 20,  from: 'rgba(232,201,149,0.20)',  pos: { right: '18%', top: '12%' } },
    { delay: 0.7, w: 150, h: 40,  rot: -25, from: 'rgba(245,235,224,0.14)',  pos: { left: '22%',  top: '8%' } },
  ];

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="hero-blur" aria-hidden="true"></div>
      <div className="hero-shapes" aria-hidden="true">
        {shapes.map((s, i) => (
          <div
            key={i}
            className="shape shape-pill"
            style={{
              ...s.pos,
              width: s.w,
              height: s.h,
              animationDelay: `${s.delay}s, ${1.6 + s.delay}s`,
              '--rot-from': `${s.rot - 15}deg`,
              '--rot-to': `${s.rot}deg`,
              '--shape-from': s.from,
            }}
          />
        ))}
      </div>
      <div className="hero-fade" aria-hidden="true"></div>

      <div className="hero-inner">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          <span>Centar zdravlja i ljepote · od 1996.</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-1">{line1}</span>
          {line2 && <span className="hero-title-2">{line2}</span>}
        </h1>

        <p className="hero-lede">{tweaks.heroTagline}</p>

        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={onBook}>
            Rezerviraj termin
            <Icon name="arrow" size={14} />
          </button>
          <a href="#usluge" className="btn btn-ghost">Pogledaj usluge</a>
        </div>

        <div className="hero-meta">
          <div className="hero-stat">
            <CountUp to={30} duration={2400} suffix="+" className="hero-stat-num" startDelay={1400} />
            <span className="hero-stat-lbl">Godina iskustva</span>
          </div>
          <div className="hero-stat">
            <CountUp to={4.5} duration={2000} decimals={1} suffix="★" className="hero-stat-num" startDelay={1400} />
            <span className="hero-stat-lbl">126 Google recenzija</span>
          </div>
          <div className="hero-stat">
            <CountUp to={40} duration={2400} suffix="+" className="hero-stat-num" startDelay={1400} />
            <span className="hero-stat-lbl">Tretmana</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// RIBBON / MARQUEE — brand markers
// ============================================================
const Ribbon = () => {
  const items = [
    'HydraFacial', 'Selvert Thermal', 'Becos Italia', 'Zerona Green Laser',
    'Maria Galland', 'Afrodita', 'TESLA', 'Juliana Nails',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ribbon" aria-hidden="true">
      <div className="ribbon-track">
        {doubled.map((item, i) => (
          <span key={i} className="ribbon-item">{item}</span>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// ABOUT — animated block by block
// ============================================================
const About = () => (
  <section className="about" id="o-nama">
    <div className="container">
      <div className="about-grid">
        <Reveal className="about-visual">
          <ImgSlot label={'tim u pokretu —\nposvećeni klijentu'} />
          <ImgSlot label={'aparat\nu uporabi'} />
        </Reveal>

        <div className="about-content">
          <Reveal delay={0}>
            <span className="eyebrow">O nama</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '16px 0 24px' }}>
              Tri desetljeća<br/>
              <em style={{ color: 'var(--accent)' }}>posvećenih ruku.</em>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="lede" style={{ marginBottom: 8 }}>
              Magnetic Centar otvoren je 1996. godine kao mali kozmetički salon u kvartu Gripe.
              Danas, nakon 30 godina, postali smo jedan od najprepoznatljivijih spa centara u Splitu.
            </p>
          </Reveal>

          <ul className="about-points">
            <Reveal delay={270} as="li" className="about-point">
              <span className="about-point-num">01</span>
              <div>
                <h3 className="about-point-title">Individualni pristup</h3>
                <p>Svaki klijent ima svoju priču, kožu i ritam. Tretmani se uvijek prilagođavaju.</p>
              </div>
            </Reveal>
            <Reveal delay={360} as="li" className="about-point">
              <span className="about-point-num">02</span>
              <div>
                <h3 className="about-point-title">Vrhunski preparati</h3>
                <p>Becos, Selvert Thermal, Maria Galland, Afrodita — radimo isključivo s renomiranim brendovima.</p>
              </div>
            </Reveal>
            <Reveal delay={450} as="li" className="about-point">
              <span className="about-point-num">03</span>
              <div>
                <h3 className="about-point-title">Tri odjela na jednom mjestu</h3>
                <p>Tretmani lica i tijela, centar za oblikovanje, manikura & pedikura, frizerske usluge.</p>
              </div>
            </Reveal>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// Mapa: ime Signature tretmana → id u BOOKING_TREATMENTS
const SIG_ID = {
  'HydraFacial':                 'hydra',
  'TESLA elektromagnet':         'tesla',
  'Zerona Green Laser':          'zerona',
  'Maderoterapija':              'mader',
  'Dijamantna mikrodermoabrazija': 'derma',
};

// ============================================================
// SERVICES — Signature tretmani integrirani kao kartica
// ============================================================
const ServicesSection = ({ onBook }) => {
  const [filter, setFilter] = _su('all');
  const [openId, setOpenId] = _su(null);
  const filtered = filter === 'all' ? SERVICES : SERVICES.filter(s => s.cat === filter);
  const showSig = filter === 'all';

  return (
    <section id="usluge">
      <div className="container">
        <div className="section-head">
          <div className="section-num">02</div>
          <div className="text-block">
            <span className="eyebrow">Naše usluge</span>
            <h2 className="h-display">Sve na jednom mjestu.</h2>
          </div>
        </div>

        <div className="filter-chips">
          <button className={'chip ' + (filter === 'all' ? 'active' : '')} onClick={() => { setFilter('all'); setOpenId(null); }}>
            Sve
          </button>
          {SERVICE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={'chip ' + (filter === cat.id ? 'active' : '')}
              onClick={() => { setFilter(cat.id); setOpenId(null); }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="services-wrap">
          {filtered.map((s) => {
            const id = `${filter}-${s.title}`;
            const isOpen = openId === id;
            const cat = SERVICE_CATEGORIES.find(c => c.id === s.cat);
            return (
              <div key={id} className={'service-item ' + (isOpen ? 'open' : '')}>
                <button
                  className="service-head"
                  onClick={() => setOpenId(isOpen ? null : id)}
                  aria-expanded={isOpen}
                >
                  <span className="service-icon-wrap">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <span className="service-head-text">
                    <span className="service-title-mob">{s.title}</span>
                    <span className="service-sub-mob">{cat ? cat.label : ''}</span>
                  </span>
                  <span className="service-toggle" aria-hidden="true">
                    <Icon name="close" size={14} />
                  </span>
                </button>
                <div className="service-body">
                  <div className="service-body-inner">
                    <div className="service-body-content">
                      <p className="service-desc-mob">{s.desc}</p>
                      <div className="service-tags-mob">
                        {s.tags.map(t => <span key={t} className="service-tag">{t}</span>)}
                      </div>
                      <button className="service-cta" onClick={onBook}>
                        Rezerviraj <Icon name="arrow" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Signature tretmani — posebna kartica uvijek vidljiva u "Sve" filtru */}
          {showSig && (() => {
            const isOpen = openId === '__signature__';
            return (
              <div className={'service-item service-item--signature ' + (isOpen ? 'open' : '')}>
                <button
                  className="service-head"
                  onClick={() => setOpenId(isOpen ? null : '__signature__')}
                  aria-expanded={isOpen}
                >
                  <span className="service-icon-wrap service-icon-wrap--gold">
                    <Icon name="sparkle" size={26} />
                  </span>
                  <span className="service-head-text">
                    <span className="service-title-mob">Signature tretmani</span>
                    <span className="service-sub-mob">Premium · 5 tretmana</span>
                  </span>
                  <span className="service-toggle" aria-hidden="true">
                    <Icon name="close" size={14} />
                  </span>
                </button>
                <div className="service-body">
                  <div className="service-body-inner">
                    <div className="service-body-content">
                      <p className="service-desc-mob">Tehnologija u službi opuštanja — naši najtraženiji premium tretmani s vidljivim rezultatima.</p>
                      <div className="sig-inline-list">
                        {SIGNATURE.map((tr, i) => (
                          <div key={tr.name} className="sig-inline-row" onClick={() => onBook(SIG_ID[tr.name])}>
                            <span className="sig-inline-num">— 0{i + 1}</span>
                            <div className="sig-inline-content">
                              <h4 className="sig-inline-name">{tr.name}</h4>
                              <p className="sig-inline-desc">{tr.desc}</p>
                            </div>
                            <div className="sig-inline-meta">
                              <span>{tr.duration}</span>
                              <strong>{tr.from}</strong>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="service-cta" onClick={onBook}>
                        Rezerviraj tretman <Icon name="arrow" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// PACKAGES — pricing card style
// ============================================================
const PackagesSection = ({ onBook }) => (
  <section className="packages" id="paketi">
    <div className="container">
      <div className="section-head">
        <div className="section-num">03</div>
        <div className="text-block">
          <span className="eyebrow">Pokloni & paketi</span>
          <h2 className="h-display">Idealna prilika za <em style={{ color: 'var(--accent)' }}>poklon.</em></h2>
        </div>
      </div>

      <div className="pkg-v2-grid">
        {PACKAGES.map((pkg, i) => (
          <Reveal key={pkg.name} index={i} as="article" className={'pkg-v2' + (pkg.featured ? ' pkg-v2-featured' : '')}>
            <div className="pkg-v2-top" />
            <div className="pkg-v2-body">
              {pkg.featured && <span className="pkg-v2-badge">Najpopularniji</span>}
              <h3 className="pkg-v2-name">{pkg.name}</h3>
              <div className="pkg-v2-price-wrap">
                <span className="pkg-v2-amount">{pkg.price}</span>
                <span className="pkg-v2-per">{pkg.suffix}</span>
              </div>
              <p className="pkg-v2-desc">{pkg.desc}</p>
              <ul className="pkg-v2-list">
                {pkg.items.map(it => (
                  <li key={it}>
                    <Icon name="check" size={14} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <button className={'btn ' + (pkg.featured ? 'btn-primary' : 'btn-ghost') + ' pkg-v2-cta'} onClick={onBook}>
                Odaberi paket
                <Icon name="arrow" size={14} />
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================
// REVIEWS — testimonial slider
// ============================================================
const ReviewsSection = () => {
  const [active, setActive] = _su(0);
  const touchStartX = _sr(null);
  const timerRef = _sr(null);
  const total = REVIEWS.length;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(c => (c + 1) % total), 4500);
  };

  _se(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (d) => {
    setActive(c => (c + d + total) % total);
    resetTimer();
  };

  return (
    <section className="reviews" id="recenzije">
      <div className="container">
        <div className="reviews-head">
          <div className="text-block">
            <span className="eyebrow">Riječ klijentica</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', margin: '16px 0 0' }}>
              Hvala vam<br/>na povjerenju.
            </h2>
          </div>
          <div className="reviews-rating">
            <Stars n={5} className="reviews-stars" />
            <div className="reviews-rating-num">4.5<span>/5</span></div>
            <span className="reviews-count">126 Google recenzija</span>
          </div>
        </div>

        <div
          className="tslider"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <button className="tslider-arrow tslider-arrow-prev" onClick={() => go(-1)} aria-label="Prethodna recenzija">
            <Icon name="arrow-left" size={20} />
          </button>

          <div className="tslider-viewport">
            {REVIEWS.map((r, i) => (
              <figure key={i} className={'tslider-card' + (i === active ? ' active' : '')}>
                <div className="tslider-card-inner">
                  <span className="review-quote">"</span>
                  <p className="review-text">{r.text}</p>
                  <figcaption className="review-author">
                    <span className="review-avatar">{r.initials}</span>
                    <div>
                      <div className="review-name">{r.name}</div>
                      <Stars n={r.stars} />
                    </div>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>

          <button className="tslider-arrow tslider-arrow-next" onClick={() => go(1)} aria-label="Sljedeća recenzija">
            <Icon name="arrow-right" size={20} />
          </button>
        </div>

        <div className="tslider-dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={'tslider-dot' + (i === active ? ' active' : '')}
              onClick={() => { setActive(i); resetTimer(); }}
              aria-label={`Recenzija ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// GALLERY
// ============================================================
const GallerySection = () => (
  <section id="galerija">
    <div className="container">
      <div className="section-head">
        <div className="section-num">04</div>
        <div className="text-block">
          <span className="eyebrow">Galerija</span>
          <h2 className="h-display">Naš prostor.</h2>
        </div>
      </div>

      <div className="gallery-grid">
        <ImgSlot label={'glavni kabinet —\ntopli tonovi'} />
        <ImgSlot label={'recepcija &\nčekaonica'} />
        <ImgSlot label={'masažna kada\n(SPA pedikura)'} />
        <ImgSlot label={'tretman tijela'} />
        <ImgSlot label={'detalj —\nsvijeće & ulja'} />
      </div>
    </div>
  </section>
);

// ============================================================
// CONTACT + HOURS + MAP
// ============================================================
const ContactSection = ({ onBook }) => {
  const todayIdx = new Date().getDay();
  return (
    <section id="kontakt">
      <div className="container">
        <div className="section-head">
          <div className="section-num">05</div>
          <div className="text-block">
            <span className="eyebrow">Kontakt & lokacija</span>
            <h2 className="h-display">Posjetite nas.</h2>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-block">
              <span className="contact-label">Adresa</span>
              <span className="contact-value">Radnička ul. 1, 21000 Split</span>
              <span className="contact-secondary">Kvart Gripe — ulaz direktno s Osječke ulice</span>
            </div>

            <div className="contact-block contact-block-compact">
              <span className="contact-label">Telefon & WhatsApp</span>
              <a href="tel:+385916071297" className="contact-value">+385 91 607 1297</a>
            </div>

            <div className="contact-block contact-block-compact">
              <span className="contact-label">Email</span>
              <a href="mailto:info@magneticspa.hr" className="contact-value">info@magneticspa.hr</a>
            </div>

            <div className="contact-block contact-hours-block">
              <span className="contact-label">Radno vrijeme</span>
              <div className="hours-table">
                {HOURS.map(h => (
                  <div key={h.day} className={'hours-row ' + (h.i === todayIdx ? 'today' : '')}>
                    <span className="hours-day">{h.day}{h.i === todayIdx ? ' · danas' : ''}</span>
                    <span className="hours-time">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" onClick={onBook} style={{ alignSelf: 'flex-start' }}>
              Rezerviraj online
              <Icon name="arrow" size={14} />
            </button>
          </div>

          <div className="map" aria-label="Mapa lokacije">
            <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(214,178,124,0.08)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="400" height="500" fill="var(--bg-elev)" />
              <rect width="400" height="500" fill="url(#grid)" />
              <path d="M 0 220 Q 150 240 400 200" stroke="rgba(214,178,124,0.18)" strokeWidth="22" fill="none"/>
              <path d="M 0 220 Q 150 240 400 200" stroke="rgba(214,178,124,0.04)" strokeWidth="20" fill="none"/>
              <path d="M 200 0 L 220 500" stroke="rgba(214,178,124,0.14)" strokeWidth="14" fill="none"/>
              <path d="M 0 380 L 400 360" stroke="rgba(214,178,124,0.10)" strokeWidth="10" fill="none"/>
              <path d="M 320 0 L 340 500" stroke="rgba(214,178,124,0.10)" strokeWidth="8" fill="none"/>
              <rect x="40" y="50" width="120" height="120" fill="rgba(94,31,41,0.4)" />
              <rect x="180" y="280" width="100" height="80" fill="rgba(94,31,41,0.3)" />
              <rect x="290" y="80" width="90" height="100" fill="rgba(94,31,41,0.3)" />
              <rect x="60" y="280" width="100" height="180" fill="rgba(94,31,41,0.35)" />
              <text x="20" y="240" fill="rgba(214,178,124,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="2">OSJEČKA UL.</text>
              <text x="225" y="160" fill="rgba(214,178,124,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">RADNIČKA</text>
            </svg>
            <div className="map-pin">
              <div className="map-pin-label">Magnetic Centar</div>
              <div className="map-pin-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = () => (
  <footer className="foot">
    <div className="container">
      <div className="foot-grid">
        <div className="foot-col">
          <div style={{ marginBottom: 24 }}>
            <a href="#top" className="logo">
              <span className="logo-mark">M</span>
              <span className="logo-text">
                <span className="logo-name">MAGNETIC</span>
                <span className="logo-sub">Centar · Split</span>
              </span>
            </a>
          </div>
          <p style={{ color: 'var(--ink-dim)', fontSize: 14, maxWidth: 300, lineHeight: 1.6 }}>
            Centar zdravlja i ljepote u Splitu — od 1996. godine. Tretmani lica i tijela,
            masaže, manikura i pedikura, frizerske usluge.
          </p>
        </div>

        <div className="foot-col">
          <h4>Usluge</h4>
          <ul>
            <li><a href="#usluge">Njega lica</a></li>
            <li><a href="#usluge">Oblikovanje tijela</a></li>
            <li><a href="#usluge">Masaže</a></li>
            <li><a href="#usluge">Manikura & pedikura</a></li>
            <li><a href="#usluge">Depilacija</a></li>
          </ul>
        </div>

        <div className="foot-col">
          <h4>Centar</h4>
          <ul>
            <li><a href="#o-nama">O nama</a></li>
            <li><a href="#paketi">Pokloni & paketi</a></li>
            <li><a href="#recenzije">Recenzije</a></li>
            <li><a href="#galerija">Galerija</a></li>
            <li><a href="#kontakt">Kontakt</a></li>
          </ul>
        </div>

        <div className="foot-col">
          <h4>Kontakt</h4>
          <ul>
            <li><a href="tel:+385916071297">091 607 1297</a></li>
            <li><a href="mailto:info@magneticspa.hr">info@magneticspa.hr</a></li>
            <li>Radnička ul. 1<br/>21000 Split</li>
          </ul>
          <div className="foot-hours-compact">
            <span>Pon–Pet: 07:00–20:00</span>
            <span>Sub: 08:00–13:00</span>
          </div>
        </div>
      </div>

      <div className="foot-bottom">
        <span>© 1996—2026 Magnetic Centar Split. Sva prava pridržana.</span>
        <div className="foot-socials">
          <a href="#" aria-label="Instagram"><Icon name="instagram" size={16} /></a>
          <a href="#" aria-label="Facebook"><Icon name="facebook" size={16} /></a>
          <a href="#" aria-label="WhatsApp"><Icon name="whatsapp" size={16} /></a>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  Hero, Ribbon, About, ServicesSection,
  PackagesSection, ReviewsSection, GallerySection, ContactSection, Footer,
});
