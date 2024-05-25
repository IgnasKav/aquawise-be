import { ForbiddenException } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entities/user.entity';

type EntityWithCompany = {
    companyId: string;
};

const checkPermission = (
    entity: EntityWithCompany,
    user: UserEntity | UserDto,
) => {
    if (user.role === 'support') {
        return;
    }

    if (entity.companyId !== user.company.id) {
        throw new ForbiddenException(
            'You do not have permission to access this resource',
        );
    }
};

export default checkPermission;
