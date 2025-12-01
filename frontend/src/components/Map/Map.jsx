import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import CustomMarker from './CustomMarker';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

const Map = ({ buildings, onBuildingClick }) => {
  const kobeCenter = [34.6901, 135.1955];
  const zoomLevel = 13;

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapContainer}>
        <MapContainer
          center={kobeCenter}
          zoom={zoomLevel}
          className={styles.leafletMap}
          zoomControl={true}
          scrollWheelZoom={true}
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
      <div className={styles.mapLabel}>
        <span className={styles.labelText}>Click a pin to explore</span>
      </div>
    </div>
  );
};

export default Map;
