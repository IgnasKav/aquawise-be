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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CompanyCreateDto } from './dto/companyCreate.dto';
import { CompanyUpdateDto } from './dto/companyUpdate.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.companiesService.getAllCompanies();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getById(@Param('id', ParseUUIDPipe) id: string) {
        return this.companiesService.getCompanyById(id);
    }

    @Post()
    createCompany(@Body() request: CompanyCreateDto) {
        return this.companiesService.createCompany(request);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateCompany(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() request: CompanyUpdateDto,
    ) {
        return this.companiesService.updateCompany(id, request);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteCompany(@Param('id', ParseUUIDPipe) id: string) {
        return this.companiesService.deleteCompany(id);
    }
}
