import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FarmerModule } from './farmer/farmer.module';
import { User } from './auth/entities/user.entity';
import { Farmer } from './farmer/entities/farmer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'tea_care',
      entities: [User, Farmer],
      synchronize: true, // Set to false in production
      logging: true,
    }),
    AuthModule,
    FarmerModule,
  ],
})
export class AppModule { }