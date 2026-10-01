import { Injectable } from '@nestjs/common';
import { User } from '../Entities/user-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignupDto } from '../DTOs/userSignupDto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
    private readonly userRepositry:Repository<User>){}
    
    findByEmail(email:string){
      return this.userRepositry.findOne({
        where:{email}
      })
    }

    createUser(body:UserSignupDto){
    const user= this.userRepositry.create({
        ...body
      })
      
      return this.userRepositry.save(user)
    }

    userProfile(userId:number ){
      return this.userRepositry.findOne({
        
        where:{userId:userId}
        
      })
    }
}
