import { getRandom } from './getRandom.js';
import { player1, player2, HIT, ATTACK } from './players.js';
import { showResult } from './showResult.js';
import { createElement } from './createElement.js';
import { generateLogs } from './generateLogs.js';

const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');

const createPlayer = ({ player, name, hp, img }) => {
  const $player = createElement('div', `player${player}`);
  const $progressBar = createElement('div', 'progressbar');
  const $character = createElement('div','character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $image = createElement('img');

  $life.style.width = `${hp}%`;
  $name.innerText = name;
  $image.src = img;
  
  $progressBar.append($life, $name);
  $character.append($image);
  $player.append($progressBar, $character);

  return $player;
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

const init = () => {
  arenas.append(createPlayer(player1));
  arenas.append(createPlayer(player2));

  generateLogs('start', player1, player2);
};

init();