import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entities/user-entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtGuard } from '../guards/jwt-guard';
import { JwtStrategy } from '../strategy/JWT-strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        secret:configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:'2m'
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,
    UserService,
    jwtGuard,
    JwtStrategy
  ],
  exports:[JwtStrategy]
})
export class AuthModule {}
