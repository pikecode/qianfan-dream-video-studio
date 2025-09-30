# Short Video Editor

A modern, feature-rich web application for creating and editing short videos. Built with React, TypeScript, and cutting-edge web technologies to provide a seamless video editing experience in the browser.

![Short Video Editor](https://via.placeholder.com/800x400/1e293b/3b82f6?text=Short+Video+Editor)

## ✨ Features

### 🎬 Video Production
- **Multi-format Upload**: Support for MP4, WebM, MOV, AVI, and MKV files
- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **Real-time Preview**: Instant video playback with custom controls
- **Timeline Editing**: Professional timeline with frame-accurate editing

### ✂️ Editing Tools
- **Precision Trimming**: Cut and trim video clips with millisecond accuracy
- **Clip Management**: Reorder, duplicate, and split video segments
- **Merge & Combine**: Seamlessly join multiple video clips
- **Undo/Redo**: Full editing history with unlimited undo/redo

### 📝 Text & Overlays
- **Custom Text Overlays**: Add styled text with timing controls
- **Rich Typography**: Multiple fonts, sizes, colors, and styles
- **Positioning Control**: Precise text placement with visual editor
- **Animation Support**: Text entrance and exit animations

### 🎨 Visual Effects
- **Color Correction**: Brightness, contrast, and saturation adjustments
- **Filters & Effects**: Professional-grade visual filters
- **Transitions**: Smooth transitions between clips
- **Responsive Canvas**: High-quality rendering at any resolution

### 📤 Export & Sharing
- **Multiple Formats**: Export to MP4, WebM, or MOV
- **Quality Presets**: From web-optimized to 4K ultra-high quality
- **Bitrate Control**: Fine-tune compression settings
- **Batch Processing**: Export multiple videos simultaneously

### 🎯 User Experience
- **Project Management**: Organize videos into projects
- **Auto-save**: Never lose your work with automatic saving
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Theme**: Modern, eye-friendly interface
- **Keyboard Shortcuts**: Speed up your workflow

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager
- Modern web browser with video support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/short-video-editor.git
   cd short-video-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to start using the editor.

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready for deployment.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Layout/           # App layout and navigation
│   ├── VideoUpload/      # File upload components
│   ├── VideoPlayer/      # Video playback and controls
│   ├── Timeline/         # Timeline and editing tools
│   ├── TextOverlay/      # Text overlay editor
│   └── Export/           # Video export functionality
├── pages/
│   ├── Home.tsx          # Landing page
│   ├── Editor.tsx        # Main editing interface
│   ├── Projects.tsx      # Project management
│   └── Settings.tsx      # Application settings
├── store/
│   └── videoStore.ts     # State management with Zustand
├── utils/
│   └── timeFormat.ts     # Time formatting utilities
└── styles/
    └── index.css         # Global styles with Tailwind CSS
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development with excellent IDE support
- **Vite**: Lightning-fast build tool and development server

### State Management
- **Zustand**: Lightweight, TypeScript-first state management
- **React Context**: For theme and user preferences

### UI/UX
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons
- **React Hot Toast**: Elegant notification system

### Video Processing
- **HTML5 Video API**: Native browser video handling
- **Canvas API**: Real-time video rendering and effects
- **Web Workers**: Background processing for performance
- **FFmpeg.wasm**: Client-side video processing (future enhancement)

### File Handling
- **React Dropzone**: Drag-and-drop file uploads
- **File API**: Browser-native file processing
- **URL.createObjectURL**: Efficient video preview

### Development Tools
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality assurance

## 📱 Supported Browsers

- **Chrome**: 90+ (recommended)
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🎨 Customization

### Themes
The application supports custom themes. Modify `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color palette
      },
      secondary: {
        // Your secondary color palette
      }
    }
  }
}
```

### Adding Effects
Create new effects by extending the effects system:

```typescript
interface VideoEffect {
  id: string
  name: string
  apply: (canvas: HTMLCanvasElement, options: any) => void
}
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for custom configuration:

```env
VITE_APP_NAME=My Video Editor
VITE_MAX_FILE_SIZE=104857600  # 100MB
VITE_SUPPORTED_FORMATS=mp4,webm,mov,avi,mkv
```

### Build Configuration
Customize the build process in `vite.config.ts`:

```typescript
export default defineConfig({
  // Your custom configuration
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true
  }
})
```

## 📊 Performance

### Optimization Features
- **Lazy Loading**: Components load only when needed
- **Virtual Scrolling**: Handle large project lists efficiently
- **Web Workers**: Offload heavy processing from main thread
- **Memory Management**: Automatic cleanup of video resources
- **Progressive Enhancement**: Graceful degradation on older browsers

### Performance Tips
- Use lower preview quality for better performance during editing
- Export at lower bitrates for faster processing
- Close unused projects to free memory
- Use shorter clips for real-time preview

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Write TypeScript with proper types
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Use semantic commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/short-video-editor/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/short-video-editor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/short-video-editor/discussions)

---

Made with ❤️ by the Short Video Editor Team