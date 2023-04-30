import { IsEmail, IsString } from 'class-validator';

export class RegisterRequestDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
