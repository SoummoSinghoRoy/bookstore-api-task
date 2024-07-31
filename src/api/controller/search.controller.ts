import { Request, Response } from "express";
import { SearchApiResponse } from "../../Types/search.type";
import { searchAuthors, searchBooks } from "../../query/search.query";

const searchBooksController = async (req: Request, res: Response): Promise<void> => {
  let {searchterm} = req.params;
  try {
    const books = await searchBooks(searchterm);
    if(books?.length !== 0) {
      const response: SearchApiResponse = {
        status: 200,
        message: `Book retrieve successfully`,
        data: {
          book: books
        }
      }
      res.json(response);  
    } else {
      const response: SearchApiResponse = {
        status: 404,
        message: `Book not found`,
      }
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    const response: SearchApiResponse = {
      status: 500,
      message: 'Internal server error'
    }
    res.json(response);
  }
}

const searcAuthorsController = async (req: Request, res: Response): Promise<void> => {
  let {searchterm} = req.params;
  try {
    const authors = await searchAuthors(searchterm);
    if(authors?.length !== 0) {
      const response: SearchApiResponse = {
        status: 200,
        message: `Author retrieve successfully`,
        data: {
          author: authors
        }
      }
      res.json(response);  
    } else {
      const response: SearchApiResponse = {
        status: 404,
        message: `Author not found`,
      }
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    const response: SearchApiResponse = {
      status: 500,
      message: 'Internal server error'
    }
    res.json(response);
  }
}

export {
  searchBooksController,
  searcAuthorsController
}