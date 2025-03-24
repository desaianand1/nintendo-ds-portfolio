# 3D Interactive Nintendo DS Lite Portfolio - Technical Project Brief

## Project Overview

This document outlines the technical and functional requirements for developing an interactive 3D web application that serves as a personal portfolio. The application will feature a 3D model of a Nintendo DS Lite that users can interact with (opening the lid, powering on) and use to navigate portfolio sections through an authentic DS menu interface. Additionally, the application will incorporate a Nintendo DS emulator allowing users to upload and play DS game ROMs.

## Technology Stack

- **Framework**: SvelteKit 5 with the new runes syntax
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Build Tool**: Vite
- **3D Rendering**: Threlte 8 (Svelte 5 compatible version)
- **Emulation**: DeSmuME WASM (from <https://github.com/44670/desmume-wasm>)

## Functional Requirements

### 1. 3D Model Display and Interaction

#### 1.1 Model Loading

- Load the provided Nintendo DS Lite 3D model (.glb format) that has been optimized through the @threlte/gltf model pipeline
- Ensure proper lighting and materials are applied to maintain visual fidelity
- Position the model centrally on initial load in a closed, powered-off state

#### 1.2 Interactive Animations

- Implement user-triggered animations for:
  - Opening/closing the DS lid (using the provided bone animations)
  - Sliding the power switch to turn the device on/off
- Add tooltips as instruction bubbles to guide users after a brief delay
- Ensure animations are smooth and realistic, matching the physical behavior of a DS Lite

#### 1.3 Camera Controls

- Implement intuitive camera controls to allow users to:
  - Rotate around the 3D model
  - Zoom in/out
  - Reset to default view
- Ensure camera movements are smooth and do not cause performance issues

### 2. DS Interface and Portfolio Integration

#### 2.1 Boot Animation

- Display the provided Nintendo DS Lite startup animation (video format) on the DS screen after the power-on animation is triggered
- Ensure the animation plays only once per session unless the device is turned off and on again

#### 2.2 Home Menu UI

- Recreate an authentic Nintendo DS Lite home menu UI
- Implement the UI as an HTML overlay positioned precisely over the 3D model's screens
- Ensure the UI is fully interactive and responds to user input
- Use DOM elements for better performance, accessibility, and interaction capabilities

#### 2.3 Portfolio Sections

- Customize the DS menu to include the following portfolio sections:
  - Social links
  - Projects
  - About
  - Blog
  - Resume
- Ensure each section is accessible through the DS menu interface
- Note: The actual content pages for these sections are outside the scope of this project

### 3. ROM Emulation Functionality

#### 3.1 ROM Upload

- Implement file upload functionality via file picker (priority)
- Add drag-and-drop functionality for ROM files (nice-to-have feature)
- Support for DS and DSi ROM formats only
- Validate uploaded files to ensure they are valid ROM formats

#### 3.2 ROM Display and Selection

- Display uploaded ROMs as icons in the DS menu UI, mimicking authentic DS behavior
- Allow users to select ROMs through the DS interface

#### 3.3 Emulation

- Integrate the DeSmuME WASM emulator to run uploaded ROMs
- Display the emulated game on the DS screens
- Implement on-screen touch controls for game interaction (priority)
- Add keyboard bindings for game controls (nice-to-have feature)

#### 3.4 Save States

- Implement save state functionality using the web application's local storage
- Follow the same approach as the DeSmuME WASM project:

  ```txt
  Just save in the game and wait a few seconds. An auto-saving banner will appear, 
  and your saved data will automatically be stored in the web app's local storage.
  ```

- Add appropriate notifications about save state limitations on different platforms

## Non-Functional Requirements

### 1. Performance

#### 1.1 Rendering Performance

- Optimize 3D rendering to maintain a consistent frame rate (target: 60fps on desktop)
- Implement level-of-detail strategies if necessary
- Follow Threlte 8 and Svelte 5 best practices for optimal performance

#### 1.2 Load Time Optimization

- Implement asset preloading for critical resources
- Use lazy loading for non-critical assets
- Implement proper caching strategies for static assets

#### 1.3 Emulation Performance

- Monitor and optimize integration with the DeSmuME WASM emulator
- Implement performance monitoring and throttling if necessary

### 2. Responsiveness

#### 2.1 Device Compatibility

- Ensure the application works on desktop browsers (primary target)
- Implement responsive design for various screen sizes
- Provide a scaled-down experience for mobile devices
- Display a disclaimer that the experience is best viewed on desktop or large screens

### 3. Accessibility

#### 3.1 Keyboard Navigation

- Implement keyboard controls for navigating the 3D environment
- Ensure all interactive elements are accessible via keyboard

#### 3.2 Dark Mode

- Implement dark mode support for the application interface
- Maintain appropriate contrast ratios in both light and dark modes

### 4. Browser Compatibility

#### 4.1 Supported Browsers

- Ensure compatibility with modern browsers:
  - Chrome (latest 2 versions)
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
  - Edge (latest 2 versions)

#### 4.2 WebGL Support

- Implement fallback behavior for browsers with limited or no WebGL support
- Display appropriate messages for unsupported browsers

## Technical Architecture

### 1. Project Structure

```sh
project-root/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── 3d/
│   │   │   │   ├── DSLite.svelte
│   │   │   │   ├── Scene.svelte
│   │   │   │   └── Controls.svelte
│   │   │   ├── ui/
│   │   │   │   ├── DSMenu.svelte
│   │   │   │   ├── DSScreen.svelte
│   │   │   │   ├── ScreenOverlay.svelte
│   │   │   │   ├── Tooltips.svelte
│   │   │   │   └── EmulatorControls.svelte
│   │   │   └── common/
│   │   ├── stores/
│   │   │   ├── dsState.ts
│   │   │   └── emulatorState.ts
│   │   ├── utils/
│   │   │   ├── animation.ts
│   │   │   ├── emulator.ts
│   │   │   └── modelLoader.ts
│   │   └── assets/
│   │       ├── models/
│   │       ├── textures/
│   │       └── animations/
│   ├── routes/
│   │   ├── +page.svelte
│   │   ├── +layout.svelte
│   │   └── +page.ts
│   └── app.html
├── static/
│   ├── desmume/
│   ├── favicon.ico
│   └── global.css
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

### 2. Component Architecture

#### 2.1 3D Components

- **Scene.svelte**: Main container for the 3D scene
- **DSLite.svelte**: Component handling the DS Lite model and its animations
- **Controls.svelte**: Component for camera controls and user interactions

#### 2.2 UI Components

- **DSMenu.svelte**: HTML overlay component recreating the DS menu interface
- **DSScreen.svelte**: Component handling screen positioning and overlay coordination
- **Tooltips.svelte**: Component for displaying instruction tooltips
- **EmulatorControls.svelte**: Component for emulator touch controls

#### 2.3 State Management

- Use Svelte 5 runes for reactive state management
- Implement stores for:
  - DS state (open/closed, powered on/off)
  - Emulator state (loaded ROMs, active game, save states)

### 3. Integration Points

#### 3.1 Threlte and 3D Model

- Use Threlte 8 components to load and display the 3D model
- Implement custom interaction handlers for the model
- Track 3D screen positions for proper HTML overlay alignment

#### 3.2 HTML Overlay and 3D Integration

- Implement a screen position tracking system to map 3D coordinates to DOM positions
- Use CSS transforms and positioning to align HTML overlay with 3D model screens
- Maintain alignment during camera movements and model animations

#### 3.3 Emulator Integration

- Load the DeSmuME WASM library asynchronously
- Implement interface adapters for communication between the application and emulator
- Handle ROM loading and processing

## Implementation Approach

### 1. Development Phases

#### Phase 1: Setup and Basic 3D Implementation

- Set up SvelteKit 5 project with TypeScript and TailwindCSS
- Configure Threlte 8 integration
- Implement basic 3D scene with DS Lite model loading
- Implement camera controls

#### Phase 2: DS Animation and Interaction

- Implement lid opening/closing animation
- Implement power switch animation
- Add tooltips for user guidance

#### Phase 3: DS UI Implementation

- Implement DS boot animation playback
- Create authentic DS menu interface as HTML overlay
- Develop screen position tracking system for overlay alignment
- Integrate portfolio section links
- Ensure overlay remains aligned during camera movement and animations

#### Phase 4: Emulator Integration

- Integrate DeSmuME WASM emulator
- Implement ROM upload functionality
- Implement ROM display in DS menu
- Add emulator controls

#### Phase 5: Performance Optimization and Polishing

- Optimize 3D rendering
- Implement responsive design adaptations
- Add accessibility features
- Test and fix browser compatibility issues

### 2. Testing Strategy

#### 2.1 Functional Testing

- Test all user interactions with the 3D model
- Test HTML overlay alignment across different viewport sizes and camera angles
- Test DS menu navigation
- Test ROM upload and emulation

#### 2.2 Performance Testing

- Monitor frame rates during animation and interaction
- Test loading times for initial page load
- Test emulator performance with various ROMs

#### 2.3 Compatibility Testing

- Test on different browsers and devices
- Test with various screen sizes and resolutions

## Technical Specifications and Constraints

### 1. 3D Model Specifications

- Format: GLB optimized through @threlte/gltf pipeline
- Contains articulated bones for lid and buttons
- Requires proper UV mapping for textures
- Need precise screen geometry for accurate HTML overlay positioning

### 2. Animation Requirements

- Lid opening range: 0 to approximately 120 degrees
- Power switch should slide horizontally
- Animations should match physical behavior of a real DS Lite

### 3. Emulator Constraints

- Support for DS and DSi ROM formats only
- Save states stored in local storage
- Performance dependent on user's device capabilities

### 4. Responsive Design Breakpoints

- Desktop: 1024px and above (primary target)
- Tablet: 768px to 1023px
- Mobile: below 768px (limited functionality with disclaimer)

## Future Enhancements (Outside Current Scope)

1. Keyboard bindings for emulator controls
2. Drag-and-drop functionality for ROM files
3. Network play capabilities
4. Extended emulator features (speed control, cheat codes)
5. Portfolio content pages
6. ROM library management

---

This technical brief outlines the requirements and approach for implementing an interactive 3D Nintendo DS Lite portfolio application. The implementation should focus on creating an engaging and authentic experience while maintaining performance and usability across devices.
