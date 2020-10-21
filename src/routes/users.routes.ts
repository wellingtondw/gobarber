import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatarService = new UpdateUserAvatarService();
      const user = await updateAvatarService.execute({
        userId: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      response.json(user);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  },
);

export default usersRouter;
