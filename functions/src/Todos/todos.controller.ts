import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { apiError, getAllTodos, createTodo } from './todos.service';

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
      next(apiError(err, { _method: 'getAllTodos' }));
    }
  },
);

router.post(
  '/',
  cors(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData = req.body;
      if (!postData) {
        return next();
      }

      const newTodoItem = await createTodo(postData);
      res.send(newTodoItem);
    } catch (err) {
      next(apiError(err, { _method: 'createTodo' }));
    }
  },
);

router.put('/:id', cors(), async (req: Request, res: Response) => {
  res.send('Todo PUT endpoint');
});

router.delete('/:id', cors(), async (req: Request, res: Response) => {
  res.send('Todos DELETE endpoint');
});

export { router as router };
