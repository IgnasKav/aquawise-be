import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { SearchRequestDto } from './dto/searchRequest.dto';
import { AddToWatchLaterRequestDto } from './dto/addToWatchLaterRequest.dto';
import { AdvertisementCreateRequestDto } from './dto/advertisementCreateRequest.dto';
import { AdvertisementUpdateRequestDto } from './dto/advertisementUpdateRequest.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('advertisements')
export class AdvertisementsController {
    constructor(
        private readonly advertisementsService: AdvertisementsService,
    ) {}

    // for testing
    @Get()
    getAll() {
        return this.advertisementsService.getAll();
    }

    @Post('search')
    searchAdvertisements(@Body() request: SearchRequestDto) {
        return this.advertisementsService.searchAdvertisements(request);
    }

    @Get(':id')
    getAdvertisementById(@Param('id', ParseUUIDPipe) id: string) {
        return this.advertisementsService.getAdvertisementById(id);
    }

    @Post()
    createAdvertisement(@Body() request: AdvertisementCreateRequestDto) {
        return this.advertisementsService.createAdvertisement(request);
    }

    @Put(':id')
    updateAdvertisement(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() request: AdvertisementUpdateRequestDto,
    ) {
        return this.advertisementsService.updateAdvertisement(id, request);
    }

    @Delete(':id')
    deleteAdvertisement(@Param('id', ParseUUIDPipe) id: string) {
        return this.advertisementsService.deleteAdvertisement(id);
    }

    @Put(':id/watchLater')
    addToWatchLater(@Param('id', ParseUUIDPipe) id: string) {
        return this.advertisementsService.addToWatchLater(id);
    }

    @Post('watchLater')
    searchWatchLater(@Body() request: AddToWatchLaterRequestDto) {
        return this.advertisementsService.searchWatchLater(request);
    }

    @Post('updateImage')
    updateImage(@Body() body) {
        return this.advertisementsService.updateImage(body);
    }
}
