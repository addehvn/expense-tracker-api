import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entities/user-entity';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../strategy/JWT-strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy ]
})
export class UserModule {}
