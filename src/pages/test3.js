import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './topic1.css';
import { saveTestResult } from '../utils/accountUtils';

const questions = [
    {
      id: 1,
      question: "Що таке магнітні аномалії?",
      options: [
        "Відхилення магнітного поля Землі від його середніх значень",
        "Постійні зміни магнітних полюсів планети",
        "Електричні струми в атмосфері Землі",
        "Взаємодія сонячного вітру з магнітосферою"
      ],
      correct: 0
    },
    {
      id: 2,
      question: "Яка з перелічених НЕ є причиною виникнення магнітних аномалій?",
      options: [
        "Неоднорідність магнітних властивостей гірських порід",
        "Наявність підземних металевих об'єктів",
        "Тектонічні процеси",
        "Зміна швидкості обертання Землі"
      ],
      correct: 3
    },
    {
      id: 3,
      question: "Які аномалії охоплюють найбільші площі - від десятків до тисяч квадратних кілометрів?",
      options: [
        "Локальні аномалії",
        "Техногенні аномалії",
        "Регіональні аномалії",
        "Космічні аномалії"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "Що є прикладом регіональної магнітної аномалії?",
      options: [
        "Залишки військової техніки",
        "Курська магнітна аномалія (КМА)",
        "Підземні кабелі",
        "Археологічні об'єкти"
      ],
      correct: 1
    },
    {
      id: 5,
      question: "Локальні магнітні аномалії пов'язані з:",
      options: [
        "Великими тектонічними плитами",
        "Магматичними осередками",
        "Меншими структурами як рудні поклади та металеві споруди",
        "Зонами субдукції"
      ],
      correct: 2
    },
    {
      id: 6,
      question: "Техногенні аномалії викликані:",
      options: [
        "Природними геологічними процесами",
        "Діяльністю людини",
        "Космічним випромінюванням",
        "Вулканічною активністю"
      ],
      correct: 1
    },
    {
      id: 7,
      question: "Який з методів НЕ використовується для аналізу магнітних аномалій?",
      options: [
        "Наземні магнетометри",
        "Аеромагнітні методи",
        "Морські магнетометри",
        "Ультразвукове сканування"
      ],
      correct: 3
    },
    {
      id: 8,
      question: "Яка площа Курської магнітної аномалії (КМА)?",
      options: [
        "Близько 12 000 км²",
        "Близько 120 000 км²",
        "Близько 1 200 км²",
        "Близько 1 200 000 км²"
      ],
      correct: 1
    },
    {
      id: 9,
      question: "Інтенсивність магнітної аномалії КМА може досягати:",
      options: [
        "До 300 нТл",
        "До 3000 нТл",
        "До 30 нТл",
        "До 30 000 нТл"
      ],
      correct: 1
    },
    {
      id: 10,
      question: "Який тип магнітометра має найвищу чутливість?",
      options: [
        "Протонні магнітометри",
        "Флюксгейтові магнітометри",
        "Квантові магнітометри",
        "SQUID магнітометри"
      ],
      correct: 3
    },
    {
      id: 11,
      question: "Магнітні аномалії в археології використовуються для:",
      options: [
        "Датування знахідок",
        "Виявлення прихованих металевих об'єктів та стародавніх поселень",
        "Вивчення клімату минулого",
        "Аналізу ДНК археологічних знахідок"
      ],
      correct: 1
    },
    {
      id: 12,
      question: "У військових дослідженнях магнітні аномалії допомагають виявити:",
      options: [
        "Тільки підводні об'єкти",
        "Прихованих ворогів",
        "Міни, боєприпаси, тунелі та затонулі судна",
        "Радіоактивні матеріали"
      ],
      correct: 2
    },
    {
      id: 13,
      question: "Що таке градієнтні карти в контексті магнітних аномалій?",
      options: [
        "Карти, що показують температурні зміни",
        "Карти, що підкреслюють межі аномалій та їх структурні особливості",
        "Карти висот рельєфу",
        "Карти розподілу населення"
      ],
      correct: 1
    },
    {
      id: 14,
      question: "Яка з перспектив розвитку аналізу магнітних аномалій згадується в тексті?",
      options: [
        "Використання ядерних технологій",
        "Використання машинного навчання для автоматизації аналізу",
        "Використання біотехнологій",
        "Використання квантових комп'ютерів"
      ],
      correct: 1
    },
    {
      id: 15,
      question: "Основним викликом в аналізі магнітних аномалій є:",
      options: [
        "Висока вартість обладнання",
        "Вплив техногенних шумів та складність інтерпретації багатофакторних аномалій",
        "Недостатня кількість спеціалістів",
        "Погодні умови"
      ],
      correct: 1
    }
  ];

const Test3 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);

  // Shuffle array function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Randomize questions and their options on component mount
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
    
    // Save test result to account if user is logged in
    const scorePercentage = Math.round((correctAnswers / randomizedQuestions.length) * 100);
    saveTestResult(scorePercentage, 'Магнітні аномалії', correctAnswers, randomizedQuestions.length, {
      testType: 'Тест 3',
      difficulty: 'Просунутий'
    });
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    
    // Re-randomize questions and options
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
    if (percentage >= 80) return 'Відмінно! Ви добре засвоїли матеріал про магнітні аномалії та їх аналіз.';
    if (percentage >= 60) return 'Добре! Але варто повторити деякі аспекти магнітних аномалій.';
    return 'Рекомендуємо перечитати матеріал про магнітні аномалії та спробувати ще раз.';
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
            <h1>Тест: Магнітні аномалії та їх аналіз</h1>
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

export default Test3;
