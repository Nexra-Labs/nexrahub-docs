import { SetMetadata } from '@nestjs/common';

export const AUTHZ_KEY = 'authz';
export const Authorize = (...requirements: string[]) => SetMetadata(AUTHZ_KEY, requirements);