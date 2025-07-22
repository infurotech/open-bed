"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MarkerData {
  position: { lat: number; lng: number };
  title: string;
  onClick?: () => void;
}

interface MapProps {
  center: { lat: number; lng: number };
  markers?: MarkerData[];
}

export default function Map({ center, markers = [] }: MapProps) {
  const centerPosition: [number, number] = [center.lat, center.lng];

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={centerPosition}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={[marker.position.lat, marker.position.lng]}
            eventHandlers={{
              click: () => marker.onClick?.(),
            }}
          >
            <Popup>
              <div className="text-center">
                <div className="font-semibold text-gray-800">{marker.title}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 