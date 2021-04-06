import fetch from 'node-fetch';
import { badRequestException } from '../errorExceptions';
import { BooksData } from './interfaces/bookSchema';

export const getDataFromApi = async (keyword: string): Promise<BooksData> => {
  // https://developers.google.com/books/docs/v1/using
  const requestUrl =
    'https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:';

  try {
    const result = await fetch(`${requestUrl}${encodeURI(keyword)}`);

    return result.json();
  } catch (error) {
    throw badRequestException(error.message);
  }
};
