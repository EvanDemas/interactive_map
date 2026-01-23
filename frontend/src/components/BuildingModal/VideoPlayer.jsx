  import React from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.css';

const VideoPlayer = ({ video }) => {
  if (!video || !video.url) {
    return null;
  }

  // Construct full URL for the thumbnail
  const envApiUrl = import.meta.env.VITE_API_URL;
  const fallbackOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const API_URL = envApiUrl || (import.meta.env.PROD ? fallbackOrigin : 'http://localhost:3001');
  
  // Normalize path to avoid double slashes
  const normalizedThumbUrl = video.thumbnail && video.thumbnail.startsWith('/') ? video.thumbnail : `/${video.thumbnail || ''}`;
  const thumbnailUrl = video.thumbnail && !video.thumbnail.startsWith('http') 
    ? `${API_URL}${normalizedThumbUrl}` 
    : video.thumbnail;

  return (
    <div className={styles.videoSection}>
      <h3 className={styles.sectionTitle}>Project Video</h3>
      <div className={styles.videoFrame}>
        <div className={styles.playerWrapper}>
          <ReactPlayer
            url={video.url}
            width="100%"
            height="100%"
            controls={true}
            light={thumbnailUrl || true}
            playing={false}
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
