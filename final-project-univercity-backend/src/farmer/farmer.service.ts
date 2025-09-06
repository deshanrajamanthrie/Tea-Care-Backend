import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmer } from './entities/farmer.entity';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

@Injectable()
export class FarmerService {
  constructor(
    @InjectRepository(Farmer)
    private farmerRepository: Repository<Farmer>,
  ) {}

  async create(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    const farmer = this.farmerRepository.create(createFarmerDto);
    return this.farmerRepository.save(farmer);
  }

  async findAll(): Promise<Farmer[]> {
    return this.farmerRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Farmer> {
    const farmer = await this.farmerRepository.findOne({ where: { id } });
    if (!farmer) {
      throw new NotFoundException(`Farmer with ID ${id} not found`);
    }
    return farmer;
  }

  async update(id: number, updateFarmerDto: UpdateFarmerDto): Promise<Farmer> {
    const farmer = await this.findOne(id);
    Object.assign(farmer, updateFarmerDto);
    return this.farmerRepository.save(farmer);
  }

  async remove(id: number): Promise<{ message: string }> {
    const farmer = await this.findOne(id);
    await this.farmerRepository.remove(farmer);
    return { message: `Farmer with ID ${id} has been deleted successfully` };
  }

  async search(query: string): Promise<Farmer[]> {
    return this.farmerRepository
      .createQueryBuilder('farmer')
      .where('farmer.name LIKE :query', { query: `%${query}%` })
      .orWhere('farmer.email LIKE :query', { query: `%${query}%` })
      .orWhere('farmer.cropType LIKE :query', { query: `%${query}%` })
      .orderBy('farmer.createdAt', 'DESC')
      .getMany();
  }
}