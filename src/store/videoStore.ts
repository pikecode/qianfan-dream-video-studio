import { create } from 'zustand'

export interface VideoClip {
  id: string
  file: File
  url: string
  duration: number
  startTime: number
  endTime: number
  name: string
  thumbnail?: string
}

export interface TextOverlay {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
  color: string
  fontFamily: string
  startTime: number
  endTime: number
}

export interface VideoProject {
  id: string
  name: string
  clips: VideoClip[]
  textOverlays: TextOverlay[]
  totalDuration: number
  createdAt: Date
  updatedAt: Date
}

interface VideoState {
  // Current project
  currentProject: VideoProject | null

  // Video playback
  isPlaying: boolean
  currentTime: number
  duration: number

  // Editor state
  selectedClip: VideoClip | null
  selectedOverlay: TextOverlay | null
  timeline: VideoClip[]

  // UI state
  isLoading: boolean
  error: string | null

  // Projects list
  projects: VideoProject[]

  // Actions
  setCurrentProject: (project: VideoProject | null) => void
  createProject: (name: string) => VideoProject
  updateProject: (project: VideoProject) => void
  deleteProject: (projectId: string) => void

  // Video actions
  addClip: (clip: VideoClip) => void
  removeClip: (clipId: string) => void
  updateClip: (clipId: string, updates: Partial<VideoClip>) => void
  moveClip: (clipId: string, newIndex: number) => void

  // Text overlay actions
  addTextOverlay: (overlay: TextOverlay) => void
  removeTextOverlay: (overlayId: string) => void
  updateTextOverlay: (overlayId: string, updates: Partial<TextOverlay>) => void

  // Playback actions
  setIsPlaying: (playing: boolean) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void

  // Selection actions
  setSelectedClip: (clip: VideoClip | null) => void
  setSelectedOverlay: (overlay: TextOverlay | null) => void

  // UI actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useVideoStore = create<VideoState>((set, get) => ({
  // Initial state
  currentProject: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  selectedClip: null,
  selectedOverlay: null,
  timeline: [],
  isLoading: false,
  error: null,
  projects: [],

  // Project actions
  setCurrentProject: (project) => set({ currentProject: project }),

  createProject: (name) => {
    const newProject: VideoProject = {
      id: crypto.randomUUID(),
      name,
      clips: [],
      textOverlays: [],
      totalDuration: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    set((state) => ({
      projects: [...state.projects, newProject],
      currentProject: newProject,
    }))

    return newProject
  },

  updateProject: (project) => {
    set((state) => ({
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
      currentProject: state.currentProject?.id === project.id ? project : state.currentProject,
    }))
  },

  deleteProject: (projectId) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
      currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
    }))
  },

  // Video clip actions
  addClip: (clip) => {
    const state = get()
    if (!state.currentProject) return

    const updatedProject = {
      ...state.currentProject,
      clips: [...state.currentProject.clips, clip],
      totalDuration: state.currentProject.clips.reduce((acc, c) => acc + (c.endTime - c.startTime), 0) + (clip.endTime - clip.startTime),
      updatedAt: new Date(),
    }

    get().updateProject(updatedProject)
    set({ timeline: [...state.timeline, clip] })
  },

  removeClip: (clipId) => {
    const state = get()
    if (!state.currentProject) return

    const clipToRemove = state.currentProject.clips.find((c) => c.id === clipId)
    if (!clipToRemove) return

    const updatedProject = {
      ...state.currentProject,
      clips: state.currentProject.clips.filter((c) => c.id !== clipId),
      totalDuration: state.currentProject.totalDuration - (clipToRemove.endTime - clipToRemove.startTime),
      updatedAt: new Date(),
    }

    get().updateProject(updatedProject)
    set({
      timeline: state.timeline.filter((c) => c.id !== clipId),
      selectedClip: state.selectedClip?.id === clipId ? null : state.selectedClip,
    })
  },

  updateClip: (clipId, updates) => {
    const state = get()
    if (!state.currentProject) return

    const updatedClips = state.currentProject.clips.map((clip) =>
      clip.id === clipId ? { ...clip, ...updates } : clip
    )

    const updatedProject = {
      ...state.currentProject,
      clips: updatedClips,
      totalDuration: updatedClips.reduce((acc, c) => acc + (c.endTime - c.startTime), 0),
      updatedAt: new Date(),
    }

    get().updateProject(updatedProject)
    set({
      timeline: state.timeline.map((clip) => clip.id === clipId ? { ...clip, ...updates } : clip),
      selectedClip: state.selectedClip?.id === clipId ? { ...state.selectedClip, ...updates } : state.selectedClip,
    })
  },

  moveClip: (clipId, newIndex) => {
    const state = get()
    if (!state.currentProject) return

    const clips = [...state.currentProject.clips]
    const clipIndex = clips.findIndex((c) => c.id === clipId)

    if (clipIndex === -1) return

    const [clip] = clips.splice(clipIndex, 1)
    clips.splice(newIndex, 0, clip)

    const updatedProject = {
      ...state.currentProject,
      clips,
      updatedAt: new Date(),
    }

    get().updateProject(updatedProject)
    set({ timeline: clips })
  },

  // Text overlay actions
  addTextOverlay: (overlay) => {
    const state = get()
    if (!state.currentProject) return

    const updatedProject = {
      ...state.currentProject,
      textOverlays: [...state.currentProject.textOverlays, overlay],
      updatedAt: new Date(),
    }

    get().updateProject(updatedProject)
  },

  removeTextOverlay: (overlayId) => {
    const state = get()
    if (!state.currentProject) return

    const updatedProject = {
      ...state.currentProject,
      textOverlays: state.currentProject.textOverlays.filter((o) => o.id !== overlayId),
      updatedAt: new Date(),
    }

    get().updateProject(updatedProject)
    set({
      selectedOverlay: state.selectedOverlay?.id === overlayId ? null : state.selectedOverlay,
    })
  },

  updateTextOverlay: (overlayId, updates) => {
    const state = get()
    if (!state.currentProject) return

    const updatedProject = {
      ...state.currentProject,
      textOverlays: state.currentProject.textOverlays.map((overlay) =>
        overlay.id === overlayId ? { ...overlay, ...updates } : overlay
      ),
      updatedAt: new Date(),
    }

    get().updateProject(updatedProject)
    set({
      selectedOverlay: state.selectedOverlay?.id === overlayId ? { ...state.selectedOverlay, ...updates } : state.selectedOverlay,
    })
  },

  // Playback actions
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),

  // Selection actions
  setSelectedClip: (clip) => set({ selectedClip: clip }),
  setSelectedOverlay: (overlay) => set({ selectedOverlay: overlay }),

  // UI actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))