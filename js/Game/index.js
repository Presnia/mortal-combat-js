import { HIT, ATTACK } from '../Constants/index.js';
import { showResult } from '../showResult.js';
import { generateLogs } from '../generateLogs.js';
import { getRandom } from '../Helpers/index.js'
import Player from '../Player/index.js';

class Game {
  constructor() {
    this.player1 = new Player({
      player: 1,
      name: 'Scorpion',
      hp: 100,
      img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
      rootSelector: 'arenas',
    });
    this.player2 = new Player({
      player: 2,
      name: 'Kitana',
      hp: 100,
      img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
      rootSelector: 'arenas',
    });
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

    this.player1.createPlayer();
    this.player2.createPlayer();

    this.generateLogs('start', this.player1, this.player2);
  };
};

export default Game;