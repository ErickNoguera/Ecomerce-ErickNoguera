import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) return `No se encontro el usuario con el id: ${id}`;
    const { password, ...userNoPassword } = user;

    return userNoPassword;
  }

  async createUser(user: Partial<Users>): Promise<Partial<Users>> {
    const newUser = await this.usersRepository.save(user);

    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });

    const { password, ...userNoPassword } = dbUser;

    return userNoPassword;
  }

  async updateUser(
    id: string,
    user: Partial<UpdateUserDto>,
  ): Promise<Partial<Users>> {
    const { confirmPassword, ...userNoConfirmPassword } = user;
    await this.usersRepository.update(id, userNoConfirmPassword);

    const updateUser = await this.usersRepository.findOneBy({ id });

    if (!updateUser) {
      throw new Error(`User with id ${id} not found`);
    }

    const { password, ...userNoPassword } = updateUser;
    return userNoPassword;
  }

  async deleteUser(id: string): Promise<Partial<Users>> {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;

    return userNoPassword;
  }

  async getUSerByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
