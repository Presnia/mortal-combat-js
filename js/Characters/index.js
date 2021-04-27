export const getPlayers = async () => {
    const characters = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
                        .then(res => res.json());
    return characters;
};