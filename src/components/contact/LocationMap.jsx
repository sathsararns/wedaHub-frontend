import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const ACCENT = '#bf8d5b'

// Your location
const POSITION = [7.007863, 79.963172]

// Custom tan teardrop pin
const markerIcon = L.divIcon({
  className: '',
  html: `
    <div style="position:relative;width:34px;height:46px;">
      <svg width="34" height="46" viewBox="0 0 34 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 0C7.6 0 0 7.6 0 17c0 12 17 29 17 29s17-17 17-29C34 7.6 26.4 0 17 0z" fill="${ACCENT}"/>
        <circle cx="17" cy="17" r="6" fill="#ffffff"/>
      </svg>
    </div>
  `,
  iconSize: [34, 46],
  iconAnchor: [17, 46],
})

export default function LocationMap() {
  return (
    <section
      className="w-full bg-white pb-16 sm:pb-24"
      aria-label="Our location"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-[420px] w-full overflow-hidden rounded-lg shadow-md">
          <MapContainer
            center={POSITION}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
            />

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
            />

            <Marker position={POSITION} icon={markerIcon}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold">My Office Location</h3>
                  <p>7.007863, 79.963172</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  )
}