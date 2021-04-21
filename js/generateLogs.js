import { logs } from './logs.js';
import { getTime } from './time.js';
import { getRandom } from './getRandom.js';

const chat = document.querySelector('.chat');

const time = getTime();

export const generateLogs = (type, player1, player2, valueAttack) => {
  let text = logsCase(type, player1.name, player2.name);

  if (type === 'hit') {
    text = `${text} -${valueAttack} [${player2.hp}/100]`;
  }
  const el = `<p>${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", el);
};

export const logsCase = (type, playerName1, playerName2) => {
  switch (type) {
    case 'start':
      return logs[type].replace('[player1]', playerName1)
                        .replace('[player2]', playerName2)
                        .replace('[time]', time);
      break;
    case 'hit':
      return logs[type][getRandom(logs[type].length - 1) - 1]
              .replace('[playerKick]', playerName1)
              .replace('[playerDefence]', playerName2);
      break;
    case 'defence':
      return logs[type][getRandom(logs[type].length - 1) - 1]
              .replace('[playerKick]', playerName1)
              .replace('[playerDefence]', playerName2);
      break;
    case 'end':
    return logs[type][getRandom(logs[type].length - 1) - 1]
              .replace('[playerWins]', playerName1)
              .replace('[playerLose]', playerName2);
      break;
    case 'draw':
      return logs[type];
      break;
      default:
        alert('The type of action is undefined');
        break;
  } 
};