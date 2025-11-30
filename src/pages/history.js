import React from 'react';
import NavBar from '../components/NavBar';
import './topic1.css';

const History = () => {
  const handleBackToHome = () => {
    window.location.hash = '';
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
            <h1>Історія дослідження магнітних властивостей Землі</h1>
            <p className="topic1-subtitle">
              Магнітне поле Землі – це фундаментальне явище, яке супроводжує нашу планету протягом мільярдів років. 
              Його вплив на життя на Землі, навігацію та різноманітні геологічні процеси робить розуміння його 
              походження та еволюції надзвичайно важливим.
            </p>
          </header>

          <section className="topic1-section">
            <div className="section-content">
              <p className="intro-text">
                Магнітне поле Землі, невидиме, але потужне, протягом століть інтригувало людство. Від давніх 
                мореплавців, які використовували магнітний компас для орієнтації в океані, до сучасних вчених, 
                що досліджують його природу та вплив на нашу планету, інтерес до земного магнетизму ніколи не згасав.
              </p>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Таблиця історії дослідження магнітного поля</h2>
            <div className="section-content">
              <div className="history-timeline">
                <div className="timeline-item">
                  <div className="timeline-period">
                    <h3>Перші спостереження</h3>
                    <span className="period-date">Античні часи - 1000 н.е.</span>
                  </div>
                  <div className="timeline-content">
                    <p>
                      Дослідження магнітних властивостей розпочалися ще в античні часи. У Стародавньому Китаї 
                      магнітні властивості магнетиту були використані для створення перших компасів близько 
                      1000 року нашої ери. У Стародавній Греції Фалес Мілетський вивчав магнетит, але не міг 
                      пояснити його властивостей.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-period">
                    <h3>Середньовіччя та початок нових часів</h3>
                    <span className="period-date">Середні віки - 1600 рік</span>
                  </div>
                  <div className="timeline-content">
                    <ul className="timeline-list">
                      <li>У середні віки компас став важливим навігаційним інструментом, який дозволяв мореплавцям орієнтуватися за магнітним полем Землі.</li>
                      <li>У 1600 році <strong>Вільям Гілберт</strong> опублікував працю <em>De Magnete</em>, де вперше висловив ідею, що Земля — це великий магніт.</li>
                      <li>Гілберт також описав магнітні полюси і роль магнітного поля у навігації.</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-period">
                    <h3>XIX століття: початок систематичних вимірювань</h3>
                    <span className="period-date">1832 рік та далі</span>
                  </div>
                  <div className="timeline-content">
                    <ul className="timeline-list">
                      <li>У 1832 році <strong>Карл Гаусс</strong> створив перший прилад для точного вимірювання магнітного поля.</li>
                      <li>Він також розробив математичні методи аналізу магнітного поля, які стали основою сучасної геомагнетизму.</li>
                      <li>У цей час почали створюватися магнітні обсерваторії, що дозволило систематично спостерігати за варіаціями геомагнітного поля.</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-period">
                    <h3>XX століття: розвиток теорій і технологій</h3>
                    <span className="period-date">1905 - 1960-і роки</span>
                  </div>
                  <div className="timeline-content">
                    <ul className="timeline-list">
                      <li>У 1905 році було розроблено <strong>динамо-теорію</strong>, яка пояснює походження магнітного поля через рух рідкого заліза у зовнішньому ядрі Землі.</li>
                      <li>У 1960-х роках відкриття магнітних інверсій у породах океанічного дна підтвердило ідею про циклічність змін магнітного поля.</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-period">
                    <h3>Сучасні досягнення</h3>
                    <span className="period-date">XXI століття</span>
                  </div>
                  <div className="timeline-content">
                    <ul className="timeline-list">
                      <li>Супутникові місії, такі як <strong>Swarm</strong>, дозволяють отримувати глобальні дані про магнітне поле, вивчати його зміни у часі та прогнозувати магнітні бурі.</li>
                      <li>Геомагнітні моделі, такі як <strong>IGRF</strong> (Міжнародна геомагнітна модель), використовуються для практичних цілей, зокрема в навігації, авіації та геології.</li>
                      <li>Сучасні магнетометри забезпечують вимірювання змін магнітного поля в реальному часі, що важливо для моніторингу сонячної активності.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Ключові постаті в історії магнетизму</h2>
            <div className="mechanisms-grid">
              <div className="mechanism-card">
                <h3>Фалес Мілетський</h3>
                <p className="scientist-period">(близько 624-546 до н.е.)</p>
                <p>
                  Один з перших грецьких філософів, що вивчав магнітні властивості магнетиту. 
                  Хоча він не міг пояснити природу магнетизму, його спостереження заклали основи 
                  для майбутніх досліджень.
                </p>
              </div>

              <div className="mechanism-card">
                <h3>Вільям Гілберт</h3>
                <p className="scientist-period">(1544-1603)</p>
                <p>
                  Англійський лікар і фізик, автор праці "De Magnete" (1600). Перший висловив 
                  ідею про те, що Земля є великим магнітом, і систематизував знання про магнетизм 
                  свого часу.
                </p>
              </div>

              <div className="mechanism-card">
                <h3>Карл Фрідріх Гаусс</h3>
                <p className="scientist-period">(1777-1855)</p>
                <p>
                  Німецький математик і фізик, який створив перші точні прилади для вимірювання 
                  магнітного поля та розробив математичні методи його аналізу. Заснував сучасну 
                  науку геомагнетизм.
                </p>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Еволюція методів дослідження</h2>
            <div className="section-content">
              <div className="evolution-timeline">
                <div className="evolution-stage">
                  <h4>🧭 Давні часи</h4>
                  <p>Використання магнетиту для створення компасів та навігації</p>
                </div>
                <div className="evolution-arrow">→</div>
                <div className="evolution-stage">
                  <h4>📐 Середньовіччя</h4>
                  <p>Перші теоретичні роботи про природу магнетизму</p>
                </div>
                <div className="evolution-arrow">→</div>
                <div className="evolution-stage">
                  <h4>🔬 XIX століття</h4>
                  <p>Точні вимірювальні прилади та математичний аналіз</p>
                </div>
                <div className="evolution-arrow">→</div>
                <div className="evolution-stage">
                  <h4>⚗️ XX століття</h4>
                  <p>Розвиток теорій та відкриття магнітних інверсій</p>
                </div>
                <div className="evolution-arrow">→</div>
                <div className="evolution-stage">
                  <h4>🛰️ Сучасність</h4>
                  <p>Супутникові місії та глобальний моніторинг</p>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Важливість історичних досліджень</h2>
            <div className="section-content">
              <div className="highlight-box">
                <p>
                  Історія дослідження магнітних властивостей Землі демонструє, як розвиток науки дозволив 
                  зрозуміти складні процеси, які лежать в основі роботи нашої планети. Від перших компасів 
                  до сучасних супутників дослідження магнітного поля значно розширили наші знання про 
                  внутрішню будову Землі, сонячну активність і навіть еволюцію планети.
                </p>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>Сучасні виклики та перспективи</h2>
            <div className="section-content">
              <div className="challenges-grid">
                <div className="challenge-item">
                  <h4>🔄 Інверсії магнітного поля</h4>
                  <p>Дослідження механізмів та прогнозування майбутніх інверсій магнітних полюсів</p>
                </div>
                <div className="challenge-item">
                  <h4>☀️ Сонячна активність</h4>
                  <p>Вплив сонячних бур на магнітосферу та технологічну інфраструктуру</p>
                </div>
                <div className="challenge-item">
                  <h4>🌍 Кліматичні зміни</h4>
                  <p>Зв'язок між змінами магнітного поля та кліматичними процесами</p>
                </div>
                <div className="challenge-item">
                  <h4>🚀 Космічні дослідження</h4>
                  <p>Вивчення магнітних полів інших планет та їх порівняння з земним</p>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section conclusion">
            <h2>Висновки</h2>
            <div className="section-content">
              <p>
                Історія дослідження магнітного поля Землі показує неперервний розвиток людського розуміння 
                одного з найважливіших природних явищ нашої планети. Від перших примітивних спостережень 
                до сучасних високотехнологічних досліджень, кожне покоління вчених додавало нові фрагменти 
                до загальної картини земного магнетизму. Сьогодні ми стоїмо на порозі нових відкриттів, 
                що дозволять ще глибше зрозуміти природу магнітного поля та його роль в еволюції нашої планети.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default History;
