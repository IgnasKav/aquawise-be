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
import { JwtAuthGuard } from '../auth/decorators/jwt.decorator';
import { OrdersService } from './orders.service';

@Controller('')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
}
