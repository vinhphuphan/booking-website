// hotel-listing.module.ts
import { Module } from '@nestjs/common';
import { HotelListingController } from './listing.controller';
import { HotelListingService } from './listing.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [PrismaModule],
  controllers: [HotelListingController],
  providers: [HotelListingService, CloudinaryService],
})
export class HotelListingModule {}
