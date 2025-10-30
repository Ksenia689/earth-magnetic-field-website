import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import './topic1.css';
import mapImage from '../img/map1.avif';

const MagneticAnomalyMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const magneticAnomalies = {
    'north-america': {
      name: 'Північноамериканська магнітна аномалія',
      deviation: '+15.2 нТл',
      severity: 'moderate',
      explanation: 'Цей регіон демонструє позитивні магнітні аномалії через залізовмісні геологічні формації під Канадським щитом. Докембрійські породи містять значні поклади магнетиту, які підсилюють локальну напруженість магнітного поля.',
      coordinates: { lat: 60, lon: -100 },
      color: '#ff6b6b'
    },
    'siberia': {
      name: 'Сибірський магнітний мінімум',
      deviation: '-23.7 нТл',
      severity: 'high',
      explanation: 'Сибірський регіон демонструє значні негативні магнітні аномалії. Це пов\'язано з Сибірськими трапами - обширними вулканічними формаціями, які змінили магнітні властивості кори під час масивних вивержень 250 мільйонів років тому.',
      coordinates: { lat: 65, lon: 105 },
      color: '#4ecdc4'
    },
    'south-atlantic': {
      name: 'Південноатлантична аномалія',
      deviation: '-18.5 нТл',
      severity: 'high',
      explanation: 'Південноатлантична аномалія - добре відомий регіон, де магнітне поле Землі значно слабше. Це впливає на роботу супутників і збільшує радіаційне опромінення космічних апаратів, що проходять через цю область.',
      coordinates: { lat: -30, lon: -30 },
      color: '#45b7d1'
    },
    'australia': {
      name: 'Австралійський магнітний максимум',
      deviation: '+12.8 нТл',
      severity: 'moderate',
      explanation: 'Центральна Австралія демонструє позитивні магнітні аномалії, пов\'язані з древніми архейськими кратонами, багатими залізними рудами. Ці геологічні формації є одними з найстаріших на Землі і містять значні магнітні мінерали.',
      coordinates: { lat: -25, lon: 135 },
      color: '#ff9f43'
    },
    'greenland': {
      name: 'Аномалія Гренландського льодового щита',
      deviation: '+8.3 нТл',
      severity: 'low',
      explanation: 'Під Гренландським льодовим щитом знаходяться древні кам\'яні формації, які створюють тонкі магнітні аномалії. Недавні дослідження з використанням аерномагнітних зйомок виявили складні геологічні структури, приховані під кілометрами льоду.',
      coordinates: { lat: 72, lon: -40 },
      color: '#a55eea'
    },
    'antarctica': {
      name: 'Антарктична підльодовикова аномалія',
      deviation: '-11.4 нТл',
      severity: 'moderate',
      explanation: 'Антарктида містить кілька магнітних аномалій під своїм льодовим щитом. Вони пов\'язані з древніми гірськими хребтами та вулканічною активністю, що відбувалася до того, як континент покрився льодом.',
      coordinates: { lat: -80, lon: 0 },
      color: '#26de81'
    }
  };

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  const handleRegionClick = (regionId) => {
    setSelectedRegion(regionId);
    setShowInfo(true);
  };

  const closeInfo = () => {
    setShowInfo(false);
    setSelectedRegion(null);
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
            <h1>Глобальна карта магнітних аномалій</h1>
            <p className="topic1-subtitle">
              Клікніть на кольорові регіони для дослідження магнітних відхилень від норми
            </p>
          </header>

          <section className="topic1-section">
            <div className="section-content">
              <p className="intro-text">
                Магнітні аномалії - це відхилення магнітного поля Землі від нормальних значень у конкретних 
                географічних регіонах. Ці відхилення можуть бути викликані геологічними структурами, 
                мінеральними покладами або древніми вулканічними процесами. Вивчення магнітних аномалій 
                допомагає геофізикам розуміти внутрішню будову Землі та історію геологічних процесів.
              </p>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Інтерактивна карта аномалій</h2>
            <div className="section-content">
              <div className="magnetosphere-image-container" style={{ position: 'relative', display: 'inline-block' }}>
                <img 
                  src={mapImage} 
                  alt="Глобальна карта магнітних аномалій" 
                  className="magnetosphere-image"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none'
                }}>
                  <div
                    onClick={() => handleRegionClick('north-america')}
                    style={{
                      position: 'absolute',
                      top: '15%',
                      left: '5%',
                      width: '20%',
                      height: '25%',
                      backgroundColor: 'rgba(255, 107, 107, 0.3)',
                      border: '2px solid #ff6b6b',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      fontSize: 'clamp(0.6rem, 1.5vw, 1rem)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 107, 107, 0.5)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Північна Америка
                  </div>

                  <div
                    onClick={() => handleRegionClick('siberia')}
                    style={{
                      position: 'absolute',
                      top: '10%',
                      left: '65%',
                      width: '15%',
                      height: '20%',
                      backgroundColor: 'rgba(78, 205, 196, 0.3)',
                      border: '2px solid #4ecdc4',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      fontSize: 'clamp(0.6rem, 1.5vw, 1rem)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(78, 205, 196, 0.5)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(78, 205, 196, 0.3)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Сибір
                  </div>

                  <div
                    onClick={() => handleRegionClick('south-atlantic')}
                    style={{
                      position: 'absolute',
                      top: '65%',
                      left: '30%',
                      width: '18%',
                      height: '15%',
                      backgroundColor: 'rgba(69, 183, 209, 0.3)',
                      border: '2px solid #45b7d1',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      fontSize: 'clamp(0.5rem, 1.2vw, 0.9rem)',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(69, 183, 209, 0.5)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(69, 183, 209, 0.3)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Південна Атлантика
                  </div>

                  <div
                    onClick={() => handleRegionClick('australia')}
                    style={{
                      position: 'absolute',
                      top: '70%',
                      left: '82%',
                      width: '15%',
                      height: '18%',
                      backgroundColor: 'rgba(255, 159, 67, 0.3)',
                      border: '2px solid #ff9f43',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      fontSize: 'clamp(0.6rem, 1.5vw, 1rem)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 159, 67, 0.5)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 159, 67, 0.3)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Австралія
                  </div>

                  <div
                    onClick={() => handleRegionClick('greenland')}
                    style={{
                      position: 'absolute',
                      top: '3%',
                      left: '32%',
                      width: '10%',
                      height: '10%',
                      backgroundColor: 'rgba(165, 94, 234, 0.3)',
                      border: '2px solid #a55eea',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      fontSize: 'clamp(0.5rem, 1.2vw, 0.9rem)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(165, 94, 234, 0.5)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(165, 94, 234, 0.3)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Гренландія
                  </div>

                  <div
                    onClick={() => handleRegionClick('antarctica')}
                    style={{
                      position: 'absolute',
                      top: '90%',
                      left: '20%',
                      width: '60%',
                      height: '7%',
                      backgroundColor: 'rgba(38, 222, 129, 0.3)',
                      border: '2px solid #26de81',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      fontSize: 'clamp(0.6rem, 1.5vw, 1rem)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(38, 222, 129, 0.5)';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(38, 222, 129, 0.3)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Антарктида
                  </div>
                </div>
              </div>
              
              <div className="highlight-box">
                <p>
                  <strong>Як користуватися картою:</strong> Клікніть на кольорові зони на карті для отримання 
                  детальної інформації про магнітні аномалії в цих регіонах. Кожна зона представляє область 
                  з значними відхиленнями від нормального магнітного поля Землі.
                </p>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Легенда карти</h2>
            <div className="section-content">
              <div className="structure-info">
                <ul>
                  <li><strong style={{ color: '#ff6b6b' }}>Червоні зони:</strong> Позитивні магнітні аномалії (підвищена напруженість поля)</li>
                  <li><strong style={{ color: '#4ecdc4' }}>Блакитні зони:</strong> Негативні магнітні аномалії (знижена напруженість поля)</li>
                  <li><strong style={{ color: '#ff9f43' }}>Жовті зони:</strong> Помірні позитивні відхилення</li>
                  <li><strong style={{ color: '#a55eea' }}>Фіолетові зони:</strong> Слабкі аномалії під льодовими щитами</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Значення магнітних аномалій</h2>
            <div className="section-content">
              <p>
                Магнітні аномалії вимірюються в наnotesла (нТл). Середня напруженість магнітного поля 
                Землі становить приблизно 50,000 нТл, тому ці відхилення представляють значні локальні 
                варіації, які можуть впливати на навігаційні системи, роботу супутників та геологічні 
                дослідження.
              </p>
              
              <div className="formula-box">
                <h4>Класифікація аномалій</h4>
                <ul>
                  <li><strong>Високий вплив:</strong> Відхилення понад ±20 нТл</li>
                  <li><strong>Помірний вплив:</strong> Відхилення від ±10 до ±20 нТл</li>
                  <li><strong>Низький вплив:</strong> Відхилення менше ±10 нТл</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="topic1-section conclusion">
            <h2>Висновки</h2>
            <div className="section-content">
              <p>
                Глобальні магнітні аномалії є важливими індикаторами геологічної структури Землі. 
                Їх дослідження допомагає науковцям розуміти історію планети, виявляти корисні копалини 
                та прогнозувати геомагнітні явища, які можуть впливати на сучасні технології.
              </p>
            </div>
          </section>
        </div>
      </main>

      {showInfo && selectedRegion && (
        <div className="info-overlay" onClick={closeInfo} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}>
          <div className="info-panel" onClick={(e) => e.stopPropagation()} style={{
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white'
          }}>
            <button 
              className="close-btn" 
              onClick={closeInfo}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontSize: '2em',
                cursor: 'pointer',
                color: '#999',
                transition: 'color 0.3s ease',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%'
              }}
            >
              ×
            </button>
            <div className="info-content">
              <h2 style={{ 
                marginTop: 0,
                marginBottom: '25px',
                color: '#ffffff',
                fontSize: '1.8em',
                borderBottom: '3px solid #4CAF50',
                paddingBottom: '10px'
              }}>
                {magneticAnomalies[selectedRegion].name}
              </h2>
              <div className="anomaly-stats" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '25px',
                padding: '20px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                borderLeft: '4px solid #4CAF50'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <label style={{ 
                    display: 'block',
                    fontWeight: 'bold',
                    color: '#ccc',
                    marginBottom: '8px',
                    fontSize: '0.9em',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Магнітне відхилення
                  </label>
                  <span style={{
                    fontSize: '1.4em',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    minWidth: '80px',
                    background: magneticAnomalies[selectedRegion].deviation.startsWith('+') ? 
                      'linear-gradient(45deg, #e8f5e8, #d4edda)' : 'linear-gradient(45deg, #e2f3f3, #d1ecf1)',
                    color: magneticAnomalies[selectedRegion].deviation.startsWith('+') ? '#155724' : '#0c5460',
                    border: magneticAnomalies[selectedRegion].deviation.startsWith('+') ? 
                      '2px solid #c3e6cb' : '2px solid #bee5eb'
                  }}>
                    {magneticAnomalies[selectedRegion].deviation}
                  </span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <label style={{ 
                    display: 'block',
                    fontWeight: 'bold',
                    color: '#ccc',
                    marginBottom: '8px',
                    fontSize: '0.9em',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Рівень впливу
                  </label>
                  <span style={{
                    fontSize: '1.4em',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    minWidth: '80px',
                    background: magneticAnomalies[selectedRegion].severity === 'high' ? 
                      'linear-gradient(45deg, #e74c3c, #c0392b)' :
                      magneticAnomalies[selectedRegion].severity === 'moderate' ?
                      'linear-gradient(45deg, #f39c12, #e67e22)' :
                      'linear-gradient(45deg, #27ae60, #229954)',
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}>
                    {magneticAnomalies[selectedRegion].severity === 'high' ? 'Високий' : 
                     magneticAnomalies[selectedRegion].severity === 'moderate' ? 'Помірний' : 'Низький'}
                  </span>
                </div>
              </div>
              <div className="explanation" style={{ marginBottom: '25px' }}>
                <h3 style={{ color: '#4CAF50', marginBottom: '15px', fontSize: '1.3em' }}>
                  Пояснення
                </h3>
                <p style={{ 
                  lineHeight: 1.7,
                  color: '#f0f0f0',
                  fontSize: '1.1em',
                  textAlign: 'justify'
                }}>
                  {magneticAnomalies[selectedRegion].explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MagneticAnomalyMap;
