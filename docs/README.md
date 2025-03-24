# 🎮 Nintendo DS Lite Portfolio

![License](https://img.shields.io/badge/license-Proprietary-red.svg)
![Framework](https://img.shields.io/badge/framework-SvelteKit%205-FF3E00)
![3D](https://img.shields.io/badge/3D-Threlte%208-44CC11)

> An interactive 3D web portfolio showcasing work through a nostalgic Nintendo DS Lite experience, complete with authentic animations and a functional emulator.

> [!NOTE]
> This portfolio combines modern web technologies with nostalgia to create a unique showcase of your work through an interactive Nintendo DS Lite interface.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [License](#-license)

## 🔍 Overview

This project reimagines the traditional web portfolio by creating an interactive 3D experience centered around the iconic Nintendo DS Lite. Users can interact with a detailed 3D model of the device, navigate through portfolio sections via an authentic DS menu interface, and even upload and play Nintendo DS ROMs through an integrated emulator.

The goal is to present a developer's portfolio in a unique, engaging way that demonstrates technical expertise while providing a nostalgic and intuitive interface.

## ✨ Features

### 3D Model & Interactions

- ⚡ Detailed Nintendo DS Lite 3D model
- 🔄 Realistic opening/closing animations
- 💡 Interactive power switch functionality
- 🎥 Intuitive camera controls for exploring the model

### Portfolio Integration

- 🚀 Authentic DS menu UI for portfolio navigation
- 🔗 Social links section
- 📂 Projects showcase
- 👤 About section
- 📝 Blog integration
- 📄 Resume display

### Emulator Functionality

- 📤 ROM upload capability
- 🎮 Integrated DeSmuME WASM emulator
- 💾 Save state functionality
- 🖐️ Touch controls for gameplay

### UI/UX Features

- 🌓 Dark mode support
- ⌨️ Keyboard navigation
- 📱 Responsive design (optimized for desktop)
- 🎯 Tooltips for guidance

## 🌐 Live Demo

> **Experience it live**: [Nintendo DS Lite Portfolio](https://ds-portfolio.example.com)
>
>
> [!TIP]
> For the best experience, use a desktop browser with WebGL support. The 3D features require hardware acceleration.

## 🛠️ Technology Stack

- **Framework**: [SvelteKit 5](https://kit.svelte.dev/) with runes syntax
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **3D Rendering**: [Threlte 8](https://threlte.xyz/) (Svelte 5 compatible version)
- **Emulation**: [DeSmuME WASM](https://github.com/44670/desmume-wasm)

## ⚙️ Installation

Want to run this locally? Follow these steps:

### Prerequisites

> [!IMPORTANT]
> This project requires the following tools and technologies:
>
> - Node.js 20+
> - pnpm (package manager)
> - Modern browser with WebGL 2.0 support

### Setup

```bash
# Clone the repository
git clone https://github.com/username/nintendo-ds-portfolio.git
cd nintendo-ds-portfolio

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The application will be available at `http://localhost:5173`.

## 🎯 Usage

### Interacting with the 3D Model

1. **Camera Controls**:
   - Click and drag to rotate the view
   - Mouse wheel to zoom in/out
   - Double-click to reset the view

2. **Device Interaction**:
   - Click on the lid to open/close the DS
   - Click on the power switch to turn on/off
   - When powered on, interact with the DS menu on the screens

### Portfolio Navigation

Once the DS is powered on, you'll see the custom menu interface:

- Navigate using the touch screen (click on the bottom screen)
- Access different sections from the menu icons
- Return to main menu by clicking the home button

### Using the Emulator

1. **ROM Upload**:
   - Select the "Games" icon in the DS menu
   - Click "Upload ROM" and select a Nintendo DS ROM file
   - Uploaded ROMs will appear as icons in the menu

2. **Playing Games**:
   - Click on a ROM icon to launch it
   - Use on-screen touch controls for gameplay
   - Game saves are stored automatically in your browser's local storage

> [!WARNING]
> This project only supports Nintendo DS and DSi ROM formats. You must legally own any ROMs you upload. The developers do not provide or endorse piracy of Nintendo games.

## 📄 License

> [!CAUTION]
> **Proprietary License - All Rights Reserved**
>
> Copyright (c) 2025 Anand Desai
>
> This source code is proprietary and confidential. The source code may be viewed for educational purposes only but may not be used, copied, modified, merged, published, distributed, sublicensed, or sold in any form, in whole or in part, without prior written permission from the copyright holder.
>
> Unauthorized copying, modification, or distribution of this software, via any medium, is strictly prohibited.

---

<p align="center">
  Built with ❤️ using SvelteKit and Threlte
</p>
