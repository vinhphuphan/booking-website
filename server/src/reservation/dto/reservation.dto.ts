import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  arrivalDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  departureDate: Date;

  @IsInt()
  @IsNotEmpty()
  listingId: number;

  @IsInt()
  @IsNotEmpty()
  numberOfGuests: number;
}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}