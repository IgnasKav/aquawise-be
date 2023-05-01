import { PartialType } from '@nestjs/mapped-types';
import { CompanyCreateDto } from './companyCreate.dto';

export class CompanyUpdateDto extends PartialType(CompanyCreateDto) {}
