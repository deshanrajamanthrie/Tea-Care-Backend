import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('farmers')
@UseGuards(JwtAuthGuard)
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  async create(@Body() createFarmerDto: CreateFarmerDto) {
    const farmer = await this.farmerService.create(createFarmerDto);
    return {
      message: 'Farmer created successfully',
      farmer,
    };
  }

  @Get()
  async findAll(@Query('search') search?: string) {
    let farmers;
    if (search) {
      farmers = await this.farmerService.search(search);
    } else {
      farmers = await this.farmerService.findAll();
    }
    
    return {
      message: 'Farmers retrieved successfully',
      farmers,
      count: farmers.length,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const farmer = await this.farmerService.findOne(id);
    return {
      message: 'Farmer retrieved successfully',
      farmer,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFarmerDto: UpdateFarmerDto,
  ) {
    const farmer = await this.farmerService.update(id, updateFarmerDto);
    return {
      message: 'Farmer updated successfully',
      farmer,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.farmerService.remove(id);
  }
}