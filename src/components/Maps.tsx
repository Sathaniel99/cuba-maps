'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-easybutton/src/easy-button';
import '@/components/Maps.css'

// Declaración de tipos para easyButton
declare module 'leaflet' {
  interface EasyButtonStatic {
    new (icon: string, onClick: () => void, title?: string, options?: any): any;
    new (options: any): any;
  }
  let easyButton: EasyButtonStatic;
}

// Configuración para los iconos del marcador
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center?: [number, number];
  zoom?: number;
  onResetView?: () => void; // Nueva prop para resetear la vista
}

function AddEasyButton({ 
  position, 
  title, 
  icon, 
  onClick 
}: { 
  position?: L.ControlPosition; 
  title: string; 
  icon: string; 
  onClick: () => void 
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const button = (L as any).easyButton({
      position: position || 'topleft',
      states: [{
        stateName: 'default',
        icon: icon,
        title,
        onClick: () => onClick()
      }],
      tagName: 'button',
      className: 'leaflet-bar easy-button-custom'
    });

    button.addTo(map);

    return () => {
      button.remove();
    };
  }, [map, position, title, icon, onClick]);

  return null;
}

export default function Map({ 
  center = [21.6472, -79.6239], 
  zoom = 7,
  onResetView 
}: MapProps) {
  const mapRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

  const handleResetView = () => {
    // Vuelve a la vista por defecto
    if (mapRef.current) {
      mapRef.current.flyTo([21.6472, -79.6239], 7, {
        duration: 1.5
      });
    }
    // Llama a la función para resetear el estado en el componente padre
    if (onResetView) {
      onResetView();
    }
  };

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      className="rounded-sm z-0"
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      boxZoom={false}
      keyboard={false}
      zoomControl={false}
      whenReady={() => setMapReady(true)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {center && (
        <Marker position={center}>
          <Popup>
            <div className="text-center">
              <p className="font-medium">Ubicación seleccionada</p>
            </div>
          </Popup>
        </Marker>
      )}

      {mapReady && (
        <AddEasyButton
          position="topleft"
          title="Volver a vista general"
          icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'
          onClick={handleResetView}
        />
      )}
    </MapContainer>
  );
}