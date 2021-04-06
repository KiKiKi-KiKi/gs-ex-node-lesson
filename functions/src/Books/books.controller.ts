import { Router, Request, Response } from 'express';
import cors = require('cors');
import { getDataFromApi } from './books.service';
import { notFoundException } from '../errorExceptions';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/', cors(), (req: Request, res: Response) => {
  throw notFoundException('No Book!');
});

router.get('/:keyword', cors(), async (req: Request, res: Response) => {
  const keywors: string = req.params?.keyword;
  const response = await getDataFromApi(keywors);
  res.send(response);
});

export { router as router };
