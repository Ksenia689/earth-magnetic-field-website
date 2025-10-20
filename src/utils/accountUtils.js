// Utility functions for account management and result saving

export const saveGameResult = (score, phase, success, gameDetails = {}) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser) {
    return false; // User not logged in
  }

  const users = JSON.parse(localStorage.getItem('earthMagneticUsers') || '{}');
  if (!users[currentUser.username]) {
    return false; // User not found
  }

  const gameResult = {
    id: Date.now(),
    date: new Date().toLocaleDateString('uk-UA'),
    time: new Date().toLocaleTimeString('uk-UA'),
    score: score,
    phase: phase,
    success: success,
    ...gameDetails
  };

  if (!users[currentUser.username].results) {
    users[currentUser.username].results = { gameResults: [], testResults: [] };
  }

  users[currentUser.username].results.gameResults.push(gameResult);
  localStorage.setItem('earthMagneticUsers', JSON.stringify(users));
  
  return true;
};

export const saveTestResult = (score, topic, questionsCorrect, totalQuestions, testDetails = {}) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser) {
    return false; // User not logged in
  }

  const users = JSON.parse(localStorage.getItem('earthMagneticUsers') || '{}');
  if (!users[currentUser.username]) {
    return false; // User not found
  }

  const testResult = {
    id: Date.now(),
    date: new Date().toLocaleDateString('uk-UA'),
    time: new Date().toLocaleTimeString('uk-UA'),
    score: score,
    topic: topic,
    questionsCorrect: questionsCorrect,
    totalQuestions: totalQuestions,
    ...testDetails
  };

  if (!users[currentUser.username].results) {
    users[currentUser.username].results = { gameResults: [], testResults: [] };
  }

  users[currentUser.username].results.testResults.push(testResult);
  localStorage.setItem('earthMagneticUsers', JSON.stringify(users));
  
  return true;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const isUserLoggedIn = () => {
  return getCurrentUser() !== null;
};