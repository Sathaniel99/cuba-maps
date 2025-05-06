'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState, forwardRef } from 'react';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-easybutton/src/easy-button';
import '@/components/Maps.css';
import SVGLayer from '@/components/SVGLayer';

// Extender Leaflet para incluir EasyButton
declare global {
  interface Window {
    L: typeof L;
  }
}

// Configuración para los iconos del marcador
const DefaultIcon = L.icon({
  iconUrl: 'https://maps.wikimedia.org/v4/marker/pin-m-town+DC143C.png',
  iconSize: [30, 60],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center?: [number, number];
  zoom?: number;
  onResetView?: () => void;
  activeProvince?: {
    coords: [number, number];
    svg?: string;
  };
}

const Map = forwardRef<L.Map | null, MapProps>(({
  center = [21.6472, -79.6239],
  zoom = 7,
  onResetView,
  activeProvince
}, ref) => {
  const mapRef = useRef<L.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Cargar EasyButton correctamente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.L = L;
      // No necesitamos require(), ya que importamos directamente el script
    }
  }, []);

  // Exponer la instancia del mapa al componente padre
  useEffect(() => {
    if (mapRef.current) {
      if (typeof ref === 'function') {
        ref(mapRef.current);
      } else if (ref) {
        ref.current = mapRef.current;
      }
    }
  }, [ref]);

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo([21.6472, -79.6239], zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
    onResetView?.();
  };

  // Volar a las nuevas coordenadas cuando cambia el centro
  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.flyTo(center, 7, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [center]);

  function AddEasyButton({
    position,
    title,
    icon,
    onClick
  }: {
    position?: L.ControlPosition;
    title: string;
    icon: string;
    onClick: () => void;
  }) {
    const map = useMap();

    useEffect(() => {
      if (!map || !(window as any).L.easyButton) return;

      const button = (window as any).L.easyButton({
        position: position || 'topleft',
        states: [{
          stateName: 'default',
          icon: icon,
          title,
          onClick
        }],
        tagName: 'button',
        className: 'leaflet-bar easy-button-custom bg-white/80 hover:bg-white'
      });

      button.addTo(map);

      return () => {
        button.remove();
      };
    }, [map, position, title, icon, onClick]);

    return null;
  }
  return (
    <MapContainer
      ref={(instance) => {
        mapRef.current = instance;
        if (ref) {
          if (typeof ref === 'function') {
            ref(instance);
          } else {
            ref.current = instance;
          }
        }
      }}
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      className="rounded-sm z-0"
      whenReady={() => setMapReady(true)}
      zoomControl={false}
    >
      
      <TileLayer
      //  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      ///>
      //<TileLayer
        url="http://mapas.geocuba.cu/geoserver/gwc/service/wmts?service=wmts&request=GetTile&version=1.0.0&layer=satelite&style=&tilematrixset=EPSG:900913&tilematrix=EPSG:900913:{z}&tilerow={y}&tilecol={x}&format=image/png"
        attribution='&copy; GEOCUBA'
      />

      {activeProvince && (
        <>
          <Marker position={center}>
            <Popup>
              <div className=''>
                <h2 className='text-2xl font-bold'>{activeProvince.name}</h2>
              </div>
            </Popup>
          </Marker>
        </>
      )}
      
      {mapReady && (
        <AddEasyButton
          title="Volver a vista general"
          icon='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'
          onClick={handleResetView}
        />
      )}
    </MapContainer>
  );
});

Map.displayName = 'Map';

export default Map;
