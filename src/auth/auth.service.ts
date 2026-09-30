import { Body, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserSignupDto } from '../DTOs/userSignupDto';
import * as bcrypt from 'bcrypt'
import { UserLoginDto } from '../DTOs/userLoginDto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService:UserService,
    private jwtService:JwtService
  ){}

  async signup( body:UserSignupDto){
    const checkEmail=await this.userService.findByEmail(body.email)
    if(checkEmail){
      throw new ConflictException('Email already Exisits')
    }
    const hashPassword= await bcrypt.hash(body.password,10)

    const user= await  this.userService.createUser({
      ...body,
      password:hashPassword
    })
    
    return {
      message:'user created successfully',
      user:user
    }

  }

  async login(body:UserLoginDto){
    const user=await this.userService.findByEmail(body.email)

    if(!user){
      throw new UnauthorizedException('email or password is wrong')
    }

    const hashedPassword= await bcrypt.compare(body.password,user.password)
    
    if(!hashedPassword){
      throw new UnauthorizedException('email or password is wrong')
    }
    
    const payload={
      userId:user.Id,
      email:body.email
    }

    const access_token= this.jwtService.sign(payload)

    return{
      message:'user loged in successfully',
      access_token
    }
  }
}
