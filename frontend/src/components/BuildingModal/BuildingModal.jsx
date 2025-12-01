import React from 'react';
import Modal from '../UI/Modal';
import PhotoGallery from './PhotoGallery';
import VideoPlayer from './VideoPlayer';
import Model3DViewer from './Model3DViewer';
import styles from './BuildingModal.module.css';

const BuildingModal = ({ building, isOpen, onClose }) => {
  if (!building) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.stamp}>
            {building.metadata.yearCompleted}
          </div>
          <h2 className={styles.title}>{building.name}</h2>
          <p className={styles.address}>
            📍 {building.location.address}
          </p>
          <div className={styles.tags}>
            {building.metadata.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div className={styles.descriptionSection}>
          <div className={styles.projectType}>
            {building.metadata.projectType}
          </div>
          <p className={styles.description}>
            {building.description}
          </p>
        </div>

        {/* Photo Gallery */}
        {building.images && building.images.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Gallery</h3>
            <PhotoGallery images={building.images} />
          </div>
        )}

        {/* Video Section */}
        {building.video && building.video.url && (
          <div className={styles.section}>
            <VideoPlayer video={building.video} />
          </div>
        )}

        {/* 3D Model Section */}
        {building.model3d && building.model3d.hasModel && (
          <div className={styles.section}>
            <Model3DViewer model3d={building.model3d} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BuildingModal;
