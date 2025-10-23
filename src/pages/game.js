import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import './topic1.css';
import { saveGameResult } from '../utils/accountUtils';

const MissionAuroraGame = () => {
  const [gameState, setGameState] = useState('intro'); 
  const [currentPhase, setCurrentPhase] = useState(1);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0); 
  const [anomaliesFound, setAnomaliesFound] = useState(0);
  const [scannerPosition, setScannerPosition] = useState({ x: 50, y: 50 });
  const [anomalies, setAnomalies] = useState([]);
  const [fieldValue, setFieldValue] = useState(47000);
  const [stabilizeAttempts, setStabilizeAttempts] = useState(0);
  const [stormIntensity, setStormIntensity] = useState(50);
  const [badges, setBadges] = useState([]);
  const [timeLeft, setTimeLeft] = useState(180); 
  const [failureReason, setFailureReason] = useState(''); 
  

  const [phase2Step, setPhase2Step] = useState(1); 
  const [measurements, setMeasurements] = useState({
    intensity: 0,
    inclination: 0,
    declination: 0,
    totalField: 0
  });
  const [targetMeasurements] = useState({
    intensity: 47500,
    inclination: 62,
    declination: 0,
    totalField: 52000
  });
  const [measurementAttempts, setMeasurementAttempts] = useState({
    intensity: 0,
    inclination: 0,
    declination: 0,
    totalField: 0
  });
  const [phase2Timer, setPhase2Timer] = useState(120); 
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [environmentalFactors, setEnvironmentalFactors] = useState({
    solarActivity: Math.random() * 100,
    atmosphericNoise: Math.random() * 50,
    temperature: Math.random() * 30 
  });
  const mapRef = useRef(null);
  const stormIntervalRef = useRef(null);

  const handleBackToHome = () => {
    window.location.hash = '';
  };


  useEffect(() => {
    if (gameState === 'phase1') {
      const newAnomalies = [];
      const centerX = 50; 
      const centerY = 50; 
      const planetRadius = 15; 
      
      for (let i = 0; i < 5; i++) {
        let x, y, distance;
   
        do {
          const angle = Math.random() * 2 * Math.PI;
          const radius = Math.random() * planetRadius * 0.8; 
          
          x = centerX + radius * Math.cos(angle);
          y = centerY + radius * Math.sin(angle);
          
          distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        } while (distance > planetRadius * 0.8);
        
        newAnomalies.push({
          id: i,
          x: x,
          y: y,
          found: false
        });
      }
      setAnomalies(newAnomalies);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'phase1' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'phase1' && timeLeft <= 0) {
      setFailureReason('phase1-timeout');
      
      saveGameResult(score, 1, false, {
        failureReason: 'phase1-timeout',
        anomaliesFound: anomaliesFound,
        gameType: 'Mission Aurora'
      });
      
      setGameState('failure');
    }
    
    if (gameState === 'phase2' && phase2Timer > 0) {
      const timer = setTimeout(() => setPhase2Timer(phase2Timer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'phase2' && phase2Timer <= 0) {
      setFailureReason('phase2-timeout');
      
      saveGameResult(score, 2, false, {
        failureReason: 'phase2-timeout',
        anomaliesFound: anomaliesFound,
        phase2Step: phase2Step,
        gameType: 'Mission Aurora'
      });
      
      setGameState('failure');
    }
  }, [gameState, timeLeft, phase2Timer, score, anomaliesFound, phase2Step]);

  useEffect(() => {
    if (gameState === 'phase3') {
      stormIntervalRef.current = setInterval(() => {
        setStormIntensity(Math.random() * 100);
      }, 1000);
    } else {
      if (stormIntervalRef.current) {
        clearInterval(stormIntervalRef.current);
      }
    }
    return () => {
      if (stormIntervalRef.current) {
        clearInterval(stormIntervalRef.current);
      }
    };
  }, [gameState]);

  useEffect(() => {
    if (isCalibrating) {
      const interval = setInterval(() => {
        setCalibrationProgress(prev => {
          if (prev >= 100) {
            setIsCalibrating(false);
            return 0;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isCalibrating]);

  useEffect(() => {
    if (gameState === 'phase2') {
      const interval = setInterval(() => {
        setEnvironmentalFactors(prev => ({
          solarActivity: Math.max(0, Math.min(100, prev.solarActivity + (Math.random() - 0.5) * 10)),
          atmosphericNoise: Math.max(0, Math.min(50, prev.atmosphericNoise + (Math.random() - 0.5) * 5)),
          temperature: Math.max(0, Math.min(40, prev.temperature + (Math.random() - 0.5) * 2)) // Keep temperature >= 0°C
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('phase1');
    setCurrentPhase(1);
    setScore(0);
    setMistakes(0); 
    setAnomaliesFound(0);
    setStabilizeAttempts(0);
    setTimeLeft(180);
    setBadges([]);
    setFailureReason(''); 
    
    setPhase2Step(1);
    setPhase2Timer(120);
    setMeasurementAttempts({
      intensity: 0,
      inclination: 0,
      declination: 0,
      totalField: 0
    });
    setIsCalibrating(false);
    setCalibrationProgress(0);
  };

  const handleMapClick = (event) => {
    if (gameState !== 'phase1') return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setScannerPosition({ x, y });

    anomalies.forEach((anomaly, index) => {
      if (!anomaly.found) {
        const distance = Math.sqrt(
          Math.pow(x - anomaly.x, 2) + Math.pow(y - anomaly.y, 2)
        );
        if (distance < 8) { 
          const newAnomalies = [...anomalies];
          newAnomalies[index].found = true;
          setAnomalies(newAnomalies);
          setAnomaliesFound(prev => prev + 1);
          
          
          if (window.AudioContext) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
          }
        }
      }
    });
  };

  const proceedToPhase2 = () => {
    if (anomaliesFound >= 3) {
      setGameState('phase2');
      setCurrentPhase(2);
      setPhase2Step(1);
      setPhase2Timer(120);
      setMeasurements({
        intensity: 45000 + Math.random() * 5000,
        inclination: 55 + Math.random() * 14,
        declination: -5 + Math.random() * 6,
        totalField: 48000 + Math.random() * 8000
      });
    }
  };


  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationProgress(0);
  };

  const adjustMeasurement = (type, value) => {
    setMeasurements(prev => ({
      ...prev,
      [type]: Math.max(0, value)
    }));
  };

  const submitMeasurement = (type) => {
    const target = targetMeasurements[type];
    const current = measurements[type];
    const environmentalEffect = getEnvironmentalEffect();
    const currentAttempts = measurementAttempts[type];
    
    setMeasurementAttempts(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));

    let tolerance;
    switch(type) {
      case 'intensity':
        tolerance = target * 0.05; 
        break;
      case 'inclination':
        tolerance = 2; 
        break;
      case 'declination':
        tolerance = 1; 
        break;
      case 'totalField':
        tolerance = target * 0.04; 
        break;
      default:
        tolerance = target * 0.1;
    }
    
    const isWithinTolerance = Math.abs(current - target) <= tolerance;
    const rawAccuracy = 100 - (Math.abs(current - target) / tolerance) * 50;
    const adjustedAccuracy = Math.max(0, rawAccuracy - environmentalEffect);
    
    if (isWithinTolerance && adjustedAccuracy >= 60) {
      const basePoints = Math.round(adjustedAccuracy / 4); 
      const attemptMultiplier = currentAttempts === 0 ? 1.2 : currentAttempts === 1 ? 1.0 : 0.8;
      const points = Math.round(basePoints * attemptMultiplier);
      setScore(prev => Math.min(100, prev + points));
      
      if (phase2Step < 4) {
        setPhase2Step(phase2Step + 1);
      } else {
        setGameState('phase3');
        setCurrentPhase(3);
      }
    } else {
      setMistakes(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 3)); 
      
      const outOfAttempts = currentAttempts >= 2; 
      
      if (outOfAttempts) {
        setFailureReason('phase2');
        
        saveGameResult(score, 2, false, {
          failureReason: 'phase2',
          measurementType: type,
          anomaliesFound: anomaliesFound,
          phase2Step: phase2Step,
          mistakes: mistakes + 1, 
          gameType: 'Mission Aurora'
        });
        
        setGameState('failure');
      }
    }
  };

  const getEnvironmentalEffect = () => {
    const solarEffect = environmentalFactors.solarActivity * 0.35;
    const noiseEffect = environmentalFactors.atmosphericNoise * 0.6;
    const tempEffect = Math.abs(environmentalFactors.temperature - 10) * 0.4;
    
    let extremeConditionPenalty = 0;
    if (environmentalFactors.solarActivity > 95) extremeConditionPenalty += 20;
    if (environmentalFactors.atmosphericNoise > 45) extremeConditionPenalty += 15;
    if (environmentalFactors.temperature > 35) extremeConditionPenalty += 10;
    
    return Math.min(50, (solarEffect + noiseEffect + tempEffect) / 3 + extremeConditionPenalty);
  };

  const stabilizeSatellite = () => {
    const isGoodTiming = stormIntensity > 80; 
    setStabilizeAttempts(prev => prev + 1);

    if (isGoodTiming) {
      const basePoints = 25;
      const attemptBonus = stabilizeAttempts === 0 ? 5 : 0; 
      const finalPoints = basePoints + attemptBonus;
      setScore(prev => Math.min(100, prev + finalPoints)); 
      setTimeout(() => {
        const finalScore = Math.min(100, score + finalPoints);
        const mistakePenalty = mistakes * 2; 
        const adjustedScore = Math.max(0, finalScore - mistakePenalty);
        
        const newBadges = ['🧭 Field Explorer'];
        if (adjustedScore >= 90 && mistakes <= 2) newBadges.push('🛰 Magnetic Guardian');
        if (mistakes === 0) newBadges.push('🎯 Perfect Execution');
        setBadges(newBadges);
        
        setScore(adjustedScore);
        
        saveGameResult(adjustedScore, 3, true, {
          badges: newBadges,
          anomaliesFound: anomaliesFound,
          phase2Step: phase2Step,
          mistakes: mistakes,
          gameType: 'Mission Aurora'
        });
        
        setGameState('victory');
      }, 1000);
    } else {
      setMistakes(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 5)); 
      
      if (stabilizeAttempts >= 2) {
        setFailureReason('phase3');
        
        saveGameResult(score, 3, false, {
          failureReason: 'phase3',
          anomaliesFound: anomaliesFound,
          phase2Step: phase2Step,
          mistakes: mistakes,
          gameType: 'Mission Aurora'
        });
        
        setGameState('failure');
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="topic1-page">
      <NavBar />
      <main className="topic1-content">
        <div className="topic1-container">
          <div className="back-button-container">
            <button onClick={handleBackToHome} className="back-to-home-btn">
              ← Повернутися на головну
            </button>
          </div>
          
          <header className="topic1-header">
            <h1>Місія Аврора 🛰️</h1>
            <p className="topic1-subtitle">
              Інтерактивна гра для вивчення магнітного поля Землі
            </p>
          </header>

          {gameState.startsWith('phase') && (
            <section className="topic1-section">
              <div className="section-content">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  marginBottom: '1rem'
                }}>
                  <div style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Фаза {currentPhase}/3
                  </div>
                  <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Рахунок: {score}
                  </div>
                  <div style={{ color: mistakes > 5 ? '#ff6b6b' : '#FFD700', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Помилки: {mistakes}
                  </div>
                  <div style={{ color: timeLeft < 30 ? '#ff6b6b' : '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Час: {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
            </section>
          )}

          {gameState === 'intro' && (
            <section className="topic1-section">
              <h2>Вітаємо, дослідник!</h2>
              <div className="section-content">
                <div className="intro-text">
                  Ви - науковець, що керує супутником "Аврора" під час геомагнітної бурі. 
                  Ваша місія - захистити супутник та зібрати цінні дані про магнітне поле Землі.
                </div>
                
                <div className="highlight-box">
                  <h3>Завдання місії:</h3>
                  <ul style={{ textAlign: 'left', paddingLeft: '2rem' }}>
                    <li>📡 <strong>Фаза 1:</strong> Знайти магнітні аномалії на Землі (тренування)</li>
                    <li>📊 <strong>Фаза 2:</strong> Виміряти напруженість магнітного поля (оцінювання)</li>
                    <li>🛰️ <strong>Фаза 3:</strong> Стабілізувати супутник під час бурі (фінал)</li>
                  </ul>
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button 
                    onClick={startGame}
                    className="nav-button"
                    style={{ 
                      fontSize: '1.2rem', 
                      padding: '1rem 2rem',
                      background: 'linear-gradient(135deg, #4CAF50, #45a049)'
                    }}
                  >
                    🚀 Розпочати місію
                  </button>
                </div>
              </div>
            </section>
          )}

          {gameState === 'phase1' && (
            <section className="topic1-section">
              <h2>Фаза 1: Сканування Землі 📡 (Тренування)</h2>
              <div className="section-content">
                <p style={{ marginBottom: '1rem' }}>
                  Знайдіть <strong>{3 - anomaliesFound}</strong> магнітних аномалій. 
                  Клікайте по карті для сканування! <br />
                  <em style={{ color: '#FFD700' }}>🎯 Ця фаза для тренування - бали не нараховуються</em>
                </p>
                
                <div 
                  ref={mapRef}
                  onClick={handleMapClick}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '400px',
                    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                    borderRadius: '15px',
                    border: '2px solid #4CAF50',
                    cursor: 'crosshair',
                    overflow: 'hidden',
                    margin: '1rem 0'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #4CAF50, #2E7D32)',
                    border: '3px solid #81C784'
                  }} />

                  {anomalies.map((anomaly) => (
                    <div
                      key={anomaly.id}
                      style={{
                        position: 'absolute',
                        left: `${anomaly.x}%`,
                        top: `${anomaly.y}%`,
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        background: anomaly.found ? '#4CAF50' : '#ff6b6b',
                        border: '2px solid white',
                        animation: anomaly.found ? 'none' : 'pulse 1s infinite',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}

                  <div style={{
                    position: 'absolute',
                    left: `${scannerPosition.x}%`,
                    top: `${scannerPosition.y}%`,
                    width: '30px',
                    height: '30px',
                    border: '2px solid #FFD700',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '2px',
                      height: '20px',
                      background: '#FFD700',
                      transform: 'translate(-50%, -50%)'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '20px',
                      height: '2px',
                      background: '#FFD700',
                      transform: 'translate(-50%, -50%)'
                    }} />
                  </div>
                </div>

                <div className="formula-box">
                  <p><strong>Навчальна інформація:</strong> Магнітні аномалії вказують на регіони, 
                  де магнітне поле відхиляється від середнього значення через геологічні відмінності.</p>
                </div>

                {anomaliesFound >= 3 && (
                  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button onClick={proceedToPhase2} className="nav-button">
                      Перейти до Фази 2 →
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {gameState === 'phase2' && (
            <section className="topic1-section">
              <h2>Фаза 2: Комплексне вимірювання магнітного поля 📊</h2>
              <div className="section-content">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '10px'
                }}>
                  <div>
                    <strong>Етап {phase2Step}/4:</strong> {
                      phase2Step === 1 ? 'Інтенсивність поля' :
                      phase2Step === 2 ? 'Нахил поля' :
                      phase2Step === 3 ? 'Магнітне схилення' :
                      'Загальна напруженість'
                    }
                  </div>
                  <div style={{ color: phase2Timer < 30 ? '#ff6b6b' : '#4CAF50', fontWeight: 'bold' }}>
                    ⏱️ {Math.floor(phase2Timer / 60)}:{(phase2Timer % 60).toString().padStart(2, '0')}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  marginBottom: '2rem',
                  padding: '1rem',
                  background: getEnvironmentalEffect() > 25 ? 'rgba(255,107,107,0.1)' : 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  border: getEnvironmentalEffect() > 25 ? '1px solid rgba(255,107,107,0.5)' : '1px solid rgba(255,255,255,0.2)'
                }}>
                  {getEnvironmentalEffect() > 25 && (
                    <div style={{
                      gridColumn: '1 / -1',
                      textAlign: 'center',
                      color: '#ff6b6b',
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      fontWeight: 'bold'
                    }}>
                      ⚠️ ВАЖКІ УМОВИ! Точність вимірювань знижена на {Math.round(getEnvironmentalEffect())}%
                    </div>
                  )}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>☀️</div>
                    <div style={{ fontSize: '0.9rem', color: '#ccc' }}>Сонячна активність</div>
                    <div style={{ 
                      color: environmentalFactors.solarActivity > 70 ? '#ff6b6b' : '#4CAF50',
                      fontWeight: 'bold'
                    }}>
                      {Math.round(environmentalFactors.solarActivity)}%
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📡</div>
                    <div style={{ fontSize: '0.9rem', color: '#ccc' }}>Атмосферні шуми</div>
                    <div style={{ 
                      color: environmentalFactors.atmosphericNoise > 35 ? '#ff6b6b' : '#4CAF50',
                      fontWeight: 'bold'
                    }}>
                      {Math.round(environmentalFactors.atmosphericNoise)}%
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌡️</div>
                    <div style={{ fontSize: '0.9rem', color: '#ccc' }}>Температура</div>
                    <div style={{ 
                      color: environmentalFactors.temperature > 35 ? '#ff6b6b' : '#4CAF50',
                      fontWeight: 'bold'
                    }}>
                      {Math.round(environmentalFactors.temperature)}°C
                    </div>
                  </div>
                </div>

                {!isCalibrating && calibrationProgress === 0 && (
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '10px'
                  }}>
                    <p style={{ marginBottom: '1rem' }}>
                      ⚙️ <strong>Спочатку потрібно калібрувати прилади</strong>
                    </p>
                    <button onClick={startCalibration} className="nav-button">
                      🔧 Розпочати калібрування
                    </button>
                  </div>
                )}

                {isCalibrating && (
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '10px'
                  }}>
                    <p style={{ marginBottom: '1rem' }}>⚙️ Калібрування приладів...</p>
                    <div style={{
                      width: '100%',
                      height: '20px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${calibrationProgress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #4CAF50, #81C784)',
                        transition: 'width 0.1s ease'
                      }} />
                    </div>
                    <div style={{ marginTop: '0.5rem', color: '#4CAF50' }}>
                      {calibrationProgress}%
                    </div>
                  </div>
                )}

                {!isCalibrating && calibrationProgress === 0 && (
                  <>
                    {phase2Step === 1 && (
                      <div style={{
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px',
                        margin: '1rem 0'
                      }}>
                        <h3 style={{ color: '#2196F3', marginBottom: '1rem', textAlign: 'center' }}>
                          🔍 Вимірювання інтенсивності магнітного поля
                        </h3>
                        <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
                          Цільове значення: <strong>{targetMeasurements.intensity} нТл</strong> 
                          (±{Math.round(targetMeasurements.intensity * 0.05)} нТл)
                        </p>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <p style={{ color: measurementAttempts.intensity > 0 ? '#ff9f43' : '#ccc' }}>
                            Спроб: {measurementAttempts.intensity}/3
                          </p>
                          {measurementAttempts.intensity > 0 && (
                            <p style={{ 
                              color: Math.abs(measurements.intensity - targetMeasurements.intensity) <= targetMeasurements.intensity * 0.05 ? '#4CAF50' : '#ff6b6b',
                              fontSize: '0.9rem',
                              marginTop: '0.5rem'
                            }}>
                              {Math.abs(measurements.intensity - targetMeasurements.intensity) <= targetMeasurements.intensity * 0.05 
                                ? '✅ Точність достатня' 
                                : `❌ Відхилення: ${Math.round(Math.abs(measurements.intensity - targetMeasurements.intensity))} нТл`
                              }
                            </p>
                          )}
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: Math.abs(measurements.intensity - targetMeasurements.intensity) <= targetMeasurements.intensity * 0.05 ? '#4CAF50' : '#ff6b6b',
                            marginBottom: '1rem'
                          }}>
                            {Math.round(measurements.intensity)} нТл
                          </div>
                          
                          <input
                            type="range"
                            min="40000"
                            max="55000"
                            value={measurements.intensity}
                            onChange={(e) => adjustMeasurement('intensity', parseInt(e.target.value))}
                            style={{ width: '100%', maxWidth: '400px', marginBottom: '1rem' }}
                          />
                          
                          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                            <button 
                              onClick={() => adjustMeasurement('intensity', measurements.intensity - 100)}
                              className="nav-button"
                              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            >
                              -100 нТл
                            </button>
                            <button 
                              onClick={() => adjustMeasurement('intensity', measurements.intensity + 100)}
                              className="nav-button"
                              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            >
                              +100 нТл
                            </button>
                          </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <button 
                            onClick={() => submitMeasurement('intensity')}
                            className="nav-button"
                            style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
                          >
                            📊 Підтвердити вимірювання
                          </button>
                        </div>
                      </div>
                    )}

                    {phase2Step === 2 && (
                      <div style={{
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px',
                        margin: '1rem 0'
                      }}>
                        <h3 style={{ color: '#FF9800', marginBottom: '1rem', textAlign: 'center' }}>
                          📐 Вимірювання кута нахилу (інклінації)
                        </h3>
                        <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
                          Цільове значення: <strong>{targetMeasurements.inclination}°</strong> 
                          (±2°)
                        </p>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <p style={{ color: measurementAttempts.inclination > 0 ? '#ff9f43' : '#ccc' }}>
                            Спроб: {measurementAttempts.inclination}/3
                          </p>
                          {measurementAttempts.inclination > 0 && (
                            <p style={{ 
                              color: Math.abs(measurements.inclination - targetMeasurements.inclination) <= 2 ? '#4CAF50' : '#ff6b6b',
                              fontSize: '0.9rem',
                              marginTop: '0.5rem'
                            }}>
                              {Math.abs(measurements.inclination - targetMeasurements.inclination) <= 2 
                                ? '✅ Точність достатня' 
                                : `❌ Відхилення: ${Math.round(Math.abs(measurements.inclination - targetMeasurements.inclination) * 10) / 10}°`
                              }
                            </p>
                          )}
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: Math.abs(measurements.inclination - targetMeasurements.inclination) <= 2 ? '#4CAF50' : '#ff6b6b',
                            marginBottom: '1rem'
                          }}>
                            {Math.round(measurements.inclination * 10) / 10}°
                          </div>
                          
                          <input
                            type="range"
                            min="50"
                            max="80"
                            step="0.1"
                            value={measurements.inclination}
                            onChange={(e) => adjustMeasurement('inclination', parseFloat(e.target.value))}
                            style={{ width: '100%', maxWidth: '400px', marginBottom: '1rem' }}
                          />
                          
                          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                            <button 
                              onClick={() => adjustMeasurement('inclination', measurements.inclination - 0.5)}
                              className="nav-button"
                              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            >
                              -0.5°
                            </button>
                            <button 
                              onClick={() => adjustMeasurement('inclination', measurements.inclination + 0.5)}
                              className="nav-button"
                              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            >
                              +0.5°
                            </button>
                          </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <button 
                            onClick={() => submitMeasurement('inclination')}
                            className="nav-button"
                            style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
                          >
                            📐 Підтвердити нахил
                          </button>
                        </div>
                      </div>
                    )}

                    {phase2Step === 3 && (
                      <div style={{
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px',
                        margin: '1rem 0'
                      }}>
                        <h3 style={{ color: '#9C27B0', marginBottom: '1rem', textAlign: 'center' }}>
                          🧭 Вимірювання магнітного схилення
                        </h3>
                        <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
                          Цільове значення: <strong>{targetMeasurements.declination}°</strong> 
                          (±1°)
                        </p>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <p style={{ color: measurementAttempts.declination > 0 ? '#ff9f43' : '#ccc' }}>
                            Спроб: {measurementAttempts.declination}/3
                          </p>
                          {measurementAttempts.declination > 0 && (
                            <p style={{ 
                              color: Math.abs(measurements.declination - targetMeasurements.declination) <= 1 ? '#4CAF50' : '#ff6b6b',
                              fontSize: '0.9rem',
                              marginTop: '0.5rem'
                            }}>
                              {Math.abs(measurements.declination - targetMeasurements.declination) <= 1 
                                ? '✅ Точність достатня' 
                                : `❌ Відхилення: ${Math.round(Math.abs(measurements.declination - targetMeasurements.declination) * 10) / 10}°`
                              }
                            </p>
                          )}
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: Math.abs(measurements.declination - targetMeasurements.declination) <= 1 ? '#4CAF50' : '#ff6b6b',
                            marginBottom: '1rem'
                          }}>
                            {Math.round(measurements.declination * 10) / 10}°
                          </div>
                          
                          <input
                            type="range"
                            min="-10"
                            max="5"
                            step="0.1"
                            value={measurements.declination}
                            onChange={(e) => adjustMeasurement('declination', parseFloat(e.target.value))}
                            style={{ width: '100%', maxWidth: '400px', marginBottom: '1rem' }}
                          />
                          
                          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                            <button 
                              onClick={() => adjustMeasurement('declination', measurements.declination - 0.2)}
                              className="nav-button"
                              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            >
                              -0.2°
                            </button>
                            <button 
                              onClick={() => adjustMeasurement('declination', measurements.declination + 0.2)}
                              className="nav-button"
                              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            >
                              +0.2°
                            </button>
                          </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <button 
                            onClick={() => submitMeasurement('declination')}
                            className="nav-button"
                            style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
                          >
                            🧭 Підтвердити схилення
                          </button>
                        </div>
                      </div>
                    )}

                    {phase2Step === 4 && (
                      <div style={{
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px',
                        margin: '1rem 0'
                      }}>
                        <h3 style={{ color: '#F44336', marginBottom: '1rem', textAlign: 'center' }}>
                          ⚡ Загальна напруженість поля
                        </h3>
                        <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
                          Цільове значення: <strong>{targetMeasurements.totalField} нТл</strong> 
                          (±{Math.round(targetMeasurements.totalField * 0.04)} нТл)
                        </p>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <p style={{ color: measurementAttempts.totalField > 0 ? '#ff9f43' : '#ccc' }}>
                            Спроб: {measurementAttempts.totalField}/3
                          </p>
                          {measurementAttempts.totalField > 0 && (
                            <p style={{ 
                              color: Math.abs(measurements.totalField - targetMeasurements.totalField) <= targetMeasurements.totalField * 0.04 ? '#4CAF50' : '#ff6b6b',
                              fontSize: '0.9rem',
                              marginTop: '0.5rem'
                            }}>
                              {Math.abs(measurements.totalField - targetMeasurements.totalField) <= targetMeasurements.totalField * 0.04 
                                ? '✅ Точність достатня' 
                                : `❌ Відхилення: ${Math.round(Math.abs(measurements.totalField - targetMeasurements.totalField))} нТл`
                              }
                            </p>
                          )}
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: Math.abs(measurements.totalField - targetMeasurements.totalField) <= targetMeasurements.totalField * 0.04 ? '#4CAF50' : '#ff6b6b',
                            marginBottom: '1rem'
                          }}>
                            {Math.round(measurements.totalField)} нТл
                          </div>
                          
                          <input
                            type="range"
                            min="45000"
                            max="60000"
                            value={measurements.totalField}
                            onChange={(e) => adjustMeasurement('totalField', parseInt(e.target.value))}
                            style={{ width: '100%', maxWidth: '400px', marginBottom: '1rem' }}
                          />
                          
                          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                            <button 
                              onClick={() => adjustMeasurement('totalField', measurements.totalField - 200)}
                              className="nav-button"
                              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            >
                              -200 нТл
                            </button>
                            <button 
                              onClick={() => adjustMeasurement('totalField', measurements.totalField + 200)}
                              className="nav-button"
                              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            >
                              +200 нТл
                            </button>
                          </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <button 
                            onClick={() => submitMeasurement('totalField')}
                            className="nav-button"
                            style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
                          >
                            ⚡ Завершити вимірювання
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="formula-box">
                  <p><strong>Навчальна інформація:</strong> Повне вимірювання геомагнітного поля включає 
                  інтенсивність (F), кут нахилу (I), магнітне схилення (D) та загальну напруженість. 
                  Екологічні фактори, такі як сонячна активність і атмосферні умови, впливають на точність вимірювань.</p>
                </div>
              </div>
            </section>
          )}

          {gameState === 'phase3' && (
            <section className="topic1-section">
              <h2>Фаза 3: Стабілізація супутника 🛰️</h2>
              <div className="section-content">
                <p style={{ marginBottom: '1rem' }}>
                  Натисніть кнопку стабілізації, коли інтенсивність бурі досягне піку (&gt;80%)!
                  Спроб залишилось: <strong>{3 - stabilizeAttempts}</strong>
                </p>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '15px',
                  margin: '1rem 0'
                }}>
                  <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: '50px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '25px',
                    border: '2px solid #4CAF50',
                    position: 'relative',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: `${stormIntensity}%`,
                      height: '100%',
                      background: stormIntensity > 80 ? 
                        'linear-gradient(90deg, #ff6b6b, #ff9f43)' : 
                        'linear-gradient(90deg, #4CAF50, #81C784)',
                      borderRadius: '25px',
                      transition: 'all 0.3s ease'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      Інтенсивність бурі: {Math.round(stormIntensity)}%
                    </div>
                  </div>

                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: stormIntensity > 50 ? '#ff6b6b' : '#4CAF50',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    marginBottom: '2rem',
                    animation: stormIntensity > 70 ? 'shake 0.5s infinite' : 'none'
                  }}>
                    🛰️
                  </div>

                  <button 
                    onClick={stabilizeSatellite}
                    className="nav-button"
                    style={{
                      background: stormIntensity > 80 ? 
                        'linear-gradient(135deg, #ff6b6b, #ff9f43)' : 
                        'linear-gradient(135deg, #4CAF50, #45a049)',
                      fontSize: '1.2rem',
                      padding: '1rem 2rem'
                    }}
                  >
                    🔧 Стабілізувати поле
                  </button>
                </div>

                <div className="formula-box">
                  <p><strong>Навчальна інформація:</strong> Геомагнітні бурі можуть порушувати роботу 
                  супутників та систем зв'язку. Своєчасні корекції допомагають підтримувати стабільність.</p>
                </div>
              </div>
            </section>
          )}

          {gameState === 'victory' && (
            <section className="topic1-section conclusion">
              <h2>🎉 Місія завершена успішно!</h2>
              <div className="section-content">
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(129, 199, 132, 0.2))',
                  borderRadius: '15px',
                  margin: '2rem 0'
                }}>
                  <div style={{
                    width: '150px',
                    height: '150px',
                    margin: '0 auto 2rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #4CAF50, #81C784, #A5D6A7)',
                    animation: 'aurora 3s ease-in-out infinite',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem'
                  }}>
                    🌌
                  </div>

                  <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>
                    Підсумок місії
                  </h3>
                  
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: '#4CAF50',
                    marginBottom: '1rem'
                  }}>
                    Рахунок: {score}/100
                  </div>

                  <div style={{ 
                    fontSize: '1.1rem', 
                    color: mistakes === 0 ? '#4CAF50' : mistakes <= 3 ? '#FFD700' : '#ff6b6b',
                    marginBottom: '1rem'
                  }}>
                    Помилки: {mistakes} {mistakes === 0 ? '✨ Ідеально!' : mistakes <= 3 ? '👍 Добре' : '💪 Можна краще'}
                  </div>

                  <div style={{ 
                    fontSize: '1.3rem', 
                    color: '#fff',
                    marginBottom: '2rem'
                  }}>
                    {score >= 90 ? '🛰 Магнітний Страж' : 
                     score >= 70 ? '🧭 Досвідчений дослідник' : 
                     '📡 Польовий дослідник'}
                  </div>

                  {badges.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ color: '#4CAF50' }}>Отримані нагороди:</h4>
                      {badges.map((badge, index) => (
                        <div key={index} style={{ 
                          fontSize: '1.2rem', 
                          color: '#FFD700',
                          margin: '0.5rem 0'
                        }}>
                          {badge}
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <button onClick={startGame} className="nav-button">
                      🔄 Спробувати знову
                    </button>
                    <button onClick={handleBackToHome} className="nav-button">
                      🏠 На головну
                    </button>
                  </div>
                </div>

                <div className="intro-text">
                  Вітаємо! Ви успішно захистили супутник "Аврора" та зібрали цінні дані про 
                  магнітне поле Землі. Ваші дії допомогли зберегти важливу наукову місію!
                </div>
              </div>
            </section>
          )}

          {gameState === 'failure' && (
            <section className="topic1-section">
              <h2>💥 Місія не виконана</h2>
              <div className="section-content">
                <div className="intro-text">
                  {failureReason === 'phase2' && (
                    <>
                      <strong>Помилка вимірювання приладів!</strong>
                      <br />
                      Ваші вимірювання геомагнітного поля були недостатньо точними. 
                      Для успішного завершення місії потрібна більша точність при налаштуванні приладів.
                      <br /><br />
                      💡 <em>Порада: Звертайте увагу на екологічні умови та допустимі відхилення для кожного типу вимірювання.</em>
                    </>
                  )}
                  {failureReason === 'phase2-timeout' && (
                    <>
                      <strong>Час вичерпано!</strong>
                      <br />
                      Ви не встигли завершити всі необхідні вимірювання геомагнітного поля за відведений час.
                      Швидкість та точність - ключові навички для роботи з науковими приладами.
                      <br /><br />
                      💡 <em>Порада: Спочатку проведіть калібрування, потім швидко виконуйте вимірювання.</em>
                    </>
                  )}
                  {failureReason === 'phase1-timeout' && (
                    <>
                      <strong>Магнітні аномалії не знайдені вчасно!</strong>
                      <br />
                      Час вичерпано під час сканування поверхні Землі. 
                      Магнітні аномалії потрібно виявляти швидко та ефективно.
                      <br /><br />
                      💡 <em>Порада: Систематично скануйте поверхню планети, не забувайте про різні регіони.</em>
                    </>
                  )}
                  {failureReason === 'phase3' && (
                    <>
                      <strong>Супутник втрачено!</strong>
                      <br />
                      Магнітна буря виявилася надто потужною для вашого супутника. 
                      Неправильний вибір моменту для стабілізації призвів до втрати зв'язку.
                      <br /><br />
                      💡 <em>Порада: Чекайте, поки інтенсивність бурі перевищить 80%, тоді натискайте кнопку стабілізації.</em>
                    </>
                  )}
                  {!failureReason && (
                    <>
                      Магнітна буря перемогла ваш супутник. Спробуйте ще раз та реагуйте швидше!
                    </>
                  )}
                </div>
                
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '2rem',
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button onClick={startGame} className="nav-button">
                    🔄 Спробувати знову
                  </button>
                  <button onClick={handleBackToHome} className="nav-button">
                    🏠 На головну
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes aurora {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
};

export default MissionAuroraGame;
