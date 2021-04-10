const arenas = document.querySelector('.arenas');

const player1 = {
  name: 'Scorpion',
  hp: 77,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['sabre of light', 'sawblade', 'sword', 'sai', 'sektors rocket'],
  attack: () => {
    console.log(this.name + 'Fight...');
  }
};

const player2 = {
  name: 'Kitana',
  hp: 88,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['kitana', 'sword', 'sai', 'sento', 'saber teeth'],
  attack: () => {
    console.log(this.name + 'Fight...');
  }
};

const createElement = (tag, className) => {
  $tag = document.createElement(tag);
  $tag.classList.add(className);

  return $tag;
}

const createPlayer = (players, hero) => {
  const player = createElement('div', players);
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
  arenas.append(player);
};

createPlayer('player1', player1);
createPlayer('player2', player2);