import { Router } from 'express';
const router = Router();
import { isAuthenticated } from '../../middleware/isAuthenticated.middleware';
import createBookValidator from '../validation/book/createbook.validation';
import { allBooksGetController, bookCreatePostController, bookdeleteController, editBookPutController, singleBookGetController } from '../controller/book.controller';
import editBookValidator from '../validation/book/editbook.validation';

router.post('/', isAuthenticated, createBookValidator, bookCreatePostController);
router.get('/', isAuthenticated, allBooksGetController);
router.get('/:id', isAuthenticated, singleBookGetController);
router.put('/:id', isAuthenticated, editBookValidator, editBookPutController);
router.delete('/:id', isAuthenticated, bookdeleteController);

export default router;