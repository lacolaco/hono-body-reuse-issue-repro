// run `node index.js` in the terminal

import { Hono } from 'hono';

const middleware = () => {
  return async (c, next) => {
    // read .text() in middleware
    const body = await c.req.text();
    console.log('middleware', body);
    await next();
  };
};

const app = new Hono();

app.post('/', middleware(), async (c) => {
  // read .json()
  const body = await c.req.json();
  console.log('handler', body);
  return c.text('ok');
});

app.onError((e, c) => {
  console.error(e); // => TypeError: Body is unusable
  return c.text(e.message, 500);
});

app.request('/', {
  method: 'POST',
  body: JSON.stringify({ foo: 'bar' }),
});
