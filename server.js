const fastify = require('fastify');
const Next = require('next');

const port = parseInt(process.env.port, 3000) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
const handle = app.getRequestHandler();
const timber = require('timber');

const transport = new timber.transports.HTTPS('2129_215322dc32177abb:2ab77ed7e462d9cdbb65d6a7714d03202597103ce471920441ad9de68147e596');
timber.install(transport);

app.prepare()
  .then(() => {
    const server = fastify();
    server.get('/*', (req, res) => {
      return handle(req.req, res.res);
    });
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
