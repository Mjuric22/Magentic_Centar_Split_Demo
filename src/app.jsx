/* global React, ReactDOM,
   Nav, Hero, Ribbon, About, ServicesSection,
   PackagesSection, ReviewsSection, GallerySection, ContactSection, Footer,
   StickyCTA, BookingModal,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakText, TweakColor */

const { useState: aS, useEffect: aE } = React;

function App() {
  const [t, setTweak] = useTweaks(window.__TWEAKS_DEFAULTS__ || {});
  const [bookingOpen, setBookingOpen] = aS(false);
  const [showSticky, setShowSticky] = aS(false);

  // Apply palette + headline-font to body
  aE(() => {
    document.body.dataset.palette = t.palette || 'burgundy';
    document.body.dataset.headline = t.headlineFont || 'serif';
    document.body.dataset.density = t.density || 'comfortable';
  }, [t.palette, t.headlineFont, t.density]);

  aE(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll progress bar
  aE(() => {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cursor glow (desktop pointer only)
  aE(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;
    const onMove = (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const openBooking = () => setBookingOpen(true);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <Nav onBook={openBooking} />
      <Hero tweaks={t} onBook={openBooking} />
      <Ribbon />
      <About />
      <ServicesSection onBook={openBooking} />
      <PackagesSection onBook={openBooking} />
      <ReviewsSection />
      <GallerySection />
      <ContactSection onBook={openBooking} />
      <Footer />

      <StickyCTA onBook={openBooking} visible={showSticky && t.showStickyCta} />

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Stil" />
        <TweakColor
          label="Paleta"
          value={(window.__PALETTE_OPTS__ || []).find(p => p.id === t.palette)?.swatch || ['#5e1f29','#d6b27c','#1a0d10']}
          onChange={(v) => {
            const match = (window.__PALETTE_OPTS__ || []).find(p =>
              JSON.stringify(p.swatch).toLowerCase() === JSON.stringify(v).toLowerCase()
            );
            if (match) setTweak('palette', match.id);
          }}
          options={(window.__PALETTE_OPTS__ = [
            { id: 'burgundy', swatch: ['#5e1f29','#d6b27c','#1a0d10'] },
            { id: 'emerald',  swatch: ['#1f4a3c','#c9a56a','#0c1612'] },
            { id: 'rose',     swatch: ['#b07a5a','#f1e4dc','#2b1a1a'] },
            { id: 'charcoal', swatch: ['#2c2c34','#cbb88a','#0e0e10'] },
          ]).map(p => p.swatch)}
        />
        <TweakRadio
          label="Naslovni font"
          value={t.headlineFont}
          onChange={(v) => setTweak('headlineFont', v)}
          options={[
            { value: 'serif', label: 'Serif' },
            { value: 'sans',  label: 'Sans' },
          ]}
        />
        <TweakRadio
          label="Razmaci"
          value={t.density}
          onChange={(v) => setTweak('density', v)}
          options={[
            { value: 'compact',     label: 'Uže' },
            { value: 'comfortable', label: 'Std' },
            { value: 'spacious',    label: 'Šire' },
          ]}
        />

        <TweakSection label="Hero" />
        <TweakText
          label="Naslov"
          value={(t.heroTitle || '').replace(/\n/g, ' / ')}
          onChange={(v) => setTweak('heroTitle', v.replace(/ \/ /g, '\n'))}
        />
        <TweakText
          label="Tagline"
          value={t.heroTagline}
          onChange={(v) => setTweak('heroTagline', v)}
        />

        <TweakSection label="Ostalo" />
        <TweakToggle
          label="Sticky CTA"
          value={t.showStickyCta}
          onChange={(v) => setTweak('showStickyCta', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
