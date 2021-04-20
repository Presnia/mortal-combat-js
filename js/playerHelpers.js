export function changeHP(num) {
  this.hp -= num;

  if (this.hp <= 0) {
    this.hp = 0;
  }

  return this.hp;
};

export function elHP() {
  const playerLife = document.querySelector(`.player${this.player} .life`);

  return playerLife;
};

export function renderHP() {
  return this.elHP().style.width = `${this.hp}%`;
};