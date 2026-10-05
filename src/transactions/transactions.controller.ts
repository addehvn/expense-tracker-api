import { Body, Controller, Delete, GatewayTimeoutException, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { jwtGuard } from '../guards/jwt-guard';
import { createTransactionDto } from '../DTOs/crateTranactionDto';
import type { AuthRequset } from '../Interfaces/Req.payload';
import { updateCategoryDto } from '../DTOs/updateCategoryDto';
import { updateTransactionDto } from '../DTOs/updateTransactionDto';

@Controller('transactions')
export class TransactionsController {

  constructor(
    private transactionService:TransactionsService
  ){}


  @UseGuards(jwtGuard)
  @Post('create/:accountId/:categoryId')
  createTransaction(@Req() req :AuthRequset , @Body() body:createTransactionDto , @Param('categoryId') categoryId:number , @Param('accountId') accountId:number){
    return this.transactionService.createTransaction(
      req.user.userId,
      body,
      categoryId,
      accountId,
    )
  }

  @UseGuards(jwtGuard)
  @Get('all/:accountId/:categoryId')
  getAllTransactions(@Req() req:AuthRequset , @Param('categoryId') categoryId:number , @Param('accountId') accountId:number){
    return this.transactionService.getAllTransactions(
      req.user.userId,
      categoryId,
      accountId,
      
    )
  }

  @UseGuards(jwtGuard)
  @Get('detail/:accountId/:categoryId/:transactionId')
  transactionDetail(@Req() req:AuthRequset , @Param('categoryId') categoryId:number , @Param('accountId') accountId:number , @Param('transactionId') transactionId:number ){
    return this.transactionService.getTransactionDetail(
      req.user.userId,
    categoryId,
    accountId,
    transactionId
    )
  }

  @UseGuards(jwtGuard)
  @Patch('update/:accountId/:categoryId/:transactionId')
  updateTransaction(@Req() req:AuthRequset ,@Body() body:updateTransactionDto ,  @Param('categoryId') categoryId:number , @Param('accountId') accountId:number , @Param('transactionId') transactionId:number ){
    return this.transactionService.updateTransaction(
      req.user.userId,
      body,
    categoryId,
    accountId,
    transactionId
    )
  }

  @UseGuards(jwtGuard)
  @Delete('delete/:accountId/:categoryId/:transactionId')
  deleteTransaction(@Req() req:AuthRequset , @Param('categoryId') categoryId: number , @Param('accountId') accountId:number , @Param('transactionId') transactionId:number){
    return this.transactionService.deleteTransaction(
      req.user.userId,
      categoryId,
      accountId,
      transactionId
    )
  }
}
