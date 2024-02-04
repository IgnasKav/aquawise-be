import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UploadedFile,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/decorators/jwt.decorator';
import { CompaniesService } from './companies.service';
import { CompanyCreateDto } from './dto/companyCreate.dto';
import { CompanyUpdateDto } from './dto/companyUpdate.dto';
import { ClientsService } from '../clients/clients.service';
import { OrdersService } from '../orders/orders.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('')
export class CompaniesController {
    constructor(
        private readonly companiesService: CompaniesService,
        private readonly clientsService: ClientsService,
        private readonly ordersService: OrdersService,
    ) {}

    @Role('support')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    getAll() {
        return this.companiesService.getAllCompanies();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/orders')
    getCompanyOrders(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.getCompanyOrders(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/clients')
    getCompanyClients(@Param('id', ParseUUIDPipe) id: string) {
        return this.clientsService.getClients(id);
    }

    @Role('support')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post('confirm/:applicationId')
    confirmApplication(
        @Param('applicationId', ParseUUIDPipe) registrationId: string,
    ) {
        return this.companiesService.confirmApplication(registrationId);
    }

    @Post('application')
    applyForCompanyAccount(@Body() request: CompanyCreateDto) {
        return this.companiesService.applyForCompanyAccount(request);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateCompany(
        @Param('id', ParseUUIDPipe) id: string,
        @UploadedFile() image: Express.Multer.File | undefined,
        @Body() body: { brandColor: string },
    ) {
        const request: CompanyUpdateDto = {
            brandColor: body.brandColor,
        };
        return this.companiesService.updateCompany(id, request);
    }
}
