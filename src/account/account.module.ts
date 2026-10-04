import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entities/user-entity';
import { AuthModule } from '../auth/auth.module';
import { Accounts } from '../Entities/account-Entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Accounts]),
    AuthModule
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
