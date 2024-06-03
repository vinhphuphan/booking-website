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
  Request,
  UnauthorizedException,
  HttpStatus,
  HttpException,
  Res,
  Query,
  Req,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { user } from "@prisma/client";
import { responseData } from "src/config/response.config";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(
    @Body() dto: CreateUserDto,
    @GetUser() user: any,
    @Res() res: Response
  ) {
    if (user.role !== "admin") {
      throw new UnauthorizedException(
        "You do not have permission to create the user. Only admin can create new user. You must sign up."
      );
    }

    const newUser = await this.userService.createUser(dto);
    delete newUser.password;
    return responseData(res, "User created successfully", 201, newUser);
  }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiParam({ name: 'id', type: Number, description: 'Listing ID' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: any, // Assuming user object is of any type
    @Res() res: Response,
    @Req() req: Request,
  ) {
    // Check if userId is present
    if (!user.id) {
      throw new UnauthorizedException('User ID not provided in request header');
    }

    // Upload file to Cloudinary and extract secure URL
    const uploadResponse = await this.cloudinaryService.uploadFile(file);
    const avatarUrl = uploadResponse.secure_url;

    // Update user's avatar in the database
    const data = await this.userService.uploadAvatar(user.id, avatarUrl);

    // Return the updated user with the response
    return responseData(res, 'Upload avatar image successfully', 200, data);
  }
  
  // Endpoint for pagination search
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Number of items per page' })
  @ApiQuery({ name: 'keyword', type: String, required: false, description: 'Keyword for search' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully.' })
  @Get("pagination")
  async userPagination(@Req() req, @Res() res: Response) {
    try {
      // Extract query parameters
      const { page, limit, keyword } = req.query;

      // Convert page and limit to numbers
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      const users = await this.userService.getUsersByPagination(
        pageNumber,
        limitNumber,
        keyword
      );

      // Respond with the fetched data
      return responseData(
        res,
        "Users retrieved by pagination successfully",
        200,
        {
          page: pageNumber,
          limit: limitNumber,
          keyword: keyword,
          users: users,
        }
      );
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error occurred:", error);
      return responseData(res, "Internal Server Error", 500, null);
    }
  }

  // Endpoint for searching users by name
  @Get("search-by-name")
  async searchUsersByName(
    @Query("userName") userName: string,
    @GetUser() user: any,
    @Res() res: Response
  ) {
    if (user.role !== "admin") {
      throw new UnauthorizedException(
        "You do not have permission to search users by name. Only admin user can."
      );
    }

    const users = await this.userService.searchUsersByName(userName);
    return responseData(
      res,
      "Users retrieved by name search successfully",
      200,
      users
    );
  }

  @Get(":id")
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserById(
    @Param("id", ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return responseData(res, "User retrieved successfully", 200, user);
  }

  @Put(":id")
  async updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @GetUser() user: user,
    @Res() res: Response
  ) {
    if (user.id !== id && user.role !== "admin") {
      throw new UnauthorizedException(
        "You do not have permission to update this user. Only admin user can."
      );
    }

    const updatedUser = await this.userService.updateUser(id, dto);
    delete updatedUser.password;
    return responseData(res, "User updated successfully", 200, updatedUser); // Use responseData to format the response
  }

  @Delete(":id")
  async deleteUser(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: any,
    @Res() res: Response
  ) {
    if (user.id !== id && user.role !== "admin") {
      throw new UnauthorizedException(
        "You do not have permission to delete this user. Only admin user can."
      );
    }

    await this.userService.deleteUser(id);
    return responseData(res, "User deleted successfully", 200, user); // Use responseData to format the response
  }

  @Get()
  async getAllUsers(@Res() res: Response) {
    const users = await this.userService.getAllUsers();
    return responseData(res, "Users retrieved successfully", 200, users);
  }
}
