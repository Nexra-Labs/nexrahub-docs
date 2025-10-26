import { Module } from '@nestjs/common';
import { JwtService } from './providers/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRATION')
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    JwtService
  ],
  exports: [
    JwtService
  ]
})
export class SecurityModule { }
