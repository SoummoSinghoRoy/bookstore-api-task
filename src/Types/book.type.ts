import {Author} from './author.type';

interface Book {
  id: any;
  title: string;
  description: string;
  published_date: string;
  author: Author
}

interface BookApiResponse {
  status: number;
  error?: {
    message: string | object
  };
  message?: string;
  data?: Book | Book[],
  pagination?: {
    totalCount: any,
    currentPage: any,
    totalPages: any
  }
}

interface BookInputData {
  title: string;
  description: string;
  published_date: string;
  authorId: number;
}

export type {
  Book,
  BookApiResponse,
  BookInputData
}