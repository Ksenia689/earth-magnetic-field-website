import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './topic1.css';
import { saveTestResult } from '../utils/accountUtils';

const questions = [
    {
      id: 1,
      question: "Який метод вимірювання магнітного поля найкраще підходить для дослідження локальних магнітних аномалій з високою точністю?",
      options: [
        "Космічні методи",
        "Наземні методи",
        "Аеромагнітні методи",
        "Морські методи"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Яка основна перевага аеромагнітних досліджень?",
      options: [
        "Найвища точність вимірювань",
        "Можливість дослідження океанічного дна",
        "Швидке охоплення великих територій",
        "Глобальне охоплення всієї планети"
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Що використовується в морських методах вимірювання магнітного поля?",
      options: [
        "Стаціонарні обсерваторії на дні океану",
        "Супутники на орбіті Землі",
        "Буксируваті магнетометри за судном",
        "Літаки з магнетометрами"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "Яке наукове відкриття стало можливим завдяки морським магнітним дослідженням?",
      options: [
        "Відкриття Курської магнітної аномалії",
        "Підтвердження теорії тектоніки плит",
        "Виявлення магнітосфери Землі", 
        "Розробка динамо-теорії"
      ],
      correct: 1
    },
    {
      id: 5,
      question: "Яка космічна місія згадується як приклад глобального дослідження магнітного поля Землі?",
      options: [
        "Voyager",
        "Hubble",
        "Swarm",
        "Cassini"
      ],
      correct: 2
    },
    {
      id: 6,
      question: "Для чого найчастіше використовуються наземні магнітні методи в археології?",
      options: [
        "Для вивчення клімату минулого",
        "Для виявлення прихованих металевих об'єктів та стародавніх поселень",
        "Для датування археологічних знахідок",
        "Для аналізу складу ґрунту"
      ],
      correct: 1
    },
    {
      id: 7,
      question: "Що дозволяють досліджувати космічні методи вимірювання магнітного поля, чого не можуть інші методи?",
      options: [
        "Локальні магнітні аномалії",
        "Магнітні властивості океанічного дна",
        "Магнітосферу та її взаємодію з сонячним вітром",
        "Магнітні властивості гірських порід"
      ],
      correct: 2
    },
    {
      id: 8,
      question: "Яка особливість характерна для аеромагнітних досліджень в арктичних районах?",
      options: [
        "Вони неможливі через низькі температури",
        "Вони використовуються для розвідки нафти та газу в важкодоступних умовах",
        "Вони мають найнижчу точність",
        "Вони потребують спеціальних підводних пристроїв"
      ],
      correct: 1
    },
    {
      id: 9,
      question: "Що таке Курська магнітна аномалія (КМА) в контексті магнітних досліджень?",
      options: [
        "Космічна місія по вивченню магнітного поля",
        "Район, де наземні магнітні дослідження сприяли створенню карт залізних руд",
        "Аеромагнітна станція в Росії",
        "Підводна магнітна аномалія"
      ],
      correct: 1
    },
    {
      id: 10,
      question: "Яка характеристика точності притаманна різним методам вимірювання (від найвищої до найнижчої)?",
      options: [
        "Космічні > Аеромагнітні > Наземні > Морські",
        "Наземні/Морські > Аеромагнітні > Космічні",
        "Аеромагнітні > Космічні > Наземні > Морські",
        "Морські > Наземні > Космічні > Аеромагнітні"
      ],
      correct: 1
    }
  ];

const Test2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const randomized = questions.map(question => {
      const optionsWithIndex = question.options.map((option, index) => ({
        text: option,
        originalIndex: index
      }));
      
      const shuffledOptions = shuffleArray(optionsWithIndex);
      const newCorrectIndex = shuffledOptions.findIndex(
        option => option.originalIndex === question.correct
      );

      return {
        ...question,
        options: shuffledOptions.map(option => option.text),
        correct: newCorrectIndex
      };
    });

    setRandomizedQuestions(shuffleArray(randomized));
  }, []);

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < randomizedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    randomizedQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
    
    const scorePercentage = Math.round((correctAnswers / randomizedQuestions.length) * 100);
    saveTestResult(scorePercentage, 'Методи вимірювання', correctAnswers, randomizedQuestions.length, {
      testType: 'Тест 2',
      difficulty: 'Середній'
    });
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    
    const randomized = questions.map(question => {
      const optionsWithIndex = question.options.map((option, index) => ({
        text: option,
        originalIndex: index
      }));
      
      const shuffledOptions = shuffleArray(optionsWithIndex);
      const newCorrectIndex = shuffledOptions.findIndex(
        option => option.originalIndex === question.correct
      );

      return {
        ...question,
        options: shuffledOptions.map(option => option.text),
        correct: newCorrectIndex
      };
    });

    setRandomizedQuestions(shuffleArray(randomized));
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'Відмінно! Ви добре засвоїли матеріал про методи вимірювання магнітного поля.';
    if (percentage >= 60) return 'Добре! Але варто повторити деякі методи вимірювання.';
    return 'Рекомендуємо перечитати матеріал про методи дослідження та спробувати ще раз.';
  };

  if (randomizedQuestions.length === 0) {
    return (
      <div className="topic1-page">
        <NavBar />
        <main className="topic1-content">
          <div className="topic1-container">
            <div className="loading-message">Завантаження тесту...</div>
          </div>
        </main>
      </div>
    );
  }

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
            <h1>Тест: Методи вимірювання магнітних властивостей Землі</h1>
          </header>

          {!showResults ? (
            <section className="topic1-section">
              <div className="test-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${((currentQuestion + 1) / randomizedQuestions.length) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className="progress-text">
                  Питання {currentQuestion + 1} з {randomizedQuestions.length}
                </p>
              </div>

              <div className="question-container">
                <h2 className="question-title">
                  {randomizedQuestions[currentQuestion].question}
                </h2>

                <div className="answers-container">
                  {randomizedQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`answer-option ${
                        selectedAnswers[currentQuestion] === index ? 'selected' : ''
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="option-text">{option}</span>
                    </button>
                  ))}
                </div>

                <div className="navigation-buttons">
                  {currentQuestion > 0 && (
                    <button 
                      onClick={handlePreviousQuestion}
                      className="nav-button prev-button"
                    >
                      ← Попереднє
                    </button>
                  )}
                  
                  {selectedAnswers[currentQuestion] !== undefined && (
                    <button 
                      onClick={handleNextQuestion}
                      className="nav-button next-button"
                    >
                      {currentQuestion === randomizedQuestions.length - 1 ? 'Завершити тест' : 'Наступне →'}
                    </button>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <section className="topic1-section">
              <div className="results-container">
                <h2 className="results-title">Результати тесту</h2>
                
                <div className="score-display">
                  <div 
                    className="score-circle"
                    style={{ borderColor: getScoreColor(score, randomizedQuestions.length) }}
                  >
                    <span 
                      className="score-text"
                      style={{ color: getScoreColor(score, randomizedQuestions.length) }}
                    >
                      {score}/{randomizedQuestions.length}
                    </span>
                    <span className="score-percentage">
                      {Math.round((score / randomizedQuestions.length) * 100)}%
                    </span>
                  </div>
                </div>

                <p 
                  className="score-message"
                  style={{ color: getScoreColor(score, randomizedQuestions.length) }}
                >
                  {getScoreMessage(score, randomizedQuestions.length)}
                </p>

                <div className="results-details">
                  <h3>Детальні результати:</h3>
                  {randomizedQuestions.map((question, index) => (
                    <div key={question.id} className="result-item">
                      <div className="result-question">
                        <strong>Питання {index + 1}:</strong> {question.question}
                      </div>
                      <div className="result-answer">
                        <span className={selectedAnswers[index] === question.correct ? 'correct' : 'incorrect'}>
                          Ваша відповідь: {question.options[selectedAnswers[index]] || 'Не відповіли'}
                        </span>
                        {selectedAnswers[index] !== question.correct && (
                          <span className="correct-answer">
                            Правильна відповідь: {question.options[question.correct]}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="results-actions">
                  <button onClick={resetTest} className="restart-button">
                    Пройти тест знову
                  </button>
                  <button onClick={handleBackToHome} className="home-button">
                    На головну сторінку
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Test2;