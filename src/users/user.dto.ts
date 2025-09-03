import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
  validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  //cumple con criterios de fortaleza de
  //validator.js (lengh min 8, debe incluir mayus, minus,
  //numeros, simbolos especiales, evita patrones predecibles)
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  @Validate(MatchPassword, [`password`])
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @IsEmpty()
  isAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  `email`,
  `password`,
]) {}
