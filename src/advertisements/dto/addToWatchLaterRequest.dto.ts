import { IsUUID } from 'class-validator';

export class AddToWatchLaterRequestDto {
    @IsUUID()
    userId: string;

    @IsUUID()
    advertisementId: string;
}
