import express from 'express';

import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';

import rootValue from './resolvers';
import plainSchema from './schema.graphql';

const schema = buildSchema(plainSchema);

const app = express();

app.post('/graphql', createHandler({
  schema,
  rootValue,
  context: function({ raw }) {
    return {
      user: {
        uid: 'fbbe8f68-8913-48c0-b834-0c0169bb6fa9'
      }
    };
  }
}));

app.listen(80, '0.0.0.0', function() {
  console.log(`${ process.env.service } started @ http://0.0.0.0`);
});
