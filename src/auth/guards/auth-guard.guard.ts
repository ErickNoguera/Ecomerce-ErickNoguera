import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    //*LLEGA EL TOKEN POR HEADERS...
    const token = request.headers.autorization?.split(` `)[1];

    if (!token) throw new UnauthorizedException(`Token required`);

    try {
      //*VALIDAR EL TOKEN
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });

      payload.exp = new Date(payload.exp * 1000);
      payload.iat = new Date(payload.iat * 1000);

      payload.roles = payload.isAdmin ? [Role.Admin] : [Role.User];

      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(`Invalid token`);
    }
  }
}
