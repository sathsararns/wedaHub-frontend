import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

// Red balloon map pin icon matching Google Maps pin styling
const redBalloonIcon = L.divIcon({
  className: '',
  html: `
    <div style="position: relative; width: 40px; height: 50px;">
      <svg width="40" height="50" viewBox="0 0 38 52" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 3px 6px rgba(0,0,0,0.35));">
        <path d="M19 0C8.50659 0 0 8.50659 0 19C0 32.25 19 52 19 52C19 52 38 32.25 38 19C38 8.50659 29.4934 0 19 0Z" fill="#EA4335"/>
        <circle cx="19" cy="19" r="8" fill="white"/>
      </svg>
    </div>
  `,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -45]
})

export default function LocationMap() {
  return (
    <section className="w-full bg-white pb-16 sm:pb-24" aria-label="Our location map">
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-[480px] w-full overflow-hidden rounded-xl shadow-md border border-neutral-100 relative">
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
        </div>
      </div>
    </section>
  )
}