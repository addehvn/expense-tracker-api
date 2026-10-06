import { IsNumber, IsOptional, IsString } from "class-validator";

export class accountUpdateDto{
  @IsOptional()
  @IsString()
  name:string

  @IsOptional()
  @IsNumber()
  balance:number
}