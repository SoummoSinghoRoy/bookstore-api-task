import { Router } from 'express';
const router = Router();
import createAuthorValidator from '../validation/author/createauthor.validation';
import EditAuthorValidator from '../validation/author/editauthor.validation';
import { isAuthenticated } from '../../middleware/isAuthenticated.middleware';
import { allAuthorGetController, allAuthorsWithBooksGetController, allBooksOfAnAuthorController, authorCreatePostController, authorDeleteController, authorEditPutController, singleAuthorGetController } from '../controller/author.controller';
import { searcAuthorsController } from '../controller/search.controller';

router.post('/', isAuthenticated, createAuthorValidator, authorCreatePostController);
router.get('/all', allAuthorsWithBooksGetController);
router.get('/', isAuthenticated, allAuthorGetController);
router.get('/:id', isAuthenticated, singleAuthorGetController);
router.put('/:id', isAuthenticated, EditAuthorValidator, authorEditPutController);
router.delete('/:id', isAuthenticated, authorDeleteController);
router.get('/:id/books', allBooksOfAnAuthorController);
router.get('/search/:searchterm', isAuthenticated, searcAuthorsController);


export default router;