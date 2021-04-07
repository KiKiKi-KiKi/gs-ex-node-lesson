import { firestore } from 'firebase-admin';

export interface TodoSchema {
  title: string;
  isDone: boolean;
  dueDate: firestore.Timestamp;
  createAt: firestore.Timestamp;
}
