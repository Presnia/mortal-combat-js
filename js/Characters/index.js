const getAllPlayers = async () => {
    const characters = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
                        .then(res => res.json());
    return characters;
};

const getRandomPlayer = async () => {
    const characters = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
                        .then(res => res.json());
    return characters;
};

const getAttack = async () => {
    attack = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            hit,
            defence,
        })
    });
};

export { getAllPlayers, getRandomPlayer, getAttack };