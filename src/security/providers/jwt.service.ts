import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwtPayload.interface';

@Injectable()
export class JwtService {

    constructor(
        private readonly jwt: NestJwtService
    ) { }

    sign(payload: JwtPayload) {
        return this.jwt.sign(payload);
    }

    verify(token: string) {
        return this.jwt.verify(token);
    }

    decode(token: string) {
        return this.jwt.decode(token);
    }
}