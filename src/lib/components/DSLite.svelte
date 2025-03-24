<script lang="ts">
  import { T } from '@threlte/core'
  import type { Group, Object3D, Vector3Tuple } from 'three'
  import NintendoDSLite from './models/nintendo-ds-lite.svelte'
  import { dsState } from '$lib/state/ds.svelte'
  
  type InteractionEvent = {
    type: 'lid' | 'power'
    value: boolean
  }
  
  // Props
  let { 
    position = [0, 0, 0] as Vector3Tuple, 
    rotation = [0, 0, 0] as Vector3Tuple, 
    scale = 1,
    onInteract = (event: InteractionEvent) => {}
  } = $props()
  
  // Model reference
  let modelRef = $state<Group | null>(null)
  let padBone: Object3D | null = null
  let triggerRBone: Object3D | null = null
  
  // Animation state
  let animationProgress = $state(0)
  const ANIMATION_DURATION = 1.0 // seconds
  let animationStartTime = $state(0)
  let animationActive = $state(false)
  
  // Lid angles (in radians)
  const LID_CLOSED_ANGLE = 0
  const LID_OPEN_ANGLE = (120 * Math.PI) / 180 // 120 degrees in radians
  
  // Interaction points
  const interactionPoints = {
    lid: {
      position: [0, 0.05, 0] as Vector3Tuple,
      size: [0.8, 0.05, 0.6] as [number, number, number],
      visible: false // Set to true for debugging
    },
    power: {
      position: [-0.4, 0.02, 0] as Vector3Tuple,
      size: [0.05, 0.02, 0.05] as [number, number, number],
      visible: false // Set to true for debugging
    }
  }
  
  // Once the model is loaded, get references to the bones
  $effect(() => {
    if (!modelRef) return
    
    // Find the bones we need to animate
    const foundPadBone = modelRef.getObjectByName('Pad_Bone')
    const foundTriggerBone = modelRef.getObjectByName('Trigger_R_Bone')
    
    if (foundPadBone) padBone = foundPadBone
    if (foundTriggerBone) triggerRBone = foundTriggerBone
    
    console.log('Model loaded, bones found:', { padBone, triggerRBone })
  })
  
  // Handle lid interaction
  function handleLidClick() {
    if (dsState.lidAnimating) return
    
    const newIsOpen = !dsState.isOpen
    dsState.lidAnimating = true
    
    // Start animation
    animationStartTime = performance.now()
    animationActive = true
    
    // Set target state
    const targetAngle = newIsOpen ? LID_OPEN_ANGLE : LID_CLOSED_ANGLE
    
    // Animation frame function
    function animate() {
      if (!animationActive) return
      
      const now = performance.now()
      const elapsed = (now - animationStartTime) / 1000 // convert to seconds
      
      if (elapsed >= ANIMATION_DURATION) {
        // Animation complete
        animationActive = false
        
        // Set final position
        if (padBone) {
          padBone.rotation.x = targetAngle
        }
        
        // Update state
        dsState.isOpen = newIsOpen
        dsState.lidAnimating = false
        
        // Call interaction callback
        onInteract({ 
          type: 'lid', 
          value: newIsOpen 
        })
        
        return
      }
      
      // Calculate progress with easing
      const progress = elapsed / ANIMATION_DURATION
      const easedProgress = easeInOutQuad(progress)
      
      // Calculate current angle
      const startAngle = newIsOpen ? LID_CLOSED_ANGLE : LID_OPEN_ANGLE
      const currentAngle = startAngle + (targetAngle - startAngle) * easedProgress
      
      // Apply rotation to the lid bone
      if (padBone) {
        padBone.rotation.x = currentAngle
      }
      
      // Continue animation
      requestAnimationFrame(animate)
    }
    
    // Start animation loop
    requestAnimationFrame(animate)
  }
  
  // Handle power interaction
  function handlePowerClick() {
    if (!dsState.isOpen) return
    
    const newIsPowered = !dsState.isPowered
    dsState.isPowered = newIsPowered
    
    // Animate power switch (if we have the bone)
    if (triggerRBone) {
      // Simple animation for power switch
      triggerRBone.position.x = newIsPowered ? 0.05 : 0
    }
    
    onInteract({ 
      type: 'power', 
      value: newIsPowered 
    })
  }
  
  // Easing function for smooth animation
  function easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  }
</script>

<T.Group position={position} rotation={rotation} scale={[scale, scale, scale]}>
  <!-- DS Lite model -->
  <NintendoDSLite 
    bind:ref={modelRef}
  />
  
  <!-- Lid interaction hitbox -->
  <T.Mesh 
    position={interactionPoints.lid.position}
    on:click={handleLidClick}
  >
    <T.BoxGeometry args={interactionPoints.lid.size} />
    <T.MeshBasicMaterial 
      color="red" 
      transparent={true}
      opacity={interactionPoints.lid.visible ? 0.5 : 0}
    />
  </T.Mesh>
  
  <!-- Power switch interaction hitbox -->
  <T.Mesh 
    position={interactionPoints.power.position}
    on:click={handlePowerClick}
  >
    <T.BoxGeometry args={interactionPoints.power.size} />
    <T.MeshBasicMaterial 
      color="blue" 
      transparent={true}
      opacity={interactionPoints.power.visible ? 0.5 : 0}
    />
  </T.Mesh>
</T.Group>
