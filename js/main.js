const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');
const chat = document.querySelector('.chat');

const getTime = () => {
  let date = new Date();
  const formatDigit = (n) => n < 10 ? '0' + n : n;
  const time = `${formatDigit(date.getHours())}:${formatDigit(date.getMinutes())}`;

  return time;
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил локтем грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил коленом левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил коленом грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

const logsCase = (type) => {
  time = getTime();
  let logText = '';

  let text = logs[type][getRandom(type.length - 1)]
            .replace('[playerKick]', player1.name)
            .replace('[playerDefence]', player2.name);

  switch (type) {
    case 'start':
      logText = logs[type]
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name)
                .replace('[time]', time);
      break;
    case 'hit':
      logText = `${time} - ${text}`;
      break;
    case 'defence':
      logText = `${time} - ${text}`;
      break;
    case 'end':
      logText = logs[type][getRandom(type.length - 1)]
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
      break;
    case 'draw':
      logText = logs[type];
      break;
      default:
        logText = logs[type]
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name)
                .replace('[time]', time);
  } 

  const el = `<p>${logText}</p>`;
  chat.insertAdjacentHTML("afterbegin", el);
};

const showResult = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    arenas.append(createReloadButton());
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.append(playerWins(player2.name));
    logsCase('end', player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.append(playerWins(player1.name));
    logsCase('end', player1, player2);

  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.append(playerWins());
    logsCase('draw');
  }
};

formFight.addEventListener('submit', e => {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    logsCase('hit', player1, player2);
  } 

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    logsCase('hit', player2, player1);
  } 

  if (player.defence === enemy.hit) {
    logsCase('defence', player2, player1);
  }

  if (enemy.defence === player.hit) {
    logsCase('defence', player1, player2);
  }

  showResult();
});

logsCase('start');