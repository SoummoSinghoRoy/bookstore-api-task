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

export {
  fetchCreatedUser,
  checkUser
};