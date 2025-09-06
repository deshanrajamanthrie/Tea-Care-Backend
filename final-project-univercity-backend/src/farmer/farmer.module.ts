import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';
import { Farmer } from './entities/farmer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer])],
  controllers: [FarmerController],
  providers: [FarmerService],
})
export class FarmerModule {}