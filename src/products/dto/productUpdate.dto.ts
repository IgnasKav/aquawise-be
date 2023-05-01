import { PartialType } from '@nestjs/mapped-types';
import { ProductCreateDto } from './productCreate.dto';

export class ProductUpdateDto extends PartialType(ProductCreateDto) {}
