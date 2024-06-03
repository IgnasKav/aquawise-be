import { SetMetadata } from '@nestjs/common';

export function Role(roles?: string | string[]) {
    return SetMetadata('roles', roles);
}
