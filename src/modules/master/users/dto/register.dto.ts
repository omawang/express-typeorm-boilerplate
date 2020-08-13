import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsNumberString,
  MaxLength,
} from 'class-validator'

export class RegisterDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  phone: string

  @IsNotEmpty()
  profession: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  password: string

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(6)
  @MaxLength(6)
  pin: string
}
