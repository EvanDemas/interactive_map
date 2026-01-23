import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import styles from './Model3DViewer.module.css';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
};

class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (this.props.onError) {
      this.props.onError(error);
    }
    console.error('3D model render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const Model3DViewer = ({ model3d }) => {
  const [error, setError] = useState(null);
  
  if (!model3d || !model3d.hasModel || !model3d.url) {
    return null;
  }

  // Construct full URL for the model
  const envApiUrl = import.meta.env.VITE_API_URL;
  const fallbackOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const baseUrl = (envApiUrl || (import.meta.env.PROD ? fallbackOrigin : 'http://localhost:3001')).replace(/\/+$/, '');
  
  // Normalize path to avoid double slashes
  const normalizedUrl = model3d.url.startsWith('/') ? model3d.url : `/${model3d.url}`;
  const modelUrl = model3d.url.startsWith('http') ? model3d.url : `${baseUrl}${normalizedUrl}`;

  console.log('Loading 3D model from:', modelUrl);

  useEffect(() => {
    setError(null);
  }, [modelUrl]);

  return (
    <div className={styles.modelSection}>
      <h3 className={styles.sectionTitle}>3D Model</h3>
      <div className={styles.modelFrame}>
        <div className={styles.canvasWrapper}>
          {error ? (
            <div className={styles.loading}>
              <p>Error loading model: {error}</p>
            </div>
          ) : (
            <Suspense fallback={
              <div className={styles.loading}>
                <p>Loading 3D model...</p>
              </div>
            }>
              <ModelErrorBoundary
                key={modelUrl}
                onError={(e) => setError(e?.message || 'Unable to load model')}
                fallback={
                  <div className={styles.loading}>
                    <p>3D model unavailable for this building.</p>
                  </div>
                }
              >
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 2, 5]} />
                  <OrbitControls 
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    autoRotate={false}
                  />
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <spotLight position={[0, 10, 0]} angle={0.3} intensity={0.5} />
                  <Environment preset="studio" />
                  <Model url={modelUrl} />
                </Canvas>
              </ModelErrorBoundary>
            </Suspense>
          )}
        </div>
        <p className={styles.instructions}>
          Drag to rotate • Scroll to zoom • Click & drag to pan
        </p>
      </div>
    </div>
  );
};

export default Model3DViewer;
