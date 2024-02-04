import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { UserRole } from '../../user/entities/user.entity';

export class UserRegistrationRequestDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    password: string;

    @IsUUID()
    registrationId: string;
}
