import { Router, Request, Response } from 'express';
import { User } from './interfaces/users';
import { notFoundException } from '../errorExceptions';

// eslint-disable-next-line new-cap
const router = Router();

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

router.get('/', (req: Request, res: Response) => {
  res.send(USERS);
});

router.get('/:userId', (req: Request, res: Response) => {
  const userId: number | null = req.params.userId
    ? Number(req.params.userId)
    : null;

  if (!userId) {
    throw notFoundException('No User!');
  }

  const targetUser: User | undefined = USERS.find((user) => user.id === userId);

  if (!targetUser) {
    throw notFoundException('No User!');
  }

  res.send(targetUser);
});

export { router as router };
