/*import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface SVGLayerProps {
  svgContent: string;
  coords: [number, number];
}

const SVGLayer = ({ svgContent, coords }: SVGLayerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !svgContent) return;

    // Crear un elemento div para contener el SVG
    const divElement = L.DomUtil.create('div', 'svg-overlay') as HTMLElement;
    divElement.innerHTML = svgContent;

    // Crear la capa SVG
    const svgLayer = L.svgOverlay(divElement, [
      [coords[0] - 0.5, coords[1] - 0.5], // esquina inferior izquierda
      [coords[0] + 0.5, coords[1] + 0.5]  // esquina superior derecha
    ], {
      opacity: 0.7,
      interactive: true
    }).addTo(map);

    return () => {
      map.removeLayer(svgLayer);
    };
  }, [map, svgContent, coords]);

  return null;
};

export default SVGLayer;*/
