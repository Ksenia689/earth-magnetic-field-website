import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import './topic1.css';
import m1Image from '../img/m1.png';
import m2Image from '../img/m2.webp';
import m3Image from '../img/m3.jpg';
import m4Image from '../img/m4.png';

const Topic2 = () => {
  const [showMethodsImage, setShowMethodsImage] = useState(false);
  const [flippedCards, setFlippedCards] = useState({
    ground: false,
    aeromagnetic: false,
    marine: false,
    space: false
  });

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  const toggleMethodsImage = () => {
    setShowMethodsImage(!showMethodsImage);
  };

  const toggleCard = (cardType) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardType]: !prev[cardType]
    }));
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
            <h1>Методи вимірювання магнітних властивостей Землі</h1>
          </header>

          <section className="topic1-section">
            <div className="section-content">
              <p className="intro-text">
                Магнітне поле Землі є фундаментальним геофізичним явищем, яке досліджується різними методами. 
                Вибір методу залежить від масштабу дослідження (локальні або глобальні задачі), доступності 
                території, потреби у точності даних та особливостей магнітних аномалій. У цьому розділі 
                розглянемо наземні, аеромагнітні, морські та космічні методи, а також їхню специфіку та 
                практичне застосування.
              </p>
            </div>
          </section>

          <section className="topic1-section">
            <h2 
              onClick={toggleMethodsImage} 
              className="clickable-heading"
              style={{ cursor: 'pointer' }}
            >
              Огляд методів вимірювання {showMethodsImage ? '▲' : '▼'}
            </h2>
            <div className="section-content">
              {showMethodsImage && (
                <div className="highlight-box">
                  <p>
                    Сучасні методи дослідження магнітного поля можна класифікувати за місцем проведення: 
                    <strong>наземні, аеромагнітні, морські та космічні</strong>. Кожен метод має свої переваги 
                    та область застосування, забезпечуючи комплексний підхід до вивчення геомагнітного поля.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="topic1-section">
            <h2>Наземні методи</h2>
            <div className="section-content">
              <p>
                Наземні дослідження магнітного поля є найбільш поширеним способом вимірювання магнітних 
                властивостей Землі, особливо у геології та археології. Ці методи дозволяють з високою 
                точністю вивчати локальні магнітні аномалії, створювати карти магнітного поля певного 
                регіону та моніторити зміни магнітного поля в конкретних точках.
              </p>

              <div className="highlight-box">
                <h4>Основні особливості наземних методів:</h4>
                <ul className="structure-info">
                  <li><strong>Висока деталізація:</strong> дані збираються у вузько визначених точках, що дозволяє фіксувати локальні відхилення магнітного поля</li>
                  <li><strong>Зручність застосування:</strong> переносні магнетометри легкі у використанні, що дає можливість проводити дослідження навіть у важкодоступних місцях</li>
                  <li><strong>Стаціонарний моніторинг:</strong> магнітні обсерваторії постійно фіксують зміни магнітного поля, що важливо для аналізу магнітних бур і геомагнітних варіацій</li>
                </ul>
              </div>

              <div className="mechanism-card">
                <h3>Процес проведення наземних досліджень:</h3>
                <p>
                  Спочатку визначають об'єкт дослідження (наприклад, зона можливого розташування магнітної 
                  аномалії або район геологічного інтересу). Далі розміщують магнетометри в точках із певним 
                  інтервалом. Після вимірювань створюють карту розподілу магнітного поля, аналізуючи варіації 
                  сили поля.
                </p>
              </div>

              <div className="formula-box">
                <h4>Практичне застосування</h4>
                <p>
                  Наземні методи часто використовуються в археології для виявлення прихованих металевих 
                  об'єктів, залишків споруд чи стародавніх поселень. Також їх застосовують у пошуку 
                  залізної руди, магнетиту та інших корисних копалин.
                </p>
                <p>
                  <strong>Приклад:</strong> У районі Курської магнітної аномалії (КМА) наземні магнітні 
                  дослідження дозволили створити детальні карти розподілу залізних руд, що сприяло їхньому видобутку.
                </p>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Аеромагнітні дослідження</h2>
            <div className="section-content">
              <p>
                Аеромагнітний метод вимірювання магнітного поля застосовується для дослідження великих 
                територій. Цей метод заснований на використанні літальних апаратів (літаків, вертольотів 
                або дронів), оснащених магнетометрами, які вимірюють силу магнітного поля під час польоту.
              </p>

              <div className="mechanisms-grid">
                <div className="mechanism-card">
                  <h3>Переваги аеромагнітного методу:</h3>
                  <ul className="magnetosphere-list">
                    <li><strong>Швидкість дослідження:</strong> за короткий час можна охопити великі площі</li>
                    <li><strong>Недоступні території:</strong> метод підходить для досліджень у важкодоступних районах, таких як пустелі, гори чи тундра</li>
                    <li><strong>Високий рівень автоматизації:</strong> сучасні магнетометри автоматично записують дані, які пізніше аналізуються за допомогою програмного забезпечення</li>
                  </ul>
                </div>

                <div className="mechanism-card">
                  <h3>Процедура проведення:</h3>
                  <p>
                    Літак або дрон обладнують магнетометром, який фіксує магнітне поле під час польоту. 
                    Дані записуються у вигляді значень магнітного поля вздовж маршруту польоту. 
                    Після цього створюється карта магнітного поля із вказівкою регіональних аномалій.
                  </p>
                </div>
              </div>

              <div className="formula-box">
                <h4>Приклад застосування</h4>
                <p>
                  Аеромагнітний метод широко використовується для розвідки нафти та газу в арктичних 
                  районах, де наземні дослідження ускладнені кліматичними умовами.
                </p>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Морські методи</h2>
            <div className="section-content">
              <p>
                Магнітні дослідження океанічного дна здійснюються за допомогою буксируваних магнетометрів, 
                які занурюють у воду на певну глибину. Такі методи дозволяють вивчати магнітні властивості 
                морського дна, виявляти підводні аномалії та визначати структуру океанічних плит.
              </p>

              <div className="mechanisms-grid">
                <div className="mechanism-card">
                  <h3>Особливості морських методів:</h3>
                  <ul className="dynamics-list">
                    <li><strong>Аналіз тектонічних плит:</strong> дані про магнітні інверсії в породах океанічного дна допомогли розробити теорію спредингу морського дна</li>
                    <li><strong>Виявлення підводних об'єктів:</strong> магнетометри допомагають знаходити затонулі судна, підводні кабелі чи рифові системи</li>
                  </ul>
                </div>

                <div className="mechanism-card">
                  <h3>Процес дослідження:</h3>
                  <p>
                    Пристрій буксирують за судном уздовж маршруту дослідження. Магнетометр фіксує 
                    магнітне поле та реєструє аномалії. Це дозволяє створювати детальні карти 
                    магнітного поля океанічного дна.
                  </p>
                </div>
              </div>

              <div className="formula-box">
                <h4>Науковий прорив</h4>
                <p>
                  Використання морських магнітних досліджень у Тихому океані підтвердило існування 
                  серій магнітних інверсій, що стало основою для підтвердження теорії тектоніки плит.
                </p>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Космічні методи</h2>
            <div className="section-content">
              <p>
                Космічні методи дослідження магнітного поля базуються на використанні супутників. 
                Місія Swarm Європейського космічного агентства є прикладом глобального дослідження 
                магнітного поля Землі.
              </p>

              <div className="highlight-box">
                <h4>Переваги космічних методів:</h4>
                <ul className="structure-info">
                  <li><strong>Глобальне охоплення даних:</strong> можливість дослідження всієї планети одночасно</li>
                  <li><strong>Вивчення магнітосфери:</strong> дослідження взаємодії магнітного поля із сонячним вітром</li>
                  <li><strong>Моніторинг змін у часі:</strong> постійне відстеження еволюції магнітного поля</li>
                </ul>
              </div>

              <div className="mechanism-card">
                <h3>Унікальні можливості</h3>
                <p>
                  Супутники дозволяють фіксувати зміни магнітного поля на великих висотах, що недоступно 
                  для наземних чи аеромагнітних методів. Це надає змогу вивчати магнітосферу та її 
                  динаміку в режимі реального часу.
                </p>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Порівняння методів вимірювання</h2>
            <div className="section-content">
              <div className="measurement-grid">
                <div 
                  className={`measurement-card flip-card ${flippedCards.ground ? 'flipped' : ''}`}
                  onClick={() => toggleCard('ground')}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h3>Наземні</h3>
                      <p><strong>Область:</strong> Локальні дослідження</p>
                      <p><strong>Точність:</strong> Висока</p>
                      <p><strong>Охоплення:</strong> Обмежене</p>
                      <div className="flip-hint">Натисніть для перегляду зображення</div>
                    </div>
                    <div className="flip-card-back">
                      <img 
                        src={m1Image} 
                        alt="Наземні методи вимірювання магнітного поля" 
                        className="measurement-image"
                      />
                      <div className="flip-hint">Натисніть для повернення до тексту</div>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`measurement-card flip-card ${flippedCards.aeromagnetic ? 'flipped' : ''}`}
                  onClick={() => toggleCard('aeromagnetic')}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h3>Аеромагнітні</h3>
                      <p><strong>Область:</strong> Регіональні дослідження</p>
                      <p><strong>Точність:</strong> Середня</p>
                      <p><strong>Охоплення:</strong> Великі території</p>
                      <div className="flip-hint">Натисніть для перегляду зображення</div>
                    </div>
                    <div className="flip-card-back">
                      <img 
                        src={m2Image} 
                        alt="Аеромагнітні методи вимірювання магнітного поля" 
                        className="measurement-image"
                      />
                      <div className="flip-hint">Натисніть для повернення до тексту</div>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`measurement-card flip-card ${flippedCards.marine ? 'flipped' : ''}`}
                  onClick={() => toggleCard('marine')}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h3>Морські</h3>
                      <p><strong>Область:</strong> Океанічне дно</p>
                      <p><strong>Точність:</strong> Висока</p>
                      <p><strong>Охоплення:</strong> Морські акваторії</p>
                      <div className="flip-hint">Натисніть для перегляду зображення</div>
                    </div>
                    <div className="flip-card-back">
                      <img 
                        src={m3Image} 
                        alt="Морські методи вимірювання магнітного поля" 
                        className="measurement-image"
                      />
                      <div className="flip-hint">Натисніть для повернення до тексту</div>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`measurement-card flip-card ${flippedCards.space ? 'flipped' : ''}`}
                  onClick={() => toggleCard('space')}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h3>Космічні</h3>
                      <p><strong>Область:</strong> Глобальні дослідження</p>
                      <p><strong>Точність:</strong> Середня</p>
                      <p><strong>Охоплення:</strong> Вся планета</p>
                      <div className="flip-hint">Натисніть для перегляду зображення</div>
                    </div>
                    <div className="flip-card-back">
                      <img 
                        src={m4Image} 
                        alt="Космічні методи вимірювання магнітного поля" 
                        className="measurement-image"
                      />
                      <div className="flip-hint">Натисніть для повернення до тексту</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section conclusion">
            <h2>Висновки</h2>
            <div className="section-content">
              <p>
                Комплексне застосування різних методів вимірювання магнітного поля Землі забезпечує 
                повноцінне розуміння геомагнітних процесів. Кожен метод має свої переваги: наземні 
                методи надають високу деталізацію, аеромагнітні покривають великі території, морські 
                розкривають таємниці океанічного дна, а космічні забезпечують глобальний моніторинг. 
                Поєднання цих підходів дозволяє створювати точні моделі магнітного поля та прогнозувати 
                його зміни.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Topic2;
