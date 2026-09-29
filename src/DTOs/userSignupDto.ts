import { IsEmail, IsString } from "@nestjs/class-validator";
import { IsStrongPassword } from "class-validator";

export class UserSignupDto {

  @IsString()
  userName:string

  @IsEmail()
  email:string

  @IsStrongPassword()
  password:string
}