import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../Entities/category-entity';
import { User } from '../Entities/user-entity';
import { Accounts } from '../Entities/account-Entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Category,Accounts,User]),
    AuthModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {

}
