import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { VideoClip } from '@/store/videoStore'
import { formatTime } from '@/utils/timeFormat'

interface TimelineClipProps {
  clip: VideoClip
  scale: number
  position: number
  isSelected: boolean
  isDragging: boolean
  onSelect: () => void
  onTrim: (newStart: number, newEnd: number) => void
  onDragStart: () => void
  onDragEnd: () => void
  onMove: (newPosition: number) => void
}

const TimelineClip: React.FC<TimelineClipProps> = ({
  clip,
  scale,
  position,
  isSelected,
  isDragging,
  onSelect,
  onTrim,
  onDragStart,
  onDragEnd,
  onMove,
}) => {
  const clipRef = useRef<HTMLDivElement>(null)
  const [isResizing, setIsResizing] = useState<'start' | 'end' | null>(null)
  const [dragStart, setDragStart] = useState<{ x: number; position: number } | null>(null)

  const clipDuration = clip.endTime - clip.startTime
  const clipWidth = clipDuration * scale

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation()
    onSelect()

    if (event.target === clipRef.current) {
      // Start dragging the entire clip
      setDragStart({
        x: event.clientX,
        position,
      })
      onDragStart()
    }
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (dragStart) {
      const deltaX = event.clientX - dragStart.x
      const newPosition = dragStart.position + deltaX
      onMove(Math.max(0, newPosition))
    }
  }

  const handleMouseUp = () => {
    if (dragStart) {
      setDragStart(null)
      onDragEnd()
    }
    if (isResizing) {
      setIsResizing(null)
    }
  }

  const handleResizeStart = (edge: 'start' | 'end', event: React.MouseEvent) => {
    event.stopPropagation()
    setIsResizing(edge)
    onSelect()
  }

  const handleResizeMove = (event: MouseEvent) => {
    if (!isResizing) return

    const deltaX = event.movementX
    const deltaTime = deltaX / scale

    if (isResizing === 'start') {
      const newStartTime = Math.max(0, Math.min(clip.endTime - 0.1, clip.startTime + deltaTime))
      onTrim(newStartTime, clip.endTime)
    } else if (isResizing === 'end') {
      const newEndTime = Math.max(clip.startTime + 0.1, Math.min(clip.duration, clip.endTime + deltaTime))
      onTrim(clip.startTime, newEndTime)
    }
  }

  // Mouse event listeners
  React.useEffect(() => {
    if (dragStart || isResizing) {
      document.addEventListener('mousemove', isResizing ? handleResizeMove : handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', isResizing ? handleResizeMove : handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragStart, isResizing])

  return (
    <motion.div
      ref={clipRef}
      className={`
        absolute top-2 h-16 rounded-lg cursor-pointer select-none
        transition-all duration-200 group
        ${isSelected
          ? 'ring-2 ring-primary-500 bg-primary-600/20 border-primary-500'
          : 'bg-secondary-700 border-secondary-600 hover:bg-secondary-600'
        }
        ${isDragging ? 'z-10 shadow-2xl' : 'z-0'}
        border-2
      `}
      style={{
        left: position,
        width: Math.max(20, clipWidth),
      }}
      onMouseDown={handleMouseDown}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: isDragging ? 1.05 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Resize Handle - Start */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onMouseDown={(e) => handleResizeStart('start', e)}
      />

      {/* Clip Content */}
      <div className="h-full px-2 py-1 flex flex-col justify-between overflow-hidden">
        <div className="flex-1 min-h-0">
          <div className="text-xs font-medium text-white truncate">
            {clip.name}
          </div>
          <div className="text-xs text-secondary-300 mt-1">
            {formatTime(clipDuration)}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {clip.thumbnail && (
          <div className="h-8 bg-secondary-800 rounded overflow-hidden">
            <img
              src={clip.thumbnail}
              alt={clip.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 rounded-b-lg" />
      )}

      {/* Resize Handle - End */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onMouseDown={(e) => handleResizeStart('end', e)}
      />

      {/* Clip Info Tooltip */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
        {clip.name} • {formatTime(clip.startTime)} - {formatTime(clip.endTime)}
      </div>
    </motion.div>
  )
}

export default TimelineClip