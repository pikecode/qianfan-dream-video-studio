# 🎯 直接拷贝使用指南

## 方案一：完整目录拷贝（推荐）

### 1. 拷贝文件
```bash
# 将整个lib目录拷贝到目标项目
cp -r lib/ your-project/src/components/VideoStudio/
```

### 2. 目标项目结构
```
your-project/
├── src/
│   ├── components/
│   │   └── VideoStudio/    # 拷贝的lib内容
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── types/
│   │       └── index.ts
│   └── App.tsx
└── package.json
```

### 3. 使用方式
```tsx
// your-project/src/App.tsx
import React from 'react'
import { VideoStudio } from './components/VideoStudio'
import type { StudioConfig } from './components/VideoStudio'

const config: StudioConfig = {
  apiEndpoint: 'https://your-api.com',
  theme: {
    primaryColor: '#3B82F6'
  }
}

function App() {
  return <VideoStudio config={config} />
}
```

### 4. 依赖要求
确保目标项目已安装以下依赖：
```json
{
  "dependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
    "framer-motion": ">=10.0.0",
    "lucide-react": ">=0.300.0",
    "tailwindcss": ">=3.0.0"
  }
}
```

## 方案二：单文件拷贝

### 1. 创建单个组件文件
```bash
# 创建目标文件
touch your-project/src/components/VideoStudio.tsx
```

### 2. 拷贝简化版本
将所有组件合并到一个文件中：

```tsx
// your-project/src/components/VideoStudio.tsx
import React, { useState, createContext, useContext } from 'react'
import { Home, Wand2, Video, Music, Download, Play, Pause, ChevronDown, Volume2, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

// 将所有类型定义、hooks、组件都放在这个文件中
// ... (完整代码见下方)
```

## 方案三：核心文件拷贝

### 1. 只拷贝核心组件
```bash
# 拷贝主要组件文件
cp lib/components/VideoStudio/index.tsx your-project/src/components/
cp lib/hooks/useVideoStudio.ts your-project/src/hooks/
cp lib/types/index.ts your-project/src/types/
```

### 2. 手动处理依赖
根据需要调整import路径。

## 🔧 样式处理

### Tailwind CSS 配置
确保目标项目的 `tailwind.config.js` 包含：

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // 如果拷贝到components目录
    "./src/components/VideoStudio/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### CSS 文件
如果需要额外样式，创建：
```css
/* your-project/src/components/VideoStudio/styles.css */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

## ⚠️ 注意事项

1. **路径调整**: 拷贝后需要调整相对路径
2. **依赖检查**: 确保所有必需依赖已安装
3. **样式冲突**: 检查CSS类名是否冲突
4. **版本更新**: 手动同步组件更新

## 🚀 快速验证

拷贝完成后运行：
```bash
npm run dev
# 检查是否有编译错误
```

## 📝 自定义配置

可以根据项目需求删除不需要的功能：
- 移除AI生成相关代码
- 简化预览组件
- 调整主题样式