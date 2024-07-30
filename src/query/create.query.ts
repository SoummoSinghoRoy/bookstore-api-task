import db from "../knex/knex";
import { AuthorInputData } from "../Types/author.type";
import { BookInputData } from "../Types/book.type";
import { UserInputData } from "../Types/user.type";
import { checkAuthor, checkBookWithAuthor, fetchCreatedUser } from './read.query';

const addUser = async (userdata: UserInputData) => {
  try {
    const newUserId = await db('users').insert({email: userdata.email, password: userdata.password});
    const user = await fetchCreatedUser(newUserId[0]);
    return user;
  } catch (error) {
    console.log(error);
  }
}

const createAuthor = async (authorData: AuthorInputData) => {
  try {
    const newAuthorId = await db('authors').insert({name: authorData.name, bio: authorData.bio, birthdate: authorData.birthdate});
    const author = await checkAuthor(newAuthorId[0]);
    return author;
  } catch (error) {
    console.log(error);
  }
}

const createBook = async (bookData: BookInputData) => {
  try {
    const newBookId = await db('books').insert({title: bookData.title, description: bookData.description, published_date: bookData.published_date, author_id: bookData.authorId});
    const book = await checkBookWithAuthor(newBookId[0]);
    return book;
  } catch (error) {
    console.log(error)
  }
}

export{ 
  addUser,
  createAuthor ,
  createBook
};