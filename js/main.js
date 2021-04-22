import { getRandom } from './getRandom.js';
import { player1, player2, HIT, ATTACK } from './players.js';
import { showResult } from './showResult.js';
import { createElement } from './createElement.js';
import { generateLogs } from './generateLogs.js';

const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');

const createPlayer = (hero) => {
  const player = createElement('div', `player${hero.player}`);
  const progressBar = createElement('div', 'progressbar');
  const character = createElement('div','character');
  const life = createElement('div', 'life');
  const name = createElement('div', 'name');
  const image = createElement('img');

  life.style.width = `${hero.hp}%`;
  name.innerText = hero.name;
  image.src = hero.img;
  
  progressBar.append(life, name);
  character.append(image);
  player.append(progressBar, character);

  return player;
};

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}

const playerAttack = () => {
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
}

formFight.addEventListener('submit', e => {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs('hit', player2, player1, enemy.value);
  } else {
      generateLogs('defence', player2, player1);
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs('hit', player1, player2, player.value);
  } else {
    generateLogs('defence', player1, player2);
  }

  showResult();
});

const init = () => {
  arenas.append(createPlayer(player1));
  arenas.append(createPlayer(player2));

  generateLogs('start', player1, player2);
};

init();