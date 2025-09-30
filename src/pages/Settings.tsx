import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings as SettingsIcon,
  User,
  Video,
  Download,
  Palette,
  Volume2,
  Monitor,
  Save,
  RotateCcw,
  Info,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface SettingsData {
  // User Preferences
  username: string
  email: string

  // Video Settings
  defaultResolution: '720p' | '1080p' | '4k'
  defaultFPS: 24 | 30 | 60
  defaultFormat: 'mp4' | 'webm' | 'mov'
  autoSave: boolean
  previewQuality: 'low' | 'medium' | 'high'

  // Export Settings
  defaultBitrate: number
  watermark: boolean
  watermarkText: string

  // Interface Settings
  theme: 'dark' | 'light'
  language: 'en' | 'es' | 'fr' | 'de'
  showTooltips: boolean
  autoplayPreview: boolean

  // Audio Settings
  defaultVolume: number
  muteOnStart: boolean
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'video' | 'export' | 'interface'>('general')
  const [hasChanges, setHasChanges] = useState(false)

  const [settings, setSettings] = useState<SettingsData>({
    username: 'Video Creator',
    email: 'creator@example.com',
    defaultResolution: '1080p',
    defaultFPS: 30,
    defaultFormat: 'mp4',
    autoSave: true,
    previewQuality: 'high',
    defaultBitrate: 5000,
    watermark: false,
    watermarkText: 'Made with VideoEdit',
    theme: 'dark',
    language: 'en',
    showTooltips: true,
    autoplayPreview: true,
    defaultVolume: 100,
    muteOnStart: false,
  })

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'export', label: 'Export', icon: Download },
    { id: 'interface', label: 'Interface', icon: Monitor },
  ]

  const updateSetting = (key: keyof SettingsData, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // TODO: Save settings to localStorage or backend
    localStorage.setItem('videoEditorSettings', JSON.stringify(settings))
    setHasChanges(false)
    toast.success('Settings saved successfully!')
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      // Reset to default values
      setSettings({
        username: 'Video Creator',
        email: 'creator@example.com',
        defaultResolution: '1080p',
        defaultFPS: 30,
        defaultFormat: 'mp4',
        autoSave: true,
        previewQuality: 'high',
        defaultBitrate: 5000,
        watermark: false,
        watermarkText: 'Made with VideoEdit',
        theme: 'dark',
        language: 'en',
        showTooltips: true,
        autoplayPreview: true,
        defaultVolume: 100,
        muteOnStart: false,
      })
      setHasChanges(true)
      toast.success('Settings reset to default!')
    }
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">User Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={settings.username}
              onChange={(e) => updateSetting('username', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => updateSetting('email', e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Audio Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Default Volume
            </label>
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-secondary-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={settings.defaultVolume}
                onChange={(e) => updateSetting('defaultVolume', Number(e.target.value))}
                className="flex-1 h-2 bg-secondary-600 rounded-lg slider"
              />
              <span className="text-white font-medium w-12 text-right">
                {settings.defaultVolume}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-white">Mute on Start</label>
              <p className="text-xs text-secondary-400 mt-1">
                Start videos muted by default
              </p>
            </div>
            <button
              onClick={() => updateSetting('muteOnStart', !settings.muteOnStart)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.muteOnStart ? 'bg-primary-600' : 'bg-secondary-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.muteOnStart ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderVideoSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Default Video Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Default Resolution
            </label>
            <select
              value={settings.defaultResolution}
              onChange={(e) => updateSetting('defaultResolution', e.target.value)}
              className="input"
            >
              <option value="720p">720p (1280×720)</option>
              <option value="1080p">1080p (1920×1080)</option>
              <option value="4k">4K (3840×2160)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Default Frame Rate
            </label>
            <select
              value={settings.defaultFPS}
              onChange={(e) => updateSetting('defaultFPS', Number(e.target.value))}
              className="input"
            >
              <option value={24}>24 FPS</option>
              <option value={30}>30 FPS</option>
              <option value={60}>60 FPS</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Default Format
            </label>
            <select
              value={settings.defaultFormat}
              onChange={(e) => updateSetting('defaultFormat', e.target.value)}
              className="input"
            >
              <option value="mp4">MP4</option>
              <option value="webm">WebM</option>
              <option value="mov">MOV</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Preview Quality
            </label>
            <select
              value={settings.previewQuality}
              onChange={(e) => updateSetting('previewQuality', e.target.value)}
              className="input"
            >
              <option value="low">Low (faster)</option>
              <option value="medium">Medium</option>
              <option value="high">High (slower)</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Playback Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-white">Auto Save</label>
              <p className="text-xs text-secondary-400 mt-1">
                Automatically save changes every 30 seconds
              </p>
            </div>
            <button
              onClick={() => updateSetting('autoSave', !settings.autoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.autoSave ? 'bg-primary-600' : 'bg-secondary-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-white">Autoplay Preview</label>
              <p className="text-xs text-secondary-400 mt-1">
                Start playing videos automatically when selected
              </p>
            </div>
            <button
              onClick={() => updateSetting('autoplayPreview', !settings.autoplayPreview)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.autoplayPreview ? 'bg-primary-600' : 'bg-secondary-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.autoplayPreview ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderExportSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Default Export Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Default Bitrate (kbps)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={settings.defaultBitrate}
                onChange={(e) => updateSetting('defaultBitrate', Number(e.target.value))}
                className="flex-1 h-2 bg-secondary-600 rounded-lg slider"
              />
              <span className="text-white font-medium w-16 text-right">
                {settings.defaultBitrate}
              </span>
            </div>
            <div className="flex justify-between text-xs text-secondary-400 mt-1">
              <span>1000 (Low)</span>
              <span>20000 (Ultra)</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Watermark Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-white">Add Watermark</label>
              <p className="text-xs text-secondary-400 mt-1">
                Add a watermark to exported videos
              </p>
            </div>
            <button
              onClick={() => updateSetting('watermark', !settings.watermark)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.watermark ? 'bg-primary-600' : 'bg-secondary-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.watermark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {settings.watermark && (
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Watermark Text
              </label>
              <input
                type="text"
                value={settings.watermarkText}
                onChange={(e) => updateSetting('watermarkText', e.target.value)}
                className="input"
                placeholder="Enter watermark text"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderInterfaceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => updateSetting('theme', e.target.value)}
              className="input"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="input"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">User Experience</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-white">Show Tooltips</label>
              <p className="text-xs text-secondary-400 mt-1">
                Display helpful tooltips when hovering over controls
              </p>
            </div>
            <button
              onClick={() => updateSetting('showTooltips', !settings.showTooltips)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.showTooltips ? 'bg-primary-600' : 'bg-secondary-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.showTooltips ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">About</h3>
        <div className="card bg-secondary-900">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="w-6 h-6 text-primary-500" />
            <div>
              <h4 className="text-white font-medium">Short Video Editor</h4>
              <p className="text-secondary-400 text-sm">Version 1.0.0</p>
            </div>
          </div>
          <p className="text-secondary-300 text-sm leading-relaxed">
            A modern web application for creating and editing short videos.
            Built with React, TypeScript, and modern web technologies.
          </p>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'video':
        return renderVideoSettings()
      case 'export':
        return renderExportSettings()
      case 'interface':
        return renderInterfaceSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="h-full bg-secondary-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <SettingsIcon className="w-8 h-8 text-primary-500" />
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>

          {hasChanges && (
            <div className="flex space-x-3">
              <button
                onClick={handleReset}
                className="btn-outline flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-64 space-y-2"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-300 hover:text-white hover:bg-secondary-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <div className="card">
              {renderContent()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Settings