import { IsEmail, IsEnum, IsIn, IsString } from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

export class InvitationRequestDto {
    @IsEmail()
    email: string;

    @IsString()
    role: UserRole;

    @IsString()
    companyId;
}
