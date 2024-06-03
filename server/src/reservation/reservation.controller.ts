import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    UseGuards,
    Res,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { user } from '@prisma/client';
import { responseData } from 'src/config/response.config';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Reservation")
@UseGuards(JwtGuard)
@Controller('reservations')
export class ReservationController {
    constructor(private reservationService: ReservationService) { }

    @Post()
    async createReservation(
        @Body() dto: CreateReservationDto,
        @GetUser() user: user,
        @Res() res: Response
    ) {
        const userId = user.id;
        const reservation = await this.reservationService.createReservation(dto, userId);
        return responseData(res, 'Reservation created successfully', 201, reservation);
    }

    @Get(':id')
    async getReservationById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const reservation = await this.reservationService.getReservationById(id);
        return responseData(res, 'Reservation fetched successfully', 200, reservation);
    }

    @Put(':id')
    async updateReservation(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateReservationDto,
        @GetUser() user: user,
        @Res() res: Response
    ) {
        const reservation = await this.reservationService.updateReservation(id, dto, user);
        return responseData(res, 'Reservation updated successfully', 200, reservation);
    }

    @Delete(':id')
    async deleteReservation(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: user,
        @Res() res: Response
    ) {
        await this.reservationService.deleteReservation(id, user);
        return responseData(res, 'Reservation deleted successfully', 200, null);
    }

    @Get()
    async getAllReservations(@Res() res: Response) {
        const reservations = await this.reservationService.getAllReservations();
        return responseData(res, 'All reservations fetched successfully', 200, reservations);
    }

    @Get('by-listing-id/:listingId')
    async getReservationsByListingId(
        @Param('listingId', ParseIntPipe) listingId: number,
        @Res() res: Response
    ) {
        const reservations = await this.reservationService.getReservationsByListingId(listingId);
        return responseData(res, 'Reservations for listing fetched successfully', 200, reservations);
    }

    @Get('by-user-id/:userId')
    getReservationsByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return this.reservationService.getReservationsByUserId(userId);
    }
}
