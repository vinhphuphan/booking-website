import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { user } from '@prisma/client';


@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    async createComment(dto: CreateCommentDto) {
        const comment = await this.prisma.comment.create({
            data: {
                ...dto,
                commentDate: dto.commentDate || new Date(),
            },
        });
        return comment;
    }

    async getCommentById(id: number) {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
        });
        if (!comment) throw new NotFoundException('Comment not found');
        return comment;
    }

    async updateComment(id: number, dto: UpdateCommentDto, user: user) {
        // Fetch the comment to get the creator's ID
        const comment = await this.prisma.comment.findUnique({
            where: { id },
        });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        // Check if the current user is the creator or has the role `admin`
        if (comment.userId !== user.id && user.role !== 'admin') {
            throw new ForbiddenException('You do not have permission to update this comment');
        }

        // Update the comment
        return this.prisma.comment.update({
            where: { id },
            data: dto,
        });
    }

    async deleteComment(id: number) {
        const comment = await this.prisma.comment.delete({
            where: { id },
        });
        if (!comment) throw new NotFoundException('Comment not found');
        return comment;
    }

    async getCommentsByListingId(listingId: number) {
        return await this.prisma.comment.findMany({
          where: { listingId },
        });
    }

    async getAllComments() {
        return this.prisma.comment.findMany();
    }
}
