import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateLocationDto {
  @IsString()
  locationName: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  locationName?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
