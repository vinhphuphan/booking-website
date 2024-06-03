import { PartialType } from "@nestjs/mapped-types";
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateListingDto {
  @IsString()
  roomName: string;

  @IsInt()
  guests: number;

  @IsInt()
  bedrooms: number;

  @IsInt()
  beds: number;

  @IsInt()
  bathrooms: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  price: number;

  @IsOptional()
  @IsBoolean()
  washingMachine?: boolean;

  @IsOptional()
  @IsBoolean()
  ironingBoard?: boolean;

  @IsOptional()
  @IsBoolean()
  tv?: boolean;

  @IsOptional()
  @IsBoolean()
  airConditioner?: boolean;

  @IsOptional()
  @IsBoolean()
  wifi?: boolean;

  @IsOptional()
  @IsBoolean()
  kitchen?: boolean;

  @IsOptional()
  @IsBoolean()
  parking?: boolean;

  @IsOptional()
  @IsBoolean()
  pool?: boolean;

  @IsOptional()
  @IsBoolean()
  iron?: boolean;

  @IsOptional()
  @IsInt()
  locationId?: number;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateListingDto extends PartialType(CreateListingDto) {}
