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

const createPlayer = (players, hero) => {
  const arenas = document.querySelector('.arenas');

  const player = document.createElement('div');
  player.classList.add(players);

  const progressBar = document.createElement('div');
  progressBar.classList.add('progressbar');

  const life = document.createElement('div');
  life.classList.add('life');
  life.style.width = `${hero.hp}%`;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = hero.name;

  const character = document.createElement('div');
  character.classList.add('character');

  const image = document.createElement('img')
  image.src = hero.img;
  
  progressBar.append(life, name);
  character.append(image);
  player.append(progressBar, character);
  arenas.append(player);
};

createPlayer('player1', player1);
createPlayer('player2', player2);