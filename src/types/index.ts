export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string; // SVG or color accent
  badgeColor: string;
}

export interface SpeechBubble {
  id: string;
  characterId: string;
  text: string;
  position: 'left' | 'right' | 'center';
  thought?: boolean;
  shout?: boolean;
}

export interface SoundEffect {
  text: string;
  x: string; // e.g. "top-4 right-8"
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface InteractiveClueTrigger {
  id: string;
  name: string;
  prompt: string;
  unlockedMessage: string;
  clueId: string;
  type: 'tap' | 'wipe' | 'align' | 'lens';
  resolved?: boolean;
}

export interface NovelPanel {
  id: string;
  sceneTitle: string;
  timeCode: string;
  ambientSound?: 'maglev' | 'water' | 'ancient' | 'alarm';
  layers: {
    background: string; // CSS gradient or SVG pattern
    midground?: string;
    foreground?: string;
  };
  narration?: string;
  dialogue?: SpeechBubble[];
  sfx?: SoundEffect[];
  interactiveClue?: InteractiveClueTrigger;
  hasChronoLens?: boolean;
  ancientLayerDescription?: string;
  schematicNodeId?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  location: string;
  summary: string;
  panels: NovelPanel[];
}

export interface SchematicNode {
  id: string;
  name: string;
  category: 'surface' | 'subterranean' | 'ancient' | 'energy';
  xPercent: number; // For isometric diagram positioning
  yPercent: number;
  shortDesc: string;
  surfaceTech: string;
  ancientSecret: string;
  loreQuote: string;
  specifications: { label: string; value: string }[];
  clueId?: string;
}

export interface ClueItem {
  id: string;
  title: string;
  era: string;
  category: 'Artifact' | 'Telemetry' | 'Blueprint' | 'Specimen';
  description: string;
  deductionNote: string;
  iconName: string;
  unlocked: boolean;
  cipherCode?: string;
}
