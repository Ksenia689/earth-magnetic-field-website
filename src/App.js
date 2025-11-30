import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Topic1 from './pages/topic1';
import Topic2 from './pages/topic2';
import Topic3 from './pages/topic3';
import AuroraPage from './pages/aurora';
import History from './pages/history';
import Test1 from './pages/test1';
import Test2 from './pages/test2';
import Test3 from './pages/test3';
import HorizonSimulator from './pages/horizon';
import MagneticAnomalyMap from './pages/map';
import MissionAuroraGame from './pages/game';
import Account from './pages/account';
import magneticFieldImage from './img/main2.png';
import magneticFieldGif from './img/Rotating-Earth-Magnetic-Field.gif';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash === 'origin') {
        setCurrentPage('origin');
      } else if (hash === 'measurement') {
        setCurrentPage('measurement');
      } else if (hash === 'topic3') {
        setCurrentPage('topic3');
      } else if (hash === 'aurora') {
        setCurrentPage('aurora');
      } else if (hash === 'history') {
        setCurrentPage('history');
      } else if (hash === 'horizon') {
        setCurrentPage('horizon');
      } else if (hash === 'magnetic-anomalies-map') {
        setCurrentPage('magnetic-anomalies-map');
      } else if (hash === 'mission-aurora') {
        setCurrentPage('mission-aurora');
      } else if (hash === 'test1') {
        setCurrentPage('test1');
      } else if (hash === 'test2') {
        setCurrentPage('test2');
      } else if (hash === 'test3') {
        setCurrentPage('test3');
      } else if (hash === 'account') {
        setCurrentPage('account');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (currentPage === 'origin') {
    return <Topic1 />;
  }
  
  if (currentPage === 'measurement') {
    return <Topic2 />;
  }
  
  if (currentPage === 'topic3') {
    return <Topic3 />;
  }
  
  if (currentPage === 'aurora') {
    return <AuroraPage />;
  }
  
  if (currentPage === 'history') {
    return <History />;
  }
  
  if (currentPage === 'horizon') {
    return <HorizonSimulator />;
  }
  
  if (currentPage === 'magnetic-anomalies-map') {
    return <MagneticAnomalyMap />;
  }
  
  if (currentPage === 'mission-aurora') {
    return <MissionAuroraGame />;
  }
  
  if (currentPage === 'test1') {
    return <Test1 />;
  }
  
  if (currentPage === 'test2') {
    return <Test2 />;
  }
  
  if (currentPage === 'test3') {
    return <Test3 />;
  }
  
  if (currentPage === 'account') {
    return <Account />;
  }
  
  return (
    <div className="App">
      <NavBar />
      <main className="main-content">
        <div className="content-container">
          <img 
            src={magneticFieldImage} 
            alt="Earth's Magnetic Field" 
            className="side-image"
          />
          <div className="description-text">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ffd700' }}>
              Магнітне поле Землі
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              Актуальність теми дослідження характеристик магнітного поля Землі обумовлена її науковою значимістю, 
              широким спектром практичних застосувань та необхідністю вирішення сучасних викликів, пов'язаних 
              зі зміною клімату і розвитком технологій.
            </p>
            <p>
              Магнітне поле Землі — одне з фундаментальних природних явищ, яке забезпечує захист планети від 
              шкідливого космічного випромінювання та сонячного вітру, впливаючи на формування атмосфери, 
              розвиток біосфери та стабільність техногенного середовища.
            </p>
          </div>
        </div>

        <div className="content-container">
          <div className="description-text">
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#87ceeb' }}>
              Чому це важливо?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <h3 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>🌍 Розуміння процесів у ядрі</h3>
                <p>Вивчення магнітного поля допомагає отримувати інформацію про процеси, що відбуваються у ядрі Землі, та про її динаміку.</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <h3 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>⚡ Прогнозування геомагнітних бур</h3>
                <p>Знання характеристик дозволяє прогнозувати геомагнітні бурі, які впливають на системи зв'язку, енергетику та GPS.</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <h3 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>🏔️ Геологічні дослідження</h3>
                <p>Магнітні властивості гірських порід допомагають реконструювати історію Землі та вивчати тектонічні рухи.</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <h3 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>🧭 Навігація та пошук ресурсів</h3>
                <p>Використовується в компасах, GPS та для виявлення родовищ корисних копалин.</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <h3 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>🛡️ Захист від космічної радіації</h3>
                <p>Магнітне поле захищає нас від шкідливого впливу сонячного вітру і космічних променів.</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <h3 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>🪐 Планетарні дослідження</h3>
                <p>Вивчення магнітних полів інших планет допомагає розуміти процеси у Сонячній системі.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-container">
          <div className="gif-container">
            <img 
              src={magneticFieldGif} 
              alt="Rotating Earth Magnetic Field Animation" 
              className="magnetic-field-gif"
            />
          </div>
          <div className="description-text">
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#87ceeb' }}>
              Об'єкт та предмет дослідження
            </h2>
            <div style={{ background: 'rgba(135, 206, 235, 0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem', border: '2px solid rgba(135, 206, 235, 0.3)' }}>
              <h3 style={{ color: '#87ceeb', marginBottom: '0.8rem' }}>Об'єкт дослідження:</h3>
              <p>Магнітне поле Землі, як природне явище, його властивості, зміни та взаємодію з іншими природними процесами.</p>
            </div>
            <div style={{ background: 'rgba(255, 215, 0, 0.2)', padding: '1.5rem', borderRadius: '12px', border: '2px solid rgba(255, 215, 0, 0.3)' }}>
              <h3 style={{ color: '#ffd700', marginBottom: '0.8rem' }}>Предмет дослідження:</h3>
              <p>Зміни та взаємодія магнітного поля Землі з іншими природними процесами.</p>
            </div>
          </div>
        </div>

        <div className="content-container">
          <div className="description-text">
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#87ceeb' }}>
              Сучасні технології та новизна досліджень
            </h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              Хоча дослідження магнітного поля Землі ведуться вже не одне століття, ця тема все ще зберігає 
              свою актуальність і новизну завдяки кільком ключовим факторам:
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ background: 'linear-gradient(45deg, rgba(135, 206, 235, 0.2), rgba(255, 215, 0, 0.1))', padding: '1.2rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                <h4 style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>📡 Супутникові технології</h4>
                <p>Глобальне покриття і дослідження на різних висотах</p>
              </div>
              <div style={{ background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.2), rgba(135, 206, 235, 0.1))', padding: '1.2rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>🔬 Точні магнітометри</h4>
                <p>Детальніша інформація про магнітне поле</p>
              </div>
              <div style={{ background: 'linear-gradient(45deg, rgba(135, 206, 235, 0.2), rgba(255, 215, 0, 0.1))', padding: '1.2rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                <h4 style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>💻 Комп'ютерне моделювання</h4>
                <p>Складні математичні моделі з урахуванням багатьох факторів</p>
              </div>
              <div style={{ background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.2), rgba(135, 206, 235, 0.1))', padding: '1.2rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>🤖 Штучний інтелект</h4>
                <p>Виявлення закономірностей у великих обсягах даних</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-container">
          <div className="description-text">
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#87ceeb' }}>
              Сучасні напрямки досліджень
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #87ceeb' }}>
                <strong style={{ color: '#87ceeb' }}>🌡️ Зв'язок з кліматом:</strong> Вивчається взаємозв'язок між змінами магнітного поля і кліматичними процесами
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ffd700' }}>
                <strong style={{ color: '#ffd700' }}>⚡ Динамо-теорія:</strong> Не всі аспекти теорії, що пояснює походження магнітного поля, повністю з'ясовані
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #87ceeb' }}>
                <strong style={{ color: '#87ceeb' }}>🔮 Прогнозування бур:</strong> Розробка методів прогнозування геомагнітних бур з більшою точністю
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ffd700' }}>
                <strong style={{ color: '#ffd700' }}>🏭 Вплив людини:</strong> Досліджується вплив людської діяльності на магнітне поле Землі
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #87ceeb' }}>
                <strong style={{ color: '#87ceeb' }}>🏺 Археомагнетизм:</strong> Використання магнітних властивостей для реконструкції давніх магнітних полів
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ffd700' }}>
                <strong style={{ color: '#ffd700' }}>🧬 Біологічний вплив:</strong> Дослідження впливу магнітного поля на живі організми
              </div>
            </div>
          </div>
        </div>

        <div className="content-container">
          <div className="description-text" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#ffd700' }}>
              Досліджуйте разом з нами!
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              Використовуйте наші інтерактивні інструменти та тести для глибшого розуміння магнітного поля Землі
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <a 
                href="#origin" 
                style={{ 
                  background: 'linear-gradient(45deg, #1e3c72, #2a5298)', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: '25px', 
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  fontSize: '1.1rem'
                }}
              >
                📚 База знань
              </a>
              <a 
                href="#horizon" 
                style={{ 
                  background: 'linear-gradient(45deg, #2a5298, #1e3c72)', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: '25px', 
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  fontSize: '1.1rem'
                }}
              >
                🧪 Експерименти
              </a>
              <a 
                href="#test1" 
                style={{ 
                  background: 'linear-gradient(45deg, #1e3c72, #2a5298)', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: '25px', 
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  fontSize: '1.1rem'
                }}
              >
                📝 Тести
              </a>
            </div>
          </div>
        </div>
       
      </main>
    </div>
  );
}

export default App;