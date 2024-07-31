interface Author {
  id: any;
  name: string;
  bio: string;
  birthdate: string;
}

interface AuthorApiResponse {
  status: number;
  error?: {
    message: string | object
  };
  message?: string;
  data?: any,
  pagination?: {
    totalCount: any,
    currentPage: any,
    totalPages: any
  }
}

interface AuthorInputData {
  name: string;
  bio?: string | null;
  birthdate: string;
}

export type {
  Author,
  AuthorApiResponse,
  AuthorInputData
}