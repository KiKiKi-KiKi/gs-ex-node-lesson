import { logger } from 'firebase-functions';
// import express from 'express';
// => This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
// cf. https://qiita.com/karak/items/29ff148788f5abb15331
import express = require('express');
import fetch from 'node-fetch';
import errorHandler, {
  notFoundException,
  badRequestException,
} from './errorExceptions';

const app: express.Express = express();
// eslint-disable-next-line new-cap
const router: express.Router = express.Router();

// Disabled X-Powered-By Header
app.disable('x-powered-by');
// Allow application/json
app.use(express.json());
// Allow application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

router.get('/hello', (req: express.Request, res: express.Response) => {
  logger.info('Hello logs!', { structuredData: true });
  res.send('Hello Express!');
});

interface User {
  id: number;
  name: string;
  type: 'cute' | 'cool' | 'pop' | 'sexy';
}

const USERS: User[] = [
  { id: 1, name: '星宮いちご', type: 'cute' },
  { id: 2, name: '霧矢あおい', type: 'cool' },
  { id: 3, name: '紫吹蘭', type: 'sexy' },
  { id: 4, name: '藤堂ユリカ', type: 'cool' },
  { id: 5, name: '有栖川おとめ', type: 'pop' },
  { id: 6, name: '神崎美月', type: 'sexy' },
  { id: 7, name: '夏樹みくる', type: 'pop' },
  { id: 8, name: '大空あかり', type: 'cute' },
];

router.get('/users/:userId', (req: express.Request, res: express.Response) => {
  const userId: number | null = req.params.userId
    ? Number(req.params.userId)
    : null;

  if (!userId) {
    throw notFoundException('No user!');
  }

  const targetUser: User | undefined = USERS.find(
    (user: User) => user.id === userId,
  );

  // console.log({ targetUser });
  if (!targetUser) {
    throw notFoundException('No user!');
  }

  res.send(targetUser);
});

interface BookItem {
  [key: string]: any;
}

interface BooksData {
  kind: string;
  totalItems: number;
  items?: BookItem[];
}

const getDataFromApi = async (keyword: string): Promise<BooksData> => {
  // https://developers.google.com/books/docs/v1/using
  const requestUrl =
    'https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:';

  try {
    const result = await fetch(`${requestUrl}${keyword}`);

    return result.json();
  } catch (error) {
    throw badRequestException(error.message);
  }
};

router.get(
  '/books/:keyword',
  async (req: express.Request, res: express.Response) => {
    const keywors: string = req.params?.keyword;
    const response = await getDataFromApi(keywors);
    res.send(response);
  },
);

// Routing
app.use('/', router);

// Error Handler
app.use(errorHandler);

export { app as app };
