import React, { useState } from 'react'
import { Home, Wand2, Video, Music, Download, Play, Pause, ChevronDown, Volume2, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

interface VideoClip {
  id: string
  name: string
  duration: string
  type: 'video' | 'audio'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'短剧' | '网文小说'>('短剧')
  const [selectedTool, setSelectedTool] = useState<'works' | 'create'>('create')
  const [activeContentTab, setActiveContentTab] = useState<'剧本' | '音频' | '图片' | '视频'>('音频')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState('00:45')
  const [totalTime, setTotalTime] = useState('01:00')

  const videoClips: VideoClip[] = [
    { id: '1', name: '她前夫竟是看到这个场景', duration: '00:45-00:49', type: 'video' },
    { id: '2', name: '不知道会有什么惊喜', duration: '00:49-00:53', type: 'video' },
    { id: '3', name: '音乐 南京板鸭的.mp3', duration: '00:49-00:59', type: 'audio' }
  ]

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Home className="w-6 h-6 text-blue-500" />
            <h1 className="text-lg font-semibold text-gray-900">Qianfan Dream Video Studio</h1>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 ml-8">
              {['短剧', '网文小说'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-2 px-4 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">1-2集内置声音工厂(分类型)</span>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm">
                <Settings className="w-4 h-4" />
                <span>分镜编4</span>
              </button>
              <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                导入选项
              </button>
              <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                导入选项
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 4 Horizontal Sections */}
      <div className="flex-1 flex">
        {/* Section 1: Left Sidebar - Tools (固定宽度) */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          {/* Tools Section */}
          <div className="p-4">
            {/* 作品集 */}
            <div className="mb-4">
              <button className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">作品集</span>
                </div>
              </button>
            </div>

            {/* 创作工具 */}
            <div>
              <button className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded-lg mb-2">
                <div className="flex items-center space-x-2">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">创作工具</span>
                </div>
              </button>

              <button className="w-full flex items-center space-x-3 px-6 py-2 rounded-lg text-left bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                <Wand2 className="w-4 h-4" />
                <span className="text-sm font-medium">一键创作</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Main Content Area (平分) */}
        <div className="flex-1 flex flex-col border-r border-gray-200 min-w-0 h-full">
          {/* Content Tabs */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wand2 className="w-5 h-5 text-blue-500" />
                <span className="text-base font-medium text-gray-900">AI创作</span>
              </div>

              <div className="flex items-center space-x-2">
                {['剧本', '音频', '图片', '视频'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveContentTab(tab as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      activeContentTab === tab
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Music Dropdown */}
          <div className="bg-white border-b border-gray-200 px-4 py-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">音乐</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeContentTab === '剧本' && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                {/* Script Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-medium text-gray-900">生成建言频短互动短剧</h3>
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-medium">👤</span>
                  </div>
                </div>

                {/* Script Content */}
                <div className="space-y-6">
                  {/* Scene 1 */}
                  <div className="border-l-4 border-purple-200 pl-4">
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 text-xs font-medium">G</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">画面：1</span>
                        <span className="text-sm text-gray-600">时长：00:00'-00:05'</span>
                      </div>
                      <div className="ml-8 space-y-1 text-sm text-gray-600">
                        <div>• 意图：特写 → 全景</div>
                        <div>• 运镜：镜头从上到下摇</div>
                        <div>• 画面：</div>
                      </div>
                    </div>

                    <div className="ml-8 space-y-3 text-sm text-gray-700">
                      <div>○ 从餐车顶部一个棕色的套红归档（特写）开始，拍摄上"冷热24h"的字样模糊不全，内容看不真连的样红</div>
                      <div>○ 镜头（下摇），红光在道套黑的历历黄酒而上面头后一片模糊的光感，再往在灯光下清晰可</div>
                      <div>○ 镜头最终定格在餐车另今会，几张原价的黄棕色外面，相对：*锋锦自己*也美如出果年的位置</div>
                      <div>○ 音效：环境声，逼近城市交通噪音，突出红"逼选"的地清声</div>
                    </div>
                  </div>

                  {/* Scene 2 */}
                  <div className="border-l-4 border-purple-200 pl-4">
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">画面：2</span>
                        <span className="text-sm text-gray-600">时长：00:05'-00:10'</span>
                      </div>
                      <div className="ml-0 space-y-1 text-sm text-gray-600">
                        <div>• 意图：中近景</div>
                        <div>• 运镜：固定</div>
                        <div>• 画面：屋场+脸髙，深夜在选择的明显低倍镜</div>
                      </div>
                    </div>

                    <div className="ml-0 text-sm text-gray-700">
                      <div>镜，已淡出餐馆的主镜头，向理想餐套重己经低中，领蛋有助地位在高残象的开未然，面倒的品品早是半般商流术劝场次选的站勾，在的可</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Gemini2.5pro</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">命音插进你理想的互动短剧</div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      生成
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeContentTab === '音频' && (
              <div className="space-y-4">
                {/* Audio Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700">已设置</span>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs">👤</span>
                    </div>
                    <span className="text-sm text-gray-600">是青</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-xs border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors flex items-center space-x-1">
                      <Volume2 className="w-3 h-3" />
                      <span>试听</span>
                    </button>
                    <button className="px-3 py-1 text-xs border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>删除</span>
                    </button>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Audio Item */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Music className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">清朗少年音.mp3</div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-xs">👤</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-700">男1</span>
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                      <button className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors">
                        编辑
                      </button>
                      <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        应用
                      </button>
                    </div>
                  </div>
                </div>

                {/* Empty Space */}
                <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Music className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">暂无更多音频</p>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Gemini2.5pro</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">男声</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="简单描述你想要的音效风格"
                      className="text-sm border border-gray-300 rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      生成音频
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeContentTab === '图片' && (
              <div className="space-y-4">
                {/* Top Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">分镜4</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Empty Content Area */}
                <div className="bg-gray-50 rounded-lg h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">🖼️</span>
                    </div>
                    <p className="text-sm text-gray-400">暂无图片内容</p>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Gemini2.5pro</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">背景</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">古风</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="简单描述你想要的画面风格"
                      className="text-sm border border-gray-300 rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      生成
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeContentTab === '视频' && (
              <div className="space-y-4">
                {/* Empty Content Area */}
                <div className="bg-gray-50 rounded-lg h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Video className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400">暂无视频内容</p>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Gemini2.5pro</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">视频时长 2s</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">分辨率 1080p</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">景别生成</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-xs">📸</span>
                      </div>
                      <input
                        type="text"
                        placeholder="基于选择你想要的画面风格"
                        className="text-sm border border-gray-300 rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      生成视频
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Audio Controls & Timeline (平分) */}
        <div className="flex-1 bg-white border-r border-gray-200 p-4 min-w-0 h-full overflow-y-auto">
          {activeContentTab === '剧本' ? (
            /* Script Scenes View */
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Wand2 className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900">剧本</span>
                  <span className="text-sm text-gray-500">1-2夜内座井工厂(分支B)</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <Settings className="w-4 h-4 text-gray-400" />
              </div>

              {/* Script Scenes */}
              <div className="space-y-4 flex-1 overflow-y-auto scrollbar-hide">
                {/* Scene 1 */}
                <div className="bg-blue-50 rounded-lg p-3 relative">
                  <div className="text-xs text-blue-600 mb-2">画面脚本：网络转政下许中的希，用自己的外套盖在她身上，他站起身，脸上清楚不甘与愤怒一丝希望。</div>
                  <div className="text-sm text-gray-800 space-y-1">
                    <div><strong>干草祈 (Chigusa Inori)：</strong>（急切地）喂！你快走！诗纸如坏了！</div>
                    <div><strong>神合 胜 (Kamiya Shun)：</strong>（打断她，大步走向诗纸）不！我不能就这么放弃她！</div>
                  </div>
                  <button className="absolute top-2 right-2 p-1 hover:bg-blue-200 rounded">
                    <Download className="w-3 h-3 text-blue-600" />
                  </button>
                </div>

                {/* Scene 2 */}
                <div className="bg-blue-50 rounded-lg p-3 relative">
                  <div className="text-xs text-blue-600 mb-2">画面脚本：他张开双臂，没有害怕何武器，挡在诗纸面前。</div>
                  <div className="text-sm text-gray-800">
                    <div><strong>神合 胜 (Kamiya Shun)：</strong>（声音颤抖但坚决）诗纸！看看我！我已经失去天空许的恋人了！你认为我会让一个全世界最好的蛋糕店！</div>
                  </div>
                  <button className="absolute top-2 right-2 p-1 hover:bg-blue-200 rounded">
                    <Download className="w-3 h-3 text-blue-600" />
                  </button>
                </div>

                {/* Scene 3 */}
                <div className="bg-blue-50 rounded-lg p-3 relative">
                  <div className="text-xs text-blue-600 mb-2">画面脚本：魔化的诗纸动作一顿，注视的眼中似乎内过一丝茫然，她茫茫头，仿佛在努力回忆。</div>
                  <div className="text-sm text-gray-800">
                    <div><strong>夏目 诗纸 (Natsume Shiori)：</strong>（低语，含混不清）...蛋糕...好香...赴子...好饿...</div>
                  </div>
                  <button className="absolute top-2 right-2 p-1 hover:bg-blue-200 rounded">
                    <Download className="w-3 h-3 text-blue-600" />
                  </button>
                </div>

                {/* Scene 4 */}
                <div className="bg-blue-50 rounded-lg p-3 relative">
                  <div className="text-xs text-blue-600 mb-2">画面脚本：闪看到一丝希望，眼中燃起光芒，就在此时，诗纸的求让愈发强烈的饥饿感取代。她猛地发出一声尖啸，眼中最后的光芒渐消失。</div>
                  <div className="text-sm text-gray-800">
                    <div><strong>夏目 诗纸 (Natsume Shiori)：</strong>（尖啸）肉——！！！</div>
                  </div>
                  <button className="absolute top-2 right-2 p-1 hover:bg-blue-200 rounded">
                    <Download className="w-3 h-3 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          ) : activeContentTab === '图片' ? (
            /* Image Gallery View */
            <div className="space-y-4">
              {/* Images List */}
              <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
                {/* Image Item 1 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">真实照片质感,缘波雨特写, 银灰蓝色发丝乱舞,炫酷, 反光和氛围,玻璃感染盆景...</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K | F1.8浅景深 | 亮虹萤光强度120%</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-900">1</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Volume2 className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Image Item 2 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-orange-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">金黄色系, 手绘指甲, 金箔彩, 精美, 神秘, 华丽异域风格妆19女, 黑色...</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K | F1.8浅景深 | 亮虹萤光强度120%</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-900">2</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Volume2 className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Image Item 3 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">一头黑色的长发如瀑布般垂落,发间点缀着古老的发饰,有韵巴经毛线, 有内闪着光芒。唯...</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K | F1.8浅景深 | 亮虹萤光强度120%</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-900">3</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Volume2 className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Image Item 4 - Selected */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">高定风, 渍画中国古代绝色美女, 厚涂加速,极致细腻, 超写实, 超逼真, 五官精致, 头发...</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K | F1.8浅景深 | 亮虹萤光强度120%</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    <span className="text-xs font-medium text-blue-600">4</span>
                    <button className="p-1 hover:bg-blue-200 rounded">
                      <Volume2 className="w-3 h-3 text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-blue-200 rounded">
                      <Download className="w-3 h-3 text-blue-600" />
                    </button>
                  </div>
                </div>

                {/* Image Item 5 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-200 to-teal-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">古风女, 深色长发, 粉纱织汉服, 花朵发饰,香照, 委婉, 神颜感, 病批, 病娇, 女强上身...</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K | F1.8浅景深 | 亮虹萤光强度120%</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-900">5</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Volume2 className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Load More */}
              <div className="text-center pt-4">
                <button className="text-sm text-gray-500 hover:text-gray-700">下滑更多</button>
              </div>
            </div>
          ) : activeContentTab === '视频' ? (
            /* Video Gallery View - Same as Image Gallery */
            <div className="space-y-4">
              {/* Videos List */}
              <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
                {/* Video Item 1 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">真实照片质感,缘波雨特写, 银灰蓝色发丝乱舞,炫酷, 反光和氛围,玻璃感染盆景...</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K | F1.8浅景深 | 亮虹萤光强度120%</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-900">1</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Volume2 className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Video Item 2 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-orange-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">金黄色系, 手绘指甲, 金箔彩, 精美, 神秘, 华丽异域风格妆19女, 黑色...</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K | F1.8浅景深 | 亮虹萤光强度120%</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-900">2</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Volume2 className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Video Item 3 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">一头黑色的长发如瀑布般垂落,发间点缀着古老的发饰,有韵巴经毛线, 有内闪着光芒。唯...</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K | F1.8浅景深 | 亮虹萤光强度120%</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-900">3</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Volume2 className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Video Item 4 - Selected */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">高定风, 渍画中国古代绝色美女, 厚涂加速,极致细腻, 超写实, 超逼真, 五官精致, 头发...</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K | F1.8浅景深 | 亮虹萤光强度120%</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    <span className="text-xs font-medium text-blue-600">4</span>
                    <button className="p-1 hover:bg-blue-200 rounded">
                      <Volume2 className="w-3 h-3 text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-blue-200 rounded">
                      <Download className="w-3 h-3 text-blue-600" />
                    </button>
                  </div>
                </div>

                {/* Video Item 5 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-200 to-teal-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">古风女, 深色长发, 粉纱织汉服, 花朵发饰,香照, 委婉, 神颜感, 病批, 病娇, 女强上身...</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K | F1.8浅景深 | 亮虹萤光强度120%</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-900">5</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Volume2 className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Load More */}
              <div className="text-center pt-4">
                <button className="text-sm text-gray-500 hover:text-gray-700">下滑更多</button>
              </div>
            </div>
          ) : activeContentTab === '音频' ? (
            /* Audio Timeline View */
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">场次</span>
                  <span className="text-sm text-gray-500">1-2夜内座井工厂(分支B)</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <Settings className="w-4 h-4 text-gray-400" />
              </div>

              {/* Audio Timeline Items */}
              <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
                {/* Audio Item 1 */}
                <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">👤</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">男1</span>
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

                {/* Audio Item 2 */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">👤</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">男1</span>
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

                {/* Audio Item 3 */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Music className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">音效 南京板鸭的.mp3</div>
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
          ) : (
            /* Default Audio Controls */
            <>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Music className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">环境音乐.mp3</div>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0">
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors">
                      应用
                    </button>
                    <button className="px-3 py-1 text-xs border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors">
                      编辑
                    </button>
                  </div>
                </div>

                {/* Audio Timeline */}
                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs text-gray-600 flex-shrink-0">播放位置</span>
                    <span className="text-xs font-mono text-gray-800 flex-shrink-0">00:00-00:05</span>
                    <div className="flex-1 bg-gray-300 rounded-full h-2 relative min-w-0">
                      <div className="absolute left-0 top-0 h-2 bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
                      <div className="absolute left-[30%] top-[-2px] w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-xs text-gray-600 flex-shrink-0">1X</span>
                  </div>
                </div>
              </div>

              {/* Generation Options */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="text-sm font-medium text-gray-700 truncate">Gemini2-Pro</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="text-sm text-gray-600 truncate">背景音乐</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </div>

                <div className="text-center py-6">
                  <p className="text-sm text-gray-500 mb-4">点击这里快速音频已完成进程</p>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    导通上传
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Section 4: Phone Preview (固定宽度) */}
        <div className="w-80 p-6 bg-gray-50 flex-shrink-0">
          {/* Phone Mockup */}
          <div className="relative mx-auto" style={{ width: '260px', height: '480px' }}>
            <div className="absolute inset-0 bg-black rounded-[2.5rem] p-2">
              <div className="w-full h-full bg-gray-900 rounded-[2rem] overflow-hidden relative">
                {/* Video Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-800 to-black">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white text-center">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-sm opacity-70">视频预览</p>
                    </div>
                  </div>
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Text Overlay */}
                  <div className="mb-4">
                    <p className="text-white text-sm font-medium text-center">
                      她前夫竟是看到这个场景
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-white text-xs">00:45</span>
                    <div className="flex-1 bg-white/30 rounded-full h-1">
                      <div
                        className="bg-white rounded-full h-1 transition-all duration-300"
                        style={{ width: '75%' }}
                      />
                    </div>
                    <span className="text-white text-xs">01:00</span>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Top Status Bar */}
                <div className="absolute top-2 left-4 right-4 flex justify-between items-center">
                  <div className="text-white text-xs">9:41</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-2 bg-white rounded-sm opacity-70" />
                    <div className="text-white text-xs">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App