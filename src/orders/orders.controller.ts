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
import { OrdersService } from './orders.service';
import { CreateOrderRequestDto } from './dto/CreateOrderRequest.dto';
import { UpdateOrderRequestDto } from './dto/UpdateOrderRequest.dto';

@Controller('')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    getAll() {
        return this.ordersService.getAllOrders();
    }

    @Get(':id')
    getById(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.getOrderById(id);
    }

    @Post()
    createOrder(
        @Param('companyId') companyId: string,
        @Body() request: CreateOrderRequestDto,
    ) {
        console.log(companyId);
        return this.ordersService.createOrder(companyId, request);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateOrder(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() request: UpdateOrderRequestDto,
    ) {
        return this.ordersService.updateOrder(id, request);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.deleteOrder(id);
    }
}
