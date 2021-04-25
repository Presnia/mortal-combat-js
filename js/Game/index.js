import { player1, player2 } from '../players.js';
import { HIT, ATTACK } from '../Constants/index.js';
import { showResult } from '../showResult.js';
import { generateLogs } from '../generateLogs.js';

class Game {
  constructor() {
    this.player1 = player1;
    this.player2 = player2;
    this.HIT = HIT;
    this.ATTACK = ATTACK;
    this.showResult = showResult;
    this.generateLogs = generateLogs;
  }

  formFight = document.querySelector('.control');

  enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    
    return {
      value: getRandom(HIT[hit]),
      hit,
      defence,
    }
  };

  playerAttack = () => {
    const attack = {};

    for (let item of formFight) {
      if (item.checked && item.name === 'hit') {
        attack.value = getRandom(HIT[item.value]);
        attack.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
        attack.defence = item.value;
      }

      item.checked = false;
    }

    return attack;
  };

  formListener = () => {
    this.formFight.addEventListener('submit', e => {
      e.preventDefault();
      const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = enemyAttack();
      const {hit, defence, value} = playerAttack();

      if (defence !== hitEnemy) {
        player1.changeHP(valueEnemy);
        player1.renderHP();
        generateLogs('hit', player2, player1, valueEnemy);
      } else {
          generateLogs('defence', player2, player1);
      }

      if (defenceEnemy !== hit) {
        player2.changeHP(value);
        player2.renderHP();
        generateLogs('hit', player1, player2, value);
      } else {
        generateLogs('defence', player1, player2);
      }

      showResult();
    });
  }

  start = () => {
    this.formListener();

    player1.createPlayer();
    player2.createPlayer();

    generateLogs('start', player1, player2);
  };
};

export default Game;