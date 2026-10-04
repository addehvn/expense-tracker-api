import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { jwtGuard } from '../guards/jwt-guard';
import type { AuthRequset } from '../Interfaces/Req.payload';
import { CreateCategoryDto } from '../DTOs/createCategoiryDto';
import { updateCategoryDto } from '../DTOs/updateCategoryDto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService:CategoriesService
  ){}

  @UseGuards(jwtGuard)
  @Post('/:accountId')
  createCategory(@Req() req:AuthRequset,@Param('accountId') param:number, @Body() body:CreateCategoryDto){
    return this.categoriesService.createCategory(
      param,
      req.user.userId,
      {...body},
    )
  }

  @UseGuards(jwtGuard)
  @Get('all/:accountId')
  getAllCategories(@Req() req:AuthRequset , @Param('accountId') param:number){
    return this.categoriesService.getAllCategories(req.user.userId,param)
  }


  @UseGuards(jwtGuard)
  @Get('detail/:accountId/:categoryId')
  categoryDetail(@Req() req:AuthRequset , @Param('accountId') accountId:number, @Param('categoryId') categoryId:number){
    return this.categoriesService.getCategoryDetail(req.user.userId,accountId, categoryId)
  }

  @UseGuards(jwtGuard)
  @Patch('update/:accountId/:categoryId')
  updateCategoryDetail(@Req() req:AuthRequset,@Param('accountId') accountId:number, @Param('categoryId') categoryId:number , @Body() body:updateCategoryDto){
    return this.categoriesService.updateCategory(
      req.user.userId,
      accountId,
      categoryId,
      {...body}
    )
  }

  @UseGuards(jwtGuard)
  @Delete('delete/:accountId/:categoryId')
  deletecategory(@Req() req:AuthRequset , @Param('accountId') accountId:number, @Param('categoryId') categoryId:number){
    return this.categoriesService.deleteCategory(
        req.user.userId,
        accountId,
        categoryId)
  }

}
