import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { admin } from '../model/firebase';
const db = admin.firestore();
const COLLECTION = 'todos';

// eslint-disable-next-line new-cap
const router = Router();

router.get(
  '/',
  cors(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await db
        .collection(COLLECTION)
        .orderBy('isDone', 'asc')
        .orderBy('dueDate', 'asc')
        .get();

      const todos = todoSnapshot.docs.map(
        (item: FirebaseFirestore.DocumentData) => {
          return {
            id: item.id,
            data: item.data(),
          };
        },
      );

      res.send(todos);
    } catch (err) {
      next(err);
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
