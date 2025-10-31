import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './topic1.css';
import greenAurora from '../img/green.gif';
import redAurora from '../img/red.gif';
import blueAurora from '../img/blue.gif';
import pinkAurora from '../img/pink.gif';

const AuroraPage = () => {
  const [particles, setParticles] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Aurora GIF images data
  const auroraImages = [
    {
      id: 'green',
      src: greenAurora,
      alt: 'Зелене полярне сяйво',
      title: 'Зелене сяйво (557.7 нм)',
      description: 'Найпоширеніший колір полярного сяйва, який виникає при взаємодії з атомами кисню'
    },
    {
      id: 'red',
      src: redAurora,
      alt: 'Червоне полярне сяйво',
      title: 'Червоне сяйво (630.0 нм)',
      description: 'Рідкісний колір, що з\'являється на великих висотах при низькій щільності атмосфери'
    },
    {
      id: 'blue',
      src: blueAurora,
      alt: 'Синє полярне сяйво',
      title: 'Синє сяйво (427.8 нм)',
      description: 'Найрідкісніший колір, що виникає при взаємодії з молекулами азоту'
    },
    {
      id: 'pink',
      src: pinkAurora,
      alt: 'Рожеве полярне сяйво',
      title: 'Рожеве сяйво',
      description: 'Комбінація червоного кисню та синього азоту створює рожевувато-пурпурові відтінки'
    }
  ];

  const handleNext = () => {
    setAutoPlay(false); // Stop auto-play when user manually navigates
    setActiveSlide((prev) => {
      const nextSlide = (prev + 1) % auroraImages.length;
      console.log('Next: from', prev, 'to', nextSlide);
      return nextSlide;
    });
    // Restart auto-play after 10 seconds
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const handlePrev = () => {
    setAutoPlay(false); // Stop auto-play when user manually navigates
    setActiveSlide((prev) => {
      const prevSlide = (prev - 1 + auroraImages.length) % auroraImages.length;
      console.log('Prev: from', prev, 'to', prevSlide);
      return prevSlide;
    });
    // Restart auto-play after 10 seconds
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const handleDotClick = (index) => {
    setAutoPlay(false); // Stop auto-play when user manually navigates
    console.log('Dot click: to', index);
    setActiveSlide(index);
    // Restart auto-play after 10 seconds
    setTimeout(() => setAutoPlay(true), 10000);
  };

  useEffect(() => {
    // Generate aurora particles for animation
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: ['#00ff88', '#0088ff', '#8800ff', '#ff0088'][Math.floor(Math.random() * 4)],
          animationDelay: Math.random() * 5,
          animationDuration: Math.random() * 3 + 2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  useEffect(() => {
    // Auto-advance slider only when autoPlay is true
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        const nextSlide = (prev + 1) % auroraImages.length;
        console.log('Auto-advance: from', prev, 'to', nextSlide);
        return nextSlide;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, auroraImages.length]);

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  return (
    <div className="topic1-page">
      <NavBar />
      
      {/* Aurora Effect Background */}
      <div className="aurora-container">
        <div className="aurora-wave aurora-wave-1"></div>
        <div className="aurora-wave aurora-wave-2"></div>
        <div className="aurora-wave aurora-wave-3"></div>
        
        {/* Animated particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="aurora-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>

      <main className="topic1-content">
        <div className="topic1-container">
          <div className="back-button-container">
            <button onClick={handleBackToHome} className="back-to-home-btn">
              ← Повернутися на головну
            </button>
          </div>
          
          <header className="topic1-header">
            <h1>Полярні сяйва: магнітне поле в дії</h1>
            <p className="topic1-subtitle">
              Дослідження одного з найкрасивіших природних явищ, що демонструє взаємодію 
              сонячного вітру з магнітосферою Землі
            </p>
          </header>

          <section className="topic1-section">
            <h2>Механізм утворення полярного сяйва</h2>
            <div className="section-content">
              <p className="intro-text">
                Одне з найкрасивіших явищ, пов'язаних із магнітними полярностями, — це полярні сяйва. 
                Вони виникають, коли заряджені частинки сонячного вітру проникають у магнітосферу Землі 
                та взаємодіють із молекулами в атмосфері. Ці частинки прямують до магнітних полюсів, 
                де магнітне поле найсильніше, і зіштовхуються з молекулами кисню та азоту. У результаті 
                ці зіткнення випромінюють світло, яке ми бачимо як яскраві сяйва на полюсах.
              </p>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Кольори полярних сяйв в дії</h2>
            <div className="section-content">
              <div className="simple-slider">
                <div className="slider-navigation">
                  <button className="nav-btn prev-btn" onClick={handlePrev}>
                    ❮
                  </button>
                  <button className="nav-btn next-btn" onClick={handleNext}>
                    ❯
                  </button>
                </div>

                <div className="slider-content">
                  <div className="slide-display">
                    <img 
                      src={auroraImages[activeSlide].src} 
                      alt={auroraImages[activeSlide].alt}
                      className="current-image"
                    />
                    <div className="slide-text">
                      <h3>{auroraImages[activeSlide].title}</h3>
                      <p>{auroraImages[activeSlide].description}</p>
                    </div>
                  </div>
                </div>

                <div className="slide-indicators">
                  {auroraImages.map((_, index) => (
                    <button 
                      key={index}
                      className={`indicator ${index === activeSlide ? 'active' : ''}`}
                      onClick={() => handleDotClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Спектр кольорів</h2>
            <div className="section-content">
              <div className="aurora-colors-grid">
                <div className="color-card green">
                  <div className="color-sample"></div>
                  <h3>Зелений (557.7 нм)</h3>
                  <p>Найпоширеніший колір. Виникає при зіткненні частинок з атомами кисню на висоті 100-300 км.</p>
                </div>
                
                <div className="color-card red">
                  <div className="color-sample"></div>
                  <h3>Червоний (630.0 нм)</h3>
                  <p>З'являється на великих висотах (300-400 км) при зіткненні з киснем при низькій щільності атмосфери.</p>
                </div>
                
                <div className="color-card blue">
                  <div className="color-sample"></div>
                  <h3>Синій/Фіолетовий (427.8 нм)</h3>
                  <p>Рідкісний колір, що виникає при взаємодії з молекулами азоту на нижніх висотах (80-100 км).</p>
                </div>
                
                <div className="color-card pink">
                  <div className="color-sample"></div>
                  <h3>Рожевий</h3>
                  <p>Комбінація червоного кисню та синього азоту, створює рожевувато-пурпурові відтінки.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Процес взаємодії частинок</h2>
            <div className="section-content">
              <div className="mechanisms-grid">
                <div className="mechanism-card">
                  <h3>1. Сонячний вітер</h3>
                  <p>
                    Потік заряджених частинок (протони та електрони) від Сонця рухається зі швидкістю 
                    300-800 км/с і досягає магнітосфери Землі через 1-4 дні після викиду з Сонця.
                  </p>
                </div>
                
                <div className="mechanism-card">
                  <h3>2. Магнітне перез'єднання</h3>
                  <p>
                    Коли магнітне поле сонячного вітру взаємодіє з магнітосферою Землі, відбувається 
                    перез'єднання силових ліній, що дозволяє частинкам проникати в атмосферу.
                  </p>
                </div>
                
                <div className="mechanism-card">
                  <h3>3. Прискорення частинок</h3>
                  <p>
                    Заряджені частинки прискорюються магнітним полем Землі і направляються вздовж 
                    силових ліній до полярних регіонів, де вони входять в атмосферу.
                  </p>
                </div>
                
                <div className="mechanism-card">
                  <h3>4. Зіткнення та емісія</h3>
                  <p>
                    При зіткненні з атомами кисню та азоту в атмосфері, частинки передають енергію, 
                    що призводить до випромінювання світла різних кольорів залежно від типу атома та висоти.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Типи полярних сяйв</h2>
            <div className="section-content">
              <div className="structure-info">
                <ul>
                  <li><strong>Дуги:</strong> Спокійні, стабільні структури, що простягаються вздовж геомагнітних широт</li>
                  <li><strong>Стрічки:</strong> Довгі, вузькі смуги світла з чіткими краями</li>
                  <li><strong>Промені:</strong> Вертикальні стовпи світла, орієнтовані вздовж силових ліній магнітного поля</li>
                  <li><strong>Корона:</strong> Радіальні промені, що розходяться від зеніту, виникають при спостереженні прямо під аврораль ним овалом</li>
                  <li><strong>Дифузне сяйво:</strong> Слабке, рівномірне свічення без чітких структур</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Геомагнітна активність та сяйва</h2>
            <div className="section-content">
              <div className="formula-box">
                <h4>Класифікація геомагнітних бур</h4>
                <ul>
                  <li><strong>G1 (слабка):</strong> Kp = 5, аврора видима до 60° геомагнітної широти</li>
                  <li><strong>G2 (помірна):</strong> Kp = 6, аврора видима до 55° геомагнітної широти</li>
                  <li><strong>G3 (сильна):</strong> Kp = 7, аврора видима до 50° геомагнітної широти</li>
                  <li><strong>G4 (важка):</strong> Kp = 8, аврора видима до 45° геомагнітної широти</li>
                  <li><strong>G5 (екстремальна):</strong> Kp = 9, аврора видима до 40° геомагнітної широти</li>
                </ul>
              </div>
              
              <p>
                Інтенсивність полярних сяйв безпосередньо залежить від геомагнітної активності. 
                Під час магнітних бур аврора може спостерігатися значно південніше звичайних 
                полярних регіонів, іноді навіть у помірних широтах.
              </p>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Енергетичні характеристики</h2>
            <div className="section-content">
              <div className="measurement-grid">
                <div className="measurement-card">
                  <h3>Енергія частинок</h3>
                  <p>1-10 кеВ для типових авроральних електронів</p>
                </div>
                
                <div className="measurement-card">
                  <h3>Висота емісії</h3>
                  <p>80-400 км над поверхнею Землі</p>
                </div>
                
                <div className="measurement-card">
                  <h3>Потужність сяйва</h3>
                  <p>10^9 - 10^12 Ватт під час активних періодів</p>
                </div>
                
                <div className="measurement-card">
                  <h3>Швидкість частинок</h3>
                  <p>5,000-20,000 км/с при входженні в атмосферу</p>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section conclusion">
            <h2>Наукове значення</h2>
            <div className="section-content">
              <p>
                Полярні сяйва є природною лабораторією для вивчення взаємодії сонячно-земних 
                зв'язків та фізики плазми. Їх дослідження допомагає розуміти космічну погоду, 
                прогнозувати геомагнітні бурі та їх вплив на технології, а також вивчати 
                фундаментальні процеси в магнітосферах планет. Сучасні супутникові місії та 
                наземні обсерваторії продовжують розкривати нові аспекти цього захоплюючого явища.
              </p>
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        .aurora-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .aurora-wave {
          position: absolute;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 255, 136, 0.1) 25%, 
            rgba(0, 136, 255, 0.1) 50%, 
            rgba(136, 0, 255, 0.1) 75%, 
            transparent 100%);
          animation: aurora-flow 20s ease-in-out infinite;
        }

        .aurora-wave-1 {
          top: 10%;
          left: -50%;
          animation-delay: 0s;
          transform: rotate(-5deg);
        }

        .aurora-wave-2 {
          top: 30%;
          left: -50%;
          animation-delay: -7s;
          transform: rotate(3deg);
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 0, 136, 0.08) 25%, 
            rgba(0, 255, 136, 0.08) 50%, 
            rgba(136, 0, 255, 0.08) 75%, 
            transparent 100%);
        }

        .aurora-wave-3 {
          top: 60%;
          left: -50%;
          animation-delay: -14s;
          transform: rotate(-2deg);
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 136, 255, 0.06) 25%, 
            rgba(255, 0, 136, 0.06) 50%, 
            rgba(0, 255, 136, 0.06) 75%, 
            transparent 100%);
        }

        @keyframes aurora-flow {
          0%, 100% {
            transform: translateX(-20%) rotate(-5deg);
            opacity: 0.3;
          }
          50% {
            transform: translateX(20%) rotate(5deg);
            opacity: 0.8;
          }
        }

        .aurora-particle {
          position: absolute;
          border-radius: 50%;
          animation: particle-float linear infinite;
          filter: blur(1px);
        }

        @keyframes particle-float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) translateX(50px);
            opacity: 0;
          }
        }

        .aurora-colors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .color-card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .color-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          border-radius: 15px 15px 0 0;
        }

        .color-card.green::before {
          background: linear-gradient(90deg, #00ff88, #00cc66);
        }

        .color-card.red::before {
          background: linear-gradient(90deg, #ff4444, #cc2222);
        }

        .color-card.blue::before {
          background: linear-gradient(90deg, #4488ff, #2266cc);
        }

        .color-card.pink::before {
          background: linear-gradient(90deg, #ff44aa, #cc2288);
        }

        .color-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .color-sample {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 auto 1rem;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          position: relative;
        }

        .green .color-sample {
          background: radial-gradient(circle, #00ff88, #00cc66);
          box-shadow: 0 0 30px rgba(0, 255, 136, 0.6);
        }

        .red .color-sample {
          background: radial-gradient(circle, #ff4444, #cc2222);
          box-shadow: 0 0 30px rgba(255, 68, 68, 0.6);
        }

        .blue .color-sample {
          background: radial-gradient(circle, #4488ff, #2266cc);
          box-shadow: 0 0 30px rgba(68, 136, 255, 0.6);
        }

        .pink .color-sample {
          background: radial-gradient(circle, #ff44aa, #cc2288);
          box-shadow: 0 0 30px rgba(255, 68, 170, 0.6);
        }

        .color-card h3 {
          text-align: center;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .color-card p {
          text-align: center;
          line-height: 1.6;
          margin: 0;
        }

        .simple-slider {
          margin: 2rem 0;
          position: relative;
        }

        .slider-navigation {
          position: absolute;
          top: 50%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          z-index: 10;
          pointer-events: none;
          transform: translateY(-50%);
        }

        .nav-btn {
          background: rgba(76, 175, 80, 0.8);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .nav-btn:hover {
          background: rgba(76, 175, 80, 1);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
        }

        .prev-btn {
          margin-left: 1rem;
        }

        .next-btn {
          margin-right: 1rem;
        }

        .slider-content {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .slide-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .current-image {
          width: 100%;
          max-width: 600px;
          height: 350px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .current-image:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
        }

        .slide-text {
          max-width: 600px;
        }

        .slide-text h3 {
          color: #4CAF50;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          margin-top: 0;
        }

        .slide-text p {
          color: #f0f0f0;
          font-size: 1.1rem;
          line-height: 1.7;
          margin: 0;
        }

        .slide-indicators {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.4);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #4CAF50;
          border-color: #4CAF50;
          box-shadow: 0 0 15px rgba(76, 175, 80, 0.6);
        }

        .indicator:hover {
          border-color: #4CAF50;
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .aurora-colors-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .color-card {
            padding: 1.2rem;
          }
          
          .color-sample {
            width: 50px;
            height: 50px;
          }

          .slider-content {
            padding: 1.5rem 1rem;
          }

          .current-image {
            height: 250px;
          }

          .nav-btn {
            width: 40px;
            height: 40px;
            font-size: 1.3rem;
          }

          .prev-btn {
            margin-left: 0.5rem;
          }

          .next-btn {
            margin-right: 0.5rem;
          }

          .slide-text h3 {
            font-size: 1.5rem;
          }

          .slide-text p {
            font-size: 1rem;
          }

          .slide-indicators {
            gap: 0.8rem;
            margin-top: 1.5rem;
          }

          .indicator {
            width: 10px;
            height: 10px;
          }
        }

        @media (max-width: 480px) {
          .current-image {
            height: 200px;
          }

          .slide-text h3 {
            font-size: 1.3rem;
          }

          .slide-text p {
            font-size: 0.95rem;
          }

          .slider-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AuroraPage;
