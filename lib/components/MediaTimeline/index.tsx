import React from 'react'
import { ChevronDown, Settings, Music, Volume2, Download } from 'lucide-react'
import { useVideoStudioContext } from '../VideoStudio'

export const MediaTimeline: React.FC = () => {
  const { activeContentTab, videoClips } = useVideoStudioContext()

  return (
    <div className="flex-1 bg-white border-r border-gray-200 flex flex-col min-w-0 min-h-0">
      {activeContentTab === '剧本' ? (
        <ScriptScenes />
      ) : activeContentTab === '音频' ? (
        <AudioTimeline videoClips={videoClips} />
      ) : activeContentTab === '图片' ? (
        <ImageGallery />
      ) : activeContentTab === '视频' ? (
        <VideoGallery />
      ) : (
        <DefaultTimeline />
      )}
    </div>
  )
}

const ScriptScenes: React.FC = () => (
  <div className="flex flex-col h-full p-4">
    {/* Header - Fixed Height */}
    <div className="flex-shrink-0 flex items-center justify-between pb-3 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-900">剧本</span>
        <span className="text-sm text-gray-500">1-2夜内座井工厂(分支B)</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
      <Settings className="w-4 h-4 text-gray-400" />
    </div>

    {/* Content - Flexible Height */}
    <div className="flex-1 space-y-3 mt-4 overflow-y-auto scrollbar-hide min-h-0">
      {[1, 2, 3, 4].map((scene) => (
        <div key={scene} className="bg-blue-50 rounded-lg p-3 relative">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-blue-600 font-medium">
              画面脚本：场景{scene}的详细描述内容
            </span>
            <button className="p-1 hover:bg-blue-200 rounded flex-shrink-0">
              <Download className="w-3 h-3 text-blue-600" />
            </button>
          </div>
          <div className="text-sm text-gray-800 font-medium">
            角色对话
          </div>
        </div>
      ))}
    </div>
  </div>
)

interface AudioTimelineProps {
  videoClips: Array<{ id: string; name: string; duration: string; type: 'video' | 'audio' }>
}

const AudioTimeline: React.FC<AudioTimelineProps> = ({ videoClips }) => (
  <div className="flex flex-col h-full p-4">
    {/* Header - Fixed Height */}
    <div className="flex-shrink-0 flex items-center justify-between pb-3 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-900">场次</span>
        <span className="text-sm text-gray-500">1-2夜内座井工厂(分支B)</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
      <Settings className="w-4 h-4 text-gray-400" />
    </div>

    {/* Content - Flexible Height */}
    <div className="flex-1 space-y-3 mt-4 overflow-y-auto scrollbar-hide min-h-0">
      {/* Audio clips */}
      <div className={`border rounded-lg p-3 border-2 border-blue-200 bg-blue-50`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 text-xs">👤</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">男1</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
            <div className="text-sm font-medium text-gray-900">她前夫竟是看到这个场景</div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-xs text-gray-500">00:45-00:49</span>
            <button className="p-1 hover:bg-blue-200 rounded">
              <Volume2 className="w-3 h-3 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-blue-200 rounded">
              <Download className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-3 border border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 text-xs">👤</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">男1</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
            <div className="text-sm font-medium text-gray-900">不知道会有什么惊喜</div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-xs text-gray-500">00:49-00:53</span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Volume2 className="w-3 h-3 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Download className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-3 border border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <Music className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">音效 需要挫败的, 沉重的 mp3</div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-xs text-gray-500">00:49-00:59</span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Volume2 className="w-3 h-3 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Download className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ImageGallery: React.FC = () => (
  <div className="flex flex-col h-full p-4">
    {/* Content - Full Height */}
    <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide min-h-0">
      {[
        {
          id: 1,
          title: "真实照片质感,绿波丽特号，银灰蓝色龙装落透明光,反光时,波璃感呈突兀...",
          specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
          gradient: "from-blue-200 to-cyan-300"
        },
        {
          id: 2,
          title: "金黄色系,手绘插画,精彩,精美,神秘,华丽异域风格的调色,黑色长...",
          specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
          gradient: "from-yellow-200 to-orange-300"
        },
        {
          id: 3,
          title: "一头黑色的长发如澜布般垂落,发间点缀着古老经久饰,有的已经生锈,有的闪烁着色...",
          specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
          gradient: "from-gray-300 to-purple-300"
        },
        {
          id: 4,
          title: "高定风,漫画中国古代绝色美女,厚涂肌理,超写实,超写实,超通真,五官精致,头戴...",
          specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
          gradient: "from-red-200 to-pink-300"
        },
        {
          id: 5,
          title: "古风女,深色长发,粉纱纹汉服,花朵发饰,雨夜,愁感,颓废,疲倦,病娇,女脸上身...",
          specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
          gradient: "from-purple-200 to-pink-300"
        }
      ].map((item) => (
        <div
          key={item.id}
          className={`border rounded-lg p-3 flex items-start space-x-3 ${
            item.id === 4 ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white border-gray-200'
          }`}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-br ${item.gradient}`}></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
              {item.title}
            </div>
            <div className="text-xs text-gray-500 leading-relaxed">
              {item.specs}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 flex-shrink-0">
            <span className={`text-lg font-bold ${item.id === 4 ? 'text-blue-600' : 'text-gray-900'}`}>
              {item.id}
            </span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="text-gray-400 text-xs">⚙️</span>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="text-gray-400 text-xs">📋</span>
            </button>
          </div>
        </div>
      ))}
      <div className="text-center py-4">
        <button className="text-blue-500 text-sm">下滑更多</button>
      </div>
    </div>
  </div>
)

const VideoGallery: React.FC = () => <ImageGallery />

const DefaultTimeline: React.FC = () => (
  <div className="flex flex-col h-full p-4">
    <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center min-h-0">
      <div className="text-center">
        <p className="text-sm text-gray-500">选择内容类型开始编辑</p>
      </div>
    </div>
  </div>
)