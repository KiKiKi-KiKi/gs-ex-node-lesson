import { db, getTimestamp, getCreateAtTimestamp } from '../model/firebase';
import { TodoItem, TodoPostData } from './interfaces/todos';
import { errorData, internalServerErrorException } from '../errorExceptions';
import { TodoSchema } from './interfaces/todos.schema';

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
  const todoSnapshot: FirebaseFirestore.QuerySnapshot = await db
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

type CreateTodoProps = {
  title: string;
  dueDate: number;
};
export const createTodo = async ({
  title,
  dueDate,
}: CreateTodoProps): Promise<TodoItem> => {
  const postData: TodoPostData = {
    title,
    isDone: false,
    dueDate: getTimestamp(dueDate),
    createAt: getCreateAtTimestamp(),
  };
  const res: FirebaseFirestore.DocumentReference = await db
    .collection(COLLECTION)
    .add(postData);

  // If get doc by DocumentReference
  const doc: FirebaseFirestore.DocumentSnapshot = await res.get();
  // console.log(res, doc.data());

  return {
    id: res.id,
    // FIXME: Don't get data from firebase to save connection.
    data: (await doc.data()) as TodoSchema,
  };
};
