import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './PhotoGallery.module.css';

const envApiUrl = import.meta.env.VITE_API_URL;
const fallbackOrigin = typeof window !== 'undefined' ? window.location.origin : '';
const API_URL = envApiUrl || (import.meta.env.PROD ? fallbackOrigin : 'http://localhost:3001');

const resolveImageUrl = (url) => {
  // Absolute URLs (http, https) are used as-is (e.g. Unsplash)
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;

  // Relative URLs (starting with /images/...) should be served from the backend
  return `${API_URL}${url}`;
};

const PhotoGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }

  const galleryImages = images.map((img) => {
    const original = resolveImageUrl(img.url);
    const thumbnail = resolveImageUrl(img.thumbnail || img.url);

    return {
      original,
      thumbnail,
      description: img.caption,
      originalAlt: img.caption,
      thumbnailAlt: img.caption,
    };
  });

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
