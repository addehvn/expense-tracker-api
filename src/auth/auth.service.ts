import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserSignupDto } from '../DTOs/userSignupDto';
import * as bcrypt from 'bcrypt'
import { UserLoginDto } from '../DTOs/userLoginDto';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entities/user-entity';
import { Repository } from 'typeorm';
import { refreshTokenDto } from '../DTOs/refreshTokenDto';
@Injectable()
export class AuthService {
  constructor(

    private userService:UserService,
    private jwtService:JwtService,
    @InjectRepository(User)
    private readonly userRepositry:Repository<User>
  ){
    
  }

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
      userId:user.userId,
      email:body.email
    }
    const refreshToken=await randomBytes(64).toString('hex')
     await this.userRepositry.update(
      {userId:user.userId},
      {refreshToken}
     )
    const access_token= this.jwtService.sign(payload)

    
    return{
      message:'user loged in successfully',
      access_token,
      refreshToken
    }
  }

  async refToken(refreshToken:string ){
    const user= await this.userRepositry.findOne({
      where:{refreshToken}
    })
    if (!user){
      throw new UnauthorizedException('refresh token is wrong or expired')
    }
    const access_token=await this.jwtService.sign({
      userId:user.userId,
      email:user.email
    },
    {
      expiresIn:'7d'
    }
  )

  const resfreshToken= randomBytes(64).toString('hex');
  await this.userRepositry.update(
    {userId:user.userId},
    {refreshToken:refreshToken}
  )

  return {
    message: 'refreshToken created successfully',
    access_token,
    refreshToken
  }
  }

  async logout(userId: number){
    await this.userRepositry.update(
      {userId:userId},
      {refreshToken:null}
    )
    return {
      message: 'loged out successfully'
    }
  }
}
