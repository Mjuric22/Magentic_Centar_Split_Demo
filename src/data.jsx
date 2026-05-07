/* global React */
const { useState, useEffect, useMemo, useRef } = React;

// ============================================================
// SERVICES — full list, grouped
// ============================================================
const SERVICE_CATEGORIES = [
  { id: 'lice', label: 'Njega lica' },
  { id: 'tijelo', label: 'Tijelo & oblikovanje' },
  { id: 'masaze', label: 'Masaže' },
  { id: 'nokti', label: 'Manikura & pedikura' },
  { id: 'depilacija', label: 'Depilacija' },
  { id: 'ostalo', label: 'Ostalo' },
];

const SERVICES = [
  {
    cat: 'lice',
    icon: 'face',
    title: 'Njega lica',
    desc: 'Tretmani prilagođeni svakom tipu kože — od dubinskog čišćenja do anti-age njege uz vrhunske preparate.',
    tags: ['HydraFacial', 'Dermapen', 'BB Glow', 'Mikrodermoabrazija', 'Radiofrekvencija'],
  },
  {
    cat: 'tijelo',
    icon: 'body',
    title: 'Oblikovanje tijela',
    desc: 'Centar za mršavljenje i oblikovanje tijela — kombinacija aparativnih tretmana za vidljive rezultate.',
    tags: ['Kavitacija', 'TESLA', 'Maderoterapija', 'Vacuslim', 'Zerona laser'],
  },
  {
    cat: 'masaze',
    icon: 'massage',
    title: 'Masaže',
    desc: 'Klasične, terapeutske i opuštajuće masaže s eteričnim uljima i mirisnim svijećama.',
    tags: ['Relax 45min', 'Mirisne svijeće 60min', 'Hot stone', 'Aromaterapija'],
  },
  {
    cat: 'nokti',
    icon: 'nails',
    title: 'Manikura & pedikura',
    desc: 'SPA pedikura u masažnoj kadi, klasična manikura, lakiranje, gel i umjetni nokti.',
    tags: ['SPA pedikura', 'Gel nokti', 'Juliana Nails', 'Medicinska pedikura'],
  },
  {
    cat: 'depilacija',
    icon: 'wax',
    title: 'Depilacija',
    desc: 'Trajna LPL fotoepilacija, depilacija šećernom pastom i voskom — profesionalno i higijenski.',
    tags: ['LPL fotoepilacija', 'Šećerna pasta', 'Vosak', 'Elektroepilacija'],
  },
  {
    cat: 'ostalo',
    icon: 'sun',
    title: 'Solarij',
    desc: 'Kontrolirano sunčanje za zdrav ten u svakom godišnjem dobu.',
    tags: ['Solarij'],
  },
  {
    cat: 'ostalo',
    icon: 'scissors',
    title: 'Frizerske usluge',
    desc: 'Kompletne frizerske usluge — sve na jednom mjestu, u istoj opuštenoj atmosferi.',
    tags: ['Šišanje', 'Bojanje', 'Stiliziranje'],
  },
  {
    cat: 'lice',
    icon: 'sparkle',
    title: 'Šminkanje & obrve',
    desc: 'Profesionalno šminkanje, oblikovanje obrva i ekstenzije trepavica za posebne prigode.',
    tags: ['Šminkanje', 'Oblikovanje obrva', 'Ekstenzije trepavica'],
  },
];

// ============================================================
// SIGNATURE TREATMENTS — top showcase
// ============================================================
const SIGNATURE = [
  {
    name: 'HydraFacial',
    desc: 'Vrhunski uređaj koji u jednom tretmanu čisti, hidrira i obnavlja kožu — vidljivi rezultati nakon prve seanse.',
    duration: '45 min',
    from: 'od 89 €',
  },
  {
    name: 'TESLA elektromagnet',
    desc: 'Elektromagnetska stimulacija mišića — ekvivalent tisućama kontrakcija u 30 minuta. Za jačanje i oblikovanje.',
    duration: '30 min',
    from: 'od 79 €',
  },
  {
    name: 'Zerona Green Laser',
    desc: 'Prvi neinvazivni hladni laser za preoblikovanje tijela. Bezbolno uklanjanje masnih naslaga.',
    duration: '40 min',
    from: 'od 99 €',
  },
  {
    name: 'Maderoterapija',
    desc: 'Drevna tehnika masaže drvenim valjcima — za antiselulitno djelovanje i oblikovanje tijela.',
    duration: '60 min',
    from: 'od 49 €',
  },
  {
    name: 'Dijamantna mikrodermoabrazija',
    desc: 'Dubinsko čišćenje kože uklanjanjem mrtvih stanica — stimulira proizvodnju kolagena.',
    duration: '45 min',
    from: 'od 55 €',
  },
];

// ============================================================
// PACKAGES (iz SelectBox poklon-paketa)
// ============================================================
const PACKAGES = [
  {
    name: 'Njega u spa-centru',
    price: '29,99 €',
    suffix: 'po osobi',
    desc: 'Savršen poklon za prvi posjet — opuštanje koje budi tijelo i um.',
    items: [
      'Masaža relax s eteričnim uljima (45 min)',
      'ILI Vacuslim tretman tijela',
      'Topla dobrodošlica i čaj',
    ],
  },
  {
    name: 'Masaža & wellness',
    price: '44,99 €',
    suffix: 'po osobi',
    featured: true,
    desc: 'Naš najtraženiji paket — ritual mirisa, dodira i potpune brige za tijelo.',
    items: [
      'Masaža mirisnim svijećama (60 min)',
      'ILI manikura + pedikura s lakiranjem',
      'Konzultacija s kozmetičarkom',
    ],
  },
  {
    name: 'Oaza zdravlja i ljepote',
    price: '89,99 €',
    suffix: 'po osobi',
    desc: 'Kombinirani tretmani — za one koji žele rezultat i opuštanje u istom posjetu.',
    items: [
      'Dijamantna mikrodermoabrazija',
      'ILI kavitacija + presoterapija',
      'ILI Vacuslim (3 tretmana)',
    ],
  },
];

// ============================================================
// REVIEWS (iz Google recenzija)
// ============================================================
const REVIEWS = [
  {
    text: 'Sve pohvale za ljubaznost i profesionalnost. Topla atmosfera i osjećaj kao kod kuće — preporuka obavezno otići.',
    name: 'Ivana P.',
    initials: 'IP',
    stars: 5,
  },
  {
    text: 'Profesionalno osoblje, vrhunska usluga i opuštajući ambijent. Posebno me oduševila gospođa koja radi pedikuru — vrlo brza i pažljiva.',
    name: 'Maja Franetović',
    initials: 'MF',
    stars: 5,
  },
  {
    text: 'Iznimno zadovoljna uslugom i cijenom. Preporuka za Ninu — najbolja je! Vraćat ću se sigurno.',
    name: 'Aline B.',
    initials: 'AB',
    stars: 5,
  },
  {
    text: 'Najbolji HydraFacial u Splitu. Koža izgleda osvježeno i zdravo već nakon prvog tretmana.',
    name: 'Petra K.',
    initials: 'PK',
    stars: 5,
  },
  {
    text: 'Fantastična masaža mirisnim svijećama. Otišla sam potpuno opuštena, kao iz drugog svijeta.',
    name: 'Antonia M.',
    initials: 'AM',
    stars: 5,
  },
  {
    text: 'Zerona laser je napravio rezultate koje sam željela. Profesionalan tim koji prati svaki korak.',
    name: 'Marina S.',
    initials: 'MS',
    stars: 5,
  },
  {
    text: 'Već 5 godina dolazim i nikad razočarana. Stalno su u koraku s novim tretmanima i tehnologijama.',
    name: 'Lana V.',
    initials: 'LV',
    stars: 5,
  },
  {
    text: 'SPA pedikura u masažnoj kadi je pravo opuštanje. Stopala kao nova. Toplo preporučujem!',
    name: 'Karla J.',
    initials: 'KJ',
    stars: 5,
  },
  {
    text: 'Maderoterapija je dala rezultate već nakon par tretmana. Djevojke su prave profesionalke.',
    name: 'Dora B.',
    initials: 'DB',
    stars: 4,
  },
  {
    text: 'Ugodan ambijent, vrhunska kozmetika i osoblje koje stvarno sluša što ti treba.',
    name: 'Tina R.',
    initials: 'TR',
    stars: 5,
  },
];

// ============================================================
// HOURS
// ============================================================
const HOURS = [
  { day: 'Ponedjeljak', time: '07:00 – 20:00', i: 1 },
  { day: 'Utorak',      time: '07:00 – 20:00', i: 2 },
  { day: 'Srijeda',     time: '07:00 – 20:00', i: 3 },
  { day: 'Četvrtak',    time: '07:00 – 20:00', i: 4 },
  { day: 'Petak',       time: '07:00 – 20:00', i: 5 },
  { day: 'Subota',      time: '08:00 – 13:00', i: 6 },
  { day: 'Nedjelja',    time: 'Zatvoreno',     i: 0 },
];

// ============================================================
// BOOKING TREATMENTS (flat list for selection)
// ============================================================
const BOOKING_TREATMENTS = [
  { id: 'hydra',  name: 'HydraFacial',                 dur: '45 min', price: 89 },
  { id: 'derma',  name: 'Dijamantna mikrodermoabrazija', dur: '45 min', price: 55 },
  { id: 'rf',     name: 'Radiofrekvencija lica',       dur: '20 min', price: 49 },
  { id: 'cavi',   name: 'Kavitacija',                  dur: '20 min', price: 39 },
  { id: 'pres',   name: 'Presso terapija',             dur: '20 min', price: 29 },
  { id: 'mader',  name: 'Maderoterapija',              dur: '60 min', price: 49 },
  { id: 'tesla',  name: 'TESLA elektromagnet',         dur: '30 min', price: 79 },
  { id: 'zerona', name: 'Zerona Green Laser',          dur: '40 min', price: 99 },
  { id: 'rmas',   name: 'Masaža relax (eterična ulja)', dur: '45 min', price: 35 },
  { id: 'svij',   name: 'Masaža mirisnim svijećama',   dur: '60 min', price: 49 },
  { id: 'spaped', name: 'SPA pedikura',                dur: '60 min', price: 28 },
  { id: 'mani',   name: 'Manikura + lakiranje',        dur: '45 min', price: 22 },
];

Object.assign(window, {
  SERVICE_CATEGORIES, SERVICES, SIGNATURE, PACKAGES, REVIEWS, HOURS, BOOKING_TREATMENTS,
});
