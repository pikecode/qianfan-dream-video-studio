import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Type, Palette, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react'
import { useVideoStore, TextOverlay } from '@/store/videoStore'
import toast from 'react-hot-toast'

interface TextOverlayEditorProps {
  className?: string
}

const TextOverlayEditor: React.FC<TextOverlayEditorProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingOverlay, setEditingOverlay] = useState<TextOverlay | null>(null)

  const {
    currentProject,
    textOverlays,
    currentTime,
    selectedOverlay,
    addTextOverlay,
    updateTextOverlay,
    removeTextOverlay,
    setSelectedOverlay,
  } = useVideoStore()

  const [overlayData, setOverlayData] = useState({
    text: 'Your text here',
    x: 100,
    y: 100,
    fontSize: 32,
    color: '#ffffff',
    fontFamily: 'Arial',
    startTime: 0,
    endTime: 5,
    alignment: 'left' as 'left' | 'center' | 'right',
    bold: false,
    italic: false,
    underline: false,
  })

  const fontFamilies = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Verdana',
    'Courier New',
    'Impact',
    'Comic Sans MS',
  ]

  const colorPresets = [
    '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
  ]

  const handleAddOverlay = () => {
    if (!currentProject) {
      toast.error('Please create or select a project first')
      return
    }

    const newOverlay: TextOverlay = {
      id: crypto.randomUUID(),
      text: overlayData.text,
      x: overlayData.x,
      y: overlayData.y,
      fontSize: overlayData.fontSize,
      color: overlayData.color,
      fontFamily: overlayData.fontFamily,
      startTime: Math.max(0, currentTime),
      endTime: Math.max(currentTime + 5, overlayData.endTime),
    }

    addTextOverlay(newOverlay)
    setSelectedOverlay(newOverlay)
    toast.success('Text overlay added')
  }

  const handleUpdateOverlay = () => {
    if (!selectedOverlay) return

    updateTextOverlay(selectedOverlay.id, {
      text: overlayData.text,
      fontSize: overlayData.fontSize,
      color: overlayData.color,
      fontFamily: overlayData.fontFamily,
      startTime: overlayData.startTime,
      endTime: overlayData.endTime,
    })

    toast.success('Text overlay updated')
  }

  const handleDeleteOverlay = () => {
    if (!selectedOverlay) return

    removeTextOverlay(selectedOverlay.id)
    setSelectedOverlay(null)
    toast.success('Text overlay removed')
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height

    setOverlayData(prev => ({ ...prev, x, y }))
  }

  const getFontStyle = () => {
    let style = ''
    if (overlayData.bold) style += 'bold '
    if (overlayData.italic) style += 'italic '
    return style + overlayData.fontSize + 'px ' + overlayData.fontFamily
  }

  // Load selected overlay data
  React.useEffect(() => {
    if (selectedOverlay) {
      setOverlayData({
        text: selectedOverlay.text,
        x: selectedOverlay.x,
        y: selectedOverlay.y,
        fontSize: selectedOverlay.fontSize,
        color: selectedOverlay.color,
        fontFamily: selectedOverlay.fontFamily,
        startTime: selectedOverlay.startTime,
        endTime: selectedOverlay.endTime,
        alignment: 'left',
        bold: false,
        italic: false,
        underline: false,
      })
      setIsEditing(true)
      setEditingOverlay(selectedOverlay)
    } else {
      setIsEditing(false)
      setEditingOverlay(null)
    }
  }, [selectedOverlay])

  return (
    <div className={`${className} bg-secondary-800 rounded-lg`}>
      <div className="p-4 border-b border-secondary-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Type className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg font-semibold text-white">Text Overlays</h3>
          </div>
          <button
            onClick={handleAddOverlay}
            className="btn-primary text-sm"
            disabled={!currentProject}
          >
            Add Text
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-secondary-300 mb-2">
            Text Content
          </label>
          <textarea
            value={overlayData.text}
            onChange={(e) => setOverlayData(prev => ({ ...prev, text: e.target.value }))}
            className="input h-20 resize-none"
            placeholder="Enter your text here..."
            rows={3}
          />
        </div>

        {/* Font Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Font Family
            </label>
            <select
              value={overlayData.fontFamily}
              onChange={(e) => setOverlayData(prev => ({ ...prev, fontFamily: e.target.value }))}
              className="input"
            >
              {fontFamilies.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Font Size
            </label>
            <input
              type="number"
              value={overlayData.fontSize}
              onChange={(e) => setOverlayData(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
              className="input"
              min="12"
              max="200"
            />
          </div>
        </div>

        {/* Text Styling */}
        <div>
          <label className="block text-sm font-medium text-secondary-300 mb-2">
            Style
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setOverlayData(prev => ({ ...prev, bold: !prev.bold }))}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                overlayData.bold
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-700 text-secondary-300 hover:bg-secondary-600'
              }`}
            >
              <Bold className="w-4 h-4" />
            </button>

            <button
              onClick={() => setOverlayData(prev => ({ ...prev, italic: !prev.italic }))}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                overlayData.italic
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-700 text-secondary-300 hover:bg-secondary-600'
              }`}
            >
              <Italic className="w-4 h-4" />
            </button>

            <button
              onClick={() => setOverlayData(prev => ({ ...prev, underline: !prev.underline }))}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                overlayData.underline
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-700 text-secondary-300 hover:bg-secondary-600'
              }`}
            >
              <Underline className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-secondary-600 mx-2" />

            <button
              onClick={() => setOverlayData(prev => ({ ...prev, alignment: 'left' }))}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                overlayData.alignment === 'left'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-700 text-secondary-300 hover:bg-secondary-600'
              }`}
            >
              <AlignLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setOverlayData(prev => ({ ...prev, alignment: 'center' }))}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                overlayData.alignment === 'center'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-700 text-secondary-300 hover:bg-secondary-600'
              }`}
            >
              <AlignCenter className="w-4 h-4" />
            </button>

            <button
              onClick={() => setOverlayData(prev => ({ ...prev, alignment: 'right' }))}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                overlayData.alignment === 'right'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-700 text-secondary-300 hover:bg-secondary-600'
              }`}
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium text-secondary-300 mb-2">
            Text Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={overlayData.color}
              onChange={(e) => setOverlayData(prev => ({ ...prev, color: e.target.value }))}
              className="w-12 h-8 rounded border border-secondary-600 bg-secondary-700"
            />
            <div className="flex space-x-1">
              {colorPresets.map(color => (
                <button
                  key={color}
                  onClick={() => setOverlayData(prev => ({ ...prev, color }))}
                  className="w-6 h-6 rounded border border-secondary-600 hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Position */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              X Position
            </label>
            <input
              type="number"
              value={Math.round(overlayData.x)}
              onChange={(e) => setOverlayData(prev => ({ ...prev, x: Number(e.target.value) }))}
              className="input"
              min="0"
              max="1920"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Y Position
            </label>
            <input
              type="number"
              value={Math.round(overlayData.y)}
              onChange={(e) => setOverlayData(prev => ({ ...prev, y: Number(e.target.value) }))}
              className="input"
              min="0"
              max="1080"
            />
          </div>
        </div>

        {/* Timing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Start Time (s)
            </label>
            <input
              type="number"
              value={overlayData.startTime}
              onChange={(e) => setOverlayData(prev => ({ ...prev, startTime: Number(e.target.value) }))}
              className="input"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              End Time (s)
            </label>
            <input
              type="number"
              value={overlayData.endTime}
              onChange={(e) => setOverlayData(prev => ({ ...prev, endTime: Number(e.target.value) }))}
              className="input"
              min="0"
              step="0.1"
            />
          </div>
        </div>

        {/* Preview Canvas */}
        <div>
          <label className="block text-sm font-medium text-secondary-300 mb-2">
            Position Preview (Click to place)
          </label>
          <canvas
            ref={canvasRef}
            width={320}
            height={180}
            className="w-full bg-secondary-900 border border-secondary-600 rounded cursor-crosshair"
            onClick={handleCanvasClick}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-secondary-700">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdateOverlay}
                className="btn-primary flex-1"
              >
                Update Overlay
              </button>
              <button
                onClick={handleDeleteOverlay}
                className="btn bg-red-600 text-white hover:bg-red-700 px-4"
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={handleAddOverlay}
              className="btn-primary flex-1"
              disabled={!currentProject}
            >
              Add Overlay
            </button>
          )}
        </div>
      </div>

      {/* Overlay List */}
      {textOverlays.length > 0 && (
        <div className="border-t border-secondary-700">
          <div className="p-4">
            <h4 className="text-sm font-medium text-secondary-300 mb-3">
              Text Overlays ({textOverlays.length})
            </h4>
            <div className="space-y-2">
              {textOverlays.map((overlay) => (
                <motion.div
                  key={overlay.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOverlay?.id === overlay.id
                      ? 'bg-primary-600/20 border border-primary-500'
                      : 'bg-secondary-700 hover:bg-secondary-600'
                  }`}
                  onClick={() => setSelectedOverlay(overlay)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {overlay.text}
                      </p>
                      <p className="text-xs text-secondary-400">
                        {overlay.startTime}s - {overlay.endTime}s • {overlay.fontFamily} {overlay.fontSize}px
                      </p>
                    </div>
                    <div
                      className="w-4 h-4 rounded border border-secondary-500 ml-2"
                      style={{ backgroundColor: overlay.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TextOverlayEditor