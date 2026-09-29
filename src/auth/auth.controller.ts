import { Body, Controller, Post } from '@nestjs/common';
import { UserSignupDto } from '../DTOs/userSignupDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService:AuthService
  ){}
  @Post('signup')
  async signupUser(@Body()body:UserSignupDto){
    return this.authService.signup(body) 
  }
}
