import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { accounts } from '../Entities/account-Entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from '../DTOs/createAccountDto';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(accounts)
  private readonly accountRepository:Repository<accounts>,
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
