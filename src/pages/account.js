import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './topic1.css';

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [userResults, setUserResults] = useState({
    gameResults: [],
    testResults: []
  });

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsLoggedIn(true);
      loadUserResults(user.username);
    }
  }, []);

  // Load user results from localStorage
  const loadUserResults = (username) => {
    const users = JSON.parse(localStorage.getItem('earthMagneticUsers') || '{}');
    if (users[username]) {
      setUserResults(users[username].results || { gameResults: [], testResults: [] });
    }
  };

  // Save user results to localStorage
  const saveUserResults = (username, results) => {
    const users = JSON.parse(localStorage.getItem('earthMagneticUsers') || '{}');
    if (!users[username]) {
      users[username] = { password: users[username]?.password || '', results: { gameResults: [], testResults: [] } };
    }
    users[username].results = results;
    localStorage.setItem('earthMagneticUsers', JSON.stringify(users));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('earthMagneticUsers') || '{}');

    if (isSignUp) {
      // Sign Up
      if (formData.password !== formData.confirmPassword) {
        setError('Паролі не співпадають');
        return;
      }
      if (formData.username.length < 3) {
        setError('Ім\'я користувача має містити принаймні 3 символи');
        return;
      }
      if (formData.password.length < 4) {
        setError('Пароль має містити принаймні 4 символи');
        return;
      }
      if (users[formData.username]) {
        setError('Користувач з таким ім\'ям вже існує');
        return;
      }

      // Create new user
      users[formData.username] = {
        password: formData.password,
        results: {
          gameResults: [],
          testResults: []
        }
      };
      localStorage.setItem('earthMagneticUsers', JSON.stringify(users));
      
      const user = { username: formData.username };
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setUserResults({ gameResults: [], testResults: [] });
      setFormData({ username: '', password: '', confirmPassword: '' });
      setError('');
    } else {
      // Sign In
      if (!users[formData.username]) {
        setError('Користувача з таким ім\'ям не знайдено');
        return;
      }
      if (users[formData.username].password !== formData.password) {
        setError('Неправильний пароль');
        return;
      }

      // Login successful
      const user = { username: formData.username };
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      loadUserResults(formData.username);
      setFormData({ username: '', password: '', confirmPassword: '' });
      setError('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserResults({ gameResults: [], testResults: [] });
    localStorage.removeItem('currentUser');
  };

  if (!isLoggedIn) {
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
              <h1>Особистий кабінет</h1>
            </header>

            <section className="topic1-section">
              <div className="section-content">
                <p className="intro-text">
                  Створіть обліковий запис або увійдіть, щоб зберігати результати тестів та ігор. 
                  Ваші дані зберігаються локально у вашому браузері.
                </p>
              </div>
            </section>

            <section className="topic1-section">
              <h2>{isSignUp ? 'Реєстрація' : 'Вхід'}</h2>
              <div className="section-content">
                <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      color: '#fff',
                      fontWeight: 'bold'
                    }}>
                      Ім'я користувача:
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontSize: '1rem'
                      }}
                      placeholder="Введіть ім'я користувача"
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      color: '#fff',
                      fontWeight: 'bold'
                    }}>
                      Пароль:
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontSize: '1rem'
                      }}
                      placeholder="Введіть пароль"
                    />
                  </div>

                  {isSignUp && (
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>
                        Підтвердіть пароль:
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          background: 'rgba(255,255,255,0.1)',
                          color: '#fff',
                          fontSize: '1rem'
                        }}
                        placeholder="Підтвердіть пароль"
                      />
                    </div>
                  )}

                  {error && (
                    <div style={{
                      padding: '0.75rem',
                      marginBottom: '1rem',
                      background: 'rgba(255,107,107,0.2)',
                      border: '1px solid rgba(255,107,107,0.5)',
                      borderRadius: '8px',
                      color: '#ff6b6b',
                      textAlign: 'center'
                    }}>
                      {error}
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <button type="submit" className="nav-button">
                      {isSignUp ? '📝 Зареєструватися' : '🔐 Увійти'}
                    </button>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setError('');
                        setFormData({ username: '', password: '', confirmPassword: '' });
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#4CAF50',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      {isSignUp ? 'Вже маєте акаунт? Увійти' : 'Немає акаунту? Зареєструватися'}
                    </button>
                  </div>
                </form>
              </div>
            </section>
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
            <h1>Особистий кабінет</h1>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1rem',
              padding: '1rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px'
            }}>
              <div>
                <h3 style={{ margin: '0', color: '#4CAF50' }}>
                  Привіт, {currentUser.username}! 👋
                </h3>
                <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>
                  Ваші результати автоматично зберігаються
                </p>
              </div>
              <button onClick={handleLogout} className="nav-button">
                🚪 Вийти
              </button>
            </div>
          </header>

          <section className="topic1-section">
            <h2>📊 Статистика</h2>
            <div className="section-content">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(76,175,80,0.2)',
                  borderRadius: '15px',
                  border: '2px solid rgba(76,175,80,0.3)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#4CAF50' }}>🎮 Ігри</h3>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {userResults.gameResults.length}
                  </div>
                  <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                    Завершено місій
                  </div>
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(33,150,243,0.2)',
                  borderRadius: '15px',
                  border: '2px solid rgba(33,150,243,0.3)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#2196F3' }}>📝 Тести</h3>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {userResults.testResults.length}
                  </div>
                  <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                    Пройдено тестів
                  </div>
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: 'rgba(255,152,0,0.2)',
                  borderRadius: '15px',
                  border: '2px solid rgba(255,152,0,0.3)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#FF9800' }}>⭐ Середній бал</h3>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {userResults.gameResults.length > 0 
                      ? Math.round(userResults.gameResults.reduce((sum, result) => sum + result.score, 0) / userResults.gameResults.length)
                      : 0
                    }
                  </div>
                  <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                    Балів у іграх
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="topic1-section">
            <h2>🎮 Результати ігор</h2>
            <div className="section-content">
              {userResults.gameResults.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#ccc'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
                  <p>Ви ще не грали в ігри</p>
                  <p style={{ fontSize: '0.9rem' }}>
                    Пройдіть гру "Місія Аврора", щоб побачити результати тут
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gap: '1rem',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  {userResults.gameResults.slice().reverse().map((result) => (
                    <div
                      key={result.id}
                      style={{
                        padding: '1rem',
                        background: result.success 
                          ? 'rgba(76,175,80,0.1)' 
                          : 'rgba(255,107,107,0.1)',
                        borderRadius: '10px',
                        border: `1px solid ${result.success 
                          ? 'rgba(76,175,80,0.3)' 
                          : 'rgba(255,107,107,0.3)'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ fontSize: '1.2rem' }}>
                            {result.success ? '✅' : '❌'}
                          </span>
                          <strong style={{ 
                            color: result.success ? '#4CAF50' : '#ff6b6b' 
                          }}>
                            {result.success ? 'Місія виконана' : 'Місія провалена'}
                          </strong>
                        </div>
                        <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                          Фаза {result.phase} • {result.date} о {result.time}
                        </div>
                      </div>
                      <div style={{
                        textAlign: 'right'
                      }}>
                        <div style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: 'bold',
                          color: result.success ? '#4CAF50' : '#ff6b6b'
                        }}>
                          {result.score}
                        </div>
                        <div style={{ color: '#ccc', fontSize: '0.8rem' }}>
                          балів
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="topic1-section">
            <h2>📝 Результати тестів</h2>
            <div className="section-content">
              {userResults.testResults.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#ccc'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                  <p>Ви ще не проходили тести</p>
                  <p style={{ fontSize: '0.9rem' }}>
                    Пройдіть тести по темах, щоб побачити результати тут
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gap: '1rem',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  {userResults.testResults.slice().reverse().map((result) => (
                    <div
                      key={result.id}
                      style={{
                        padding: '1rem',
                        background: 'rgba(33,150,243,0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(33,150,243,0.3)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ fontSize: '1.2rem' }}>📚</span>
                          <strong style={{ color: '#2196F3' }}>
                            {result.topic}
                          </strong>
                        </div>
                        <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                          {result.questionsCorrect}/{result.totalQuestions} правильних • {result.date} о {result.time}
                        </div>
                      </div>
                      <div style={{
                        textAlign: 'right'
                      }}>
                        <div style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: 'bold',
                          color: '#2196F3'
                        }}>
                          {result.score}%
                        </div>
                        <div style={{ color: '#ccc', fontSize: '0.8rem' }}>
                          результат
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Account;
