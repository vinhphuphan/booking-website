import { Controller, Get, Post, Put, Delete, Param, Body, Res, NotFoundException, ValidationPipe, UseGuards, ParseIntPipe, Req, UnauthorizedException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto, UpdateLocationDto } from './dto';
import { Response } from 'express';
import { responseData } from 'src/config/response.config';
import { JwtGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Location")
@UseGuards(JwtGuard)
@Controller('locations')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Get('pagination')
  async locationPagination(
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      // Extract query parameters
      const { page, limit, keyword } = req.query;

      // Convert page and limit to numbers
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      const locations = await this.locationService.getLocationsByPagination(
        pageNumber,
        limitNumber,
        keyword
      );

      return responseData(
        res,
        'Locations retrieved by pagination successfully',
        200,
        {
          page: pageNumber,
          limit: limitNumber,
          keyword: keyword,
          locations: locations,
        },
      );
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error occurred:', error);
      return responseData(res, 'Internal Server Error', 500, null);
    }
  }

  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseIntPipe) locationId: number,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    // Check if the location exists 
    const location = await this.locationService.getLocationById(locationId);
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    // Upload file to Cloudinary and extract secure URL
    const uploadResponse = await this.cloudinaryService.uploadFile(file);
    const imageUrl = uploadResponse.secure_url;

    // Update location's image in the database
    const data = await this.locationService.uploadLocationImage(locationId, imageUrl);

    // Return the updated location with the response
    return responseData(res, 'Upload location image successfully', 200, data);
  }

  @Post()
  async createLocation(@Body(ValidationPipe) dto: CreateLocationDto, @Res() res: Response) {
    try {
      const newLocation = await this.locationService.createLocation(dto);
      return responseData(res, 'Location created successfully', 201, newLocation);
    } catch (error) {
      console.error('Error occurred:', error);
      return responseData(res, 'Internal Server Error', 500, null);
    }
  }

  @Get(':id')
  async getLocationById(@Param('id') id: number, @Res() res: Response) {
    try {
      const location = await this.locationService.getLocationById(id);
      return responseData(res, 'Location retrieved successfully', 200, location);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return responseData(res, 'Location not found', 404, null);
      }
      console.error('Error occurred:', error);
      return responseData(res, 'Internal Server Error', 500, null);
    }
  }

  @Put(':id')
  async updateLocation(@Param('id' ,ParseIntPipe) id: number, @Body(ValidationPipe) dto: UpdateLocationDto, @Res() res: Response) {
    try {
      const updatedLocation = await this.locationService.updateLocation(id, dto);
      return responseData(res, 'Location updated successfully', 200, updatedLocation);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return responseData(res, 'Location not found', 404, null);
      }
      console.error('Error occurred:', error);
      return responseData(res, 'Internal Server Error', 500, null);
    }
  }

  @Delete(':id')
  async deleteLocation(@Param('id' ,ParseIntPipe) id: number, @Res() res: Response) {
    try {
      await this.locationService.deleteLocation(id);
      return responseData(res, 'Location deleted successfully', 200, null);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return responseData(res, 'Location not found', 404, null);
      }
      console.error('Error occurred:', error);
      return responseData(res, 'Internal Server Error', 500, null);
    }
  }

  @Get()
  async getAllLocations(@Res() res: Response) {
    try {
      const locations = await this.locationService.getAllLocations();
      return responseData(res, 'Locations retrieved successfully', 200, locations);
    } catch (error) {
      console.error('Error occurred:', error);
      return responseData(res, 'Internal Server Error', 500, null);
    }
  }
}
