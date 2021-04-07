import { Router, Request, Response } from 'express';
import cors from 'cors';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/', cors(), async (req: Request, res: Response) => {
  res.send('Todos GET endpoint');
});

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
