import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UserSignupDto } from '../DTOs/userSignupDto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(
    private userService:UserService
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
}
