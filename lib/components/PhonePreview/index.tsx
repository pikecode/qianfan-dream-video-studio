import React from 'react'
import { Video, Play, Pause, Smartphone } from 'lucide-react'

interface PhonePreviewProps {
  isPlaying: boolean
  currentTime: string
  totalTime: string
  onPlayToggle: () => void
  currentText?: string
  progress?: number
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({
  isPlaying,
  currentTime,
  totalTime,
  onPlayToggle,
  currentText = '她前夫竟是看到这个场景',
  progress = 75
}) => {
  return (
    <div className="w-80 p-6 bg-white flex-shrink-0">
      {/* Preview Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Smartphone className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">实时预览</h3>
        </div>
        <p className="text-sm text-gray-500">查看手机端效果</p>
      </div>

      {/* Phone Mockup */}
      <div className="relative mx-auto mb-6" style={{ width: '260px', height: '480px' }}>
        {/* Phone Frame */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
          {/* Screen */}
          <div className="w-full h-full bg-gray-900 rounded-[2rem] overflow-hidden relative">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10"></div>

            {/* Video Content */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                    <Video className="w-10 h-10 text-white/80" />
                  </div>
                  <p className="text-sm opacity-70 font-medium">AI生成视频预览</p>
                  <p className="text-xs opacity-50 mt-1">点击播放查看效果</p>
                </div>
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              {/* Text Overlay */}
              <div className="mb-4">
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-white text-sm font-medium text-center leading-relaxed">
                    {currentText}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-white text-xs font-medium">{currentTime}</span>
                <div className="flex-1 bg-white/20 rounded-full h-1">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-full h-1 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-white text-xs font-medium">{totalTime}</span>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center">
                <button
                  onClick={onPlayToggle}
                  className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/25 transition-all duration-200 border border-white/20"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-white" />
                  ) : (
                    <Play className="w-7 h-7 text-white ml-0.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Status Bar */}
            <div className="absolute top-2 left-4 right-4 flex justify-between items-center z-20 mt-6">
              <div className="text-white text-xs font-medium">9:41</div>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                </div>
                <div className="w-6 h-3 border border-white rounded-sm">
                  <div className="w-4 h-1 bg-white rounded-sm ml-0.5 mt-0.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Settings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">分辨率</span>
          <span className="font-medium text-gray-900">1080 × 1920</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">帧率</span>
          <span className="font-medium text-gray-900">30 FPS</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">时长</span>
          <span className="font-medium text-gray-900">{totalTime}</span>
        </div>
      </div>
    </div>
  )
}