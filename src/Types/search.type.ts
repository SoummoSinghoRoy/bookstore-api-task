import { Author } from "./author.type";
import { Book } from "./book.type";

interface SearchApiResponse {
  status: number;
  message?: string;
  data?: {
    book?: Book | Book[],
    author?: Author | Author []
  },
}

export type {
  SearchApiResponse
}