import { IsNumber, IsString } from "class-validator";

export class updateTransactionDto{
  
  @IsString()
  name:string

  @IsNumber()
  price:number
}