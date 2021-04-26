import { HIT, ATTACK } from '../Constants/index.js';
import { generateLogs } from '../generateLogs.js';
import { getRandom, createElement } from '../Helpers/index.js';
import Arena from '../Arena/index.js';
import Player from '../Player/index.js';

export default class Game extends Arena {
  constructor() {
    super()
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
    this.generateLogs = generateLogs;
    this.getRandom = getRandom;
    this.createElement = createElement;
  }

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
        this.player1.changeHP(valueEnemy);
        this.player1.renderHP();
        this.generateLogs('hit', this.player2, this.player1, valueEnemy);
      } else {
          this.generateLogs('defence', this.player2, this.player1);
      }

      if (defenceEnemy !== hit) {
        this.player2.changeHP(value);
        this.player2.renderHP();
        this.generateLogs('hit', this.player1, this.player2, value);
      } else {
        this.generateLogs('defence', this.player1, this.player2);
      }

      this.showResult();
    });
  };

  playerWins(name) {
    const winsTitle = this.createElement('div', 'winsTitle');
    if (name) {
      winsTitle.innerText = `${name} wins`;
    } else {
      winsTitle.innerText = 'draw';
    }
    
    return winsTitle;
  };

  showResult = () => {
    if (this.player1.hp === 0 || this.player2.hp === 0) {
      this.arenas.append(this.createReloadButton());
    }

    if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
      this.arenas.append(this.playerWins(this.player2.name));
      this.generateLogs('end', this.player2, this.player1);
    } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
      this.arenas.append(this.playerWins(this.player1.name));
      this.generateLogs('end', this.player1, this.player2);

    } else if (this.player1.hp === 0 && this.player2.hp === 0) {
      this.arenas.append(this.playerWins());
      this.generateLogs('draw');
    }
  };

  start = () => {
    this.formListener();

    this.player1.createPlayer();
    this.player2.createPlayer();

    this.generateLogs('start', this.player1, this.player2);
  };
};

