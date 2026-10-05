import { IsNumber, IsString } from "class-validator";

export class createTransactionDto{

  @IsString()
  name:string
  
  @IsNumber()
  price:number
  
  
}