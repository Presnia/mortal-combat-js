import { player1, player2 } from './players.js';
import { createReloadButton } from './createReloadButton.js';
import { createElement } from './createElement.js';
import { generateLogs } from './generateLogs.js';

const arenas = document.querySelector('.arenas');

function playerWins(name) {
  const winsTitle = createElement('div', 'winsTitle');
  if (name) {
    winsTitle.innerText = `${name} wins`;
  } else {
    winsTitle.innerText = 'draw';
  }
  
  return winsTitle;
};

export const showResult = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    arenas.append(createReloadButton());
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.append(playerWins(player2.name));
    generateLogs('end', player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.append(playerWins(player1.name));
    generateLogs('end', player1, player2);

  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.append(playerWins());
    generateLogs('draw');
  }
};