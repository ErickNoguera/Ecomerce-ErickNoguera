import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return `Get auth`;
  }

  async signIn(email: string, password: string) {
    if (!email || !password) return `Data required`;

    //*VERIFICAR QUE EL USUARIO EXISTA:
    const user = await this.userRepository.getUSerByEmail(email);

    if (!user) throw new BadRequestException(`Invalid Credentials`);

    //*COMPARAR LAS CONTRASEÑAS:
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) throw new BadRequestException(`Invalid Credentials`);

    //*FIRMA DEL TOKEN
    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    //*GENERACION DEL TOKEN
    const token = this.jwtService.sign(payload);

    //*ENTREGAR LA RESPUESTA AL CONTROLADOR
    return {
      message: 'Logged-in User',
      token,
    };
  }

  async signUp(user: Partial<Users>) {
    const { email, password } = user;

    //* VERIFICAR SI EL EMAIL ESTA REGISTRADO EN LA DB
    const foundUser = await this.userRepository.getUSerByEmail(email);

    if (foundUser) throw new BadRequestException(`Registered Email`);

    //* PROCESO DE REGISTRO Y HASHEO DE LA PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    //*GUARDAR EN LA DB
    return await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}
