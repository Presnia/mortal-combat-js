import Player from './Player/index.js';
import { changeHP, elHP, renderHP } from './playerHelpers.js'

export const player1 = new Player({
  player: 1,
  changeHP,
  renderHP,
  elHP,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  rootSelector: 'arenas',
  weapon: ['sabre of light', 'sawblade', 'sword', 'sai', 'sektors rocket'],
  attack: () => {
    console.log(this.name + 'Fight...');
  }
});

export const player2 = new Player({
  player: 2,
  changeHP,
  renderHP,
  elHP,
  name: 'Kitana',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  rootSelector: 'arenas',
  weapon: ['kitana', 'sword', 'sai', 'sento', 'saber teeth'],
  attack: () => {
    console.log(this.name + 'Fight...');
  }
});