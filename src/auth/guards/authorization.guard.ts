import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTHZ_KEY } from '../decorators/authorize.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const required = this.reflector.getAllAndOverride<string[]>(AUTHZ_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!required || required.length === 0) return true;

        const { user } = context.switchToHttp().getRequest();

        if (!required.includes(user.role)) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}