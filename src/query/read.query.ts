import db from '../knex/knex';
import { Book } from '../Types/book.type';

const fetchCreatedUser = async (userId: any) => {
  try {
    const user = await db.where('id', userId).select('id', 'email').from('users').first();
    return user;
  } catch (error) {
    console.log(error);
  }
}

const checkUser = async (email: string) => {
  try {
    const user = await db.where('email', email).select('*').from('users').first();
    return user;
  } catch (error) {
    console.log(error);
  }
}

const checkAuthor = async (authorInfo: string | number) => {
  try {
    const column = typeof authorInfo === 'string' ? 'name' : 'id';
    const author = await db.where(column, authorInfo).select('*').from('authors').first();
    return author;
  } catch (error) {
    console.log(error);
  }
}

const fetchAllAuthors = async (page: number=1, limitData: number=10) => {
  try {
    const offset = (page - 1) * limitData;
    const authors = await db.select('*').from('authors').limit(limitData).offset(offset);
    const totalCount = await db('authors').count('id as count').first();
    const totalPages = totalCount ? Math.ceil(totalCount.count as number / limitData) : 0;
    const result = {
      authors, totalCount, totalPages
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

const checkBook = async (bookInfo: string | number) => {
  try {
    const column = typeof bookInfo === 'string' ? 'title' : 'id';
    const book = await db('books').where(column, bookInfo).select('*').first();
    return book;
  } catch (error) {
    console.log(error);
  }
}

const checkBookWithAuthor = async (bookInfo: string | number) => {
  try {
    const column = typeof bookInfo === 'string' ? 'title' : 'id';
    const bookdata = await db('books')
                          .join('authors', 'books.author_id', '=', 'authors.id')
                          .select('books.*', 'authors.*')
                          .where(`books.${column}`, bookInfo)
                          .distinct('books.id')
                          .first();
    const book: Book = {
      id: bookdata.id,
      title: bookdata.title,
      description: bookdata.description,
      published_date: bookdata.published_date,
      author: {
        id: bookdata.author_id,
        name: bookdata.name,
        bio: bookdata.bio,
        birthdate: bookdata.birthdate
      }
    }
    return book;
  } catch (error) {
    console.log(error);
  }
}

const fetchAllBooksWithAuthors = async(page: number, limitData: number) => {
  try {
    const offset = (page - 1) * limitData;
    const booksdata = await db('books')
                        .join('authors', 'books.author_id', '=', 'authors.id')
                        .select('authors.*', 'books.*')
                        .distinct('books.id')
                        .offset(offset)
                        .limit(limitData);
    const totalCount = await db('books').count('id as count').first();
    const totalPages = totalCount ? Math.ceil(totalCount.count as number / limitData) : 0;
    const books = booksdata.map((book) => ({
        id: book.id,
        title: book.title,
        description: book.description,
        published_date: book.published_date,
        author: {
          id: book.author_id,
          name: book.name,
          bio: book.bio,
          birthdate: book.birthdate
        }
    }));
    const result = {
      books, totalPages, totalCount
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

const getBooksOfAnAuthor = async (authorId: number) => {
  try {
    const booksofAuthor = await db.select('*').from('books').where('author_id', authorId);
    return booksofAuthor;
  } catch (error) {
    console.log(error);
  }
}

const authorDetailsWithBooks = async (authorId: number) => {
  try {
    const author = await db.select('*').from('authors').where('id', authorId).first();
    const books = await db.select('id', 'title', 'description', 'published_date').from('books').where('author_id', author.id);
    const authorWithBooks = {
      ...author,
      books
    };
    return authorWithBooks;
  } catch (error) {
    console.log(error)
  }
}

const fetchAuthorsWithBooks = async () => {
  try {
    const authorsWithBooks = await db('authors')
                                  .leftJoin('books', 'authors.id', 'books.author_id')
                                  .select(
                                    'authors.*',
                                    'books.id as book_id',
                                    'books.title',
                                    'books.description',
                                    'books.published_date'
                                  )
                                  .groupBy('authors.id', 'books.id');

    const result = authorsWithBooks.reduce((acc, item) => {
      const { id, name, bio, birthdate, book_id, title, description, published_date } = item;
  
      if (!acc[id]) {
          acc[id] = {
              id,
              name,
              bio,
              birthdate,
              books: []
          };
      }
  
      if (book_id) {
          acc[id].books.push({ book_id, title, description, published_date });
      }
  
      return acc;
  }, {});
  
  const finalData = Object.values(result);
  return finalData;
  } catch (error) {
    console.log(error);
  }
}


export {
  fetchCreatedUser,
  checkUser,
  checkAuthor,
  fetchAllAuthors,
  checkBook,
  checkBookWithAuthor,
  fetchAllBooksWithAuthors,
  getBooksOfAnAuthor,
  authorDetailsWithBooks,
  fetchAuthorsWithBooks
};