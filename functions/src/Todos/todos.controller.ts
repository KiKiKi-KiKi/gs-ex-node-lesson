import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { getAllTodos } from './todos.service';
import { internalServerErrorException } from '../errorExceptions';

// eslint-disable-next-line new-cap
const router = Router();

router.get(
  '/',
  cors(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await getAllTodos();
      res.send(todos);
    } catch (err) {
      const { message, ...error } = err;
      next(
        internalServerErrorException(message, {
          _method: 'getAllTodos',
          ...error,
        }),
      );
    }
  },
);

router.post('/', cors(), async (req: Request, res: Response) => {
  res.send('Todos POST endpoint');
});

router.put('/:id', cors(), async (req: Request, res: Response) => {
  res.send('Todo PUT endpoint');
});

router.delete('/:id', cors(), async (req: Request, res: Response) => {
  res.send('Todos DELETE endpoint');
});

export { router as router };
