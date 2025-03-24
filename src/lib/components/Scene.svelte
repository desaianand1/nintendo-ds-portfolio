<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, OrbitControls } from '@threlte/extras'
  import DSLite from './DSLite.svelte'
  import { dsState } from '$lib/state/ds.svelte'
  
  // Camera settings
  const cameraPosition = { x: 0, y: 1.5, z: 4 }
  const orbitControlsTarget = { x: 0, y: 1, z: 0 }
  
  // Lighting settings
  const mainLightIntensity = 1.5
  const ambientLightIntensity = 0.5
  
  // Handle model interaction
  function handleModelInteraction(event: { type: 'lid' | 'power', value: boolean }) {
    const { type, value } = event
    console.log(`Model interaction: ${type} - ${value}`)
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
  fov={35}
>
  <OrbitControls
    enableDamping
    dampingFactor={0.05}
    enableZoom={true}
    minDistance={2}
    maxDistance={10}
    enablePan={false}
    target={[orbitControlsTarget.x, orbitControlsTarget.y, orbitControlsTarget.z]}
  />
</T.PerspectiveCamera>

<!-- Main key light -->
<T.DirectionalLight
  intensity={mainLightIntensity}
  position={[5, 8, 5]}
  castShadow
  shadow-mapSize={[2048, 2048]}
>
  <T.OrthographicCamera
    attach="shadow-camera"
    args={[-5, 5, 5, -5, 0.1, 20]}
  />
</T.DirectionalLight>

<!-- Fill light -->
<T.DirectionalLight
  intensity={mainLightIntensity * 0.3}
  position={[-5, 3, -5]}
/>

<!-- Ambient light for overall scene brightness -->
<T.AmbientLight intensity={ambientLightIntensity} />

<!-- Ground shadow -->
<ContactShadows
  opacity={0.5}
  scale={10}
  blur={2}
  far={5}
  resolution={256}
  color="#000000"
/>

<!-- DS Lite model -->
<DSLite 
  position={[0, 1, 0]}
  scale={1}
  rotation={[0, 0, 0]}
  onInteract={handleModelInteraction}
/>
