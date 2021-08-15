const FiveM = require('fivem');

// API?
const handler = async (req, res) => {
  const server = new FiveM.Server('51.81.48.166:30135');
  const players = await server.getPlayers();
  const maxPlayers = await server.getMaxPlayers();
  res.status(200).json({
    fetched: true,
    players,
    maxPlayers,
  });
};

export default handler;
