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
import { CreateOrderRequestDto } from './dto/CreateOrderRequest.dto';
import { UpdateOrderRequestDto } from './dto/UpdateOrderRequest.dto';

@Controller('')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    getAll(@Param('clientId') clientId: string) {
        return this.ordersService.getAllOrders(clientId);
    }

    @Get(':id')
    getById(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.getOrderById(id);
    }

    @Post()
    createOrder(
        @Param('companyId') companyId: string,
        @Param('clientId') clientId: string,
        @Body() request: CreateOrderRequestDto,
    ) {
        return this.ordersService.createOrder(companyId, clientId, request);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateOrder(
        @Param('clientId') clientId: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() request: UpdateOrderRequestDto,
    ) {
        return this.ordersService.updateOrder(clientId, id, request);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.deleteOrder(id);
    }
}
