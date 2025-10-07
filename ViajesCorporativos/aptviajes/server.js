// server.js (CommonJS, porque NO tienes "type":"module")
const { createServer } = require('http');
const next = require('next');

const port = process.env.PORT || 3000;        // cPanel pasa el puerto por env
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
