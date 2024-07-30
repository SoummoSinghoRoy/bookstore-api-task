import db from '../knex/knex';
import { AuthorInputData } from '../Types/author.type';
import { BookInputData } from '../Types/book.type';
import { checkAuthor, checkBookWithAuthor } from './read.query';

const authorUpdate = async (id:number, updatedData: AuthorInputData) => {
  try {
    await db('authors').where('id', id).update({
      name: updatedData.name,
      bio: updatedData.bio,
      birthdate: updatedData.birthdate
    });
    const updatedAuthor = await checkAuthor(id);
    return updatedAuthor;
  } catch (error) {
    console.log(error)
  }
}

const bookUpdate = async (id: number, updatedData: BookInputData) => {
  try {
    await db('books').where('id', id).update({
      title: updatedData.title,
      description: updatedData.description,
      published_date: updatedData.published_date,
      author_id: updatedData.authorId
    })
    const updatedBook = await checkBookWithAuthor(id);
    return updatedBook;
  } catch (error) {
    console.log(error)
  }
}

export {
  authorUpdate,
  bookUpdate
}