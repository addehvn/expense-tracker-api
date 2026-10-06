import { Body, Controller, Delete, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import type  { AuthRequset } from '../Interfaces/Req.payload';
import { jwtGuard } from '../guards/jwt-guard';
import { userupdateDto } from '../DTOs/userUpdateDto';

@Controller('user')
export class UserController {
  constructor(
    private userService:UserService,
  ){}

  @UseGuards(jwtGuard)
  @Get('profile')
  userProfile(@Req() req:AuthRequset){
    return this.userService.userProfile(
     req.user.userId
    )
  }

  @UseGuards(jwtGuard)
  @Patch('update')
   updateUser(@Req() req:AuthRequset, @Body() body : userupdateDto){
    return  this.userService.updateUser(
      req.user.userId,
      body
    ) 
  }

  @UseGuards(jwtGuard)
  @Delete('delete')
  deleteUser(@Req() req:AuthRequset){
    return this.userService.deleteUser(
      req.user.userId
    )
  }
  }
