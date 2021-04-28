import { HIT, ATTACK } from '../Constants/index.js';
import { generateLogs } from '../generateLogs.js';
import { getRandom, createElement } from '../Helpers/index.js';
import Arena from '../Arena/index.js';
import { getAllPlayers, getRandomPlayer, getAttack } from '../Characters/index.js';
import Player from '../Player/index.js';

let player1;
let player2;

export default class Game extends Arena {
  constructor() {
    super()
    this.getAllPlayers = getAllPlayers;
    this.getRandomPlayer = getRandomPlayer;
    this.getAttack = getAttack;
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
    if (player1.hp === 0 || player2.hp === 0) {
      this.arenas.append(this.createReloadButton());
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
      this.arenas.append(this.playerWins(player2.name));
      this.generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      this.arenas.append(this.playerWins(player1.name));
      this.generateLogs('end', player1, player2);

    } else if (player1.hp === 0 && player2.hp === 0) {
      this.arenas.append(this.playerWins());
      this.generateLogs('draw');
    }
  };

  start = async () => {
    this.formListener();

    const players = await this.getAllPlayers();
    const player = await this.getRandomPlayer();

    const p1 = players[getRandom(players.length) - 1];
    const p2 = player;

    player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: 'arenas',
    });
    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas',
    });

    player1.createPlayer();
    player2.createPlayer();

    this.generateLogs('start', player1, player2);
  };
};

