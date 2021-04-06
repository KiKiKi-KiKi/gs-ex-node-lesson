import { logger } from 'firebase-functions';
// import express from 'express';
// => This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
// cf. https://qiita.com/karak/items/29ff148788f5abb15331
import express = require('express');
// import cors = require('cors');
import errorHandler from './errorExceptions';

// routing
import { router as usersRouter } from './Users/users.controller';
import { router as booksRouter } from './Books/books.controller';

const app: express.Express = express();
// eslint-disable-next-line new-cap
const router: express.Router = express.Router();

// Disabled X-Powered-By Header
app.disable('x-powered-by');
// Allow application/json
app.use(express.json());
// Allow application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Allow all cors
// app.use(cors());

router.get('/hello', (req: express.Request, res: express.Response) => {
  logger.info('Hello logs!', { structuredData: true });
  res.send('Hello Express!');
});

// Routing
app.use('/', router);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// Error Handler
app.use(errorHandler);

export { app as app };
