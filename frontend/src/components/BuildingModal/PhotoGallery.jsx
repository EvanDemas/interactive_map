import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './PhotoGallery.module.css';

const PhotoGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }

  const galleryImages = images.map((img) => ({
    original: img.url,
    thumbnail: img.thumbnail,
    description: img.caption,
    originalAlt: img.caption,
    thumbnailAlt: img.caption,
  }));

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.polaroidFrame}>
        <ImageGallery
          items={galleryImages}
          showPlayButton={false}
          showFullscreenButton={true}
          showNav={true}
          autoPlay={false}
          slideDuration={450}
          slideInterval={3000}
        />
      </div>
    </div>
  );
};

export default PhotoGallery;
