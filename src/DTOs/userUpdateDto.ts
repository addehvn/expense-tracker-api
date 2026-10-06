import { Injectable } from "@nestjs/common";
import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

@Injectable()
export class userupdateDto{
  @IsOptional()
  @IsString()
  username:string
  @IsOptional()
  @IsEmail()
  email:string
  @IsOptional()
  @IsStrongPassword()
  password:string
}

