import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async createUser(dto: CreateUserDto) {
    // Convert birthday string to DateTime
    const birthday = new Date(dto.birthday);
    // Generate password hash
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hash,
          phone: dto.phone,
          birthday: birthday, // Assign the converted DateTime
          gender: dto.gender,
          role: "user", // Assuming default role is 'user'
        },
      });

      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Email already in use");
        }
      }
      throw error;
    }
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    delete user.password;
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (dto.password) {
      dto.password = await argon.hash(dto.password);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...dto,
      },
    });

    delete updatedUser.password;
    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: "User deleted successfully" };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async getUsersByPagination(
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
            { name: { contains: keyword } },
            { email: { contains: keyword } },
          ],
        };
      }

      // Retrieve users from Prisma
      const users = await this.prisma.user.findMany(queryOptions);

      // Return the paginated list of users
      return users;
    } catch (error) {
      // Handle Prisma errors
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          // No users found
          throw new NotFoundException("No users found");
        } else {
          // Other Prisma errors
          throw new ForbiddenException("Forbidden");
        }
      } else {
        // Other errors
        throw error;
      }
    }
  }

  // Method to search users by name
  async searchUsersByName(userName: string) {
    return this.prisma.user.findMany({
      where: {
        name: {
          contains: userName,
        },
      },
    });
  }

  async uploadAvatar(userId: number, avatarUrl: string): Promise<object> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Update user's avatar field with Cloudinary URL
    await this.prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });

    // Return only userId and avatarUrl in the response
    return { userId: user.id, avatarUrl };
  }
}
