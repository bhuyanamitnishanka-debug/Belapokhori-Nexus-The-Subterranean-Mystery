import { Character, Chapter, ClueItem, SchematicNode } from '../types';

export const CHARACTERS: Record<string, Character> = {
  tara: {
    id: 'tara',
    name: 'Dr. Tara Roy',
    role: 'Geo-Archaeologist & Sub-Aquifer Hydrologist',
    avatar: 'TR',
    badgeColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60',
  },
  neal: {
    id: 'neal',
    name: 'Neal Sen',
    role: 'Nexus Mag-Lev Transit Lead Engineer',
    avatar: 'NS',
    badgeColor: 'text-amber-400 border-amber-500/40 bg-amber-950/60',
  },
  thorne: {
    id: 'thorne',
    name: 'Director Thorne',
    role: 'Regional Seaport & Waterway Authority',
    avatar: 'AT',
    badgeColor: 'text-rose-400 border-rose-500/40 bg-rose-950/60',
  },
  ancient: {
    id: 'ancient',
    name: 'Master Karunakar (842 CE)',
    role: 'Ancient Kalinga Hydraulic Architect',
    avatar: 'MK',
    badgeColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60',
  }
};

export const SCHEMATIC_NODES: SchematicNode[] = [
  {
    id: 'solar-maglev',
    name: 'Solar-Canopy Mag-Lev Tracks',
    category: 'surface',
    xPercent: 44,
    yPercent: 24,
    shortDesc: 'Curved photovoltaic archway powering high-speed freight alongside the inland waterway.',
    surfaceTech: '3.2 GW transparent monocrystalline solar skin mounted over magnetic levitation guidance coils.',
    ancientSecret: 'Built directly atop an ancient royal caravan canal; the solar arch mirrors the sacred solar azimuth of the Konark sun wheel.',
    loreQuote: '"The train glides without friction, but the sensors detect a rhythmic electromagnetic pulse beneath the rails every 42 seconds."',
    specifications: [
      { label: 'Power Yield', value: '3,200 MW' },
      { label: 'Transit Velocity', value: '480 km/h' },
      { label: 'Ground Vibration', value: '< 0.02 mm/s' }
    ],
    clueId: 'clue-resonance'
  },
  {
    id: 'inland-waterway',
    name: 'Open Inland Waterway & Port',
    category: 'surface',
    xPercent: 72,
    yPercent: 45,
    shortDesc: 'Deep-draft navigable water artery linking the Global Seaport directly to inland industrial hubs.',
    surfaceTech: 'Controlled depth navigation canal equipped with automated tug moorings and wake dissipation banks.',
    ancientSecret: 'This exact canal follows the lost prehistoric course of the Prachi River, where ancient Boita merchant ships sailed to Java and Bali.',
    loreQuote: '"The modern container barges float on waters that have carried copper and silk for two millennia."',
    specifications: [
      { label: 'Canal Width', value: '180 meters' },
      { label: 'Draft Depth', value: '14.5 meters' },
      { label: 'Daily Cargo Flux', value: '120,000 DWT' }
    ],
    clueId: 'clue-tidelock'
  },
  {
    id: 'stepwell',
    name: 'Subterranean Stepped Well (Belapokhori)',
    category: 'ancient',
    xPercent: 36,
    yPercent: 62,
    shortDesc: 'Geometric inverted stone pyramid submerged 28 meters below the mag-lev corridor.',
    surfaceTech: 'Classified by current city maps as a structural foundation pylon caisson.',
    ancientSecret: 'A monumental 9th-century Kalinga stepwell engineered with fractal geometry to absorb tidal bore surges and compress groundwater pressure.',
    loreQuote: '"The steps do not descend to fetch water—they descend to guide the water\'s kinetic soul into the bedrock."',
    specifications: [
      { label: 'Architectural Style', value: 'Late Kalinga Stepped Tank' },
      { label: 'Subsurface Depth', value: '-28.4 meters' },
      { label: 'Lithic Material', value: 'Iron-rich Khondalite' }
    ],
    clueId: 'clue-stepwell-matrix'
  },
  {
    id: 'underbed-siphon',
    name: 'Under-Riverbed Siphon Pipelines',
    category: 'subterranean',
    xPercent: 54,
    yPercent: 88,
    shortDesc: 'Continuous pressurized conduit looping beneath the riverbed without external mechanical pumping.',
    surfaceTech: 'Engineers assumed modern dual-jacketed steel piping was installed during 2022 dredging.',
    ancientSecret: 'The steel casing covers ancient interlocking terracotta and lead-sealed granite siphon rings operating on passive barometric siphon physics.',
    loreQuote: '"Water flowing uphill against gravity under the riverbed. It violates modern hydrology—unless you read the ancient seals."',
    specifications: [
      { label: 'Siphon Flow Rate', value: '45,000 L/sec' },
      { label: 'Passive Head Pressure', value: '4.8 Bar' },
      { label: 'Conduit Diameter', value: '2,200 mm' }
    ],
    clueId: 'clue-bronze-ring'
  },
  {
    id: 'lock-depth-unit',
    name: 'Lock Depth Stabilization Unit',
    category: 'subterranean',
    xPercent: 84,
    yPercent: 34,
    shortDesc: 'Automated hydraulic gates stabilizing tidal draft differentials between river and sea.',
    surfaceTech: 'Digital ballast chambers balancing ship displacement dynamically.',
    ancientSecret: 'The counterweights are ancient stone chambers filled with mercury and magnetic black sand that damp seismic harmonics.',
    loreQuote: '"When the lock cycles, you can hear a low acoustic hum that matches the 174 Hz tone found in ancient temple sanctums."',
    specifications: [
      { label: 'Max Lift Differential', value: '8.5 m' },
      { label: 'Cycle Duration', value: '180 seconds' },
      { label: 'Acoustic Signature', value: '174.2 Hz Pure' }
    ]
  },
  {
    id: 'hyporheic-gravel',
    name: 'Hyporheic Gravel Filter Bed',
    category: 'subterranean',
    xPercent: 78,
    yPercent: 68,
    shortDesc: 'Sub-benthic ecological filtration stratum purifying urban runoff before aquifer injection.',
    surfaceTech: 'Multi-layer silica and quartz granular bed.',
    ancientSecret: 'Seeded with a rare biofilm of ancient photosynthetic cyanobacteria preserved from the sacred temple pond sediment.',
    loreQuote: '"The water leaves this bed cleaner than sterile laboratory water. The microbes have been doing this for a thousand years."',
    specifications: [
      { label: 'Stratum Thickness', value: '4.2 meters' },
      { label: 'Microbial Colony Age', value: '~1,150 Years' },
      { label: 'Heavy Metal Chelation', value: '99.8%' }
    ],
    clueId: 'clue-gravel-core'
  },
  {
    id: 'kinetic-energy-unit',
    name: 'Kinetic Energy Conversion System (Ghatiyantra)',
    category: 'energy',
    xPercent: 12,
    yPercent: 24,
    shortDesc: 'Located on the immediate bank line on the far left where the open inland waterway meets the land infrastructure, featuring the multi-pot water-lifting wheel integrated with underground combined urban sewerage outfalls and transmission channels.',
    surfaceTech: '12-pot Ghatiyantra water wheel linked to a 3-stage step-up gearbox and permanent-magnet alternator, capturing both river currents and urban sewer discharge kinetic head.',
    ancientSecret: 'Engineered as an ancient hydro-kinetic water-lifting machine (Ghatiyantra) that lifts river and storm runoff to high aqueducts while driving subterranean acoustic pulses into the stepwell.',
    loreQuote: '"On the immediate bank line, the multi-pot wheel lifts water while dampening bank erosion and generating continuous baseload electricity."',
    specifications: [
      { label: 'Shaft Geometry', value: 'Ø 500mm x 8.0m' },
      { label: 'Ghati Pots', value: '12 Bronze Units' },
      { label: 'Sewer Capture', value: '18.5 m³/s Inflow' },
      { label: 'Flywheel Inertia', value: '1,250 kg·m²' },
      { label: 'Peak Yield', value: '145 MWh' },
      { label: 'Bankline Shield', value: '92.5% Dampening' }
    ]
  },
  {
    id: 'deep-aquifer-hub',
    name: 'Deep Aquifer Recharging Hub',
    category: 'subterranean',
    xPercent: 16,
    yPercent: 78,
    shortDesc: 'Pressurized injection wells replenishing the subterranean freshwater bubble against saline ocean intrusion.',
    surfaceTech: 'Multi-tier automated high-pressure infiltration headers.',
    ancientSecret: 'The central chamber houses the "Amrita-Vapi" (Nectar Reservoir), an ancient engineered aquifer vault protecting fresh drinking water.',
    loreQuote: '"Saltwater cannot invade this delta because the ancient builders built a positive freshwater shield that never depletes."',
    specifications: [
      { label: 'Infiltration Depth', value: '-120 meters' },
      { label: 'Saline Barrier Pressure', value: '6.2 Bar' },
      { label: 'Freshwater Reserve', value: '4.8 Billion m³' }
    ],
    clueId: 'clue-conduit-key'
  },
  {
    id: 'rainwater-mesh',
    name: 'Rooftop Rainwater Mesh',
    category: 'surface',
    xPercent: 68,
    yPercent: 14,
    shortDesc: 'Fine micro-mesh membranes lining the mag-lev canopy and depot structures.',
    surfaceTech: 'Superhydrophobic vortex collectors directing 98% of monsoon downpours into the subterranean network.',
    ancientSecret: 'The mesh angle exactly matches the eaves design of Kalinga pagoda temple roofs which channeled rainwater into stepped sacred tanks.',
    loreQuote: '"Every monsoon droplet is directed with millimeter precision. Ancient temple geometry made modern."',
    specifications: [
      { label: 'Collection Area', value: '420,000 m²' },
      { label: 'Annual Harvest Volume', value: '1.8M m³' },
      { label: 'Runoff Velocity', value: '3.6 m/s' }
    ]
  },
  {
    id: 'integrated-pump',
    name: 'Integrated Pump Station & Alternator',
    category: 'energy',
    xPercent: 88,
    yPercent: 86,
    shortDesc: 'Bidirectional hydro-turbines converting head differential into grid electricity.',
    surfaceTech: 'Variable-speed synchronous permanent-magnet alternator.',
    ancientSecret: 'Operates in reverse resonance during high tide, acting as an ancient acoustic pulse broadcaster that aligns ground currents.',
    loreQuote: '"The pump isn\'t just moving water—it\'s singing to the aquifer."',
    specifications: [
      { label: 'Turbine Type', value: 'Francis-Reversible' },
      { label: 'RPM', value: '450 rpm' },
      { label: 'Grid Feed Voltage', value: '33 kV' }
    ]
  }
];

export const CLUE_ITEMS: ClueItem[] = [
  {
    id: 'clue-resonance',
    title: 'Mag-Lev Waveform Anomaly',
    era: 'Current Epoch (2026)',
    category: 'Telemetry',
    description: 'Digital oscilloscope recording taken from Section 4B of the solar canopy tracks. Shows a steady 174 Hz sinusoidal wave that pulses independently of train schedules.',
    deductionNote: 'The 174 Hz frequency matches the acoustic resonance of subterranean stone chambers, proving that water velocity beneath the tracks is driving the magnetic coils.',
    iconName: 'Activity',
    unlocked: true,
  },
  {
    id: 'clue-bronze-ring',
    title: 'Inscribed Bronze Siphon Ring',
    era: '842 CE (Bhauma-Kara Dynasty)',
    category: 'Artifact',
    description: 'A heavy copper-bronze alloy coupling discovered encrusted around the under-riverbed siphon pipe. Bears Proto-Odia / Kalinga inscriptions reading "Nadi-Garbha Jala Bandha" (Riverbed Water Binding).',
    deductionNote: 'Modern engineers thought they laid the first siphon in 2022. They merely encased a thousand-year-old perpetual hydrodynamic system.',
    iconName: 'Disc',
    unlocked: false,
    cipherCode: 'BANDHA-842'
  },
  {
    id: 'clue-stepwell-matrix',
    title: 'Parchment: The 9-Tier Pokhori Matrix',
    era: 'Circa 11th Century',
    category: 'Blueprint',
    description: 'A preserved palm-leaf and parchment technical treatise recovered from the state archives. Depicts the cross-section of "Bela-Pokhori" with stepped terraces designed to equalize coastal water table shifts.',
    deductionNote: 'The geometry of the stepwell mirrors the Fibonacci sequence. The steps are calibrated so that water level rise accelerates flow toward the deep aquifer.',
    iconName: 'FileText',
    unlocked: false,
    cipherCode: 'VAPI-FIBONACCI'
  },
  {
    id: 'clue-gravel-core',
    title: 'Hyporheic Bioluminescent Specimen',
    era: 'Pre-Colonial Biological Lineage',
    category: 'Specimen',
    description: 'A glass vial containing benthic gravel from the sub-river filtration bed. Under UV light, an ancient strain of cyanobacteria glows vibrant teal while neutralizing industrial toxins.',
    deductionNote: 'The ancient engineers didn\'t just build stone—they bred living hydrological ecosystems that clean water before it touches the drinking aquifers.',
    iconName: 'FlaskConical',
    unlocked: false,
  },
  {
    id: 'clue-tidelock',
    title: 'Lock Override Cipher Cylinder',
    era: '1888 Maritime Colonial Archive',
    category: 'Artifact',
    description: 'A brass geared cylinder recovered from the old river lock keeper\'s quarters, detailing tidal calculations that prevent the inland waterway from reversing flow during super-cyclones.',
    deductionNote: 'The cylinder calculates that if the Belapokhori siphon is fully engaged during a high storm surge, it creates an anti-cyclonic pressure wall.',
    iconName: 'Key',
    unlocked: false,
    cipherCode: 'TIDE-SHIELD-9'
  },
  {
    id: 'clue-conduit-key',
    title: 'Amrita-Vapi Valve Seal',
    era: 'Late Kalinga Hydraulic Guild',
    category: 'Artifact',
    description: 'An octagonal stone key carved with four river serpents interlocking around a central water vortex. Fits the main manifold of the Deep Aquifer Recharging Hub.',
    deductionNote: 'Turning this key synchronizes the surface solar mag-lev kinetic dampers with the subterranean aquifer intake, locking the entire coastal basin into equilibrium.',
    iconName: 'ShieldAlert',
    unlocked: false,
    cipherCode: 'NEXUS-AMRITA'
  }
];

export const NOVEL_CHAPTERS: Chapter[] = [
  {
    id: 'prologue',
    number: 0,
    title: 'The Grid Resonance',
    subtitle: 'Where Solar Speed Meets Ancient Currents',
    location: 'Solar-Canopy Mag-Lev Track // Section 4B Inland Canal',
    summary: 'High-speed mag-lev train 402 detects unexpected voltage surges over the Belapokhori canal. Hydrologist Dr. Tara Roy arrives to investigate what lies beneath the ballast.',
    panels: [
      {
        id: 'panel-0-1',
        sceneTitle: 'High Noon at the Inland Waterway',
        timeCode: '12:44:09 PM',
        ambientSound: 'maglev',
        layers: {
          background: 'from-slate-900 via-cyan-950 to-slate-950',
        },
        narration: 'The Belapokhori-Nexus was hailed as the triumph of 21st-century green logistics: a 60-kilometer solar canopy shielding heavy freight mag-levs while cargo barges glide peacefully below.',
        dialogue: [
          {
            id: 'd1',
            characterId: 'neal',
            text: 'Tara, look at the induction coils on Track 4. We shut off the grid feed ten minutes ago, but the train is still accelerating!',
            position: 'left'
          },
          {
            id: 'd2',
            characterId: 'tara',
            text: 'It\'s not pulling juice from your solar panels, Neal. The waveform is completely pure. 174 cycles per second. Look down into the canal.',
            position: 'right'
          }
        ],
        sfx: [
          { text: 'ZZZZ-WWHHOOOOSH!', x: 'top-6 right-6', color: 'text-cyan-400', size: 'lg' }
        ],
        schematicNodeId: 'solar-maglev',
        hasChronoLens: true,
        ancientLayerDescription: 'Beneath the mag-lev steel foundation, the ghostly outlines of an ancient stone canal wall appear—oriented precisely toward the equinox sunrise.'
      },
      {
        id: 'panel-0-2',
        sceneTitle: 'The Ripple Beneath the Hull',
        timeCode: '12:48:22 PM',
        ambientSound: 'water',
        layers: {
          background: 'from-cyan-950 via-slate-900 to-sky-950',
        },
        narration: 'On the open inland waterway, a 10,000-ton cargo freighter suddenly halts its drift. Deep beneath its keel, circular water vortexes form in perfect geometric rings.',
        dialogue: [
          {
            id: 'd3',
            characterId: 'tara',
            text: 'Those aren\'t propeller wakes. Those are hydraulic cavitation nodes! Something massive is inhaling water under the riverbed.',
            position: 'left'
          },
          {
            id: 'd4',
            characterId: 'thorne',
            text: 'Doctor Roy, do not interfere with shipping schedules. The port authority needs that waterway clear by 14:00.',
            position: 'right'
          }
        ],
        sfx: [
          { text: 'GLUG... GLUG... GLUG...', x: 'bottom-8 left-8', color: 'text-amber-400', size: 'md' }
        ],
        interactiveClue: {
          id: 'trigger-resonance-clue',
          name: 'Inspect Oscilloscope Waveform',
          prompt: 'Tap the blinking sensor monitor on Tara\'s field tablet to capture the resonance waveform.',
          unlockedMessage: 'Telemetry logged! 174 Hz pure tone recorded. Clue added to Dossier: Mag-Lev Waveform Anomaly.',
          clueId: 'clue-resonance',
          type: 'tap'
        },
        schematicNodeId: 'inland-waterway'
      }
    ]
  },
  {
    id: 'chapter-1',
    number: 1,
    title: 'The Siphon Chamber',
    subtitle: 'Conduits Defying Gravity Under the Riverbed',
    location: 'Sub-Benthic Maintenance Duct // -18m Elevation',
    summary: 'Tara and Neal descend into the subterranean Lock Depth Stabilization unit and discover that modern pipes are tapping into an ancient under-riverbed siphon.',
    panels: [
      {
        id: 'panel-1-1',
        sceneTitle: 'Into the Concrete Crypt',
        timeCode: '01:15:30 PM',
        ambientSound: 'alarm',
        layers: {
          background: 'from-slate-950 via-indigo-950 to-slate-900',
        },
        narration: 'Deep beneath the Lock Depth Stabilization unit, moisture clings to the reinforced concrete. The temperature plummets by twelve degrees.',
        dialogue: [
          {
            id: 'd5',
            characterId: 'neal',
            text: 'The blueprint says this is just a standard overflow bypass from 2022. But Tara... these pipes aren\'t welded steel.',
            position: 'left'
          },
          {
            id: 'd6',
            characterId: 'tara',
            text: 'Wipe the lime crust off that collar. Look at the joint rivets. They are hand-cast bronze and lead mortise!',
            position: 'right'
          }
        ],
        sfx: [
          { text: 'PSSSSSHHH-KLIK!', x: 'top-8 left-10', color: 'text-cyan-300', size: 'md' }
        ],
        interactiveClue: {
          id: 'trigger-bronze-clue',
          name: 'Scrape Ancient Mineral Crust',
          prompt: 'Drag / swipe across the encrusted pipe collar to uncover the 842 CE bronze seal.',
          unlockedMessage: 'Bronze seal revealed! Proto-Odia inscription deciphered: "Nadi-Garbha Jala Bandha". Clue unlocked!',
          clueId: 'clue-bronze-ring',
          type: 'wipe'
        },
        schematicNodeId: 'underbed-siphon',
        hasChronoLens: true,
        ancientLayerDescription: 'X-Ray reveals: The modern concrete tube is merely an outer sleeve protecting a double-helix granite siphon channel constructed over a millennium ago.'
      },
      {
        id: 'panel-1-2',
        sceneTitle: 'The Inverted River',
        timeCode: '01:24:05 PM',
        ambientSound: 'water',
        layers: {
          background: 'from-blue-950 via-cyan-950 to-slate-950',
        },
        narration: 'Tara shines her ultraviolet inspection lamp through the quartz inspection port. The water inside the siphon is racing upward at forty thousand liters per minute without an electric pump in sight.',
        dialogue: [
          {
            id: 'd7',
            characterId: 'tara',
            text: 'It\'s an ancient Torricellian hydraulic siphon. It\'s pulling water from the small surface ponds, filtering it through hyporheic gravel, and feeding an underground reservoir.',
            position: 'left'
          },
          {
            id: 'd8',
            characterId: 'neal',
            text: 'What underground reservoir? There\'s nothing down there except solid bedrock!',
            position: 'right'
          },
          {
            id: 'd9',
            characterId: 'tara',
            text: 'Not bedrock, Neal. The name of this district... "Bela-Pokhori". It means "The Stepped Reservoir of the Shoreline".',
            position: 'left'
          }
        ],
        sfx: [
          { text: 'R-R-R-UMBLE...', x: 'bottom-6 right-6', color: 'text-amber-500', size: 'lg' }
        ],
        schematicNodeId: 'hyporheic-gravel'
      }
    ]
  },
  {
    id: 'chapter-2',
    number: 2,
    title: 'The Sunken Stepwell',
    subtitle: 'The 9-Tier Fractal Palace of Water',
    location: 'Buried Archaeological Chamber // -28m Elevation',
    summary: 'Breaching an abandoned inspection bulkhead, Tara and Neal step into a colossal subterranean stepped reservoir hidden beneath the mag-lev corridor.',
    panels: [
      {
        id: 'panel-2-1',
        sceneTitle: 'The Inverted Pyramid of Khondalite',
        timeCode: '02:02:18 PM',
        ambientSound: 'ancient',
        layers: {
          background: 'from-amber-950 via-slate-950 to-cyan-950',
        },
        narration: 'Their flashlights cut through dust motes to illuminate an immense subterranean cathedral: hundreds of stone steps descending symmetrically toward a luminous pool of crystalline water.',
        dialogue: [
          {
            id: 'd10',
            characterId: 'neal',
            text: 'God in heaven... It\'s the size of a cathedral. How did the transit planners miss a seven-story subterranean temple during foundation pile drilling?!',
            position: 'left'
          },
          {
            id: 'd11',
            characterId: 'tara',
            text: 'They didn\'t miss it, Neal. The original 19th-century colonial engineers hit it and sealed the archives. And modern Nexus Project architects simply drove their pilings right into the reinforced stone niches!',
            position: 'right'
          }
        ],
        sfx: [
          { text: '*DONNNNGGGGG*', x: 'top-10 left-12', color: 'text-amber-300', size: 'lg' }
        ],
        schematicNodeId: 'stepwell',
        hasChronoLens: true,
        ancientLayerDescription: 'Full Chrono-Scan: The stepwell is carved with intricate geometric friezes of Varuna and Ganga, with channels channeling celestial rainwater directly into the deep aquifer core.'
      },
      {
        id: 'panel-2-2',
        sceneTitle: 'The Hydrological Equation in Stone',
        timeCode: '02:14:45 PM',
        ambientSound: 'water',
        layers: {
          background: 'from-stone-900 via-amber-950 to-slate-950',
        },
        narration: 'Tara traces her hand along the geometric risers. The ratio of step width to step height changes according to the square root of water volume.',
        dialogue: [
          {
            id: 'd12',
            characterId: 'tara',
            text: 'Look at this script: "When the sun reaches the Tropic of Cancer, open the ninth sluice to quench the earth\'s deep thirst." This isn\'t mysticism. It\'s a quadratic differential equation for fluid dynamics!',
            position: 'left'
          },
          {
            id: 'd13',
            characterId: 'ancient',
            text: '[Inscription Translation] "He who balances the nine steps shall command the great tide without breaking the shore."',
            position: 'center'
          }
        ],
        sfx: [
          { text: '*TIK-TAK-HUMMM*', x: 'bottom-10 right-10', color: 'text-cyan-400', size: 'md' }
        ],
        interactiveClue: {
          id: 'trigger-stepwell-clue',
          name: 'Decipher the 9-Tier Stepwell Matrix',
          prompt: 'Align the geometric stone steps in the viewfinder to unlock the ancient hydrology blueprint.',
          unlockedMessage: 'Ancient Blueprint deciphered! Clue added to Dossier: Parchment of the 9-Tier Pokhori Matrix.',
          clueId: 'clue-stepwell-matrix',
          type: 'align'
        },
        schematicNodeId: 'stepwell'
      }
    ]
  },
  {
    id: 'chapter-3',
    number: 3,
    title: 'The Nexus Core Awakening',
    subtitle: 'Synthesizing Kinetic Turbines and Ancient Aquifers',
    location: 'Deep Aquifer Recharging Hub // Central Nexus Vault',
    summary: 'The approaching super-monsoon threatens to overwhelm the inland waterway. Tara and Neal must link the modern kinetic energy converters with the ancient stepwell siphon to save the city.',
    panels: [
      {
        id: 'panel-3-1',
        sceneTitle: 'The Monsoon Influx',
        timeCode: '03:30:10 PM',
        ambientSound: 'alarm',
        layers: {
          background: 'from-slate-900 via-blue-950 to-cyan-950',
        },
        narration: 'Alarms blare across the Nexus Control Center. The rooftop rainwater collection mesh is channeling three million liters per minute. The modern drainage pumps are redlining toward catastrophic failure.',
        dialogue: [
          {
            id: 'd14',
            characterId: 'thorne',
            text: 'Emergency override! We have to dump the floodwater directly into the city sewer network or the mag-lev tracks will short out!',
            position: 'left'
          },
          {
            id: 'd15',
            characterId: 'tara',
            text: 'Don\'t you dare, Thorne! If you dump that toxic slurry into the sewer, you will contaminate the regional drinking aquifer for a century!',
            position: 'right'
          },
          {
            id: 'd16',
            characterId: 'neal',
            text: 'Tara is right! The Belapokhori stepwell was built specifically for this. We can divert the flood surge through the hyporheic gravel beds and into the siphon!',
            position: 'left'
          }
        ],
        sfx: [
          { text: 'WARNING: HYDRO-STATIC PRESSURE 98%', x: 'top-6 right-8', color: 'text-rose-400', size: 'md' }
        ],
        schematicNodeId: 'deep-aquifer-hub',
        interactiveClue: {
          id: 'trigger-gravel-clue',
          name: 'Analyze Hyporheic Gravel Core',
          prompt: 'Scan the glowing biological filtration sample to verify microbial chelation capacity.',
          unlockedMessage: 'Microbial bio-core authenticated! Biofilm can absorb 400% surge volume safely.',
          clueId: 'clue-gravel-core',
          type: 'tap'
        }
      },
      {
        id: 'panel-3-2',
        sceneTitle: 'The Grand Synchronization',
        timeCode: '03:45:00 PM',
        ambientSound: 'ancient',
        layers: {
          background: 'from-cyan-950 via-teal-950 to-slate-950',
        },
        narration: 'Together, Tara and Neal engage the manual bronze valve wheel on the subterranean siphon while syncing the mag-lev kinetic converters to 174 Hz. A deafening harmonic hum fills the earth.',
        dialogue: [
          {
            id: 'd17',
            characterId: 'neal',
            text: 'The kinetic turbines are locking frequency! The vibration of the freight trains is driving the water down into the stepwell without a single watt of grid power!',
            position: 'left'
          },
          {
            id: 'd18',
            characterId: 'tara',
            text: 'The Amrita-Vapi is drinking the flood... Look at the aquifer pressure gauge! It\'s rising into the green. The ancient builders solved our climate crisis a thousand years ago.',
            position: 'right'
          }
        ],
        sfx: [
          { text: '*SSSHHHHH-WWHHOOOOMMMMM*', x: 'bottom-8 left-12', color: 'text-emerald-400', size: 'lg' }
        ],
        interactiveClue: {
          id: 'trigger-conduit-clue',
          name: 'Engage Amrita-Vapi Valve Key',
          prompt: 'Turn the ancient stone key to lock the Nexus Core into perpetual hydrological resonance.',
          unlockedMessage: 'Concordance Achieved! The Belapokhori-Nexus is harmonized across time.',
          clueId: 'clue-conduit-key',
          type: 'align'
        },
        schematicNodeId: 'integrated-pump'
      }
    ]
  }
];
