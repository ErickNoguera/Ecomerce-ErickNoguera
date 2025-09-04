import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  /**
   * Debe ser un string entre 3 y 50 caracteres
   * @example "Test User01"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  /**
   * Debe ser un strin y un email válido
   * @example "testuser@example.com"
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe ser un strin entre 8 y 15 caracteres, con al menos una letra minúscula, una letra mayúscula,
   * al menos un número y al menos uno de los siguientes carácteres especiales: !@#$%^&*()_-+={}[]|:;"'<>,.?/\
   * @example "aaBB123#"
   */
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  /**
   * Debe ser igual a la password
   * @example "aaBB123#"
   */
  @IsNotEmpty()
  @Validate(MatchPassword, [`password`])
  confirmPassword: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   * @example "Test Street 1234"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un número
   * @example "12345678"
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Debe ser un string entre 3 y 20 carácteres
   * @example "USA"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  country: string;

  /**
   * Debe ser un string entre 4 y 20 carácteres
   * @example "Lima"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;

  /**
   * Debe ser un número
   * @example "12"
   */
  @IsNotEmpty()
  @IsNumber()
  age: number;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  `email`,
  `password`,
]) {}

export class UpdateUserDto {
  /**
   * Debe ser un string entre 3 y 50 caracteres
   * @example "Test User01"
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  /**
   * Debe ser un strin y un email válido
   * @example "testuser@example.com"
   */
  @IsOptional()
  @IsEmail()
  email?: string;

  /**
   * Debe ser un strin entre 8 y 15 caracteres, con al menos una letra minúscula, una letra mayúscula,
   * al menos un número y al menos uno de los siguientes carácteres especiales: !@#$%^&*()_-+={}[]|:;"'<>,.?/\
   * @example "aaBB123#"
   */
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(15)
  password?: string;

  /**
   * Debe ser igual a la password
   * @example "aaBB123#"
   */
  @IsOptional()
  @Validate(MatchPassword, [`password`])
  confirmPassword?: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   * @example "Test Street 1234"
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  /**
   * Debe ser un número
   * @example "12345678"
   */
  @IsOptional()
  @IsNumber()
  phone?: number;

  /**
   * Debe ser un string entre 3 y 20 carácteres
   * @example "USA"
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  country?: string;

  /**
   * Debe ser un string entre 4 y 20 carácteres
   * @example "Lima"
   */
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  city?: string;

  @ApiHideProperty()
  @IsOptional()
  isAdmin?: boolean;
}
