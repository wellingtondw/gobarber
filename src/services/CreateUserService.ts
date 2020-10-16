import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  email: string;
  name: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const emailAlreadyExists = await usersRepository.findOne({
      where: { email },
    });

    if (emailAlreadyExists) {
      throw new Error('Email already exists.');
    }

    const user = usersRepository.create({ name, email, password });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
