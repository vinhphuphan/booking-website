import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Res,
  Req,
  HttpStatus,
  NotFoundException,
  UseGuards,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { HotelListingService } from "./listing.service";
import { CreateListingDto } from "./dto";
import { UpdateListingDto } from "./dto";
import { Response } from "express";
import { responseData } from "src/config/response.config";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { GetUser } from "src/auth/decorator";
import { user } from "@prisma/client";
import { JwtGuard } from "src/auth/guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Listing")
@Controller("listings")
export class HotelListingController {
  constructor(
    private readonly hotelListingService: HotelListingService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // Endpoint for pagination search
  @Get("pagination")
  async listingPagination(@Req() req, @Res() res: Response) {
    try {
      // Extract query parameters
      const { page, limit, keyword } = req.query;

      // Convert page and limit to numbers
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      const listings = await this.hotelListingService.getListingsByPagination(
        pageNumber,
        limitNumber,
        keyword
      );

      // Respond with the fetched data
      return responseData(
        res,
        "Listings retrieved by pagination successfully",
        200,
        {
          page: pageNumber,
          limit: limitNumber,
          keyword: keyword,
          listings: listings,
        }
      );
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error occurred:", error);
      return responseData(res, "Internal Server Error", 500, null);
    }
  }
  
  @UseGuards(JwtGuard)
  @Post(":id/upload-image")
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param("id", ParseIntPipe) listingId: number,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: any, // Assuming user object is of any type
    @Res() res: Response,
    @Req() req: Request,
  ) {
    // Check if userId is present
    if (!user.id) {
      throw new UnauthorizedException('User ID not provided in request header');
    }

    // Check if the listing exists and belongs to the user or the user is admin
    const listing = await this.hotelListingService.getListingById(listingId);
    if (listing.userId !== user.id && user.role !== "admin") {
      throw new UnauthorizedException('You do not have permission to upload an image for this listing');
    }

    // Upload file to Cloudinary and extract secure URL
    const uploadResponse = await this.cloudinaryService.uploadFile(file);
    const imageUrl = uploadResponse.secure_url;

    // Update listing's image in the database
    const data = await this.hotelListingService.uploadListingImage(listingId, imageUrl);

    // Return the updated listing with the response
    return responseData(res, 'Upload listing image successfully', 200, data);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createListing(
    @Body() dto: CreateListingDto,
    @GetUser() user: user,
    @Res() res: Response
  ) {
    const listing = await this.hotelListingService.createListing(dto, user.id);
    return responseData(res, "Listing created successfully", 201, listing);
  }

  @Get()
  async getAllListings(@Res() res: Response) {
    const listings = await this.hotelListingService.getAllListings();
    return responseData(
      res,
      "Listings retrieved successfully",
      HttpStatus.OK,
      listings
    );
  }

  @Get(":id")
  async getListingById(
    @Param("id", ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    try {
      const listing = await this.hotelListingService.getListingById(id);
      return responseData(
        res,
        "Listing retrieved successfully",
        HttpStatus.OK,
        listing
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return responseData(
          res,
          "Listing not found",
          HttpStatus.NOT_FOUND,
          null
        );
      }
      throw error;
    }
  }

  @Get("by-location/:locationId")
  async getListingsByLocation(
    @Param("locationId", ParseIntPipe) locationId: number,
    @Res() res: Response
  ) {
    try {
      const listings = await this.hotelListingService.getListingsByLocation(locationId);
      return responseData(res, "Listings retrieved successfully", 200, listings);
    } catch (error) {
      console.error("Error occurred:", error);
      return responseData(res, "Internal Server Error", 500, null);
    }
  }

  @UseGuards(JwtGuard)
  @Put(":id")
  async updateListing(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateListingDto,
    @GetUser() user: user,
    @Res() res: Response
  ) {
    const updatedListing = await this.hotelListingService.updateListing(
      id,
      dto,
      user
    );
    return responseData(
      res,
      "Listing updated successfully",
      200,
      updatedListing
    );
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  async deleteListing(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: user,
    @Res() res: Response
  ) {
    const result = await this.hotelListingService.deleteListing(id, user);
    return responseData(res, "Listing deleted successfully", 200, result);
  }
}
