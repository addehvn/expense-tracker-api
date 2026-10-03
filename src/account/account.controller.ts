import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { jwtGuard } from '../guards/jwt-guard';
import type{ AuthRequset } from '../Interfaces/Req.payload';
import { CreateAccountDto } from '../DTOs/createAccountDto';

@Controller('account')
export class AccountController {
  constructor(
    private accountService:AccountService,
  ){}

  @UseGuards(jwtGuard)
  @Post('create')
  createAccount(@Req() req:AuthRequset, @Body() body:CreateAccountDto){
    return this.accountService.createAccount(
      req.user.userId,
      {...body}
    )
  }


  @UseGuards(jwtGuard)
  @Get('all')
  allAccounts(@Req() req:AuthRequset){
    return this.accountService.allAccounts(req.user.userId)
  }

  @UseGuards(jwtGuard)
  @Get('/:accountId')
  accountDetail(@Req() req:AuthRequset, @Param('accountId') param:number){
      return this.accountService.accountDetail(
        req.user.userId,
        param
      )
  }

  @UseGuards(jwtGuard)
  @Delete('/:accountId')
  deleteAccount(@Req() req:AuthRequset , @Param('accountId') param:number){
    return this.accountService.deleteAccount(req.user.userId,param)
  }
}
