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

const fetchAllAuthors = async (page: number, limitData: number) => {
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
                        .select('books.*', 'authors.*')
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

// search books
// search authors

// const getBooksOfAnAuthor = async (authorId: number) => {}

// const authorDetailsWithBooks = async (authorId: number) => {}


export {
  fetchCreatedUser,
  checkUser,
  checkAuthor,
  fetchAllAuthors,
  checkBook,
  checkBookWithAuthor,
  fetchAllBooksWithAuthors
};