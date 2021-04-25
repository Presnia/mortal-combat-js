import { createElement } from '../Helpers/index.js';
class Player {
  constructor(props) {
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.player = props.player;
    this.selector = `player${this.player}`;
    this.rootSelector = props.rootSelector;
  }

  changeHP = (num) => this.hp > num ? this.hp -= num : this.hp = 0;

  elHP = () => {
    const playerLife = document.querySelector(`.${this.selector} .life`);

    return playerLife;
  };

  renderHP = () => {
    return this.elHP().style.width = `${this.hp}%`;
  };

  createPlayer = () => {
    const $player = createElement('div', this.selector);
    const $progressBar = createElement('div', 'progressbar');
    const $character = createElement('div','character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $image = createElement('img');

    $life.style.width = this.hp;
    $name.innerText = this.name;
    $image.src = this.img;
    
    $progressBar.append($life, $name);
    $character.append($image);
    $player.append($progressBar, $character);

    const root = document.querySelector(`.${this.rootSelector}`);
    root.append($player);

    return $player;
  };
};

export default Player;