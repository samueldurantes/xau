import { createServer } from 'http';

import app from './app';
import { connectDatabase } from './database';

const f = async () => {
  await connectDatabase();

  const server = createServer(app.callback());

  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

f();
