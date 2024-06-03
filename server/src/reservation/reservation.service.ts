import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { user } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) { }

  async createReservation(dto: CreateReservationDto, userId: number) {
    return await this.prisma.reservation.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async getReservationById(id: number) {
    return await this.prisma.reservation.findUnique({
      where: { id },
    });
  }

  async updateReservation(id: number, dto: UpdateReservationDto, user: user) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new ForbiddenException('Reservation not found');
    }

    if (reservation.userId !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to update this reservation');
    }

    return await this.prisma.reservation.update({
      where: { id },
      data: dto,
    });
  }

  async deleteReservation(id: number, user: user) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new ForbiddenException('Reservation not found');
    }

    if (reservation.userId !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to delete this reservation');
    }

    return await this.prisma.reservation.delete({
      where: { id },
    });
  }

  async getAllReservations() {
    return await this.prisma.reservation.findMany();
  }

  async getReservationsByListingId(listingId: number) {
    return await this.prisma.reservation.findMany({
      where: { listingId },
    });
  }

  async getReservationsByUserId(userId: number) {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: { listing: true },
    });
  }
}
