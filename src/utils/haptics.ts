/**
 * Project Belapokhori-Nexus: Haptic Feedback Engine
 * Utilizes the browser Vibration API to deliver subtle, tactile feedback on mobile devices
 * with graceful fallback for non-supporting devices and desktop browsers.
 */

export type HapticType = 
  | 'light' 
  | 'medium' 
  | 'heavy' 
  | 'success' 
  | 'warning' 
  | 'clueUnlock' 
  | 'ancientPulse' 
  | 'digitalTwinTick'
  | 'siphonFlow';

class HapticEngine {
  private isSupported: boolean;
  public enabled: boolean = true;

  constructor() {
    this.isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }

  /**
   * Core vibration trigger
   */
  public vibrate(pattern: number | number[]): boolean {
    if (!this.enabled || !this.isSupported) return false;
    try {
      return navigator.vibrate(pattern);
    } catch {
      return false;
    }
  }

  /**
   * Subtle touch for button taps & tab switches (12ms)
   */
  public light(): boolean {
    return this.vibrate(12);
  }

  /**
   * Medium feedback for state transitions & slider notches (28ms)
   */
  public medium(): boolean {
    return this.vibrate(28);
  }

  /**
   * Firm feedback for warnings, silt alerts, and valve releases (55ms)
   */
  public heavy(): boolean {
    return this.vibrate(55);
  }

  /**
   * Celebratory multi-pulse when discovering / unlocking a historical clue
   * Pattern: 40ms pulse, 50ms pause, 30ms pulse, 50ms pause, 60ms pulse
   */
  public clueUnlock(): boolean {
    return this.vibrate([40, 50, 30, 50, 60]);
  }

  /**
   * Low-frequency rhythmic pulse when Chrono-Lens or 174 Hz stepwell resonance activates
   * Pattern: [20, 80, 35, 70, 50]
   */
  public ancientPulse(): boolean {
    return this.vibrate([20, 80, 35, 70, 50]);
  }

  /**
   * Rapid micro-tick when dragging the 3D Digital Twin or tuning RPM
   */
  public digitalTwinTick(): boolean {
    return this.vibrate(8);
  }

  /**
   * Hydrodynamic cavitation / siphon flow sensation
   */
  public siphonFlow(): boolean {
    return this.vibrate([15, 30, 15, 30, 20]);
  }

  /**
   * Success chime feedback
   */
  public success(): boolean {
    return this.vibrate([30, 40, 45]);
  }

  /**
   * Check if Vibration API is available on current client
   */
  public checkSupport(): boolean {
    return this.isSupported;
  }
}

export const haptics = new HapticEngine();

/**
 * React Hook for component haptic interactions
 */
export function useHaptics() {
  return {
    triggerHaptic: (type: HapticType) => {
      switch (type) {
        case 'light': return haptics.light();
        case 'medium': return haptics.medium();
        case 'heavy': return haptics.heavy();
        case 'clueUnlock': return haptics.clueUnlock();
        case 'ancientPulse': return haptics.ancientPulse();
        case 'digitalTwinTick': return haptics.digitalTwinTick();
        case 'siphonFlow': return haptics.siphonFlow();
        case 'success': return haptics.success();
        case 'warning': return haptics.heavy();
        default: return haptics.light();
      }
    },
    hapticsEnabled: haptics.enabled,
    toggleHaptics: () => {
      haptics.enabled = !haptics.enabled;
      if (haptics.enabled) haptics.light();
      return haptics.enabled;
    },
    isSupported: haptics.checkSupport()
  };
}
