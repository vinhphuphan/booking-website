import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto';
import { UpdateListingDto } from './dto';
import { listing, user } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class HotelListingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async createListing(dto: CreateListingDto, userId: number): Promise<listing> {
    return this.prisma.listing.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async updateListing(id: number, dto: UpdateListingDto, user: user): Promise<listing> {
    const existingListing = await this.prisma.listing.findUnique({ where: { id } });

    if (!existingListing) {
      throw new NotFoundException('Listing not found');
    }

    if (existingListing.userId !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to update this listing');
    }

    return this.prisma.listing.update({
      where: { id },
      data: { ...dto },
    });
  }

  async getAllListings() {
    return this.prisma.listing.findMany();
  }

  async getListingById(id: number) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) {
      throw new NotFoundException('Hotel listing not found');
    }
    return listing;
  }

  async deleteListing(id: number, user: user): Promise<{ deletedListing : object }> {
    const existingListing = await this.prisma.listing.findUnique({ where: { id } });

    if (!existingListing) {
      throw new NotFoundException('Listing not found');
    }

    if (existingListing.userId !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to delete this listing');
    }

    await this.prisma.listing.delete({
      where: { id },
    });

    return { deletedListing : existingListing };
  }

  async getListingsByPagination(page: number, limit: number, keyword: string): Promise<any> {
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
            { roomName: { contains: keyword } },
            { description: { contains: keyword } },
          ],
        };
      }

      // Retrieve listings from Prisma
      const listings = await this.prisma.listing.findMany(queryOptions);

      // Return the paginated list of listings
      return listings;
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

  async getListingsByLocation(locationId: number): Promise<any> {
    try {
      const listings = await this.prisma.listing.findMany({
        where: { locationId },
      });

      if (!listings.length) {
        throw new NotFoundException('No listings found for the given location');
      }

      return listings;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Forbidden');
      } else {
        throw error;
      }
    }
  }

  async uploadListingImage(listingId: number, imageUrl: string): Promise<object> {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    // Update listing's image field with Cloudinary URL
    await this.prisma.listing.update({
      where: { id: listingId },
      data: { image: imageUrl },
    });

    // Return only listingId and imageUrl in the response
    return { listingId: listing.id, imageUrl };
  }
}
