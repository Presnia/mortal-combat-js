import { logs } from './logs.js';
import { getTime } from './time.js';
import { player1, player2 } from './players.js';
import { getRandom } from './getRandom.js';

const chat = document.querySelector('.chat');

export const generateLogs = (type, player1, player2) => {
  const time = getTime();

  const text = logs[type][getRandom(type.length - 1)]
              .replace('[playerKick]', player1.name)
              .replace('[playerDefence]', player2.name);
  const el = `<p>${time} - ${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", el);
};

export const initialLog = (type, player1, player2) => {
  const time = getTime();
  
  const text = logs[type]
              .replace('[player1]', player1.name)
              .replace('[player2]', player2.name)
              .replace('[time]', time);
  const el = `<p>${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", el);
};

export const gameOverLog = (type, player1, player2) => {
  const text = logs[type][getRandom(type.length - 1)]
              .replace('[playerWins]', player1.name)
              .replace('[playerLose]', player2.name);
  const el = `<p>${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", el);
};

export const drawLog = (type) => {
  const text = logs[type];
  const el = `<p>${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", el);
}

export const logsCase = (type) => {
  switch (type) {
    case 'start':
      initialLog('start', player1, player2);
      break;
    case 'hit':
      generateLogs('hit', player1, player2);
      break;
    case 'defence':
      generateLogs('defence', player1, player2);
      break;
    case 'end':
      gameOverLog('end', player1, player2);
      break;
    case 'draw':
      drawLog('draw');
      break;
      default:
        alert('The type of action is undefined');
        break;
  } 
};