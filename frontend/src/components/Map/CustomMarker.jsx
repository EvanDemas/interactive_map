import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Custom marker icon with scrapbook pin style
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        position: relative;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 30px;
          height: 30px;
          background: #E88D67;
          border: 3px solid #5D4E37;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 12px rgba(93, 78, 55, 0.4);
          transition: all 0.3s ease;
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: white;
          border: 2px solid #5D4E37;
          border-radius: 50%;
          z-index: 1;
        "></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

const CustomMarker = ({ building, onClick }) => {
  const position = [building.location.lat, building.location.lng];

  return (
    <Marker
      position={position}
      icon={createCustomIcon()}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup>
        <div style={{
          fontFamily: 'var(--font-body)',
          maxWidth: '200px',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
            color: 'var(--ink-brown)',
          }}>
            {building.name}
          </h3>
          <p style={{
            fontSize: '0.9rem',
            marginBottom: '0.5rem',
            color: 'var(--coffee-stain)',
          }}>
            {building.location.address}
          </p>
          <p style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: '1.2rem',
            color: 'var(--accent-coral)',
            marginTop: '0.75rem',
            cursor: 'pointer',
          }}>
            Click to explore →
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

// Add hover effect via CSS
const style = document.createElement('style');
style.textContent = `
  .custom-marker:hover div:first-child {
    transform: rotate(-45deg) scale(1.2);
    box-shadow: 0 6px 16px rgba(93, 78, 55, 0.5);
  }
  
  .custom-marker {
    animation: markerDrop 0.5s ease-out;
  }
  
  @keyframes markerDrop {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }
    60% {
      transform: translateY(5px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

export default CustomMarker;
