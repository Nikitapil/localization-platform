import { SetMetadata } from '@nestjs/common';

export const IS_AUTH_REQUIRED_KEY = `is_auth_required` as const;
export const AuthRequired = () => SetMetadata(IS_AUTH_REQUIRED_KEY, true);
