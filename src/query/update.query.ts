import db from '../knex/knex';
import { AuthorInputData } from '../Types/author.type';
import { checkAuthor } from './read.query';

const authorUpdate = async (id:number, updatedData: AuthorInputData) => {
  try {
    const updatedAuthorId = await db('authors').where('id', id).update({
      name: updatedData.name,
      bio: updatedData.bio,
      birthdate: updatedData.birthdate
    });
    const updatedAuthor = await checkAuthor(updatedAuthorId);
    return updatedAuthor;
  } catch (error) {
    console.log(error)
  }
}

export {
  authorUpdate
}