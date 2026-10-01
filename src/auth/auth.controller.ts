import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserSignupDto } from '../DTOs/userSignupDto';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../DTOs/userLoginDto';
import type { AuthRequset } from '../Interfaces/Req.payload';
import { jwtGuard } from '../guards/jwt-guard';
import { refreshTokenDto } from '../DTOs/refreshTokenDto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService:AuthService
  ){}
  @Post('signup')
  async signupUser(@Body()body:UserSignupDto){
    return this.authService.signup(body) 
  }

  @Post('login')
  async loginUser( @Body() body:UserLoginDto){
    return  this.authService.login(body)

  }
  @Post('refToken')
  refToken(@Body() user:refreshTokenDto){
    return this.authService.refToken(
      user.refreshToken
    )
  }
  @UseGuards(jwtGuard)
  @Post('logOut')
  logout(@Req() req:AuthRequset){
    return this.authService.logout(req.user.userId) 
  }
}
