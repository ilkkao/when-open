const Koa = require('koa');
const Router = require('koa-router');
const compress = require('koa-compress');
const send = require('koa-send');
const getOpeningHours = require('./getOpeningHours');
const listRestaurants = require('./listRestaurants');

const app = new Koa();
const router = new Router();

const PORT = 38000;

app.use(compress());

router.get('/', async ctx => {
  ctx.set('Cache-control', 'private, max-age=0, no-cache');

  await send(ctx, 'index.html', {
    root: 'dist',
    maxage: 200
  });
});

router.get('/:file', async ctx => {
  await send(ctx, ctx.params.file, {
    root: 'dist',
    maxage: 200
  });
});

router.get('/api/restaurants.json', async ctx => {
  ctx.body = listRestaurants();
});

router.get('/api/restaurants/:restaurant/opening-hours.json', async ctx => {
  const result = getOpeningHours(ctx.params.restaurant);

  if (result) {
    ctx.body = result;
  } else {
    ctx.status = 404;
  }
});

(async () => {
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(PORT, () => {
    console.warn(`Listening port: ${PORT}`); // eslint-disable-line
  });
})();
