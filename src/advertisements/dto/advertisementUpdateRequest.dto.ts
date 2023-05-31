import { PartialType } from '@nestjs/mapped-types';
import { AdvertisementCreateRequestDto } from './advertisementCreateRequest.dto';

export class AdvertisementUpdateRequestDto extends PartialType(
    AdvertisementCreateRequestDto,
) {}
