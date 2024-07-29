import db from '../knex/knex';

const deleteAuthor = async (id: number) => {
  try {
    const deletedAuthor = await db('authors').where('id', id).del();
    return deletedAuthor;
  } catch (error) {
    console.log(error)
  }
}

export {
  deleteAuthor
}