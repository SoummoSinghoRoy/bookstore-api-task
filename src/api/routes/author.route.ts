import { Router } from 'express';
const router = Router();
import authorValidator from '../validation/author/author.validation';
import { isAuthenticated } from '../../middleware/isAuthenticated.middleware';
import { allAuthorGetController, authorCreatePostController, authorDeleteController, authorEditPutController, singleAuthorGetController } from '../controller/author.controller';

router.post('/', isAuthenticated, authorValidator, authorCreatePostController);
router.get('/', isAuthenticated, allAuthorGetController);
router.get('/:id', isAuthenticated, singleAuthorGetController);
router.put('/:id', isAuthenticated, authorValidator, authorEditPutController);
router.delete('/:id', isAuthenticated, authorDeleteController);

export default router;