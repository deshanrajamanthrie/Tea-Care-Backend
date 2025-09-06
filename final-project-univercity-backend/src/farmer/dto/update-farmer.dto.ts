import { IsEmail, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateFarmerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  farmSize?: string;

  @IsOptional()
  @IsString()
  cropType?: string;

  @IsOptional()
  @IsNumber()
  farmingExperience?: number;
}