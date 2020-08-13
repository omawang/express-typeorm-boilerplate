import { IsNotEmpty, IsEmail, MinLength } from 'class-validator'

export class UpdateProfileDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  phone: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  profession: string
}
