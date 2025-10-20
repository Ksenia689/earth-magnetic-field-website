import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Topic1 from './pages/topic1';
import Topic2 from './pages/topic2';
import Topic3 from './pages/topic3';
import Test1 from './pages/test1';
import Test2 from './pages/test2';
import Test3 from './pages/test3';
import HorizonSimulator from './pages/horizon';
import MagneticAnomalyMap from './pages/map';
import magneticFieldImage from './img/main2.png';
import magneticFieldGif from './img/Rotating-Earth-Magnetic-Field.gif';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Listen for hash changes to navigate between pages
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash === 'origin') {
        setCurrentPage('origin');
      } else if (hash === 'measurement') {
        setCurrentPage('measurement');
      } else if (hash === 'topic3') {
        setCurrentPage('topic3');
      } else if (hash === 'horizon') {
        setCurrentPage('horizon');
      } else if (hash === 'magnetic-anomalies-map') {
        setCurrentPage('magnetic-anomalies-map');
      } else if (hash === 'test1') {
        setCurrentPage('test1');
      } else if (hash === 'test2') {
        setCurrentPage('test2');
      } else if (hash === 'test3') {
        setCurrentPage('test3');
      } else {
        setCurrentPage('home');
      }
    };

    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
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
  
  if (currentPage === 'horizon') {
    return <HorizonSimulator />;
  }
  
  if (currentPage === 'magnetic-anomalies-map') {
    return <MagneticAnomalyMap />;
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
            Магнітне поле Землі — одне з фундаментальних природних явищ, яке забезпечує захист планети від шкідливого космічного випромінювання та сонячного вітру, впливаючи на формування атмосфери, розвиток біосфери та стабільність техногенного середовища. Вивчення його характеристик дає змогу глибше зрозуміти внутрішню структуру Землі, процеси у її ядрі та механізми формування геомагнітних явищ. Отримані результати мають важливе значення для прогнозування геомагнітних бур і забезпечення стабільної роботи енергетичних систем, супутникового зв'язку та навігації.
          </div>
        </div>

        <div className="content-container">
          <div className="description-text">
            Сучасні методи супутникового моніторингу, комп’ютерного моделювання та штучного інтелекту відкривають широкі можливості для глибшого аналізу геомагнітних даних, виявлення закономірностей у їхніх змінах та більш точного прогнозування динаміки магнітного поля Землі. Завдяки використанню високотехнологічних приладів і глобальних спостережень можливо відстежувати навіть незначні варіації магнітного поля, що дає змогу краще розуміти процеси, які відбуваються в надрах планети та у навколоземному просторі. Дослідження магнітного поля Землі залишається однією з ключових галузей геофізики, оскільки безперервний розвиток технологій, удосконалення методів спостережень і накопичення нових даних сприяють поглибленню знань про природу планети, її еволюцію та взаємодію з космічним середовищем.
          </div>
           <div className="gif-container">
          <img 
            src={magneticFieldGif} 
            alt="Rotating Earth Magnetic Field Animation" 
            className="magnetic-field-gif"
          />
        </div>
        </div>
       
      </main>
    </div>
  );
}

export default App;
