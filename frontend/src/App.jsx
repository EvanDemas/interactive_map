import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Map from './components/Map/Map';
import BuildingModal from './components/BuildingModal/BuildingModal';
import Loading from './components/UI/Loading';
import { useFetchBuildings } from './hooks/useFetchBuildings';
import './styles/global.css';
import './styles/scrapbook-theme.css';
import styles from './App.module.css';

function App() {
  const { buildings, loading, error } = useFetchBuildings();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBuilding(null), 300);
  };

  if (loading) {
    return (
      <div className={styles.app}>
        <Header />
        <Loading />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.app}>
        <Header />
        <div className={styles.error}>
          <div className={styles.errorContent}>
            <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
            <p className={styles.errorMessage}>{error}</p>
            <p className={styles.errorHint}>
              Make sure the backend server is running on port 3001
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.introText}>
            Explore our collection of architectural renovations across Kobe. 
            Each pin represents a unique project that blends heritage with innovation.
          </p>
        </div>
        <Map buildings={buildings} onBuildingClick={handleBuildingClick} />
      </main>
      <Footer />
      <BuildingModal
        building={selectedBuilding}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
