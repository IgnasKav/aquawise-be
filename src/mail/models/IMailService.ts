import { CompanyEntity } from 'src/companies/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export interface IMailService {
    senUserInvitation(user: UserEntity): Promise<void>;
    sendApplicationConfirmation(
        company: CompanyEntity,
        user: UserEntity,
    ): Promise<void>;
}
