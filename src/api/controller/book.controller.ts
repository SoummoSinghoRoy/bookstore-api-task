import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BookApiResponse } from "../../Types/book.type";
import { checkAuthor, checkBook, checkBookWithAuthor, fetchAllBooksWithAuthors } from "../../query/read.query";
import { createBook } from "../../query/create.query";
import { bookUpdate } from "../../query/update.query";
import { deleteBook } from "../../query/delete.query";

const bookCreatePostController = async(req: Request, res: Response) => {
  let { title, published_date, author_id } = req.body;
  const description = req.body.description || null;
  const errors = validationResult(req).formatWith(err => err.msg);
  if(!errors.isEmpty()) {
    const response: BookApiResponse = {
      status: 400,
      message: `Validation error`,
      error: {
        message: errors.mapped()
      }
    }
    res.json(response);
  } else {
    try {
      const author = await checkAuthor(parseInt(author_id));
      if(author) {
        const book = await createBook({title, description, published_date, authorId: parseInt(author.id)});
        const response: BookApiResponse = {
          status: 200,
          message: `Book added Successfully`,
          data: {
            id: book!.id,
            title: book!.title,
            description: book!.description,
            published_date: book!.published_date,
            author: book!.author
          }
        }
        res.json(response);        
      }
    } catch (error) {
      const response: BookApiResponse = {
        status: 500,
        message: 'Internal server error',
        error: { message: 'Error occurred, get back soon' }
      }
      res.json(response);
    }
  }
}

const allBooksGetController = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 10;
  try {
    const result = await fetchAllBooksWithAuthors(page, limit);
    const response: BookApiResponse = {
      status: 200,
      message: `Books fetched Successfully`,
      data: result?.books,
      pagination: {
        totalCount: result?.totalCount?.count,
        currentPage: page,
        totalPages: result?.totalPages
      }
    }
    res.json(response);
  } catch (error) {
    console.log(error);
    const response: BookApiResponse = {
      status: 500,
      message: 'Internal server error'
    }
    res.json(response);
  }
}

const singleBookGetController = async(req: Request, res: Response) => {
  let { id } = req.params;
  try {
    const book = await checkBookWithAuthor(parseInt(id));
    if(book) {
      const response: BookApiResponse = {
        status: 200,
        message: `Book found`,
        data: {
          id: book!.id,
          title: book!.title,
          description: book!.description,
          published_date: book!.published_date,
          author: book!.author
        }
      }
      res.json(response);
    } else {
      const response: BookApiResponse = {
        status: 404,
        message: `Book not found`,
      }
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    const response: BookApiResponse = {
      status: 500,
      message: 'Internal server error'
    }
    res.json(response);
  }
}

const editBookPutController = async(req: Request, res: Response) => {
  let { title, published_date, author_id } = req.body;
  let {id} = req.params;
  const description = req.body.description || null;
  const errors = validationResult(req).formatWith(err => err.msg);
  if(!errors.isEmpty()) {
    const response: BookApiResponse = {
      status: 400,
      message: `Validation error`,
      error: {
        message: errors.mapped()
      }
    }
    res.json(response);
  } else {
    try {
      const validBook = await checkBook(parseInt(id));
      if(validBook) {
        const validAuthor = await checkAuthor(parseInt(author_id));
        if(validAuthor) {
          const updatedBook = await bookUpdate(validBook.id, {title, description, published_date, authorId: validAuthor.id});
          const response: BookApiResponse = {
            status: 200,
            message: `Book updated Successfully`,
            data: {
              id: updatedBook!.id,
              title: updatedBook!.title,
              description: updatedBook!.description,
              published_date: updatedBook!.published_date,
              author: updatedBook!.author
            }
          }
          res.json(response);
        }
      } else {
        const response: BookApiResponse = {
          status: 404,
          message: `Book not found`,
        }
        res.json(response);
      }
    } catch (error) {
      const response: BookApiResponse = {
        status: 500,
        message: 'Internal server error',
        error: { message: 'Error occurred, get back soon' }
      }
      res.json(response);
    }
  }
}

const bookdeleteController = async (req: Request, res: Response) => {
  let {id} = req.params;
  try {
    const validBook = await checkBook(parseInt(id));
    if(validBook) {
      await deleteBook(validBook.id);
      const response: BookApiResponse = {
        status: 200,
        message: `Book deleted Successfully`,
      }
      res.json(response);  
    } else {
      const response: BookApiResponse = {
        status: 404,
        message: `Book not found`,
      }
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    const response: BookApiResponse = {
      status: 500,
      message: 'Internal server error'
    }
    res.json(response);
  }
}

export {
  bookCreatePostController,
  allBooksGetController,
  singleBookGetController,
  editBookPutController,
  bookdeleteController
}