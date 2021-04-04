import * as functions from 'firebase-functions';
// import express from 'express';
// => This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
// cf. https://qiita.com/karak/items/29ff148788f5abb15331
import express = require('express');

const app: express.Express = express();

app.get('/hello', (req: express.Request, res: express.Response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  res.send('Hello Express!');
});

export const api = functions.https.onRequest(app);
