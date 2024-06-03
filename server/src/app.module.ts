import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserService } from './user/user.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { HotelListingModule } from './listing/listing.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    CommentModule,
    ReservationModule,
    CloudinaryModule,
    HotelListingModule,
    LocationModule
  ],
  providers: [PrismaService, CloudinaryService, UserService],
})
export class AppModule { }
