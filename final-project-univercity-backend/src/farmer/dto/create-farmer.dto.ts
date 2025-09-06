import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateFarmerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  farmSize: string;

  @IsNotEmpty()
  @IsString()
  cropType: string;

  @IsOptional()
  @IsNumber()
  farmingExperience?: number;
}