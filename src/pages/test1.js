import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './topic1.css';
import { saveTestResult } from '../utils/accountUtils';

const questions = [
    {
      id: 1,
      question: "Що є головною теорією, яка пояснює походження геомагнітного поля Землі?",
      options: [
        "Динамо-ефект",
        "Гравітаційний ефект",
        "Електростатичне поле",
        "Сонячний вітер"
      ],
      correct: 0
    },
    {
      id: 2,
      question: "На якій глибині розташоване зовнішнє ядро Землі?",
      options: [
        "1 500 км",
        "2 900 км",
        "5 000 км",
        "6 400 км"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Що впливає на напрямок конвекційних потоків у зовнішньому ядрі?",
      options: [
        "Гравітація Місяця",
        "Сонячна радіація",
        "Ефект Коріоліса",
        "Магнітна індукція"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "З чого переважно складається зовнішнє ядро Землі?",
      options: [
        "Кремнію та кисню",
        "Заліза і нікелю",
        "Алюмінію та магнію",
        "Вуглецю та сірки"
      ],
      correct: 1
    },
    {
      id: 5,
      question: "Що таке магнітосфера?",
      options: [
        "Внутрішнє ядро Землі",
        "Зовнішній шар атмосфери",
        "Регіон навколо Землі, який захищає від космічного випромінювання",
        "Рідка частина мантії"
      ],
      correct: 2
    },
    {
      id: 6,
      question: "Яка швидкість зміщення магнітних полюсів Землі?",
      options: [
        "5-10 км/рік",
        "20-30 км/рік",
        "50-60 км/рік",
        "100-120 км/рік"
      ],
      correct: 2
    }
  ];

const Test1 = () => {
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
    saveTestResult(scorePercentage, 'Походження магнітного поля', correctAnswers, randomizedQuestions.length, {
      testType: 'Тест 1',
      difficulty: 'Базовий'
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
    if (percentage >= 80) return 'Відмінно! Ви добре засвоїли матеріал.';
    if (percentage >= 60) return 'Добре! Але варто повторити деякі моменти.';
    return 'Рекомендуємо перечитати матеріал та спробувати ще раз.';
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
            <h1>Тест: Походження геомагнітного поля Землі</h1>
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

export default Test1;