import db from '../knex/knex';

const deleteAuthor = async (id: number) => {
  try {
    const deletedAuthor = await db('authors').where('id', id).del();
    return deletedAuthor;
  } catch (error) {
    console.log(error)
  }
}

const deleteBook = async (id: number) => {
  try {
    const deletedBook = await db('books').where('id', id).del();
    return deletedBook;
  } catch (error) {
    console.log(error)
  }
}

export {
  deleteAuthor,
  deleteBook
}