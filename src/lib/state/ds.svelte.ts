// DS Lite state management using Svelte 5 runes
const dsState = $state({
  // Lid state
  isOpen: false,
  lidAnimating: false,
  lidAngle: 0,
  
  // Power state
  isPowered: false,
  
  // Screen content
  screenContent: null,
  
  // Current section
  currentSection: 'main'
})

// Derived values using $derived rune
const canPowerOn = $derived(dsState.isOpen && !dsState.isPowered)
const isScreenVisible = $derived(dsState.isOpen && dsState.isPowered)

// Export state
export { dsState }

// Export functions to access derived state
export function getCanPowerOn() {
  return canPowerOn
}

export function getIsScreenVisible() {
  return isScreenVisible
}
