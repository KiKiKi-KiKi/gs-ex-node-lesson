export interface BookItem {
  [key: string]: any;
}

export interface BooksData {
  kind: string;
  totalItems: number;
  items?: BookItem[];
}
