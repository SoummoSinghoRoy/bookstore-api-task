import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthorApiResponse } from "../../Types/author.type";
import { createAuthor } from "../../query/create.query";
import { checkAuthor, fetchAllAuthors } from "../../query/read.query";
import { authorUpdate } from "../../query/update.query";
import { deleteAuthor } from "../../query/delete.query";

const authorCreatePostController = async (req: Request, res: Response) => {
  let { name, birthdate } = req.body;
  const bio = req.body.bio || null;
  const errors = validationResult(req).formatWith(err => err.msg);
  if(!errors.isEmpty()) {
    const response: AuthorApiResponse = {
      status: 400,
      message: `Validation error`,
      error: {
        message: errors.mapped()
      }
    }
    res.json(response);
  } else {
    try {
      const author = await createAuthor({name, bio, birthdate});
      const response: AuthorApiResponse = {
        status: 200,
        message: `Author added Successfully`,
        data: {
          id: author.id,
          name: author.name,
          bio: author.bio,
          birthdate: author.birthdate
        }
      }
      res.json(response);
    } catch (error) {
      console.log(error);
      const response: AuthorApiResponse = {
        status: 500,
        message: 'Internal server error',
        error: { message: 'Error occurred, get back soon' }
      }
      res.json(response);
    }
  }
}

const allAuthorGetController = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 10;
  try {
    const result = await fetchAllAuthors(page, limit);
    if(result?.authors.length !== 5) {
      const response: AuthorApiResponse = {
        status: 200,
        message: `Authors fetched Successfully`,
        data: result?.authors,
        pagination: {
          totalCount: result?.totalCount?.count,
          currentPage: page,
          totalPages: result?.totalPages
        }
      }
      res.json(response);
    } else {
      const response: AuthorApiResponse = {
        status: 200,
        message: `Authors is empty`
      }
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    const response: AuthorApiResponse = {
      status: 500,
      message: 'Internal server error'
    }
    res.json(response);
  }
}

const singleAuthorGetController = async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    const author = await checkAuthor(parseInt(id));
    if(author) {
      const response: AuthorApiResponse = {
        status: 200,
        message: `Author found`,
        data: {
          id: author.id,
          name: author.name,
          bio: author.bio ? author.bio : '',
          birthdate: author.birthdate
        }
      }
      res.json(response);
    } else {
      const response: AuthorApiResponse = {
        status: 404,
        message: `Author not found`,
      }
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    const response: AuthorApiResponse = {
      status: 500,
      message: 'Internal server error'
    }
    res.json(response);
  }
}

const authorEditPutController = async (req: Request, res: Response) => {
  let { name, birthdate } = req.body;
  let {id} = req.params;
  const bio = req.body.bio || null;
  const errors = validationResult(req).formatWith(err => err.msg);

  if(!errors.isEmpty()) {
    const response: AuthorApiResponse = {
      status: 400,
      message: `Validation error`,
      error: {
        message: errors.mapped()
      }
    }
    res.json(response);
  } else {
    try {
      const validAuthor = await checkAuthor(parseInt(id));
      if(validAuthor) {
        const updatedAuthor = await authorUpdate(validAuthor.id, {name, bio, birthdate})
        const response: AuthorApiResponse = {
          status: 200,
          message: `Author updated Successfully`,
          data: {
            id: updatedAuthor.id,
            name: updatedAuthor.name,
            bio: updatedAuthor.bio,
            birthdate: updatedAuthor.birthdate
          }
        }
        res.json(response);
      } else {
        const response: AuthorApiResponse = {
          status: 404,
          message: `Author not found`,
        }
        res.json(response);
      }
    } catch (error) {
      console.log(error);
      const response: AuthorApiResponse = {
        status: 500,
        message: 'Internal server error',
        error: { message: 'Error occurred, get back soon' }
      }
      res.json(response);
    }
  }
}

const authorDeleteController = async(req: Request, res: Response) => {
  let {id} = req.params;
  try {
    const validAuthor = await checkAuthor(parseInt(id));
    if(validAuthor) {
      await deleteAuthor(validAuthor.id);
      const response: AuthorApiResponse = {
        status: 200,
        message: `Author deleted Successfully`,
      }
      res.json(response);       
    } else {
      const response: AuthorApiResponse = {
        status: 404,
        message: `Author not found`,
      }
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    const response: AuthorApiResponse = {
      status: 500,
      message: 'Internal server error'
    }
    res.json(response);
  }
}

export {
  authorCreatePostController,
  allAuthorGetController,
  singleAuthorGetController,
  authorEditPutController,
  authorDeleteController
}

