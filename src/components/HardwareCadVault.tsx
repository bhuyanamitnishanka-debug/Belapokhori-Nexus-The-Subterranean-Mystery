import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { haptics } from '../utils/haptics';
import { 
  FileCode, 
  Database, 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Layers, 
  Wrench, 
  Cpu, 
  Package,
  Globe2,
  Container,
  LineChart,
  Droplet,
  GitBranch,
  Eye,
  Box,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface Props {
  currentLang: Language;
}

export const HardwareCadVault: React.FC<Props> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [activeFile, setActiveFile] = useState<'readme' | 'assembly_manual_txt' | 'deploy_sh' | 'test_hydraulics' | 'autocad_interface' | 'simulation_py' | 'solidworks_parametric' | 'assembly_manual' | 'mesh_exporter' | 'gcode_parser' | 'manifest_i18n' | 'autocad' | 'solidworks' | 'cicd' | 'metrics_js' | 'hydrology_py' | 'stl_obj_py' | 'gcode' | 'docker' | 'sql'>('readme');
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // 1. Updated AutoCAD Python API Drawing Script (autocad_commands.py)
  const AUTOCAD_COMMANDS_PY = `# Project Belapokhori-Nexus: Automated AutoCAD Infrastructure Pipeline
# Script: hardware_cad/api_integrations/autocad_commands.py
# Execution Environment: Python 3.11+ via win32com wrapper pipeline

import win32com.client
import math
import sys

def execute_nexus_autocad_generation():
    print("[NEXUS CONTROL] Accessing local desktop AutoCAD application interface...")
    try:
        # Establish direct desktop COM bridge link to active AutoCAD engine instance
        acad = win32com.client.Dispatch("AutoCAD.Application")
        acad.Visible = True
        doc = acad.ActiveDocument
        model_space = doc.ModelSpace
        
        # Initialize specialized layer configurations for multi-company code tracking
        layers = doc.Layers
        
        layer_shaft = layers.Add("NEXUS_SHAFT_CORE")
        layer_shaft.color = 7  # Slate Iron White
        
        layer_buckets = layers.Add("NEXUS_KINETIC_BUCKETS")
        layer_buckets.color = 3  # Emerald Green
        
        # 1. Draft Central Forged Power Axle (50mm Core Diameter, 160mm Drive Hub)
        doc.ActiveLayer = layer_shaft
        origin = win32com.client.VARIANT(win32com.styled_array_type, [0.0, 0.0, 0.0])
        
        model_space.AddCircle(origin, 25.0)  # Forged axle shaft profile (25.0 mm radius)
        model_space.AddCircle(origin, 80.0)  # Load-bearing drive hub interface (80.0 mm radius)
        
        # 2. Parametric Array Loop for 12 Concentric Water-Lifting Units (Ghats)
        doc.ActiveLayer = layer_buckets
        total_slots = 12
        wheel_radius = 360.0  # mm sweep parameter scale vector
        
        for index in range(total_slots):
            # Compute exact angular division lines (30-degree increments)
            theta = (index / total_slots) * 2 * math.PI
            
            x_terminal = wheel_radius * math.cos(theta)
            y_terminal = wheel_radius * math.sin(theta)
            
            start_coord = win32com.client.VARIANT(win32com.styled_array_type, [0.0, 0.0, 0.0])
            end_coord = win32com.client.VARIANT(win32com.styled_array_type, [x_terminal, y_terminal, 0.0])
            
            # Place radial connecting spoke geometries
            model_space.AddLine(start_coord, end_coord)
            
            # Anchor structural water catchment pot nodes at outer structural line ends
            bucket_center = win32com.client.VARIANT(win32com.styled_array_type, [x_terminal, y_terminal, 0.0])
            model_space.AddCircle(bucket_center, 30.0)  # 30.0 mm internal pot configuration radius
            
        doc.Utility.Prompt("Nexus-Ghatiyantra parametric assembly layer compiled successfully.\\n")
        print("[NEXUS CONTROL] Layer generation sequence complete.")
        
    except Exception as error_payload:
        print(f"[FATAL EXCEPTION] Direct desktop CAD automation connection fault: {str(error_payload)}")
        sys.exit(1)

if __name__ == "__main__":
    execute_nexus_autocad_generation()
`;

  // 2. Updated SolidWorks VBA Configuration Layout Script (solidworks_layout.bas)
  const SOLIDWORKS_LAYOUT_BAS = `' ******************************************************************************
' Project Belapokhori-Nexus: Parametric Assembly Alignment Blueprint Engine
' Component: High-Speed Alternator & Gearbox Casing Construction Layer
' Environment Target: SolidWorks Standalone API Macro System
' ******************************************************************************

Dim swApp As Object
Dim swModel As Object
Dim swSketchMgr As Object
Dim swModelDocExt As Object
Dim alignmentStatus As Boolean

Sub main()

    ' Bind to active running instance of SolidWorks application
    Set swApp = Application.SldWorks
    Set swModel = swApp.ActiveDoc
    
    ' Safeguard against executing macro outside an open model container context
    If swModel Is Nothing Then
        MsgBox "Active SolidWorks part workspace context not discovered. Open target part file.", vbCritical, "API Link Interrupted"
        Exit Sub
    End If
    
    Set swSketchMgr = swModel.SketchManager
    Set swModelDocExt = swModel.Extension
    
    ' Wash the active selection stack clean to reset geometry pipeline limits
    swModel.ClearSelection2 True
    
    ' 1. Focus active execution matrix directly onto the Front Plane baseline
    alignmentStatus = swModelDocExt.SelectByID2("Front Plane", "PLANE", 0, 0, 0, False, 0, Nothing, 0)
    
    ' Open active sketch context mode inside the feature manager tree
    swSketchMgr.InsertSketch True
    
    ' 2. Layout structural perimeter boundary for the 50mm power shaft core (0.025m radius)
    Dim skShaftCore As Object
    Set skShaftCore = swSketchMgr.CreateCircle(0#, 0#, 0#, 0.025, 0#, 0#)
    
    ' 3. Layout bounding reference matrix for the Step-Up Gear Casing (220mm square configuration)
    swSketchMgr.CreateCenterRectangle 0#, 0#, 0#, 0.11, 0.11, 0#
    
    ' 4. Layout parameter spacing for the High-Speed Electromagnetic Alternator Stator (240mm limit)
    Dim skAlternatorMount As Object
    Set skAlternatorMount = swSketchMgr.CreateCircle(0#, 0#, 0#, 0.12, 0#, 0#)
    
    ' Close sketch context to commit parametric vector arrays to the physical modeling list
    swSketchMgr.InsertSketch True
    
    ' Force master parametric update pass across the 3D rendering pipeline
    swModel.ForceRebuild3 True

End Sub
`;

  // 3. Complete Odia and Hindi Translation Manifest
  const MANIFEST_ODIA_HINDI = `================================================================================
PROJECT BELAPOKHORI-NEXUS: MULTILINGUAL SYSTEM MANIFEST
WORKSTATION NODE: SALIPUR, ODISHA, INDIA (ସାଳେପୁର, କଟକ, ଓଡ଼ିଶା)
================================================================================

## PART 1: ODIA TRANSLATION (ଓଡ଼ିଆ ଅନୁବାଦ)
--------------------------------------------------------------------------------
## ୧. ଅଟୋକ୍ୟାଡ୍ ପାଇଥନ୍ କମାଣ୍ଡ୍ ଗାଇଡ୍ (AutoCAD Python Command Manifest)

* କାର୍ଯ୍ୟକ୍ଷମ ପଦ୍ଧତି: ଏହି ପାଇଥନ୍ ସ୍କ୍ରିପ୍ଟଟି (autocad_commands.py) ସିଧାସଳଖ ଡେସ୍କଟପ୍ COM ଇଣ୍ଟରଫେସ୍ ମାଧ୍ୟମରେ ଅଟୋକ୍ୟାଡ୍ (AutoCAD Application) ସହିତ ସଂଯୁକ୍ତ ହୋଇ କାମ କରିଥାଏ।
* ମୁଖ୍ୟ ଶାଫ୍ଟ ନିର୍ମାଣ (NEXUS_SHAFT): ଏହା ନଦୀର ସ୍ରୋତ ଦ୍ୱାରା ଘୂରିବାକୁ ଥିବା ୫୦ ମିଲିମିଟର ବ୍ୟାସ ବିଶିଷ୍ଟ କେନ୍ଦ୍ରୀୟ ପାୱାର୍ ଏକ୍ସଲ୍ (Axle Shaft) ଏବଂ ୧୬୦ ମିଲିମିଟର ର ଡ୍ରାଇଭ୍ ହବ୍ (Drive Hub) କୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଡ୍ରିଫ୍ଟ କରି ରେଖାଚିତ୍ର ତିଆରି କରେ।
* ପାରାମେଟ୍ରିକ୍ ଘଟ ଶୃଙ୍ଖଳା (NEXUS_BUCKETS): ଏହି ଲୁପ୍ଟି ୩୬୦ ମିଲିମିଟର ବ୍ୟାସାର୍ଦ୍ଧ ବିଶିଷ୍ଟ ଚକ୍ର ଉପରେ ଜ୍ୟାମିତିକ ଗଣିତ ସୂତ୍ର ପ୍ରୟୋଗ କରି ସମାନ ଦୂରତାରେ ୧୨ଟି ଜଳ-ଉଠା ଗାଡ଼ୁ ବା ପାତ୍ର (Water-lifting pot nodes) ଏବଂ ତାହାର ସଂଯୋଗୀକରଣ ବାଉଁଶ/ଲୁହା ଅର (Radial Spokes) ର ବ୍ଲୁପ୍ରିଣ୍ଟ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଅଙ୍କନ କରିଥାଏ।

## ୨. ସଲିଡୱର୍କସ ଭିବିଏ ଲେଆଉଟ୍ ମାନିଫେଷ୍ଟ (SolidWorks VBA Layout Manifest)

* ମେକାନିକାଲ୍ ଗିଅର ବକ୍ସ ଜୋନ୍: ଏହି ଭିବିଏ ମ୍ୟାକ୍ରୋଟି (solidworks_layout.bas) ସଲିଡୱର୍କସ ଭିତରେ ଚାଲି ଘଟୀଯନ୍ତ୍ରର କେନ୍ଦ୍ରୀୟ ଶାଫ୍ଟ ସହିତ ସଂଯୁକ୍ତ ହେବାକୁ ଥିବା ୨୨୦ ମିଲିମିଟର ବିଶିଷ୍ଟ ସ୍ପେଡ୍-ଅପ୍ ଗିଅର ହାଉସିଂ (Gearbox Case) ର ବାଉଣ୍ଡ୍ରି ଲାଇନକୁ ସ୍କେଚ୍ ପ୍ଲେନରେ ପ୍ରସ୍ତୁତ କରେ।
* ଡାଇନାମୋ ଏବଂ ଆଲଟରନେଟର ଲିଙ୍କ୍: ଏହା ବିଦ୍ୟୁତ୍ ଉତ୍ପାଦନ କରୁଥିବା ତମ୍ବା ତାର ଗୁଡ଼ାଯାଇଥିବା ହାଇ-ସ୍ପିଡ୍ ଇଲେକ୍ଟ୍ରୋମ୍ୟାଗ୍ନେଟିକ ଆଲଟରନେଟରର ସ୍ଥିତି ଏବଂ ୨୪୦ ମିଲିମିଟର ଷ୍ଟେଟର ବ୍ୟାସର ସୀମାକୁ ଫ୍ରଣ୍ଟ ପ୍ଲେନରେ ସଠିକ୍ ଭାବେ ସ୍ଥାପନ କରେ, ଯାହା ପରବର୍ତ୍ତୀ ସମୟରେ CNC ମେସିନ୍ ପାଇଁ ଜି-କୋଡ୍ (G-code) ପ୍ରସ୍ତୁତ କରିବାରେ ସାହାଯ୍ୟ କରିବ।

## ୩. ୩D ମେଶ୍ ଏକ୍ସପୋର୍ଟର୍ ସିଷ୍ଟମ୍ (mesh_exporter.py)

* କାର୍ଯ୍ୟପ୍ରଣାଳୀ: ଏହି ପାଇଥନ୍ କୋଡ୍ଟି ଆପଣଙ୍କ ପାରାମେଟ୍ରିକ୍ ୨D କ୍ୟାଡ୍ ସ୍କେଚ୍କୁ ଗାଣିତିକ ଉଚ୍ଚତା (Z-axis extrusion) ପ୍ରଦାନ କରି ଏକ ପୂର୍ଣ୍ଣାଙ୍ଗ ୩D ବସ୍ତୁରେ ପରିଣତ କରେ ଏବଂ ଶିଳ୍ପଭିତ୍ତିକ ମାନକ ଅନୁଯାୟୀ .obj ଏବଂ .stl ଫାଇଲ୍ ଫର୍ମାଟ୍ରେ ରପ୍ତାନି କରିଥାଏ। ଏହାକୁ ଆପଣ ସିଧାସଳଖ ୩D ପ୍ରିଣ୍ଟିଂ କିମ୍ବା ଆନିମେସନ୍ ପାଇଁ ବ୍ୟବହାର କରିପାରିବେ।

## ୪. ଜି-କୋଡ୍ ଟୁଲପାଥ୍ ସିମୁଲେସନ୍ ଲୁପ୍ (gcode_parser.py)

* କାର୍ଯ୍ୟପ୍ରଣାଳୀ: ଏହି ସିଷ୍ଟମ୍ଟି ଘଟୀଯନ୍ତ୍ରର କେନ୍ଦ୍ରୀୟ ଅକ୍ଷ ଏବଂ ୧୨ଟି ଜଳ-ଉଠା ପାତ୍ରର ଡିଜାଇନ୍କୁ ସିଧାସଳଖ ଯାନ୍ତ୍ରିକ କମାଣ୍ଡ୍ (G01, G02) ରେ ରୂପାନ୍ତରିତ କରେ, ଯାହା ଦ୍ୱାରା CNC ମିଲିଂ ମେସିନ୍ ବିନା କୌଣସି ମାନବ ସହାୟତାରେ କମ୍ପ୍ୟୁଟର ରୂପରେଖ ଅନୁଯାୟୀ ଧାତୁ କିମ୍ବା କାଠକୁ କାଟି ଏହାର ପ୍ରକୃତ ଯାନ୍ତ୍ରିକ ଅଂଶ ପ୍ରସ୍ତୁତ କରିପାରିବ।

## ୫. ଆଉଟୋମେଟେଡ୍ ଭିଜୁଆଲ୍ ପ୍ରିଭ୍ୟୁ ହ୍ୟାଣ୍ଡଲର୍ (simulation.py)

* କାର୍ଯ୍ୟପ୍ରଣାଳୀ: ଏହି ଫ୍ଲାସ୍କ ସର୍ଭର କୋଡ୍ଟି ଆପଣଙ୍କ ଇଞ୍ଜିନିୟରିଂ ଗ୍ରାଫିକ୍ ନୋଭେଲ୍ ଆପ୍ ପାଇଁ ଏକ ମୁଖ୍ୟ ବ୍ୟାକେଣ୍ଡ୍ ନିୟନ୍ତ୍ରକ ଭାବେ କାମ କରେ। ଏହା କମ୍ପ୍ୟୁଟର ହାର୍ଡଡିସ୍କରୁ ଆପେ ଆପେ .obj ଫାଇଲ୍ର ୩D ଗାଣିତିକ କୋର୍ଡିନେଟ୍ସକୁ ଖୋଜି ବାହାର କରି ଏହାକୁ ୱେବ୍ଜିଏଲ୍ (WebGL) ଭିଉପୋର୍ଟକୁ ପଠାଇଥାଏ, ଯାହାଦ୍ୱାରା ୩D ମଡେଲ୍ଟି ୱେବସାଇଟ୍ ପେଜ୍ ଉପରେ ସିଧାସଳଖ ଦେଖାଯାଇପାରିବ।

## ୬. ଭିବିଏ ପାରାମେଟ୍ରିକ୍ ଡ୍ରଇଂ ସ୍କ୍ରିପ୍ଟ (solidworks_parametric.bas)

* କାର୍ଯ୍ୟପ୍ରଣାଳୀ: ଏହି ସ୍ୱୟଂଚାଳିତ ଭିବିଏ ମ୍ୟାକ୍ରୋଟି ସଲିଡୱର୍କସ ଆପ୍ ଭିତରେ ଚାଲିଥାଏ। ଏହା ମାନୁଆଲ୍ ଡ୍ରଇଂ କରିବା ପରିବର୍ତ୍ତେ ଗାଣିତିକ ସୂତ୍ର (Trigonometric logic) ପ୍ରୟୋଗ କରି ୫୦ ମିଲିମିଟର ଶାଫ୍ଟ ଏବଂ ୧୨ଟି ଜଳ-ଉଠା ପାତ୍ର ବିଶିଷ୍ଟ ଘଟୀଯନ୍ତ୍ରର ସମ୍ପୂର୍ଣ୍ଣ କାଇନେମେଟିକ୍ସ ମଡେଲ୍କୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ପ୍ରସ୍ତୁତ କରିଥାଏ, ଯାହା ପେଟେଣ୍ଟ-ଗ୍ରେଡ୍ ପ୍ରୋଟୋଟାଇପିଂ ପାଇଁ ଅତ୍ୟନ୍ତ ଆବଶ୍ୟକ।

================================================================================
## PART 2: HINDI TRANSLATION (हिंदी अनुवाद)
--------------------------------------------------------------------------------
## 1. ऑटोकैड पाइथन कमांड मैनिफेस्ट (AutoCAD Python Command Manifest)

* कार्यप्रणाली: यह पाइथन स्क्रिप्ट सीधे डेस्कटॉप COM इंटरफ़ेस (Direct Desktop COM Engine) का उपयोग करके ऑटोकैड एप्लिकेशन के साथ जुड़ती है और बिना मैन्युअल ड्राफ्टिंग के आरेख तैयार करती है।
* मुख्य शाफ्ट निर्माण (NEXUS_SHAFT): यह परत (Layer) नदी की गतिज ऊर्जा (Kinetic Energy) से घूमने वाले 50mm व्यास के केंद्रीय पावर एक्सल (Power Axle Shaft) और 160mm के ड्राइव हब को मूल बिंदु (Origin) पर स्वचालित रूप से रेखांकित करती है।
* पैरामीट्रिक घट चक्र (NEXUS_BUCKETS): यह लूप 360mm त्रिज्या वाले मुख्य चक्र की परिधि पर त्रिकोणमितीय सूत्रों का उपयोग करके समान दूरी पर 12 जल-उत्थापक पात्रों (Water-lifting pots) और उनकी सहायक रेडियल आरे (Spokes) का सटीक ज्यामितीय लेआउट तैयार करता है।

## 2. सॉलिडवर्क्स वीबीए लेआउट मैनिफेस्ट (SolidWorks VBA Layout Manifest)

* मैकेनिकल गियरबॉक्स केसिंग: यह वीबीए मैक्रो सॉलिडवर्क्स के फ्रंट प्लेन (Front Plane) पर सक्रिय होकर घटीयंत्र के मुख्य शाफ्ट से जुड़े 220mm के स्टेप-अप गियरबॉक्स हाउसिंग की सीमाओं का ज्यामितीय खाका खींचता है।
* अल्टरनेटर और डायनेमो इंटरफ़ेस: यह बिजली उत्पादन करने वाले इलेक्ट्रोमैग्नेटिक अल्टरनेटर के 240mm बाहरी स्टेटर व्यास (Stator Diameter) के साथ इसके संरेखण (Alignment) को सुनिश्चित करता है। यह लेआउट 3D डिजिटल सिमुलेशन को सीधे CNC मिलिंग मशीनों के लिए आवश्यक G-code जनरेशन और फिजिकल प्रोटोटाइपिंग के साथ एकीकृत करने के लिए आवश्यक है।

## 3. 3D मेश एक्सपोर्टर सिस्टम (mesh_exporter.py)

* कार्यप्रणाली: यह प्रोग्राम आपके 2D कैड निर्देशांकों को गणितीय रूप से Z-अक्ष पर उभार (Extrusion) देकर त्रि-आयामी (3D) ठोस मॉडल में बदल देता है। यह बिना किसी बाहरी कनवर्टर के सीधे औद्योगिक मानकों के अनुरूप .obj और .stl प्रारूपों में फाइलें तैयार करता है।

## 4. जी-कोड टूलपाथ पार्सिंग लूप (gcode_parser.py)

* कार्यप्रणाली: यह विनिर्माण (Manufacturing) इंजन घटीयंत्र के केंद्रीय शाफ्ट और 12 जल-उत्थापक पात्रों के लेआउट को सीधे कंप्यूटर-नियंत्रित निर्देशों (G01 रैखिक गति, G02 गोलाकार कटिंग) में पार्स करता है। इसके द्वारा तैयार की गई .nc फाइल को सीधे किसी भी आधुनिक CNC मशीन में फीड करके धातु के पुर्जों की सटीक कटिंग और फिजिकल प्रोटोटाइपिंग की जा सकती है।

## 5. ऑटोमेटेड विजुअल प्रिव्यू हैंडलर (simulation.py)

* कार्यप्रणाली: यह फ़्लास्क सर्वर रूट कंट्रोलर आपके इंजीनियरिंग ग्राफिक नॉवेल एप्लिकेशन के बैकएंड इंजन की तरह काम करता है। यह सिस्टम स्टोरेज से जेनरेट की गई .obj फाइलों के 3D वर्टिकल और फेस वेक्टर्स को रीयल-टाइम में स्कैन करके सीधे वेब ब्राउज़र के WebGL व्यूपोर्ट में स्ट्रीम करता है।

## 6. वीबीए पैरामीट्रिक ड्राइंग स्क्रिप्ट (solidworks_parametric.bas)

* कार्यप्रणाली: यह उन्नत वीबीए मैक्रो सॉलिडवर्क्स के भीतर काम करता है। यह मैन्युअल रूप से स्केच बनाने के बजाय चर मानकों (Parametric Variables) का उपयोग करके घटीयंत्र के मुख्य पावर एक्सल और 12 बकेट वाले पूरे मैकेनिकल सिस्टम को कोड के माध्यम से स्वचालित रूप से तैयार करता है, जिससे पेटेंट-ग्रेड प्रोटोटाइप डिजाइनिंग की गति अत्यधिक बढ़ जाती है।

================================================================================
## PART 3: TRANSLATED ENGINEERING DOCUMENTATION INDEX
================================================================================
### ଓଡ଼ିଆ ଅନୁବାଦ (Odia Translation)
* **ଭିଡିଓ ଓ ଜଳୀୟ ଯାଞ୍ଚ ଇଞ୍ଜିନ୍ (test_hydraulics.py):** ଏହି ପାଇଥନ୍ ଟେଷ୍ଟିଂ ସୁଇଟ୍ଟି ଜାତୀୟ ବନ୍ୟା ନିୟନ୍ତ୍ରଣ ବ୍ୟବସ୍ଥା ଓ ମଡେଲିଂ ଗଣିତ ଅନୁଯାୟୀ କାମ କରେ। ଏହା ନଦୀ ତଳେ ଥିବା ସାଇଫନ୍ ପାଇପ୍ର ଭିତର ଚାପକୁ (Hydrostatic pressure) ସଠିକ୍ ଭାବେ ଟ୍ରାକ୍ କରେ ଏବଂ ସିଲଟେସନ୍ (କାଦୁଅ ଜମା ହେବା) ସମସ୍ୟା ଉପରେ ସ୍ୱୟଂଚାଳିତ ଭାବେ ନଜର ରଖେ, ଯାହାଫଳରେ CI/CD ପାଇପଲାଇନ୍ରେ କୌଣସି ତ୍ରୁଟି ରହେନାହିଁ।
* **ଆଉଟୋମେଟେଡ୍ କ୍ୟାଡ୍ ଏପିଆଇ ସ୍କ୍ରିପ୍ଟ (autocad_interface.py & solidworks_layout.bas):** ଏହି ସ୍ୱୟଂଚାଳିତ କୋଡ୍ ସମୂହ ମାନୁଆଲ୍ ଡ୍ରଇଂ ର ପରିଶ୍ରମକୁ ସମ୍ପୂର୍ଣ୍ଣ ରୂପେ ଦୂର କରିଦିଏ। ଏହା ଗଣିତର ପାରାମେଟ୍ରିକ୍ ସୂତ୍ର ପ୍ରୟୋଗ କରି ୫୦ ମିଲିମିଟର ପାୱାର୍ ଅକ୍ଷ ଶାଫ୍ଟ ଏବଂ ୧୨ଟି ପାତ୍ର ବିଶିଷ୍ଟ ଘଟୀଯନ୍ତ୍ରର ଯାନ୍ତ୍ରିକ ରେଖାଚିତ୍ରକୁ ଅଟୋକ୍ୟାଡ୍ ଏବଂ ସଲିଡୱର୍କସ ଭିତରେ ସେକେଣ୍ଡ୍ ଭିତରେ ସ୍କେଚ୍ କରିଥାଏ।

### हिंदी अनुवाद (Hindi Translation)
* **हाइड्रोलिक वैलिडेशन टेस्ट इंजन (test_hydraulics.py):** यह परीक्षण सुइट गिटहब एक्शन्स (GitHub Actions) के भीतर स्वचालित रूप से काम करता है। यह टोरिकैली-बर्नौली भौतिकी सिद्धांतों के आधार पर भूमिगत साइफन चैनलों के दबाव (Pressure) की निगरानी करता है तथा 45.0 kPa से कम दबाव होने पर तलछट (Siltation) का अलर्ट जारी कर देता है।
* **ऑटोमेटेड कैड एपीआई स्क्रिप्ट (autocad_interface.py & solidworks_layout.bas):** यह कोड लेयर सीधे आपके डेस्कटॉप पर ऑटोकैड और सॉलिडवर्क्स के साथ जुड़कर 3D कंपोनेंट्स का स्केच तैयार करती है। यह बिना किसी मैन्युअल इनपुट के घटीयंत्र के 50mm पावर एक्सल, 220mm गियरबॉक्स हाउसिंग और 12 परिधीय बकेट नोड्स की रेखाओं को प्रोग्रामेटिक रूप से ड्राफ्ट कर देती है।
`;

  // 4. 3D Mesh Mapping Engine & File Exporter (mesh_exporter.py)
  const MESH_EXPORTER_PY = `# Project Belapokhori-Nexus: 3D Standard Mesh Mesh Exporter
# Platform Pipeline: CAD Layer Transformation Matrix to OBJ/STL
# Developer Core Axis: Salipur, Odisha, India

import os
import math

class MeshGenerationEngine:
    def __init__(self, filename_base="nexus_ghatiyantra"):
        self.filename_base = filename_base
        self.vertices = []
        self.faces = []

    def build_3d_extruded_cylinder(self, radius, thickness, z_offset, segments=32):
        """Programmatically calculates 3D volumetric surfaces for shafts and hubs."""
        start_v_idx = len(self.vertices) + 1
        
        # 1. Generate front and back radial vertices
        for z in [z_offset, z_offset + thickness]:
            for i in range(segments):
                theta = (i / segments) * 2.0 * math.pi
                x = radius * math.cos(theta)
                y = radius * math.sin(theta)
                self.vertices.append((x, y, z))
        
        # 2. Map side cap faces
        for i in range(segments):
            next_i = (i + 1) % segments
            v1 = start_v_idx + i
            v2 = start_v_idx + next_i
            v3 = start_v_idx + segments + i
            v4 = start_v_idx + segments + next_i
            
            # Quads split into hardware triangles
            self.faces.append((v1, v2, v4))
            self.faces.append((v1, v4, v3))

    def export_to_obj(self):
        """Writes the vector data arrays into a wavefaced OBJ format text file."""
        filepath = f"{self.filename_base}.obj"
        with open(filepath, "w") as f:
            f.write(f"# Project Belapokhori-Nexus: 3D Mechanical Prototype\\n")
            f.write(f"# Export System Location: Salipur, Odisha\\n\\n")
            
            for v in self.vertices:
                f.write(f"v {v[0]:.4f} {v[1]:.4f} {v[2]:.4f}\\n")
            
            f.write("\\n")
            for face in self.faces:
                f.write(f"f {face[0]} {face[1]} {face[2]}\\n")
        print(f"[EXPORT LOG] Successfully exported 3D standard model matrix to: {filepath}")

    def export_to_ascii_stl(self):
        """Converts structural coordinate maps to standard stereolithography STL format."""
        filepath = f"{self.filename_base}.stl"
        with open(filepath, "w") as f:
            f.write(f"solid {self.filename_base}\\n")
            
            for face in self.faces:
                v1 = self.vertices[face[0] - 1]
                v2 = self.vertices[face[1] - 1]
                v3 = self.vertices[face[2] - 1]
                
                # Compute mock orthogonal normal vector pointing outward
                f.write("  facet normal 0.0 0.0 1.0\\n")
                f.write("    outer loop\\n")
                f.write(f"      vertex {v1[0]:.4f} {v1[1]:.4f} {v1[2]:.4f}\\n")
                f.write(f"      vertex {v2[0]:.4f} {v2[1]:.4f} {v2[2]:.4f}\\n")
                f.write(f"      vertex {v3[0]:.4f} {v3[1]:.4f} {v3[2]:.4f}\\n")
                f.write("    endloop\\n")
                f.write("  endfacet\\n")
                
            f.write(f"endsolid {self.filename_base}\\n")
        print(f"[EXPORT LOG] Successfully exported 3D standard model matrix to: {filepath}")

if __name__ == "__main__":
    engine = MeshGenerationEngine()
    # Extrude Central Axle: Radius 25mm, Thickness 400mm, Positioned at Origin
    engine.build_3d_extruded_cylinder(radius=25.0, thickness=400.0, z_offset=0.0)
    # Extrude Drive Hub Interface: Radius 80mm, Thickness 60mm, Positioned at Center
    engine.build_3d_extruded_cylinder(radius=80.0, thickness=60.0, z_offset=170.0)
    
    engine.export_to_obj()
    engine.export_to_ascii_stl()
`;

  // 5. Smart Manufacturing G-Code Toolpath Generator (gcode_parser.py)
  const GCODE_PARSER_PY = `# Project Belapokhori-Nexus: CNC Manufacturing Code Parser
# System Execution Architecture: Parametric G-Code Toolpath Generator
# Developer Core Axis: Salipur, Odisha, India

import os
import math

class GCodeToolpathGenerator:
    def __init__(self, target_feed_rate=1200, spindle_speed=4500):
        self.feed = target_feed_rate
        self.spindle = spindle_speed
        self.commands = []
        
    def initialize_machine_header(self):
        """Compiles safe initialization variables block into machine registry files."""
        self.commands.extend([
            "G90",         # Absolute coordinate positioning layout
            "G21",         # Core unit metric measurement parameters (mm scale)
            "G17",         # XY plane selection mode active
            f"M03 S{self.spindle}", # Spin spindle clockwise at target speed
            "G00 Z10.0"    # Rapid linear transition lift to safe clearance level
        ])

    def parse_circular_cut(self, center_x, center_y, radius, cutting_depth=-5.0):
        """Calculates precise step-by-step entry points to cut structural components."""
        start_x = center_x + radius
        start_y = center_y
        
        self.commands.extend([
            f"\\n; --- STARTING CONCENTRIC MILLING SEQUENCE FOR POT/AXLE CORE ---",
            f"G00 X{start_x:.3f} Y{start_y:.3f}",   # Move rapidly to circle start point border
            f"G01 Z{cutting_depth:.3f} F200",        # Linear feed down into stock material
            f"G02 X{start_x:.3f} Y{start_y:.3f} I{-radius:.3f} J0.0 F{self.feed}", # CW full circle profile cut
            f"G00 Z10.0"                             # Retract safely back out of work area
        ])

    def parse_linear_slot(self, x_start, y_start, x_end, y_end, cutting_depth=-3.0):
        """Carves out high-strength connection slots for the 12 radial spokes."""
        self.commands.extend([
            f"\\n; --- STARTING LINEAR MILLING SEQUENCE FOR RADIAL SPOKE SLOT ---",
            f"G00 X{x_start:.3f} Y{y_start:.3f}",
            f"G01 Z{cutting_depth:.3f} F200",
            f"G01 X{x_end:.3f} Y{y_end:.3f} F{self.feed}",
            f"G00 Z10.0"
        ])

    def compile_and_save_nc(self, output_filename="nexus_toolpaths.nc"):
        """Appends closing parameters and saves the toolpath coordinates script."""
        self.commands.extend([
            "\\nM05",     # Kill spindle rotational drive output
            "M30"      # End of structural program execution index marker
        ])
        
        filepath = os.path.join(os.getcwd(), output_filename)
        with open(filepath, "w") as f:
            f.write("; PROJECT BELAPOKHORI-NEXUS: AUTOMATED TOOLPATH SCRIPT\\n")
            f.write("; ARCHITECTURE CONTROL NODE: SALIPUR, ODISHA\\n")
            f.write(";\\n".join(self.commands))
        print(f"[MANUFACTURING LOG] G-code production toolpaths compiled into: {filepath}")

if __name__ == "__main__":
    generator = GCodeToolpathGenerator()
    generator.initialize_machine_header()
    
    # 1. Profile cut the 50mm diameter central axle core at origin (Radius = 25mm)
    generator.parse_circular_cut(center_x=0.0, center_y=0.0, radius=25.0)
    
    # 2. Parametrically generate lines to carve out the 12 structural spokes slots
    total_spokes = 12
    length = 360.0
    for i in range(total_spokes):
        angle = (i / total_spokes) * 2 * math.pi
        x_terminal = length * math.cos(angle)
        y_terminal = length * math.sin(angle)
        generator.parse_linear_slot(0.0, 0.0, x_terminal, y_terminal)
        
    generator.compile_and_save_nc()
`;


  // 4. Extended Python 3D Mesh Exporter (OBJ & STL)
  const STL_OBJ_PY_CODE = `"""
Project Belapokhori-Nexus: Core System Repository
File: hardware_cad/api_integrations/export_cad_to_stl_obj.py
Description: Translates 2D/3D CAD layer definitions directly into standard 3D formats (.OBJ and .STL)
Component: Ghatiyantra Kinetic Energy Conversion System (Salipur, Odisha)
"""

import math

class Ghatiyantra3DExporter:
    def __init__(self, shaft_radius=25.0, wheel_radius=360.0, pot_radius=30.0, shaft_length=800.0):
        self.r_shaft = shaft_radius
        self.r_wheel = wheel_radius
        self.r_pot = pot_radius
        self.length = shaft_length
        self.spokes = 12
        self.vertices = []
        self.faces = []

    def generate_mesh(self):
        segments = 32
        for i in range(segments):
            angle = (i / segments) * 2 * math.pi
            self.vertices.append((self.r_shaft * math.cos(angle), self.r_shaft * math.sin(angle), -self.length / 2))
        for i in range(segments):
            angle = (i / segments) * 2 * math.pi
            self.vertices.append((self.r_shaft * math.cos(angle), self.r_shaft * math.sin(angle), self.length / 2))
        for i in range(segments):
            next_i = (i + 1) % segments
            self.faces.append((i + 1, next_i + 1, segments + next_i + 1, segments + i + 1))

        # 12 Perimeter Water Pots (Ghats)
        for s in range(self.spokes):
            theta = (s / self.spokes) * 2 * math.pi
            cx = self.r_wheel * math.cos(theta)
            cy = self.r_wheel * math.sin(theta)
            pot_start = len(self.vertices) + 1
            pot_segs = 16
            for p in range(pot_segs):
                phi = (p / pot_segs) * 2 * math.pi
                self.vertices.append((cx + self.r_pot * math.cos(phi), cy + self.r_pot * math.sin(phi), -30.0))
            for p in range(pot_segs):
                phi = (p / pot_segs) * 2 * math.pi
                self.vertices.append((cx + (self.r_pot * 0.7) * math.cos(phi), cy + (self.r_pot * 0.7) * math.sin(phi), 30.0))
            for p in range(pot_segs):
                np = (p + 1) % pot_segs
                self.faces.append((pot_start + p, pot_start + np, pot_start + pot_segs + np, pot_start + pot_segs + p))

    def export_obj(self, filename="ghatiyantra_kinetic_system.obj"):
        self.generate_mesh()
        with open(filename, "w") as f:
            f.write("# Project Belapokhori-Nexus (Salipur Axis Grid)\\n")
            f.write("o Ghatiyantra_Shaft_Assembly\\n")
            for v in self.vertices:
                f.write(f"v {v[0]:.4f} {v[1]:.4f} {v[2]:.4f}\\n")
            for face in self.faces:
                f.write("f " + " ".join(str(idx) for idx in face) + "\\n")
        print(f"[SUCCESS] Exported: {filename}")

    def export_stl(self, filename="ghatiyantra_kinetic_system.stl"):
        if not self.vertices:
            self.generate_mesh()
        with open(filename, "w") as f:
            f.write("solid Ghatiyantra_Kinetic_System\\n")
            for face in self.faces:
                v1, v2, v3 = self.vertices[face[0]-1], self.vertices[face[1]-1], self.vertices[face[2]-1]
                f.write("  facet normal 0.0000 0.0000 1.0000\\n    outer loop\\n")
                f.write(f"      vertex {v1[0]:.4f} {v1[1]:.4f} {v1[2]:.4f}\\n")
                f.write(f"      vertex {v2[0]:.4f} {v2[1]:.4f} {v2[2]:.4f}\\n")
                f.write(f"      vertex {v3[0]:.4f} {v3[1]:.4f} {v3[2]:.4f}\\n")
                f.write("    endloop\\n  endfacet\\n")
            f.write("endsolid Ghatiyantra_Kinetic_System\\n")
        print(f"[SUCCESS] Exported: {filename}")

if __name__ == "__main__":
    exporter = Ghatiyantra3DExporter()
    exporter.export_obj()
    exporter.export_stl()
`;

  // 5. Complete CNC Milling G-Code
  const GCODE_FILE = `( ============================================================================== )
( PROJECT: BELAPOKHORI-NEXUS // SALIPUR AXIS GRID                               )
( PART: GHATIYANTRA KINETIC CONVERTER - 12-SPOKE WHEEL & WATER POT FLANGES       )
( LOCATION: BANKLINE JUNCTION / COMBINED URBAN SEWERAGE OUTFLOW DIVERSION        )
( MACHINE: 3-AXIS CNC MILL / HIGH-PRECISION FIBER LASER CUTTER                   )
( ============================================================================== )

G21 G90 G17 G94
T01 M06 (12mm 4-Flute Carbide End Mill for Steel Hub)
G54 S3200 M03 M08 (Spindle 3200 RPM, Coolant ON)
G00 Z50.000
G00 X0.000 Y0.000 (Central Power Axle Origin)
G00 Z5.000

( POCKET 1: BORE CENTRAL AXLE LOCATING HOLE - DIA 50.000mm )
G01 Z-2.000 F600
G02 X0.000 Y0.000 I19.000 J0.000 F1400
G01 Z-4.000 F600
G02 X0.000 Y0.000 I19.000 J0.000 F1400
G00 Z15.000

( --- TOOL CHANGE: T02 - 6mm Ball Nose for 12 Bronze Water Pots --- )
T02 M06
S5500 M03 G00 Z25.000

( 12 PERIMETER GHAT POCKETS AT R=360.0mm )
( POT #01: 0.0 DEG )
G00 X360.000 Y0.000
G01 Z-3.000 F450
G02 X360.000 Y0.000 I27.000 J0.000 F950
G00 Z15.000

( POT #02: 30.0 DEG )
G00 X311.769 Y180.000
G01 Z-3.000 F450
G02 X311.769 Y180.000 I23.383 J13.500 F950
G00 Z15.000

( POT #03: 60.0 DEG )
G00 X180.000 Y311.769
G01 Z-3.000 F450
G02 X180.000 Y311.769 I13.500 J23.383 F950
G00 Z15.000

M09 M05
G00 Z100.000
G28 X0.000 Y0.000
M30
`;

  // 6. Exact Docker Multi-Stage Assembly Template (Dockerfile)
  const DOCKERFILE_TEMPLATE = `# ==============================================================================
# Project Belapokhori-Nexus: Multi-Stage Production Infrastructure Image Setup
# System Platform Target: Lightweight Architecture Deployment Base
# Workstation Node: Salipur, Odisha, India
# ==============================================================================

# STAGE 1: Dependency Assembly & Build Matrix Environment
FROM python:3.11-slim AS compiler-node
WORKDIR /build
RUN apt-get update && apt-get install -y --no-install-recommends \\
    build-essential \\
    libpq-dev \\
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
# Direct local isolated dependencies download pipeline execution
RUN pip install --no-cache-dir --user -r requirements.txt

# STAGE 2: Secure Runtime Final Assembly Node
FROM python:3.11-slim AS runtime-node
WORKDIR /workspace
RUN apt-get update && apt-get install -y --no-install-recommends \\
    libpq5 \\
    && rm -rf /var/lib/apt/lists/*
# Recover installed software compilation artifacts from Stage 1 instance
COPY --from=compiler-node /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1
EXPOSE 5000
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]
`;

  // 7. Siphon Pressure Validation Ranges Code (hydrology.py)
  const HYDROLOGY_PY_CODE = `# Project Belapokhori-Nexus: Siphon System Pipeline Verification
# Component: Under-Riverbed Hydrostatic Safety Checker
# File Location: /app/models/hydrology.py
# Node: Salipur, Odisha, India

class SiphonValidationEngine:
    def __init__(self):
        # Precise operational parameter limits (in kiloPascals - kPa)
        # Calibrated using strict Torricelli-Bernoulli head boundary sets
        self.bounds = {
            "MIN_HYDROSTATIC_PRESSURE": 45.0,   # Below this point, system flow stops or stalls
            "OPTIMAL_PRESSURE_LOW": 85.0,      # Baseline dry weather distribution zone
            "OPTIMAL_PRESSURE_HIGH": 165.0,    # Baseline wet weather distribution zone
            "CRITICAL_MAX_PRESSURE": 280.0     # Structural threshold limit to prevent pipeline failure
        }

    def verify_pipeline_pressure(self, operational_pressure_kpa):
        """
        Runs step-by-step systemic evaluation against real-world pressure metrics.
        Returns a structured dictionary indicating system state and safety steps.
        """
        pressure = float(operational_pressure_kpa)
        
        if pressure < self.bounds["MIN_HYDROSTATIC_PRESSURE"]:
            return {
                "status": "CRITICAL_ERROR",
                "code": "SILTATION_HAZARD_LOW_FLOW",
                "message": "Fluid velocity insufficient. Risk of sand accumulation inside under-bed lines. Activate stepwell flash-gates immediately."
            }
            
        elif self.bounds["MIN_HYDROSTATIC_PRESSURE"] <= pressure < self.bounds["OPTIMAL_PRESSURE_LOW"]:
            return {
                "status": "WARNING",
                "code": "STAGNATION_WARNING",
                "message": "System operating under restricted flow head conditions. Monitor siphon channels closely."
            }
            
        elif self.bounds["OPTIMAL_PRESSURE_LOW"] <= pressure <= self.bounds["OPTIMAL_PRESSURE_HIGH"]:
            return {
                "status": "STABLE",
                "code": "OPTIMAL_NOMINAL_FLOW",
                "message": "Hydrostatic pressure values balanced. Inland waterway depth stable. Shipping channel clear."
            }
            
        elif self.bounds["OPTIMAL_PRESSURE_HIGH"] < pressure < self.bounds["CRITICAL_MAX_PRESSURE"]:
            return {
                "status": "ALERT",
                "code": "HIGH_SURGE_FLOW",
                "message": "Monsoon roof-catchment volumes loading. Open secondary side pockets to distribute excess volume."
            }
            
        else:
            return {
                "status": "CRITICAL_ERROR",
                "code": "PRESSURE_OVERLOAD_BREACH",
                "message": "Pipeline structural limit exceeded! Shut down primary barrage inputs and divert all flow into deep aquifer recharge zones."
            }
`;

  // 8. WebGL Frontend Telemetry Dashboard Charts Pipeline (metrics_panel.js)
  const METRICS_PANEL_JS = `/**
 * Project Belapokhori-Nexus: Telemetry Dashboard Charts Pipeline
 * Component: Real-Time Performance Monitor Engine
 * File Location: /app/static/js/metrics_panel.js
 */
export class TelemetryChartPipeline {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.dataPoints = [];
        this.maxPoints = 50; // Horizontal history tracking depth
        
        // Technical visualization palette styling
        this.colors = {
            grid: '#1a273a',
            line: '#00ffcc',
            glow: 'rgba(0, 255, 204, 0.2)',
            text: '#8a95a5'
        };

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        this.render();
    }

    pushMetric(value) {
        this.dataPoints.push(parseFloat(value));
        if (this.dataPoints.length > this.maxPoints) {
            this.dataPoints.shift(); // Evict oldest telemetry point
        }
        this.render();
    }

    render() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const padding = 40;

        // Clear view area
        this.ctx.fillStyle = '#0a0f1d';
        this.ctx.fillRect(0, 0, w, h);

        // 1. Draw Background Grid Lines
        this.ctx.strokeStyle = this.colors.grid;
        this.ctx.lineWidth = 1;
        
        const gridCount = 5;
        for (let i = 1; i < gridCount; i++) {
            let y = padding + ((h - 2 * padding) / gridCount) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(w - padding, y);
            this.ctx.stroke();
        }

        if (this.dataPoints.length < 2) return;

        // 2. Compute Mapping Geometry Primitives
        const minVal = 0;
        const maxVal = 100; // Calibrated operational scale upper limit
        const graphW = w - 2 * padding;
        const graphH = h - 2 * padding;

        this.ctx.beginPath();
        for (let i = 0; i < this.dataPoints.length; i++) {
            let x = padding + (i / (this.maxPoints - 1)) * graphW;
            let normalizedY = (this.dataPoints[i] - minVal) / (maxVal - minVal);
            let y = h - padding - (normalizedY * graphH);

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }

        // 3. Render High-Visibility Glow Pipeline Style
        this.ctx.strokeStyle = this.colors.line;
        this.ctx.lineWidth = 3;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = this.colors.line;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // 4. Render Telemetry Value Tags
        this.ctx.fillStyle = this.colors.text;
        this.ctx.font = '12px monospace';
        const currentVal = this.dataPoints[this.dataPoints.length - 1].toFixed(2);
        this.ctx.fillText(\`VAL: \${currentVal}\`, w - padding - 80, padding - 10);
    }
}
`;

  const SQL_DDL_CODE = `-- PostgreSQL Production Schema for Project Belapokhori-Nexus
-- Location: Salipur, Odisha, India
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE gh_shaft_metrics (
    reading_id BIGSERIAL PRIMARY KEY,
    rotational_speed_rpm NUMERIC(6,2) NOT NULL CHECK (rotational_speed_rpm >= 0.00),
    torque_newton_meters NUMERIC(7,2) NOT NULL,
    water_lift_volume_lps NUMERIC(6,2) DEFAULT 0.00,
    flywheel_kinetic_energy_joules NUMERIC(10,2) GENERATED ALWAYS AS (0.5 * 1250.0 * (rotational_speed_rpm * 0.1047197)^2) STORED,
    gear_box_efficiency_pct NUMERIC(5,2) CHECK (gear_box_efficiency_pct BETWEEN 0.00 AND 100.00),
    sewer_outfall_diverted_m3_s NUMERIC(5,2) DEFAULT 0.00,
    bankline_erosion_dampening_pct NUMERIC(5,2) DEFAULT 92.50,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gh_shaft_time ON gh_shaft_metrics (timestamp DESC);
`;

  // 10. Continuous Integration & Deployment Pipeline (.github/workflows/ci_cd.yml)
  const CI_CD_YML = `# ==============================================================================
# Project Belapokhori-Nexus: Comprehensive Continuous Integration & Deployment Pipeline
# Automated Architecture Workflow Engine Node
# ==============================================================================

name: Belapokhori-Nexus Engine CI/CD Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  code-verification:
    name: Core App Python Linting & Hydraulic Unit Verification Tests
    runs-on: ubuntu-latest

    steps:
    - name: Access Repository Source Tree Checks
      uses: actions/checkout@v4

    - name: Initialize Isolated Environment Runtime (Python 3.11)
      uses: actions/setup-python@v5
      with:
        python-version: "3.11"
        cache: 'pip'

    - name: Inject Environment Package Bundle Dependencies
      run: |
        python -m pip install --upgrade pip
        if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
        pip install flake8 pytest

    - name: Execute System Linting Pass Checks (Flake8 Constraints Check)
      run: |
        # Stop execution loop immediately if syntax faults are caught in code modules
        flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
        # Exit tolerance constraints verification configurations checking logic structures
        flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics

    - name: Execute Hydraulic Verification & Physics Ingestion Units Tests
      run: |
        pytest tests/

  production-build-and-pack:
    name: Secure Multi-Stage Multi-Arch Docker Framework Build Ingestion Pipeline
    needs: code-verification
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
    - name: Access Repository Source Tree Checks
      uses: actions/checkout@v4

    - name: Set up QEMU Architecture Multi-Platform Extension Compilers
      uses: docker/setup-qemu-action@v3

    - name: Set up Docker Buildx Isolation Architecture Components
      uses: docker/setup-buildx-action@v3

    - name: Authenticate Deployment Identity Credentials Registry (Docker Hub Core Profile Access)
      uses: docker/login-action@v3
      with:
        username: \${{ secrets.DOCKERHUB_USERNAME }}
        password: \${{ secrets.DOCKERHUB_TOKEN }}

    - name: Process Code Synthesis Container Optimization Assembly Packaging
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: |
          \${{ secrets.DOCKERHUB_USERNAME }}/belapokhori-nexus-core:latest
          \${{ secrets.DOCKERHUB_USERNAME }}/belapokhori-nexus-core:\${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
`;

  // 11. Automated Visual Mesh Preview Handler (simulation.py)
  const SIMULATION_PY = `# Project Belapokhori-Nexus: Automated Visual Mesh Handler Pipeline
# Target Engine: Flask Server WebGL Model Viewport Integrations
# Workstation Coordinates: Salipur, Odisha, India

from flask import Blueprint, jsonify, send_file, current_app
import os

simulation_bp = Blueprint('simulation', __name__)

@simulation_bp.route('/api/v1/mesh/preview/<string:component_name>', methods=['GET'])
def get_mesh_preview_data(component_name):
    """
    Locates mechanical parts on the disk matrix and streams structured 
    coordinate telemetry vectors to the interactive WebGL dashboard container.
    """
    # Sanitize and guard filename context inputs against traversal exploits
    safe_filename = "".join([c for c in component_name if c.isalnum() or c in ('.', '_', '-')])
    mesh_directory = os.path.join(current_app.root_path, 'static', 'mesh_exports')
    filepath = os.path.join(mesh_directory, safe_filename)

    if not os.path.exists(filepath):
        return jsonify({
            "status": "ERROR",
            "code": "FILE_NOT_FOUND",
            "message": f"Target mechanical assembly '{safe_filename}' not found in asset repository."
        }), 404

    try:
        # Determine format extension profile types
        ext = os.path.splitext(safe_filename)[1].lower()
        
        vertices = []
        faces = []

        # High-performance byte stream reading loop for standard OBJ formats
        if ext == '.obj':
            with open(filepath, 'r') as obj_file:
                for line in obj_file:
                    if line.startswith('v '):
                        parts = line.split()
                        vertices.append([float(parts[1]), float(parts[2]), float(parts[3])])
                    elif line.startswith('f '):
                        parts = line.split()
                        # Extract structural indices (handling standard slash formatting offsets)
                        face_indices = [int(p.split('/')[0]) - 1 for p in parts[1:]]
                        faces.append(face_indices)

            return jsonify({
                "status": "SUCCESS",
                "format": "OBJ",
                "component": safe_filename,
                "data": {
                    "vertices": vertices,
                    "faces": faces
                }
            }), 200

        # General file fallback route wrapper
        return send_file(filepath, as_attachment=True)

    except Exception as e:
        return jsonify({
            "status": "FATAL_EXCEPTION",
            "code": "PARSING_FAILED",
            "message": f"Failed to map geometry vectors: {str(e)}"
        }), 500
`;

  // 12. SolidWorks Parametric Drawing Logic Generator (solidworks_parametric.bas)
  const SOLIDWORKS_PARAMETRIC_BAS = `' ******************************************************************************
' Project Belapokhori-Nexus: Parametric Structural Assembly Generator
' Component: Kinematic Ghatiyantra Multi-Pot Wheel Assembly Module
' Environment Target: SolidWorks Native API Automation Engine
' ******************************************************************************

Dim swApp As Object
Dim swModel As Object
Dim swSketchMgr As Object
Dim swModelDocExt As Object
Dim boolStatus As Boolean

Sub main()

    ' 1. Establish structural interface loop to running system workspace
    Set swApp = Application.SldWorks
    Set swModel = swApp.ActiveDoc
    
    If swModel Is Nothing Then
        MsgBox "Please boot into a valid Active Part space configuration before executing this logic script.", vbCritical, "SolidWorks Link Interrupted"
        Exit Sub
    End If
    
    Set swSketchMgr = swModel.SketchManager
    Set swModelDocExt = swModel.Extension
    swModel.ClearSelection2 True
    
    ' 2. Focus baseline sketch frame logic onto Front Plane coordinates
    boolStatus = swModelDocExt.SelectByID2("Front Plane", "PLANE", 0, 0, 0, False, 0, Nothing, 0)
    swSketchMgr.InsertSketch True
    
    ' 3. SYSTEM CONSTANTS DECLARATION (Parametric Configuration Variables)
    Dim PI As Double
    PI = 4 * Atn(1)
    
    Dim WheelRadius As Double
    WheelRadius = 0.360 ' Calibrated 360mm parameter scale vector limits
    
    Dim TotalPots As Integer
    TotalPots = 12
    
    Dim PotRadius As Double
    PotRadius = 0.030 ' 30mm water catchment volume perimeter limits
    
    ' 4. Draw Forged Axle Center Point References
    ' Parameters mapping: Center X, Y, Z, Perimeter Boundary X, Y, Z
    Dim skAxleCircle As Object
    Set skAxleCircle = swSketchMgr.CreateCircle(0#, 0#, 0#, 0.025, 0#, 0#) ' Central axle shaft
    
    Dim skHubInterface As Object
    Set skHubInterface = swSketchMgr.CreateCircle(0#, 0#, 0#, 0.08, 0#, 0#)  ' Main torque distribution hub
    
    ' 5. Loop for Parametric Spoke and Pot Array Generation
    Dim index As Integer
    Dim theta As Double
    Dim xTerminal As Double
    Dim yTerminal As Double
    
    For index = 0 To (TotalPots - 1)
        theta = (index / TotalPots) * 2 * PI
        
        ' Compute distinct absolute node termination targets
        xTerminal = WheelRadius * Cos(theta)
        yTerminal = WheelRadius * Sin(theta)
        
        ' Draw mechanical connecting spokes lines
        Dim skSpokeLine As Object
        Set skSpokeLine = swSketchMgr.CreateLine(0#, 0#, 0#, xTerminal, yTerminal, 0#)
        
        ' Attach the monolithic catchment bucket primitives to the outer array links
        Dim skPotCircle As Object
        Set skPotCircle = swSketchMgr.CreateCircle(xTerminal, yTerminal, 0#, (xTerminal + PotRadius), yTerminal, 0#)
    Next index
    
    ' 6. Commit geometry matrices and trigger 3D rendering updates
    swSketchMgr.InsertSketch True
    swModel.ForceRebuild3 True
    
    MsgBox "Parametric Ghatiyantra configuration sketch generated successfully.", vbInformation, "System Complete"

End Sub
`;

  // 13. Operational Assembly Manual Text & Tolerances
  const ASSEMBLY_MANUAL_MD = `# PRODUCT SPECIFICATION & ENVIRONMENT MANIFEST
================================================================================
Document Classification: Patent-Grade Technical Manual & Operational Shell Code
Project Target: Belapokhori-Nexus System (Engineering-Graphic-Novel Portfolio App)
Workstation Coordinates: Salipur, Odisha, India
================================================================================

## 1. FULL OPERATIONAL ASSEMBLY MANUAL TEXT

### SECTION A: PHYSICAL SYSTEM OVERVIEW & TOLERANCES
The **Belapokhori-Nexus Project** mechanical core centers on a **Hydro-Kinetic Ghatiyantra Assembly** acting as the main kinetic power unit. This system interfaces with subterranean **under-riverbed siphon pipelines** and **solar-covered utility canal grids**.

#### Mechanical Dimensions & Component Tolerances:
1. **Central Forged Power Axle:** Length: 400.0 mm, Diameter: 50.0 mm ± 0.02 mm. Engineered from high-strength forged alloy steel to withstand continuous mechanical torsional stress from river currents.
2. **Drive Hub Interface:** Diameter: 160.0 mm ± 0.05 mm, thickness: 60.0 mm. Mounted centered along the Z horizontal axis at a layout distance of 170.0 mm from the primary bearing caps.
3. **Kinetic Spoke Wheel Array:** Structural sweep radius: 360.0 mm. Houses 12 programmatic spoke slots angled at exact 30.0° increments.
4. **Water Catchment Pot Nodes (Ghats):** 12 individual cast units, internal radius: 30.0 mm. Arranged along the outer wheel perimeter to maintain structural weight distribution and continuous flow balancing.

---

### SECTION B: STEP-BY-STEP MECHANICAL ASSEMBLY INTERFACE GATES

#### Step 1: Axle Core Alignment & Bearing Housing
* Clean the surfaces of the 50 mm forged central axle shaft core using standard solvent degreasers to remove storage oils.
* Press the structural dual-row roller bearings onto the left and right seating beds. Maintain an absolute tolerance clearance of 0.02 mm to prevent friction lock under dynamic load shifts.
* Slide the 160 mm torque-bearing drive hub into position along the shaft axis at the 170 mm center mark. Secure it firmly by driving high-tensile locking keys into the precision-cut keyways.

#### Step 2: Parametric Spoke Framework & Perimeter Pot Mounting
* Insert the 12 radial connecting structural spokes into the precision-milled hub slots. Check the angle of each spoke with an external digital protractor to verify it matches the exact 30.0° design layout.
* Bolt the 12 monolithic water catchment pot nodes onto the peripheral tips of the spokes using locking fasteners.
* Spin the wheel assembly manually on its bearings to verify concentric alignment. The perimeter tracking deviation must not exceed ± 0.5 mm across a full 360° turn.

#### Step 3: Gearbox Coupling & Alternator Interface Realignment
* Align the high-speed output side of the step-up gearbox casing with the central power axle. The gearbox ratio must be securely locked to match the local river's average flow velocity profile.
* Connect the output shaft of the gearbox to the rotor of the high-speed electromagnetic alternator.
* Shield all exposed wiring connections with sealed junction boxes. This protects the circuit lines from humidity along the riverbank and shields the system against monsoon rain spikes.

#### Step 4: Subterranean Siphon Connection & Gate Calibration
* Submerge the intake mouths of the under-riverbed siphon pipelines inside the riverbed-embedded ponds. Ensure the lines sit below the river's lowest summer navigation level (2.50 meters).
* Connect the discharge ends of the siphon network directly to the lower filter basins of the geometric stepwells.
* Calibrate the automated hydrostatic pressure check gates to operate continuously between the safe limits of 45.0 kPa and 165.0 kPa.

---

### SECTION C: TRANSLATED ASSEMBLY OVERVIEWS

#### ଓଡ଼ିଆ ଅନୁବାଦ (Odia Translation)
* **କେନ୍ଦ୍ରୀୟ ଶାଫ୍ଟ ଏବଂ ଚକ୍ର ସଂଯୋଗୀକରଣ (Step 1 & 2):** ପ୍ରଥମେ ୫୦ ମିଲିମିଟର ବିଶିଷ୍ଟ ମୁଖ୍ୟ ପାୱାର୍ ଏକ୍ସଲ୍ ଶାଫ୍ଟ୍କୁ ସଫା କରି ବେୟାରିଂ ହାଉସିଂ ଭିତରେ ସଠିକ୍ ଭାବେ ଫିଟ୍ କରନ୍ତୁ। ଏହାପରେ ୧୬୦ ମିଲିମିଟର ର ଡ୍ରାଇଭ୍ ହବ୍କୁ କେନ୍ଦ୍ର ବିନ୍ଦୁରେ କି-ୱେ (keyway) ସାହାଯ୍ୟରେ ଲକ୍ କରନ୍ତୁ। ଚକ୍ରର ଚାରିପାଖରେ ଥିବା ୧୨ଟି ଜ୍ୟାମିତିକ ସ୍ଲଟ୍ରେ ୩୦.୦ ଡିଗ୍ରୀ କୋଣରେ ୧୨ଟି ଜଳ-ଉଠା ପାତ୍ର (ଘଟ) କୁ ବୋଲ୍ଟ ଦ୍ୱାରା ଶକ୍ତ ଭାବେ ଆବଦ୍ଧ କରନ୍ତୁ, ଯେପରି ଚକ୍ରଟି ନଦୀ ସ୍ରୋତରେ ସହଜରେ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଘୂରିପାରିବ।
* **ଗିଅରବକ୍ସ ଏବଂ ସାଇଫନ୍ ସଂଯୋଗ (Step 3 & 4):** ଘଟୀଯନ୍ତ୍ରର ମୁଖ୍ୟ ଅକ୍ଷକୁ ୨୨୦ ମିଲିମିଟର ର ସ୍ପେଡ୍-ଅପ୍ ଗିଅରବକ୍ସ ଏବଂ ୨ND ଷ୍ଟେଜ୍ ଆଲଟରନେଟର ଡାଇନାମୋ ସହିତ ସଂଯୁକ୍ତ କରନ୍ତୁ। ନଦୀ ତଳେ ଥିବା ସାଇଫନ୍ ପାଇପ୍କୁ ନଦୀ-ଶଯ୍ୟା-ପୋଖରୀ ଏବଂ ପାହାଚ-କୁଅର ହାଇଡ୍ରୋପୋନିକ୍ସ ବେଡ୍ ସହ ଯୋଡ଼ନ୍ତୁ, ଯାହାଦ୍ୱାରା ଜଳଦାବ ସ୍ୱୟଂଚାଳିତ ଭାବେ ନିୟନ୍ତ୍ରିତ ହୋଇ ରହିବ।

#### हिंदी अनुवाद (Hindi Translation)
* **केंद्रीय शाफ्ट और चक्र असेंबली (Step 1 & 2):** सबसे पहले 50mm व्यास के मुख्य पावर एक्सल शाफ्ट को साफ करके बेयरिंग हाउसिंग में स्थापित करें। इसके बाद 160mm के लोड-बेयरिंग ड्राइव हब को अक्ष के केंद्र में की-वे (keyway) द्वारा लॉक करें। चक्र की परिधि पर 12 रेडियल स्पोक्स को सटीक 30.0 डिग्री के अंतराल पर व्यवस्थित करें और 12 जल-उत्थापक पात्रों (घटों) को वोल्ट द्वारा कसें।
* **गियरबॉक्स और साइफन एकीकरण (Step 3 & 4):** घटीयंत्र के मुख्य अक्ष को 220mm के स्टेप-अप गियरबॉक्स हाउसिंग और हाई-स्पीड इलेक्ट्रोमैग्नेटिक अल्टरनेटर से जोड़ें। नदी के तल के नीचे स्थित साइफन पाइपलाइनों को नदी-शैया-पुष्करिणी (Embedded Ponds) और स्टेपवेल के हाइड्रोपोनिक्स फिल्टर बेड से जोड़ें, ताकि जलस्तर का संतुलन हमेशा बना रहे।
`;

  // 14. Automated Configuration & Deployment Shell Script (deploy_nexus_app.sh)
  const DEPLOY_NEXUS_SH = `#!/bin/bash
# ==============================================================================
# Project Belapokhori-Nexus: Automated Application Infrastructure Bootstrap Script
# Target Platform Deployment Configuration Engine Suite
# Workstation Run-Track Axis: Salipur, Odisha, India
# ==============================================================================

# Halt script instantly if any command throws an unhandled error state
set -e

log_status() {
    echo -e "\\n\\033[1;36m[B-NEXUS ENGINE INFRASTRUCTURE] \\$1\\033[0m"
}

log_status "Initiating zero-touch deployment script for Belapokhori-Nexus core application..."

# 1. Dependency Validation Checks
for component in git python3 docker; do
    if ! command -v \\$component &> /dev/null; then
        echo "[FATAL ENVIRONMENT FAULT] Necessary system dependency '\\$component' is missing from the host machine runtime path."
        exit 1
    fi
done

# 2. Re-verify Repository Layout Map Directories
log_status "Validating structural repository workspace directories map..."
mkdir -p app/models app/routes app/static/js app/static/mesh_exports app/templates hardware_cad/api_integrations hardware_cad/blueprints .github/workflows tests docs/specifications docs/i18n

# 3. Handle Python Requirements Configurations Setup
if [ ! -f requirements.txt ]; then
    log_status "Creating missing configuration dependencies stack file..."
    cat << EOF > requirements.txt
flask==3.0.2
sqlalchemy==2.0.28
psycopg2-binary==2.9.9
pytest==8.1.1
EOF
fi

# 4. Trigger Automatic Hydrology and Physics Engine Tests Passes
log_status "Bootstrapping continuous integration physics model validation check layers..."
if command -v pytest &> /dev/null && [ -f "tests/test_hydraulics.py" ]; then
    python3 -m pytest tests/ || { echo "[CRITICAL CORE ERROR] Physics unit boundary parameters evaluation failed. Aborting deployment pipeline."; exit 1; }
else
    echo "[SYSTEM ALERT] Pytest package runtime environment context or test targets missing. Bypassing check step."
fi

# 5. Build the Clean Multi-Stage Container Layer
log_status "Compiling optimized multi-stage production Docker image container layers..."
if [ -f Dockerfile ]; then
    docker build -t belapokhori-nexus-core:latest .
    log_status "Docker multi-stage final image assembled successfully: [belapokhori-nexus-core:latest]"
else
    echo "[BUILD ERROR] Dockerfile template manifest not discovered in workspace path root directory."
    exit 1
fi

# 6. Execute Live Infrastructure Instance Deployment
log_status "Spawning production simulation node container instance [nexus_running_twin] on port 5000..."
docker rm -f nexus_running_twin 2>/dev/null || true
docker run -d \\
  --name nexus_running_twin \\
  -p 5000:5000 \\
  --restart unless-stopped \\
  belapokhori-nexus-core:latest

log_status "=================================================================================="
log_status " DEPLOYMENT BLUEPRINT COMPLETION RUN SUCCESSFUL"
log_status " Interactive Branching Engineering-Graphic-Novel Twin Engine Node Live."
log_status " Telemetry Live Workspace Local URI Portal Link: http://localhost:5000"
log_status " System Node Execution Anchor Point Reference: Salipur, Odisha, India"
log_status "=================================================================================="
`;

  // 17. Core Project Overview & Installation Manifest (README.md)
  const README_MD = `# Belapokhori-Nexus Core Engine: 3D Simulation & Infrastructure Corridor App
================================================================================
**Project Title:** Patent-Grade Hydro-Ecological Simulation & Multi-Modal Transit Twin
**Target System:** Google AI Studio Engineering-Graphic-Novel Portfolio Framework
**Development Workstation Node:** Salipur, Odisha, India
================================================================================

## Project Architectural Overview
The **Belapokhori-Nexus Project** is a hyper-connected, patent-grade circular infrastructure model simulated digitally via an integrated Flask backend and WebGL/Three.js frontend. The core system architecture maps urban resource recovery networks against hydro-kinetic energy preservation loops to establish a completely closed, zero-waste system utility grid.

### Interconnected Structural Components
*   **Hydro-Kinetic Ghatiyantra Assembly:** A self-sustaining kinetic power wheel driven by river current velocity, configured programmatically to lift water into high-line aqueducts and spin an alternator.
*   **Subterranean Under-Riverbed Siphon Pipeline Net:** Hydrostatically balanced fluid conduits tracking depth requirements for smooth cargo vessel transit while preventing riverbed siltation.
*   **Solar-Covered Utility Canal Grids:** Mag-lev solar tracking canopies sealing the combined urban sewerage lines and lift-irrigation canals to stop evaporation and volatile odor emissions.
*   **Multi-Modal Transit Embankments:** Bank-parallel heavy freight dual-track railways and highways linking the open inland water highways directly with regional seaports and airports.
*   **Smart Urban Utility Loop:** Complete residential rooftop rainwater networks routing stormwater straight into the bank-flanked geometric stepwells to continuously recharge underground aquifers.

## Setup & Deployment Instructions

### Prerequisites
*   **Operating System:** Ubuntu Linux or similar POSIX workstation node.
*   **Container Runtime:** Docker Engine (Version 20.10+) & Docker Compose.
*   **Programming Environment:** Python 3.11+ (if executing bare-metal validation scripts).

### Zero-Touch Quickstart
To initialize the directory structures, run physics engine integrity unit tests, compile the multi-stage production container, and launch the real-time simulation panel with one command, execute:
\`\`\`bash
chmod +x deploy_nexus_app.sh
./deploy_nexus_app.sh
\`\`\`

## System Telemetry API Context
*   **WebGL Frontend Viewport Endpoint:** \`http://localhost:5000/\`
*   **Hydro-Kinetic Shaft Metrics Ingestion:** \`GET /api/v1/mesh/preview/<component_name>\`
*   **Hydraulic Boundary Logic Target File:** \`app/models/hydrology.py\`
`;

  // 18. Detailed Textual Assembly Manual (hardware_cad/blueprints/assembly_manual.txt)
  const ASSEMBLY_MANUAL_TXT = `================================================================================
DOCUMENT CODE: BN-MAN-2026-REV4
COMPONENTS SPECIFICATION MANUAL: SYSTEM MECHANICAL CORE ASSEMBLY
TOLERANCE PARAMETERS BINDINGS GRID // DESIGN DATA NODE: SALIPUR, ODISHA
================================================================================

1. CORE METRIC DIMENSIONS AND STRUCTURAL TOLERANCES
   - Central Forged Power Shaft Axle: Core Length = 400.0 mm; Diameter = 50.0 mm
     with a maximum tolerance deviation limit of ± 0.02 mm. Material formulation 
     must utilize high-tensile forged alloy steel to manage static torsional torque load.
   - Drive Hub Power Distribution Interface: Diameter = 160.0 mm ± 0.05 mm; 
     Thickness = 60.0 mm. Fixed horizontally along the shaft centerline at exactly 
     170.0 mm offset from primary bearing support journals.
   - Radial Spoke Wheel Matrix: Complete geometric sweep radius = 360.0 mm, 
     housing 12 precision spoke slots spaced at exact 30.0 degree angle configurations.
   - Water Catchment Pot Nodes (Ghats): 12 distinct monolithic cast units, 
     internal collection chamber radius = 30.0 mm. Mounted symmetrically along the 
     outer wheel rim perimeter to prevent dynamic weight balancing imbalances.

2. CASCADING MECHANICAL ASSEMBLY INTEGRATION SEQUENCING
   
   STEP A: CORE AXLE SETTING & HIGH-PRESSURE BEARING HOUSING
   - Clean the 50 mm forged power shaft axle surfaces with an organic degreasing 
     solvent to completely eliminate structural residue.
   - Press the dual-row roller bearing assemblies onto the precision seats on both ends. 
     Verify that the alignment clearance does not exceed 0.02 mm to prevent friction 
     locking during extreme dynamic shifts in river velocity.
   - Slide the 160 mm load-bearing drive hub onto the shaft axle up to the 170 mm 
     center tracking line. Secure the interface tightly by driving high-tensile 
     locking keys directly into the precision-cut keyways.

   STEP B: PARAMETRIC RADIAL FRAMEWORK & POT POSITIONING
   - Fit the 12 radial connecting structural spokes into the precision-milled hub slots. 
     Use a digital protractor tool to check that each spoke fits precisely at the 
     30.0-degree design mark.
   - Secure the 12 monolithic water catchment pots onto the peripheral tips of the spokes 
     using high-torque locking fasteners.
   - Manually spin the completed wheel assembly to inspect concentric movement. 
     The perimeter tracking deviation must not exceed ±0.5 mm across a full 360-degree rotation.

   STEP C: GEARBOX COUPLING & ALTERNATOR BRIDGE INTEGRATION
   - Align the primary input shaft of the 220 mm step-up gearbox casing with the 
     forged central power axle. The internal gear ratio must match local fluid speeds.
   - Bolt the gearbox high-speed output shaft directly to the internal rotor of the 
     high-speed electromagnetic alternator system.
   - Enclose all wiring connections inside weather-sealed junction boxes to protect the 
     circuits from high humidity along the riverbank and sudden monsoon rain shocks.

   STEP D: SUBTERRANEAN SIPHON CONNECTION & PRESSURE CELL CALIBRATION
   - Submerge the open intake openings of the under-riverbed siphon pipelines inside the 
     deep dredged riverbed-embedded ponds. Ensure intake lines sit below the 2.50-meter 
     minimum navigation depth limit.
   - Pipe the output ends of the siphon network directly into the bottom filter basins 
     of the left and right bank geometric stepwells.
   - Calibrate the automated hydrostatic pressure check gates to operate continuously 
     between the safe limits of 45.0 kPa and 165.0 kPa.

3. TRANSLATED OPERATIONAL SUMMARIES (बहुभाषी तकनीकी सारांश)

   ଓଡ଼ିଆ ସଂକ୍ଷିପ୍ତ ନିର୍ଦ୍ଦେଶାବଳୀ (Odia System Summary):
   - ପ୍ରଥମେ ୫୦ ମିଲିମିଟର ବିଶିଷ୍ଟ ମୁଖ୍ୟ ପାୱାର୍ ଏକ୍ସଲ୍ ଶାଫ୍ଟକୁ ସଫା କରି ବେୟାରିଂ ହାଉସିଂରେ ଫିଟ୍ କରନ୍ତୁ ଏବଂ ୧୬୦ ମିଲିମିଟର ର ଡ୍ରାଇଭ୍ ହବ୍ କୁ କେନ୍ଦ୍ର ବିନ୍ଦୁରେ ଲକ୍ କରନ୍ତୁ। ଚକ୍ରର ଚାରିପାଖରେ ଥିବା ୧୨ଟି ଜ୍ୟାମିତିକ ସ୍ଲଟ୍ ରେ ୩୦.୦ ଡିଗ୍ରୀ କୋଣରେ ୧୨ଟି ଜଳ-ଉଠା ପାତ୍ର (ଘଟ) କୁ ଶକ୍ତ ଭାବେ ଆବଦ୍ଧ କରନ୍ତୁ।
   - ଘଟୀଯନ୍ତ୍ରର ମୁଖ୍ୟ ଅକ୍ଷକୁ ୨୨୦ ମିଲିମିଟର ର ସ୍ପେଡ୍-ଅପ୍ ଗିଅରବକ୍ସ ଏବଂ ଆଲଟରନେଟର ଡାଇନାମୋ ସହିତ ସଂଯୁକ୍ତ କରନ୍ତୁ। ନଦୀ ତଳେ ଥିବା ସାଇଫନ୍ ପାଇପ୍ କୁ ନଦୀ-ଶଯ୍ୟା-ପୋଖରୀ ଏବଂ ପାହାଚ-କୁଅର ହାଇଡ୍ରୋପୋନିକ୍ସ ବେଡ୍ ସହ ଯୋଡ଼ନ୍ତୁ।

   हिंदी संक्षिप्त निर्देश (Hindi System Summary):
   - सर्वप्रथम 50mm व्यास के मुख्य पावर एक्सल शाफ्ट को साफ करके बेयरिंग हाउसिंग में स्थापित करें। इसके बाद 160mm के लोड-बेयरिंग ड्राइव हब को अक्ष के केंद्र में लॉक करें। चक्र की परिधि पर 12 रेडियल स्पोक्स को सटीक 30.0 डिग्री के अंतराल पर व्यवस्थित करें और 12 जल-उत्थापक पात्रों (घटों) को कसें।
   - घटीयंत्र के मुख्य अक्ष को 220mm के स्टेप-अप गियरबॉक्स हाउसिंग और हाई-स्पीड अल्टरनेटर से जोड़ें। नदी के तल के नीचे स्थित साइफन पाइपलाइनों को नदी-शैया-पुष्करिणी (Embedded Ponds) और स्टेपवेल के हाइड्रोपोनिक्स फिल्टर बेड से जोड़ें।
`;

  // 15. Comprehensive Hydraulic Validation Test Suite (tests/test_hydraulics.py)
  const TEST_HYDRAULICS_PY = `# Project Belapokhori-Nexus: Automated Physics Engine Testing Suite
# Component Path: tests/test_hydraulics.py
# Verification Target: Siphon Loop, Channel Stability, and Siltation Bounds

import pytest
import math
from app.models.hydrology import SiphonValidationEngine

@pytest.fixture
def validation_engine():
    return SiphonValidationEngine()

def test_nominal_flow_hydrostatic_equilibrium(validation_engine):
    """Verifies that optimal working pressures return a STABLE status."""
    nominal_payload = 125.0  # kPa nominal pressure
    result = validation_engine.verify_pipeline_pressure(nominal_payload)
    
    assert result["status"] == "STABLE"
    assert result["code"] == "OPTIMAL_NOMINAL_FLOW"

def test_siltation_hazard_boundary_limit(validation_engine):
    """Ensures a critical low flow pressure accurately flags a low velocity silt hazard."""
    low_pressure_payload = 35.0  # kPa drops below the 45.0 kPa threshold
    result = validation_engine.verify_pipeline_pressure(low_pressure_payload)
    
    assert result["status"] == "CRITICAL_ERROR"
    assert result["code"] == "SILTATION_HAZARD_LOW_FLOW"
    assert "silt" in result["message"].lower()

def test_pressure_overload_structural_breach(validation_engine):
    """Validates that monsoon overflow pressure shocks trigger the safety emergency shutdown routine."""
    catastrophic_payload = 295.0  # kPa breaches the 280.0 kPa ceiling
    result = validation_engine.verify_pipeline_pressure(catastrophic_payload)
    
    assert result["status"] == "CRITICAL_ERROR"
    assert result["code"] == "PRESSURE_OVERLOAD_BREACH"

def test_siphon_velocity_head_balance():
    """
    Validates fluid velocity using the Torricelli-Bernoulli energy statement.
    Verifies that the velocity cleanly clears the minimum fluid drag bounds.
    """
    delta_z = 2.5   # 2.5 meters operating head depth
    g = 9.81        # Acceleration due to gravity (m/s^2)
    f = 0.02        # Darcy friction coefficient for unlined concrete channels
    L = 45.0        # 45 meters under-riverbed pipeline loop length
    D = 0.6         # 600mm internal diameter configuration
    
    # Hydraulic energy losses summation equation
    total_loss_coefficient = 1 + (f * (L / D)) + 1.5
    calculated_velocity = math.sqrt((2 * g * delta_z) / total_loss_coefficient)
    
    # System safety bounds require velocity to remain above the silt drop limits
    assert calculated_velocity >= 0.6, f"Hydraulic stalling detected at velocity: {calculated_velocity} m/s"
`;

  // 16. AutoCAD Automated Drawing Commands Layer (autocad_interface.py)
  const AUTOCAD_INTERFACE_PY = `# Project Belapokhori-Nexus: Automated CAD Layer Generation Interface
# Component Path: hardware_cad/api_integrations/autocad_interface.py
# Developer Core Axis: Salipur, Odisha, India

import win32com.client
import math
import sys

def execute_automated_drawing_sequence():
    print("[SYSTEM LOG] Connecting to active AutoCAD desktop engine instance...")
    try:
        # Establish direct COM bridge link to the AutoCAD application layer
        acad = win32com.client.Dispatch("AutoCAD.Application")
        acad.Visible = True
        doc = acad.ActiveDocument
        model_space = doc.ModelSpace
        
        # 1. Structural Layer Space Infrastructure Setup
        layers = doc.Layers
        
        layer_shaft = layers.Add("NEXUS_SHAFT_CORE")
        layer_shaft.color = 7  # White / Iron Slate
        
        layer_buckets = layers.Add("NEXUS_KINETIC_BUCKETS")
        layer_buckets.color = 3  # Emerald Green
        
        # 2. Programmatically Draft Central Forged Axis
        doc.ActiveLayer = layer_shaft
        origin = win32com.client.VARIANT(win32com.styled_array_type, [0.0, 0.0, 0.0])
        
        model_space.AddCircle(origin, 25.0)  # 50mm diameter central power axle shaft
        model_space.AddCircle(origin, 80.0)  # 160mm load-bearing drive hub interface
        
        # 3. Parametric Loop for 12 Concentric Water-Lifting Units
        doc.ActiveLayer = layer_buckets
        total_paddles = 12
        perimeter_radius = 360.0  # 360mm wheel sweep radius
        
        for index in range(total_paddles):
            theta = (index / total_paddles) * 2 * math.PI
            
            x_terminal = perimeter_radius * math.cos(theta)
            y_terminal = perimeter_radius * math.sin(theta)
            
            start_coord = win32com.client.VARIANT(win32com.styled_array_type, [0.0, 0.0, 0.0])
            end_coord = win32com.client.VARIANT(win32com.styled_array_type, [x_terminal, y_terminal, 0.0])
            
            # Lay down radial kinetic spoke lines
            model_space.AddLine(start_coord, end_coord)
            
            # Place water-lifting pot geometry at the peripheral end points
            bucket_center = win32com.client.VARIANT(win32com.styled_array_type, [x_terminal, y_terminal, 0.0])
            model_space.AddCircle(bucket_center, 30.0)
            
        doc.Utility.Prompt("Nexus-Ghatiyantra mechanical layer configurations compiled successfully.\\n")
        print("[SYSTEM LOG] AutoCAD layout population sequence complete.")
        
    except Exception as error_payload:
        print(f"[FATAL EXCEPTION] Failed to drive AutoCAD API layer: {str(error_payload)}")
        sys.exit(1)

if __name__ == "__main__":
    execute_automated_drawing_sequence()
`;

  const getFilePath = () => {
    switch (activeFile) {
      case 'readme': return 'README.md';
      case 'assembly_manual_txt': return 'hardware_cad/blueprints/assembly_manual.txt';
      case 'assembly_manual': return 'docs/specifications/operational_assembly_manual.md';
      case 'deploy_sh': return 'deploy_nexus_app.sh';
      case 'test_hydraulics': return 'tests/test_hydraulics.py';
      case 'autocad_interface': return 'hardware_cad/api_integrations/autocad_interface.py';
      case 'simulation_py': return 'app/routes/simulation.py';
      case 'solidworks_parametric': return 'hardware_cad/macros/solidworks_parametric.bas';
      case 'mesh_exporter': return 'hardware_cad/api_integrations/mesh_exporter.py';
      case 'gcode_parser': return 'hardware_cad/api_integrations/gcode_parser.py';
      case 'autocad': return 'hardware_cad/scripts/autocad_commands.py';
      case 'solidworks': return 'hardware_cad/macros/solidworks_layout.bas';
      case 'metrics_js': return 'app/static/js/metrics_panel.js';
      case 'hydrology_py': return 'app/models/hydrology.py';
      case 'manifest_i18n': return 'docs/i18n/odia_hindi_engineering_manifest.md';
      case 'stl_obj_py': return 'hardware_cad/api_integrations/export_cad_to_stl_obj.py';
      case 'gcode': return 'manufacturing/nexus_toolpaths.nc';
      case 'docker': return 'Dockerfile';
      case 'sql': return 'database/postgresql_schema.sql';
      case 'cicd': return '.github/workflows/ci_cd.yml';
      default: return 'README.md';
    }
  };

  const getCode = () => {
    switch (activeFile) {
      case 'readme': return README_MD;
      case 'assembly_manual_txt': return ASSEMBLY_MANUAL_TXT;
      case 'assembly_manual': return ASSEMBLY_MANUAL_MD;
      case 'deploy_sh': return DEPLOY_NEXUS_SH;
      case 'test_hydraulics': return TEST_HYDRAULICS_PY;
      case 'autocad_interface': return AUTOCAD_INTERFACE_PY;
      case 'simulation_py': return SIMULATION_PY;
      case 'solidworks_parametric': return SOLIDWORKS_PARAMETRIC_BAS;
      case 'mesh_exporter': return MESH_EXPORTER_PY;
      case 'gcode_parser': return GCODE_PARSER_PY;
      case 'autocad': return AUTOCAD_COMMANDS_PY;
      case 'solidworks': return SOLIDWORKS_LAYOUT_BAS;
      case 'metrics_js': return METRICS_PANEL_JS;
      case 'hydrology_py': return HYDROLOGY_PY_CODE;
      case 'manifest_i18n': return MANIFEST_ODIA_HINDI;
      case 'stl_obj_py': return STL_OBJ_PY_CODE;
      case 'gcode': return GCODE_FILE;
      case 'docker': return DOCKERFILE_TEMPLATE;
      case 'sql': return SQL_DDL_CODE;
      case 'cicd': return CI_CD_YML;
      default: return README_MD;
    }
  };

  const handleDownloadActiveFile = () => {
    sound.playPageClick();
    haptics.clueUnlock();
    const content = getCode();
    const path = getFilePath();
    const filename = path.split('/').pop() || 'script.txt';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(filename);
    sound.playClueChime();
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleCopy = () => {
    sound.playPageClick();
    haptics.light();
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload3DFile = (format: 'stl' | 'obj') => {
    sound.playPageClick();
    haptics.clueUnlock();
    let content = '';
    let filename = '';

    if (format === 'obj') {
      filename = 'ghatiyantra_kinetic_system_salipur.obj';
      content = `# Belapokhori-Nexus: Ghatiyantra Kinetic Conversion System\n# Salipur Axis Grid (Odisha)\no Ghatiyantra_Core\n`;
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * 2 * Math.PI;
        const x = (360 * Math.cos(angle)).toFixed(3);
        const y = (360 * Math.sin(angle)).toFixed(3);
        content += `v ${x} ${y} 0.000\nv ${x} ${y} 50.000\n`;
      }
      content += `f 1 2 4 3\nf 3 4 6 5\nf 5 6 8 7\nf 7 8 10 9\nf 9 10 12 11\nf 11 12 2 1\n`;
    } else {
      filename = 'ghatiyantra_kinetic_system_salipur.stl';
      content = `solid Ghatiyantra_Kinetic_System\n`;
      for (let i = 0; i < 12; i++) {
        const a1 = (i / 12) * 2 * Math.PI;
        const a2 = ((i + 1) / 12) * 2 * Math.PI;
        const x1 = (360 * Math.cos(a1)).toFixed(3);
        const y1 = (360 * Math.sin(a1)).toFixed(3);
        const x2 = (360 * Math.cos(a2)).toFixed(3);
        const y2 = (360 * Math.sin(a2)).toFixed(3);
        content += `  facet normal 0 0 1\n    outer loop\n      vertex 0 0 0\n      vertex ${x1} ${y1} 0\n      vertex ${x2} ${y2} 0\n    endloop\n  endfacet\n`;
      }
      content += `endsolid Ghatiyantra_Kinetic_System\n`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(filename);
    sound.playClueChime();
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#03060f] text-slate-100 overflow-y-auto pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            Salipur Engineering & CAD Pipeline
          </span>
          <h2 className="text-base font-heading tracking-wide text-white leading-tight">
            Ghatiyantra Automation Scripts
          </h2>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={handleDownloadActiveFile}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold transition-all shadow-md active:scale-95 font-mono"
            title={`Download active file: ${getFilePath().split('/').pop()}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Script</span>
          </button>

          <button
            onClick={() => handleDownload3DFile('stl')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95"
            title="Download 3D STL file for 3D Printing / CNC"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.STL</span>
          </button>

          <button
            onClick={() => handleDownload3DFile('obj')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95"
            title="Download 3D OBJ file for CAD / Blender"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.OBJ</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Spatial Location Indicator Callout */}
      <div className="mx-3 mt-3 p-3.5 rounded-xl border border-cyan-500/40 bg-slate-950/90 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-1">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>Immediate Bankline Position & Dual Sewerage Coupling</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The <strong>Ghatiyantra</strong> is anchored on the <strong>immediate bank line on the far left</strong> where the inland waterway meets the land infrastructure. It extracts momentum from both the open waterway flow and underground <strong>combined urban sewerage outfalls</strong>, lifting water while mitigating bank erosion.
        </p>
      </div>

      {downloadSuccess && (
        <div className="mx-3 mt-2 p-2.5 rounded-lg bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs font-mono flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Exported repository artifact: {downloadSuccess}</span>
        </div>
      )}

      {/* File Selector Tabs */}
      <div className="px-4 py-2 mt-2 bg-slate-900/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'readme', label: 'README.md (Manifest)', icon: BookOpen },
          { id: 'assembly_manual_txt', label: 'assembly_manual.txt (REV4)', icon: FileCode },
          { id: 'deploy_sh', label: 'deploy_nexus_app.sh', icon: Terminal },
          { id: 'test_hydraulics', label: 'test_hydraulics.py (Pytest)', icon: ShieldCheck },
          { id: 'autocad_interface', label: 'autocad_interface.py (COM)', icon: FileCode },
          { id: 'solidworks', label: 'solidworks_layout.bas', icon: Terminal },
          { id: 'solidworks_parametric', label: 'solidworks_parametric.bas', icon: Box },
          { id: 'assembly_manual', label: 'operational_assembly_manual.md', icon: BookOpen },
          { id: 'simulation_py', label: 'simulation.py (WebGL Mesh)', icon: Eye },
          { id: 'mesh_exporter', label: 'mesh_exporter.py (OBJ/STL)', icon: Package },
          { id: 'gcode_parser', label: 'gcode_parser.py (CNC)', icon: Cpu },
          { id: 'manifest_i18n', label: 'ଓଡ଼ିଆ / हिंदी Patent Manifest', icon: Globe2 },
          { id: 'autocad', label: 'autocad_commands.py', icon: FileCode },
          { id: 'cicd', label: 'ci_cd_pipeline.yml (Actions)', icon: GitBranch },
          { id: 'metrics_js', label: 'metrics_panel.js', icon: LineChart },
          { id: 'hydrology_py', label: 'hydrology.py (Siphon)', icon: Droplet },
          { id: 'gcode', label: 'nexus_toolpaths.nc', icon: Cpu },
          { id: 'docker', label: 'Dockerfile', icon: Container },
          { id: 'sql', label: 'postgresql_schema.sql', icon: Database },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeFile === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPageClick();
                haptics.light();
                setActiveFile(tab.id as typeof activeFile);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Code / Translation Viewer */}
      <div className="p-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="px-3.5 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>REPOSITORY // {getFilePath()}</span>
            <span className="text-cyan-400 uppercase font-semibold">Salipur Verified</span>
          </div>

          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[520px] select-text">
            <code>{getCode()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
