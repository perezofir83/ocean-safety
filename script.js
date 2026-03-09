/* OceanSafe Oaxaca · script.js
   Prototype: all API data is mocked.
   Replace MOCK_* objects with real fetch() calls in production. */

'use strict';

// ============================================================
// 1. BEACH DATABASE  (local JSON → replace with beaches.json)
// ============================================================
const BEACHES = [
  {
    id: 'zipolite',
    name: 'Zipolite',
    coords: { lat: 15.6653, lng: -96.4890 },
    dangerLevel: 'high',
    hasLifeguard: false,
    warnings: [
      'Extremely strong rip currents — one of Mexico\'s most dangerous beaches',
      'No lifeguards on duty. You swim at your own risk.',
      'Never swim alone. Always stay within your depth.',
      'Powerful shore break at all tides — even ankle-deep water can knock you down.',
    ],
    currentDiagramType: 'rip_both_ends',
    currentDescription: 'Strong rip currents form at both ends of the beach, near the rock outcrops. The main channel flows directly out to sea. If caught in a rip: DO NOT swim against it. Swim PARALLEL to shore until free, then return diagonally.',
  },
  {
    id: 'san_agustinillo',
    name: 'San Agustinillo',
    coords: { lat: 15.6783, lng: -96.5100 },
    dangerLevel: 'moderate',
    hasLifeguard: false,
    warnings: [
      'Shore break can be powerful, especially at low tide.',
      'Rocky outcrops at both ends — do not swim near them.',
      'No lifeguards on duty.',
      'Longshore drift causes swimmers to be carried east.',
    ],
    currentDiagramType: 'longshore_right',
    currentDescription: 'Longshore current flows steadily from west to east. Swimmers drift gradually and may not notice until they are far from their entry point. Rocky outcrops on both sides create dangerous eddies.',
  },
  {
    id: 'mazunte',
    name: 'Mazunte',
    coords: { lat: 15.6883, lng: -96.5300 },
    dangerLevel: 'moderate',
    hasLifeguard: false,
    warnings: [
      'Calm appearance is deceptive — currents strengthen significantly at high tide.',
      'Stay clear of the east-side rocks toward Punta Cometa.',
      'Sea turtles nest on this beach — do not approach or disturb.',
    ],
    currentDiagramType: 'rip_right',
    currentDescription: 'A rip current channel forms near the rocky point on the east end at high tide. The main beach is calmer, but the current pulls toward the point. Stay well clear of the rocks.',
  },
  {
    id: 'zicatela',
    name: 'Puerto Escondido · Zicatela',
    coords: { lat: 15.8640, lng: -97.0650 },
    dangerLevel: 'extreme',
    hasLifeguard: true,
    warnings: [
      'WORLD-CLASS SURF BREAK — do not enter the water unless you are an expert surfer.',
      'Wave faces exceed 4–8 m during swell season. Shore break is lethal.',
      'Rip current runs the full length of the beach at high speed.',
      'Lifeguards are present but rescue here is extremely dangerous.',
      'Tourists and non-surfers should not wade past knee depth.',
    ],
    currentDiagramType: 'strong_shore_break',
    currentDescription: 'The Zicatela Pipeline: waves dump with enormous force onto a hard sandbar. The full-beach rip current can reach 2–3 knots. Even standing in the shallows is dangerous when a set arrives. SPECTATOR BEACH ONLY for non-surfers.',
  },
  {
    id: 'la_entrega',
    name: 'La Entrega · Huatulco',
    coords: { lat: 15.7487, lng: -96.1423 },
    dangerLevel: 'low',
    hasLifeguard: true,
    warnings: [
      'Protected bay — significantly calmer than open-coast beaches.',
      'Active boat traffic in the marked channel — stay inside the buoys.',
      'Coral reef nearby — do not stand on or touch the coral.',
    ],
    currentDiagramType: 'calm_bay',
    currentDescription: 'Protected bay with minimal swell penetration. Light longshore drift from west to east. The calmest swimming option on this stretch of coast. Still respect the water — tides and boat traffic are real hazards.',
  },
  {
    id: 'ventanilla',
    name: 'La Ventanilla',
    coords: { lat: 15.6540, lng: -96.4530 },
    dangerLevel: 'low',
    hasLifeguard: false,
    warnings: [
      'This is a lagoon and mangrove estuary — NOT an ocean swimming beach.',
      'Crocodiles live in the lagoon — do not enter the water.',
      'Sea turtle nesting area — do not disturb nests or approach hatchlings.',
      'Boat eco-tours available — respect wildlife zones at all times.',
    ],
    currentDiagramType: 'calm_bay',
    currentDescription: 'La Ventanilla is a protected mangrove lagoon and eco-reserve. The Pacific beach is present but the real attraction is the lagoon. Crocodiles inhabit the water — swimming is not appropriate here.',
  },
  {
    id: 'aragon',
    name: 'Playa Aragón',
    coords: { lat: 15.6900, lng: -96.5450 },
    dangerLevel: 'moderate',
    hasLifeguard: false,
    warnings: [
      'Secluded, isolated beach — no services, no cell signal, no help nearby.',
      'Rocky approach — watch your footing, especially at low tide.',
      'Rip current forms along the western rocks.',
      'If something goes wrong here, evacuation is extremely difficult.',
    ],
    currentDiagramType: 'rip_right',
    currentDescription: 'Small secluded cove reached by trail. Rocky outcrops on the western side generate a persistent rip channel. The isolation means any incident is extremely serious — only visit with a group and inform someone of your plans.',
  },
  {
    id: 'playa_amor',
    name: 'Playa del Amor',
    coords: { lat: 15.8625, lng: -97.0720 },
    dangerLevel: 'moderate',
    hasLifeguard: false,
    warnings: [
      'Access only by boat or swimming from Playa Principal — plan your exit before you enter.',
      'Shore break can be strong without warning.',
      'Small cove — currents shift rapidly with swell direction.',
      'No land access: if conditions change, you may be stranded.',
    ],
    currentDiagramType: 'calm_bay',
    currentDescription: 'Small hidden cove near Puerto Escondido. Generally calmer than Zicatela, but swell can enter the bay suddenly. Always have a clear exit plan — there is no road access.',
  },
  {
    id: 'mermejita',
    name: 'La Mermejita',
    coords: { lat: 15.7020, lng: -96.5680 },
    dangerLevel: 'high',
    hasLifeguard: false,
    warnings: [
      'Wild, remote beach — no services, roads, or help of any kind.',
      'Strong rip currents along both rocky ends.',
      'Major sea turtle nesting site — do not walk near the waterline at night.',
      'Path can be cut off at high tide — check tides before visiting.',
      'Never swim alone here under any circumstances.',
    ],
    currentDiagramType: 'rip_both_ends',
    currentDescription: 'Remote rocky beach with powerful currents at both ends. Sea turtles nest here from July to December. The complete isolation means any water emergency is catastrophic — rescue is not possible in any reasonable timeframe.',
  },
  {
    id: 'punta_cometa',
    name: 'Punta Cometa',
    coords: { lat: 15.6830, lng: -96.5340 },
    dangerLevel: 'extreme',
    hasLifeguard: false,
    warnings: [
      'Rocky promontory — THIS IS NOT A SWIMMING BEACH.',
      'Waves crash directly onto bare rocks with no sand or shore.',
      'Wet rocks are extremely slippery — stay well back from the edge.',
      'This is a hiking and sunset viewpoint only.',
      'Mexico\'s southernmost mainland point — strong ocean exposure on all sides.',
    ],
    currentDiagramType: 'strong_shore_break',
    currentDescription: 'Punta Cometa is a rocky headland jutting into the open Pacific — not a beach. Powerful swells arrive from multiple directions and crash onto the rocks without warning. Come for the view, not the water.',
  },
  {
    id: 'panteon',
    name: 'Playa Panteón · Puerto Ángel',
    coords: { lat: 15.6680, lng: -96.4900 },
    dangerLevel: 'low',
    hasLifeguard: false,
    warnings: [
      'Fishing boats are active in the bay — stay clear of boat lanes.',
      'Calmer than nearby open-coast beaches but currents exist beyond the bay.',
      'Stay inside the bay headlands — conditions change sharply outside.',
    ],
    currentDiagramType: 'calm_bay',
    currentDescription: 'Protected cove in Puerto Ángel with gentle conditions most of the year. One of the best swimming options on this coast. Active boat traffic — swim in the central area away from the dock and boat lane.',
  },
  {
    id: 'puerto_angel',
    name: 'Puerto Ángel',
    coords: { lat: 15.6670, lng: -96.4970 },
    dangerLevel: 'low',
    hasLifeguard: false,
    warnings: [
      'Working fishing port — heavy and unpredictable boat traffic.',
      'Water quality near the dock may be affected by port activity.',
      'For swimming, Playa Panteón (10-min walk) is strongly preferred.',
    ],
    currentDiagramType: 'calm_bay',
    currentDescription: 'Main bay of Puerto Ángel town. Protected from open Pacific swell. Boat traffic is constant and a real hazard. For leisure swimming, walk to Playa Panteón or Playa Estacahuite instead.',
  },
  {
    id: 'agua_blanca',
    name: 'Agua Blanca',
    coords: { lat: 15.7550, lng: -96.1300 },
    dangerLevel: 'moderate',
    hasLifeguard: false,
    warnings: [
      'Open Pacific coast — exposed to full ocean swell.',
      'Limited shade and no services — bring water, sunscreen, and food.',
      'Currents build quickly when swell increases.',
      'No lifeguards. You are on your own here.',
    ],
    currentDiagramType: 'longshore_right',
    currentDescription: 'Open bay with moderate Pacific exposure. Calmer than Zipolite on most days but still a full Pacific beach. Longshore current flows east. The relative calm can create a false sense of safety — conditions can deteriorate quickly.',
  },
];

// ============================================================
// 2. MOCK API DATA
//    ↓ Replace with real API calls in production:
//    - Open-Meteo:  https://api.open-meteo.com/v1/marine
//    - WorldTides:  https://www.worldtides.info/api/v3
//    - Google Places: places.googleapis.com
// ============================================================
const MOCK_OPEN_METEO = {
  wave_height:      1.8,   // metres
  wave_period:      11,    // seconds
  uv_index:         9,
  wind_speed_kmh:   18,
  wind_direction_deg: 220,
};

// Live data fetched from Open-Meteo (null until first successful fetch)
let liveData = null;

function getConditionsData() {
  return liveData ?? MOCK_OPEN_METEO;
}

// Tide schedule for today (2026-03-08) — mock WorldTides data
// Each entry: { time: ISO-8601 local, type: 'HIGH'|'LOW', height_m: float }
const MOCK_TIDES = [
  { time: '2026-03-08T02:45:00', type: 'LOW',  height_m: 0.25 },
  { time: '2026-03-08T09:18:00', type: 'HIGH', height_m: 1.45 },
  { time: '2026-03-08T15:52:00', type: 'LOW',  height_m: 0.20 },
  { time: '2026-03-08T22:11:00', type: 'HIGH', height_m: 1.52 },
  { time: '2026-03-09T03:30:00', type: 'LOW',  height_m: 0.28 }, // next-day for edge case
];

const MOCK_PHOTOS = [
  { url: 'https://placehold.co/300x200/0077B6/white?text=📸+Beach+View',   alt: 'Beach panorama' },
  { url: 'https://placehold.co/300x200/023E8A/white?text=🌊+Ocean+Waves',  alt: 'Ocean waves' },
  { url: 'https://placehold.co/300x200/00B4D8/white?text=🏖️+Shoreline',   alt: 'Shoreline at sunset' },
];

const MOCK_REVIEWS = [
  {
    author: 'Maria G.',
    rating: 4,
    text: 'Beautiful beach but the currents are very strong. Only for experienced swimmers. We saw warning signs about rip currents — take them seriously.',
    date: '2026-03-01',
    url: '#',
  },
  {
    author: 'James T.',
    rating: 5,
    text: 'Stunning scenery. Locals warned us not to swim past the first waves. We sat on the sand and watched the sunset instead — absolutely perfect.',
    date: '2026-02-22',
    url: '#',
  },
  {
    author: 'Sophie R.',
    rating: 3,
    text: 'El mar está muy pesado. We asked a local fisherman who said this is normal — the Pacific here is nothing like the Caribbean. Respect the ocean.',
    date: '2026-02-18',
    url: '#',
  },
];

// ============================================================
// 3. TRANSLATIONS (i18n)
// ============================================================
const TRANSLATIONS = {
  en: {
    tideLabel:        'OCEAN TIDE',
    rising:           'SEA IS RISING',
    falling:          'SEA IS FALLING',
    slack:            'PEAK / SLACK WATER',
    unknownTide:      'TIDE DATA UNAVAILABLE',
    nextHigh:         'Next HIGH tide',
    nextLow:          'Next LOW tide',
    in:               'in',
    waves:            'Waves',
    uvLabel:          'UV Index',
    swellPower:       'Swell Power',
    currentLabel:     'TYPICAL CURRENT PATTERN',
    warningsLabel:    '⚠️ IMPORTANT WARNINGS',
    cocktailLabel:    'THE DANGER COCKTAIL',
    cocktailSubtitle: 'Why alcohol + sun + ocean kills',
    alcohol:          'Alcohol',
    alcoholEffect:    'Slows reaction time & impairs judgment',
    heat:             'Heat / Sun',
    heatEffect:       'Accelerates dehydration & confusion',
    currents:         'Currents',
    currentsEffect:   'Can overpower even strong swimmers',
    cocktailResult:   'LIFE-THREATENING',
    cocktailTip:      'If you drink, stay on the beach. The ocean is not a pool.',
    photosLabel:      'RECENT BEACH PHOTOS',
    photosSource:     'Photos via Google Places',
    reviewsLabel:     'RECENT VISITOR REVIEWS',
    reviewsMore:      'See all reviews on Google →',
    githubStar:       'Found this helpful? Star us on GitHub — it\'s a free, open project for public safety.',
    selectBeach:      'Select Your Beach',
    useLocation:      'Use My Current Location',
    orSelect:         '— or select manually —',
    changeBeach:      'Change',
    detecting:        'Detecting location…',
    lifeguardYes:     '🛟  Lifeguard on duty',
    lifeguardNo:      '⚡  No lifeguard on duty',
    mockBadge:        '🟡  Mock data · Prototype',
    dangerLevel: {
      low:      'Low Risk',
      moderate: 'Moderate Risk',
      high:     'High Risk',
      extreme:  'EXTREME RISK',
    },
    waveDesc: {
      calm:      'Calm',
      moderate:  'Moderate',
      rough:     'Rough',
      dangerous: 'Dangerous',
    },
    uvDesc: {
      low:        'Low — enjoy the outdoors',
      moderate:   'Moderate — apply sunscreen',
      high:       'High — limit sun exposure',
      'very-high':'Very High — seek shade now',
      extreme:    'Extreme — stay indoors',
    },
    uvAction: {
      high:        '🔆  HIGH UV · Apply SPF 50+',
      'very-high': '🔆  VERY HIGH UV · Seek shade immediately',
      extreme:     '🔆  EXTREME UV · Stay indoors or stay fully covered',
    },
    waveTip: {
      calm:      'OK for most swimmers',
      moderate:  'Watch the pull-back',
      rough:     'Wade only — strong undertow',
      dangerous: '⛔ Do not enter the water',
    },
    periodTip: {
      low:    'Choppy — less force',
      medium: 'Respect the surf',
      high:   'Stronger than it looks',
    },
  },

  es: {
    tideLabel:        'MAREA OCEÁNICA',
    rising:           'EL MAR ESTÁ SUBIENDO',
    falling:          'EL MAR ESTÁ BAJANDO',
    slack:            'MAREA EN SU PUNTO MÁXIMO',
    unknownTide:      'DATOS DE MAREA NO DISPONIBLES',
    nextHigh:         'Próxima marea ALTA',
    nextLow:          'Próxima marea BAJA',
    in:               'en',
    waves:            'Oleaje',
    uvLabel:          'Índice UV',
    swellPower:       'Fuerza del Mar',
    currentLabel:     'PATRÓN DE CORRIENTE TÍPICO',
    warningsLabel:    '⚠️ ADVERTENCIAS IMPORTANTES',
    cocktailLabel:    'EL CÓCTEL DEL PELIGRO',
    cocktailSubtitle: 'Por qué alcohol + sol + mar mata',
    alcohol:          'Alcohol',
    alcoholEffect:    'Lentifica reacciones y altera el juicio',
    heat:             'Calor / Sol',
    heatEffect:       'Acelera la deshidratación y la confusión',
    currents:         'Corrientes',
    currentsEffect:   'Pueden superar incluso a nadadores fuertes',
    cocktailResult:   'RIESGO DE MUERTE',
    cocktailTip:      'Si bebes, quédate en la playa. El mar no es una alberca.',
    photosLabel:      'FOTOS RECIENTES DE LA PLAYA',
    photosSource:     'Fotos vía Google Places',
    reviewsLabel:     'RESEÑAS RECIENTES DE VISITANTES',
    reviewsMore:      'Ver todas las reseñas en Google →',
    githubStar:       '¿Te fue útil? Danos una estrella en GitHub — es un proyecto gratuito y abierto para la seguridad pública.',
    selectBeach:      'Selecciona tu Playa',
    useLocation:      'Usar Mi Ubicación Actual',
    orSelect:         '— o selecciona manualmente —',
    changeBeach:      'Cambiar',
    detecting:        'Detectando ubicación…',
    lifeguardYes:     '🛟  Salvavidas presente',
    lifeguardNo:      '⚡  Sin salvavidas',
    mockBadge:        '🟡  Datos de prueba · Prototipo',
    dangerLevel: {
      low:      'Riesgo Bajo',
      moderate: 'Riesgo Moderado',
      high:     'Riesgo Alto',
      extreme:  'RIESGO EXTREMO',
    },
    waveDesc: {
      calm:      'Calmado',
      moderate:  'Moderado',
      rough:     'Fuerte',
      dangerous: 'Peligroso',
    },
    uvDesc: {
      low:        'Bajo — sin problema',
      moderate:   'Moderado — usa protector solar',
      high:       'Alto — limita tu exposición',
      'very-high':'Muy alto — busca sombra ahora',
      extreme:    'Extremo — quédate adentro',
    },
    uvAction: {
      high:        '🔆  UV ALTO · Aplica SPF 50+',
      'very-high': '🔆  UV MUY ALTO · Busca sombra inmediatamente',
      extreme:     '🔆  UV EXTREMO · Quédate adentro o cúbrete completamente',
    },
    waveTip: {
      calm:      'Apto para la mayoría',
      moderate:  'Cuidado con el tirón',
      rough:     'Solo hasta la rodilla — resaca fuerte',
      dangerous: '⛔ No entres al agua',
    },
    periodTip: {
      low:    'Corto — menos fuerza',
      medium: 'Respeta el oleaje',
      high:   'Más potente de lo que parece',
    },
  },

  fr: {
    tideLabel:        'MARÉE OCÉANIQUE',
    rising:           'LA MER MONTE',
    falling:          'LA MER DESCEND',
    slack:            'ÉTALE / HAUTE MER',
    unknownTide:      'DONNÉES DE MARÉE INDISPONIBLES',
    nextHigh:         'Prochaine marée HAUTE',
    nextLow:          'Prochaine marée BASSE',
    in:               'dans',
    waves:            'Vagues',
    uvLabel:          'Indice UV',
    swellPower:       'Force du Ressac',
    currentLabel:     'COURANT TYPIQUE',
    warningsLabel:    '⚠️ AVERTISSEMENTS IMPORTANTS',
    cocktailLabel:    'LE COCKTAIL MORTEL',
    cocktailSubtitle: 'Pourquoi alcool + soleil + mer tue',
    alcohol:          'Alcool',
    alcoholEffect:    'Ralentit les réflexes et altère le jugement',
    heat:             'Chaleur / Soleil',
    heatEffect:       'Accélère la déshydratation et la confusion',
    currents:         'Courants',
    currentsEffect:   'Peuvent dépasser même les nageurs forts',
    cocktailResult:   'DANGER DE MORT',
    cocktailTip:      'Si vous buvez, restez sur la plage. L\'océan n\'est pas une piscine.',
    photosLabel:      'PHOTOS RÉCENTES DE LA PLAGE',
    photosSource:     'Photos via Google Places',
    reviewsLabel:     'AVIS RÉCENTS DES VISITEURS',
    reviewsMore:      'Voir tous les avis sur Google →',
    githubStar:       'Vous avez trouvé cela utile ? Donnez-nous une étoile sur GitHub — c\'est un projet gratuit et ouvert pour la sécurité publique.',
    selectBeach:      'Choisir une plage',
    useLocation:      'Utiliser ma position actuelle',
    orSelect:         '— ou sélectionner manuellement —',
    changeBeach:      'Changer',
    detecting:        'Détection en cours…',
    lifeguardYes:     '🛟  Maître-nageur présent',
    lifeguardNo:      '⚡  Pas de maître-nageur',
    mockBadge:        '🟡  Données simulées · Prototype',
    dangerLevel: {
      low:      'Risque Faible',
      moderate: 'Risque Modéré',
      high:     'Risque Élevé',
      extreme:  'RISQUE EXTRÊME',
    },
    waveDesc: {
      calm:      'Calme',
      moderate:  'Modéré',
      rough:     'Agité',
      dangerous: 'Dangereux',
    },
    uvDesc: {
      low:         'Faible — profitez de l\'extérieur',
      moderate:    'Modéré — appliquez de la crème solaire',
      high:        'Élevé — limitez l\'exposition',
      'very-high': 'Très élevé — cherchez l\'ombre',
      extreme:     'Extrême — restez à l\'intérieur',
    },
    uvAction: {
      high:        '🔆  UV ÉLEVÉ · Appliquez SPF 50+',
      'very-high': '🔆  UV TRÈS ÉLEVÉ · Cherchez l\'ombre maintenant',
      extreme:     '🔆  UV EXTRÊME · Restez couvert ou à l\'intérieur',
    },
    waveTip: {
      calm:      'Convient à la plupart',
      moderate:  'Attention au ressac',
      rough:     'Max jusqu\'aux genoux — fort ressac',
      dangerous: '⛔ N\'entrez pas dans l\'eau',
    },
    periodTip: {
      low:    'Court — moins de force',
      medium: 'Respectez le surf',
      high:   'Plus puissant qu\'il n\'y paraît',
    },
  },

  nl: {
    tideLabel:        'OCEAANGETIJ',
    rising:           'ZEE STIJGT',
    falling:          'ZEE DAALT',
    slack:            'HOOG- / KENTERING',
    unknownTide:      'GETIJDATA NIET BESCHIKBAAR',
    nextHigh:         'Volgend HOOGWATER',
    nextLow:          'Volgend LAAGWATER',
    in:               'over',
    waves:            'Golven',
    uvLabel:          'UV-index',
    swellPower:       'Golfkracht',
    currentLabel:     'TYPISCH STROOMPATROON',
    warningsLabel:    '⚠️ BELANGRIJKE WAARSCHUWINGEN',
    cocktailLabel:    'DE DODELIJKE COCKTAIL',
    cocktailSubtitle: 'Waarom alcohol + zon + zee dodelijk is',
    alcohol:          'Alcohol',
    alcoholEffect:    'Vertraagt reacties en verslechtert het oordeel',
    heat:             'Hitte / Zon',
    heatEffect:       'Versnelt uitdroging en verwarring',
    currents:         'Stroming',
    currentsEffect:   'Kan zelfs sterke zwemmers overmeesteren',
    cocktailResult:   'LEVENSGEVAARLIJK',
    cocktailTip:      'Als u drinkt, blijf op het strand. De oceaan is geen zwembad.',
    photosLabel:      'RECENTE STRANDFOTO\'S',
    photosSource:     'Foto\'s via Google Places',
    reviewsLabel:     'RECENTE BEZOEKERSERVARINGEN',
    reviewsMore:      'Zie alle reviews op Google →',
    githubStar:       'Was dit nuttig? Geef ons een ster op GitHub — het is een gratis, open project voor openbare veiligheid.',
    selectBeach:      'Kies een strand',
    useLocation:      'Gebruik mijn huidige locatie',
    orSelect:         '— of kies handmatig —',
    changeBeach:      'Wijzigen',
    detecting:        'Locatie bepalen…',
    lifeguardYes:     '🛟  Strandwacht aanwezig',
    lifeguardNo:      '⚡  Geen strandwacht',
    mockBadge:        '🟡  Nep-data · Prototype',
    dangerLevel: {
      low:      'Laag Risico',
      moderate: 'Matig Risico',
      high:     'Hoog Risico',
      extreme:  'EXTREEM RISICO',
    },
    waveDesc: {
      calm:      'Rustig',
      moderate:  'Matig',
      rough:     'Ruw',
      dangerous: 'Gevaarlijk',
    },
    uvDesc: {
      low:         'Laag — geniet van buiten',
      moderate:    'Matig — gebruik zonnebrand',
      high:        'Hoog — beperk blootstelling',
      'very-high': 'Zeer hoog — zoek schaduw',
      extreme:     'Extreem — blijf binnen',
    },
    uvAction: {
      high:        '🔆  HOGE UV · Gebruik SPF 50+',
      'very-high': '🔆  ZEER HOGE UV · Zoek nu schaduw',
      extreme:     '🔆  EXTREME UV · Blijf binnen of bedek uzelf volledig',
    },
    waveTip: {
      calm:      'Geschikt voor de meesten',
      moderate:  'Let op de terugstroom',
      rough:     'Max tot de knieën — sterke onderstroming',
      dangerous: '⛔ Ga het water niet in',
    },
    periodTip: {
      low:    'Kort — minder kracht',
      medium: 'Respecteer de branding',
      high:   'Krachtiger dan het lijkt',
    },
  },

  de: {
    tideLabel:        'MEERESGEZEITEN',
    rising:           'MEER STEIGT AN',
    falling:          'MEER FÄLLT AB',
    slack:            'HOCH- / NIEDRIGWASSER',
    unknownTide:      'GEZEITENDATEN NICHT VERFÜGBAR',
    nextHigh:         'Nächstes HOCHWASSER',
    nextLow:          'Nächstes NIEDRIGWASSER',
    in:               'in',
    waves:            'Wellen',
    uvLabel:          'UV-Index',
    swellPower:       'Wellenstärke',
    currentLabel:     'TYPISCHES STRÖMUNGSMUSTER',
    warningsLabel:    '⚠️ WICHTIGE WARNHINWEISE',
    cocktailLabel:    'DER TÖDLICHE COCKTAIL',
    cocktailSubtitle: 'Warum Alkohol + Sonne + Meer tötet',
    alcohol:          'Alkohol',
    alcoholEffect:    'Verlangsamt Reaktionen und trübt das Urteil',
    heat:             'Hitze / Sonne',
    heatEffect:       'Beschleunigt Austrocknung und Verwirrung',
    currents:         'Strömungen',
    currentsEffect:   'Können selbst starke Schwimmer überwältigen',
    cocktailResult:   'LEBENSGEFÄHRLICH',
    cocktailTip:      'Wenn Sie trinken, bleiben Sie am Strand. Der Ozean ist kein Schwimmbad.',
    photosLabel:      'AKTUELLE STRANDFOTOS',
    photosSource:     'Fotos über Google Places',
    reviewsLabel:     'AKTUELLE BESUCHERBEWERTUNGEN',
    reviewsMore:      'Alle Bewertungen auf Google ansehen →',
    githubStar:       'War das hilfreich? Geben Sie uns einen Stern auf GitHub — es ist ein kostenloses, offenes Projekt für die öffentliche Sicherheit.',
    selectBeach:      'Strand auswählen',
    useLocation:      'Meinen aktuellen Standort verwenden',
    orSelect:         '— oder manuell auswählen —',
    changeBeach:      'Ändern',
    detecting:        'Standort wird ermittelt…',
    lifeguardYes:     '🛟  Rettungsschwimmer vor Ort',
    lifeguardNo:      '⚡  Kein Rettungsschwimmer',
    mockBadge:        '🟡  Testdaten · Prototyp',
    dangerLevel: {
      low:      'Geringes Risiko',
      moderate: 'Mäßiges Risiko',
      high:     'Hohes Risiko',
      extreme:  'EXTREMES RISIKO',
    },
    waveDesc: {
      calm:      'Ruhig',
      moderate:  'Mäßig',
      rough:     'Rau',
      dangerous: 'Gefährlich',
    },
    uvDesc: {
      low:         'Niedrig — draußen genießen',
      moderate:    'Mäßig — Sonnencreme auftragen',
      high:        'Hoch — Aufenthalt begrenzen',
      'very-high': 'Sehr hoch — Schatten suchen',
      extreme:     'Extrem — drinnen bleiben',
    },
    uvAction: {
      high:        '🔆  HOHER UV · SPF 50+ auftragen',
      'very-high': '🔆  SEHR HOHER UV · Jetzt Schatten suchen',
      extreme:     '🔆  EXTREMER UV · Drinnen bleiben oder vollständig bedecken',
    },
    waveTip: {
      calm:      'Für die meisten geeignet',
      moderate:  'Auf den Rückzug achten',
      rough:     'Max. bis zu den Knien — starke Unterströmung',
      dangerous: '⛔ Nicht ins Wasser gehen',
    },
    periodTip: {
      low:    'Kurz — weniger Kraft',
      medium: 'Brandung respektieren',
      high:   'Stärker als es aussieht',
    },
  },
};

// ============================================================
// 4. APP STATE
// ============================================================

const LANGS = ['en', 'es', 'fr', 'nl', 'de'];
const LANG_FLAGS = { en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷', nl: '🇳🇱', de: '🇩🇪' };

// Auto-detect browser language on first load
function detectBrowserLang() {
  const l = (navigator.language || 'en').toLowerCase();
  if (l.startsWith('es')) return 'es';
  if (l.startsWith('fr')) return 'fr';
  if (l.startsWith('nl')) return 'nl';
  if (l.startsWith('de')) return 'de';
  return 'en';
}

const state = {
  lang:         detectBrowserLang(),
  currentBeach: BEACHES[0], // default: Zipolite
};

// ============================================================
// 5. TIDE STATE LOGIC
// ============================================================
/**
 * getTideState(tideEvents, now)
 *
 * HOW IT WORKS:
 * Tides follow a sinusoidal cycle. Between any two consecutive
 * tide events (LOW → HIGH or HIGH → LOW) there is a half-cycle
 * of roughly 6 hours 13 minutes.
 *
 * Algorithm:
 *   1. Sort all events chronologically.
 *   2. Find prevEvent (most recent event BEFORE now).
 *   3. Find nextEvent (the next event AFTER now).
 *   4. Compute pct = elapsed / total_duration_of_this_half_cycle.
 *      pct = 0 → just left prevEvent, pct = 1 → just reached nextEvent.
 *   5. If pct < SLACK_THRESHOLD or pct > (1 - SLACK_THRESHOLD):
 *        → We are near a tide turning point → state = 'SLACK'
 *        (e.g. within ~30 min of high or low tide)
 *   6. Otherwise:
 *        prevEvent.type === 'LOW'  → state = 'RISING'
 *        prevEvent.type === 'HIGH' → state = 'FALLING'
 *
 * Returns { state, prevEvent, nextEvent, pct }
 */
function getTideState(tideEvents, now) {
  now = now || new Date();

  if (!tideEvents || tideEvents.length < 2) {
    return { state: 'UNKNOWN', prevEvent: null, nextEvent: null, pct: 0 };
  }

  const sorted = [...tideEvents].sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );

  let prevEvent = null;
  let nextEvent = null;

  for (const ev of sorted) {
    if (new Date(ev.time) <= now) {
      prevEvent = ev;
    } else if (!nextEvent) {
      nextEvent = ev;
    }
  }

  if (!prevEvent || !nextEvent) {
    return { state: 'UNKNOWN', prevEvent, nextEvent, pct: 0 };
  }

  const totalMs   = new Date(nextEvent.time) - new Date(prevEvent.time);
  const elapsedMs = now - new Date(prevEvent.time);
  const pct       = elapsedMs / totalMs; // clamped 0→1 within half-cycle

  // Within 8% of either end ≈ ~30 min for a typical 6.2h half-cycle
  const SLACK_THRESHOLD = 0.08;
  if (pct < SLACK_THRESHOLD || pct > (1 - SLACK_THRESHOLD)) {
    return { state: 'SLACK', prevEvent, nextEvent, pct };
  }

  const tideState = prevEvent.type === 'LOW' ? 'RISING' : 'FALLING';
  return { state: tideState, prevEvent, nextEvent, pct };
}

function formatTimeUntil(targetDate, now) {
  now = now || new Date();
  const diffMs    = new Date(targetDate) - now;
  if (diffMs <= 0) return '0m';
  const totalMins = Math.floor(diffMs / 60000);
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString(
    state.lang === 'es' ? 'es-MX' : 'en-US',
    { hour: '2-digit', minute: '2-digit', hour12: false }
  );
}

// ============================================================
// 6. CONDITIONS HELPERS
// ============================================================
function getUVCategory(uv) {
  if (uv <= 2)  return 'low';
  if (uv <= 5)  return 'moderate';
  if (uv <= 7)  return 'high';
  if (uv <= 10) return 'very-high';
  return 'extreme';
}

function getWaveCategory(h) {
  if (h < 0.5)  return 'calm';
  if (h < 1.5)  return 'moderate';
  if (h < 2.5)  return 'rough';
  return 'dangerous';
}

function getPeriodCategory(s) {
  if (s < 7)  return 'low';
  if (s < 12) return 'medium';
  return 'high';
}

// ============================================================
// 7. SVG: TIDE SINE WAVE CHART
// ============================================================
function renderTideSineChart(prevEvent, nextEvent, pct) {
  const W   = 300;
  const H   = 88;
  const PAD = 10;
  const N   = 80;       // number of curve segments
  const MAX_H = 2.0;    // reference maximum tide height in metres

  const prevH = prevEvent.height_m;
  const nextH = nextEvent.height_m;
  const baseY = H - PAD;   // y-position for tide height = 0
  const topY  = PAD;       // y-position for MAX_H
  const range = baseY - topY;

  // Build the polyline points using cosine interpolation:
  // This smoothly models the sinusoidal tidal curve between the two events.
  const points = [];
  for (let i = 0; i <= N; i++) {
    const frac = i / N;
    const px   = PAD + frac * (W - 2 * PAD);
    // Cosine easing: 0 → 1 maps from prevH to nextH along a smooth arc
    const ht   = prevH + (nextH - prevH) * (1 - Math.cos(frac * Math.PI)) / 2;
    const py   = baseY - (ht / MAX_H) * range;
    points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  // Current position dot on the curve
  const cx      = PAD + pct * (W - 2 * PAD);
  const currentH = prevH + (nextH - prevH) * (1 - Math.cos(pct * Math.PI)) / 2;
  const cy      = baseY - (currentH / MAX_H) * range;

  // Slice points for the "elapsed" filled region
  const splitIdx      = Math.round(pct * N);
  const elapsedPoints = points.slice(0, splitIdx + 1);

  const prevLabel = prevEvent.type === 'LOW'  ? '▼ LOW'  : '▲ HIGH';
  const nextLabel = nextEvent.type === 'LOW'  ? '▼ LOW'  : '▲ HIGH';
  const prevTime  = formatTime(prevEvent.time);
  const nextTime  = formatTime(nextEvent.time);

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Wave fill (full arc) -->
  <polygon
    points="${PAD},${baseY} ${points.join(' ')} ${W - PAD},${baseY}"
    fill="rgba(144,224,239,0.15)"
    stroke="none"/>

  <!-- Wave line -->
  <polyline
    points="${points.join(' ')}"
    fill="none"
    stroke="#90E0EF"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"/>

  <!-- Elapsed fill (brighter) -->
  <polygon
    points="${PAD},${baseY} ${elapsedPoints.join(' ')} ${cx.toFixed(1)},${baseY}"
    fill="rgba(144,224,239,0.28)"
    stroke="none"/>

  <!-- NOW dot -->
  <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="7"
    fill="#F9C74F" stroke="#1A1A2E" stroke-width="1.5"/>
  <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="11"
    fill="none" stroke="rgba(249,199,79,0.35)" stroke-width="2"/>

  <!-- Labels -->
  <text x="${PAD + 2}" y="${H - 2}" font-size="7.5"
    fill="rgba(255,255,255,0.55)" font-family="sans-serif" font-weight="bold"
  >${prevLabel} ${prevTime}</text>

  <text x="${W - PAD - 2}" y="${H - 2}" font-size="7.5"
    fill="rgba(255,255,255,0.55)" font-family="sans-serif" font-weight="bold"
    text-anchor="end"
  >${nextLabel} ${nextTime}</text>
</svg>`;
}

// ============================================================
// 8. SVG: BEACH CURRENT DIAGRAMS (bird's-eye view)
// ============================================================
function renderCurrentDiagram(type) {
  const W = 320;
  const H = 190;

  // Reusable SVG arrow markers
  const defs = `<defs>
    <marker id="aRed"    markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#D62828"/></marker>
    <marker id="aOrange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#F77F00"/></marker>
    <marker id="aBlue"   markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#0077B6"/></marker>
    <marker id="aCyan"   markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#00B4D8"/></marker>
  </defs>`;

  // Common layers
  const water = `<rect width="${W}" height="${H}" fill="#ADE8F4"/>`;
  const sand  = `<path d="M0,${H*0.76} Q${W/4},${H*0.70} ${W/2},${H*0.73} Q${W*0.75},${H*0.76} ${W},${H*0.71} L${W},${H} L0,${H}Z" fill="#F9C74F"/>`;
  const shore = `<text x="${W/2}" y="${H*0.86}" text-anchor="middle" font-size="8.5" fill="rgba(0,0,0,0.35)" font-family="sans-serif" font-weight="bold">◻  SHORELINE  ◻</text>`;
  // North indicator
  const north = `<g transform="translate(${W-22},14)">
    <circle r="11" fill="rgba(255,255,255,0.7)"/>
    <text y="4" text-anchor="middle" font-size="10" fill="#1A1A2E" font-family="sans-serif" font-weight="900">N</text>
    <text y="4" x="0" dy="-7" text-anchor="middle" font-size="8" fill="#1A1A2E" font-family="sans-serif">▲</text>
  </g>`;

  // Legends
  const legRip  = `<g transform="translate(4,4)"><rect width="72" height="18" rx="4" fill="rgba(214,40,40,0.88)"/><text x="7" y="13" font-size="7.5" fill="white" font-family="sans-serif" font-weight="bold">● RIP CURRENT</text></g>`;
  const legLong = `<g transform="translate(4,26)"><rect width="72" height="18" rx="4" fill="rgba(0,119,182,0.88)"/><text x="7" y="13" font-size="7.5" fill="white" font-family="sans-serif" font-weight="bold">● LONGSHORE</text></g>`;

  let body = '';

  switch (type) {
    case 'rip_both_ends':
      body = `
        <!-- Rocks at both ends -->
        <ellipse cx="24"       cy="${H*0.74}" rx="20" ry="11" fill="#6B7280" opacity="0.82"/>
        <ellipse cx="${W-24}"  cy="${H*0.74}" rx="20" ry="11" fill="#6B7280" opacity="0.82"/>
        <text x="24"       y="${H*0.74+4}" text-anchor="middle" font-size="7" fill="white" font-family="sans-serif" font-weight="bold">ROCKS</text>
        <text x="${W-24}"  y="${H*0.74+4}" text-anchor="middle" font-size="7" fill="white" font-family="sans-serif" font-weight="bold">ROCKS</text>
        <!-- Left rip channel (outgoing) -->
        <line x1="38"  y1="${H*0.70}" x2="38"  y2="${H*0.12}" stroke="#D62828" stroke-width="3.5" marker-end="url(#aRed)"/>
        <line x1="56"  y1="${H*0.70}" x2="56"  y2="${H*0.12}" stroke="#D62828" stroke-width="2.5" stroke-dasharray="5,3" marker-end="url(#aRed)"/>
        <!-- Right rip channel (outgoing) -->
        <line x1="${W-38}"  y1="${H*0.70}" x2="${W-38}"  y2="${H*0.12}" stroke="#D62828" stroke-width="3.5" marker-end="url(#aRed)"/>
        <line x1="${W-56}"  y1="${H*0.70}" x2="${W-56}"  y2="${H*0.12}" stroke="#D62828" stroke-width="2.5" stroke-dasharray="5,3" marker-end="url(#aRed)"/>
        <!-- Feeder currents along shore -->
        <line x1="130"      y1="${H*0.67}" x2="62"  y2="${H*0.67}" stroke="#F77F00" stroke-width="2" marker-end="url(#aOrange)"/>
        <line x1="${W-130}" y1="${H*0.67}" x2="${W-62}" y2="${H*0.67}" stroke="#F77F00" stroke-width="2" marker-end="url(#aOrange)"/>
        <!-- Rip spreading offshore -->
        <path d="M44,${H*0.14} Q80,${H*0.06} 130,${H*0.10}" fill="none" stroke="#D62828" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6"/>
        <path d="M${W-44},${H*0.14} Q${W-80},${H*0.06} ${W-130},${H*0.10}" fill="none" stroke="#D62828" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6"/>
        ${legRip}`;
      break;

    case 'rip_right':
      body = `
        <!-- Rock on right -->
        <ellipse cx="${W-26}" cy="${H*0.74}" rx="22" ry="12" fill="#6B7280" opacity="0.82"/>
        <text x="${W-26}" y="${H*0.74+4}" text-anchor="middle" font-size="7" fill="white" font-family="sans-serif" font-weight="bold">ROCKS</text>
        <!-- Rip channel right -->
        <line x1="${W-42}"  y1="${H*0.70}" x2="${W-42}"  y2="${H*0.12}" stroke="#D62828" stroke-width="3.5" marker-end="url(#aRed)"/>
        <line x1="${W-60}"  y1="${H*0.70}" x2="${W-60}"  y2="${H*0.12}" stroke="#D62828" stroke-width="2.5" stroke-dasharray="5,3" marker-end="url(#aRed)"/>
        <!-- Feeder current -->
        <line x1="80" y1="${H*0.67}" x2="${W-65}" y2="${H*0.67}" stroke="#F77F00" stroke-width="2" marker-end="url(#aOrange)"/>
        <!-- Light swell -->
        <path d="M30,${H*0.38} Q${W/2},${H*0.32} ${W-60},${H*0.38}" fill="none" stroke="white" stroke-width="1.8" opacity="0.65"/>
        ${legRip}`;
      break;

    case 'longshore_right':
      body = `
        <!-- Longshore current arrows -->
        <line x1="22"  y1="${H*0.55}" x2="${W-22}" y2="${H*0.55}" stroke="#0077B6" stroke-width="3.5" marker-end="url(#aBlue)"/>
        <line x1="22"  y1="${H*0.64}" x2="${W-22}" y2="${H*0.64}" stroke="#0077B6" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#aBlue)"/>
        <!-- Incoming swell (diagonal) -->
        <path d="M20,${H*0.38} Q${W/3},${H*0.32} ${W*0.7},${H*0.38}" fill="none" stroke="white" stroke-width="2" opacity="0.7"/>
        <path d="M20,${H*0.28} Q${W/4},${H*0.23} ${W*0.6},${H*0.28}" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
        ${legLong}`;
      break;

    case 'strong_shore_break':
      body = `
        <!-- Impact zone highlight -->
        <rect x="0" y="${H*0.57}" width="${W}" height="${H*0.17}" fill="rgba(214,40,40,0.22)"/>
        <text x="${W/2}" y="${H*0.67}" text-anchor="middle" font-size="8.5" fill="#D62828" font-family="sans-serif" font-weight="bold">⚠  WAVE IMPACT ZONE</text>
        <!-- Full-beach rip on both sides -->
        <line x1="22"      y1="${H*0.54}" x2="22"      y2="${H*0.10}" stroke="#D62828" stroke-width="3" marker-end="url(#aRed)"/>
        <line x1="${W-22}" y1="${H*0.54}" x2="${W-22}" y2="${H*0.10}" stroke="#D62828" stroke-width="3" marker-end="url(#aRed)"/>
        <!-- Big breaking waves -->
        <path d="M0,${H*0.42} Q${W/3},${H*0.35} ${W*0.67},${H*0.42} Q${W*0.85},${H*0.47} ${W},${H*0.42}"
          fill="none" stroke="white" stroke-width="3.5" opacity="0.88"/>
        <path d="M0,${H*0.30} Q${W/4},${H*0.24} ${W/2},${H*0.30} Q${W*0.75},${H*0.36} ${W},${H*0.30}"
          fill="none" stroke="white" stroke-width="2.5" opacity="0.6"/>
        <!-- DO NOT ENTER label -->
        <rect x="${W/2-52}" y="${H*0.16}" width="104" height="22" rx="5" fill="rgba(214,40,40,0.88)"/>
        <text x="${W/2}" y="${H*0.16+14.5}" text-anchor="middle" font-size="9.5" fill="white" font-family="sans-serif" font-weight="bold">🚫  DO NOT ENTER</text>
        ${legRip}`;
      break;

    case 'calm_bay':
      body = `
        <!-- Bay headlands -->
        <path d="M0,${H*0.76} Q28,${H*0.54} 0,${H*0.22}" fill="none" stroke="#6B7280" stroke-width="9" stroke-linecap="round" opacity="0.45"/>
        <path d="M${W},${H*0.76} Q${W-28},${H*0.54} ${W},${H*0.22}" fill="none" stroke="#6B7280" stroke-width="9" stroke-linecap="round" opacity="0.45"/>
        <!-- Light longshore drift -->
        <line x1="56" y1="${H*0.47}" x2="${W-56}" y2="${H*0.47}"
          stroke="#00B4D8" stroke-width="2.5" stroke-dasharray="8,5" marker-end="url(#aCyan)"/>
        <!-- Calm ripples -->
        <path d="M60,${H*0.32} Q${W/2},${H*0.27} ${W-60},${H*0.32}" fill="none" stroke="white" stroke-width="1.5" opacity="0.6"/>
        <path d="M80,${H*0.22} Q${W/2},${H*0.17} ${W-80},${H*0.22}" fill="none" stroke="white" stroke-width="1.2" opacity="0.4"/>
        <!-- Protected badge -->
        <rect x="${W/2-44}" y="${H*0.08}" width="88" height="22" rx="11" fill="rgba(45,198,83,0.88)"/>
        <text x="${W/2}" y="${H*0.08+15}" text-anchor="middle" font-size="9" fill="white" font-family="sans-serif" font-weight="bold">✓  PROTECTED BAY</text>`;
      break;

    default:
      body = `<text x="${W/2}" y="${H/2}" text-anchor="middle" font-size="12" fill="#6B7280" font-family="sans-serif">Current pattern unavailable</text>`;
  }

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  ${water}
  ${body}
  ${sand}
  ${shore}
  ${north}
</svg>`;
}

// ============================================================
// 9. TRANSLATION HELPER
// ============================================================
/**
 * t('key') or t('nested.key') — look up translation string
 */
function t(key) {
  const parts = key.split('.');
  let val = TRANSLATIONS[state.lang];
  for (const p of parts) {
    if (val === undefined || val === null) return key;
    val = val[p];
  }
  return (val !== undefined && val !== null) ? val : key;
}

// ============================================================
// 10. RENDER FUNCTIONS
// ============================================================
function updateTideLocalTime() {
  const el = document.getElementById('tideLocalTime');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Mexico_City',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function renderTideCard() {
  const now = new Date();
  updateTideLocalTime();
  const { state: tideState, prevEvent, nextEvent, pct } = getTideState(MOCK_TIDES, now);

  const arrowEl = document.getElementById('tideArrow');
  const textEl  = document.getElementById('tideStateText');
  const sineEl  = document.getElementById('tideSineContainer');
  const nextEl  = document.getElementById('tideNextEvent');

  if (tideState === 'UNKNOWN') {
    arrowEl.textContent = '?';
    arrowEl.className   = 'tide-arrow slack';
    textEl.textContent  = t('unknownTide');
    sineEl.innerHTML    = '';
    nextEl.innerHTML    = '';
    return;
  }

  if (tideState === 'RISING') {
    arrowEl.textContent = '↑';
    arrowEl.className   = 'tide-arrow rising';
    textEl.textContent  = t('rising');
  } else if (tideState === 'FALLING') {
    arrowEl.textContent = '↓';
    arrowEl.className   = 'tide-arrow falling';
    textEl.textContent  = t('falling');
  } else {
    arrowEl.textContent = '〰';
    arrowEl.className   = 'tide-arrow slack';
    textEl.textContent  = t('slack');
  }

  // Sine chart
  sineEl.innerHTML = renderTideSineChart(prevEvent, nextEvent, pct);

  // Next event countdown
  const timeUntil = formatTimeUntil(nextEvent.time, now);
  const eventKey  = nextEvent.type === 'HIGH' ? 'nextHigh' : 'nextLow';
  const eventTime = formatTime(nextEvent.time);
  nextEl.innerHTML = `${t(eventKey)} ${t('in')} <strong>${timeUntil}</strong> · ${eventTime} (${nextEvent.height_m.toFixed(1)}m)`;

  // Today's tide schedule row
  const tideCardEl = document.getElementById('tideCard');
  const oldRow = tideCardEl.querySelector('.tide-events-row');
  if (oldRow) oldRow.remove();

  const row = document.createElement('div');
  row.className = 'tide-events-row';

  MOCK_TIDES.slice(0, 4).forEach(ev => {
    const isPrev = ev.time === prevEvent.time;
    const item = document.createElement('div');
    item.className = 'tide-event-item';
    item.innerHTML = `
      <div class="tide-event-type ${isPrev ? 'is-now' : ''}">
        ${ev.type === 'HIGH' ? '▲ HIGH' : '▼ LOW'}
        ${isPrev ? ' ●' : ''}
      </div>
      <div class="tide-event-time">${formatTime(ev.time)}</div>
      <div class="tide-event-height">${ev.height_m.toFixed(2)}m</div>`;
    row.appendChild(item);
  });

  tideCardEl.appendChild(row);
}

function renderConditions() {
  const { wave_height, wave_period, uv_index } = getConditionsData();

  // Waves
  const waveCard = document.getElementById('waveCard');
  const waveCat  = getWaveCategory(wave_height);
  document.getElementById('waveHeight').textContent = wave_height.toFixed(1);
  document.getElementById('waveDesc').textContent   = t(`waveTip.${waveCat}`);
  waveCard.className = `condition-card wave-${waveCat}`;

  // UV
  const uvCard = document.getElementById('uvCard');
  const uvCat  = getUVCategory(uv_index);
  document.getElementById('uvIndex').textContent = uv_index;
  document.getElementById('uvDesc').textContent  = t(`uvDesc.${uvCat}`);
  uvCard.className = `condition-card uv-${uvCat}`;

  const uvIcons = { low: '🌤️', moderate: '⛅', high: '☀️', 'very-high': '🔆', extreme: '☀️' };
  document.getElementById('uvIcon').textContent = uvIcons[uvCat] || '☀️';

  // UV action banner (show when UV ≥ 8)
  const banner = document.getElementById('uvActionBanner');
  if (uv_index >= 8) {
    banner.classList.remove('hidden');
    document.getElementById('uvBannerText').textContent = t(`uvAction.${uvCat}`);
  } else {
    banner.classList.add('hidden');
  }

  // Period
  const periodCat = getPeriodCategory(wave_period);
  document.getElementById('wavePeriod').textContent = wave_period;
  document.getElementById('periodDesc').textContent = t(`periodTip.${periodCat}`);
}

function renderLifeguardBadge() {
  const badge   = document.getElementById('lifeguardBadge');
  const beach   = state.currentBeach;
  const hasLG   = beach.hasLifeguard;

  badge.textContent      = hasLG ? t('lifeguardYes') : t('lifeguardNo');
  badge.style.background = hasLG ? '#D4EDDA' : '#F8D7DA';
  badge.style.color      = hasLG ? '#155724'  : '#721C24';
}

function renderCurrentDiagramCard() {
  const beach = state.currentBeach;
  document.getElementById('currentDiagramContainer').innerHTML =
    renderCurrentDiagram(beach.currentDiagramType);
  document.getElementById('currentDescription').textContent =
    beach.currentDescription;
}

function renderWarnings() {
  const list = document.getElementById('warningsList');
  list.innerHTML = state.currentBeach.warnings
    .map(w => `<li class="warning-item">${w}</li>`)
    .join('');
}

function renderPhotos() {
  document.getElementById('photosStrip').innerHTML = MOCK_PHOTOS
    .map(p => `<div class="photo-item"><img src="${p.url}" alt="${p.alt}" loading="lazy"></div>`)
    .join('');
}

function renderReviews() {
  document.getElementById('reviewsList').innerHTML = MOCK_REVIEWS
    .map(r => {
      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      return `<div class="review-item">
        <div class="review-header">
          <span class="review-author">${r.author}</span>
          <span class="review-date">${r.date}</span>
        </div>
        <div class="review-stars">${stars}</div>
        <p class="review-text">${r.text}</p>
      </div>`;
    })
    .join('');
}

function renderBeachBar() {
  document.getElementById('beachBarName').textContent = state.currentBeach.name;
}

function updateI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = t(el.dataset.i18n);
    if (text && text !== el.dataset.i18n) el.textContent = text;
  });
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === state.lang);
  });
  document.documentElement.lang = state.lang;
  document.getElementById('dataBadgeText').textContent = liveData ? '🟢  Live data · Open-Meteo' : t('mockBadge');
  const starEl = document.getElementById('githubStarText');
  if (starEl) starEl.textContent = t('githubStar');
}

async function fetchLiveConditions() {
  const beach = state.currentBeach;
  if (!beach) return;
  const { lat, lng } = beach.coords;

  try {
    const [uvResp, waveResp] = await Promise.all([
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=uv_index&timezone=America%2FMexico_City&forecast_days=1`),
      fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height,wave_period&timezone=America%2FMexico_City&forecast_days=1`),
    ]);

    const [uvJson, waveJson] = await Promise.all([uvResp.json(), waveResp.json()]);

    // Get current hour index in Mexico City time
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Mexico_City',
      hour: '2-digit',
      hour12: false,
    }).formatToParts(new Date());
    const hourIdx = parseInt(parts.find(p => p.type === 'hour').value);

    liveData = {
      uv_index:    Math.round(uvJson.hourly.uv_index[hourIdx] ?? 0),
      wave_height: parseFloat((waveJson.hourly.wave_height[hourIdx] ?? MOCK_OPEN_METEO.wave_height).toFixed(1)),
      wave_period: Math.round(waveJson.hourly.wave_period[hourIdx] ?? MOCK_OPEN_METEO.wave_period),
    };

    renderConditions();

    // Update badge to green / live
    const badge = document.getElementById('dataBadgeText');
    if (badge) badge.textContent = '🟢  Live data · Open-Meteo';

  } catch (err) {
    console.warn('fetchLiveConditions failed:', err);
    // Keep existing data (mock or last live fetch)
  }
}

function renderApp() {
  renderBeachBar();
  renderTideCard();
  renderConditions();
  renderLifeguardBadge();
  renderCurrentDiagramCard();
  renderWarnings();
  renderPhotos();
  renderReviews();
  updateI18n(); // always last so i18n text overwrites dynamic text
}

// ============================================================
// 11. BEACH MODAL
// ============================================================
function renderBeachList() {
  const listEl = document.getElementById('beachList');
  const dangerColors = {
    low:      { bg: '#D4EDDA', fg: '#155724' },
    moderate: { bg: '#FFF3CD', fg: '#856404' },
    high:     { bg: '#F8D7DA', fg: '#721C24' },
    extreme:  { bg: '#F8D7DA', fg: '#721C24' },
  };

  listEl.innerHTML = BEACHES.map(beach => {
    const isActive = beach.id === state.currentBeach.id;
    const { bg, fg } = dangerColors[beach.dangerLevel];
    return `<li class="beach-list-item ${isActive ? 'active' : ''}" data-beach-id="${beach.id}">
      <span class="beach-list-name">${beach.name}${beach.hasLifeguard ? ' 🛟' : ''}</span>
      <span class="beach-danger-badge"
        style="background:${bg};color:${fg}"
      >${t(`dangerLevel.${beach.dangerLevel}`)}</span>
    </li>`;
  }).join('');

  listEl.querySelectorAll('.beach-list-item').forEach(item => {
    item.addEventListener('click', () => {
      const beach = BEACHES.find(b => b.id === item.dataset.beachId);
      if (beach) {
        state.currentBeach = beach;
        liveData = null; // reset so mock shows until new fetch completes
        closeModal();
        renderApp();
        fetchLiveConditions();
      }
    });
  });
}

function openModal() {
  renderBeachList();
  document.getElementById('beachModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('beachModal').classList.add('hidden');
  document.body.style.overflow = '';
}

// ============================================================
// 12. GEOLOCATION
// ============================================================
function getNearestBeach(lat, lng) {
  // Simple Euclidean distance (fine for small geographic areas)
  let nearest = BEACHES[0];
  let minDist = Infinity;
  BEACHES.forEach(beach => {
    const d = Math.hypot(beach.coords.lat - lat, beach.coords.lng - lng);
    if (d < minDist) { minDist = d; nearest = beach; }
  });
  return nearest;
}

function useGeolocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }
  document.getElementById('beachBarName').textContent = t('detecting');
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      state.currentBeach = getNearestBeach(coords.latitude, coords.longitude);
      liveData = null;
      closeModal();
      renderApp();
      fetchLiveConditions();
    },
    (err) => {
      console.warn('Geolocation error:', err.code, err.message);
      document.getElementById('beachBarName').textContent = state.currentBeach.name;
      // Show error in a toast above the beach list instead of alert
      const msg = getGeoErrorMsg(err);
      const toast = document.createElement('p');
      toast.style.cssText = 'color:#721C24;background:#F8D7DA;border-radius:8px;padding:10px 14px;font-size:0.82rem;margin:8px 0 0;line-height:1.45;';
      toast.textContent = msg;
      const modalBody = document.querySelector('.modal');
      const existing = document.getElementById('geoErrToast');
      if (existing) existing.remove();
      toast.id = 'geoErrToast';
      modalBody.insertBefore(toast, modalBody.children[2]);
      openModal();
    },
    { timeout: 8000, maximumAge: 60000 }
  );
}

// ============================================================
// 13. SPLASH SCREEN
// ============================================================

const SPLASH_COPY = {
  en: {
    desc: 'This app shows real ocean data — waves, tides, and currents — for beaches on the Oaxaca coast so you can understand the conditions before entering the water. It provides information only; you are always responsible for your own safety.',
    warning: 'This app does <strong>NOT</strong> tell you the water is "safe".<br>Read every warning. Respect the ocean.',
    geoBtn: 'Find My Nearest Beach',
    detecting: 'Detecting your location…',
    geoDenied: '🔒 Location access blocked. Allow it in your browser settings, or choose your beach below.',
    geoUnavailable: '📡 Location unavailable. Please choose your beach manually.',
    geoTimeout: '⏱ Location timed out. Check your signal and try again, or choose manually.',
    skip: 'Choose beach manually →',
  },
  es: {
    desc: 'Esta app muestra datos reales del mar — olas, mareas y corrientes — en las playas de la costa oaxaqueña para que puedas entender las condiciones antes de entrar al agua. Solo proporciona información; la seguridad en el agua es siempre tu responsabilidad.',
    warning: 'Esta app <strong>NO</strong> te dice si el agua es "segura".<br>Lee cada advertencia. Respeta el mar.',
    geoBtn: 'Encontrar Mi Playa Más Cercana',
    detecting: 'Detectando tu ubicación…',
    geoDenied: '🔒 Acceso al GPS bloqueado. Actívalo en los ajustes del navegador, o elige tu playa abajo.',
    geoUnavailable: '📡 Ubicación no disponible. Elige tu playa manualmente.',
    geoTimeout: '⏱ Tiempo de espera agotado. Verifica tu señal e intenta de nuevo, o elige manualmente.',
    skip: 'Elegir playa manualmente →',
  },
  fr: {
    desc: 'Cette application affiche de vraies données océaniques — vagues, marées et courants — pour les plages de la côte d\'Oaxaca afin que vous compreniez les conditions avant d\'entrer dans l\'eau. Elle fournit uniquement des informations ; vous êtes toujours responsable de votre sécurité.',
    warning: 'Cette app ne vous dit <strong>PAS</strong> que l\'eau est "sûre".<br>Lisez chaque avertissement. Respectez l\'océan.',
    geoBtn: 'Trouver la plage la plus proche',
    detecting: 'Détection de votre position…',
    geoDenied: '🔒 Accès à la position bloqué. Activez-le dans les paramètres du navigateur, ou choisissez une plage ci-dessous.',
    geoUnavailable: '📡 Position indisponible. Veuillez choisir une plage manuellement.',
    geoTimeout: '⏱ Délai dépassé. Vérifiez votre signal et réessayez, ou choisissez manuellement.',
    skip: 'Choisir une plage manuellement →',
  },
  nl: {
    desc: 'Deze app toont echte oceaangegevens — golven, getij en stroming — voor stranden aan de kust van Oaxaca zodat u de omstandigheden begrijpt voordat u het water ingaat. Ze biedt alleen informatie; u bent altijd zelf verantwoordelijk voor uw veiligheid.',
    warning: 'Deze app vertelt u <strong>NIET</strong> dat het water "veilig" is.<br>Lees elke waarschuwing. Respecteer de oceaan.',
    geoBtn: 'Dichtstbijzijnd strand zoeken',
    detecting: 'Locatie wordt bepaald…',
    geoDenied: '🔒 Locatie geblokkeerd. Sta het toe in uw browserinstellingen, of kies hieronder een strand.',
    geoUnavailable: '📡 Locatie niet beschikbaar. Kies handmatig een strand.',
    geoTimeout: '⏱ Locatieverzoek verlopen. Controleer uw signaal en probeer opnieuw, of kies handmatig.',
    skip: 'Strand handmatig kiezen →',
  },
  de: {
    desc: 'Diese App zeigt echte Ozeandaten — Wellen, Gezeiten und Strömungen — für Strände an der Küste von Oaxaca, damit Sie die Bedingungen verstehen, bevor Sie ins Wasser gehen. Sie liefert nur Informationen; Sie sind stets selbst für Ihre Sicherheit verantwortlich.',
    warning: 'Diese App sagt Ihnen <strong>NICHT</strong>, dass das Wasser "sicher" ist.<br>Lesen Sie jede Warnung. Respektieren Sie den Ozean.',
    geoBtn: 'Nächsten Strand finden',
    detecting: 'Standort wird ermittelt…',
    geoDenied: '🔒 Standortzugriff blockiert. Aktivieren Sie ihn in den Browsereinstellungen, oder wählen Sie unten einen Strand.',
    geoUnavailable: '📡 Standort nicht verfügbar. Bitte Strand manuell wählen.',
    geoTimeout: '⏱ Zeitüberschreitung. Signal prüfen und erneut versuchen, oder manuell wählen.',
    skip: 'Strand manuell auswählen →',
  },
};

function renderSplashText() {
  const copy = SPLASH_COPY[state.lang];
  document.getElementById('splashDesc').textContent      = copy.desc;
  document.getElementById('splashWarningText').innerHTML = copy.warning;
  document.getElementById('splashGeoBtnLabel').textContent = copy.geoBtn;
  document.getElementById('splashSkipBtn').textContent   = copy.skip;
}

// Returns a localised error message based on GeolocationPositionError code
// code 1 = PERMISSION_DENIED, 2 = POSITION_UNAVAILABLE, 3 = TIMEOUT
function getGeoErrorMsg(err) {
  const copy = SPLASH_COPY[state.lang];
  if (err.code === 1) return copy.geoDenied;
  if (err.code === 3) return copy.geoTimeout;
  return copy.geoUnavailable;
}

function dismissSplash() {
  const splash = document.getElementById('splashScreen');
  splash.classList.add('splash-exit');
  splash.addEventListener('transitionend', () => {
    splash.style.display = 'none';
  }, { once: true });
}

function updateSplashLangButtons() {
  document.querySelectorAll('.splash-lang-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === state.lang);
  });
}

function initSplash() {
  renderSplashText();
  updateSplashLangButtons();

  document.querySelectorAll('.splash-lang-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      renderSplashText();
      updateSplashLangButtons();
    });
  });

  const copy       = SPLASH_COPY[state.lang];
  const geoBtn     = document.getElementById('splashGeoBtn');
  const skipBtn    = document.getElementById('splashSkipBtn');
  const status     = document.getElementById('splashGeoStatus');
  const statusText = document.getElementById('splashGeoStatusText');

  geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      dismissSplash();
      openModal();
      return;
    }

    // Show spinner, hide button
    geoBtn.style.display  = 'none';
    skipBtn.style.display = 'none';
    status.classList.remove('hidden');
    statusText.textContent = copy.detecting;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        state.currentBeach = getNearestBeach(coords.latitude, coords.longitude);
        liveData = null;
        dismissSplash();
        renderApp();
        fetchLiveConditions();
      },
      (err) => {
        console.warn('Splash geolocation error:', err.code, err.message);
        status.classList.add('hidden');
        geoBtn.style.display  = '';
        skipBtn.style.display = '';
        const msg = getGeoErrorMsg(err);
        const errMsg = document.createElement('p');
        errMsg.style.cssText = 'color:rgba(255,180,180,0.9);font-size:0.82rem;margin-top:-8px;text-align:center;max-width:320px;line-height:1.45;';
        errMsg.textContent = msg;
        // Remove any previous error message
        const prev = document.getElementById('splashGeoErrMsg');
        if (prev) prev.remove();
        errMsg.id = 'splashGeoErrMsg';
        geoBtn.insertAdjacentElement('afterend', errMsg);
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  });

  skipBtn.addEventListener('click', () => {
    dismissSplash();
    // Give a beat for the fade, then open the manual selector
    setTimeout(openModal, 200);
  });
}

// ============================================================
// 14. INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Render the main app in the background (hidden behind splash)
  renderApp();
  fetchLiveConditions();

  // Live clock — tick every second
  setInterval(updateTideLocalTime, 1000);

  // Refresh live conditions every 10 minutes
  setInterval(fetchLiveConditions, 10 * 60 * 1000);

  // Boot splash
  initSplash();

  // Main app event listeners
  document.getElementById('changeBeachBtn').addEventListener('click', openModal);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('beachModal').addEventListener('click', e => {
    if (e.target.id === 'beachModal') closeModal();
  });
  document.getElementById('geoBtn').addEventListener('click', useGeolocation);

  const langDropdown = document.getElementById('langDropdown');
  document.getElementById('langBtn').addEventListener('click', e => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', e => {
      e.stopPropagation();
      state.lang = opt.dataset.lang;
      langDropdown.classList.remove('open');
      renderApp();
      renderSplashText();
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('#langPicker')) {
      langDropdown.classList.remove('open');
    }
  });
});
