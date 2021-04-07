import { TodoSchema } from './todos.schema';

export interface TodoItem {
  id: string;
  data: TodoSchema;
}

export type TodoPostData = Omit<TodoSchema, 'createAt'> & {
  createAt: FirebaseFirestore.FieldValue;
};
