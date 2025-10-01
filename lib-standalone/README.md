# 🎯 单文件组件 - VideoStudio

这是一个完整的单文件VideoStudio组件，包含了所有必要的类型定义、hooks和UI组件。

## 📋 使用方法

### 1. 直接拷贝文件
```bash
# 拷贝单文件到你的项目
cp lib-standalone/VideoStudio.tsx your-project/src/components/
```

### 2. 在项目中使用
```tsx
// your-project/src/App.tsx
import React from 'react'
import VideoStudio from './components/VideoStudio'
import type { StudioConfig } from './components/VideoStudio'

const config: StudioConfig = {
  apiEndpoint: 'https://your-api.com',
  theme: {
    primaryColor: '#3B82F6'
  },
  features: {
    enableAIGeneration: true,
    enableVideoPreview: true
  },
  i18n: {
    language: 'zh',
    labels: {
      title: '我的视频工作室'
    }
  }
}

function App() {
  return (
    <div className="App">
      <VideoStudio
        config={config}
        initialState={{
          activeTab: '短剧',
          activeContentTab: '音频'
        }}
      />
    </div>
  )
}

export default App
```

### 3. 确保依赖
你的项目需要安装以下依赖：
```json
{
  "dependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
    "framer-motion": ">=10.0.0",
    "lucide-react": ">=0.300.0"
  }
}
```

### 4. 样式配置
确保你的项目使用了Tailwind CSS，并且配置文件包含：
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## ✨ 组件特性

- 📱 **响应式布局**: 四栏布局，适配不同屏幕
- 🎨 **主题配置**: 支持自定义主题颜色
- 🔧 **功能开关**: 可配置不同功能模块
- 🌍 **国际化**: 支持自定义文案
- 🎬 **实时预览**: 手机端效果预览
- ⚡ **高性能**: 使用React hooks优化状态管理

## 🔧 配置选项

### StudioConfig
```typescript
interface StudioConfig {
  apiEndpoint?: string      // API服务地址
  theme?: {
    primaryColor?: string   // 主色调
    backgroundColor?: string // 背景色
    borderColor?: string    // 边框色
  }
  features?: {
    enableAIGeneration?: boolean     // 启用AI生成
    enableVideoPreview?: boolean     // 启用视频预览
    enableAudioTimeline?: boolean    // 启用音频时间轴
  }
  i18n?: {
    language: 'zh' | 'en'           // 语言
    labels?: Record<string, string>  // 自定义文案
  }
}
```

## 🎯 自定义扩展

### 添加新的内容类型
```tsx
// 修改ContentTab类型
export type ContentTab = '剧本' | '音频' | '图片' | '视频' | '新类型'

// 在ContentTabs组件中添加
const tabs: ContentTab[] = ['剧本', '音频', '图片', '视频', '新类型']
```

### 自定义主题
```tsx
const customConfig: StudioConfig = {
  theme: {
    primaryColor: '#10B981',  // 绿色主题
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB'
  }
}
```

## 📝 注意事项

1. **CSS类名**: 使用Tailwind CSS类名，确保项目已配置
2. **图标库**: 使用lucide-react图标，需要安装依赖
3. **动画**: 使用framer-motion，需要安装依赖
4. **类型安全**: 包含完整TypeScript类型定义

## 🔄 版本同步

当原项目更新时，需要手动同步这个单文件组件。建议：
1. 定期检查原项目更新
2. 手动合并新功能
3. 测试兼容性

## 🚀 性能优化

- 使用`useCallback`优化事件处理
- 组件拆分避免不必要重渲染
- 状态管理集中化
- 支持按需导入