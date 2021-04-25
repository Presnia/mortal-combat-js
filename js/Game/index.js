import { player1, player2 } from '../players.js';
import { HIT, ATTACK } from '../Constants/index.js';
import { showResult } from '../showResult.js';
import { generateLogs } from '../generateLogs.js';
import { getRandom } from '../Helpers/index.js'

class Game {
  constructor() {
    this.player1 = player1;
    this.player2 = player2;
    this.HIT = HIT;
    this.ATTACK = ATTACK;
    this.showResult = showResult;
    this.generateLogs = generateLogs;
    this.getRandom = getRandom;
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

    for (let item of this.formFight) {
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
      const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = this.enemyAttack();
      const {hit, defence, value} = this.playerAttack();

      if (defence !== hitEnemy) {
        player1.changeHP(valueEnemy);
        player1.renderHP();
        this.generateLogs('hit', player2, player1, valueEnemy);
      } else {
          this.generateLogs('defence', player2, player1);
      }

      if (defenceEnemy !== hit) {
        player2.changeHP(value);
        player2.renderHP();
        this.generateLogs('hit', player1, player2, value);
      } else {
        this.generateLogs('defence', player1, player2);
      }

      this.showResult();
    });
  }

  start = () => {
    this.formListener();

    player1.createPlayer();
    player2.createPlayer();

    this.generateLogs('start', player1, player2);
  };
};

export default Game;