import { db } from '../model/firebase';
import { TodoItem } from './interfaces/todos';
import { errorData, internalServerErrorException } from '../errorExceptions';
const COLLECTION = 'todos';

export const apiError = (
  error: Error,
  data: errorData = {},
  message?: string,
): Error => {
  const { message: errorMessage, ...details } = error;

  return internalServerErrorException(message || errorMessage, {
    ...data,
    ...details,
  }) as Error;
};

export const getAllTodos = async (): Promise<TodoItem[]> => {
  const todoSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await db
    .collection(COLLECTION)
    .orderBy('isDone', 'asc')
    .orderBy('dueDate', 'asc')
    .get();

  const todos: TodoItem[] = todoSnapshot.docs.map(
    (item: FirebaseFirestore.DocumentData) => {
      return {
        id: item.id,
        data: item.data(),
      };
    },
  );

  return todos;
};
