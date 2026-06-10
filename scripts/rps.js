let score, stats, achievements, movesUsed;

const achievementInfo = [
  {
    key: 'firstWin',
    selector: '.js-first-win',
    title: '✅ First Victory'
  },

  {
    key: 'tenWins',
    selector: '.js-ten-wins',
    title: '✅  10 Wins'
  },


  {
    key: 'fiftyGames',
    selector: '.js-fifty-games',
    title: '✅ 50 Games Played'
  },

  {
    key: 'hundredGames',
    selector: '.js-hundred-games',
    title: '✅ 100 Games Played'
  },

  {
    key: 'fiveWinStreak',
    selector: '.js-five-winstreak',
    title: '🔥 Win Streak Master'
  },

  {
    key: 'fiveHundredGames',
    selector: '.js-five-hundred-games',
    title: '🎮 Veteran'
  },

  {
    key: 'hundredWins',
    selector: '.js-hundred-wins',
    title: '👑 Champion'
  },

  {
    key: 'tenLoses',
    selector: '.js-ten-loses',
    title: '☠️ Unlucky'
  },

  {
    key: 'twentyTies',
    selector: '.js-twenty-ties',
    title: '🕊️ Peacekeeper'
  },

  {
    key: 'rockHundredTimes',
    selector: '.js-rock-hundred-times',
    title: '🗿 Rock Enjoyer'
  }
]

function loadFromStorage() {
  score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
  };

  stats = JSON.parse(localStorage.getItem('stats')) || {
    highestWins: 0,
    gamesPlayed: 0,
    currentStreak: 0,
    bestStreak: 0,
    loseStreak: 0,
  };

  achievements = JSON.parse(localStorage.getItem('achievements')) || {
    firstWin: false,
    tenWins: false,
    fiftyGames: false,
    hundredGames: false,
    rockHundredTimes: false,
    fiveWinStreak: false,
    fiveHundredGames: false,
    hundredWins: false,
    tenLoses: false,
    twentyTies: false,
  };

  movesUsed = JSON.parse(localStorage.getItem('movesUsed')) || {
    rock: 0,
    paper: 0,
    scissors: 0
  };
}

function saveToStorage() {
  localStorage.setItem('movesUsed', JSON.stringify(movesUsed));
  localStorage.setItem('score', JSON.stringify(score));
  localStorage.setItem('stats', JSON.stringify(stats));
  localStorage.setItem('achievements', JSON.stringify(achievements));
}

document.querySelector('.js-rock-btn').addEventListener('click', () =>{
  playGame('rock');
})

document.querySelector('.js-paper-btn').addEventListener('click', () =>{
  playGame('paper');
})

document.querySelector('.js-scissors-btn').addEventListener('click', () =>{
  playGame('scissors');
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
})

document.querySelector('.js-reset-btn').addEventListener('click', () => {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;

  localStorage.removeItem('score');
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';

  renderScore();
})

function pickComputerMove() {
  const randomNumber = Math.random()

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'rock') {
    movesUsed.rock++;

    if (computerMove === "rock") {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  } else if (playerMove === 'paper') {
    movesUsed.paper++;

    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'scissors') {
    movesUsed.scissors++;

    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  if (result === 'You win.') {
    score.wins++;
    stats.currentStreak++;
    stats.currentWins++;
    stats.loseStreak++;
  } else if (result === 'You lose.') {
    score.loses++;
    stats.loseStreak++;
    stats.currentStreak = 0;
  } else if (result === 'Tie.') {
    score.ties++;
    stats.currentStreak = 0;
    stats.loseStreak++;
  }
  stats.gamesPlayed++;
  stats.currentGamesPlayed++;

  saveToStorage();

 
  createDynamicClass(result);

  document.querySelector('.js-result').innerHTML = result;


  document.querySelector('.js-moves').innerHTML = `
    You <img style='width: 10%;' src='images/${playerMove}-emoji.png'> <img style='width: 10%;' src='images/${computerMove}-emoji.png'> Computer
  `

  recordStats();
  recordStreak();
  renderScore();
  renderStats();
  updateAchievements();
  renderFavouriteMove();
}

function updateAchievements() {
  if (score.wins >= 1) {
    achievements.firstWin = true;
  }

  if (score.wins >= 10) {
    achievements.tenWins = true;
  }

  if (stats.gamesPlayed >= 50) {
    achievements.fiftyGames = true;
  }
  
  if (stats.gamesPlayed >= 100) {
    achievements.hundredGames = true;
  }

  if (movesUsed.rock >= 100) {
    achievements.rockHundredTimes = true;
  }

  if (stats.currentStreak >= 5) {
    achievements.fiveWinStreak = true;
  }

  if (stats.gamesPlayed >= 500) {
    achievements.fiveHundredGames = true;
  }

  if (score.wins >= 100) {
    achievements.hundredWins = true;
  }
  
  if (stats.loseStreak >= 10) {
    achievements.tenLose = true;
  }

  if (score.ties >= 20) {
    achievements.twentyTies = true;
  }

  saveToStorage();
}

function renderAchievements() {

  achievementInfo.forEach((achievement) => {
    const element = document.querySelector(achievement.selector)

    element.classList.remove('locked');
    element.classList.remove('unlocked');
    
    if (achievements[achievement.key]) {
      element.innerHTML = `${achievement.title}`;
      element.classList.add('unlocked');
    
    } else {
      element.classList.add('locked');
    }
  })
}

function renderFavouriteMove() {
  const [key, value] = Object.entries(movesUsed).reduce((max, current) =>
  current[1] > max[1] ? current : max
  );
  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

  document.querySelector('.js-favourite-move').innerHTML = `${capitalizedKey}`;
  document.querySelector('.js-times-used').innerHTML = `${value} uses`;
}

function createDynamicClass(result) {
  const resultElement = document.querySelector('.js-result');

  resultElement.classList.remove('win');
  resultElement.classList.remove('lose');
  resultElement.classList.remove('tie');

  if (result === "You win.") {
    resultElement.classList.add('win');
  } else if (result === "You lose.") {
    resultElement.classList.add('lose');
  } else if (result === "Tie.") {
    resultElement.classList.add('tie');
  }
}

function renderScore() {
  document.querySelector('.js-score').innerHTML = `
    Wins: ${score.wins},  Loses: ${score.loses},  Ties: ${score.ties}
  `
}

function recordStats() {
  if (score.wins > stats.highestWins) {
    stats.highestWins = score.wins;
  }
}

function recordStreak() {
  if (stats.currentStreak > stats.bestStreak) {
    stats.bestStreak = stats.currentStreak;
  }
}


function renderStats() {
  let winRate = 0;
  
  if (stats.gamesPlayed > 0) {
    winRate =  (score.wins / stats.gamesPlayed * 100).toFixed(1);
  }

  document.querySelector('.js-highest-wins').innerHTML = `Highest Wins: ${stats.highestWins}
  `;

  document.querySelector('.js-games-played').innerHTML = `Games Played: ${stats.gamesPlayed}
  `;

  document.querySelector('.js-win-rate').innerHTML = `Win Rate: ${winRate}%
  `;

  document.querySelector('.js-best-streak').innerHTML = `Best Win Streak: ${stats.bestStreak}`;
}


function resetChart() {
  stats.highestWins = 0,
  stats.gamesPlayed = 0,
  stats.currentStreak = 0,
  stats.bestStreak = 0
}

loadFromStorage();
renderScore();
renderStats();
renderAchievements();
renderFavouriteMove();