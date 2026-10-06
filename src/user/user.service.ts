import { Injectable } from '@nestjs/common';
import { User } from '../Entities/user-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignupDto } from '../DTOs/userSignupDto';
import { userupdateDto } from '../DTOs/userUpdateDto';

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

  async updateUser(userId:number , body:userupdateDto){
    const updateUser = await this.userRepositry.update(
      userId,
      body 
    )
    return({
        message:'user Updated successfully',
        body
    }    
    )
  }

  async deleteUser(userId:number){
    await this.userRepositry.delete({
      userId
    })

    return {
      message:'user deleted Successfully'
    }
    
  }

  

}
