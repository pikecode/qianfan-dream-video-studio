import React from 'react'
import { ChevronDown, Music, Video } from 'lucide-react'
import { useVideoStudioContext } from '../VideoStudio'

export const ContentArea: React.FC = () => {
  const { activeContentTab } = useVideoStudioContext()

  return (
    <div className="flex-1 bg-white flex flex-col min-h-0">
      {activeContentTab === '剧本' && <ScriptContent />}
      {activeContentTab === '音频' && <AudioContent />}
      {activeContentTab === '图片' && <ImageContent />}
      {activeContentTab === '视频' && <VideoContent />}
    </div>
  )
}

const ScriptContent: React.FC = () => (
  <div className="flex flex-col h-full">
    {/* Header - Fixed Height */}
    <div className="flex-shrink-0 p-6 pb-0">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">生成是青春颂互动短剧</h3>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">👤</span>
        </div>
      </div>
    </div>

    {/* Script Content - Flexible Height */}
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="space-y-4">
        {/* Scene 1 */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xs font-medium">G</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">画面：1</span>
              <span className="mx-2">时长：00:00'-00:05'</span>
            </div>
          </div>

          <div className="ml-8 space-y-1 text-sm">
            <div><span className="font-medium text-gray-700">• 景别：</span>特写→全貌</div>
            <div><span className="font-medium text-gray-700">• 运镜：</span>镜头从上向下俯</div>
            <div><span className="font-medium text-gray-700">• 画面：</span></div>
            <div className="ml-4 space-y-1 text-xs text-gray-600">
              <div>○ 从餐车间隙一个雅致的黄昏团圆【特写】开始，招牌上"桐梅·24小时"的字样在镜头不稳中，闪耀着几秒的红光。</div>
              <div>○ 镜头【下摇】，红光在夜游瓶的所有路障面上透过一片暖阳的光照，雨在所有的红光。</div>
              <div>○ 镜头最终定格在餐车前身的金器，凡是做情的黄昏偏在其周是在情爱有角的检测在外前提，日与：各店隐已-人重石信属情感的检查。</div>
              <div>○ 全景：这种酒席，迟的牵城乡还通后，看似灯雨"迟滞"的电清声。</div>
            </div>
          </div>
        </div>

        {/* Scene 2 */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-600">
              <span className="font-medium">画面：2</span>
              <span className="mx-2">时长：00:05'-00:10'</span>
            </div>
          </div>

          <div className="ml-8 space-y-1 text-sm">
            <div><span className="font-medium text-gray-700">• 景别：</span>中近景</div>
            <div><span className="font-medium text-gray-700">• 运镜：</span>固定</div>
            <div><span className="font-medium text-gray-700">• 画面：</span>星斗·铁格。深灰色混搭绫的中等压缩得低，只融出表情的下颈线，但同调里黄雄都对目视自己也，面前的纸来是半年跟雄的获取路的先来。面前的纸来是半年跟雄的清简：所以，获对了。</div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer - Fixed Height */}
    <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Gemini2.5pro</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="简单描述你想要的互动剧"
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
            继续创
          </button>
        </div>
      </div>
    </div>
  </div>
)

const AudioContent: React.FC = () => (
  <div className="flex flex-col h-full">
    {/* Header - Fixed Height */}
    <div className="flex-shrink-0 p-6 pb-0">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">配音</h3>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>

    {/* Content - Flexible Height */}
    <div className="flex-1 px-6 py-4 overflow-y-auto min-h-0">
      <div className="space-y-4">
        {/* Voice Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">已设置</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">楚青</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <span>⏱️</span>
                <span>试听</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>📋</span>
                <span>删除</span>
              </span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Generated Audio */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">G</span>
            </div>
            <div className="flex items-center space-x-2">
              <Music className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-900">清朝少年音.mp3</span>
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-xs">♂</span>
              </div>
              <span className="text-sm text-gray-600">男1</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
              <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs">
                播放
              </button>
              <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded text-xs">
                应用
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer - Fixed Height */}
    <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Gemini2.5pro</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 ml-4">男声</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="简单描述你想要的声音风格"
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
            继续创
          </button>
        </div>
      </div>
    </div>
  </div>
)

const ImageContent: React.FC = () => (
  <div className="flex flex-col h-full">
    {/* Header - Fixed Height */}
    <div className="flex-shrink-0 p-6 pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">分镜4</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>

    {/* Content - Flexible Height */}
    <div className="flex-1 px-6 py-4 overflow-y-auto min-h-0">
      <div className="space-y-6">
        {/* Empty State - Middle area */}
        <div className="flex-1 flex items-center justify-center" style={{ minHeight: '200px' }}>
          <div className="w-full h-1 bg-blue-400 rounded"></div>
        </div>
      </div>
    </div>

    {/* Footer - Fixed Height */}
    <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Gemini2.5pro</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 ml-4">背景</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 ml-4">古风</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="简单描述你想要的画面风格"
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
            继续创
          </button>
        </div>
      </div>
    </div>
  </div>
)

const VideoContent: React.FC = () => (
  <div className="flex flex-col h-full">
    {/* Header - Fixed Height */}
    <div className="flex-shrink-0 p-6 pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">分镜1</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>

    {/* Content - Flexible Height */}
    <div className="flex-1 px-6 py-4 overflow-y-auto min-h-0">
      <div className="space-y-6">
        {/* Empty State - Middle area */}
        <div className="flex-1 flex items-center justify-center" style={{ minHeight: '200px' }}>
          <div className="w-full h-1 bg-blue-400 rounded"></div>
        </div>
      </div>
    </div>

    {/* Footer - Fixed Height */}
    <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Gemini2.5pro</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 ml-4">视频时长 2s</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 ml-4">分辨率 1080p</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 ml-4">单图生成</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-500 text-xs">📷</span>
            </div>
            <input
              type="text"
              placeholder="简单描述你想要的画面风格"
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
            继续创
          </button>
        </div>
      </div>
    </div>
  </div>
)