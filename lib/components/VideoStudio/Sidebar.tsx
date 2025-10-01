import React, { useState } from 'react'
import { ChevronDown, FolderOpen, Wand2 } from 'lucide-react'
import { useI18nContext } from '../../contexts/I18nContext'

interface SidebarProps {
  selectedTool: 'works' | 'create'
  onToolChange: (tool: 'works' | 'create') => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedTool,
  onToolChange
}) => {
  const { t } = useI18nContext()
  const [worksExpanded, setWorksExpanded] = useState(false)
  const [toolsExpanded, setToolsExpanded] = useState(true)

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
      <div className="p-4 space-y-1">
        {/* 作品集 */}
        <div>
          <button
            onClick={() => {
              setWorksExpanded(!worksExpanded)
              onToolChange('works')
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                worksExpanded ? 'rotate-0' : '-rotate-90'
              }`} />
              <span className="text-sm font-medium text-gray-700">{t('sidebar.portfolio')}</span>
            </div>
          </button>

          {worksExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              <div className="py-8 text-center text-gray-400">
                <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">{t('sidebar.noWorks')}</p>
              </div>
            </div>
          )}
        </div>

        {/* 创作工具 */}
        <div>
          <button
            onClick={() => setToolsExpanded(!toolsExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                toolsExpanded ? 'rotate-0' : '-rotate-90'
              }`} />
              <span className="text-sm font-medium text-gray-700">{t('sidebar.creativeTools')}</span>
            </div>
          </button>

          {toolsExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              <button
                onClick={() => onToolChange('create')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                  selectedTool === 'create'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center ${
                  selectedTool === 'create' ? 'bg-white/20' : 'bg-blue-50'
                }`}>
                  <Wand2 className={`w-3 h-3 ${
                    selectedTool === 'create' ? 'text-white' : 'text-blue-500'
                  }`} />
                </div>
                <span className="text-sm font-medium">{t('sidebar.oneClickCreate')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}