export type Language = 'en' | 'or' | 'hi';

export interface TranslationStrings {
  title: string;
  subtitle: string;
  location: string;
  tabNovel: string;
  tabCutaway: string;
  tabTwin: string;
  tabPhysics: string;
  tabCharts: string;
  tabDossier: string;
  tabCad: string;
  ghatiyantraShaft: string;
  salipurAxis: string;
  operationalRPM: string;
  flywheelEnergy: string;
  channelDepth: string;
  siphonFlow: string;
  siltAlert: string;
  siltSafe: string;
  solarYield: string;
  cadScripts: string;
  patentBrief: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    title: 'BELAPOKHORI-NEXUS',
    subtitle: 'Patent-Grade Digital-Twin & Hydro-Kinetic Architecture',
    location: 'Salipur, Cuttack, Odisha, India (20.4883° N, 85.9926° E)',
    tabNovel: 'Novel',
    tabCutaway: 'Cutaway',
    tabTwin: '3D Twin',
    tabPhysics: 'Physics',
    tabCharts: 'Charts',
    tabDossier: 'Dossier',
    tabCad: 'CAD & SQL',
    ghatiyantraShaft: 'Hydro-Kinetic Ghatiyantra Axle & Alternator Interface',
    salipurAxis: 'Salipur Mahanadi-Birupa Canal Reach Grid',
    operationalRPM: 'Operational Shaft RPM',
    flywheelEnergy: 'Flywheel Kinetic Energy',
    channelDepth: 'Navigation Channel Clearance',
    siphonFlow: 'Under-Riverbed Siphon Velocity',
    siltAlert: 'SILTATION VELOCITY HAZARD (< 0.6 m/s)',
    siltSafe: 'VELOCITY OPTIMAL (Self-Cleansing)',
    solarYield: 'Solar Canopy Generation',
    cadScripts: 'AutoCAD Python COM & SolidWorks VBA Scripts',
    patentBrief: 'Patent-Grade System Manifest'
  },
  or: {
    title: 'ବେଳାପୋଖରୀ-ନେକ୍ସସ',
    subtitle: 'ପେଟେଣ୍ଟ-ଗ୍ରେଡ୍ ଡିଜିଟାଲ୍-ଟୁଇନ୍ ଏବଂ ହାଇଡ୍ରୋ-କାଇନେଟିକ୍ ଇଞ୍ଜିନିୟରିଂ',
    location: 'ସାଳେପୁର, କଟକ, ଓଡ଼ିଶା, ଭାରତ (୨୦.୪୮୮୩° ଉ, ୮୫.୯୯୨୬° ପୂ)',
    tabNovel: 'ଉପନ୍ୟାସ',
    tabCutaway: 'କଟୱେ ମ୍ୟାପ୍',
    tabTwin: '୩ଡି ଟୁଇନ୍',
    tabPhysics: 'ପଦାର୍ଥ ବିଜ୍ଞାନ',
    tabCharts: 'ଚାର୍ଟ୍ସ',
    tabDossier: 'ତଥ୍ୟ ଭଣ୍ଡାର',
    tabCad: 'CAD ଏବଂ SQL',
    ghatiyantraShaft: 'ହାଇଡ୍ରୋ-କାଇନେଟିକ୍ ଘଟିଯନ୍ତ୍ର ଶାଫ୍ଟ ଏବଂ ଅଲଟରନେଟର୍',
    salipurAxis: 'ସାଳେପୁର ମହାନଦୀ-ବିରୂପା କେନାଲ୍ ନେଟୱର୍କ',
    operationalRPM: 'ଶାଫ୍ଟ ଘୂର୍ଣ୍ଣନ ବେଗ (RPM)',
    flywheelEnergy: 'ଫ୍ଲାଏହ୍ୱିଲ୍ ଗତିଜ ଶକ୍ତି',
    channelDepth: 'ଜାହାଜ ଚଳାଚଳ ଗଭୀରତା',
    siphonFlow: 'ନଦୀତଳ ସାଇଫନ୍ ପ୍ରବାହ ବେଗ',
    siltAlert: 'ପଟୁମାଟି ଜମା ବିପଦ ଚେତାବନୀ (< ୦.୬ ମି/ସେ)',
    siltSafe: 'ପ୍ରବାହ ବେଗ ସ୍ୱାଭାବିକ (ଆତ୍ମ-ପରିଷ୍କାର)',
    solarYield: 'ସୌର କାନୋପି ବିଦ୍ୟୁତ ଉତ୍ପାଦନ',
    cadScripts: 'AutoCAD Python COM ଏବଂ SolidWorks VBA ସ୍କ୍ରିପ୍ଟ',
    patentBrief: 'ପେଟେଣ୍ଟ-ଗ୍ରେଡ୍ ପ୍ରଣାଳୀ ବିବରଣୀ'
  },
  hi: {
    title: 'बेलापोखरी-नेक्सस',
    subtitle: 'पेटेंट-ग्रेड डिजिटल-ट्विन और हाइड्रो-काइनेटिक आर्किटेक्चर',
    location: 'सालेपुर, कटक, ओडिशा, भारत (20.4883° उत्तर, 85.9926° पूर्व)',
    tabNovel: 'उपन्यास',
    tabCutaway: 'कटअवे',
    tabTwin: '3D ट्विन',
    tabPhysics: 'भौतिकी',
    tabCharts: 'चार्ट्स',
    tabDossier: 'डॉसियर',
    tabCad: 'CAD व SQL',
    ghatiyantraShaft: 'हाइड्रो-काइनेटिक घटियंत्र शाफ्ट व अल्टरनेटर इंटरफ़ेस',
    salipurAxis: 'सालेपुर महानदी-बिरूपा नहर ग्रिड',
    operationalRPM: 'शाफ्ट घूर्णन गति (RPM)',
    flywheelEnergy: 'फ्लाईव्हील गतिज ऊर्जा',
    channelDepth: 'नौवहन चैनल गहराई',
    siphonFlow: 'नदी-तल साइफन प्रवाह वेग',
    siltAlert: 'गाद जमाव खतरा (< 0.6 मी/से)',
    siltSafe: 'प्रवाह वेग सुरक्षित (स्वयं-सफाई)',
    solarYield: 'सोलर कैनोपी विद्युत उत्पादन',
    cadScripts: 'AutoCAD Python COM व SolidWorks VBA स्क्रिप्ट्स',
    patentBrief: 'पेटेंट-ग्रेड सिस्टम विनिर्देश'
  }
};
