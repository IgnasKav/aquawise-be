import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../user/entities/user.entity';

export class InvitationRequestDto {
    @IsEmail()
    email: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsString()
    companyId;
}
