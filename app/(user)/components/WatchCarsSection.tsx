'use client'

import { useState, useRef } from 'react'
import { Phone, Volume2, VolumeX, Play, Pause } from 'lucide-react'

interface Video {
  id: number
  videoUrl: string
  title: string
  views: string
  status: string
}

const videos: Video[] = [
  {
    id: 1,
    videoUrl:
      'https://res.cloudinary.com/dbu2lrq13/video/upload/v1769581724/WhatsApp_Video_2026-01-27_at_7.03.06_PM_txh3gc.mp4',
    title: 'Yash Car Bazaar',
    views: '10.2k views',
    status: 'Available Now',
  },
  {
    id: 2,
    videoUrl:
      'https://res.cloudinary.com/dbu2lrq13/video/upload/v1774361233/alam_video2_zlaiev.mp4',
    title: 'Yash Car Bazaar',
    views: '9.2k views',
    status: 'Available Now',
  },
]

export default function WatchCarsSection() {
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  const [mutedStates, setMutedStates] = useState<Record<number, boolean>>(
    videos.reduce((acc, video) => {
      acc[video.id] = true
      return acc
    }, {} as Record<number, boolean>)
  )

  const [playingId, setPlayingId] = useState<number | null>(null)

  // ✅ Play / Pause logic (ONLY ONE VIDEO)
  const togglePlay = (id: number) => {
    const currentVideo = videoRefs.current[id]

    if (!currentVideo) return

    // Pause all videos first
    Object.values(videoRefs.current).forEach((video) => {
      if (video) video.pause()
    })

    // If same video clicked → pause
    if (playingId === id) {
      currentVideo.pause()
      setPlayingId(null)
    } else {
      currentVideo.play()
      setPlayingId(id)
    }
  }

  const toggleMute = (id: number) => {
    setMutedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Watch Cars & <span className="text-red-800">Showroom</span>
          </h2>
          <p className="mt-3 text-gray-600 text-sm md:text-base">
            Check out our latest Instagram Reels & Video Tours
          </p>
        </div>

        {/* Videos */}
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {videos.map((video) => (
            <div key={video.id} className="w-full max-w-[320px] mx-auto">

              {/* Video Card */}
              <div className="relative rounded-[28px] overflow-hidden shadow-xl bg-black aspect-[9/16]">

                <video
                  ref={(el) => {
                    videoRefs.current[video.id] = el
                  }}
                  src={video.videoUrl}
                  muted={mutedStates[video.id]}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* ▶️ Play / Pause Button */}
                <button
                  onClick={() => togglePlay(video.id)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {playingId === video.id ? (
                    <Pause size={50} className="text-white opacity-80" />
                  ) : (
                    <Play size={50} className="text-white opacity-80" />
                  )}
                </button>

                {/* 🔊 Mute Button */}
                <button
                  onClick={() => toggleMute(video.id)}
                  className="absolute top-3 right-3 bg-black/50 p-2 rounded-full text-white"
                >
                  {mutedStates[video.id] ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                </button>

                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white text-sm font-semibold">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-200">{video.views}</p>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-4 bg-white rounded-xl shadow p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">STATUS</p>
                  <p className="text-sm font-semibold text-green-600">
                    ● {video.status}
                  </p>
                </div>

                <a
                  href="tel:+919936069962"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700
                             text-white text-sm px-4 py-2 rounded-full"
                >
                  <Phone size={14} />
                  Inquire
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}