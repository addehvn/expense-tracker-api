import { Injectable } from "@nestjs/common";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

@Injectable()
export class userupdateDto{
  @IsString()
  username:string

  @IsEmail()
  email:string

  @IsStrongPassword()
  password:string
}

