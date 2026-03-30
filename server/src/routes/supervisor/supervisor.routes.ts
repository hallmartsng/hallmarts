import Router from 'express';
import { getAllSupervisors } from '../../controllers/supervisor/supervisor.controllers';
import authenticateMiddleWare from '../../middlewares/authenticate.middleware';
import { updateProject } from '../../controllers/admin/project.controllers';

const router = Router();

router.get('/', authenticateMiddleWare, getAllSupervisors);
router.patch('/projects/:id', authenticateMiddleWare, updateProject);

export default router;
