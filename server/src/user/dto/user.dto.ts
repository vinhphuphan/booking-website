import { IsString, IsEmail, IsNotEmpty, IsOptional, IsBoolean, IsDateString, IsNumberString, IsNumber, Min, Max } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsDateString()
    @IsNotEmpty()
    birthday: string;

    @IsBoolean()
    @IsNotEmpty()
    gender: boolean;

    @IsString()
    @IsOptional()
    role?: string;
}

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsDateString()
    @IsOptional()
    birthday?: string;

    @IsBoolean()
    @IsOptional()
    gender?: boolean;

    @IsString()
    @IsOptional()
    role?: string;
}