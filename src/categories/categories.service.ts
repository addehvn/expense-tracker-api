import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../Entities/category-entity';
import { Repository } from 'typeorm';
 import { CreateCategoryDto } from '../DTOs/createCategoiryDto';
import { Accounts } from '../Entities/account-Entity';
import { updateCategoryDto } from '../DTOs/updateCategoryDto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepositry:Repository<Category>,

    @InjectRepository(Accounts)
    private readonly accountRepositry:Repository<Accounts>
  ){}

  async createCategory(accountId:number,userId:number,body:CreateCategoryDto){
    const account= await this.accountRepositry.findOne({
      where:{
      accountId,
      user: {userId}
    }
    })
    
    if(!account){
      throw new NotFoundException("account not found")
    }
    const category = await this.categoryRepositry.create({
      account,
      ...body,     
    })

    await this.categoryRepositry.save(category)

    return {
      message: 'category created successfuly',
      body 
    }
  }

  async getAllCategories(userId:number, accountId:number){
    const account= await this.accountRepositry.findOne({
      where:{
        user:{userId},
        accountId
      }
    })
    
    if(!account){
      throw new NotFoundException('account not update')
    }
    return await this.categoryRepositry.find({
      where:{
        account
      }
    })
  }

  async getCategoryDetail(userId:number,accountId:number,categoryId:number){
    const account =await this.accountRepositry.findOne({
      where:{
        user:{userId},
        accountId
      }
    })
    if(!account){
      throw new NotFoundException('account not update')
    }
    return await this.categoryRepositry.findOne({
      where:{
        account:{accountId},
       categoryId,
      }
    })
  }

  async updateCategory(userId:number,accountId:number,categoryId:number,body:updateCategoryDto){
    const account= await this.accountRepositry.findOne({
      where:{
        user:{userId},
        accountId
      }
    })

    if(!account){
      throw new NotFoundException('accoun not found')
    }

    const category= await this.categoryRepositry.findOne({
      where:{
        categoryId,
        account:{accountId}
      }
    })

    await this.categoryRepositry.update(
      {categoryId},
        body
      
    )

    return {
      message:"category updated successfully",
      body
    }
  }

  async deleteCategory(userId:number,accountId:number,categoryId:number){
    const account= await this.accountRepositry.findOne({
      where:{
        user:{userId},
        accountId
      }
    })

    if(!account){
      throw new NotFoundException('account not found')
    }
    const category = await this.categoryRepositry.delete({
      account:{accountId},
      categoryId
    })

    return {
      message:"category deleted successfully"
    }


  }
}
