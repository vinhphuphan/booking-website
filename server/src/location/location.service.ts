import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async createLocation(dto: CreateLocationDto): Promise<any> {
    try {
      return await this.prisma.location.create({ data: dto });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new NotFoundException('Location already exists');
      }
      throw error;
    }
  }

  async getLocationById(id: number): Promise<any> {
    const location = await this.prisma.location.findUnique({ where: { id } });
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async updateLocation(id: number, dto: UpdateLocationDto): Promise<any> {
    try {
      const location = await this.getLocationById(id);
      return await this.prisma.location.update({ where: { id }, data: dto });
    } catch (error) {
      throw error;
    }
  }

  async deleteLocation(id: number): Promise<void> {
    try {
      await this.prisma.location.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async getAllLocations(): Promise<any[]> {
    return await this.prisma.location.findMany();
  }

  async getLocationsByPagination(
    page: number,
    limit: number,
    keyword: string
  ): Promise<any> {
    try {
      const offset = (page - 1) * limit;

      // Define Prisma query options
      const queryOptions: any = {
        skip: offset,
        take: limit,
      };

      // Add keyword filtering if provided
      if (keyword !== undefined && keyword !== null) {
        queryOptions.where = {
          OR: [
            { locationName: { contains: keyword } },
            { city : { contains: keyword } },
            { country : { contains: keyword } }
          ],
        };
      }

      // Retrieve locations from Prisma
      const locations = await this.prisma.location.findMany(queryOptions);

      // Return the paginated list of locations
      return locations;
    } catch (error) {
      // Handle Prisma errors
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // No listings found
          throw new NotFoundException('No listings found');
        } else {
          // Other Prisma errors
          throw new ForbiddenException('Forbidden');
        }
      } else {
        // Other errors
        throw error;
      }
    }
  }

  async uploadLocationImage(locationId: number, imageUrl: string): Promise<object> {
    const location = await this.prisma.location.findUnique({
      where: { id: locationId },
    });
    if (!location) {
      throw new NotFoundException('Location not found');
    }

    // Update location's image field with Cloudinary URL
    await this.prisma.location.update({
      where: { id: locationId },
      data: { image: imageUrl },
    });

    // Return only locationId and imageUrl in the response
    return { locationId: location.id, imageUrl };
  }
}
