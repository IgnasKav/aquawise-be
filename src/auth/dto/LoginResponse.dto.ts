import { UserDto } from '../../user/dto/user.dto';

export class LoginResponseDto {
    user: UserDto;
    jwt: string;
}
