import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import styles from './Model3DViewer.module.css';

const Model = ({ url }) => {
  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={1} />;
  } catch (error) {
    console.error('Error loading 3D model:', error);
    return null;
  }
};

const Model3DViewer = ({ model3d }) => {
  if (!model3d || !model3d.hasModel || !model3d.url) {
    return null;
  }

  return (
    <div className={styles.modelSection}>
      <h3 className={styles.sectionTitle}>3D Model</h3>
      <div className={styles.modelFrame}>
        <div className={styles.canvasWrapper}>
          <Suspense fallback={
            <div className={styles.loading}>
              <p>Loading 3D model...</p>
            </div>
          }>
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 2, 5]} />
              <OrbitControls 
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={2}
              />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <spotLight position={[0, 10, 0]} angle={0.3} intensity={0.5} />
              <Environment preset="studio" />
              <Model url={model3d.url} />
            </Canvas>
          </Suspense>
        </div>
        <p className={styles.instructions}>
          Drag to rotate • Scroll to zoom • Click & drag to pan
        </p>
      </div>
    </div>
  );
};

export default Model3DViewer;
