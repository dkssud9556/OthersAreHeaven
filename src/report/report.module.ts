import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './domain/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
})
export class ReportModule {}
