import { PartialType } from '@nestjs/mapped-types';
import { CreateProductRequestDto } from './CreateProductRequest.dto';

export class ProductUpdateDto extends PartialType(CreateProductRequestDto) {}
