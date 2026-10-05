import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entities/user-entity';
import { Transaction } from '../Entities/transaction-entity';
import { Category } from '../Entities/category-entity';
import { Accounts } from '../Entities/account-Entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User , Transaction , Category, Accounts]),

  ],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
