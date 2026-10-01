import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import type  { AuthRequset } from '../Interfaces/Req.payload';
import { jwtGuard } from '../guards/jwt-guard';

@Controller('user')
export class UserController {
  constructor(
    private userService:UserService,
  ){}

  @UseGuards(jwtGuard)
  @Get('profile')
  userProfile(@Req() req:AuthRequset){
    console.log(req.user)
    return this.userService.userProfile(
     req.user.userId
    )
  }
}
