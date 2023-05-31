import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../user/entities/user.entity';

export class RegistrationRequestDto {
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
}
