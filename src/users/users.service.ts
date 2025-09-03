import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(page: number, limit: number) {
    const users = await this.userRepository.getUsers(page, limit);
    return users;
  }

  getUser(id: string) {
    return this.userRepository.getUser(id);
  }

  createUser(user) {
    return this.userRepository.createUser(user);
  }

  updateUser(id: string, upUser) {
    return this.userRepository.updateUser(id, upUser);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
