const arenas = document.querySelector('.arenas');

const formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
  player: 1,
  changeHP,
  renderHP,
  elHP,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['sabre of light', 'sawblade', 'sword', 'sai', 'sektors rocket'],
  attack: () => {
    console.log(this.name + 'Fight...');
  }
};

const player2 = {
  player: 2,
  changeHP,
  renderHP,
  elHP,
  name: 'Kitana',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['kitana', 'sword', 'sai', 'sento', 'saber teeth'],
  attack: () => {
    console.log(this.name + 'Fight...');
  }
};

const createElement = (tag, className) => {
  $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  
  return $tag;
}

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

function getRandom(n) {
  return Math.ceil(Math.random() * n);
}

function changeHP(num) {
  this.hp -= num;

  if (this.hp <= 0) {
    this.hp = 0;
  }

  return this.hp;
};

function elHP() {
  const playerLife = document.querySelector(`.player${this.player} .life`);

  return playerLife;
};

function renderHP() {
  return this.elHP().style.width = `${this.hp}%`;
};

function playerWins(name) {
  const winsTitle = createElement('div', 'winsTitle');
  if (name) {
    winsTitle.innerText = `${name} wins`;
  } else {
    winsTitle.innerText = 'draw';
  }
  
  return winsTitle;
};

const createReloadButton = () => {
  const reloadWrap = createElement('div', 'reloadWrap');
  const reloadButton = createElement('button', 'button');
  reloadButton.innerText = 'Restart';

  reloadButton.addEventListener('click', () => {
      window.location.reload();
    });

  reloadWrap.append(reloadButton);
  return reloadWrap;
};

arenas.append(createPlayer(player1));
arenas.append(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}

formFight.addEventListener('submit', e => {
  e.preventDefault();
  const enemy = enemyAttack();
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

  if (attack.hit !== enemy.defence) {
    player1.changeHP(attack.value);
  } else {
    player1.changeHP(0);
  }

  if (attack.hit !== enemy.defence) {
    player2.changeHP(attack.value);
  } else {
    player2.changeHP(0);
  }

  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    arenas.append(createReloadButton());
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.append(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.append(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.append(playerWins());
  }
});