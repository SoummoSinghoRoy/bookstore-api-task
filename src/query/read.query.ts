import db from '../knex/knex';

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

const fetchAllAuthors = async (page: number, limit: number) => {
  try {
    const offset = (page - 1) * limit;
    const authors = await db.select('*').from('authors').limit(limit).offset(offset);
    const totalCount = await db('authors').count('id as count').first();
    
    const totalPages = totalCount ? Math.ceil(totalCount.count as number / limit) : 0;
    const result = {
      authors, totalCount, totalPages
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

export {
  fetchCreatedUser,
  checkUser,
  checkAuthor,
  fetchAllAuthors
};