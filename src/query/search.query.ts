import db from '../knex/knex';

const searchBooks = async (searchTerm: string) => {
  try {
    const books = await db('books').select('*').where('title', 'like', `%${searchTerm}%`);;
    return books;
  } catch (error) {
    console.log(error);
  }
}

const searchAuthors = async (searchTerm: string) => {
  try {
    const authors = await db('authors').select('*').where('name', 'like', `%${searchTerm}%`);
    return authors;
  } catch (error) {
    console.log(error)
  }
}

export { searchBooks, searchAuthors }