import { Router } from 'express';
const router = Router();
import { isAuthenticated } from '../../middleware/isAuthenticated.middleware';
import createBookValidator from '../validation/book/createbook.validation';
import { allBooksGetController, authorDetailsWithBooksController, bookCreatePostController, bookdeleteController, editBookPutController, singleBookGetController } from '../controller/book.controller';
import editBookValidator from '../validation/book/editbook.validation';
import { searchBooksController } from '../controller/search.controller';

router.post('/', isAuthenticated, createBookValidator, bookCreatePostController);
router.get('/', isAuthenticated, allBooksGetController);
router.get('/:id', singleBookGetController);
router.put('/:id', isAuthenticated, editBookValidator, editBookPutController);
router.delete('/:id', isAuthenticated, bookdeleteController);
router.get('/author/:id', authorDetailsWithBooksController);
router.get('/search/:searchterm', isAuthenticated, searchBooksController);

export default router;