import * as functions from 'firebase-functions';
// import express from 'express';
// => This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
// cf. https://qiita.com/karak/items/29ff148788f5abb15331
import express = require('express');

const app: express.Express = express();
const router: express.Router = express.Router();

// Disabled X-Powered-By Header
app.disable('x-powered-by');
// Allow application/json
app.use(express.json());
// Allow application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

router.get('/hello', (req: express.Request, res: express.Response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  res.send('Hello Express!');
});

// Routing
app.use('/', router);

export const api = functions.https.onRequest(app);
