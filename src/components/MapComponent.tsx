"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapProps {
  markers: Array<{
    id: string;
    title: string;
    lat: number;
    lng: number;
  }>;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const MapComponent: React.FC<MapProps> = ({ markers, center, zoom = 12 }) => {
  useEffect(() => {
    // Fix for default markers in react-leaflet - only run on client side
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const centerPosition: [number, number] = [center?.lat || 0, center?.lng || 0];

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={centerPosition}
        zoom={zoom}
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
            position={[marker.lat, marker.lng]}
          >
            <Popup>
              <div className="font-semibold text-gray-800">{marker.title}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent; 