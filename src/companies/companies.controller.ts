import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/decorators/jwt.decorator';
import { CompaniesService } from './companies.service';
import { CompanyCreateRequest } from './models/CompanyCreateRequest';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    // everyone
    @Post('application')
    applyForCompanyAccount(@Body() request: CompanyCreateRequest) {
        return this.companiesService.applyForCompanyAccount(request);
    }

    // support
    @Get()
    @Role('support')
    @UseGuards(JwtAuthGuard, RoleGuard)
    getAll() {
        return this.companiesService.getAllCompanies();
    }

    @Post('confirm/:registrationId')
    @Role('support')
    @UseGuards(JwtAuthGuard, RoleGuard)
    confirmApplication(
        @Param('registrationId', ParseUUIDPipe) registrationId: string,
    ) {
        return this.companiesService.confirmApplication(registrationId);
    }
}
