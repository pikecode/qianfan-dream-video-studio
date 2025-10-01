# Qianfan Dream Video Studio

一个用于短视频制作的可复用组件库，支持AI生成内容、多媒体时间轴管理和实时预览。

## ✨ 核心特性

### 🤖 AI 智能创作
- **智能剧本生成**: 基于AI模型自动生成短视频剧本
- **音频合成**: 多种音色的语音合成，支持情感调节
- **图像生成**: AI生成高质量视觉素材
- **视频创作**: 智能视频片段生成和编辑

### 🎬 专业编辑
- **多媒体时间轴**: 精确的时间轴编辑和管理
- **实时预览**: 手机端效果实时预览
- **内容分类**: 剧本、音频、图片、视频分类管理
- **项目管理**: 完整的创作项目工作流

### 🎨 用户体验
- **响应式设计**: 适配不同屏幕尺寸
- **主题定制**: 支持自定义主题配置
- **国际化**: 多语言支持
- **组件化架构**: 高度可复用的组件设计

## 🚀 快速开始

### 作为组件库使用

```bash
# 在你的项目中引用本地包
npm install file:./path/to/qianfan-dream-video-studio/lib
```

```tsx
import React from 'react'
import { VideoStudio } from '@qianfan/video-studio'
import type { StudioConfig } from '@qianfan/video-studio'

const config: StudioConfig = {
  apiEndpoint: 'https://your-api.com',
  theme: {
    primaryColor: '#3B82F6'
  },
  features: {
    enableAIGeneration: true,
    enableVideoPreview: true
  }
}

function App() {
  return (
    <VideoStudio
      config={config}
      initialState={{
        activeTab: '短剧',
        activeContentTab: '音频'
      }}
    />
  )
}
```

### 运行示例项目

```bash
# 1. 构建组件库
cd lib
npm install
npm run build

# 2. 运行示例
cd ../examples/basic-usage
npm install
npm run dev
```

## 📦 项目结构

```
qianfan-dream-video-studio/
├── lib/                    # 组件库源码
│   ├── components/         # 可复用组件
│   │   ├── VideoStudio/    # 主工作室组件
│   │   ├── ContentTabs/    # 内容标签页
│   │   ├── MediaTimeline/  # 媒体时间轴
│   │   └── PhonePreview/   # 手机预览
│   ├── hooks/             # React hooks
│   ├── types/             # TypeScript 类型
│   └── index.ts           # 统一导出
├── examples/              # 使用示例
│   └── basic-usage/       # 基础用法示例
└── src/                   # 原始项目文件
```

## 🔧 API 配置

### StudioConfig

```typescript
interface StudioConfig {
  apiEndpoint?: string      // API 服务地址
  theme?: ThemeConfig       // 主题配置
  features?: FeatureFlags   // 功能开关
  i18n?: LocaleConfig      // 国际化配置
}
```

### 主要组件

- **VideoStudio**: 主组件，包含完整的视频工作室界面
- **ContentTabs**: 内容类型切换标签（剧本、音频、图片、视频）
- **MediaTimeline**: 媒体时间轴和内容列表
- **PhonePreview**: 手机端预览界面

## 🛠 开发

### 组件库开发

```bash
cd lib
npm run dev    # 监听模式构建
npm run build  # 生产构建
```

### 添加新组件

1. 在 `lib/components/` 下创建组件文件夹
2. 实现组件逻辑
3. 在 `lib/index.ts` 中导出
4. 更新类型定义

## 🔄 在其他项目中使用

### Monorepo 方式

```json
{
  "workspaces": [
    "packages/video-studio",
    "apps/*"
  ]
}
```

### 文件引用方式

```json
{
  "dependencies": {
    "@qianfan/video-studio": "file:../video-studio/lib"
  }
}
```

### Git Submodule 方式

```bash
git submodule add https://github.com/your/video-studio.git libs/video-studio
```

## 📝 许可证

MIT License