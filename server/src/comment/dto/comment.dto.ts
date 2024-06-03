import { IsInt, IsNotEmpty, IsString, IsOptional, IsDate, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    listingId: number;

    @ApiProperty()
    userId: number | undefined;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    rating: number;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    commentDate?: Date;
}

export class UpdateCommentDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    content?: string;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    rating?: number;
}
