import { LOGS } from './Constants/index.js';
import { getRandom, getTime } from './Helpers/index.js';

const chat = document.querySelector('.chat');

const time = getTime();

export const generateLogs = (type, { name } = {}, { name: playerName2, hp } = {}, valueAttack) => {
  let text = logsCase(type, name, playerName2);

  if (type === 'hit') {
    text = `${text} -${valueAttack} [${hp}/100]`;
  }
  const el = `<p>${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", el);
};

const logsCase = (type, playerName1, playerName2) => {
  switch (type) {
    case 'start':
      return LOGS[type].replace('[player1]', playerName1)
                        .replace('[player2]', playerName2)
                        .replace('[time]', time);
      break;
    case 'hit':
      return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
              .replace('[playerKick]', playerName1)
              .replace('[playerDefence]', playerName2);
      break;
    case 'defence':
      return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
              .replace('[playerKick]', playerName1)
              .replace('[playerDefence]', playerName2);
      break;
    case 'end':
    return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
              .replace('[playerWins]', playerName1)
              .replace('[playerLose]', playerName2);
      break;
    case 'draw':
      return LOGS[type];
      break;
      default:
        alert('The type of action is undefined');
        break;
  } 
};