import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Accounts } from '../Entities/account-Entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from '../DTOs/createAccountDto';
import { accountUpdateDto } from '../DTOs/accountUpdateDto';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(Accounts)
  private readonly accountRepository:Repository<Accounts>,
){
 }

 async createAccount(userId:number, body:CreateAccountDto ){
   const account=await this.accountRepository.create({
   ...body,
   user:{userId} 
  })
  await this.accountRepository.save(account)
  return {
    message:'account created successfully',
    body 
  }
 }
 async allAccounts(userId:number ){
  return await this.accountRepository.findOne({
    where:{
      user:{userId}
    }
  })
 }
 async accountDetail(userId:number, accountId:number){
  const account = await this.accountRepository.findOne({
    where:{
    user:{userId},
      accountId:accountId 
    }
  })
  if(!account){
    throw new NotFoundException('account not found')
  }
  return account 
 }
 async updateAccount(userId:number , accountId:number , body:accountUpdateDto){
  const account= await this.accountRepository.findOne({
    where:{
      user:{userId},
      accountId
    }
  })
  if(!account){
      throw new NotFoundException('account not found')
    }
    
    await this.accountRepository.update(
     {accountId},
      body,
      
    )
    return{
      message:'account updated successfully',
      body
    }
 }
 async deleteAccount(userId:number,accountId:number){
  const account = await this.accountRepository.findOne({
    where:{user:{userId},
    accountId:accountId
  }
  })
  await this.accountRepository.delete(accountId)
  if(!accountId){
    throw new NotFoundException('account not found')
  }
  return {
     message : "account deleted successfully" 
  }
 }
}
