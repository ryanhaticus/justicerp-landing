const FiveM = require('fivem');

import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const handler = async (req, res) => {
  await runMiddleware(req, res, cors);
  // const server = new FiveM.Server('103.249.70.46');
  //const players = await server.getPlayers();
  //const maxPlayers = await server.getMaxPlayers();
  res.status(200).json({
    fetched: true,
    players: 'FUCK YOU JER, YOU STOLE MY CODE',
    maxPlayers: 'FUCK YOU JER, YOU STOLE MY CODE',
  });
};

export default handler;
