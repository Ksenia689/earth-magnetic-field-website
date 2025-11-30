import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import './topic1.css'; 

const CalculatorRadius = () => {
  const [velocity, setVelocity] = useState('');
  const [charge, setCharge] = useState('');
  const [particleType, setParticleType] = useState('electron');
  const [magneticField, setMagneticField] = useState('');
  const [radius, setRadius] = useState(null);
  const [showCalculation, setShowCalculation] = useState(false);

  // Константи для мас частинок (в кг)
  const particleMasses = {
    neutron: 1.674927471e-27,
    proton: 1.672621898e-27,
    electron: 9.10938356e-31,
    alpha: 6.64465775e-27 // альфа-частинка (ядро гелію)
  };

  // Константи для зарядів частинок (в Кулонах)
  const particleCharges = {
    neutron: 0,
    proton: 1.602176634e-19,
    electron: -1.602176634e-19,
    alpha: 2 * 1.602176634e-19 // подвійний позитивний заряд
  };

  const particleNames = {
    neutron: 'Нейтрон',
    proton: 'Протон',
    electron: 'Електрон',
    alpha: 'Альфа-частинка'
  };

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  const calculateRadius = () => {
    const v = parseFloat(velocity);
    const q = parseFloat(charge);
    const B = parseFloat(magneticField);
    const c = 3e8; // швидкість світла

    // Валідація введених даних
    if (isNaN(v) || v < 0 || v > c) {
      alert(`Будь ласка, введіть коректну швидкість (0 ≤ v ≤ ${c.toExponential(2)} м/с)`);
      return;
    }

    if (isNaN(B) || B <= 0) {
      alert('Будь ласка, введіть коректне значення магнітної індукції (B > 0)');
      return;
    }

    // Для нейтрона заряд завжди 0
    if (particleType === 'neutron') {
      alert('Нейтрон не має заряду, тому не може рухатися по колу в магнітному полі!');
      return;
    }

    const mass = particleMasses[particleType];
    let finalCharge = q;

    // Якщо не введено заряд вручну, використовуємо стандартний заряд частинки
    if (isNaN(q) || q === 0) {
      finalCharge = Math.abs(particleCharges[particleType]);
    } else {
      finalCharge = Math.abs(q);
    }

    // Розрахунок радіуса за формулою r = (m*v)/(|q|*B)
    const r = (mass * v) / (finalCharge * B);
    
    setRadius(r);
    setShowCalculation(true);
  };

  const clearResults = () => {
    setVelocity('');
    setCharge('');
    setParticleType('electron');
    setMagneticField('');
    setRadius(null);
    setShowCalculation(false);
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
            <h1>Калькулятор радіуса траєкторії частинки</h1>
            <p className="topic1-subtitle">
              Обчисліть радіус кругової траєкторії зарядженої частинки в магнітному полі
            </p>
          </header>

          <section className="topic1-section">
            <h2>Про калькулятор</h2>
            <div className="section-content">
              <p className="intro-text">
                Коли заряджена частинка рухається в однорідному магнітному полі перпендикулярно до 
                силових ліній, вона відчуває силу Лоренца, яка змушує її рухатися по коловій траєкторії. 
                Цей калькулятор дозволяє обчислити радіус такої траєкторії для різних типів частинок.
              </p>
              
              <div className="highlight-box">
                <p>
                  <strong>Формула розрахунку:</strong> r = (m × v) / (|q| × B)
                </p>
                <p>
                  де r — радіус траєкторії (м), m — маса частинки (кг), v — швидкість частинки (м/с), 
                  q — заряд частинки (Кл), B — магнітна індукція (Тл)
                </p>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Параметри частинки та поля</h2>
            <div className="section-content">
              <div className="calculator-container">
                
                {/* Швидкість частинки */}
                <div className="input-group">
                  <label htmlFor="velocity-input" className="input-label">
                    Швидкість частинки (м/с):
                  </label>
                  <input
                    id="velocity-input"
                    type="number"
                    value={velocity}
                    onChange={(e) => setVelocity(e.target.value)}
                    placeholder={`Введіть швидкість (max ≈ 3×10⁸ м/с)`}
                    className="height-input"
                    min="0"
                    max="300000000"
                    step="1000"
                  />
                </div>

                {/* Тип частинки */}
                <div className="input-group">
                  <label htmlFor="particle-select" className="input-label">
                    Тип частинки:
                  </label>
                  <select
                    id="particle-select"
                    value={particleType}
                    onChange={(e) => setParticleType(e.target.value)}
                    className="height-input"
                    style={{cursor: 'pointer'}}
                  >
                    <option value="electron">Електрон (e⁻)</option>
                    <option value="proton">Протон (p⁺)</option>
                    <option value="neutron">Нейтрон (n⁰)</option>
                    <option value="alpha">Альфа-частинка (α)</option>
                  </select>
                </div>

                {/* Заряд частинки */}
                <div className="input-group">
                  <label htmlFor="charge-input" className="input-label">
                    Заряд частинки (Кл):
                    <span style={{fontSize: '0.9rem', color: '#81C784', display: 'block', marginTop: '0.3rem'}}>
                      (залиште порожнім для використання стандартного заряду обраної частинки)
                    </span>
                  </label>
                  <input
                    id="charge-input"
                    type="number"
                    value={charge}
                    onChange={(e) => setCharge(e.target.value)}
                    placeholder={`Стандартний заряд: ${particleCharges[particleType] ? particleCharges[particleType].toExponential(2) : '0'} Кл`}
                    className="height-input"
                    step="1e-19"
                  />
                </div>

                {/* Магнітна індукція */}
                <div className="input-group">
                  <label htmlFor="magnetic-field-input" className="input-label">
                    Магнітна індукція B (Тл):
                  </label>
                  <input
                    id="magnetic-field-input"
                    type="number"
                    value={magneticField}
                    onChange={(e) => setMagneticField(e.target.value)}
                    placeholder="Введіть магнітну індукцію"
                    className="height-input"
                    min="0"
                    step="0.001"
                  />
                </div>
                
                <div className="button-group">
                  <button onClick={calculateRadius} className="calculate-btn">
                    Обчислити радіус
                  </button>
                  <button onClick={clearResults} className="clear-btn">
                    Очистити
                  </button>
                </div>

                {radius !== null && (
                  <div className="result-container">
                    <h3>Результат обчислення</h3>
                    <div className="result-value">
                      <span className="distance-value">
                        {radius >= 0.001 ? 
                          `${radius.toFixed(6)} м` : 
                          `${radius.toExponential(3)} м`
                        }
                      </span>
                      <p className="result-description">
                        {particleNames[particleType]} з швидкістю {velocity} м/с у магнітному полі 
                        з індукцією {magneticField} Тл рухатиметься по колу радіусом {radius >= 0.001 ? 
                          radius.toFixed(6) : radius.toExponential(3)} метрів
                      </p>
                    </div>
                    
                    {showCalculation && (
                      <div className="calculation-details">
                        <h4>Детальний розрахунок:</h4>
                        <div className="formula-steps">
                          <p><strong>Дано:</strong></p>
                          <ul>
                            <li>Тип частинки: {particleNames[particleType]}</li>
                            <li>Маса (m) = {particleMasses[particleType].toExponential(3)} кг</li>
                            <li>Швидкість (v) = {velocity} м/с</li>
                            <li>Заряд (|q|) = {charge ? Math.abs(parseFloat(charge)).toExponential(3) : Math.abs(particleCharges[particleType]).toExponential(3)} Кл</li>
                            <li>Магнітна індукція (B) = {magneticField} Тл</li>
                          </ul>
                          <p><strong>Формула:</strong> r = (m × v) / (|q| × B)</p>
                          <p><strong>Розрахунок:</strong></p>
                          <p>r = ({particleMasses[particleType].toExponential(3)} × {velocity}) / ({(charge ? Math.abs(parseFloat(charge)) : Math.abs(particleCharges[particleType])).toExponential(3)} × {magneticField})</p>
                          <p>r = {(particleMasses[particleType] * parseFloat(velocity)).toExponential(3)} / {((charge ? Math.abs(parseFloat(charge)) : Math.abs(particleCharges[particleType])) * parseFloat(magneticField)).toExponential(3)}</p>
                          <p>r = {radius >= 0.001 ? radius.toFixed(6) : radius.toExponential(3)} м</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Характеристики частинок</h2>
            <div className="section-content">
              <div className="mechanisms-grid">
                <div className="mechanism-card">
                  <h3>Електрон (e⁻)</h3>
                  <p>
                    <strong>Маса:</strong> 9.109 × 10⁻³¹ кг<br/>
                    <strong>Заряд:</strong> -1.602 × 10⁻¹⁹ Кл<br/>
                    Найлегша заряджена частинка. Має найменший радіус траєкторії 
                    при однакових умовах.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Протон (p⁺)</h3>
                  <p>
                    <strong>Маса:</strong> 1.673 × 10⁻²⁷ кг<br/>
                    <strong>Заряд:</strong> +1.602 × 10⁻¹⁹ Кл<br/>
                    Ядро атома водню. Майже в 1836 разів важче за електрон, 
                    тому має значно більший радіус траєкторії.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Нейтрон (n⁰)</h3>
                  <p>
                    <strong>Маса:</strong> 1.675 × 10⁻²⁷ кг<br/>
                    <strong>Заряд:</strong> 0 Кл<br/>
                    Електрично нейтральна частинка. Не відхиляється магнітним полем 
                    і рухається прямолінійно.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Альфа-частинка (α)</h3>
                  <p>
                    <strong>Маса:</strong> 6.645 × 10⁻²⁷ кг<br/>
                    <strong>Заряд:</strong> +3.204 × 10⁻¹⁹ Кл (2e⁺)<br/>
                    Ядро атома гелію-4. Складається з 2 протонів і 2 нейтронів. 
                    Має подвійний позитивний заряд.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Фізичні принципи</h2>
            <div className="section-content">
              <div className="formula-box">
                <h4>Сила Лоренца та кругова траєкторія</h4>
                <p>
                  Коли заряджена частинка рухається перпендикулярно до магнітного поля, 
                  на неї діє сила Лоренца F = qvB, яка завжди перпендикулярна до швидкості. 
                  Ця сила є доцентровою і змушує частинку рухатися по колу.
                </p>
              </div>

              <ul className="dynamics-list">
                <li><strong>Сила Лоренца:</strong> F = q(v × B) — сила, що діє на заряджену частинку в магнітному полі</li>
                <li><strong>Доцентрова сила:</strong> F = mv²/r — сила, необхідна для кругового руху</li>
                <li><strong>Рівновага:</strong> qvB = mv²/r, звідки r = mv/(qB)</li>
                <li><strong>Період обертання:</strong> T = 2πm/(qB) — не залежить від швидкості!</li>
                <li><strong>Циклотронна частота:</strong> f = qB/(2πm) — характерна частота обертання</li>
              </ul>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Практичні застосування</h2>
            <div className="section-content">
              <div className="mechanisms-grid">
                <div className="mechanism-card">
                  <h3>Мас-спектрометрія</h3>
                  <p>
                    Визначення маси частинок за радіусом їх траєкторії в магнітному полі. 
                    Основа для аналізу ізотопів та молекулярних структур.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Циклотрон</h3>
                  <p>
                    Прискорювач частинок, що використовує магнітне поле для утримання 
                    частинок на спіральній траєкторії під час прискорення.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Магнітне утримання плазми</h3>
                  <p>
                    У термоядерних реакторах магнітні поля утримують гарячу плазму, 
                    не дозволяючи їй торкатися стінок реактора.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Аврора (полярне сяйво)</h3>
                  <p>
                    Заряджені частинки сонячного вітру взаємодіють з магнітним полем Землі, 
                    рухаючись по спіральних траєкторіях до полюсів.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section conclusion">
            <h2>Висновки</h2>
            <div className="section-content">
              <p>
                Розуміння руху зарядженх частинок у магнітному полі є фундаментальним 
                для багатьох галузей фізики і техніки. Від дослідження космічних променів 
                до створення медичних приладів — ця взаємодія відіграє ключову роль у 
                сучасних технологіях та науковому пізнанні.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CalculatorRadius;
