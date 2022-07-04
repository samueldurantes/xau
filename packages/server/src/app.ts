import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import { graphqlHTTP } from 'koa-graphql';

import { schema } from './schemas/schema';

const app = new Koa();
const router = new Router();

const graphqlServer = graphqlHTTP({
  graphiql: true,
  schema
});

router.all('/graphql', graphqlServer);

app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());

export default app;
