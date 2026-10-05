import { Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../Entities/transaction-entity';
import { Repository } from 'typeorm';
import { Category } from '../Entities/category-entity';
import { createTransactionDto } from '../DTOs/crateTranactionDto';
import { Accounts } from '../Entities/account-Entity';
import { updateTransactionDto } from '../DTOs/updateTransactionDto';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepositry:Repository<Transaction>,
    @InjectRepository(Category)
    private readonly categoryRepositry:Repository<Category>,
    @InjectRepository(Accounts)
    private readonly accountsRepositry:Repository<Accounts>
  ){}

  async createTransaction(userId:number , body:createTransactionDto , categoryId:number , accountId:number, ){
    const account = await this.accountsRepositry.findOne({
      where:{
        user:{userId},
        accountId
      }
    })
   
    if(!account){
      throw new NotFoundException('account not found ')
    }
    const category = await this.categoryRepositry.findOne({
      where:{
        categoryId,
        account:{accountId}
      }
    })
    
    if(!category){
      throw new NotFoundException('category not found ')
    }
    const transaction = this.transactionRepositry.create({
      ...body,
      category,
      account
    })


    await this.transactionRepositry.save(transaction)

    return ({
      message: 'transaction created successfully',
      body 
    })
  }


  async getAllTransactions(userId:number , categoryId:number , accountId: number){

    const account = await this.accountsRepositry.findOne({
      where:{
        user:{userId},
        accountId
      }
    })
    if(!account){
      throw new NotFoundException('account not found ')
    }

    const category= await this.categoryRepositry.findOne({
      where:{
        categoryId,
        account:{accountId}
      }
    })

    if(!category){
      throw new NotFoundException('category not found')
    }

    return this.transactionRepositry.find({
      where:{
        category:{categoryId},
        account:{accountId}
      }
    })
    

  }

  async getTransactionDetail(userId:number, categoryId:number , accountId:number , transactionId:number){

    const account= await this.accountsRepositry.findOne({
      where:{
        user:{userId},
        accountId
      }
    })
    if(!account){
      throw new NotFoundException('account not found')
    }

    const category= await this.categoryRepositry.findOne({
      where:{
        account:{accountId},
        categoryId
      }
    })
    if(!category){
      throw new NotFoundException('category not found')
    }

    return await this.transactionRepositry.findOne({
      where:{
        transactionId,
        category:{categoryId}
      }
    })
  }


  async updateTransaction(userId:number, body:updateTransactionDto ,  categoryId:number , accountId:number , transactionId:number){

    const account = await this.accountsRepositry.findOne({
      where:{
        user:{userId},
        accountId
      }
    })

    if(!account){
      throw new NotFoundException('account not found')
    }

    const category = await this.categoryRepositry.findOne({
      where:{
        account:{accountId},
        categoryId
      }
    })

    if(!category){
      throw new NotFoundException('category not found')
    }

    const transaction=await this.transactionRepositry.findOne({
      where:{
        category:{categoryId},
        transactionId
      }
    })

    if(!transaction){
      throw new NotFoundException('transaction not found')
    }

    await this.transactionRepositry.update(
      {transactionId},
      {...body},
    )

    return {
      message:'transaction updated successfully',
      body
    }

  }

  async deleteTransaction(userId:number ,  categoryId:number , accountId:number , transactionId:number){
     const account = await this.accountsRepositry.findOne({
      where:{
        user:{userId},
        accountId
      }
    })

    if(!account){
      throw new NotFoundException('account not found')
    }

    const category = await this.categoryRepositry.findOne({
      where:{
        account:{accountId},
        categoryId
      }
    })

    if(!category){
      throw new NotFoundException('category not found')
    }

    const transaction=await this.transactionRepositry.findOne({
      where:{
        category:{categoryId},
        transactionId
      }
    })

    if(!transaction){
      throw new NotFoundException('transaction not found')
    }

     this.transactionRepositry.delete( 
      transactionId, 
      
    )


    return {
      message:'transaction deleted successfully'
    }
  }

}
