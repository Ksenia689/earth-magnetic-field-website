import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import './topic1.css'; 
const HorizonSimulator = () => {
  const [height, setHeight] = useState('');
  const [distance, setDistance] = useState(null);
  const [showCalculation, setShowCalculation] = useState(false);

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  const calculateDistance = () => {
    const h = parseFloat(height);
    if (isNaN(h) || h < 0) {
      alert('Будь ласка, введіть коректну висоту (число ≥ 0)');
      return;
    }

   
    const R = 6371; 
    const hInKm = h / 1000;
    const D = Math.sqrt(2 * R * hInKm);
    
    setDistance(D);
    setShowCalculation(true);
  };

  const clearResults = () => {
    setHeight('');
    setDistance(null);
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
            <h1>Симулятор горизонту</h1>
            <p className="topic1-subtitle">
              Обчисліть відстань до горизонту з будь-якої висоти над рівнем моря
            </p>
          </header>

          <section className="topic1-section">
            <h2>Про симулятор</h2>
            <div className="section-content">
              <p className="intro-text">
                Симулятор горизонту дозволяє обчислити відстань до видимого горизонту з будь-якої висоти 
                над рівнем моря. Це корисно для розуміння кривизни Землі та того, наскільки далеко можна 
                побачити з різних висот - від рівня моря до висоти літаків та супутників.
              </p>
              
              <div className="highlight-box">
                <p>
                  <strong>Формула розрахунку:</strong> D = √(2Rh)
                </p>
                <p>
                  де D — відстань до горизонту (км), R — радіус Землі (~6371 км), h — висота над рівнем моря (км)
                </p>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Калькулятор відстані до горизонту</h2>
            <div className="section-content">
              <div className="calculator-container">
                <div className="input-group">
                  <label htmlFor="height-input" className="input-label">
                    Висота над рівнем моря (м):
                  </label>
                  <input
                    id="height-input"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Введіть висоту в метрах"
                    className="height-input"
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <div className="button-group">
                  <button onClick={calculateDistance} className="calculate-btn">
                    Обчислити відстань
                  </button>
                  <button onClick={clearResults} className="clear-btn">
                    Очистити
                  </button>
                </div>

                {distance !== null && (
                  <div className="result-container">
                    <h3>Результат обчислення</h3>
                    <div className="result-value">
                      <span className="distance-value">{distance.toFixed(2)} км</span>
                      <p className="result-description">
                        З висоти {height} м ви можете побачити горизонт на відстані приблизно {distance.toFixed(2)} кілометрів
                      </p>
                    </div>
                    
                    {showCalculation && (
                      <div className="calculation-details">
                        <h4>Детальний розрахунок:</h4>
                        <div className="formula-steps">
                          <p><strong>Дано:</strong></p>
                          <ul>
                            <li>Висота (h) = {height} м = {(parseFloat(height) / 1000).toFixed(3)} км</li>
                            <li>Радіус Землі (R) = 6371 км</li>
                          </ul>
                          <p><strong>Формула:</strong> D = √(2Rh)</p>
                          <p><strong>Розрахунок:</strong></p>
                          <p>D = √(2 × 6371 × {(parseFloat(height) / 1000).toFixed(3)})</p>
                          <p>D = √({(2 * 6371 * parseFloat(height) / 1000).toFixed(3)})</p>
                          <p>D = {distance.toFixed(2)} км</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Приклади застосування</h2>
            <div className="section-content">
              <div className="mechanisms-grid">
                <div className="mechanism-card">
                  <h3>Рівень моря (0 м)</h3>
                  <p>
                    З рівня моря горизонт практично недосяжний через хвилі та атмосферні ефекти. 
                    Теоретично відстань становить 0 км, але в реальності видимість обмежена 
                    близько 4-5 км через рефракцію світла в атмосфері.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Висота людини (2 м)</h3>
                  <p>
                    Середня людина ростом 170-180 см з очима на висоті близько 2 м може бачити 
                    горизонт на відстані приблизно 5 км на ідеально рівній поверхні.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Вежа або гора (100 м)</h3>
                  <p>
                    З висоти 100 метрів (високий будинок або невелика гора) горизонт видно 
                    на відстані близько 35,7 км. Це пояснює, чому маяки будують високими.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Літак (10,000 м)</h3>
                  <p>
                    Комерційні літаки летять на висоті близько 10 км. З цієї висоти 
                    горизонт видно на відстані приблизно 357 км.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Космічна станція (400 км)</h3>
                  <p>
                    Міжнародна космічна станція обертається на висоті близько 400 км. 
                    З неї горизонт видно на відстані близько 2260 км, що дозволяє 
                    бачити значну частину континенту.
                  </p>
                </div>

                <div className="mechanism-card">
                  <h3>Супутник (36,000 км)</h3>
                  <p>
                    Геостаціонарні супутники знаходяться на висоті близько 36,000 км. 
                    З цієї висоти видно майже півкулі Землі - горизонт на відстані 
                    близько 21,400 км.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Фізичні принципи</h2>
            <div className="section-content">
              <div className="formula-box">
                <h4>Геометрія та кривизна Землі</h4>
                <p>
                  Відстань до горизонту визначається геометрією сфери та прямолінійним 
                  поширенням світла. Формула D = √(2Rh) випливає з теореми Піфагора, 
                  застосованої до трикутника, утвореного центром Землі, спостерігачем 
                  та точкою горизонту.
                </p>
              </div>

              <ul className="dynamics-list">
                <li><strong>Кривизна Землі:</strong> Земля має сферичну форму з радіусом близько 6371 км</li>
                <li><strong>Лінія видимості:</strong> Світло поширюється прямолінійно в однорідному середовищі</li>
                <li><strong>Атмосферна рефракція:</strong> В реальності атмосфера трохи збільшує видимість</li>
                <li><strong>Обмеження:</strong> Формула не враховує перешкоди, туман або забруднення повітря</li>
              </ul>
            </div>
          </section>

          <section className="topic1-section conclusion">
            <h2>Практичне значення</h2>
            <div className="section-content">
              <p>
                Розуміння відстані до горизонту має важливе практичне значення в навігації, 
                авіації, морській справі та космонавтиці. Ця концепція також допомагає 
                зрозуміти масштаби нашої планети та те, як кривизна Землі впливає на 
                повсякденне життя та технології.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HorizonSimulator;