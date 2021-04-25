import Player from './Player/index.js';


const player1 = new Player({
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  rootSelector: 'arenas',
});

const player2 = new Player({
  player: 2,
  name: 'Kitana',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  rootSelector: 'arenas',
});

export { player1, player2 };