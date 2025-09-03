import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

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

  async updateUser(id: string, user: Users): Promise<Partial<Users>> {
    await this.usersRepository.update(id, user);
    const updateUser = await this.usersRepository.findOneBy({ id });
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

// import { Injectable } from '@nestjs/common';

// export interface User {
//   id: number;
//   email: string;
//   name: string;
//   password: string;
//   addres: string;
//   phone: string;
//   country?: string | undefined;
//   city?: string | undefined;
// }

// @Injectable()
// export class UserRepository {
//   private users = [
//     {
//       id: 1,
//       email: 'juan@mainModule.com',
//       name: 'juan',
//       password: 'juan755124',
//       addres: 'calle 4587',
//       phone: '775123',
//       country: 'Colombia',
//       city: 'Medellin',
//     },
//     {
//       id: 2,
//       email: 'manuel@mainModule.com',
//       name: 'manuel',
//       password: 'manuel755124',
//       addres: 'calle 8545',
//       phone: '78865235487',
//       country: 'Chile',
//       city: 'Valencia',
//     },
//     {
//       id: 3,
//       email: 'pedro@mainModule.com',
//       name: 'pedro',
//       password: 'pedro755124',
//       addres: 'calle 7845',
//       phone: '65257852',
//       country: 'Venezuela',
//       city: 'Valencia',
//     },
//   ];

//   getUsers(page: number, limit: number) {
//     const start = (page - 1) * limit;
//     const end = start + limit;

//     const userPage = this.users.slice(start, end);
//     const users = userPage.map(({ password, ...userWithouPassword }) => {
//       return userWithouPassword;
//     });
//     return users;
//   }

//   getUser(id: string) {
//     const user = this.users.find((user) => user.id === parseInt(id));

//     if (!user) return 'User not found';
//     const { password, ...userWithoutPassword } = user;

//     return userWithoutPassword;
//   }

//   getUserByEmail(email: string) {
//     return this.users.find((user) => user.email === email);
//   }

//   createUser(newUser) {
//     const id = this.users.length + 1;
//     this.users.push({ id, ...newUser });

//     const { password, ...userWithouPassword } = newUser;

//     return userWithouPassword;
//   }

//   updateUser(id: string, upUser) {
//     const usuario = this.users.find((user) => user.id === parseInt(id));

//     if (!usuario) return `User not found`;

//     const updateUser = { ...usuario, upUser };

//     this.users.map((user) => (user.id === parseInt(id) ? updateUser : upUser));

//     const { password, ...userWithouPassword } = updateUser;

//     return userWithouPassword;
//   }

//   deleteUser(id: string) {
//     const user = this.users.find((user) => user.id === +id);

//     if (!user) return `User not found`;

//     this.users = this.users.filter((user) => user.id !== +id);

//     const { password, ...userWithouPassword } = user;

//     return userWithouPassword;
//   }
// }
