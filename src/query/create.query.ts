import db from "../knex/knex";
import { UserInputData } from "../Types/types";
import { fetchCreatedUser } from './read.query';

const addUser = async (userdata: UserInputData) => {
  try {
    const newUserId = await db('users').insert({email: userdata.email, password: userdata.password});
    const user = await fetchCreatedUser(newUserId[0]);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export{ addUser };