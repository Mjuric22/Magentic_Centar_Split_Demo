/* global React, Icon, BOOKING_TREATMENTS */
const { useState: _bs, useMemo: _bm } = React;

const MONTH_NAMES = ['Siječanj','Veljača','Ožujak','Travanj','Svibanj','Lipanj','Srpanj','Kolovoz','Rujan','Listopad','Studeni','Prosinac'];
const DOW = ['NED','PON','UTO','SRI','ČET','PET','SUB'];

const TIME_SLOTS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];

function buildMonth(year, month) {
  const first = new Date(year, month, 1);
  const days = [];
  // pad start (Mon-first week)
  const startDow = (first.getDay() + 6) % 7;
  for (let i = 0; i < startDow; i++) days.push(null);
  const last = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= last; d++) days.push(new Date(year, month, d));
  return days;
}

const BookingModal = ({ open, onClose, initialTreatmentId }) => {
  const [step, setStep] = _bs(0);
  const [treatment, setTreatment] = _bs(null);
  const [view, setView] = _bs(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const [date, setDate] = _bs(null);
  const [time, setTime] = _bs(null);
  const [contact, setContact] = _bs({ name: '', phone: '', email: '', notes: '' });
  const [done, setDone] = _bs(false);

  const days = _bm(() => buildMonth(view.y, view.m), [view]);
  const unavailableTimes = _bm(() => {
    if (!date) return new Set();
    const seed = date.getDate() * 13;
    return new Set(TIME_SLOTS.filter((_, i) => ((seed + i * 7) % 5) === 0));
  }, [date]);

  // reset on open
  React.useEffect(() => {
    if (open) {
      setStep(0);
      setDone(false);
      setDate(null);
      setTime(null);
      const d = new Date();
      setView({ y: d.getFullYear(), m: d.getMonth() });
      if (initialTreatmentId) {
        const t = BOOKING_TREATMENTS.find(x => x.id === initialTreatmentId);
        if (t) { setTreatment(t); setStep(1); }
        else setTreatment(null);
      } else {
        setTreatment(null);
      }
    }
  }, [open, initialTreatmentId]);

  if (!open) return null;

  const today = new Date(); today.setHours(0,0,0,0);

  const next = () => setStep(s => Math.min(s + 1, 3));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const submit = () => setDone(true);

  const stepLabels = ['Tretman', 'Datum', 'Vrijeme', 'Podaci'];

  const fmtDate = (d) => d ? `${d.getDate()}. ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}` : '';

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2 className="modal-title">{done ? 'Potvrda rezervacije' : 'Rezerviraj termin'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Zatvori">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="modal-body">
          {!done && (
            <div className="steps">
              {stepLabels.map((lbl, i) => (
                <div key={lbl} className={'step ' + (i === step ? 'active' : i < step ? 'done' : '')}>
                  <div className="step-bar" />
                  <span className="step-lbl">{i + 1}. {lbl}</span>
                </div>
              ))}
            </div>
          )}

          {/* STEP 0 — Treatment */}
          {!done && step === 0 && (
            <>
              <div className="choice-list">
                {BOOKING_TREATMENTS.map(t => (
                  <button
                    key={t.id}
                    className={'choice ' + (treatment?.id === t.id ? 'selected' : '')}
                    onClick={() => setTreatment(t)}
                  >
                    <span className="choice-radio" />
                    <div className="choice-body">
                      <div className="choice-name">{t.name}</div>
                      <div className="choice-meta">{t.dur}</div>
                    </div>
                    <span className="choice-price">{t.price} €</span>
                  </button>
                ))}
              </div>
              <div className="modal-foot">
                <button className="btn btn-ghost" onClick={onClose}>Odustani</button>
                <button className="btn btn-primary" disabled={!treatment} onClick={next}
                  style={{ opacity: treatment ? 1 : 0.4, pointerEvents: treatment ? 'auto' : 'none' }}>
                  Dalje <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </>
          )}

          {/* STEP 1 — Date */}
          {!done && step === 1 && (
            <>
              <div className="cal-head">
                <div className="cal-month">{MONTH_NAMES[view.m]} {view.y}</div>
                <div className="cal-nav">
                  <button onClick={() => setView(v => {
                    const nm = v.m - 1; return nm < 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: nm };
                  })} aria-label="Prethodni mjesec">
                    <Icon name="arrow-left" size={14} />
                  </button>
                  <button onClick={() => setView(v => {
                    const nm = v.m + 1; return nm > 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: nm };
                  })} aria-label="Sljedeći mjesec">
                    <Icon name="arrow-right" size={14} />
                  </button>
                </div>
              </div>
              <div className="cal-grid" style={{ marginBottom: 8 }}>
                {['PON','UTO','SRI','ČET','PET','SUB','NED'].map(d => (
                  <div key={d} style={{ textAlign: 'center', fontSize: 10, letterSpacing: '0.16em', color: 'var(--ink-muted)', padding: '4px 0' }}>
                    {d}
                  </div>
                ))}
              </div>
              <div className="cal-grid">
                {days.map((d, i) => {
                  if (!d) return <div key={i} />;
                  const isPast = d < today;
                  const isSunday = d.getDay() === 0;
                  const disabled = isPast || isSunday;
                  const selected = date && d.toDateString() === date.toDateString();
                  return (
                    <button
                      key={i}
                      className={'cal-day ' + (selected ? 'selected' : '')}
                      disabled={disabled}
                      onClick={() => setDate(d)}
                    >
                      <span>{d.getDate()}</span>
                    </button>
                  );
                })}
              </div>
              <div className="modal-foot">
                <button className="btn btn-ghost" onClick={prev}>
                  <Icon name="arrow-left" size={14} /> Natrag
                </button>
                <button className="btn btn-primary" disabled={!date} onClick={next}
                  style={{ opacity: date ? 1 : 0.4, pointerEvents: date ? 'auto' : 'none' }}>
                  Dalje <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </>
          )}

          {/* STEP 2 — Time */}
          {!done && step === 2 && (
            <>
              <p style={{ color: 'var(--ink-dim)', marginTop: 0, marginBottom: 8 }}>
                Slobodni termini za <strong style={{ color: 'var(--accent)' }}>{fmtDate(date)}</strong>
              </p>
              <div className="times">
                {TIME_SLOTS.map(t => (
                  <button
                    key={t}
                    className={'time-slot ' + (time === t ? 'selected' : '')}
                    disabled={unavailableTimes.has(t)}
                    onClick={() => setTime(t)}
                  >{t}</button>
                ))}
              </div>
              <div className="modal-foot">
                <button className="btn btn-ghost" onClick={prev}>
                  <Icon name="arrow-left" size={14} /> Natrag
                </button>
                <button className="btn btn-primary" disabled={!time} onClick={next}
                  style={{ opacity: time ? 1 : 0.4, pointerEvents: time ? 'auto' : 'none' }}>
                  Dalje <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </>
          )}

          {/* STEP 3 — Contact */}
          {!done && step === 3 && (
            <>
              <div className="summary-card">
                <div className="summary-row"><span className="lbl">Tretman</span><span className="val">{treatment?.name}</span></div>
                <div className="summary-row"><span className="lbl">Datum</span><span className="val">{fmtDate(date)}</span></div>
                <div className="summary-row"><span className="lbl">Vrijeme</span><span className="val">{time}</span></div>
                <div className="summary-row total"><span className="lbl">Ukupno</span><span className="val">{treatment?.price} €</span></div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Ime i prezime</label>
                  <input value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} placeholder="Marija Marić" />
                </div>
                <div className="field">
                  <label>Telefon</label>
                  <input value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} placeholder="091 234 5678" />
                </div>
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="vasa@email.com" />
              </div>
              <div className="field">
                <label>Napomena (opcionalno)</label>
                <textarea rows="3" value={contact.notes} onChange={e => setContact({ ...contact, notes: e.target.value })} placeholder="Ako ima nešto na što želite skrenuti pozornost..." />
              </div>

              <div className="modal-foot">
                <button className="btn btn-ghost" onClick={prev}>
                  <Icon name="arrow-left" size={14} /> Natrag
                </button>
                <button className="btn btn-primary"
                  disabled={!contact.name || !contact.phone}
                  onClick={submit}
                  style={{ opacity: (contact.name && contact.phone) ? 1 : 0.4, pointerEvents: (contact.name && contact.phone) ? 'auto' : 'none' }}>
                  Potvrdi rezervaciju
                </button>
              </div>
            </>
          )}

          {/* DONE */}
          {done && (
            <div className="success">
              <div className="success-icon">
                <Icon name="check" size={36} />
              </div>
              <h3 className="h-display">Hvala vam, {contact.name.split(' ')[0]}!</h3>
              <p>
                Vaša rezervacija za <strong>{treatment?.name}</strong> dana{' '}
                <strong style={{ color: 'var(--accent)' }}>{fmtDate(date)}</strong> u{' '}
                <strong style={{ color: 'var(--accent)' }}>{time}</strong> je primljena.
                Kontaktirat ćemo vas u najkraćem roku radi potvrde.
              </p>
              <button className="btn btn-primary" onClick={onClose}>Zatvori</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { BookingModal });
