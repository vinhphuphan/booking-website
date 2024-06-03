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
    Res,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { user } from '@prisma/client';
import { responseData } from 'src/config/response.config';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Comment")
@UseGuards(JwtGuard)
@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Post()
    @ApiBody({ type: CreateCommentDto })
    @ApiResponse({ status: 201, description: 'Comment created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async createComment(@Body() dto: CreateCommentDto, @GetUser() user: user, @Res() res: Response) {
        const userId = user.id;
        const comment = await this.commentService.createComment({ ...dto, userId });
        return responseData(res, 'Comment created successfully', 201, comment);
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'integer', description: 'Comment ID' })
    @ApiResponse({ status: 200, description: 'Comment fetched successfully.' })
    @ApiResponse({ status: 404, description: 'Comment not found.' })
    async getCommentById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const comment = await this.commentService.getCommentById(id);
        return responseData(res, 'Comment fetched successfully', 200, comment);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: 'integer', description: 'Comment ID' })
    @ApiBody({ type: UpdateCommentDto })
    @ApiResponse({ status: 200, description: 'Comment updated successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Comment not found.' })
    async updateComment(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCommentDto,
        @GetUser() user: user,
        @Res() res: Response,
    ) {
        const comment = await this.commentService.updateComment(id, dto, user);
        return responseData(res, 'Comment updated successfully', 200, comment);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: 'integer', description: 'Comment ID' })
    @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Comment not found.' })
    async deleteComment(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        await this.commentService.deleteComment(id);
        return responseData(res, 'Comment deleted successfully', 200, null);
    }

    @Get('by-listing-id/:id')
    @ApiParam({ name: 'id', type: 'integer', description: 'Listing ID' })
    @ApiResponse({ status: 200, description: 'Comments fetched successfully.' })
    @ApiResponse({ status: 404, description: 'Comments not found.' })
    async getCommentsByListingId(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const comments = await this.commentService.getCommentsByListingId(id);
        return responseData(res, 'Comments fetched successfully', 200, comments);
    }

    @Get()
    @ApiHeader({ name: 'authorization',required: false, description: 'Bearer token' })
    @ApiResponse({ status: 200, description: 'Comments fetched successfully.' })
    @ApiResponse({ status: 404, description: 'Comments not found.' })
    async getAllComments(@Res() res: Response) {
        const comments = await this.commentService.getAllComments();
        return responseData(res, 'Comments fetched successfully', 200, comments);
    }
}
