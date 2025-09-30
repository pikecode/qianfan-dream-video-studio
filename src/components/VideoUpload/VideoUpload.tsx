import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, Video, AlertCircle } from 'lucide-react'
import { useVideoStore } from '@/store/videoStore'
import { VideoClip } from '@/store/videoStore'
import toast from 'react-hot-toast'

interface VideoUploadProps {
  onUpload?: (clips: VideoClip[]) => void
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload }) => {
  const { addClip, setLoading, setError } = useVideoStore()

  const createVideoClip = async (file: File): Promise<VideoClip> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      const url = URL.createObjectURL(file)

      video.onloadedmetadata = () => {
        const clip: VideoClip = {
          id: crypto.randomUUID(),
          file,
          url,
          duration: video.duration,
          startTime: 0,
          endTime: video.duration,
          name: file.name.split('.')[0],
        }
        resolve(clip)
      }

      video.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to load video'))
      }

      video.src = url
    })
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setLoading(true)
    setError(null)

    try {
      const videoFiles = acceptedFiles.filter(file =>
        file.type.startsWith('video/') && file.size <= 100 * 1024 * 1024 // 100MB limit
      )

      if (videoFiles.length === 0) {
        toast.error('Please select valid video files (max 100MB each)')
        return
      }

      const clips: VideoClip[] = []

      for (const file of videoFiles) {
        try {
          const clip = await createVideoClip(file)
          clips.push(clip)
          addClip(clip)
        } catch (error) {
          console.error('Error processing video:', file.name, error)
          toast.error(`Failed to process ${file.name}`)
        }
      }

      if (clips.length > 0) {
        toast.success(`Successfully imported ${clips.length} video${clips.length > 1 ? 's' : ''}`)
        onUpload?.(clips)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to upload videos'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [addClip, setLoading, setError, onUpload])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.mov', '.avi', '.mkv'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: true,
  })

  return (
    <div className="w-full">
      <motion.div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive && !isDragReject
            ? 'border-primary-500 bg-primary-500/10'
            : isDragReject
            ? 'border-red-500 bg-red-500/10'
            : 'border-secondary-600 hover:border-secondary-500 hover:bg-secondary-800/50'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`
              p-4 rounded-full
              ${isDragActive && !isDragReject
                ? 'bg-primary-500/20 text-primary-400'
                : isDragReject
                ? 'bg-red-500/20 text-red-400'
                : 'bg-secondary-700 text-secondary-400'
              }
            `}
          >
            {isDragReject ? (
              <AlertCircle className="w-8 h-8" />
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </motion.div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {isDragActive
                ? isDragReject
                  ? 'Invalid file type'
                  : 'Drop videos here'
                : 'Upload Videos'
              }
            </h3>

            <p className="text-secondary-400 mb-4">
              {isDragActive
                ? isDragReject
                  ? 'Please select valid video files'
                  : 'Release to upload'
                : 'Drag & drop videos here, or click to browse'
              }
            </p>

            <div className="flex items-center justify-center space-x-4 text-sm text-secondary-500">
              <div className="flex items-center">
                <Video className="w-4 h-4 mr-1" />
                MP4, WebM, MOV, AVI, MKV
              </div>
              <div>Max 100MB per file</div>
            </div>
          </div>
        </div>

        {/* Upload Animation */}
        {isDragActive && !isDragReject && (
          <motion.div
            className="absolute inset-0 border-2 border-primary-500 rounded-xl"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          />
        )}
      </motion.div>

      {/* File Rejection Errors */}
      {fileRejections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <h4 className="text-red-400 font-medium mb-2">Upload Errors:</h4>
          <ul className="text-red-300 text-sm space-y-1">
            {fileRejections.map(({ file, errors }) => (
              <li key={file.name}>
                <strong>{file.name}:</strong>{' '}
                {errors.map(error => error.message).join(', ')}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

export default VideoUpload