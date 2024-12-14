// app/components/magical-video-player/page.tsx
'use client'

import { useState } from 'react'

export default function MagicalVideoPlayer() {
  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[7].length === 11) ? match[7] : null
  }

  const handleUrlSubmit = () => {
    setError('')
    setIsLoading(true)
    
    const id = extractVideoId(videoUrl)
    if (id) {
      setVideoId(id)
    } else {
      setError('Invalid YouTube URL')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="w-[700px] h-[700px] bg-indigo-950 text-purple-100 overflow-auto p-6 font-serif relative">
      {/* Magical background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-indigo-950 to-indigo-950 animate-pulse" />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-200">
          Mystical Video Portal
        </h2>

        {/* URL Input */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-purple-500/20 blur-xl" />
          <div className="relative flex gap-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste your YouTube spell scroll here..."
              className="flex-1 h-12 bg-purple-900/50 rounded-lg border-2 border-purple-400 px-4 
                         text-purple-100 placeholder:text-purple-300
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleUrlSubmit}
              className="px-6 h-12 bg-purple-600 hover:bg-purple-500 
                       rounded-lg transition-colors duration-300
                       border-2 border-purple-400 font-medium"
            >
              Cast Spell
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-400 text-center mb-4 animate-fade-in">
            {error}
          </div>
        )}

        {/* Video Display */}
        <div className="relative">
          {/* Decorative frame */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-purple-400/20 to-purple-500/20 rounded-lg blur-sm" />
          
          <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-purple-500 rounded-full animate-spin border-t-transparent" />
              </div>
            ) : videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-purple-300">
                <p className="text-center">
                  The portal awaits your YouTube enchantment...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Magical decorative elements */}
        {videoId && (
          <div className="absolute -inset-1 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>
        )}
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-300/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}