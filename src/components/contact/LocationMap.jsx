import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const POSITION = [7.007863, 79.963172]

// Component to fix missing/misaligned map tiles
function MapResizeTrigger() {
  const map = useMap()
  
  useEffect(() => {
    // Small timeout ensures the DOM layout is 100% complete
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [map])

  return null
}

const markerIcon = L.divIcon({
  className: '',
  html: `
    <div style="position:relative; width:45px; height:55px;">
      <div style="
        position:absolute;
        width:42px;
        height:42px;
        background:#bf8d5b;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 3px 8px rgba(0,0,0,0.25);
      ">
        <div style="
          position:absolute;
          width:14px;
          height:14px;
          background:white;
          border-radius:50%;
          top:14px;
          left:14px;
        "></div>
      </div>
    </div>
  `,
  iconSize: [45, 55],
  iconAnchor: [22, 55]
})

export default function LocationMap() {
  return (
    <section className="w-full bg-white" aria-label="Our location map">
      <div className="h-120 w-full overflow-hidden shadow-inner relative">
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

          <Marker position={POSITION} icon={markerIcon}>
            <Popup>
              <div className="text-center p-1">
                <h3 className="font-bold text-neutral-900">Our Office Location</h3>
                <p className="text-xs text-neutral-600 mt-1">
                  No. 23, Colombo - Kandy Road, Eldeniya, Kadawatha, Sri Lanka
                </p>
              </div>
            </Popup>
          </Marker>

          {/* This fixes the missing tiles bug */}
          <MapResizeTrigger />
        </MapContainer>
      </div>
    </section>
  )
}