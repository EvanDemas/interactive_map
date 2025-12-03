import React, { useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import CustomMarker from './CustomMarker';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

const Map = ({ buildings, onBuildingClick }) => {
  const kobeCenter = [34.6901, 135.1955];
  const zoomLevel = 13;
  const mapRef = useRef(null);

  const focusBisonCommunity = () => {
    if (!mapRef.current) {
      console.warn('Map instance not ready yet');
      return;
    }

    const map = mapRef.current;

    // Center roughly on the Bison Community cluster and zoom in
    const bisonCenter = [34.6938, 135.1713];
    const bisonZoom = 17;

    if (typeof map.flyTo === 'function') {
      map.flyTo(bisonCenter, bisonZoom, { duration: 1.5 });
    } else if (typeof map.setView === 'function') {
      map.setView(bisonCenter, bisonZoom, { animate: true });
    } else {
      console.warn('Map instance does not support flyTo/setView');
    }
  };

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapContainer}>
        <MapContainer
          ref={mapRef}
          center={kobeCenter}
          zoom={zoomLevel}
          className={styles.leafletMap}
          zoomControl={true}
          scrollWheelZoom={true}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {buildings.map((building) => (
            <CustomMarker
              key={building.id}
              building={building}
              onClick={() => onBuildingClick(building)}
            />
          ))}
        </MapContainer>
      </div>
      <button
        type="button"
        className={styles.mapLabel}
        onClick={focusBisonCommunity}
      >
        <span className={styles.labelText}>
          Click here to explore the Bison Community
        </span>
      </button>
    </div>
  );
};

export default Map;
