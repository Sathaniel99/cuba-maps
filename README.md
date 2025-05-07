# Mapa de Cuba (Aun no terminado)

Este proyecto es una aplicación web que muestra un mapa interactivo de Cuba, permitiendo a los usuarios explorar las diferentes provincias del país. La aplicación está construida utilizando React y Leaflet para la visualización del mapa.

## Características

- **Mapa Interactivo**: Utiliza Leaflet para mostrar un mapa de Cuba con marcadores para cada provincia.
- **Información de Provincias**: Al hacer clic en una provincia, se muestra información detallada y un enlace a su página de Wikipedia.
- **Diseño Responsivo**: Interfaz de usuario adaptable a diferentes tamaños de pantalla.
- **Componentes Reutilizables**: Uso de componentes de React para una estructura modular y fácil de mantener.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Leaflet**: Biblioteca de JavaScript para mapas interactivos.
- **TypeScript**: Para tipado estático y mejora de la calidad del código.
- **Tailwind CSS**: Para estilos y diseño responsivo.

## Estructura del Proyecto

- **`App.tsx`**: Componente principal de la aplicación que contiene la lógica y la estructura de la interfaz de usuario.
- **`Maps.tsx`**: Componente que maneja la visualización del mapa utilizando Leaflet.
- **`components/ui/button`**: Componente de botón reutilizable.
- **`App.css`**: Estilos globales de la aplicación.
- **`Maps.css`**: Estilos específicos para el componente del mapa.

## Instalación

1. Clona el repositorio:
```bash
  git clone https://github.com/tu-usuario/mapa-de-cuba.git
```

2. Navega al directorio del proyecto:
```bash
  cd mapa-de-cuba
```

3. Instala las dependencias:
```bash
  npm install
```

4. Inicia la aplicación:
```bash
  npm start
```

## Uso

- **Selección de Provincia**: Haz clic en el nombre de una provincia en el panel lateral para centrar el mapa en esa provincia y mostrar información adicional.
- **Vista General**: Utiliza el botón en la esquina superior izquierda del mapa para volver a la vista general de Cuba.

## ¡Gracias por usar el Mapa de Cuba! Espero que encuentres útil esta herramienta para explorar las provincias de Cuba.