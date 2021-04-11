const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
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

const changeHP = (player) => {
  const playerLife = document.querySelector(`.player${player.player} .life`);
  player.hp -= Math.ceil(Math.random() * 10);
  playerLife.style.width = `${player.hp}%`;

  if (player.hp <= 0) {
    arenas.append(playerLose(player.name));
    player.hp === 0;
    randomButton.disabled = true;
  }
};


const playerLose = (name) => {
  const loseTitle = createElement('div', 'loseTitle');
  loseTitle.innerText = `${name} lose`;

  return loseTitle;
};

randomButton.addEventListener('click', () => {
  changeHP(player1);
  changeHP(player2);
});

arenas.append(createPlayer(player1));
arenas.append(createPlayer(player2));