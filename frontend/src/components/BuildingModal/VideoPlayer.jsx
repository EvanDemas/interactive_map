import React from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.css';

const VideoPlayer = ({ video }) => {
  if (!video || !video.url) {
    return null;
  }

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
            light={video.thumbnail || true}
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
