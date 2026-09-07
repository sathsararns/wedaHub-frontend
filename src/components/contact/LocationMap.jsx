import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { motion } from 'framer-motion'

// Coordinates for Colombo 05, Sri Lanka
const POSITION = [6.8909, 79.8601]

// Fixes potential map tile rendering issues on initial load
function MapResizeTrigger() {
  const map = useMap()

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 100)

    return () => clearTimeout(timer)
  }, [map])

  return null
}

// Red balloon map pin icon matching Google Maps pin styling.
// This markup is handed to Leaflet directly (it renders outside React's
// tree), so the drop-in and pulse animations here are plain CSS rather
// than Framer Motion — Framer can't reach into Leaflet's own DOM.
const redBalloonIcon = L.divIcon({
  className: '',
  html: `
    <div style="position: relative; width: 40px; height: 50px;">
      <span class="map-pin-pulse" style="position:absolute; left:50%; top:19px; width:16px; height:16px; margin-left:-8px; margin-top:-8px; border-radius:9999px; background:rgba(234,67,53,0.45);"></span>
      <svg class="map-pin-drop" width="40" height="50" viewBox="0 0 38 52" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:relative; filter: drop-shadow(0px 3px 6px rgba(0,0,0,0.35));">
        <path d="M19 0C8.50659 0 0 8.50659 0 19C0 32.25 19 52 19 52C19 52 38 32.25 38 19C38 8.50659 29.4934 0 19 0Z" fill="#EA4335"/>
        <circle cx="19" cy="19" r="8" fill="white"/>
      </svg>
    </div>
    <style>
      .map-pin-drop {
        animation: mapPinDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
      }
      .map-pin-pulse {
        animation: mapPinPulse 2.2s ease-out infinite;
        animation-delay: 0.6s;
      }
      @keyframes mapPinDrop {
        from { transform: translateY(-24px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes mapPinPulse {
        0% { transform: scale(0.6); opacity: 0.6; }
        100% { transform: scale(2.4); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .map-pin-drop, .map-pin-pulse { animation: none; }
      }
    </style>
  `,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -45]
})

export default function LocationMap() {
  return (
    <section className="w-full bg-white pb-14 sm:pb-16 md:pb-24" aria-label="Our location map">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="h-[320px] sm:h-[400px] md:h-[480px] w-full overflow-hidden rounded-xl shadow-md border border-neutral-100 relative"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <MapContainer
            center={POSITION}
            zoom={15}
            scrollWheelZoom={false}
            style={{
              height: '100%',
              width: '100%'
            }}
          >
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Red balloon pin marker placed at Colombo 05 */}
            <Marker position={POSITION} icon={redBalloonIcon}>
              <Popup>
                <div className="text-center p-1">
                  <h3 className="font-bold text-neutral-900">Service Hub Headquarters</h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    123 Service Hub Road, <br />
                    Colombo 05, SL
                  </p>
                </div>
              </Popup>
            </Marker>

            <MapResizeTrigger />
          </MapContainer>
        </motion.div>
      </div>
    </section>
  )
}